/**
 * MittiMart Realistic Seed Data
 * Matches Startup Pitch Challenge 2026 Presentation
 */

const seedUsers = [
  {
    id: "user-farmer-1",
    name: "Ramesh Kumar Patel",
    nameHindi: "रमेश कुमार पटेल",
    phone: "9826012345",
    email: "ramesh.patel@kisanmail.in",
    password: "password123",
    role: "farmer",
    buyerType: null,
    village: "Ashta / Kothri",
    district: "Sehore",
    state: "Madhya Pradesh",
    pincode: "466116",
    isVerified: true,
    verificationDoc: "Kisan Credit Card & Bhoomi Passbook",
    verificationStatus: "verified",
    rating: 4.9,
    reviewsCount: 38,
    farmSizeAcres: 6.5,
    primaryCrops: ["Sharbati Wheat", "Desi Chana", "Soybean"],
    assignedSaathiId: "user-saathi-1",
    avatar: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80",
    bio: "3rd generation progressive wheat & gram farmer from Sehore, famous for GI tagged Sharbati golden grains.",
    createdAt: new Date("2026-01-10")
  },
  {
    id: "user-farmer-2",
    name: "Sardar Balvinder Singh",
    nameHindi: "सरदार बलविंदर सिंह",
    phone: "9812054321",
    email: "balvinder.karnal@agrifarm.in",
    password: "password123",
    role: "farmer",
    buyerType: null,
    village: "Gharaunda",
    district: "Karnal",
    state: "Haryana",
    pincode: "132114",
    isVerified: true,
    verificationDoc: "Kisan Credit Card & Mandi Gatepass",
    verificationStatus: "verified",
    rating: 4.8,
    reviewsCount: 52,
    farmSizeAcres: 12.0,
    primaryCrops: ["Basmati Paddy 1121", "Mustard Seeds"],
    assignedSaathiId: null,
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
    bio: "Cultivating long-grain aromatic Basmati 1121 and organic mustard using laser-levelled irrigation.",
    createdAt: new Date("2026-01-15")
  },
  {
    id: "user-farmer-3",
    name: "Santosh Bhaurao Jadhav",
    nameHindi: "संतोष भाऊराव जाधव",
    phone: "9823098765",
    email: "santosh.jadhav@nashikagro.in",
    password: "password123",
    role: "farmer",
    buyerType: null,
    village: "Lasalgaon",
    district: "Nashik",
    state: "Maharashtra",
    pincode: "422306",
    isVerified: true,
    verificationDoc: "Maharashtra Shetkari Card",
    verificationStatus: "verified",
    rating: 4.9,
    reviewsCount: 64,
    farmSizeAcres: 8.0,
    primaryCrops: ["Nashik Red Onions", "Export Grade Grapes"],
    assignedSaathiId: "user-saathi-2",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    bio: "Located in Asia's biggest onion hub Lasalgaon. Producing high-solid pungent red onions with extended shelf life.",
    createdAt: new Date("2026-02-01")
  },
  {
    id: "user-buyer-1",
    name: "Anita Sharma",
    nameHindi: "अनिता शर्मा",
    phone: "9893011223",
    email: "anita@freshrootsmarkets.com",
    password: "password123",
    role: "buyer",
    buyerType: "retailer",
    businessName: "FreshRoots Organic Superstores (3 Outlets)",
    village: "Arera Colony",
    district: "Bhopal",
    state: "Madhya Pradesh",
    pincode: "462016",
    isVerified: true,
    verificationDoc: "FSSAI & GSTIN: 23AABCF9182K1Z9",
    verificationStatus: "verified",
    rating: 4.95,
    reviewsCount: 42,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    createdAt: new Date("2026-02-05")
  },
  {
    id: "user-buyer-2",
    name: "Vikram Malhotra",
    nameHindi: "विक्रम मल्होत्रा",
    phone: "9811099887",
    email: "vikram@malhotragrainstraders.in",
    password: "password123",
    role: "buyer",
    buyerType: "wholesaler",
    businessName: "Malhotra Grains & Pulses Wholesale Syndicate",
    village: "Azadpur APMC Mandi",
    district: "North West Delhi",
    state: "Delhi",
    pincode: "110033",
    isVerified: true,
    verificationDoc: "APMC Wholesaler License 2026",
    verificationStatus: "verified",
    rating: 4.85,
    reviewsCount: 88,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    createdAt: new Date("2026-01-20")
  },
  {
    id: "user-buyer-3",
    name: "Chef Rohit Verma",
    nameHindi: "शेफ रोहित वर्मा",
    phone: "9893544332",
    email: "rohit@malwahandikitchen.com",
    password: "password123",
    role: "buyer",
    buyerType: "restaurant",
    businessName: "Malwa Handi Heritage Restaurant & Catering",
    village: "Vijay Nagar",
    district: "Indore",
    state: "Madhya Pradesh",
    pincode: "452010",
    isVerified: true,
    verificationDoc: "FSSAI License 10022026000142",
    verificationStatus: "verified",
    rating: 5.0,
    reviewsCount: 29,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    createdAt: new Date("2026-02-12")
  },
  {
    id: "user-saathi-1",
    name: "Utkarsh Dubey (Mitti Saathi)",
    nameHindi: "उत्कर्ष दुबे (मिट्टी साथी)",
    phone: "9826987654",
    email: "utkarsh.saathi@mittimart.org",
    password: "password123",
    role: "saathi",
    buyerType: null,
    village: "Sehore Rural Hub",
    district: "Sehore",
    state: "Madhya Pradesh",
    pincode: "466001",
    isVerified: true,
    verificationDoc: "MittiMart Certified Rural Facilitator ID #MS-MP-04",
    verificationStatus: "verified",
    rating: 4.96,
    reviewsCount: 47,
    assistedFarmersCount: 18,
    activeListingsAssisted: 34,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    bio: "Local agricultural enthusiast and BCA tech mentor assisting farmers with digital onboarding, produce grading, and transparent negotiations.",
    createdAt: new Date("2026-01-05")
  },
  {
    id: "user-saathi-2",
    name: "Vanshika Sharma (Mitti Saathi)",
    nameHindi: "वंशिका शर्मा (मिट्टी साथी)",
    phone: "9826776655",
    email: "vanshika.saathi@mittimart.org",
    password: "password123",
    role: "saathi",
    buyerType: null,
    village: "Vidisha Mandi Cluster",
    district: "Vidisha",
    state: "Madhya Pradesh",
    pincode: "464001",
    isVerified: true,
    verificationDoc: "MittiMart Certified Rural Facilitator ID #MS-MP-09",
    verificationStatus: "verified",
    rating: 4.98,
    reviewsCount: 56,
    assistedFarmersCount: 24,
    activeListingsAssisted: 41,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    bio: "Passionate community leader driving digital agriculture adoption, fair mandi benchmarks, and women farmer collectives.",
    createdAt: new Date("2026-01-08")
  },
  {
    id: "user-admin-1",
    name: "MittiMart Governance Team (Admin)",
    nameHindi: "मिट्टीमार्ट प्रशासन दल (एडमिन)",
    phone: "9988776655",
    email: "admin@mittimart.org",
    password: "adminpassword",
    role: "admin",
    buyerType: null,
    village: "Headquarters",
    district: "Bhopal",
    state: "Madhya Pradesh",
    pincode: "462001",
    isVerified: true,
    verificationDoc: "Startup Pitch Challenge 2026 Platform Authority",
    verificationStatus: "verified",
    rating: 5.0,
    reviewsCount: 120,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    createdAt: new Date("2026-01-01")
  }
];

