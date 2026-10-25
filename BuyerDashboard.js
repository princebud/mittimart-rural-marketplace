/**
 * MittiMart Buyer Dashboard View
 * Buyer portal: Procurement tracking, active offers, order tracking with transparent fee breakdown
 */

function renderBuyerDashboard() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const user = window.MittiMartState.currentUser;
  const isBuyer = user.role === 'buyer';

  // Informative switch helper
  if (!isBuyer) {
    container.innerHTML = `
      <div class="py-16 max-w-xl mx-auto px-4 text-center space-y-4">
        <div class="text-5xl">🛒</div>
        <h2 class="text-2xl font-black text-mitti-deep font-serif-indian">Buyer Procurement Portal</h2>
        <p class="text-xs text-neutral-600">
          You are currently viewing as <strong>${user.name}</strong> (${user.role.toUpperCase()}). Switch to the Buyer persona (Anita Sharma - Organic Superstore Retailer) to track submitted negotiation offers, view transparent fee invoices, and track orders.
        </p>
        <button onclick="handlePersonaSwitch('user-buyer-1', 'buyer')" class="btn-primary text-xs py-2.5 px-6 font-bold shadow-md">
          Switch to Buyer (Anita Sharma - Retailer) →
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Buyer Profile Banner -->
      <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-mitti-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          
          <div class="flex items-center gap-4">
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'}" 
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-300 shadow-md" alt="${user.name}"/>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-indian">${user.name}</h1>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-300 text-blue-950 uppercase">
                  ${user.buyerType || 'Retailer'} Buyer
                </span>
              </div>
              <p class="text-xs text-blue-200 mt-0.5">
                🏢 ${user.businessName || 'FreshRoots Organic Superstores (3 Outlets)'} · 📍 ${user.district || 'Bhopal'}, ${user.state || 'MP'}
              </p>
              <div class="flex flex-wrap items-center gap-3 text-xs text-blue-100/90 mt-2">
                <span>📋 GST / FSSAI: Verified</span>
                <span>⭐ Rating: 4.95 / 5.0 (Prompt Payee)</span>
                <span>📞 ${user.phone}</span>
              </div>
            </div>
          </div>

          <button onclick="navigateTo('marketplace')" class="btn-gold text-xs py-2.5 px-5 font-bold shadow-md self-start sm:self-auto">
            <span>🔍</span> <span>Browse Agricultural Harvests</span>
          </button>

        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Active Procurement Orders</div>
          <div class="text-2xl font-black text-blue-800 mt-1" id="b-stat-orders">-</div>
          <div class="text-[10px] text-neutral-400 mt-0.5">Farmgate deliveries</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Active Offers Sent</div>
          <div class="text-2xl font-black text-amber-600 mt-1" id="b-stat-offers">-</div>
          <div class="text-[10px] text-neutral-400 mt-0.5">Pending farmer review</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Saved Harvests</div>
          <div class="text-2xl font-black text-mitti-deep mt-1">${window.MittiMartState.savedProductIds.size}</div>
          <div class="text-[10px] text-neutral-400 mt-0.5">In your wishlist</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Escrow Protected Value</div>
          <div class="text-2xl font-black text-emerald-800 mt-1" id="b-stat-escrow">₹30,800</div>
          <div class="text-[10px] text-emerald-600 font-bold mt-0.5">100% safe until delivery</div>
        </div>
      </div>

      <!-- Section: Submitted Negotiation Offers (Flow 2 & 3) -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-mitti shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <h2 class="text-xl font-black text-mitti-deep">My Submitted Negotiation Offers</h2>
            <p class="text-xs text-neutral-500">Track farmer responses and transparent fee calculations</p>
          </div>
          <button onclick="navigateTo('marketplace')" class="btn-secondary text-xs py-1.5 px-3.5">
            + Explore More Crops
          </button>
        </div>

        <div id="buyer-offers-list" class="space-y-4">
          <div class="py-8 text-center text-neutral-400 text-xs">Loading offers...</div>
        </div>
      </div>

      <!-- Section: Confirmed Orders & Live Transport Tracking (Flow 4) -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-mitti shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <h2 class="text-xl font-black text-mitti-deep">Confirmed Orders & Farmgate Delivery</h2>
            <p class="text-xs text-neutral-500">Track local transport partner coordinates and transparent invoices</p>
          </div>
        </div>

        <div id="buyer-orders-list" class="space-y-4">
          <div class="py-8 text-center text-neutral-400 text-xs">Loading orders...</div>
        </div>
      </div>

    </div>
  `;

  loadBuyerDashboardData(user.id);
}

