/**
 * MittiMart Home Page View
 * Comprehensive landing showcasing presentation pillars, 6-step flow, and differentiators
 */

function renderHomePage() {
  const container = document.getElementById('view-container');
  if (!container) return;

  container.innerHTML = `
    <div>
      <!-- 1. Hero Section -->
      ${renderHero()}

      <!-- 2. Core Pillars Bar (Direct Connection, Transparent Trade, Empowering Farmers) -->
      <section class="py-12 bg-white border-b border-mitti">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl flex-shrink-0">
                🤝
              </div>
              <div>
                <h3 class="font-extrabold text-base text-mitti-deep mb-1">${t('pillarDirect')}</h3>
                <p class="text-xs text-neutral-600 leading-relaxed">${t('pillarDirectDesc')}</p>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">
                🛡️
              </div>
              <div>
                <h3 class="font-extrabold text-base text-mitti-deep mb-1">${t('pillarTransparent')}</h3>
                <p class="text-xs text-neutral-600 leading-relaxed">${t('pillarTransparentDesc')}</p>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl flex-shrink-0">
                🌱
              </div>
              <div>
                <h3 class="font-extrabold text-base text-mitti-deep mb-1">${t('pillarSaathi')}</h3>
                <p class="text-xs text-neutral-600 leading-relaxed">${t('pillarSaathiDesc')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 3. Featured Agricultural Harvests -->
      <section class="py-16 bg-mitti-cream">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">Direct From Soil</span>
              <h2 class="text-3xl font-black text-mitti-deep font-serif-indian">Featured Agricultural Harvests</h2>
              <p class="text-xs text-neutral-500 mt-1">Verified farm-gate lots available for direct negotiation or instant purchase</p>
            </div>
            <button onclick="navigateTo('marketplace')" class="btn-secondary text-xs py-2 px-4 font-bold self-start sm:self-auto">
              View All Harvests (${t('navMarketplace')}) →
            </button>
          </div>

          <div id="home-featured-products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="col-span-full py-12 text-center text-neutral-400">Loading authentic harvests...</div>
          </div>
        </div>
      </section>

      <!-- 4. How It Works - The 6-Step Workflow (Presentation Slide 7) -->
      <section class="py-16 bg-white border-y border-mitti">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Slide 7 · Core Transaction Flow
            </div>
            <h2 class="text-3xl sm:text-4xl font-black text-mitti-deep font-serif-indian">
              ${t('howItWorksTitle')}
            </h2>
            <p class="text-xs sm:text-sm text-neutral-500">
              ${t('howItWorksSubtitle')}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti relative group hover:bg-white hover:shadow-md transition">
              <div class="text-3xl mb-3">📝</div>
              <h3 class="font-bold text-base text-mitti-deep mb-2">${t('step1Title')}</h3>
              <p class="text-xs text-neutral-600 leading-relaxed">${t('step1Desc')}</p>
            </div>

            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti relative group hover:bg-white hover:shadow-md transition">
              <div class="text-3xl mb-3">🌾</div>
              <h3 class="font-bold text-base text-mitti-deep mb-2">${t('step2Title')}</h3>
              <p class="text-xs text-neutral-600 leading-relaxed">${t('step2Desc')}</p>
            </div>

            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti relative group hover:bg-white hover:shadow-md transition">
              <div class="text-3xl mb-3">🔍</div>
              <h3 class="font-bold text-base text-mitti-deep mb-2">${t('step3Title')}</h3>
              <p class="text-xs text-neutral-600 leading-relaxed">${t('step3Desc')}</p>
            </div>

            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti relative group hover:bg-white hover:shadow-md transition">
              <div class="text-3xl mb-3">🤝</div>
              <h3 class="font-bold text-base text-mitti-deep mb-2">${t('step4Title')}</h3>
              <p class="text-xs text-neutral-600 leading-relaxed">${t('step4Desc')}</p>
            </div>

            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti relative group hover:bg-white hover:shadow-md transition">
              <div class="text-3xl mb-3">🚚</div>
              <h3 class="font-bold text-base text-mitti-deep mb-2">${t('step5Title')}</h3>
              <p class="text-xs text-neutral-600 leading-relaxed">${t('step5Desc')}</p>
            </div>

            <div class="p-6 rounded-2xl bg-mitti-sand/50 border border-mitti relative group hover:bg-white hover:shadow-md transition">
              <div class="text-3xl mb-3">⭐</div>
              <h3 class="font-bold text-base text-mitti-deep mb-2">${t('step6Title')}</h3>
              <p class="text-xs text-neutral-600 leading-relaxed">${t('step6Desc')}</p>
            </div>

          </div>

        </div>
      </section>

      <!-- 5. What Makes MittiMart Different? (Slide 8) -->
      <section class="py-16 bg-gradient-to-b from-[#faf7f0] to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Slide 8 · Key Competitive Advantage
            </span>
            <h2 class="text-3xl sm:text-4xl font-black text-mitti-deep font-serif-indian">
              ${t('diffTitle')}
            </h2>
            <p class="text-xl font-bold text-emerald-800 italic">
              "${t('diffQuote')}"
            </p>
            <p class="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
              ${t('diffDesc')}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm">
              <div class="text-2xl mb-2">🤝</div>
              <h4 class="font-bold text-sm text-mitti-deep mb-1">Local Human Support</h4>
              <p class="text-xs text-neutral-600">Mitti Saathis assist village producers who struggle with apps, registration, and photography.</p>
            </div>

            <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm">
              <div class="text-2xl mb-2">🏪</div>
              <h4 class="font-bold text-sm text-mitti-deep mb-1">Wider Buyer Access</h4>
              <p class="text-xs text-neutral-600">Connects rural producers with verified buyers beyond their immediate village trader network.</p>
            </div>

            <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm">
              <div class="text-2xl mb-2">📱</div>
              <h4 class="font-bold text-sm text-mitti-deep mb-1">Simple Digital Selling</h4>
              <p class="text-xs text-neutral-600">Intuitive bilingual interface with large touch targets, clear labels, and voice-assisted workflows.</p>
            </div>

            <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm">
              <div class="text-2xl mb-2">📊</div>
              <h4 class="font-bold text-sm text-mitti-deep mb-1">Useful Market Information</h4>
              <p class="text-xs text-neutral-600">Provides local APMC mandi price benchmarks, helping farmers make informed pricing choices.</p>
            </div>

            <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm">
              <div class="text-2xl mb-2">🚚</div>
              <h4 class="font-bold text-sm text-mitti-deep mb-1">Local Delivery Support</h4>
              <p class="text-xs text-neutral-600">Connects confirmed orders directly with local transport partners to pick up produce at farmgate.</p>
            </div>

            <div class="p-6 rounded-2xl bg-white border border-mitti shadow-sm">
              <div class="text-2xl mb-2">👨‍🌾</div>
              <h4 class="font-bold text-sm text-mitti-deep mb-1">Producer in Full Control</h4>
              <p class="text-xs text-neutral-600">The farmer decides the quantity, asking price, and which buyer offers they want to accept.</p>
            </div>

          </div>

        </div>
      </section>

      <!-- 6. Interactive Slide 11 Pricing Model & Calculator -->
      <section class="py-12 bg-mitti-cream">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          ${renderPricingCalculator(10000)}
        </div>
      </section>

      <!-- 7. Mitti Saathi Community Banner (Slide 9 & WhatsApp) -->
      <section class="py-16 bg-mitti-deep text-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div class="lg:col-span-8 space-y-4">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-900/60 px-3 py-1 rounded-full border border-amber-500/30">
                Slide 9 · AI & Community Tech
              </span>
              <h2 class="text-3xl sm:text-4xl font-black font-serif-indian">
                MittiMart App & WhatsApp Community
              </h2>
              <p class="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
                We combine smartphone accessibility with the power of localized WhatsApp groups. Farmers receive real-time demand alerts, price benchmarks, and transport pickup status directly on their mobile phones without complex onboarding.
              </p>
              <div class="flex flex-wrap gap-4 pt-2">
                <a href="https://wa.me/919826012345?text=Hello%20MittiMart%20Team!%20I%20want%20to%20join%20the%20community." 
                  target="_blank" class="btn-gold text-xs py-2.5 px-5">
                  <span>💬</span> <span>Join MittiMart WhatsApp Community</span>
                </a>
                <button onclick="navigateTo('saathi')" class="btn-secondary text-xs py-2.5 px-5 text-mitti-deep">
                  <span>🤝</span> <span>Explore Mitti Saathi Program</span>
                </button>
              </div>
            </div>

            <div class="lg:col-span-4 flex justify-center">
              <div class="w-48 h-48 rounded-full border-4 border-dashed border-amber-400/40 p-3 flex items-center justify-center">
                <div class="w-full h-full rounded-full bg-emerald-800 flex flex-col items-center justify-center text-center p-3">
                  <span class="text-4xl">🌱</span>
                  <span class="text-xs font-bold mt-1">उन्नत किसान</span>
                  <span class="text-[10px] text-amber-300">जय जवान जय किसान</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 8. Trust & Safety "Verify. Record. Resolve." (Slide 10) -->
      <section class="py-16 bg-white border-t border-mitti">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Slide 10 · Risk Mitigation
            </span>
            <h2 class="text-3xl font-black text-mitti-deep font-serif-indian">Trust & Safety Framework</h2>
            <p class="text-lg font-bold text-amber-800 italic">"Verify. Record. Resolve."</p>
            <p class="text-xs text-neutral-500">We make prices, orders and transactions clear so both farmers and buyers know what they are agreeing to.</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div class="p-4 rounded-xl bg-mitti-sand/50 border border-mitti">
              <div class="text-2xl mb-1">👤</div>
              <div class="font-bold text-xs text-neutral-900">01 | User Verification</div>
              <div class="text-[11px] text-neutral-500 mt-1">Basic identity & contact verification for producers & buyers</div>
            </div>
            <div class="p-4 rounded-xl bg-mitti-sand/50 border border-mitti">
              <div class="text-2xl mb-1">🌾</div>
              <div class="font-bold text-xs text-neutral-900">02 | Verified Harvest Details</div>
              <div class="text-[11px] text-neutral-500 mt-1">Produce name, quantity, location & grade recorded before order</div>
            </div>
            <div class="p-4 rounded-xl bg-mitti-sand/50 border border-mitti">
              <div class="text-2xl mb-1">📄</div>
              <div class="font-bold text-xs text-neutral-900">03 | Digital Order Record</div>
              <div class="text-[11px] text-neutral-500 mt-1">Every confirmed order keeps a tamper-proof digital record</div>
            </div>
            <div class="p-4 rounded-xl bg-mitti-sand/50 border border-mitti">
              <div class="text-2xl mb-1">🔒</div>
              <div class="font-bold text-xs text-neutral-900">04 | Safe Digital Escrow</div>
              <div class="text-[11px] text-neutral-500 mt-1">Safe payment records released upon delivery verification</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;

  // Fetch and populate top featured products
  window.MittiMartAPI.getProducts().then(res => {
    const listEl = document.getElementById('home-featured-products');
    if (!listEl) return;
    if (res.success && res.products.length > 0) {
      listEl.innerHTML = res.products.slice(0, 4).map(p => renderProductCard(p)).join('');
    } else {
      listEl.innerHTML = '<div class="col-span-full py-8 text-neutral-500">No active products found.</div>';
    }
  });
}
