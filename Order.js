/**
 * MittiMart Order Model (Mongoose Schema)
 * Full lifecycle of confirmed agricultural trade:
 * Placed -> Confirmed -> Transport Assigned -> Dispatched -> Delivered & Reviewed
 */

const orderSchemaDefinition = {
  orderNumber: { type: String, required: true, unique: true },
  offerId: { type: String, default: null },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: String },
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  farmerPhone: { type: String, required: true },
  farmerLocation: { type: String, required: true },
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  agreedPricePerUnit: { type: Number, required: true },
  farmerPayout: { type: Number, required: true }, // Full agreed price (100% to farmer)
  platformFee: { type: Number, required: true }, // 7% fee
  logisticsFee: { type: Number, required: true }, // ~3% or fixed transport charge
  totalPaid: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['MittiMart Safe Digital (Escrow)', 'Direct Mandi UPI Demo', 'Cash upon Physical Inspection'],
    default: 'MittiMart Safe Digital (Escrow)'
  },
  paymentStatus: {
    type: String,
    enum: ['escrow_secured', 'farmer_settled', 'refunded'],
    default: 'escrow_secured'
  },
  orderStatus: {
    type: String,
    enum: ['confirmed', 'transport_assigned', 'dispatched', 'delivered', 'completed'],
    default: 'confirmed'
  },
  transportPartner: {
    name: { type: String, default: 'Kisan Grameen Logistics Fleet' },
    driverPhone: { type: String, default: '+91 98765 43210' },
    vehicleNumber: { type: String, default: 'MP-04-TR-9182' },
    trackingNote: { type: String, default: 'Transport partner assigned. Scheduled for farmgate pickup.' }
  },
  timeline: [
    {
      status: { type: String },
      timestamp: { type: Date, default: Date.now },
      note: { type: String }
    }
  ],
  buyerRating: { type: Number, min: 1, max: 5 },
  buyerReview: { type: String },
  farmerRating: { type: Number, min: 1, max: 5 },
  farmerReview: { type: String },
  createdAt: { type: Date, default: Date.now }
};

let Order;
try {
  const mongoose = require('mongoose');
  Order = mongoose.models.Order || mongoose.model('Order', new mongoose.Schema(orderSchemaDefinition, { timestamps: true }));
} catch (e) {
  Order = { schema: orderSchemaDefinition };
}

module.exports = Order;