const seedProducts = [
  {
    id: "prod-wheat-sehore-1",
    farmerId: "user-farmer-1",
    farmerName: "Ramesh Kumar Patel",
    farmerPhone: "9826012345",
    farmerLocation: {
      village: "Ashta / Kothri",
      district: "Sehore",
      state: "Madhya Pradesh"
    },
    isFarmerVerified: true,
    assistedBySaathi: true,
    saathiId: "user-saathi-1",
    saathiName: "Utkarsh Dubey (Mitti Saathi)",
    name: "Sehore Sharbati Golden Wheat (GI Tagged Origin)",
    nameHindi: "सीहोर शरबती गोल्डन गेहूं (जीआई प्रमाणित)",
    category: "grains",
    description: "Premium sun-dried Sharbati wheat grains from the fertile black soil of Sehore. Rich golden sheen, high gluten strength for exceptionally soft rotis, low moisture (below 10%), zero chemical polishing.",
    descriptionHindi: "सीहोर की उपजाऊ काली मिट्टी से तैयार प्रीमियम शरबती गेहूं। सुनहरी चमक, कम नमी (10% से कम), रसायन मुक्त।",
    quantity: 50,
    unit: "Quintal",
    askingPrice: 2850, // Per Quintal
    mandiBenchmarkPrice: 2450, // APMC Mandi middleman rate
    grade: "Grade A Export Quality",
    harvestDate: "March 2026 Fresh Harvest",
    shelfLifeDays: 365,
    isOrganic: true,
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80"
    ],
    status: "active",
    viewsCount: 142,
    offersCount: 4,
    createdAt: new Date("2026-03-01")
  },
  {
    id: "prod-basmati-karnal-2",
    farmerId: "user-farmer-2",
    farmerName: "Sardar Balvinder Singh",
    farmerPhone: "9812054321",
    farmerLocation: {
      village: "Gharaunda",
      district: "Karnal",
      state: "Haryana"
    },
    isFarmerVerified: true,
    assistedBySaathi: false,
    saathiId: null,
    saathiName: null,
    name: "Traditional Basmati 1121 Extra Long Grain Paddy",
    nameHindi: "पारंपरिक बासमती 1121 एक्स्ट्रा लॉन्ग ग्रेन धान",
    category: "grains",
    description: "Authentic Karnal 1121 Basmati paddy, renowned for 8.4mm average uncooked grain length and rich natural aroma. Naturally aged, moisture tested at 12%. Ready for commercial milling.",
    descriptionHindi: "करनाल का प्रसिद्ध 1121 बासमती धान। 8.4 मिमी दाने की लंबाई, प्राकृतिक खुशबू, 12% नमी पर परीक्षित।",
    quantity: 120,
    unit: "Quintal",
    askingPrice: 3800,
    mandiBenchmarkPrice: 3400,
    grade: "Supreme A+",
    harvestDate: "February 2026",
    shelfLifeDays: 730,
    isOrganic: false,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&auto=format&fit=crop&q=80"
    ],
    status: "active",
    viewsCount: 215,
    offersCount: 7,
    createdAt: new Date("2026-02-18")
  },
  {
    id: "prod-onions-nashik-3",
    farmerId: "user-farmer-3",
    farmerName: "Santosh Bhaurao Jadhav",
    farmerPhone: "9823098765",
    farmerLocation: {
      village: "Lasalgaon",
      district: "Nashik",
      state: "Maharashtra"
    },
    isFarmerVerified: true,
    assistedBySaathi: true,
    saathiId: "user-saathi-2",
    saathiName: "Vanshika Sharma (Mitti Saathi)",
    name: "Nashik Red Pungent Onions (Lasalgaon Mandi Grade)",
    nameHindi: "नासिक लाल तीखा प्याज (लासलगांव मंडी ग्रेड)",
    category: "vegetables",
    description: "Export size 55mm+ deep red onions with thick skin and high pungent sulfur content. Dry cured for long transport shelf life without rotting. Ideal for restaurants and retail chains.",
    descriptionHindi: "निर्यात आकार 55mm+ नासिक लाल प्याज। मजबूत छिलका, प्राकृतिक भंडारण क्षमता युक्त।",
    quantity: 80,
    unit: "Bag (50kg)",
    askingPrice: 950, // Per 50kg bag = 19/kg
    mandiBenchmarkPrice: 750,
    grade: "Grade A Jumbo (55mm+)",
    harvestDate: "March 2026 Fresh Lot",
    shelfLifeDays: 60,
    isOrganic: false,
    images: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?w=800&auto=format&fit=crop&q=80"
    ],
    status: "active",
    viewsCount: 310,
    offersCount: 9,
    createdAt: new Date("2026-03-05")
  },
  {
    id: "prod-chana-vidisha-4",
    farmerId: "user-farmer-1",
    farmerName: "Ramesh Kumar Patel",
    farmerPhone: "9826012345",
    farmerLocation: {
      village: "Ashta / Kothri",
      district: "Sehore",
      state: "Madhya Pradesh"
    },
    isFarmerVerified: true,
    assistedBySaathi: true,
    saathiId: "user-saathi-1",
    saathiName: "Utkarsh Dubey (Mitti Saathi)",
    name: "Desi Brown Chana / Chickpeas (Unpolished & Cleaned)",
    nameHindi: "देसी भूरा चना (बिना पॉलिश, साफ किया हुआ)",
    category: "pulses",
    description: "Naturally grown desi chickpea, hand-sorted and machine-destoned. High protein content, ideal for besan flour or whole pulse cooking. Direct from harvest threshing floor.",
    descriptionHindi: "प्राकृतिक रूप से उगाया गया देसी चना। हाथ से छांटा गया, उच्च प्रोटीन युक्त, बिना पॉलिश।",
    quantity: 35,
    unit: "Quintal",
    askingPrice: 5600,
    mandiBenchmarkPrice: 5100,
    grade: "Grade A Cleaned",
    harvestDate: "March 2026 Fresh Lot",
    shelfLifeDays: 300,
    isOrganic: true,
    images: [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585992629739-89985dd4f898?w=800&auto=format&fit=crop&q=80"
    ],
    status: "active",
    viewsCount: 95,
    offersCount: 3,
    createdAt: new Date("2026-03-10")
  },
  {
    id: "prod-turmeric-erode-5",
    farmerId: "user-farmer-2",
    farmerName: "Sardar Balvinder Singh",
    farmerPhone: "9812054321",
    farmerLocation: {
      village: "Salem Valley Partner Cluster",
      district: "Erode",
      state: "Tamil Nadu"
    },
    isFarmerVerified: true,
    assistedBySaathi: true,
    saathiId: "user-saathi-2",
    saathiName: "Vanshika Sharma (Mitti Saathi)",
    name: "High-Curcumin (5.2%) Organic Lakadong Turmeric Fingers",
    nameHindi: "उच्च-करक्यूमिन (5.2%) जैविक हल्दी गांठे",
    category: "spices",
    description: "GI-recognized deep yellow turmeric fingers with laboratory-verified 5.2% natural curcumin. Sun-cured on earthen yards without synthetic chemicals or lead chromate.",
    descriptionHindi: "5.2% प्राकृतिक करक्यूमिन युक्त जैविक हल्दी। धूप में सुखाई गई, केमिकल मुक्त।",
    quantity: 20,
    unit: "Quintal",
    askingPrice: 11500,
    mandiBenchmarkPrice: 9800,
    grade: "Grade 1 Medicinal Grade",
    harvestDate: "January 2026",
    shelfLifeDays: 540,
    isOrganic: true,
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80"
    ],
    status: "active",
    viewsCount: 180,
    offersCount: 5,
    createdAt: new Date("2026-02-10")
  },
  {
    id: "prod-mango-ratnagiri-6",
    farmerId: "user-farmer-3",
    farmerName: "Santosh Bhaurao Jadhav",
    farmerPhone: "9823098765",
    farmerLocation: {
      village: "Devgad Coastal Belt",
      district: "Ratnagiri",
      state: "Maharashtra"
    },
    isFarmerVerified: true,
    assistedBySaathi: true,
    saathiId: "user-saathi-2",
    saathiName: "Vanshika Sharma (Mitti Saathi)",
    name: "Authentic GI Ratnagiri Alphonso (Hapus) Mangoes",
    nameHindi: "मूल जीआई रत्नागिरी हापुस आम (पेटी पैक)",
    category: "fruits",
    description: "Tree-ripened, GI registered Alphonso mangoes. Naturally straw-ripened (carbide free), intense sweet aroma and saffron pulp. Packed in corrugated export grade boxes.",
    descriptionHindi: "पेड़ पर पके प्रामाणिक हापुस आम। कार्बाइड मुक्त, घास की पेटी में सुरक्षित पैक।",
    quantity: 150,
    unit: "Crate",
    askingPrice: 1400, // Per 2-dozen crate
    mandiBenchmarkPrice: 1100,
    grade: "Grade A++ (250g+ fruit weight)",
    harvestDate: "April 2026 Early Batch",
    shelfLifeDays: 14,
    isOrganic: true,
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=80"
    ],
    status: "active",
    viewsCount: 420,
    offersCount: 12,
    createdAt: new Date("2026-03-12")
  },
  {
    id: "prod-capsicum-solan-7",
    farmerId: "user-farmer-2",
    farmerName: "Sardar Balvinder Singh",
    farmerPhone: "9812054321",
    farmerLocation: {
      village: "Kandaghat Valley",
      district: "Solan",
      state: "Himachal Pradesh"
    },
    isFarmerVerified: true,
    assistedBySaathi: false,
    saathiId: null,
    saathiName: null,
    name: "Polyhouse Crunchy Green Bell Pepper / Capsicum",
    nameHindi: "पॉलीहाउस हरी शिमला मिर्च (कुरकुरी ताजा)",
    category: "vegetables",
    description: "Thick-walled 4-lobed dark green bell peppers grown in controlled climate polyhouse in Solan hills. Crisp texture, prolonged cold chain shelf life, uniform grading.",
    descriptionHindi: "सोलन के पॉलीहाउस में उगाई गई मोटी परत वाली हरी शिमला मिर्च। ताजा, कुरकुरी।",
    quantity: 40,
    unit: "Crate",
    askingPrice: 750, // Per 20kg crate = ~37.5/kg
    mandiBenchmarkPrice: 600,
    grade: "Grade A 4-Lobe",
    harvestDate: "Fresh Harvest Today",
    shelfLifeDays: 10,
    isOrganic: false,
    images: [
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=800&auto=format&fit=crop&q=80"
    ],
    status: "active",
    viewsCount: 88,
    offersCount: 2,
    createdAt: new Date("2026-03-14")
  },
  {
    id: "prod-mustard-bharatpur-8",
    farmerId: "user-farmer-2",
    farmerName: "Sardar Balvinder Singh",
    farmerPhone: "9812054321",
    farmerLocation: {
      village: "Kumher Belt",
      district: "Bharatpur",
      state: "Rajasthan"
    },
    isFarmerVerified: true,
    assistedBySaathi: true,
    saathiId: "user-saathi-1",
    saathiName: "Utkarsh Dubey (Mitti Saathi)",
    name: "High-Oil Content (42%) Yellow Mustard Seeds (Sarson)",
    nameHindi: "उच्च तेल अंश (42%) पीली सरसों के बीज",
    category: "seeds",
    description: "Selected bold yellow mustard seeds with certified 42% edible oil yield. Cleaned, destoned and graded. Free from argemone or weed seeds.",
    descriptionHindi: "42% तेल क्षमता वाली मोटी पीली सरसों। मशीन से साफ, कंकड़-पत्थर रहित।",
    quantity: 60,
    unit: "Quintal",
    askingPrice: 5400,
    mandiBenchmarkPrice: 4900,
    grade: "Grade 1 High Oil Bold",
    harvestDate: "February 2026",
    shelfLifeDays: 365,
    isOrganic: false,
    images: [
      "https://images.unsplash.com/photo-1628102491629-778571d893a3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?w=800&auto=format&fit=crop&q=80"
    ],
    status: "active",
    viewsCount: 110,
    offersCount: 3,
    createdAt: new Date("2026-02-25")
  }
];