function loadBuyerDashboardData(buyerId) {
  // 1. Load Buyer Offers
  window.MittiMartAPI.getOffers({ buyerId }).then(res => {
    const el = document.getElementById('buyer-offers-list');
    const statEl = document.getElementById('b-stat-offers');
    if (!el) return;

    if (res.success && res.offers.length > 0) {
      if (statEl) statEl.textContent = res.offers.length;

      el.innerHTML = res.offers.map(o => `
        <div class="p-5 rounded-2xl bg-neutral-50 border border-mitti space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-mitti/60 pb-3">
            <div class="flex items-center gap-3">
              <img src="${o.productImage || ''}" class="w-12 h-12 rounded-xl object-cover border border-white" alt="${o.productName}"/>
              <div>
                <div class="font-extrabold text-sm text-neutral-900">${o.productName}</div>
                <div class="text-xs text-neutral-500">Farmer: ${o.farmerName} · Contact: ${o.farmerPhone || '+91 98260 12345'}</div>
              </div>
            </div>

            <div>
              <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                o.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                o.status === 'pending' ? 'bg-amber-100 text-amber-900' :
                'bg-red-100 text-red-800'
              }">
                ${o.status.toUpperCase()}
              </span>
            </div>
          </div>

          <!-- Slide 11 Pricing Breakdown -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3 rounded-xl border border-mitti/70">
            <div>
              <span class="text-neutral-400 block">Offered Rate:</span>
              <span class="font-bold text-neutral-800">₹${o.offeredPrice}/${o.unit}</span>
            </div>
            <div>
              <span class="text-neutral-400 block">Quantity:</span>
              <span class="font-bold text-neutral-800">${o.quantity} ${o.unit}</span>
            </div>
            <div>
              <span class="text-neutral-400 block">Farmer Payout (100%):</span>
              <span class="font-bold text-emerald-800">₹${o.farmerTotal.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span class="text-neutral-400 block">Total Buyer Invoice:</span>
              <span class="font-black text-sm text-neutral-900">₹${o.buyerTotal.toLocaleString('en-IN')}</span>
              <span class="text-[10px] text-neutral-400 block">(incl. 7% fee + logistics)</span>
            </div>
          </div>

          ${o.farmerResponseNote ? `
            <div class="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 text-xs border border-emerald-200">
              <strong>Farmer Response:</strong> "${o.farmerResponseNote}"
            </div>
          ` : ''}

        </div>
      `).join('');
    } else {
      if (statEl) statEl.textContent = '0';
      el.innerHTML = `
        <div class="py-8 text-center text-neutral-400 text-xs bg-white rounded-2xl p-6">
          You haven't submitted any negotiation offers yet. Browse harvests on the marketplace to submit direct offers to farmers.
        </div>
      `;
    }
  });

  // 2. Load Buyer Orders
  window.MittiMartAPI.getOrders({ buyerId }).then(res => {
    const el = document.getElementById('buyer-orders-list');
    const statOrders = document.getElementById('b-stat-orders');
    const statEscrow = document.getElementById('b-stat-escrow');
    if (!el) return;

    if (res.success && res.orders.length > 0) {
      if (statOrders) statOrders.textContent = res.orders.length;
      const totalEscrow = res.orders.reduce((sum, o) => sum + (Number(o.totalPaid) || 0), 0);
      if (statEscrow) statEscrow.textContent = `₹${totalEscrow.toLocaleString('en-IN')}`;

      el.innerHTML = res.orders.map(o => `
        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-mitti/60 pb-3">
            <div>
              <div class="font-extrabold text-sm text-neutral-900">${o.orderNumber} · ${o.productName}</div>
              <div class="text-xs text-neutral-500">Farmer: ${o.farmerName} · Pickup: ${o.farmerLocation}</div>
            </div>

            <div class="text-right">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                o.orderStatus === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                o.orderStatus === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                'bg-amber-100 text-amber-900'
              }">
                ${o.orderStatus.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          <!-- Slide 11 Itemized Invoice Breakdown -->
          <div class="p-4 rounded-xl bg-mitti-sand/50 border border-mitti text-xs space-y-1.5">
            <div class="font-bold text-neutral-800 uppercase text-[11px] mb-1">Itemized Transparent Invoice:</div>
            <div class="flex justify-between">
              <span>Farmer Produce Value (${o.quantity} ${o.unit} @ ₹${o.agreedPricePerUnit}):</span>
              <span class="font-bold text-emerald-900">₹${o.farmerPayout.toLocaleString('en-IN')} (100% to farmer)</span>
            </div>
            <div class="flex justify-between text-amber-800">
              <span>MittiMart Platform Fee (7%):</span>
              <span class="font-bold">₹${o.platformFee.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex justify-between text-neutral-600">
              <span>Local Transport Coordination:</span>
              <span class="font-bold">₹${o.logisticsFee.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex justify-between pt-1.5 border-t border-mitti font-black text-sm text-mitti-deep">
              <span>Total Paid via Escrow:</span>
              <span class="text-base text-emerald-900">₹${o.totalPaid.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <!-- Transport Tracking -->
          ${o.transportPartner ? `
            <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">🚚</span>
                <div>
                  <div class="font-bold text-blue-900">${o.transportPartner.name} (${o.transportPartner.vehicleNumber || 'Vehicle Assigned'})</div>
                  <div class="text-[11px] text-blue-700">Driver Phone: ${o.transportPartner.driverPhone || '+91 98931 77889'}</div>
                </div>
              </div>
              <div class="text-xs text-blue-900 font-semibold">
                ${o.transportPartner.trackingNote || 'En route'}
              </div>
            </div>
          ` : ''}

        </div>
      `).join('');
    } else {
      if (statOrders) statOrders.textContent = '0';
      el.innerHTML = `
        <div class="py-8 text-center text-neutral-400 text-xs bg-neutral-50 rounded-2xl p-6">
          No active orders placed yet. Choose any crop from the marketplace to test the demo direct checkout.
        </div>
      `;
    }
  });
}
