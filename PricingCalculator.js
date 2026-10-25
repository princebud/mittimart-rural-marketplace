/**
 * MittiMart Transparent Pricing Calculator Component
 * Directly replicates Slide 11 from Startup Pitch Challenge 2026 presentation
 */

function renderPricingCalculator(initialAmount = 10000) {
  return `
    <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-mitti max-w-5xl mx-auto my-8">
      
      <!-- Slide 11 Header -->
      <div class="text-center max-w-3xl mx-auto mb-8 space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          Slide 11 · Official Business Model
        </div>
        <h2 class="text-3xl sm:text-4xl font-black text-mitti-deep font-serif-indian">
          MittiMart Pricing Model
        </h2>
        <p class="text-amber-800 font-semibold italic text-base sm:text-lg">
          Simple. Transparent. Fair for Farmers and Buyers.
        </p>
        <p class="text-xs sm:text-sm text-neutral-500">
          Every charge is 100% clear and visible to both farmers and buyers before confirming any trade.
        </p>
      </div>

      <!-- Interactive Calculator Slider -->
      <div class="bg-mitti-sand p-6 rounded-2xl border border-mitti mb-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3">
          <label for="pricing-input" class="text-sm font-bold text-neutral-800 flex items-center gap-2">
            <span>🌾</span> <span>Simulate Farmer Agreed Produce Value:</span>
          </label>
          <div class="flex items-center gap-2">
            <span class="text-lg font-black text-mitti-deep">₹</span>
            <input type="number" id="pricing-input" value="${initialAmount}" step="1000" min="1000" max="500000"
              oninput="handlePricingInputChange(this.value)" 
              class="w-36 px-3 py-1.5 text-right font-black text-lg rounded-xl border border-mitti focus:ring-2 focus:ring-emerald-600 outline-none bg-white"/>
          </div>
        </div>

        <input type="range" min="2000" max="100000" step="1000" value="${initialAmount}" 
          oninput="handlePricingInputChange(this.value)" id="pricing-slider"
          class="w-full accent-emerald-700 cursor-pointer h-2 bg-neutral-200 rounded-lg"/>

        <div class="flex justify-between text-[11px] text-neutral-500 mt-1 font-semibold">
          <span>₹2,000 (Small batch)</span>
          <span class="text-emerald-800 font-bold">₹10,000 (Presentation Example)</span>
          <span>₹50,000 (Bulk mandi lot)</span>
          <span>₹1,00,000 (Wholesale)</span>
        </div>
      </div>

      <!-- Main Breakdown Grid Matching Exact Slide 11 Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
        
        <!-- Column 1: Money Flow (When Sold on MittiMart) -->
        <div class="bg-neutral-50 rounded-2xl p-6 border border-mitti space-y-4">
          <div class="flex items-center justify-between border-b border-mitti pb-3">
            <h4 class="font-extrabold text-sm uppercase tracking-wider text-neutral-800">
              Money Flow (When Sold on MittiMart)
            </h4>
            <span class="text-xs font-bold text-neutral-500">Amount (₹)</span>
          </div>

          <!-- Farmer Receives -->
          <div class="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-3">
              <span class="text-2xl">👨‍🌾</span>
              <div>
                <div class="font-bold text-sm text-emerald-950">Farmer receives</div>
                <div class="text-[11px] text-emerald-700 font-semibold">(full agreed price)</div>
              </div>
            </div>
            <div class="text-xl font-black text-emerald-900" id="calc-farmer-payout">
              ₹${initialAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <!-- Platform Fee -->
          <div class="flex items-center justify-between p-3 rounded-xl bg-white border border-mitti/80">
            <div class="flex items-center gap-3">
              <span class="text-2xl">⚙️</span>
              <div>
                <div class="font-bold text-sm text-neutral-800">MittiMart platform fee</div>
                <div class="text-[11px] text-neutral-500 font-medium">7.0% service fee paid by buyer</div>
              </div>
            </div>
            <div class="text-lg font-bold text-amber-700" id="calc-platform-fee">
              ₹${Math.round(initialAmount * 0.07).toLocaleString('en-IN')}
            </div>
          </div>

          <!-- Logistics -->
          <div class="flex items-center justify-between p-3 rounded-xl bg-white border border-mitti/80">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🚚</span>
              <div>
                <div class="font-bold text-sm text-neutral-800">Logistics / handling</div>
                <div class="text-[11px] text-neutral-500 font-medium">Local transport partner coordination</div>
              </div>
            </div>
            <div class="text-lg font-bold text-neutral-700" id="calc-logistics-fee">
              ₹300
            </div>
          </div>

          <!-- Buyer Pays Total -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-mitti-deep text-white shadow-md">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🛒</span>
              <div>
                <div class="font-black text-sm">Buyer pays (total)</div>
                <div class="text-[11px] text-emerald-200">Transparent service + delivery cost</div>
              </div>
            </div>
            <div class="text-2xl font-black text-amber-300" id="calc-buyer-total">
              ₹${(initialAmount + Math.round(initialAmount * 0.07) + 300).toLocaleString('en-IN')}
            </div>
          </div>

          <div class="p-3 bg-blue-50 text-blue-900 text-xs rounded-xl border border-blue-200 flex items-center gap-2">
            <span>ℹ️</span>
            <span>Buyer sees the extra amount as a transparent, fair service + delivery cost.</span>
          </div>

        </div>

        <!-- Column 2: What Happens: Comparison (Traders vs MittiMart) -->
        <div class="space-y-4">
          <h4 class="font-extrabold text-sm uppercase tracking-wider text-neutral-800 border-b border-mitti pb-3">
            What Happens: Comparison
          </h4>

          <!-- Traditional Middlemen Box -->
          <div class="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-red-700">If Sold to Traders</span>
              <span class="text-[10px] bg-red-200 text-red-900 font-bold px-2 py-0.5 rounded">Traditional System</span>
            </div>
            <div class="text-xs text-neutral-600">Trader pays to farmer (after arbitrary cuts, weighing loss & margins):</div>
            <div class="text-2xl font-black text-red-700" id="calc-trader-payout">
              ₹${Math.round(initialAmount * 0.8).toLocaleString('en-IN')} - ₹${Math.round(initialAmount * 0.85).toLocaleString('en-IN')}
            </div>
            <div class="text-xs text-red-800 font-medium">
              ❌ Middlemen pocket ₹${Math.round(initialAmount * 0.15).toLocaleString('en-IN')} to ₹${Math.round(initialAmount * 0.20).toLocaleString('en-IN')} of farmer's hard work.
            </div>
          </div>

          <!-- VS Divider -->
          <div class="text-center">
            <span class="px-3 py-1 bg-amber-400 text-black font-black text-xs rounded-full shadow">VS</span>
          </div>

          <!-- MittiMart Direct Model Box -->
          <div class="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500 space-y-2 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">If Sold on MittiMart</span>
              <span class="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">MittiMart Advantage</span>
            </div>
            <div class="text-xs text-neutral-600">MittiMart pays to farmer (100% full agreed price):</div>
            <div class="text-3xl font-black text-emerald-800" id="calc-mittimart-payout">
              ₹${initialAmount.toLocaleString('en-IN')}
            </div>
            <div class="text-xs text-emerald-900 font-bold flex items-center gap-1.5 pt-1">
              <span>📈</span>
              <span id="calc-farmer-extra">
                Farmer receives ₹${Math.round(initialAmount * 0.18).toLocaleString('en-IN')} more (+18% to 25% better price!)
              </span>
            </div>
          </div>

        </div>

      </div>

      <!-- Slide 11 Bottom Guarantee Pillars -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-mitti">
        
        <!-- What We Don't Charge -->
        <div class="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
          <div class="font-bold text-xs text-red-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>❌</span> <span>What We DON'T Charge</span>
          </div>
          <ul class="text-xs text-red-800 space-y-1 font-medium">
            <li>✕ No commission on farmer sales</li>
            <li>✕ No lifetime registration fee</li>
            <li>✕ No quarterly or annual membership</li>
          </ul>
        </div>

        <!-- Free Registration -->
        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
          <div class="font-bold text-xs text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>🎁</span> <span>Registration is 100% Free</span>
          </div>
          <p class="text-xs text-emerald-800">
            We remove upfront barriers so more farmers can join, list harvests, and grow with us without any risk.
          </p>
        </div>

        <!-- Our Revenue Model -->
        <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
          <div class="font-bold text-xs text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>🎯</span> <span>Our Revenue Model</span>
          </div>
          <p class="text-xs text-amber-800">
            We earn from the value we create through platform technology (7%) and logistics, <strong>NOT</strong> taking a cut from the farmer's earnings.
          </p>
        </div>

      </div>

    </div>
  `;
}