const seedOffers = [
  {
    id: "offer-demo-1001",
    productId: "prod-wheat-sehore-1",
    productName: "Sehore Sharbati Golden Wheat (GI Tagged Origin)",
    productImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=80",
    buyerId: "user-buyer-1",
    buyerName: "Anita Sharma (FreshRoots Organics)",
    buyerType: "Retailer (Supermarket)",
    buyerPhone: "9893011223",
    buyerCity: "Bhopal, MP",
    farmerId: "user-farmer-1",
    farmerName: "Ramesh Kumar Patel",
    farmerPhone: "9826012345",
    offeredPrice: 2800, // Farmer asking was 2850
    askingPrice: 2850,
    quantity: 10,
    unit: "Quintal",
    // Matches Slide 11 example:
    // Farmer gets 100% of agreed price: 10 * 2800 = 28,000
    farmerTotal: 28000,
    // MittiMart 7% platform fee: 28,000 * 0.07 = 1960
    platformFee: 1960,
    // Logistics fee: 840
    logisticsFee: 840,
    // Buyer total: 28,000 + 1,960 + 840 = 30,800
    buyerTotal: 30800,
    deliveryMethod: "Local Transport Partner (Recommended)",
    buyerNote: "We require 10 Quintals for our Bhopal retail store launch. If grain quality matches sample, we will place recurring monthly orders.",
    farmerResponseNote: "Price accepted. Produce is bagged in clean jute sacks ready for pickup.",
    status: "accepted",
    createdAt: new Date("2026-03-15T10:30:00"),
    updatedAt: new Date("2026-03-15T14:20:00")
  },
  {
    id: "offer-demo-1002",
    productId: "prod-onions-nashik-3",
    productName: "Nashik Red Pungent Onions (Lasalgaon Mandi Grade)",
    productImage: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop&q=80",
    buyerId: "user-buyer-3",
    buyerName: "Chef Rohit Verma",
    buyerType: "Restaurant & Catering",
    buyerPhone: "9893544332",
    buyerCity: "Indore, MP",
    farmerId: "user-farmer-3",
    farmerName: "Santosh Bhaurao Jadhav",
    farmerPhone: "9823098765",
    offeredPrice: 920,
    askingPrice: 950,
    quantity: 20,
    unit: "Bag (50kg)",
    farmerTotal: 18400,
    platformFee: 1288, // 7%
    logisticsFee: 600,
    buyerTotal: 20288,
    deliveryMethod: "Local Transport Partner (Recommended)",
    buyerNote: "Supplying our 2 restaurants in Indore. Need dry cured onions with minimum sprouting guarantee.",
    farmerResponseNote: "",
    status: "pending",
    createdAt: new Date("2026-03-16T09:15:00"),
    updatedAt: new Date("2026-03-16T09:15:00")
  },
  {
    id: "offer-demo-1003",
    productId: "prod-basmati-karnal-2",
    productName: "Traditional Basmati 1121 Extra Long Grain Paddy",
    productImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    buyerId: "user-buyer-2",
    buyerName: "Vikram Malhotra",
    buyerType: "Wholesaler (Delhi APMC)",
    buyerPhone: "9811099887",
    buyerCity: "Delhi NCR",
    farmerId: "user-farmer-2",
    farmerName: "Sardar Balvinder Singh",
    farmerPhone: "9812054321",
    offeredPrice: 3750,
    askingPrice: 3800,
    quantity: 50,
    unit: "Quintal",
    farmerTotal: 187500,
    platformFee: 13125, // 7%
    logisticsFee: 3500,
    buyerTotal: 204125,
    deliveryMethod: "Local Transport Partner (Recommended)",
    buyerNote: "Wholesale consignment for Delhi grain market. Direct farmgate pickup via 10-wheeler truck.",
    farmerResponseNote: "",
    status: "pending",
    createdAt: new Date("2026-03-16T11:45:00"),
    updatedAt: new Date("2026-03-16T11:45:00")
  }
];

