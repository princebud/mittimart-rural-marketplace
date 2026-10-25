/**
 * MittiMart Responsive Navbar with Demo Persona Switcher
 */

function renderNavbar() {
  const user = window.MittiMartState.currentUser;
  const lang = getLanguage();
  const cartCount = window.MittiMartState.cart.reduce((s, i) => s + i.quantity, 0);

  const roleColors = {
    farmer: 'bg-emerald-800 text-emerald-100 border border-emerald-600',
    buyer: 'bg-blue-800 text-blue-100 border border-blue-600',
    saathi: 'bg-amber-800 text-amber-100 border border-amber-600',
    admin: 'bg-purple-800 text-purple-100 border border-purple-600'
  };

  const roleEmoji = {
    farmer: '👨‍🌾',
    buyer: '🛒',
    saathi: '🤝',
    admin: '🛡️'
  };

  return `
    <!-- Top Demo Persona Bar for Hackathons and Pitch Presentations -->
    <div class="demo-banner text-white px-3 py-2 text-xs font-medium border-b border-white/10 sticky top-0 z-50 shadow-md">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="bg-amber-400 text-black px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
            Demo Mode
          </span>
          <span class="hidden sm:inline text-emerald-100">
            Switch Persona for Presentation:
          </span>
          <!-- Role Quick Switcher Buttons -->
          <div class="inline-flex rounded-lg bg-black/30 p-0.5 gap-1">
            <button onclick="handlePersonaSwitch('user-farmer-1', 'farmer')" 
              class="px-2.5 py-1 rounded-md transition text-xs flex items-center gap-1 ${user.role === 'farmer' ? 'bg-amber-400 text-black font-bold shadow' : 'text-white/80 hover:text-white hover:bg-white/10'}">
              👨‍🌾 Farmer
            </button>
            <button onclick="handlePersonaSwitch('user-buyer-1', 'buyer')" 
              class="px-2.5 py-1 rounded-md transition text-xs flex items-center gap-1 ${user.role === 'buyer' ? 'bg-amber-400 text-black font-bold shadow' : 'text-white/80 hover:text-white hover:bg-white/10'}">
              🛒 Buyer
            </button>
            <button onclick="handlePersonaSwitch('user-saathi-1', 'saathi')" 
              class="px-2.5 py-1 rounded-md transition text-xs flex items-center gap-1 ${user.role === 'saathi' ? 'bg-amber-400 text-black font-bold shadow' : 'text-white/80 hover:text-white hover:bg-white/10'}">
              🤝 Mitti Saathi
            </button>
            <button onclick="handlePersonaSwitch('user-admin-1', 'admin')" 
              class="px-2.5 py-1 rounded-md transition text-xs flex items-center gap-1 ${user.role === 'admin' ? 'bg-amber-400 text-black font-bold shadow' : 'text-white/80 hover:text-white hover:bg-white/10'}">
              🛡️ Admin
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Language Toggle -->
          <button onclick="toggleAppLanguage()" 
            class="bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded flex items-center gap-1.5 transition text-white font-semibold">
            <span>🌐</span>
            <span>${lang === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
          </button>
          
          <!-- Quick Reset Data -->
          <button onclick="handleResetData()" title="Reset demo seed data"
            class="text-emerald-200 hover:text-white text-xs underline hidden md:inline">
            ↺ Reset Seed Data
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="bg-white/95 backdrop-blur-md border-b border-mitti sticky top-8 z-40 shadow-sm transition">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo & Emblem -->
          <div class="flex items-center gap-3 cursor-pointer" onclick="navigateTo('home')">
            <div class="w-12 h-12 rounded-full seal-ring bg-mitti-deep flex items-center justify-center text-white overflow-hidden shadow">
              <span class="text-2xl">🌾</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-black text-mitti-deep tracking-tight font-serif-indian">MittiMart</span>
                <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                  उन्नत भारत
                </span>
              </div>
              <p class="text-[11px] text-mitti-muted font-medium hidden sm:block">
                ${t('taglineHindi')}
              </p>
            </div>
          </div>

          <!-- Desktop Navigation Links -->
          <nav class="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <button onclick="navigateTo('home')" 
              class="nav-link px-3 py-2 rounded-lg transition ${window.MittiMartState.activeTab === 'home' ? 'text-mitti-green bg-emerald-50 font-bold' : 'text-neutral-700 hover:text-mitti-green hover:bg-neutral-50'}">
              ${t('navHome')}
            </button>
            <button onclick="navigateTo('marketplace')" 
              class="nav-link px-3 py-2 rounded-lg transition ${window.MittiMartState.activeTab === 'marketplace' ? 'text-mitti-green bg-emerald-50 font-bold' : 'text-neutral-700 hover:text-mitti-green hover:bg-neutral-50'}">
              ${t('navMarketplace')}
            </button>
            <button onclick="navigateTo('farmer')" 
              class="nav-link px-3 py-2 rounded-lg transition ${window.MittiMartState.activeTab === 'farmer' ? 'text-mitti-green bg-emerald-50 font-bold' : 'text-neutral-700 hover:text-mitti-green hover:bg-neutral-50'}">
              ${t('navFarmerDashboard')}
            </button>
            <button onclick="navigateTo('buyer')" 
              class="nav-link px-3 py-2 rounded-lg transition ${window.MittiMartState.activeTab === 'buyer' ? 'text-mitti-green bg-emerald-50 font-bold' : 'text-neutral-700 hover:text-mitti-green hover:bg-neutral-50'}">
              ${t('navBuyerDashboard')}
            </button>
            <button onclick="navigateTo('saathi')" 
              class="nav-link px-3 py-2 rounded-lg transition ${window.MittiMartState.activeTab === 'saathi' ? 'text-mitti-green bg-emerald-50 font-bold' : 'text-neutral-700 hover:text-mitti-green hover:bg-neutral-50'}">
              ${t('navSaathiDashboard')}
            </button>
            <button onclick="navigateTo('pricing')" 
              class="nav-link px-3 py-2 rounded-lg transition ${window.MittiMartState.activeTab === 'pricing' ? 'text-mitti-green bg-emerald-50 font-bold' : 'text-neutral-700 hover:text-mitti-green hover:bg-neutral-50'}">
              ${t('navPricing')}
            </button>
            <button onclick="navigateTo('admin')" 
              class="nav-link px-3 py-2 rounded-lg transition ${window.MittiMartState.activeTab === 'admin' ? 'text-mitti-green bg-emerald-50 font-bold' : 'text-neutral-700 hover:text-mitti-green hover:bg-neutral-50'}">
              ${t('navAdminDashboard')}
            </button>
            <button onclick="navigateTo('about')" 
              class="nav-link px-3 py-2 rounded-lg transition ${window.MittiMartState.activeTab === 'about' ? 'text-mitti-green bg-emerald-50 font-bold' : 'text-neutral-700 hover:text-mitti-green hover:bg-neutral-50'}">
              ${t('navAbout')}
            </button>
          </nav>

          <!-- Right Action Center -->
          <div class="flex items-center gap-3">
            <!-- Active Persona Badge -->
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl ${roleColors[user.role] || 'bg-neutral-800 text-white'} text-xs font-medium shadow-sm">
              <span>${roleEmoji[user.role]}</span>
              <div class="text-left">
                <div class="font-bold leading-none">${user.name.split(' ')[0]}</div>
                <div class="text-[10px] opacity-80 uppercase tracking-wider">${user.role}</div>
              </div>
            </div>

            <!-- Cart Trigger Button -->
            <button onclick="openCartModal()" 
              class="relative p-2.5 rounded-xl border border-mitti bg-white hover:bg-neutral-50 transition text-mitti-deep shadow-sm" title="Trade Cart">
              <span class="text-lg">🛒</span>
              ${cartCount > 0 ? `<span class="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">${cartCount}</span>` : ''}
            </button>

            <!-- Sell on MittiMart CTA -->
            <button onclick="handleSellClick()" 
              class="btn-primary text-xs sm:text-sm py-2 px-3.5 hidden md:inline-flex">
              <span>🌾</span>
              <span>${t('btnSellOnMittiMart')}</span>
            </button>

            <!-- Mobile Hamburger Menu Button -->
            <button onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100">
              <span class="text-2xl">☰</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-nav" class="hidden lg:hidden border-t border-mitti bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
        <div class="p-3 bg-neutral-50 rounded-xl mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">${roleEmoji[user.role]}</span>
            <div>
              <div class="font-bold text-sm text-neutral-900">${user.name}</div>
              <div class="text-xs text-emerald-700 font-semibold uppercase">${user.role} · ${user.village || 'MP'}</div>
            </div>
          </div>
          <button onclick="openPersonaModal()" class="text-xs text-amber-700 font-bold bg-amber-100 px-2 py-1 rounded">
            Change
          </button>
        </div>

        <button onclick="navigateTo('home'); toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-emerald-50">
          🏡 ${t('navHome')}
        </button>
        <button onclick="navigateTo('marketplace'); toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-emerald-50">
          🌾 ${t('navMarketplace')}
        </button>
        <button onclick="navigateTo('farmer'); toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-emerald-50">
          👨‍🌾 ${t('navFarmerDashboard')}
        </button>
        <button onclick="navigateTo('buyer'); toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-emerald-50">
          🛒 ${t('navBuyerDashboard')}
        </button>
        <button onclick="navigateTo('saathi'); toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-emerald-50">
          🤝 ${t('navSaathiDashboard')}
        </button>
        <button onclick="navigateTo('pricing'); toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-emerald-50">
          📊 ${t('navPricing')}
        </button>
        <button onclick="navigateTo('admin'); toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-emerald-50">
          🛡️ ${t('navAdminDashboard')}
        </button>
        <button onclick="navigateTo('about'); toggleMobileMenu();" class="block w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-emerald-50">
          👥 ${t('navAbout')}
        </button>
      </div>
    </header>
  `;
}

