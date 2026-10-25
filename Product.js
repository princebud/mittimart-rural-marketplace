/**
 * MittiMart Product Model (Mongoose Schema)
 * Represents produce listed by farmers or assisted by Mitti Saathis.
 */

const productSchemaDefinition = {
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  farmerPhone: { type: String, required: true },
  farmerLocation: {
    village: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true }
  },
  isFarmerVerified: { type: Boolean, default: false },
  assistedBySaathi: { type: Boolean, default: false },
  saathiId: { type: String, default: null },
  saathiName: { type: String, default: null },
  name: { type: String, required: true, trim: true },
  nameHindi: { type: String, trim: true },
  category: {
    type: String,
    enum: ['grains', 'vegetables', 'fruits', 'pulses', 'seeds', 'spices', 'organic'],
    required: true
  },
  description: { type: String, required: true },
  descriptionHindi: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  unit: {
    type: String,
    enum: ['Kg', 'Quintal', 'Crate', 'Tonne', 'Bag (50kg)', 'Box'],
    required: true
  },
  askingPrice: { type: Number, required: true, min: 1 }, // Farmer asking price per unit
  mandiBenchmarkPrice: { type: Number, default: 0 }, // Local APMC mandi comparison rate
  grade: { type: String, default: 'Grade A Premium' },
  harvestDate: { type: String, default: 'Fresh Harvest (Past 7 Days)' },
  shelfLifeDays: { type: Number, default: 30 },
  isOrganic: { type: Boolean, default: false },
  images: [{ type: String }],
  status: {
    type: String,
    enum: ['active', 'in_negotiation', 'sold_out', 'under_review'],
    default: 'active'
  },
  viewsCount: { type: Number, default: 0 },
  offersCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
};

let Product;
try {
  const mongoose = require('mongoose');
  Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema(productSchemaDefinition, { timestamps: true }));
} catch (e) {
  Product = { schema: productSchemaDefinition };
}

module.exports = Product;
