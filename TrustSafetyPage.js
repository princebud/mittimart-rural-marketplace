/**
 * MittiMart Trust & Safety Page View
 * Directly replicates Slide 10 from the Startup Pitch Challenge 2026 presentation
 */

function renderTrustSafetyPage() {
  const container = document.getElementById('view-container');
  if (!container) return;

  container.innerHTML = `
    <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Slide 10 Header -->
      <div class="text-center max-w-3xl mx-auto space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          Slide 10 · Core Trust Architecture
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-mitti-deep font-serif-indian">
          Trust & Safety: Building Trust at Every Step
        </h1>
        <p class="text-amber-800 font-bold italic text-xl">
          "Verify. Record. Resolve."
        </p>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          We make prices, orders and transactions clear so both farmers and buyers know what they are agreeing to before any produce leaves the farmgate.
        </p>
      </div>

      <!-- 7 Pillars of Trust (Exact Slide 10 Layout) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        
        <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm space-y-2">
          <div class="text-2xl">👤</div>
          <span class="text-[11px] font-black uppercase tracking-wider text-emerald-800">01 | User Verification</span>
          <h3 class="font-bold text-sm text-neutral-900">Basic Identity & KYC</h3>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Basic identity and contact verification for producers (Kisan Credit Card, Bhoomi Passbook) and buyers (GSTIN, FSSAI).
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm space-y-2">
          <div class="text-2xl">🌾</div>
          <span class="text-[11px] font-black uppercase tracking-wider text-emerald-800">02 | Verified Product Details</span>
          <h3 class="font-bold text-sm text-neutral-900">Pre-Order Produce Standards</h3>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Product name, harvest date, quantity, location, moisture percentage, and quality grade are recorded before an order is placed.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm space-y-2">
          <div class="text-2xl">📑</div>
          <span class="text-[11px] font-black uppercase tracking-wider text-emerald-800">03 | Digital Order Record</span>
          <h3 class="font-bold text-sm text-neutral-900">Tamper-Proof Audit Trail</h3>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Every confirmed order keeps an immutable digital record of buyer, seller, quantity, agreed price, transport vehicle, and order status.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm space-y-2">
          <div class="text-2xl">🔒</div>
          <span class="text-[11px] font-black uppercase tracking-wider text-emerald-800">04 | Safe Payment & Escrow</span>
          <h3 class="font-bold text-sm text-neutral-900">Protected Settlement</h3>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Use secure digital payment records where buyer funds are safely held in digital escrow and released to the farmer upon delivery verification.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm space-y-2">
          <div class="text-2xl">📈</div>
          <span class="text-[11px] font-black uppercase tracking-wider text-emerald-800">05 | Ratings & History</span>
          <h3 class="font-bold text-sm text-neutral-900">Reputational Capital</h3>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Completed transactions build public buyer and seller ratings, helping honest rural producers build long-term trade credibility.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm space-y-2">
          <div class="text-2xl">⭐</div>
          <span class="text-[11px] font-black uppercase tracking-wider text-emerald-800">06 | Rating and Reviews</span>
          <h3 class="font-bold text-sm text-neutral-900">Two-Way Mutual Feedback</h3>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Buyers and farmers rate each other after a completed order, ensuring prompt payments from buyers and honest grading from sellers.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-amber-50/70 border border-amber-300 shadow-sm space-y-2 md:col-span-2 lg:col-span-3">
          <div class="text-2xl">🤝</div>
          <span class="text-[11px] font-black uppercase tracking-wider text-amber-900">07 | Mitti Saathi Support</span>
          <h3 class="font-bold text-base text-amber-950">On-Ground Dispute Resolution & Human Support</h3>
          <p class="text-xs text-amber-900/80 leading-relaxed">
            Local village Mitti Saathis help farmers use the platform, photograph lots, resolve basic trade issues, and coordinate local transport pickup at farmgate.
          </p>
        </div>

      </div>

    </div>
  `;
}
