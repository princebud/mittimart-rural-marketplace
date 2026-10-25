/**
 * MittiMart Transparent Pricing Engine
 * Directly reflects Slide 11 from the Startup Pitch Challenge 2026 presentation
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Calculate pricing breakdown for any farmer amount
router.get('/calculate', (req, res) => {
  const amount = Number(req.query.amount) || 10000;
  const breakdown = db.constructor.calculatePricing(amount);

  res.json({
    success: true,
    breakdown,
    guarantees: {
      farmerDeductionPct: 0,
      farmerRegistrationFee: 0,
      lifetimeFee: 0,
      quarterlyMembership: 0,
      motto: "Simple. Transparent. Fair for Farmers and Buyers."
    }
  });
});

module.exports = router;
