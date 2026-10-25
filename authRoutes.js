/**
 * MittiMart Authentication Routes
 * Handles Role-Based Registration, Login, and Fast Demo User Switching
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Register a new user
router.post('/register', (req, res) => {
  const { name, phone, email, password, role, buyerType, village, district, state, farmSizeAcres, primaryCrops } = req.body;

  if (!name || !phone || !role) {
    return res.status(400).json({ success: false, message: 'Name, phone, and role are required.' });
  }

  // Check if phone already registered
  const existing = db.findOne('users', u => u.phone === phone);
  if (existing) {
    return res.status(409).json({ success: false, message: 'A user with this phone number already exists.' });
  }

  const newUser = {
    id: `user-${role}-${Date.now()}`,
    name,
    phone,
    email: email || '',
    password: password || 'password123',
    role: role || 'farmer',
    buyerType: role === 'buyer' ? (buyerType || 'retailer') : null,
    village: village || 'Gram Panchayat',
    district: district || 'Local District',
    state: state || 'Madhya Pradesh',
    pincode: '462001',
    isVerified: role === 'admin' ? true : false,
    verificationStatus: 'pending',
    verificationDoc: role === 'farmer' ? 'Aadhaar / Kisan Credit Card' : 'Trade License / GST',
    rating: 5.0,
    reviewsCount: 0,
    farmSizeAcres: farmSizeAcres ? Number(farmSizeAcres) : 0,
    primaryCrops: Array.isArray(primaryCrops) ? primaryCrops : (primaryCrops ? primaryCrops.split(',').map(s => s.trim()) : []),
    assignedSaathiId: null,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  };

  db.insert('users', newUser);

  // Return user without sensitive data
  const { password: _, ...safeUser } = newUser;
  return res.status(201).json({
    success: true,
    message: 'Registration successful! Welcome to MittiMart.',
    user: safeUser,
    token: `demo-token-${safeUser.id}`
  });
});

// Login user
router.post('/login', (req, res) => {
  const { phoneOrEmail, password } = req.body;

  if (!phoneOrEmail) {
    return res.status(400).json({ success: false, message: 'Phone or email is required.' });
  }

  const user = db.findOne('users', u => u.phone === phoneOrEmail || (u.email && u.email.toLowerCase() === phoneOrEmail.toLowerCase()));
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found with this phone/email.' });
  }

  // In demo MVP mode, match password or accept demo
  if (password && user.password && user.password !== password && password !== 'password123' && password !== 'adminpassword') {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  const { password: _, ...safeUser } = user;
  return res.json({
    success: true,
    message: `Logged in as ${user.name} (${user.role.toUpperCase()})`,
    user: safeUser,
    token: `demo-token-${safeUser.id}`
  });
});

// Switch Demo User (For hackathons, presentations, and evaluators)
router.post('/switch-demo-user', (req, res) => {
  const { userId, role } = req.body;

  let user = null;
  if (userId) {
    user = db.findById('users', userId);
  } else if (role) {
    user = db.findOne('users', u => u.role === role);
  }

  if (!user) {
    return res.status(404).json({ success: false, message: 'Requested demo user not found.' });
  }

  const { password: _, ...safeUser } = user;
  return res.json({
    success: true,
    message: `Switched active session to ${user.name} [${user.role.toUpperCase()}]`,
    user: safeUser,
    token: `demo-token-${safeUser.id}`
  });
});

// Get all demo personas for easy presentation switching
router.get('/demo-users', (req, res) => {
  const demoUsers = db.find('users').map(u => ({
    id: u.id,
    name: u.name,
    role: u.role,
    phone: u.phone,
    buyerType: u.buyerType,
    village: u.village,
    district: u.district,
    state: u.state,
    rating: u.rating,
    avatar: u.avatar
  }));
  return res.json({ success: true, users: demoUsers });
});

// Current User info
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Default to the first farmer if unauthenticated in demo mode
    const defaultFarmer = db.findById('users', 'user-farmer-1');
    const { password: _, ...safeUser } = defaultFarmer;
    return res.json({ success: true, user: safeUser, isGuest: true });
  }

  const userId = authHeader.replace('Bearer demo-token-', '').replace('Bearer ', '');
  const user = db.findById('users', userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  const { password: _, ...safeUser } = user;
  return res.json({ success: true, user: safeUser, isGuest: false });
});

module.exports = router;
