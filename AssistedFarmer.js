/**
 * MittiMart AssistedFarmer Model (Mongoose Schema)
 * Records farmer registrations facilitated by Mitti Saathis (Slide 4, 8, 10).
 */

const assistedFarmerSchemaDefinition = {
  saathiId: { type: String, required: true },
  saathiName: { type: String, required: true },
  farmerName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  village: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, default: 'Madhya Pradesh' },
  farmSizeAcres: { type: Number, default: 2.5 },
  primaryCrops: [{ type: String }],
  aadhaarLastFour: { type: String, default: '4321' },
  kisanCreditCard: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ['active', 'pending_approval', 'dormant'],
    default: 'active'
  },
  listingsCreatedCount: { type: Number, default: 0 },
  notes: { type: String, default: 'Onboarded via village outreach camp' },
  createdAt: { type: Date, default: Date.now }
};

let AssistedFarmer;
try {
  const mongoose = require('mongoose');
  AssistedFarmer = mongoose.models.AssistedFarmer || mongoose.model('AssistedFarmer', new mongoose.Schema(assistedFarmerSchemaDefinition, { timestamps: true }));
} catch (e) {
  AssistedFarmer = { schema: assistedFarmerSchemaDefinition };
}

module.exports = AssistedFarmer;
