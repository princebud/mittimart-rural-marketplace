/**
 * MittiMart Global State Management & Event Bus
 */

class MittiMartStore {
  constructor() {
    this.events = {};
    
    // Default demo persona: Farmer Ramesh Kumar Patel
    this.currentUser = {
      id: "user-farmer-1",
      name: "Ramesh Kumar Patel",
      phone: "9826012345",
      role: "farmer",
      village: "Ashta / Kothri",
      district: "Sehore",
      state: "Madhya Pradesh",
      rating: 4.9,
      isVerified: true,
      verificationDoc: "Kisan Credit Card"
    };

    this.activeTab = 'home';
    this.cart = [];
    this.savedProductIds = new Set();
    this.selectedProductForOffer = null;
    this.selectedProductForDetail = null;
    this.checkoutItem = null;

    this.initFromStorage();
  }

  initFromStorage() {
    try {
      const savedUser = localStorage.getItem('mittimart_active_user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
      const savedCart = localStorage.getItem('mittimart_cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    } catch (e) {
      console.warn('LocalStorage parse warning', e);
    }
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return () => {
      this.events[event] = this.events[event].filter(l => l !== listener);
    };
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(data));
    }
  }

  setCurrentUser(user) {
    this.currentUser = user;
    localStorage.setItem('mittimart_active_user', JSON.stringify(user));
    this.emit('userChanged', user);
    this.notify(`Active role switched to: ${user.name} (${user.role.toUpperCase()})`, 'success');
  }

  setActiveTab(tab) {
    this.activeTab = tab;
    window.location.hash = tab;
    this.emit('tabChanged', tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product, quantity = 1) {
    const existing = this.cart.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    localStorage.setItem('mittimart_cart', JSON.stringify(this.cart));
    this.emit('cartUpdated', this.cart);
    this.notify(`Added ${product.name} to trade cart!`, 'success');
  }

  clearCart() {
    this.cart = [];
    localStorage.setItem('mittimart_cart', JSON.stringify([]));
    this.emit('cartUpdated', this.cart);
  }

  toggleSaveProduct(productId) {
    if (this.savedProductIds.has(productId)) {
      this.savedProductIds.delete(productId);
      this.notify('Removed from saved harvests', 'info');
    } else {
      this.savedProductIds.add(productId);
      this.notify('Added to saved harvests', 'success');
    }
    this.emit('savedUpdated', Array.from(this.savedProductIds));
  }

  notify(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-4 mb-2 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium animate-fade-in ${
      type === 'success' ? 'bg-[#1b4332] text-white border border-[#40916c]' :
      type === 'error' ? 'bg-red-800 text-white' :
      'bg-[#dda15e] text-[#1b4332] font-semibold'
    }`;

    const icon = type === 'success' ? '🌾' : type === 'error' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
}

window.MittiMartState = new MittiMartStore();
