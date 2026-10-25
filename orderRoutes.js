/**
 * MittiMart Order Routes
 * Order lifecycle tracking, transparent checkout demonstration, and mutual rating/reviews
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all orders (with filters for buyer, farmer, status)
router.get('/', (req, res) => {
  const { buyerId, farmerId, status } = req.query;

  const orders = db.find('orders', o => {
    if (buyerId && o.buyerId !== buyerId) return false;
    if (farmerId && o.farmerId !== farmerId) return false;
    if (status && o.orderStatus !== status) return false;
    return true;
  });

  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({
    success: true,
    count: orders.length,
    orders
  });
});

// Get single order with timeline
router.get('/:id', (req, res) => {
  const order = db.findById('orders', req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }
  res.json({ success: true, order });
});

// Create direct order (Checkout Demonstration)
router.post('/checkout', (req, res) => {
  const {
    productId,
    buyerId,
    quantity,
    deliveryAddress,
    paymentMethod
  } = req.body;

  if (!productId || !quantity || !deliveryAddress) {
    return res.status(400).json({
      success: false,
      message: 'Product ID, quantity, and delivery address are required.'
    });
  }

  const product = db.findById('products', productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  const qty = Number(quantity);
  if (qty > product.quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.quantity} ${product.unit} available in stock.`
    });
  }

  // Lookup buyer
  const effectiveBuyerId = buyerId || 'user-buyer-1';
  const buyer = db.findById('users', effectiveBuyerId) || {
    name: 'Anita Sharma',
    phone: '9893011223'
  };

  // Pricing calculations (Slide 11):
  const agreedPricePerUnit = product.askingPrice;
  const farmerPayout = Math.round(qty * agreedPricePerUnit); // 100% to farmer
  const platformFee = Math.round(farmerPayout * 0.07); // 7% fee
  const logisticsFee = farmerPayout >= 20000 ? Math.round(farmerPayout * 0.02) + 300 : 300;
  const totalPaid = farmerPayout + platformFee + logisticsFee;

  const orderNumber = `MM-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    id: `ord-${Date.now()}`,
    orderNumber,
    offerId: null,
    productId: product.id,
    productName: product.name,
    productImage: product.images[0] || '',
    farmerId: product.farmerId,
    farmerName: product.farmerName,
    farmerPhone: product.farmerPhone,
    farmerLocation: `${product.farmerLocation.village}, ${product.farmerLocation.district}, ${product.farmerLocation.state}`,
    buyerId: effectiveBuyerId,
    buyerName: buyer.name,
    buyerPhone: buyer.phone,
    deliveryAddress,
    quantity: qty,
    unit: product.unit,
    agreedPricePerUnit,
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
      trackingNote: 'Order verified and confirmed. Vehicle routed for farm pickup.'
    },
    timeline: [
      {
        status: 'Order Confirmed',
        timestamp: new Date().toISOString(),
        note: `Direct order placed. Payment of ₹${totalPaid.toLocaleString('en-IN')} secured in digital escrow.`
      }
    ],
    buyerRating: null,
    buyerReview: null,
    farmerRating: null,
    farmerReview: null,
    createdAt: new Date().toISOString()
  };

  db.insert('orders', newOrder);

  // Update product stock
  const remaining = Math.max(0, product.quantity - qty);
  db.updateById('products', product.id, {
    quantity: remaining,
    status: remaining === 0 ? 'sold_out' : 'active'
  });

  res.status(201).json({
    success: true,
    message: 'Order placed successfully! Funds held securely in MittiMart Escrow until delivery.',
    order: newOrder
  });
});

// Update order status (Tracking progression)
router.put('/:id/status', (req, res) => {
  const { status, note, vehicleNumber, driverName, driverPhone } = req.body;
  const order = db.findById('orders', req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }

  const validStatuses = ['confirmed', 'transport_assigned', 'dispatched', 'delivered', 'completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const timeline = order.timeline || [];
  timeline.push({
    status: status.replace('_', ' ').toUpperCase(),
    timestamp: new Date().toISOString(),
    note: note || `Order updated to ${status}.`
  });

  const updates = {
    orderStatus: status,
    timeline
  };

  // Update transport partner details if provided
  if (vehicleNumber || driverName || driverPhone) {
    updates.transportPartner = {
      ...order.transportPartner,
      ...(vehicleNumber && { vehicleNumber }),
      ...(driverName && { driverName }),
      ...(driverPhone && { driverPhone }),
      ...(note && { trackingNote: note })
    };
  }

  // Release payment when order is completed / delivered
  if (status === 'completed' || status === 'delivered') {
    updates.paymentStatus = 'farmer_settled';
  }

  const updatedOrder = db.updateById('orders', order.id, updates);

  res.json({
    success: true,
    message: `Order status updated to ${status}.`,
    order: updatedOrder
  });
});

// Submit review & rating
router.post('/:id/review', (req, res) => {
  const { role, rating, reviewText } = req.body;
  const order = db.findById('orders', req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }

  const updates = {};
  if (role === 'buyer') {
    updates.buyerRating = Number(rating);
    updates.buyerReview = reviewText;
  } else {
    updates.farmerRating = Number(rating);
    updates.farmerReview = reviewText;
  }

  const updatedOrder = db.updateById('orders', order.id, updates);

  res.json({
    success: true,
    message: 'Review and rating recorded successfully!',
    order: updatedOrder
  });
});

module.exports = router;