// Initial Order matching exact Slide 11 example!
const seedOrders = [
  {
    id: "ord-2026-001",
    orderNumber: "MM-ORD-2026-1001",
    offerId: "offer-demo-1001",
    productId: "prod-wheat-sehore-1",
    productName: "Sehore Sharbati Golden Wheat (GI Tagged Origin)",
    productImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=80",
    farmerId: "user-farmer-1",
    farmerName: "Ramesh Kumar Patel",
    farmerPhone: "9826012345",
    farmerLocation: "Ashta / Kothri, Sehore, Madhya Pradesh",
    buyerId: "user-buyer-1",
    buyerName: "Anita Sharma (FreshRoots Organics)",
    buyerPhone: "9893011223",
    deliveryAddress: "FreshRoots Superstore Hub, Plot 14, Commercial Area, Arera Colony, Bhopal, MP - 462016",
    quantity: 10,
    unit: "Quintal",
    agreedPricePerUnit: 2800,
    farmerPayout: 28000, // 100% of agreed price
    platformFee: 1960, // 7%
    logisticsFee: 840,
    totalPaid: 30800,
    paymentMethod: "MittiMart Safe Digital (Escrow)",
    paymentStatus: "escrow_secured",
    orderStatus: "transport_assigned",
    transportPartner: {
      name: "Kisan Grameen Logistics (Bhopal-Sehore Corridor)",
      driverName: "Sanjay Verma",
      driverPhone: "+91 98931 77889",
      vehicleNumber: "MP-04-HE-4482 (Bolero Maxi Truck)",
      trackingNote: "Vehicle dispatched from Sehore mandi hub. Scheduled pickup from farm at 2:30 PM."
    },
    timeline: [
      {
        status: "Offer Accepted",
        timestamp: new Date("2026-03-15T14:20:00"),
        note: "Farmer Ramesh Kumar Patel accepted the offer of ₹2,800/Quintal."
      },
      {
        status: "Order Confirmed & Escrow Funded",
        timestamp: new Date("2026-03-15T15:10:00"),
        note: "Buyer Anita Sharma secured payment of ₹30,800 in MittiMart escrow."
      },
      {
        status: "Transport Assigned",
        timestamp: new Date("2026-03-16T08:00:00"),
        note: "Transport partner assigned: MP-04-HE-4482. Farmgate pickup scheduled."
      }
    ],
    buyerRating: null,
    buyerReview: null,
    farmerRating: null,
    farmerReview: null,
    createdAt: new Date("2026-03-15T15:10:00")
  },
  // A second completed order directly illustrating the presentation ₹10,000 example (Slide 11)
  {
    id: "ord-2026-000",
    orderNumber: "MM-ORD-2026-1000",
    offerId: null,
    productId: "prod-chana-vidisha-4",
    productName: "Desi Brown Chana / Chickpeas (Unpolished & Cleaned)",
    productImage: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&auto=format&fit=crop&q=80",
    farmerId: "user-farmer-1",
    farmerName: "Ramesh Kumar Patel",
    farmerPhone: "9826012345",
    farmerLocation: "Ashta / Kothri, Sehore, Madhya Pradesh",
    buyerId: "user-buyer-3",
    buyerName: "Chef Rohit Verma (Malwa Handi)",
    buyerPhone: "9893544332",
    deliveryAddress: "Malwa Handi Kitchen, Vijay Nagar, Indore, MP - 452010",
    quantity: 2,
    unit: "Quintal",
    agreedPricePerUnit: 5000,
    // Exactly matches Slide 11 example:
    // Farmer receives: ₹10,000 (full agreed price)
    // MittiMart platform fee (7%): ₹700
    // Logistics / handling: ₹300
    // Buyer pays (total): ₹11,000
    farmerPayout: 10000,
    platformFee: 700,
    logisticsFee: 300,
    totalPaid: 11000,
    paymentMethod: "MittiMart Safe Digital (Escrow)",
    paymentStatus: "farmer_settled",
    orderStatus: "completed",
    transportPartner: {
      name: "Indore Agri Express",
      driverName: "Dinesh Yadav",
      driverPhone: "+91 98271 22334",
      vehicleNumber: "MP-09-GA-1901",
      trackingNote: "Consignment delivered successfully. Inspection completed."
    },
    timeline: [
      {
        status: "Order Confirmed",
        timestamp: new Date("2026-03-08T10:00:00"),
        note: "Direct purchase order placed for ₹10,000 farmer produce."
      },
      {
        status: "Transport Assigned",
        timestamp: new Date("2026-03-08T14:00:00"),
        note: "Vehicle MP-09-GA-1901 assigned for farm collection."
      },
      {
        status: "Delivered & Verified",
        timestamp: new Date("2026-03-09T16:30:00"),
        note: "Produce delivered to Indore kitchen. Quality verified by Chef Rohit."
      },
      {
        status: "Farmer Settled (100% Payout)",
        timestamp: new Date("2026-03-09T17:00:00"),
        note: "Full ₹10,000 credited to farmer Ramesh Kumar Patel without any commission deduction."
      }
    ],
    buyerRating: 5,
    buyerReview: "Exceptional quality brown chana! Grain was clean, fragrant, and zero dust. MittiMart's transparent ₹700 fee is well worth the direct farm fresh quality.",
    farmerRating: 5,
    farmerReview: "Prompt payment, no middleman deductions! Received full ₹10,000 agreed price on the same day.",
    createdAt: new Date("2026-03-08T10:00:00")
  }
];