function handlePersonaSwitch(userId, role) {
  window.MittiMartAPI.switchDemoUser(userId, role).then(res => {
    if (res.success && res.user) {
      window.MittiMartState.setCurrentUser(res.user);
      // Auto-navigate to appropriate dashboard
      if (role === 'farmer') navigateTo('farmer');
      else if (role === 'buyer') navigateTo('buyer');
      else if (role === 'saathi') navigateTo('saathi');
      else if (role === 'admin') navigateTo('admin');
    }
  });
}

function toggleAppLanguage() {
  const current = getLanguage();
  const next = current === 'en' ? 'hi' : 'en';
  setLanguage(next);
  window.MittiMartState.notify(next === 'hi' ? 'भाषा बदलकर हिन्दी कर दी गई है।' : 'Language set to English.', 'info');
  window.renderCurrentPage();
}

function handleResetData() {
  if (confirm('Reset MittiMart demonstration database to initial pitch deck seeds?')) {
    window.MittiMartAPI.resetData().then(() => {
      window.MittiMartState.notify('Database restored to authentic presentation default seeds!', 'success');
      window.renderCurrentPage();
    });
  }
}

function handleSellClick() {
  const user = window.MittiMartState.currentUser;
  if (user.role === 'farmer') {
    navigateTo('farmer');
    openAddProductModal();
  } else if (user.role === 'saathi') {
    navigateTo('saathi');
    openAddProductModal();
  } else {
    // Switch to farmer
    handlePersonaSwitch('user-farmer-1', 'farmer');
    setTimeout(() => openAddProductModal(), 300);
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-nav');
  if (menu) menu.classList.toggle('hidden');
}
