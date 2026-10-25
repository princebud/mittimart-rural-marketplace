/**
 * MittiMart Product Routes
 * Marketplace browsing, filters, search, and farmer listing CRUD
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all products with filtering, search, and sorting
router.get('/', (req, res) => {
  const { category, search, location, sort, farmerId, isOrganic, minPrice, maxPrice } = req.query;

  let products = db.find('products', p => {
    // Farmer filter
    if (farmerId && p.farmerId !== farmerId) return false;

    // Category filter
    if (category && category !== 'all' && p.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // Organic filter
    if (isOrganic === 'true' && !p.isOrganic) return false;

    // Location search
    if (location && location.trim() !== '') {
      const locTerm = location.toLowerCase();
      const locMatch = (p.farmerLocation.district && p.farmerLocation.district.toLowerCase().includes(locTerm)) ||
                       (p.farmerLocation.state && p.farmerLocation.state.toLowerCase().includes(locTerm)) ||
                       (p.farmerLocation.village && p.farmerLocation.village.toLowerCase().includes(locTerm));
      if (!locMatch) return false;
    }

    // Search query
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchNameHindi = p.nameHindi && p.nameHindi.toLowerCase().includes(q);
      const matchDesc = p.description && p.description.toLowerCase().includes(q);
      const matchFarmer = p.farmerName.toLowerCase().includes(q);
      if (!matchName && !matchNameHindi && !matchDesc && !matchFarmer) return false;
    }

    // Price filters
    if (minPrice && p.askingPrice < Number(minPrice)) return false;
    if (maxPrice && p.askingPrice > Number(maxPrice)) return false;

    return true;
  });

  // Sorting
  if (sort === 'price_asc') {
    products.sort((a, b) => a.askingPrice - b.askingPrice);
  } else if (sort === 'price_desc') {
    products.sort((a, b) => b.askingPrice - a.askingPrice);
  } else if (sort === 'popular') {
    products.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
  } else {
    // Default newest first
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json({
    success: true,
    count: products.length,
    products
  });
});

// Get single product details
router.get('/:id', (req, res) => {
  const product = db.findById('products', req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product listing not found.' });
  }

  // Increment view count
  db.updateById('products', product.id, { viewsCount: (product.viewsCount || 0) + 1 });

  // Include transparent pricing calculation for single unit
  const pricing = db.constructor.calculatePricing(product.askingPrice);

  res.json({
    success: true,
    product,
    singleUnitPricing: pricing
  });
});

// Create product listing (Farmer or assisted by Mitti Saathi)
router.post('/', (req, res) => {
  const {
    farmerId,
    name,
    nameHindi,
    category,
    description,
    descriptionHindi,
    quantity,
    unit,
    askingPrice,
    mandiBenchmarkPrice,
    grade,
    harvestDate,
    shelfLifeDays,
    isOrganic,
    images,
    assistedBySaathi,
    saathiId
  } = req.body;

  if (!name || !category || !quantity || !unit || !askingPrice) {
    return res.status(400).json({
      success: false,
      message: 'Product name, category, quantity, unit, and asking price are required.'
    });
  }

  // Lookup farmer info
  const effectiveFarmerId = farmerId || 'user-farmer-1';
  const farmer = db.findById('users', effectiveFarmerId) || {
    name: 'Ramesh Kumar Patel',
    phone: '9826012345',
    village: 'Ashta',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    isVerified: true
  };

  let saathiName = null;
  if (assistedBySaathi && saathiId) {
    const saathi = db.findById('users', saathiId);
    if (saathi) saathiName = saathi.name;
  }

  // Default realistic photo if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80'
  ];

  const newProduct = {
    id: `prod-${Date.now()}`,
    farmerId: effectiveFarmerId,
    farmerName: farmer.name,
    farmerPhone: farmer.phone,
    farmerLocation: {
      village: farmer.village || 'Gram Kothri',
      district: farmer.district || 'Sehore',
      state: farmer.state || 'Madhya Pradesh'
    },
    isFarmerVerified: farmer.isVerified || false,
    assistedBySaathi: Boolean(assistedBySaathi),
    saathiId: saathiId || null,
    saathiName: saathiName,
    name,
    nameHindi: nameHindi || name,
    category,
    description: description || `Freshly harvested ${name} direct from farm in ${farmer.village || 'Sehore'}.`,
    descriptionHindi: descriptionHindi || '',
    quantity: Number(quantity),
    unit,
    askingPrice: Number(askingPrice),
    mandiBenchmarkPrice: mandiBenchmarkPrice ? Number(mandiBenchmarkPrice) : Math.round(Number(askingPrice) * 0.88),
    grade: grade || 'Grade A Quality',
    harvestDate: harvestDate || 'Fresh Farm Harvest',
    shelfLifeDays: shelfLifeDays ? Number(shelfLifeDays) : 30,
    isOrganic: Boolean(isOrganic),
    images: (images && images.length > 0) ? images : defaultImages,
    status: 'active',
    viewsCount: 0,
    offersCount: 0,
    createdAt: new Date().toISOString()
  };

  db.insert('products', newProduct);

  res.status(201).json({
    success: true,
    message: 'Agricultural product listed successfully on MittiMart!',
    product: newProduct
  });
});

// Update product listing
router.put('/:id', (req, res) => {
  const product = db.findById('products', req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  const updates = { ...req.body };
  delete updates.id;
  delete updates.farmerId; // Prevent changing ownership

  if (updates.quantity) updates.quantity = Number(updates.quantity);
  if (updates.askingPrice) updates.askingPrice = Number(updates.askingPrice);
  if (updates.mandiBenchmarkPrice) updates.mandiBenchmarkPrice = Number(updates.mandiBenchmarkPrice);

  const updated = db.updateById('products', product.id, updates);

  res.json({
    success: true,
    message: 'Product listing updated successfully.',
    product: updated
  });
});

// Delete product listing
router.delete('/:id', (req, res) => {
  const success = db.removeById('products', req.params.id);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  res.json({
    success: true,
    message: 'Product listing removed from MittiMart marketplace.'
  });
});

module.exports = router;
