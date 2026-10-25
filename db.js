/**
 * MittiMart In-Memory & Persistent Storage Engine
 * Auto-persists to JSON on disk for instant local development without MongoDB setup,
 * while maintaining 100% schema compatibility with MongoDB Mongoose models.
 */

const fs = require('fs');
const path = require('path');
const {
  seedUsers,
  seedProducts,
  seedOffers,
  seedOrders,
  seedAssistedFarmers,
  platformFinancialMetrics
} = require('../data/seedData');

const DB_FILE = path.join(__dirname, '..', 'data', 'mittimart-db.json');

class MittiMartDB {
  constructor() {
    this.data = {
      users: [],
      products: [],
      offers: [],
      orders: [],
      assistedFarmers: [],
      metrics: platformFinancialMetrics
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.users && parsed.users.length > 0) {
          this.data = parsed;
          // Ensure metrics are present
          this.data.metrics = { ...platformFinancialMetrics, ...(parsed.metrics || {}) };
          console.log(`[MittiMart DB] Loaded persistent database from ${DB_FILE}`);
          return;
        }
      }
    } catch (err) {
      console.warn(`[MittiMart DB] Could not read existing DB file: ${err.message}. Re-seeding.`);
    }

    this.resetToSeeds();
  }

  resetToSeeds() {
    this.data = {
      users: JSON.parse(JSON.stringify(seedUsers)),
      products: JSON.parse(JSON.stringify(seedProducts)),
      offers: JSON.parse(JSON.stringify(seedOffers)),
      orders: JSON.parse(JSON.stringify(seedOrders)),
      assistedFarmers: JSON.parse(JSON.stringify(seedAssistedFarmers)),
      metrics: JSON.parse(JSON.stringify(platformFinancialMetrics))
    };
    this.save();
    console.log(`[MittiMart DB] Database seeded with realistic agricultural data matching pitch presentation.`);
  }

  save() {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error(`[MittiMart DB] Error saving to ${DB_FILE}:`, err.message);
    }
  }

  // Generic Query Helpers
  find(collection, filterFn = () => true) {
    if (!this.data[collection]) return [];
    return this.data[collection].filter(filterFn);
  }

  findById(collection, id) {
    if (!this.data[collection]) return null;
    return this.data[collection].find(item => item.id === id) || null;
  }

  findOne(collection, filterFn) {
    if (!this.data[collection]) return null;
    return this.data[collection].find(filterFn) || null;
  }

  insert(collection, item) {
    if (!this.data[collection]) this.data[collection] = [];
    if (!item.id) {
      item.id = `${collection.slice(0, 4)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    if (!item.createdAt) {
      item.createdAt = new Date().toISOString();
    }
    this.data[collection].unshift(item);
    this.save();
    return item;
  }

  updateById(collection, id, updates) {
    if (!this.data[collection]) return null;
    const index = this.data[collection].findIndex(item => item.id === id);
    if (index === -1) return null;

    this.data[collection][index] = {
      ...this.data[collection][index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data[collection][index];
  }

  removeById(collection, id) {
    if (!this.data[collection]) return false;
    const index = this.data[collection].findIndex(item => item.id === id);
    if (index === -1) return false;

    this.data[collection].splice(index, 1);
    this.save();
    return true;
  }

  // Pricing & Transparency Calculation (Matches Slide 11)
  static calculatePricing(farmerAmount) {
    const amount = Number(farmerAmount) || 0;
    const platformFee = Math.round(amount * 0.07); // 7% fee
    const logisticsFee = amount >= 20000 ? Math.round(amount * 0.02) + 300 : 300; // Base ₹300 or scaled
    const buyerTotal = amount + platformFee + logisticsFee;

    return {
      farmerReceives: amount,
      platformFee: platformFee,
      platformFeePct: 7.0,
      logisticsFee: logisticsFee,
      buyerTotal: buyerTotal,
      farmerDeduction: 0, // MittiMart takes 0% cut from farmer
      traderComparison: {
        // Traditional middlemen pay 15% - 20% less to farmers
        traditionalTraderPayout: Math.round(amount * 0.82),
        farmerBenefit: Math.round(amount * 0.18)
      }
    };
  }

  // Platform Analytics and Financial Projections (Matches Slide 12 & 13)
  getAnalytics() {
    const totalOrders = this.data.orders.length;
    const completedOrders = this.data.orders.filter(o => o.orderStatus === 'completed' || o.orderStatus === 'delivered');
    
    const currentGMV = this.data.orders.reduce((sum, o) => sum + (Number(o.totalPaid) || 0), 0);
    const totalFarmerPayout = this.data.orders.reduce((sum, o) => sum + (Number(o.farmerPayout) || 0), 0);
    const totalPlatformRevenue = this.data.orders.reduce((sum, o) => sum + (Number(o.platformFee) || 0), 0);
    
    const activeProducts = this.data.products.filter(p => p.status === 'active').length;
    const pendingOffers = this.data.offers.filter(of => of.status === 'pending').length;
    
    return {
      ...this.data.metrics,
      currentGMV,
      totalFarmerPayout,
      totalPlatformRevenue,
      gmvProgressPct: ((currentGMV / this.data.metrics.targetYear1GMV) * 100).toFixed(2),
      totalOrders,
      completedOrdersCount: completedOrders.length,
      activeProductsCount: activeProducts,
      pendingOffersCount: pendingOffers,
      totalFarmersCount: this.data.users.filter(u => u.role === 'farmer').length,
      totalBuyersCount: this.data.users.filter(u => u.role === 'buyer').length,
      totalSaathisCount: this.data.users.filter(u => u.role === 'saathi').length,
      totalAssistedFarmers: this.data.assistedFarmers.length
    };
  }
}

const db = new MittiMartDB();

module.exports = db;
