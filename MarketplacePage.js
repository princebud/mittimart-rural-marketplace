/**
 * MittiMart Marketplace Page View
 * Real-time agricultural search, category filtering, mandi benchmark comparisons
 */

let currentMarketplaceFilters = {
  category: 'all',
  search: '',
  location: '',
  sort: 'newest',
  isOrganic: false
};

function renderMarketplacePage() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const categories = [
    { id: 'all', label: t('categoryAll'), icon: '🌾' },
    { id: 'grains', label: t('categoryGrains'), icon: '🌾' },
    { id: 'vegetables', label: t('categoryVegetables'), icon: '🥬' },
    { id: 'fruits', label: t('categoryFruits'), icon: '🍎' },
    { id: 'pulses', label: t('categoryPulses'), icon: '🥣' },
    { id: 'spices', label: t('categorySpices'), icon: '🌶️' },
    { id: 'seeds', label: t('categorySeeds'), icon: '🌻' }
  ];

  container.innerHTML = `
    <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Marketplace Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-mitti pb-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">Verified Direct Marketplace</span>
          <h1 class="text-3xl font-black text-mitti-deep font-serif-indian">
            ${t('marketplaceTitle')}
          </h1>
          <p class="text-xs text-neutral-500 mt-1">${t('marketplaceSubtitle')}</p>
        </div>

        <!-- Add Produce CTA for Farmers and Saathis -->
        <button onclick="handleSellClick()" class="btn-primary text-xs sm:text-sm py-2.5 px-5 font-bold self-start sm:self-auto shadow-md">
          <span>🌾</span> <span>${t('btnSellOnMittiMart')}</span>
        </button>
      </div>

      <!-- Search & Filter Controls Bar -->
      <div class="bg-white p-5 rounded-3xl border border-mitti shadow-sm space-y-4">
        
        <!-- Search and Location Row -->
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          <div class="sm:col-span-6 relative">
            <input type="text" id="market-search" value="${currentMarketplaceFilters.search}"
              placeholder="${t('searchPlaceholder')}"
              oninput="handleMarketSearchChange(this.value)"
              class="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-mitti text-sm bg-neutral-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"/>
            <span class="absolute left-3.5 top-3 text-sm text-neutral-400">🔍</span>
          </div>

          <div class="sm:col-span-3 relative">
            <input type="text" id="market-location" value="${currentMarketplaceFilters.location}"
              placeholder="Filter District / State (e.g. Sehore, Nashik)"
              oninput="handleMarketLocationChange(this.value)"
              class="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-mitti text-sm bg-neutral-50/60 focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"/>
            <span class="absolute left-3 top-3 text-xs text-neutral-400">📍</span>
          </div>

          <div class="sm:col-span-3">
            <select id="market-sort" onchange="handleMarketSortChange(this.value)"
              class="w-full px-3 py-2.5 rounded-2xl border border-mitti text-sm bg-neutral-50/60 font-medium outline-none">
              <option value="newest" ${currentMarketplaceFilters.sort === 'newest' ? 'selected' : ''}>🌱 ${t('sortNewest')}</option>
              <option value="price_asc" ${currentMarketplaceFilters.sort === 'price_asc' ? 'selected' : ''}>📉 ${t('sortPriceLow')}</option>
              <option value="price_desc" ${currentMarketplaceFilters.sort === 'price_desc' ? 'selected' : ''}>📈 ${t('sortPriceHigh')}</option>
            </select>
          </div>

        </div>

        <!-- Category Pills Row -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          ${categories.map(cat => `
            <button onclick="handleMarketCategoryChange('${cat.id}')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 flex items-center gap-1.5 ${
                currentMarketplaceFilters.category === cat.id 
                  ? 'bg-mitti-deep text-white shadow-sm' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }">
              <span>${cat.icon}</span> <span>${cat.label}</span>
            </button>
          `).join('')}

          <!-- Organic Filter Toggle -->
          <button onclick="handleMarketOrganicToggle()"
            class="px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 flex items-center gap-1.5 ${
              currentMarketplaceFilters.isOrganic 
                ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500' 
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }">
            <span>🌱</span> <span>100% Organic Only</span>
          </button>
        </div>

      </div>

      <!-- Products Grid Display -->
      <div id="marketplace-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div class="col-span-full py-16 text-center text-neutral-400">Loading harvests...</div>
      </div>

    </div>
  `;

  loadMarketplaceProducts();
}

function loadMarketplaceProducts() {
  const grid = document.getElementById('marketplace-grid');
  if (!grid) return;

  window.MittiMartAPI.getProducts({
    category: currentMarketplaceFilters.category,
    search: currentMarketplaceFilters.search,
    location: currentMarketplaceFilters.location,
    sort: currentMarketplaceFilters.sort,
    isOrganic: currentMarketplaceFilters.isOrganic
  }).then(res => {
    if (!res.success || !res.products || res.products.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-4 bg-white rounded-3xl border border-mitti p-8">
          <div class="text-4xl">🌾</div>
          <h3 class="text-lg font-bold text-neutral-800">No harvests found matching your filters</h3>
          <p class="text-xs text-neutral-500 max-w-sm mx-auto">
            Try resetting your search query, location filter, or category selection.
          </p>
          <button onclick="resetMarketplaceFilters()" class="btn-secondary text-xs py-2 px-4 font-bold">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = res.products.map(p => renderProductCard(p)).join('');
  });
}

function handleMarketCategoryChange(catId) {
  currentMarketplaceFilters.category = catId;
  renderMarketplacePage();
}

function handleMarketSearchChange(val) {
  currentMarketplaceFilters.search = val;
  // Debounce search
  clearTimeout(window._marketSearchTimeout);
  window._marketSearchTimeout = setTimeout(() => {
    loadMarketplaceProducts();
  }, 250);
}

function handleMarketLocationChange(val) {
  currentMarketplaceFilters.location = val;
  clearTimeout(window._marketLocTimeout);
  window._marketLocTimeout = setTimeout(() => {
    loadMarketplaceProducts();
  }, 250);
}

function handleMarketSortChange(val) {
  currentMarketplaceFilters.sort = val;
  loadMarketplaceProducts();
}

function handleMarketOrganicToggle() {
  currentMarketplaceFilters.isOrganic = !currentMarketplaceFilters.isOrganic;
  renderMarketplacePage();
}

function resetMarketplaceFilters() {
  currentMarketplaceFilters = {
    category: 'all',
    search: '',
    location: '',
    sort: 'newest',
    isOrganic: false
  };
  renderMarketplacePage();
}
