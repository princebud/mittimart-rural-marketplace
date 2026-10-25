/**
 * MittiMart Offer Model (Mongoose Schema)
 * Negotiation engine between Buyers and Farmers with transparent fee calculations.
 */

const offerSchemaDefinition = {
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: String },
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerType: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  buyerCity: { type: String },
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  farmerPhone: { type: String },
  offeredPrice: { type: Number, required: true, min: 1 }, // Proposed price per unit
  askingPrice: { type: Number, required: true }, // Original asking price per unit
  quantity: { type: Number, required: true, min: 1 },
  unit: { type: String, required: true },
  // 100% goes to farmer
  farmerTotal: { type: Number, required: true },
  // Transparent 7% platform fee paid by buyer
  platformFee: { type: Number, required: true },
  // Delivery cost
  logisticsFee: { type: Number, default: 300 },
  // Total buyer obligation
  buyerTotal: { type: Number, required: true },
  deliveryMethod: {
    type: String,
    enum: ['Local Transport Partner (Recommended)', 'Mandi Depot Drop', 'Buyer Arranged Pickup'],
    default: 'Local Transport Partner (Recommended)'
  },
  buyerNote: { type: String, default: '' },
  farmerResponseNote: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'countered'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

let Offer;
try {
  const mongoose = require('mongoose');
  Offer = mongoose.models.Offer || mongoose.model('Offer', new mongoose.Schema(offerSchemaDefinition, { timestamps: true }));
} catch (e) {
  Offer = { schema: offerSchemaDefinition };
}

module.exports = Offer;
