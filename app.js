/**
 * MittiMart Main Application Router & Controller
 */

function navigateTo(tab) {
  window.MittiMartState.setActiveTab(tab);
}

function renderCurrentPage() {
  const navContainer = document.getElementById('navbar-container');
  const footerContainer = document.getElementById('footer-container');

  if (navContainer) navContainer.innerHTML = renderNavbar();
  if (footerContainer) footerContainer.innerHTML = renderFooter();

  const tab = window.MittiMartState.activeTab;

  switch (tab) {
    case 'home':
      renderHomePage();
      break;
    case 'marketplace':
      renderMarketplacePage();
      break;
    case 'farmer':
      renderFarmerDashboard();
      break;
    case 'buyer':
      renderBuyerDashboard();
      break;
    case 'saathi':
      renderSaathiDashboard();
      break;
    case 'admin':
      renderAdminDashboard();
      break;
    case 'pricing':
      const container = document.getElementById('view-container');
      if (container) {
        container.innerHTML = `
          <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            ${renderPricingCalculator(10000)}
            ${renderFinancialOverview()}
          </div>
        `;
      }
      break;
    case 'about':
      renderAboutPage();
      break;
    case 'trust':
      renderTrustSafetyPage();
      break;
    default:
      renderHomePage();
  }
}

// Router Event Listeners
window.addEventListener('DOMContentLoaded', () => {
  // Sync hash with active tab
  const hash = window.location.hash.replace('#', '') || 'home';
  window.MittiMartState.activeTab = hash;

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '') || 'home';
    if (newHash !== window.MittiMartState.activeTab) {
      window.MittiMartState.activeTab = newHash;
      renderCurrentPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Listen to State Events
  window.MittiMartState.on('userChanged', () => {
    renderCurrentPage();
  });

  window.MittiMartState.on('tabChanged', () => {
    renderCurrentPage();
  });

  window.MittiMartState.on('cartUpdated', () => {
    const nav = document.getElementById('navbar-container');
    if (nav) nav.innerHTML = renderNavbar();
  });

  window.MittiMartState.on('languageChanged', () => {
    renderCurrentPage();
  });

  // Initial render
  renderCurrentPage();
  console.log('[MittiMart] Client Application Bootstrapped.');
});
