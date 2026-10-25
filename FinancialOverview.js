/**
 * MittiMart Year 1 Financial Projections Component
 * Directly replicates Slide 12 & 13 from Startup Pitch Challenge 2026 presentation
 */

function renderFinancialOverview(analytics = null) {
  const currentGMV = analytics ? analytics.currentGMV : 109135;
  const currentRevenue = analytics ? analytics.totalPlatformRevenue : Math.round(currentGMV * 0.07);
  const targetGMV = 50000000; // ₹5 Crore
  const progressPct = ((currentGMV / targetGMV) * 100).toFixed(3);

  return `
    <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-mitti max-w-5xl mx-auto my-8 space-y-8">
      
      <!-- Slide 12 Header -->
      <div class="text-center max-w-3xl mx-auto space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
          Slide 12 & 13 · Startup Financial Model
        </div>
        <h2 class="text-3xl sm:text-4xl font-black text-mitti-deep font-serif-indian">
          MittiMart — Year 1 Financial Overview
        </h2>
        <p class="text-xs sm:text-sm text-neutral-500">
          Realistic economics based on ₹5 Crore Target GMV and 7% transaction service fee.
        </p>
      </div>

      <!-- Live GMV Progress Bar vs ₹5 Crore Target -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-mitti-deep text-white shadow-lg space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span class="text-xs uppercase font-bold tracking-wider text-emerald-300">Target GMV Milestone</span>
            <div class="text-2xl sm:text-3xl font-black text-amber-300">
              ₹5 Crore <span class="text-xs text-white/70 font-normal">Year-1 Platform Target</span>
            </div>
          </div>
          <div class="text-right sm:text-right">
            <span class="text-xs uppercase font-bold tracking-wider text-emerald-300">Live Demo GMV</span>
            <div class="text-xl sm:text-2xl font-black text-white">
              ₹${currentGMV.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div class="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div class="bg-amber-400 h-3 rounded-full transition-all duration-500" style="width: ${Math.max(1, Math.min(100, progressPct * 10))}%"></div>
        </div>

        <div class="flex justify-between text-[11px] text-emerald-200 font-medium">
          <span>₹0</span>
          <span>Target ₹5,00,00,000 (35L Revenue @ 7%)</span>
        </div>
      </div>

      <!-- Slide 12 Financial Data Table -->
      <div class="overflow-x-auto rounded-2xl border border-mitti">
        <table class="w-full text-left text-sm">
          <thead class="bg-mitti-sand text-xs font-bold text-neutral-800 uppercase tracking-wider border-b border-mitti">
            <tr>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">Amount</th>
              <th class="py-3 px-4">Key Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-mitti text-neutral-800">
            <tr class="hover:bg-neutral-50">
              <td class="py-3 px-4 font-bold text-mitti-deep">Initial Investment</td>
              <td class="py-3 px-4 font-black text-neutral-900">₹5 Lakh</td>
              <td class="py-3 px-4 text-xs text-neutral-600">App ₹1.5L · Logistics ₹1L · Village Team ₹75K · Other ₹1.75L</td>
            </tr>
            <tr class="hover:bg-neutral-50">
              <td class="py-3 px-4 font-bold text-mitti-deep">Revenue Model</td>
              <td class="py-3 px-4 font-black text-amber-700">7%</td>
              <td class="py-3 px-4 text-xs text-neutral-600">Service fee on successful transactions (paid by buyer)</td>
            </tr>
            <tr class="hover:bg-neutral-50">
              <td class="py-3 px-4 font-bold text-mitti-deep">Example Transaction</td>
              <td class="py-3 px-4 font-black text-neutral-900">₹11,000</td>
              <td class="py-3 px-4 text-xs text-neutral-600">Farmer ₹10,000 + ₹700 service fee + ₹300 logistics</td>
            </tr>
            <tr class="hover:bg-neutral-50 bg-emerald-50/50">
              <td class="py-3 px-4 font-bold text-emerald-950">Target GMV</td>
              <td class="py-3 px-4 font-black text-emerald-900">₹5 Crore</td>
              <td class="py-3 px-4 text-xs text-emerald-800 font-medium">Year-1 transaction target across regional agricultural hubs</td>
            </tr>
            <tr class="hover:bg-neutral-50 bg-emerald-50">
              <td class="py-3 px-4 font-bold text-emerald-950">Projected Revenue</td>
              <td class="py-3 px-4 font-black text-emerald-900 text-base">₹35 Lakh</td>
              <td class="py-3 px-4 text-xs text-emerald-800 font-medium">₹5 Crore Target GMV × 7% Platform Fee</td>
            </tr>
            <tr class="hover:bg-neutral-50">
              <td class="py-3 px-4 font-bold text-red-900">Operating Expenses</td>
              <td class="py-3 px-4 font-black text-red-700">₹20 Lakh</td>
              <td class="py-3 px-4 text-xs text-neutral-600">Team, logistics, technology, travel, marketing & admin</td>
            </tr>
            <tr class="hover:bg-neutral-50 bg-amber-50">
              <td class="py-3 px-4 font-bold text-amber-950">Projected Net Profit</td>
              <td class="py-3 px-4 font-black text-amber-800 text-lg">₹15 Lakh</td>
              <td class="py-3 px-4 text-xs text-amber-900 font-medium">Revenue ₹35L - Expenses ₹20L</td>
            </tr>
            <tr class="hover:bg-neutral-50 bg-amber-100/60 font-bold">
              <td class="py-3 px-4 text-neutral-900">ROI / Profit Margin</td>
              <td class="py-3 px-4 text-amber-900 font-black">300% / 42.9%</td>
              <td class="py-3 px-4 text-xs text-neutral-800">₹15L profit on ₹5L initial investment</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Slide 13 Visual Projection Graphic -->
      <div class="p-6 rounded-2xl bg-mitti-sand border border-mitti space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-800">
            MittiMart — Year 1 Financial Projection Curve (Slide 13)
          </span>
          <span class="text-[10px] text-neutral-500 font-medium">Figures are projected estimates</span>
        </div>

        <!-- Visual Milestone Flow Chart -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          
          <div class="p-4 rounded-xl bg-white border border-mitti shadow-sm">
            <div class="text-xs font-semibold text-neutral-500">Initial Investment</div>
            <div class="text-2xl font-black text-neutral-900 mt-1">₹5 Lakh</div>
            <div class="text-[10px] text-neutral-400 mt-0.5">Seed Capital</div>
          </div>

          <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-300 shadow-sm relative">
            <span class="absolute -top-2 right-2 bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Peak</span>
            <div class="text-xs font-semibold text-emerald-800">Projected Revenue</div>
            <div class="text-2xl font-black text-emerald-800 mt-1">₹35 Lakh</div>
            <div class="text-[10px] text-emerald-700 mt-0.5">7% of ₹5 Cr GMV</div>
          </div>

          <div class="p-4 rounded-xl bg-red-50 border border-red-200 shadow-sm">
            <div class="text-xs font-semibold text-red-800">Operating Expenses</div>
            <div class="text-2xl font-black text-red-700 mt-1">₹20 Lakh</div>
            <div class="text-[10px] text-red-600 mt-0.5">Ops & Field Team</div>
          </div>

          <div class="p-4 rounded-xl bg-amber-50 border-2 border-amber-400 shadow-sm">
            <div class="text-xs font-semibold text-amber-900">Net Profit</div>
            <div class="text-2xl font-black text-amber-800 mt-1">₹15 Lakh</div>
            <div class="text-[10px] text-amber-700 mt-0.5">42.9% Net Margin</div>
          </div>

        </div>

        <!-- Slide 12 Takeaway Callout -->
        <div class="p-4 rounded-xl bg-white border-l-4 border-emerald-600 text-center font-bold text-sm text-mitti-deep">
          🎯 Takeaway: <strong>₹5L initial investment → ₹15L projected Year-1 profit (300% ROI)</strong>
        </div>

      </div>

    </div>
  `;
}