function handlePricingInputChange(val) {
  const amount = Number(val) || 10000;
  
  // Sync slider and input
  const input = document.getElementById('pricing-input');
  const slider = document.getElementById('pricing-slider');
  if (input && Number(input.value) !== amount) input.value = amount;
  if (slider && Number(slider.value) !== amount) slider.value = amount;

  const platformFee = Math.round(amount * 0.07);
  const logisticsFee = amount >= 20000 ? Math.round(amount * 0.02) + 300 : 300;
  const buyerTotal = amount + platformFee + logisticsFee;

  const traderLow = Math.round(amount * 0.80);
  const traderHigh = Math.round(amount * 0.85);
  const farmerExtra = Math.round(amount * 0.18);

  const elPayout = document.getElementById('calc-farmer-payout');
  const elPlat = document.getElementById('calc-platform-fee');
  const elLog = document.getElementById('calc-logistics-fee');
  const elTotal = document.getElementById('calc-buyer-total');
  const elTrader = document.getElementById('calc-trader-payout');
  const elMitti = document.getElementById('calc-mittimart-payout');
  const elExtra = document.getElementById('calc-farmer-extra');

  if (elPayout) elPayout.textContent = `₹${amount.toLocaleString('en-IN')}`;
  if (elPlat) elPlat.textContent = `₹${platformFee.toLocaleString('en-IN')}`;
  if (elLog) elLog.textContent = `₹${logisticsFee.toLocaleString('en-IN')}`;
  if (elTotal) elTotal.textContent = `₹${buyerTotal.toLocaleString('en-IN')}`;
  if (elTrader) elTrader.textContent = `₹${traderLow.toLocaleString('en-IN')} - ₹${traderHigh.toLocaleString('en-IN')}`;
  if (elMitti) elMitti.textContent = `₹${amount.toLocaleString('en-IN')}`;
  if (elExtra) elExtra.textContent = `Farmer receives ₹${farmerExtra.toLocaleString('en-IN')} more (+18% to 25% better price!)`;
}
