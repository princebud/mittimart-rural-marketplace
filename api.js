/**
 * MittiMart API Client
 * Interfaces with backend endpoints with resilient fallbacks
 */

const API_BASE = '/api';

const api = {
  // Generic fetch wrapper
  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (window.MittiMartState && window.MittiMartState.currentUser) {
      headers['Authorization'] = `Bearer demo-token-${window.MittiMartState.currentUser.id}`;
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(`[API] Error calling ${endpoint}:`, error.message);
      return { success: false, message: error.message };
    }
  },

  // Auth & Personas
  async getDemoUsers() {
    return this.request('/auth/demo-users');
  },

  async switchDemoUser(userId, role) {
    return this.request('/auth/switch-demo-user', {
      method: 'POST',
      body: JSON.stringify({ userId, role })
    });
  },

  async registerUser(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Products
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(k => {
      if (params[k] !== undefined && params[k] !== null && params[k] !== '') {
        searchParams.append(k, params[k]);
      }
    });
    return this.request(`/products?${searchParams.toString()}`);
  },

  async getProduct(id) {
    return this.request(`/products/${id}`);
  },

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE'
    });
  },

  // Offers
  async getOffers(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/offers?${searchParams.toString()}`);
  },

  async submitOffer(offerData) {
    return this.request('/offers', {
      method: 'POST',
      body: JSON.stringify(offerData)
    });
  },

  async acceptOffer(offerId, note = '') {
    return this.request(`/offers/${offerId}/accept`, {
      method: 'POST',
      body: JSON.stringify({ farmerResponseNote: note })
    });
  },

  async rejectOffer(offerId, note = '') {
    return this.request(`/offers/${offerId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ farmerResponseNote: note })
    });
  },

  // Orders
  async getOrders(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/orders?${searchParams.toString()}`);
  },

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  },

  async checkoutOrder(orderData) {
    return this.request('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async updateOrderStatus(orderId, statusData) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    });
  },

  // Mitti Saathi
  async getAssistedFarmers(saathiId) {
    const q = saathiId ? `?saathiId=${saathiId}` : '';
    return this.request(`/saathi/farmers${q}`);
  },

  async assistFarmer(farmerData) {
    return this.request('/saathi/assist-farmer', {
      method: 'POST',
      body: JSON.stringify(farmerData)
    });
  },

  async getSaathiStats(saathiId) {
    const q = saathiId ? `?saathiId=${saathiId}` : '';
    return this.request(`/saathi/stats${q}`);
  },

  // Admin & Governance
  async getAdminAnalytics() {
    return this.request('/admin/analytics');
  },

  async getAdminUsers() {
    return this.request('/admin/users');
  },

  async verifyUser(userId, status) {
    return this.request(`/admin/users/${userId}/verify`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  async resetData() {
    return this.request('/admin/reset-data', {
      method: 'POST'
    });
  },

  // Pricing & Transparency Engine (Slide 11)
  async calculatePricing(amount = 10000) {
    return this.request(`/pricing/calculate?amount=${amount}`);
  }
};

window.MittiMartAPI = api;
