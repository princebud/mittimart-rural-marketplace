# 🌾 MittiMart - Rural Agricultural Marketplace
### *"From Our Mitti to Your Market" | "आपकी मिट्टी, आपका दाम, मिट्टीमार्ट आपके साथ"*
**Startup Pitch Challenge 2026 · College Presentation**  
**Course:** BCA DS & AI  
**Presented by:** Prince kumar
**Core Team:** Prince Kumar 

---

## 📖 Executive Summary & Pitch Alignment

MittiMart is a full-stack rural commerce marketplace that connects progressive Indian farmers and local agricultural producers directly with buyers, retailers, wholesalers, and restaurants.

### 🌟 Key Innovations & Presentation Slides
* **Slide 1 · Brand Identity**: *"Rooted People · Real Markets"*, *"उन्नत किसान, उन्नत भारत"*, Direct Connection, Transparent Trade, Empowering Farmers.
* **Slide 4 · The Problem**: Limited market access, low price transparency, dependence on intermediaries, and digital literacy hurdles.
* **Slide 6 · Direct Connection**: Eliminates exploitative trader chains (Trader pays ₹8,000-₹8,500 vs MittiMart pays full ₹10,000).
* **Slide 7 · 6-Step Workflow**: 1. Register Free → 2. List Produce → 3. Direct Discovery → 4. Confirm Terms → 5. Local Delivery → 6. Complete & Review.
* **Slide 8 · Differentiator**: *"A digital marketplace with local support"* via **Mitti Saathis** (village youth tech facilitators).
* **Slide 9 · Tech & AI**: Smartphone web app + WhatsApp Community groups for instant rural outreach.
* **Slide 10 · Trust & Safety**: *"Verify. Record. Resolve."* (KYC verification, digital order records, and protected digital escrow).
* **Slide 11 · Pricing Transparency Model**:
  * **Farmer receives (100% full agreed price)**: ₹10,000 (0% cut taken from farmer)
  * **MittiMart platform fee**: ₹700 (7.0% service fee paid by buyer)
  * **Logistics / handling**: ₹300 (~3.0%)
  * **Buyer pays (total)**: ₹11,000
  * **What we DON'T charge**: ❌ No commission on farmer sales, ❌ No lifetime registration fee, ❌ No recurring membership. Registration for farmers is 100% FREE!
* **Slide 12 & 13 · Year 1 Financials**:
  * **Initial Investment**: ₹5 Lakh
  * **Target GMV**: ₹5 Crore
  * **Projected Revenue (7%)**: ₹35 Lakh
  * **Operating Expenses**: ₹20 Lakh
  * **Projected Net Profit**: ₹15 Lakh (300% ROI, 42.9% margin)

---

## 🚀 Quick Start Guide (For Students, Evaluators & Judges)

### Prerequisites
* Any computer with **Node.js** (v18 or higher).

### Step 1: Clone or Navigate to the Project
```bash
cd C:\Users\sande\.gemini\antigravity\scratch\mittimart
```

### Step 2: Start the Full-Stack Server
MittiMart features a **zero-dependency native engine** that works immediately without any external npm packages or database daemons:

```bash
node server.js
```
*(Or with Antigravity / Electron node: `agy-node server.js`)*

The server will display:
```text
=======================================================
🌾 MittiMart Full-Stack Platform Active!
🌱 Tagline: "Aapki Mitti, Aapka Daam, MittiMart Aapke Sath"
🌐 Server running at: http://localhost:5000
📊 Mode: Built-in Native Node.js Server + JSON Store
🚀 Ready for College & Hackathon Demonstrations!
=======================================================
```

### Step 3: Open in Your Browser
Open your browser and navigate to:
```
http://localhost:5000
```

---

## 🎯 Demonstration Walkthrough (6 Complete User Flows)

The top navigation bar features a **1-Click Demo Persona Switcher** designed specifically for pitch evaluators and judges:

### Flow 1: Farmer Experience (👨‍🌾 Ramesh Kumar Patel)
1. Click **👨‍🌾 Farmer** in the top demo bar.
2. Observe the Farmer Dashboard: total earnings (100% full payout), active listings, and incoming buyer offers.
3. Click **"+ List New Crop"** to list a harvest (e.g. Sharbati Wheat, Desi Chana).
4. Notice how the asking price displays 0% deduction — the farmer receives 100% of their stated price.

### Flow 2: Buyer Discovery & Offer Negotiation (🛒 Anita Sharma - Retailer)
1. Click **🛒 Buyer** in the top demo bar.
2. Go to **"Marketplace"** (`#marketplace`) and filter by category (e.g., *Grains*, *Pulses*, *100% Organic*).
3. Search for a crop or filter by district (*Sehore*, *Nashik*).
4. Click **"Make an Offer"** on any crop.
5. In the negotiation modal, adjust the proposed price and requested quantity. Notice the **live Slide 11 calculation preview** showing the exact 100% farmer payout, 7% MittiMart platform fee, and ₹300 logistics.
6. Click **"Submit Offer to Farmer"**.

### Flow 3: Farmer Accepts Offer & Order Created
1. Switch back to **👨‍🌾 Farmer**.
2. Notice the new pending offer in **"Incoming Buyer Offers & Negotiations"**.
3. Click **"✓ Accept Offer & Confirm Order"**.
4. The system automatically converts the accepted offer into a confirmed order with local transport partner assignment!

### Flow 4: Order Lifecycle & Escrow Settlement
1. Inspect the **"Orders & Dispatch Fulfillment"** section.
2. Click **"Advance Status"** through each stage:
   * `Confirmed` → `Transport Assigned` → `Dispatched / In Transit` → `Delivered & Settled`.
3. When marked delivered, payment is released in full to the farmer (0% commission deducted).

