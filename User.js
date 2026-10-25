/**
 * MittiMart User Model (Mongoose Schema)
 * Supports 4 Roles:
 * - farmer: Rural producer selling harvests
 * - buyer: Wholesaler, Retailer, Restaurant, Household
 * - saathi: Local village tech facilitator assisting farmers
 * - admin: Platform oversight, verification, and governance
 */

const userSchemaDefinition = {
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['farmer', 'buyer', 'saathi', 'admin'], 
    default: 'farmer' 
  },
  buyerType: {
    type: String,
    enum: ['retailer', 'wholesaler', 'restaurant', 'household', null],
    default: null
  },
  village: { type: String, trim: true },
  district: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: { type: String, trim: true },
  isVerified: { type: Boolean, default: false },
  verificationDoc: { type: String, default: 'Aadhaar / Kisan Credit Card' },
  verificationStatus: { 
    type: String, 
    enum: ['unverified', 'pending', 'verified', 'rejected'], 
    default: 'pending' 
  },
  rating: { type: Number, default: 5.0, min: 1, max: 5 },
  reviewsCount: { type: Number, default: 0 },
  farmSizeAcres: { type: Number, default: 0 },
  primaryCrops: [{ type: String }],
  assignedSaathiId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
};

let User;
try {
  const mongoose = require('mongoose');
  User = mongoose.models.User || mongoose.model('User', new mongoose.Schema(userSchemaDefinition, { timestamps: true }));
} catch (e) {
  // Fallback descriptor if mongoose is not installed in standard dev mode
  User = { schema: userSchemaDefinition };
}

module.exports = User;
