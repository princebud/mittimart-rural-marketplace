/**
 * MittiMart Mitti Saathi Facilitator Dashboard
 * Local village human tech assistance portal (Slide 4, 8, 10)
 */

function renderSaathiDashboard() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const user = window.MittiMartState.currentUser;
  const isSaathi = user.role === 'saathi';

  if (!isSaathi) {
    container.innerHTML = `
      <div class="py-16 max-w-xl mx-auto px-4 text-center space-y-4">
        <div class="text-5xl">🤝</div>
        <h2 class="text-2xl font-black text-mitti-deep font-serif-indian">Mitti Saathi Facilitator Portal</h2>
        <p class="text-xs text-neutral-600">
          You are currently viewing as <strong>${user.name}</strong> (${user.role.toUpperCase()}). Switch to the Mitti Saathi persona (Utkarsh Dubey - Sehore Cluster Facilitator) to experience assisted farmer onboarding, crop cataloguing, and rural facilitation.
        </p>
        <button onclick="handlePersonaSwitch('user-saathi-1', 'saathi')" class="btn-primary text-xs py-2.5 px-6 font-bold shadow-md">
          Switch to Mitti Saathi (Utkarsh Dubey) →
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Mitti Saathi Profile Banner -->
      <div class="bg-gradient-to-r from-amber-900 via-amber-800 to-mitti-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          
          <div class="flex items-center gap-4">
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}" 
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-300 shadow-md" alt="${user.name}"/>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-indian">${user.name}</h1>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-300 text-amber-950 uppercase">
                  Village Tech Facilitator
                </span>
              </div>
              <p class="text-xs text-amber-200 mt-0.5">
                📍 Assigned Cluster: Sehore & Ashta Rural Mandi Hub · Phone: ${user.phone}
              </p>
              <div class="flex flex-wrap items-center gap-3 text-xs text-amber-100/90 mt-2">
                <span>📋 Facilitator ID: #MS-MP-04</span>
                <span>⭐ Community Trust Score: 4.96 / 5.0</span>
                <span>🤝 Village Outreach Team: Active</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button onclick="openAssistFarmerModal()" class="btn-gold text-xs py-2.5 px-5 font-bold shadow-md">
              <span>🤝</span> <span>+ Onboard Village Farmer</span>
            </button>
            <button onclick="openAddProductModal()" class="btn-secondary text-xs py-2.5 px-4 font-bold text-mitti-deep bg-white/95">
              <span>🌾</span> <span>+ List Produce on Farmer's Behalf</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Saathi Impact Metrics (Slide 8) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Farmers Assisted</div>
          <div class="text-2xl font-black text-amber-700 mt-1" id="s-stat-farmers">18</div>
          <div class="text-[10px] text-neutral-400 mt-0.5">Onboarded in cluster</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Listings Published</div>
          <div class="text-2xl font-black text-emerald-800 mt-1" id="s-stat-listings">34</div>
          <div class="text-[10px] text-neutral-400 mt-0.5">With Saathi quality badge</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Trades Facilitated</div>
          <div class="text-2xl font-black text-blue-800 mt-1" id="s-stat-trades">14</div>
          <div class="text-[10px] text-neutral-400 mt-0.5">Delivered & verified</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Farmer Fee Charged</div>
          <div class="text-2xl font-black text-emerald-700 mt-1">₹0.00</div>
          <div class="text-[10px] text-emerald-600 font-bold mt-0.5">100% Free assistance</div>
        </div>
      </div>

      <!-- Explanation Card of Mitti Saathi Model (Slide 4 & 8) -->
      <div class="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-3">
        <div class="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
          <span>🤝</span> <span>The Mitti Saathi Model (Slide 4, 8, 10)</span>
        </div>
        <h3 class="text-lg font-bold text-amber-950">A Digital Marketplace with Local Human Support</h3>
        <p class="text-xs text-amber-900/80 leading-relaxed max-w-3xl">
          Rural producers often lack confidence with digital smartphone apps or formal grading terminology. Mitti Saathis are trained local village youth who bridge this gap. They visit farms, photograph crops, verify land records, record harvest details, and help farmers review incoming buyer negotiations — empowering producers to sell at fair value without exploitation.
        </p>
      </div>

      <!-- Section: Assisted Village Farmers Directory -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-mitti shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <h2 class="text-xl font-black text-mitti-deep">Farmers Assisted by This Desk</h2>
            <p class="text-xs text-neutral-500">Manage village producer profiles, verify credentials, and assist with produce listings</p>
          </div>
          <button onclick="openAssistFarmerModal()" class="btn-secondary text-xs py-1.5 px-3.5 font-bold">
            + Onboard Farmer
          </button>
        </div>

        <div id="saathi-farmers-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="col-span-full py-8 text-center text-neutral-400 text-xs">Loading assisted farmers...</div>
        </div>
      </div>

    </div>
  `;

  loadSaathiDashboardData();
}

function loadSaathiDashboardData() {
  window.MittiMartAPI.getAssistedFarmers('user-saathi-1').then(res => {
    const listEl = document.getElementById('saathi-farmers-list');
    const statEl = document.getElementById('s-stat-farmers');
    if (!listEl) return;

    if (res.success && res.assistedFarmers.length > 0) {
      if (statEl) statEl.textContent = res.assistedFarmers.length;

      listEl.innerHTML = res.assistedFarmers.map(f => `
        <div class="p-5 rounded-2xl bg-neutral-50 border border-mitti space-y-3 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-neutral-500">📍 ${f.village}, ${f.district}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ✓ Field Verified
              </span>
            </div>

            <h3 class="font-bold text-base text-neutral-900">${f.farmerName}</h3>
            <div class="text-xs text-neutral-500">Phone: ${f.phone} · Land: ${f.farmSizeAcres || 3} Acres</div>

            <div class="mt-2 flex flex-wrap gap-1">
              ${(f.primaryCrops || ['Wheat']).map(c => `
                <span class="px-2 py-0.5 rounded bg-white border border-mitti text-[10px] font-medium text-neutral-700">
                  ${c}
                </span>
              `).join('')}
            </div>

            ${f.notes ? `
              <p class="text-[11px] text-neutral-500 bg-white p-2.5 rounded-xl border border-mitti/60 mt-3 italic">
                "${f.notes}"
              </p>
            ` : ''}
          </div>

          <div class="pt-3 border-t border-mitti flex items-center justify-between text-xs">
            <span class="text-neutral-400">${f.listingsCreatedCount || 1} active crop lots</span>
            <button onclick="openAddProductModal()" class="text-xs font-bold text-emerald-800 hover:underline">
              + Add Produce
            </button>
          </div>
        </div>
      `).join('');
    } else {
      listEl.innerHTML = '<div class="col-span-full py-8 text-neutral-400 text-xs text-center">No assisted farmers registered yet.</div>';
    }
  });
}