### Flow 5: Mitti Saathi Assisted Onboarding (🤝 Prince kumar )
1. Click **🤝 Mitti Saathi** in the top demo bar.
2. View the Mitti Saathi village facilitator desk (cluster: Sehore & Ashta).
3. Click **"+ Onboard Village Farmer"** to register an unassisted farmer with farm size and crop details.
4. Click **"+ List Produce on Farmer's Behalf"** to attach the official **"🤝 Mitti Saathi Assisted"** quality badge to a crop.

### Flow 6: Platform Governance & GMV Tracking (🛡️ Admin)
1. Click **🛡️ Admin** in the top demo bar.
2. Review the **Year 1 Financial Overview** tracking live GMV progress toward the **₹5 Crore Target GMV** and **₹35 Lakh Revenue (7%)**.
3. Inspect the **KYC Verification Queue** to review Kisan Credit Cards and approve/revoke verified status.
4. Moderate active harvest listings across all clusters.

---

## 🗄️ Database Architecture & MongoDB Configuration

### Default Storage: Embedded Persistent Store
By default, all user registrations, crop listings, negotiation offers, and order records automatically persist to `data/mittimart-db.json`. Any changes made during demonstration survive restarts.

To restore clean pitch presentation seeds at any time, click **"↺ Reset Seed Data"** in the top demo bar.

### Production MongoDB Connection
To connect a production MongoDB Atlas or local MongoDB database:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set `USE_MONGODB=true` and provide your MongoDB URI:
   ```env
   USE_MONGODB=true
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mittimart?retryWrites=true&w=majority
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

The MongoDB models with full schemas, validations, and timestamps are located in:
* `models/User.js` — Role-based accounts (farmer, buyer, saathi, admin)
* `models/Product.js` — Harvest specifications, mandi benchmarks, grades
* `models/Offer.js` — Negotiation engine with transparent 7% fee logic
* `models/Order.js` — Order audit trail, local transport tracking, escrow status
* `models/AssistedFarmer.js` — Mitti Saathi village facilitation records

---

## 🧪 Automated Test Verification

Run the automated test suite verifying all 6 core workflows:
```bash
node test/test-flows.js
```

Test Results Output:
```text
✔ FLOW 1: Farmer Registration & Produce Listing (Passed)
✔ FLOW 2: Buyer Discovery & Offer Submission (Passed)
✔ FLOW 3: Farmer Response & Acceptance (Passed)
✔ FLOW 4: Order Status Progression to Delivery & Settlement (Passed)
✔ FLOW 5: Mitti Saathi Assisted Farmer Onboarding (Passed)
✔ FLOW 6: Admin Analytics & GMV Projections (Passed)
✔ Slide 11 Calculation: Farmer ₹10,000 + ₹700 (7%) + ₹300 Logistics = ₹11,000 Total (Verified)
🎉 ALL 6 MITTIMART WORKFLOWS VERIFIED 100% FUNCTIONAL!
```

---

## 📁 Project Directory Structure

```text
mittimart/
├── .env.example              # Environment configuration template
├── package.json              # Project dependencies and npm scripts
├── README.md                 # Complete documentation & startup guide
├── server.js                 # Full-stack API & static web application server
├── config/
│   ├── db.js                 # Embedded persistent storage & Slide 11 pricing engine
│   └── db.mongo.js           # Production MongoDB Mongoose connection handler
├── data/
│   ├── seedData.js           # Authentic presentation seed records & financial metrics
│   └── mittimart-db.json     # Auto-persisted database file
├── models/                   # Mongoose production schemas
│   ├── User.js
│   ├── Product.js
│   ├── Offer.js
│   ├── Order.js
│   └── AssistedFarmer.js
├── routes/                   # RESTful API route controllers
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── offerRoutes.js
│   ├── orderRoutes.js
│   ├── saathiRoutes.js
│   ├── adminRoutes.js
│   └── pricingRoutes.js
├── public/                   # Frontend Web Application
│   ├── index.html            # Main HTML5 entry point
│   ├── css/
│   │   └── styles.css        # Indian agriculture design system & typography
│   └── js/
│       ├── i18n.js           # Bilingual English & Hindi (हिंदी) dictionary
│       ├── state.js          # Reactive state store & event bus
│       ├── api.js            # Unified API fetch client
│       ├── components/
│       │   ├── Navbar.js     # Nav header with 1-click persona switcher
│       │   ├── Hero.js       # Hero banner with official seal & slogans
│       │   ├── ProductCard.js# Produce cards with Mandi benchmark comparisons
│       │   ├── PricingCalculator.js # Interactive Slide 11 transparency calculator
│       │   ├── FinancialOverview.js # Slide 12 & 13 startup pitch projections
│       │   ├── Modals.js     # Negotiation, demo checkout, add produce modals
│       │   └── Footer.js     # Footer with helpline, WhatsApp, team credits
│       ├── pages/
│       │   ├── HomePage.js
│       │   ├── MarketplacePage.js
│       │   ├── FarmerDashboard.js
│       │   ├── BuyerDashboard.js
│       │   ├── SaathiDashboard.js
│       │   ├── AdminDashboard.js
│       │   ├── AboutPage.js
│       │   └── TrustSafetyPage.js
│       └── app.js            # SPA hash router & bootstrapper
└── test/
    └── test-flows.js         # Automated end-to-end user flow test suite
```

---

## 🌾 Credits & Acknowledgements
* **Presentation**: Startup Pitch Challenge 2026
* **Academic Program**: BCA DS & AI (Data Science & Artificial Intelligence)
* **Design & Strategy**: Prince kumar
* **Technical Development**:Prince Kumar,
* **Motto**: *"Aapki Mitti, Aapka Daam, MittiMart Aapke Sath"*
