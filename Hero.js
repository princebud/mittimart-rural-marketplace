/**
 * MittiMart Hero Section Component
 * Directly captures the vision, emblem, and brand identity of Slide 1, 5, 8
 */

function renderHero() {
  return `
    <section class="relative overflow-hidden bg-gradient-to-b from-[#f2ede2] via-white to-mitti-cream pt-12 pb-20 border-b border-mitti">
      <!-- Subtle Decorative Elements -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div class="absolute top-1/2 -left-24 w-80 h-80 bg-amber-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Content -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <!-- Pitch Challenge Competition Badge -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-mitti-deep text-xs font-semibold shadow-sm">
              <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>🏆 ${t('heroBadge')}</span>
            </div>

            <!-- Main Heading with Indian Agriculture Typography -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-mitti-deep tracking-tight leading-[1.15]">
              ${t('heroTitlePrefix')} <span class="text-emerald-700 underline decoration-amber-400 decoration-wavy underline-offset-8">${t('heroTitleMitti')}</span><br/>
              ${t('heroTitleSuffix')}
            </h1>

            <!-- Tagline from Slide 1 -->
            <p class="text-xl sm:text-2xl font-serif-indian text-amber-800 font-semibold italic">
              "${t('taglineHindi')}"
            </p>

            <!-- Description with key differentiators -->
            <p class="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ${t('heroDesc')}
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button onclick="navigateTo('marketplace')" 
                class="btn-primary w-full sm:w-auto text-base px-7 py-3.5 shadow-lg">
                <span>🌾</span>
                <span>${t('btnExploreProducts')}</span>
                <span>→</span>
              </button>

              <button onclick="handleSellClick()" 
                class="btn-secondary w-full sm:w-auto text-base px-7 py-3.5">
                <span>👨‍🌾</span>
                <span>${t('btnSellOnMittiMart')}</span>
              </button>

              <button onclick="navigateTo('pricing')" 
                class="text-xs font-bold text-emerald-800 hover:text-emerald-900 underline py-2">
                See 7% Fee Model →
              </button>
            </div>

            <!-- Trust Metrics Bar -->
            <div class="pt-6 border-t border-mitti/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div class="p-3 bg-white/70 rounded-xl border border-mitti/50 shadow-sm">
                <div class="text-xl font-extrabold text-mitti-deep">100%</div>
                <div class="text-xs text-neutral-500 font-medium">To Farmer (0% Cut)</div>
              </div>
              <div class="p-3 bg-white/70 rounded-xl border border-mitti/50 shadow-sm">
                <div class="text-xl font-extrabold text-amber-600">7.0%</div>
                <div class="text-xs text-neutral-500 font-medium">Transparent Buyer Fee</div>
              </div>
              <div class="p-3 bg-white/70 rounded-xl border border-mitti/50 shadow-sm">
                <div class="text-xl font-extrabold text-mitti-deep">18+ Hubs</div>
                <div class="text-xs text-neutral-500 font-medium">Mitti Saathis On-Ground</div>
              </div>
              <div class="p-3 bg-white/70 rounded-xl border border-mitti/50 shadow-sm">
                <div class="text-xl font-extrabold text-emerald-700">₹5 Cr</div>
                <div class="text-xs text-neutral-500 font-medium">Year-1 GMV Target</div>
              </div>
            </div>

          </div>

          <!-- Right Visual: MittiMart Official Emblem & Farm Showcase Card -->
          <div class="lg:col-span-5 flex flex-col items-center">
            <div class="relative w-full max-w-md">
              
              <!-- Floating Emblem Seal from Presentation Slide 1 -->
              <div class="bg-white rounded-3xl p-6 shadow-2xl border-2 border-emerald-900/10 text-center relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full opacity-40"></div>
                
                <!-- Official MittiMart Seal Artwork -->
                <div class="w-32 h-32 mx-auto rounded-full seal-ring bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-3 relative shadow-md">
                  <div class="w-full h-full rounded-full border-2 border-dashed border-emerald-800 flex flex-col items-center justify-center p-2 text-center bg-white">
                    <span class="text-3xl">👨‍🌾</span>
                    <span class="text-[9px] font-black text-emerald-900 tracking-tighter uppercase mt-0.5">मिट्टीमार्ट</span>
                    <span class="text-[7px] text-amber-700 font-bold">उन्नत किसान · उन्नत भारत</span>
                  </div>
                </div>

                <div class="mt-4">
                  <h3 class="text-lg font-bold text-mitti-deep">MittiMart Certified Hub</h3>
                  <p class="text-xs text-neutral-500">Connecting Rural Producers to Verified Markets</p>
                </div>

                <!-- Verified Live Harvest Snapshot -->
                <div class="mt-5 p-4 rounded-2xl bg-mitti-sand text-left border border-mitti space-y-2.5">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-neutral-800">Featured Active Harvest:</span>
                    <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                      Verified by Saathi
                    </span>
                  </div>
                  <div class="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=160&auto=format&fit=crop&q=80" 
                      class="w-16 h-16 rounded-xl object-cover shadow-sm border border-white" alt="Wheat"/>
                    <div>
                      <div class="font-bold text-sm text-mitti-deep">Sehore Sharbati Wheat</div>
                      <div class="text-xs text-neutral-600">Farmer: Ramesh Patel (Sehore, MP)</div>
                      <div class="text-xs font-bold text-emerald-800 mt-1">₹2,850 / Quintal <span class="text-[10px] text-neutral-400 font-normal">(Mandi: ₹2,450)</span></div>
                    </div>
                  </div>
                </div>

                <!-- Mitti Saathi Village Support Ribbon (Slide 8) -->
                <div class="mt-4 py-2.5 px-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between text-left text-xs text-amber-900">
                  <div class="flex items-center gap-2">
                    <span class="text-base">🤝</span>
                    <div>
                      <div class="font-bold">Mitti Saathi Assisted</div>
                      <div class="text-[10px] text-amber-700">Digital help in 18+ village panchayats</div>
                    </div>
                  </div>
                  <button onclick="navigateTo('saathi')" class="text-xs font-bold text-amber-800 underline">
                    Learn more
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}
