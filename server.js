/**
 * MittiMart - Main Full-Stack Application Server
 * Startup Pitch Challenge 2026 | BCA DS & AI
 * 
 * Provides:
 * - RESTful API routes for Auth, Products, Offers, Orders, Saathi, Admin, Pricing
 * - Static file serving for responsive web app
 * - Hybrid architecture: Express support + Zero-dependency native Node.js fallback
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Import DB and Route modules
const db = require('./config/db');

let app;
let useExpress = false;

try {
  const express = require('express');
  const cors = require('cors');
  const authRoutes = require('./routes/authRoutes');
  const productRoutes = require('./routes/productRoutes');
  const offerRoutes = require('./routes/offerRoutes');
  const orderRoutes = require('./routes/orderRoutes');
  const saathiRoutes = require('./routes/saathiRoutes');
  const adminRoutes = require('./routes/adminRoutes');
  const pricingRoutes = require('./routes/pricingRoutes');
  
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Mount API Routers
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/offers', offerRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/saathi', saathiRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/pricing', pricingRoutes);

  // Serve static assets
  app.use(express.static(PUBLIC_DIR));

  // SPA fallback
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ success: false, message: 'API route not found' });
    }
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
  });

  useExpress = true;
} catch (e) {
  // Built-in zero-dependency HTTP dispatcher if express is not installed
  console.log('[MittiMart] Express not detected; activating built-in native HTTP & API dispatcher.');
}

// Native server implementation (works with or without express)
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
};

const parseBody = (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
  });
};

const nativeRequestHandler = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // API DISPATCHER
  if (pathname.startsWith('/api/')) {
    const body = ['POST', 'PUT', 'PATCH'].includes(method) ? await parseBody(req) : {};
    const query = parsedUrl.query;

    // --- AUTH ---
    if (pathname === '/api/auth/demo-users' && method === 'GET') {
      const users = db.find('users').map(u => {
        const { password, ...safe } = u;
        return safe;
      });
      return sendJson(res, 200, { success: true, users });
    }

    if (pathname === '/api/auth/me' && method === 'GET') {
      const authHeader = req.headers.authorization;
      const userId = authHeader ? authHeader.replace('Bearer demo-token-', '').replace('Bearer ', '') : 'user-farmer-1';
      const user = db.findById('users', userId) || db.findById('users', 'user-farmer-1');
      const { password, ...safe } = user;
      return sendJson(res, 200, { success: true, user: safe, isGuest: !authHeader });
    }

    if (pathname === '/api/auth/switch-demo-user' && method === 'POST') {
      const { userId, role } = body;
      const user = userId ? db.findById('users', userId) : db.findOne('users', u => u.role === role);
      if (!user) return sendJson(res, 404, { success: false, message: 'Demo user not found' });
      const { password, ...safe } = user;
      return sendJson(res, 200, {
        success: true,
        message: `Switched session to ${user.name} [${user.role.toUpperCase()}]`,
        user: safe,
        token: `demo-token-${user.id}`
      });
    }

    if (pathname === '/api/auth/login' && method === 'POST') {
      const { phoneOrEmail } = body;
      const user = db.findOne('users', u => u.phone === phoneOrEmail || (u.email && u.email.toLowerCase() === (phoneOrEmail || '').toLowerCase()));
      if (!user) return sendJson(res, 404, { success: false, message: 'User not found' });
      const { password, ...safe } = user;
      return sendJson(res, 200, { success: true, user: safe, token: `demo-token-${user.id}` });
    }

    if (pathname === '/api/auth/register' && method === 'POST') {
      const { name, phone, role, buyerType, village, district, state } = body;
      if (!name || !phone || !role) {
        return sendJson(res, 400, { success: false, message: 'Name, phone, and role are required' });
      }
      const existing = db.findOne('users', u => u.phone === phone);
      if (existing) {
        return sendJson(res, 409, { success: false, message: 'Phone number already registered' });
      }
      const newUser = {
        id: `user-${role}-${Date.now()}`,
        name,
        phone,
        email: body.email || '',
        role,
        buyerType: role === 'buyer' ? (buyerType || 'retailer') : null,
        village: village || 'Gram Kothri',
        district: district || 'Sehore',
        state: state || 'Madhya Pradesh',
        pincode: '462001',
        isVerified: false,
        verificationStatus: 'pending',
        verificationDoc: 'Kisan Credit Card / Aadhaar',
        rating: 5.0,
        reviewsCount: 0,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
      };
      db.insert('users', newUser);
      return sendJson(res, 201, { success: true, user: newUser, token: `demo-token-${newUser.id}` });
    }

    // --- PRODUCTS ---
    if (pathname === '/api/products' && method === 'GET') {
      const { category, search, location, sort, farmerId, isOrganic } = query;
      let products = db.find('products', p => {
        if (farmerId && p.farmerId !== farmerId) return false;
        if (category && category !== 'all' && p.category.toLowerCase() !== category.toLowerCase()) return false;
        if (isOrganic === 'true' && !p.isOrganic) return false;
        if (location && location.trim()) {
          const loc = location.toLowerCase();
          const matchLoc = (p.farmerLocation.district && p.farmerLocation.district.toLowerCase().includes(loc)) ||
                           (p.farmerLocation.state && p.farmerLocation.state.toLowerCase().includes(loc));
          if (!matchLoc) return false;
        }
        if (search && search.trim()) {
          const q = search.toLowerCase();
          const match = p.name.toLowerCase().includes(q) ||
                        (p.nameHindi && p.nameHindi.toLowerCase().includes(q)) ||
                        (p.farmerName && p.farmerName.toLowerCase().includes(q));
          if (!match) return false;
        }
        return true;
      });

      if (sort === 'price_asc') products.sort((a, b) => a.askingPrice - b.askingPrice);
      else if (sort === 'price_desc') products.sort((a, b) => b.askingPrice - a.askingPrice);
      else products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return sendJson(res, 200, { success: true, count: products.length, products });
    }

    if (pathname.startsWith('/api/products/') && method === 'GET') {
      const id = pathname.replace('/api/products/', '');
      const product = db.findById('products', id);
      if (!product) return sendJson(res, 404, { success: false, message: 'Product not found' });
      db.updateById('products', product.id, { viewsCount: (product.viewsCount || 0) + 1 });
      const pricing = db.constructor.calculatePricing(product.askingPrice);
      return sendJson(res, 200, { success: true, product, singleUnitPricing: pricing });
    }

    if (pathname === '/api/products' && method === 'POST') {
      const { farmerId, name, category, quantity, unit, askingPrice } = body;
      if (!name || !category || !quantity || !unit || !askingPrice) {
        return sendJson(res, 400, { success: false, message: 'Name, category, quantity, unit, asking price required' });
      }
      const farmer = db.findById('users', farmerId || 'user-farmer-1') || db.findById('users', 'user-farmer-1');
      const newProduct = {
        id: `prod-${Date.now()}`,
        farmerId: farmer.id,
        farmerName: farmer.name,
        farmerPhone: farmer.phone,
        farmerLocation: {
          village: farmer.village || 'Gram Kothri',
          district: farmer.district || 'Sehore',
          state: farmer.state || 'Madhya Pradesh'
        },
        isFarmerVerified: farmer.isVerified || false,
        assistedBySaathi: Boolean(body.assistedBySaathi),
        saathiId: body.saathiId || null,
        saathiName: body.saathiName || null,
        name,
        nameHindi: body.nameHindi || name,
        category,
        description: body.description || `Fresh ${name} direct from farm in ${farmer.village || 'Sehore'}.`,
        quantity: Number(quantity),
        unit,
        askingPrice: Number(askingPrice),
        mandiBenchmarkPrice: body.mandiBenchmarkPrice ? Number(body.mandiBenchmarkPrice) : Math.round(Number(askingPrice) * 0.88),
        grade: body.grade || 'Grade A',
        harvestDate: body.harvestDate || 'Fresh Farm Harvest',
        shelfLifeDays: 30,
        isOrganic: Boolean(body.isOrganic),
        images: body.images && body.images.length > 0 ? body.images : ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80'],
        status: 'active',
        viewsCount: 0,
        offersCount: 0,
        createdAt: new Date().toISOString()
      };
      db.insert('products', newProduct);
      return sendJson(res, 201, { success: true, product: newProduct });
    }

    if (pathname.startsWith('/api/products/') && method === 'DELETE') {
      const id = pathname.replace('/api/products/', '');
      const ok = db.removeById('products', id);
      return sendJson(res, ok ? 200 : 404, { success: ok, message: ok ? 'Deleted' : 'Not found' });
    }

    // --- OFFERS ---
    if (pathname === '/api/offers' && method === 'GET') {
      const { farmerId, buyerId, status } = query;
      const offers = db.find('offers', o => {
        if (farmerId && o.farmerId !== farmerId) return false;
        if (buyerId && o.buyerId !== buyerId) return false;
        if (status && o.status !== status) return false;
        return true;
      });
      offers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sendJson(res, 200, { success: true, count: offers.length, offers });
    }

    if (pathname === '/api/offers' && method === 'POST') {
      const { productId, buyerId, offeredPrice, quantity, deliveryMethod, buyerNote } = body;
      const product = db.findById('products', productId);
      if (!product) return sendJson(res, 404, { success: false, message: 'Product not found' });
      const buyer = db.findById('users', buyerId || 'user-buyer-1') || db.findById('users', 'user-buyer-1');
      
      const qty = Number(quantity);
      const price = Number(offeredPrice);
      const farmerTotal = Math.round(qty * price);
      const platformFee = Math.round(farmerTotal * 0.07);
      const logisticsFee = farmerTotal >= 20000 ? Math.round(farmerTotal * 0.02) + 300 : 300;
      const buyerTotal = farmerTotal + platformFee + logisticsFee;

      const newOffer = {
        id: `offer-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        productImage: product.images[0] || '',
        buyerId: buyer.id,
        buyerName: buyer.name,
        buyerType: buyer.buyerType ? (buyer.buyerType.charAt(0).toUpperCase() + buyer.buyerType.slice(1)) : 'Retailer',
        buyerPhone: buyer.phone,
        buyerCity: `${buyer.village || ''}, ${buyer.district || 'Bhopal'}`,
        farmerId: product.farmerId,
        farmerName: product.farmerName,
        farmerPhone: product.farmerPhone,
        offeredPrice: price,
        askingPrice: product.askingPrice,
        quantity: qty,
        unit: product.unit,
        farmerTotal,
        platformFee,
        logisticsFee,
        buyerTotal,
        deliveryMethod: deliveryMethod || 'Local Transport Partner (Recommended)',
        buyerNote: buyerNote || '',
        farmerResponseNote: '',
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      db.insert('offers', newOffer);
      db.updateById('products', product.id, { offersCount: (product.offersCount || 0) + 1 });
      return sendJson(res, 201, { success: true, offer: newOffer });
    }

    if (pathname.includes('/api/offers/') && pathname.endsWith('/accept') && method === 'POST') {
      const offerId = pathname.replace('/api/offers/', '').replace('/accept', '');
      const offer = db.findById('offers', offerId);
      if (!offer) return sendJson(res, 404, { success: false, message: 'Offer not found' });

      const updatedOffer = db.updateById('offers', offer.id, {
        status: 'accepted',
        farmerResponseNote: body.farmerResponseNote || 'Offer accepted by farmer.',
        updatedAt: new Date().toISOString()
      });

      // Generate confirmed order
      const orderNumber = `MM-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        id: `ord-${Date.now()}`,
        orderNumber,
        offerId: offer.id,
        productId: offer.productId,
        productName: offer.productName,
        productImage: offer.productImage,
        farmerId: offer.farmerId,
        farmerName: offer.farmerName,
        farmerPhone: offer.farmerPhone,
        farmerLocation: 'Farmgate Collection Point',
        buyerId: offer.buyerId,
        buyerName: offer.buyerName,
        buyerPhone: offer.buyerPhone,
        deliveryAddress: `${offer.buyerCity || 'Bhopal'}, MP`,
        quantity: offer.quantity,
        unit: offer.unit,
        agreedPricePerUnit: offer.offeredPrice,
        farmerPayout: offer.farmerTotal,
        platformFee: offer.platformFee,
        logisticsFee: offer.logisticsFee,
        totalPaid: offer.buyerTotal,
        paymentMethod: 'MittiMart Safe Digital (Escrow)',
        paymentStatus: 'escrow_secured',
        orderStatus: 'confirmed',
        transportPartner: {
          name: 'Kisan Grameen Logistics Partner',
          driverName: 'Mohan Singh',
          driverPhone: '+91 98932 55667',
          vehicleNumber: 'MP-04-CA-7721',
          trackingNote: 'Order confirmed by farmer. Transport coordinator dispatching vehicle.'
        },
        timeline: [
          {
            status: 'Offer Accepted & Order Confirmed',
            timestamp: new Date().toISOString(),
            note: `Farmer ${offer.farmerName} agreed to ₹${offer.offeredPrice}/${offer.unit}. Confirmed order created.`
          }
        ],
        createdAt: new Date().toISOString()
      };
      db.insert('orders', newOrder);

      // Decrement stock
      const product = db.findById('products', offer.productId);
      if (product) {
        const remaining = Math.max(0, product.quantity - offer.quantity);
        db.updateById('products', product.id, { quantity: remaining, status: remaining === 0 ? 'sold_out' : 'active' });
      }

      return sendJson(res, 200, { success: true, offer: updatedOffer, order: newOrder });
    }

    if (pathname.includes('/api/offers/') && pathname.endsWith('/reject') && method === 'POST') {
      const offerId = pathname.replace('/api/offers/', '').replace('/reject', '');
      const offer = db.findById('offers', offerId);
      if (!offer) return sendJson(res, 404, { success: false, message: 'Offer not found' });
      const updated = db.updateById('offers', offer.id, { status: 'rejected', farmerResponseNote: body.farmerResponseNote || 'Rejected' });
      return sendJson(res, 200, { success: true, offer: updated });
    }

    // --- ORDERS ---
    if (pathname === '/api/orders' && method === 'GET') {
      const { buyerId, farmerId, status } = query;
      const orders = db.find('orders', o => {
        if (buyerId && o.buyerId !== buyerId) return false;
        if (farmerId && o.farmerId !== farmerId) return false;
        if (status && o.orderStatus !== status) return false;
        return true;
      });
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sendJson(res, 200, { success: true, count: orders.length, orders });
    }

    if (pathname === '/api/orders/checkout' && method === 'POST') {
      const { productId, buyerId, quantity, deliveryAddress, paymentMethod } = body;
      const product = db.findById('products', productId);
      if (!product) return sendJson(res, 404, { success: false, message: 'Product not found' });

      const buyer = db.findById('users', buyerId || 'user-buyer-1') || db.findById('users', 'user-buyer-1');
      const qty = Number(quantity);
      const farmerPayout = Math.round(qty * product.askingPrice);
      const platformFee = Math.round(farmerPayout * 0.07);
      const logisticsFee = farmerPayout >= 20000 ? Math.round(farmerPayout * 0.02) + 300 : 300;
      const totalPaid = farmerPayout + platformFee + logisticsFee;

      const newOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: `MM-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        offerId: null,
        productId: product.id,
        productName: product.name,
        productImage: product.images[0] || '',
        farmerId: product.farmerId,
        farmerName: product.farmerName,
        farmerPhone: product.farmerPhone,
        farmerLocation: `${product.farmerLocation.village}, ${product.farmerLocation.district}`,
        buyerId: buyer.id,
        buyerName: buyer.name,
        buyerPhone: buyer.phone,
        deliveryAddress: deliveryAddress || 'Buyer Destination Address',
        quantity: qty,
        unit: product.unit,
        agreedPricePerUnit: product.askingPrice,
        farmerPayout,
        platformFee,
        logisticsFee,
        totalPaid,
        paymentMethod: paymentMethod || 'MittiMart Safe Digital (Escrow)',
        paymentStatus: 'escrow_secured',
        orderStatus: 'confirmed',
        transportPartner: {
          name: 'Kisan Grameen Logistics Express',
          driverName: 'Ramu Sahu',
          driverPhone: '+91 98270 44556',
          vehicleNumber: 'MP-04-TR-5531',
          trackingNote: 'Order verified. Transport vehicle scheduled for farm pickup.'
        },
        timeline: [
          {
            status: 'Order Confirmed',
            timestamp: new Date().toISOString(),
            note: `Payment of ₹${totalPaid.toLocaleString('en-IN')} held safely in MittiMart escrow.`
          }
        ],
        createdAt: new Date().toISOString()
      };
      db.insert('orders', newOrder);

      const rem = Math.max(0, product.quantity - qty);
      db.updateById('products', product.id, { quantity: rem, status: rem === 0 ? 'sold_out' : 'active' });

      return sendJson(res, 201, { success: true, order: newOrder });
    }

    if (pathname.startsWith('/api/orders/') && pathname.endsWith('/status') && method === 'PUT') {
      const orderId = pathname.replace('/api/orders/', '').replace('/status', '');
      const order = db.findById('orders', orderId);
      if (!order) return sendJson(res, 404, { success: false, message: 'Order not found' });

      const { status, note } = body;
      const timeline = order.timeline || [];
      timeline.push({
        status: status.replace('_', ' ').toUpperCase(),
        timestamp: new Date().toISOString(),
        note: note || `Order updated to ${status}.`
      });

      const updates = { orderStatus: status, timeline };
      if (status === 'completed' || status === 'delivered') {
        updates.paymentStatus = 'farmer_settled';
      }
      const updated = db.updateById('orders', order.id, updates);
      return sendJson(res, 200, { success: true, order: updated });
    }

    // --- MITTI SAATHI ---
    if (pathname === '/api/saathi/farmers' && method === 'GET') {
      const farmers = db.find('assistedFarmers');
      return sendJson(res, 200, { success: true, count: farmers.length, assistedFarmers: farmers });
    }

    if (pathname === '/api/saathi/assist-farmer' && method === 'POST') {
      const { saathiId, farmerName, phone, village, district, state, farmSizeAcres, primaryCrops } = body;
      const saathi = db.findById('users', saathiId || 'user-saathi-1') || { name: 'Utkarsh Dubey (Mitti Saathi)' };

      const assisted = {
        id: `assisted-${Date.now()}`,
        saathiId: saathi.id || 'user-saathi-1',
        saathiName: saathi.name,
        farmerName,
        phone,
        village,
        district,
        state: state || 'Madhya Pradesh',
        farmSizeAcres: farmSizeAcres ? Number(farmSizeAcres) : 2.5,
        primaryCrops: Array.isArray(primaryCrops) ? primaryCrops : (primaryCrops ? primaryCrops.split(',').map(s => s.trim()) : ['Wheat']),
        status: 'active',
        listingsCreatedCount: 0,
        createdAt: new Date().toISOString()
      };
      db.insert('assistedFarmers', assisted);

      // Create user account if not exists
      if (!db.findOne('users', u => u.phone === phone)) {
        db.insert('users', {
          id: `user-farmer-${Date.now()}`,
          name: farmerName,
          phone,
          email: `${phone}@kisanmail.in`,
          role: 'farmer',
          village,
          district,
          state: state || 'Madhya Pradesh',
          isVerified: true,
          verificationStatus: 'verified',
          rating: 5.0,
          assignedSaathiId: saathi.id,
          createdAt: new Date().toISOString()
        });
      }

      return sendJson(res, 201, { success: true, assistedFarmer: assisted });
    }

    if (pathname === '/api/saathi/stats' && method === 'GET') {
      const farmers = db.find('assistedFarmers');
      const assistedProds = db.find('products', p => p.assistedBySaathi);
      return sendJson(res, 200, {
        success: true,
        stats: {
          totalFarmersAssisted: farmers.length,
          activeListingsPublished: assistedProds.length,
          assistedOrdersCompleted: 14,
          communityTrustScore: '4.98 / 5.0'
        }
      });
    }

    // --- ADMIN & ANALYTICS ---
    if (pathname === '/api/admin/analytics' && method === 'GET') {
      const analytics = db.getAnalytics();
      return sendJson(res, 200, { success: true, analytics });
    }

    if (pathname === '/api/admin/users' && method === 'GET') {
      const users = db.find('users').map(u => {
        const { password, ...safe } = u;
        return safe;
      });
      return sendJson(res, 200, { success: true, count: users.length, users });
    }

    if (pathname.includes('/api/admin/users/') && pathname.endsWith('/verify') && method === 'PUT') {
      const userId = pathname.replace('/api/admin/users/', '').replace('/verify', '');
      const user = db.findById('users', userId);
      if (!user) return sendJson(res, 404, { success: false, message: 'User not found' });
      const updated = db.updateById('users', user.id, {
        verificationStatus: body.status || 'verified',
        isVerified: body.status === 'verified'
      });
      return sendJson(res, 200, { success: true, user: updated });
    }

    if (pathname === '/api/admin/reset-data' && method === 'POST') {
      db.resetToSeeds();
      return sendJson(res, 200, { success: true, message: 'Data reset to presentation defaults' });
    }

    // --- PRICING ---
    if (pathname === '/api/pricing/calculate' && method === 'GET') {
      const amount = Number(query.amount) || 10000;
      const breakdown = db.constructor.calculatePricing(amount);
      return sendJson(res, 200, { success: true, breakdown });
    }

    return sendJson(res, 404, { success: false, message: 'API route not found' });
  }

  // STATIC FILE SERVING
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';

  let filePath = path.join(PUBLIC_DIR, safePath);

  // If path doesn't exist, fallback to index.html for SPA client routing
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const fileStream = fs.createReadStream(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    fileStream.pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error: ' + err.message);
  }
};

const server = http.createServer((req, res) => {
  if (useExpress && app) {
    app(req, res);
  } else {
    nativeRequestHandler(req, res);
  }
});

// Start listening if run directly
if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🌾 MittiMart Full-Stack Platform Active!`);
    console.log(`🌱 Tagline: "Aapki Mitti, Aapka Daam, MittiMart Aapke Sath"`);
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📊 Mode: ${useExpress ? 'Express + JSON Store' : 'Built-in Native Node.js Server + JSON Store'}`);
    console.log(`🚀 Ready for College & Hackathon Demonstrations!`);
    console.log(`=======================================================`);
  });
}

module.exports = server;