const seedAssistedFarmers = [
  {
    id: "assisted-101",
    saathiId: "user-saathi-1",
    saathiName: "Utkarsh Dubey (Mitti Saathi)",
    farmerName: "Ramswaroop Meena",
    phone: "9826190123",
    village: "Mungawali",
    district: "Sehore",
    state: "Madhya Pradesh",
    farmSizeAcres: 4.0,
    primaryCrops: ["Sharbati Wheat", "Garlic"],
    aadhaarLastFour: "8912",
    kisanCreditCard: true,
    status: "active",
    listingsCreatedCount: 2,
    notes: "Assisted with camera photography of wheat harvest and digital Aadhaar KYC verification.",
    createdAt: new Date("2026-02-14")
  },
  {
    id: "assisted-102",
    saathiId: "user-saathi-1",
    saathiName: "Utkarsh Dubey (Mitti Saathi)",
    farmerName: "Kailash Chand Verma",
    phone: "9826881122",
    village: "Bilkisganj",
    district: "Sehore",
    state: "Madhya Pradesh",
    farmSizeAcres: 3.2,
    primaryCrops: ["Green Peas", "Wheat"],
    aadhaarLastFour: "3321",
    kisanCreditCard: true,
    status: "active",
    listingsCreatedCount: 1,
    notes: "Farmer is unfamiliar with smartphone keyboard; assisted with voice-guided registration.",
    createdAt: new Date("2026-02-20")
  },
  {
    id: "assisted-103",
    saathiId: "user-saathi-2",
    saathiName: "Vanshika Sharma (Mitti Saathi)",
    farmerName: "Devi Bai Kushwah",
    phone: "9826334455",
    village: "Gulabganj",
    district: "Vidisha",
    state: "Madhya Pradesh",
    farmSizeAcres: 2.5,
    primaryCrops: ["Organic Coriander", "Tomatoes"],
    aadhaarLastFour: "7104",
    kisanCreditCard: true,
    status: "active",
    listingsCreatedCount: 3,
    notes: "Women farmer collective leader. Assisted with organic batch tagging and price discovery.",
    createdAt: new Date("2026-02-28")
  }
];

// Startup Pitch Presentation Financial Projection Parameters (Slide 12 & 13)
const platformFinancialMetrics = {
  initialInvestment: 500000, // ₹5 Lakh (App ₹1.5L, Logistics ₹1L, Village Team ₹75K, Other ₹1.75L)
  targetYear1GMV: 50000000, // ₹5 Crore
  projectedRevenue: 3500000, // ₹35 Lakh (7% of ₹5 Cr)
  projectedOperatingExpenses: 2000000, // ₹20 Lakh
  projectedNetProfit: 1500000, // ₹15 Lakh
  projectedROI: "300%",
  projectedProfitMargin: "42.9%",
  pricingRule: {
    platformFeePct: 7.0, // 7% paid by buyer
    farmerCommissionPct: 0.0, // 0% taken from farmer
    baseLogisticsFee: 300 // Base rural logistics coordination
  }
};

module.exports = {
  seedUsers,
  seedProducts,
  seedOffers,
  seedOrders,
  seedAssistedFarmers,
  platformFinancialMetrics
};
