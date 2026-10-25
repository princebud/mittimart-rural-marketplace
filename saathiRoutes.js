/**
 * MittiMart Mitti Saathi Routes
 * Dedicated endpoints for village tech facilitators assisting local farmers
 * (Matches Slide 4, 8, 10)
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all farmers assisted by a Saathi
router.get('/farmers', (req, res) => {
  const { saathiId } = req.query;
  const effectiveSaathiId = saathiId || 'user-saathi-1';

  const assistedFarmers = db.find('assistedFarmers', f => f.saathiId === effectiveSaathiId);

  res.json({
    success: true,
    count: assistedFarmers.length,
    assistedFarmers
  });
});

// Assist with new farmer registration (Mitti Saathi onboards a village farmer)
router.post('/assist-farmer', (req, res) => {
  const {
    saathiId,
    farmerName,
    phone,
    village,
    district,
    state,
    farmSizeAcres,
    primaryCrops,
    aadhaarLastFour,
    notes
  } = req.body;

  if (!farmerName || !phone || !village || !district) {
    return res.status(400).json({
      success: false,
      message: 'Farmer name, phone number, village, and district are required.'
    });
  }

  const effectiveSaathiId = saathiId || 'user-saathi-1';
  const saathi = db.findById('users', effectiveSaathiId) || { name: 'Utkarsh Dubey (Mitti Saathi)' };

  // Create assisted record
  const newAssistedFarmer = {
    id: `assisted-${Date.now()}`,
    saathiId: effectiveSaathiId,
    saathiName: saathi.name,
    farmerName,
    phone,
    village,
    district,
    state: state || 'Madhya Pradesh',
    farmSizeAcres: farmSizeAcres ? Number(farmSizeAcres) : 2.0,
    primaryCrops: Array.isArray(primaryCrops) ? primaryCrops : (primaryCrops ? primaryCrops.split(',').map(s => s.trim()) : ['Wheat', 'Gram']),
    aadhaarLastFour: aadhaarLastFour || '0000',
    kisanCreditCard: true,
    status: 'active',
    listingsCreatedCount: 0,
    notes: notes || 'Assisted village onboarding via MittiMart local outreach',
    createdAt: new Date().toISOString()
  };

  db.insert('assistedFarmers', newAssistedFarmer);

  // Also create corresponding farmer User account so they can receive offers
  const existingUser = db.findOne('users', u => u.phone === phone);
  if (!existingUser) {
    const newUser = {
      id: `user-farmer-assisted-${Date.now()}`,
      name: farmerName,
      phone,
      email: `${phone}@kisanmail.in`,
      password: 'password123',
      role: 'farmer',
      buyerType: null,
      village,
      district,
      state: state || 'Madhya Pradesh',
      pincode: '466001',
      isVerified: true,
      verificationStatus: 'verified',
      verificationDoc: 'Mitti Saathi Field Verified',
      rating: 5.0,
      reviewsCount: 0,
      farmSizeAcres: farmSizeAcres ? Number(farmSizeAcres) : 2.0,
      primaryCrops: newAssistedFarmer.primaryCrops,
      assignedSaathiId: effectiveSaathiId,
      avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString()
    };
    db.insert('users', newUser);
  }

  res.status(201).json({
    success: true,
    message: `Farmer ${farmerName} successfully onboarded and verified by Mitti Saathi!`,
    assistedFarmer: newAssistedFarmer
  });
});

// Assist farmer with creating a product listing
router.post('/create-listing', (req, res) => {
  const {
    saathiId,
    farmerId,
    farmerName,
    farmerPhone,
    village,
    district,
    state,
    productName,
    category,
    quantity,
    unit,
    askingPrice,
    mandiBenchmarkPrice,
    grade,
    description,
    isOrganic,
    image
  } = req.body;

  if (!productName || !category || !quantity || !unit || !askingPrice) {
    return res.status(400).json({
      success: false,
      message: 'Product name, category, quantity, unit, and asking price are required.'
    });
  }

  const effectiveSaathiId = saathiId || 'user-saathi-1';
  const saathi = db.findById('users', effectiveSaathiId) || { name: 'Utkarsh Dubey (Mitti Saathi)' };

  const effectiveFarmerId = farmerId || `user-farmer-${Date.now()}`;
  const effectiveFarmerName = farmerName || 'Assisted Village Farmer';

  const newProduct = {
    id: `prod-${Date.now()}`,
    farmerId: effectiveFarmerId,
    farmerName: effectiveFarmerName,
    farmerPhone: farmerPhone || '+91 98260 00000',
    farmerLocation: {
      village: village || 'Local Village',
      district: district || 'Sehore',
      state: state || 'Madhya Pradesh'
    },
    isFarmerVerified: true,
    assistedBySaathi: true,
    saathiId: effectiveSaathiId,
    saathiName: saathi.name,
    name: productName,
    nameHindi: productName,
    category,
    description: description || `Verified farm produce listed with the assistance of Mitti Saathi ${saathi.name}.`,
    quantity: Number(quantity),
    unit,
    askingPrice: Number(askingPrice),
    mandiBenchmarkPrice: mandiBenchmarkPrice ? Number(mandiBenchmarkPrice) : Math.round(Number(askingPrice) * 0.88),
    grade: grade || 'Grade A Field Verified',
    harvestDate: 'Fresh Harvest This Week',
    shelfLifeDays: 45,
    isOrganic: Boolean(isOrganic),
    images: [image || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80'],
    status: 'active',
    viewsCount: 0,
    offersCount: 0,
    createdAt: new Date().toISOString()
  };

  db.insert('products', newProduct);

  // Increment assisted farmer counter
  const assisted = db.findOne('assistedFarmers', f => f.farmerName.toLowerCase() === effectiveFarmerName.toLowerCase());
  if (assisted) {
    db.updateById('assistedFarmers', assisted.id, {
      listingsCreatedCount: (assisted.listingsCreatedCount || 0) + 1
    });
  }

  res.status(201).json({
    success: true,
    message: 'Produce listed successfully on MittiMart with Mitti Saathi verification badge!',
    product: newProduct
  });
});

// Saathi Summary Stats
router.get('/stats', (req, res) => {
  const { saathiId } = req.query;
  const effectiveSaathiId = saathiId || 'user-saathi-1';

  const farmers = db.find('assistedFarmers', f => f.saathiId === effectiveSaathiId);
  const assistedProducts = db.find('products', p => p.saathiId === effectiveSaathiId);
  
  // Calculate completed trades assisted
  const assistedFarmerIds = farmers.map(f => f.phone);
  const orders = db.find('orders', o => assistedFarmerIds.includes(o.farmerPhone) || o.farmerName.includes('Ramesh'));

  res.json({
    success: true,
    stats: {
      totalFarmersAssisted: farmers.length,
      activeListingsPublished: assistedProducts.length,
      assistedOrdersCompleted: orders.length,
      communityTrustScore: '4.96 / 5.0'
    }
  });
});

module.exports = router;
