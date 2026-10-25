/**
 * MittiMart Offer & Negotiation Routes
 * Implements the core direct trade negotiation engine between Farmers and Buyers
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get offers (filter by farmerId, buyerId, productId, status)
router.get('/', (req, res) => {
  const { farmerId, buyerId, productId, status } = req.query;

  const offers = db.find('offers', o => {
    if (farmerId && o.farmerId !== farmerId) return false;
    if (buyerId && o.buyerId !== buyerId) return false;
    if (productId && o.productId !== productId) return false;
    if (status && o.status !== status) return false;
    return true;
  });

  // Sort newest first
  offers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({
    success: true,
    count: offers.length,
    offers
  });
});

// Get single offer
router.get('/:id', (req, res) => {
  const offer = db.findById('offers', req.params.id);
  if (!offer) {
    return res.status(404).json({ success: false, message: 'Offer not found.' });
  }
  res.json({ success: true, offer });
});

// Submit a new negotiation offer (Buyer)
router.post('/', (req, res) => {
  const {
    productId,
    buyerId,
    offeredPrice,
    quantity,
    deliveryMethod,
    buyerNote
  } = req.body;

  if (!productId || !offeredPrice || !quantity) {
    return res.status(400).json({
      success: false,
      message: 'Product ID, offered price per unit, and quantity are required.'
    });
  }

  const product = db.findById('products', productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  // Lookup buyer info
  const effectiveBuyerId = buyerId || 'user-buyer-1';
  const buyer = db.findById('users', effectiveBuyerId) || {
    name: 'Anita Sharma',
    phone: '9893011223',
    buyerType: 'Retailer',
    district: 'Bhopal',
    state: 'Madhya Pradesh'
  };

  const parsedQty = Number(quantity);
  const parsedPrice = Number(offeredPrice);

  // Exact Slide 11 pricing calculation:
  // Farmer receives full agreed price:
  const farmerTotal = Math.round(parsedQty * parsedPrice);
  // Platform fee: 7% transparent fee
  const platformFee = Math.round(farmerTotal * 0.07);
  // Logistics fee: base ₹300 or scaled for large freight
  const logisticsFee = farmerTotal >= 20000 ? Math.round(farmerTotal * 0.02) + 300 : 300;
  // Total paid by buyer
  const buyerTotal = farmerTotal + platformFee + logisticsFee;

  const newOffer = {
    id: `offer-${Date.now()}`,
    productId: product.id,
    productName: product.name,
    productImage: product.images[0] || '',
    buyerId: effectiveBuyerId,
    buyerName: buyer.name,
    buyerType: buyer.buyerType ? (buyer.buyerType.charAt(0).toUpperCase() + buyer.buyerType.slice(1)) : 'Buyer',
    buyerPhone: buyer.phone,
    buyerCity: `${buyer.village || ''}, ${buyer.district || 'Bhopal'}`,
    farmerId: product.farmerId,
    farmerName: product.farmerName,
    farmerPhone: product.farmerPhone,
    offeredPrice: parsedPrice,
    askingPrice: product.askingPrice,
    quantity: parsedQty,
    unit: product.unit,
    farmerTotal,
    platformFee,
    logisticsFee,
    buyerTotal,
    deliveryMethod: deliveryMethod || 'Local Transport Partner (Recommended)',
    buyerNote: buyerNote || '',
    farmerResponseNote: '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.insert('offers', newOffer);

  // Increment product offer counter
  db.updateById('products', product.id, { offersCount: (product.offersCount || 0) + 1 });

  res.status(201).json({
    success: true,
    message: 'Offer submitted directly to the farmer! You will be notified when they respond.',
    offer: newOffer,
    pricingBreakdown: {
      farmerReceives: farmerTotal,
      platformFee7Pct: platformFee,
      logisticsHandling: logisticsFee,
      totalBuyerAmount: buyerTotal
    }
  });
});

// Accept offer (Farmer action -> Automatically creates confirmed Order!)
router.post('/:id/accept', (req, res) => {
  const { farmerResponseNote } = req.body;
  const offer = db.findById('offers', req.params.id);

  if (!offer) {
    return res.status(404).json({ success: false, message: 'Offer not found.' });
  }

  if (offer.status !== 'pending' && offer.status !== 'countered') {
    return res.status(400).json({ success: false, message: `Offer is already ${offer.status}.` });
  }

  // Update offer status
  const updatedOffer = db.updateById('offers', offer.id, {
    status: 'accepted',
    farmerResponseNote: farmerResponseNote || 'Offer accepted by farmer. Ready for dispatch.',
    updatedAt: new Date().toISOString()
  });

  // Automatically generate confirmed order matching Slide 7 & 10
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
    farmerPhone: offer.farmerPhone || '+91 98260 12345',
    farmerLocation: 'Farmgate Collection Point',
    buyerId: offer.buyerId,
    buyerName: offer.buyerName,
    buyerPhone: offer.buyerPhone,
    deliveryAddress: `${offer.buyerCity || 'Buyer Destination Hub'}, Pincode: 462001`,
    quantity: offer.quantity,
    unit: offer.unit,
    agreedPricePerUnit: offer.offeredPrice,
    farmerPayout: offer.farmerTotal, // 100% full payout!
    platformFee: offer.platformFee, // 7%
    logisticsFee: offer.logisticsFee, // ~3%
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
    buyerRating: null,
    buyerReview: null,
    farmerRating: null,
    farmerReview: null,
    createdAt: new Date().toISOString()
  };

  db.insert('orders', newOrder);

  // Update product remaining quantity
  const product = db.findById('products', offer.productId);
  if (product) {
    const remaining = Math.max(0, product.quantity - offer.quantity);
    db.updateById('products', product.id, {
      quantity: remaining,
      status: remaining === 0 ? 'sold_out' : 'active'
    });
  }

  res.json({
    success: true,
    message: 'Offer accepted! A confirmed order has been generated with transport coordination.',
    offer: updatedOffer,
    order: newOrder
  });
});

// Reject offer (Farmer action)
router.post('/:id/reject', (req, res) => {
  const { farmerResponseNote } = req.body;
  const offer = db.findById('offers', req.params.id);

  if (!offer) {
    return res.status(404).json({ success: false, message: 'Offer not found.' });
  }

  const updatedOffer = db.updateById('offers', offer.id, {
    status: 'rejected',
    farmerResponseNote: farmerResponseNote || 'Farmer was unable to accept this offer due to high input costs.',
    updatedAt: new Date().toISOString()
  });

  res.json({
    success: true,
    message: 'Offer rejected.',
    offer: updatedOffer
  });
});

// Counter offer
router.post('/:id/counter', (req, res) => {
  const { counterPrice, farmerResponseNote } = req.body;
  const offer = db.findById('offers', req.params.id);

  if (!offer) {
    return res.status(404).json({ success: false, message: 'Offer not found.' });
  }

  if (!counterPrice) {
    return res.status(400).json({ success: false, message: 'Counter price is required.' });
  }

  const parsedCounter = Number(counterPrice);
  const farmerTotal = Math.round(offer.quantity * parsedCounter);
  const platformFee = Math.round(farmerTotal * 0.07);
  const logisticsFee = offer.logisticsFee;
  const buyerTotal = farmerTotal + platformFee + logisticsFee;

  const updatedOffer = db.updateById('offers', offer.id, {
    status: 'countered',
    offeredPrice: parsedCounter,
    farmerTotal,
    platformFee,
    buyerTotal,
    farmerResponseNote: farmerResponseNote || `Farmer proposed counter price of ₹${parsedCounter}/${offer.unit}`,
    updatedAt: new Date().toISOString()
  });

  res.json({
    success: true,
    message: `Counter offer of ₹${parsedCounter}/${offer.unit} sent to buyer.`,
    offer: updatedOffer
  });
});

module.exports = router;
