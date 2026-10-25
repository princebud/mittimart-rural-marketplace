/**
 * MittiMart Admin & Governance Routes
 * Platform oversight, verification review, GMV analytics, and moderation
 * (Matches Slide 10, 12, 13)
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Platform Overview Analytics (Pitch Deck Metrics)
router.get('/analytics', (req, res) => {
  const analytics = db.getAnalytics();
  res.json({
    success: true,
    analytics
  });
});

// Get all platform users
router.get('/users', (req, res) => {
  const { role, verificationStatus } = req.query;

  const users = db.find('users', u => {
    if (role && u.role !== role) return false;
    if (verificationStatus && u.verificationStatus !== verificationStatus) return false;
    return true;
  }).map(u => {
    const { password, ...safe } = u;
    return safe;
  });

  res.json({
    success: true,
    count: users.length,
    users
  });
});

// Verify / Approve or Reject Seller / Buyer KYC
router.put('/users/:id/verify', (req, res) => {
  const { status, verificationDoc } = req.body;
  const user = db.findById('users', req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  const isVerified = status === 'verified';
  const updatedUser = db.updateById('users', user.id, {
    verificationStatus: status || 'verified',
    isVerified,
    verificationDoc: verificationDoc || user.verificationDoc
  });

  const { password, ...safe } = updatedUser;
  res.json({
    success: true,
    message: `User ${user.name} verification status updated to ${status}.`,
    user: safe
  });
});

// Moderate product listing (approve, review, or flag)
router.put('/products/:id/moderate', (req, res) => {
  const { status, adminNote } = req.body;
  const product = db.findById('products', req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  const updatedProduct = db.updateById('products', product.id, {
    status: status || 'active',
    adminModerationNote: adminNote || 'Approved by MittiMart Trust & Safety'
  });

  res.json({
    success: true,
    message: `Product status updated to ${status}.`,
    product: updatedProduct
  });
});

// Reset database to initial pitch presentation seed data
router.post('/reset-data', (req, res) => {
  db.resetToSeeds();
  res.json({
    success: true,
    message: 'MittiMart database reset successfully to authentic presentation seed state.'
  });
});

module.exports = router;
