/**
 * MittiMart Farmer Dashboard View
 * Comprehensive farmer portal: Produce listings, incoming negotiation offers, order fulfillment
 */

function renderFarmerDashboard() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const user = window.MittiMartState.currentUser;
  const isFarmer = user.role === 'farmer';

  // If user is not currently in farmer persona, show informative prompt with 1-click switch
  if (!isFarmer) {
    container.innerHTML = `
      <div class="py-16 max-w-xl mx-auto px-4 text-center space-y-4">
        <div class="text-5xl">👨‍🌾</div>
        <h2 class="text-2xl font-black text-mitti-deep font-serif-indian">Farmer Dashboard Portal</h2>
        <p class="text-xs text-neutral-600">
          You are currently viewing as <strong>${user.name}</strong> (${user.role.toUpperCase()}). Switch to the Farmer persona to experience produce listing, incoming offer negotiations, and order dispatch.
        </p>
        <button onclick="handlePersonaSwitch('user-farmer-1', 'farmer')" class="btn-primary text-xs py-2.5 px-6 font-bold shadow-md">
          Switch to Farmer (Ramesh Kumar Patel) →
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Farmer Profile Header Banner -->
      <div class="bg-gradient-to-r from-emerald-900 via-mitti-green to-mitti-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl"></div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          
          <div class="flex items-center gap-4">
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80'}" 
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-300 shadow-md" alt="${user.name}"/>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-indian">${user.name}</h1>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-black">
                  ✓ Verified Kisan
                </span>
              </div>
              <p class="text-xs text-emerald-200 mt-0.5">
                📍 Gram: ${user.village || 'Ashta / Kothri'}, ${user.district || 'Sehore'}, ${user.state || 'MP'} · Phone: ${user.phone}
              </p>
              <div class="flex flex-wrap items-center gap-3 text-xs text-emerald-100/90 mt-2">
                <span>🌾 Land: ${user.farmSizeAcres || 6.5} Acres</span>
                <span>⭐ Rating: 4.9 / 5.0 (38 Trades)</span>
                <span>📋 Doc: ${user.verificationDoc || 'Kisan Credit Card'}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button onclick="openAddProductModal()" class="btn-gold text-xs py-2.5 px-5 font-bold shadow-md">
              <span>🌾</span> <span>${t('btnAddNewProduce')}</span>
            </button>
            <button onclick="openAssistFarmerModal()" class="btn-secondary text-xs py-2.5 px-4 font-bold text-mitti-deep bg-white/95">
              <span>🤝</span> <span>Saathi Help</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4" id="farmer-metrics-row">
        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Total Farmer Payout</div>
          <div class="text-2xl font-black text-emerald-800 mt-1" id="f-stat-earnings">₹38,000</div>
          <div class="text-[10px] text-emerald-600 font-bold mt-0.5">100% full agreed price (0% cut)</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Active Listings</div>
          <div class="text-2xl font-black text-mitti-deep mt-1" id="f-stat-listings">-</div>
          <div class="text-[10px] text-neutral-400 mt-0.5">Live on marketplace</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Pending Buyer Offers</div>
          <div class="text-2xl font-black text-amber-600 mt-1" id="f-stat-offers">-</div>
          <div class="text-[10px] text-amber-700 font-medium mt-0.5">Awaiting your response</div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm">
          <div class="text-xs font-semibold text-neutral-500">Orders in Transit</div>
          <div class="text-2xl font-black text-blue-700 mt-1" id="f-stat-orders">-</div>
          <div class="text-[10px] text-blue-600 font-medium mt-0.5">Transport assigned</div>
        </div>
      </div>

      <!-- Section: Incoming Negotiation Offers (Core Demonstration Flow 2 & 3) -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-mitti shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-mitti pb-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold uppercase">
              Action Required
            </div>
            <h2 class="text-xl font-black text-mitti-deep mt-1">Incoming Buyer Offers & Negotiations</h2>
            <p class="text-xs text-neutral-500">Review transparent buyer price proposals. Accept to instantly generate confirmed orders with local transport.</p>
          </div>
        </div>

        <div id="farmer-incoming-offers" class="space-y-4">
          <div class="py-8 text-center text-neutral-400 text-xs">Loading buyer offers...</div>
        </div>
      </div>

      <!-- Section: Active Harvest Listings -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-mitti shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <h2 class="text-xl font-black text-mitti-deep">My Active Crop Listings</h2>
            <p class="text-xs text-neutral-500">Manage crop quantity, asking prices, and harvest photos</p>
          </div>
          <button onclick="openAddProductModal()" class="btn-secondary text-xs py-2 px-3.5 font-bold">
            + List New Produce
          </button>
        </div>

        <div id="farmer-active-listings" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="col-span-full py-8 text-center text-neutral-400 text-xs">Loading listings...</div>
        </div>
      </div>

      <!-- Section: Orders & Fulfillment Tracking (Core Demonstration Flow 4) -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-mitti shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <h2 class="text-xl font-black text-mitti-deep">Orders & Dispatch Fulfillment</h2>
            <p class="text-xs text-neutral-500">Track local transport partner pickup, delivery verification, and full settlement</p>
          </div>
        </div>

        <div id="farmer-orders-list" class="space-y-4">
          <div class="py-8 text-center text-neutral-400 text-xs">Loading orders...</div>
        </div>
      </div>

    </div>
  `;

  loadFarmerDashboardData(user.id);
}

function loadFarmerDashboardData(farmerId) {
  // 1. Load Listings
  window.MittiMartAPI.getProducts({ farmerId }).then(res => {
    const listEl = document.getElementById('farmer-active-listings');
    const statEl = document.getElementById('f-stat-listings');
    if (!listEl) return;

    if (res.success && res.products.length > 0) {
      if (statEl) statEl.textContent = res.products.length;
      listEl.innerHTML = res.products.map(p => `
        <div class="p-4 rounded-2xl bg-neutral-50 border border-mitti flex flex-col justify-between space-y-3">
          <div class="flex gap-3">
            <img src="${(p.images && p.images[0]) || ''}" class="w-16 h-16 rounded-xl object-cover border border-white" alt="${p.name}"/>
            <div>
              <div class="font-bold text-sm text-neutral-900">${p.name}</div>
              <div class="text-xs text-emerald-800 font-black mt-0.5">₹${p.askingPrice.toLocaleString('en-IN')} / ${p.unit}</div>
              <div class="text-[11px] text-neutral-500">Stock: ${p.quantity} ${p.unit}</div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-mitti text-xs">
            <span class="text-[11px] text-neutral-400">${p.viewsCount || 0} views · ${p.offersCount || 0} offers</span>
            <button onclick="handleDeleteProduct('${p.id}')" class="text-xs text-red-600 hover:underline">
              Remove
            </button>
          </div>
        </div>
      `).join('');
    } else {
      if (statEl) statEl.textContent = '0';
      listEl.innerHTML = `
        <div class="col-span-full py-8 text-center text-neutral-400 text-xs bg-mitti-sand/40 rounded-2xl p-6">
          No crops currently listed under this farmer account. Click "+ List New Produce" above to add your first harvest!
        </div>
      `;
    }
  });

  // 2. Load Incoming Offers
  window.MittiMartAPI.getOffers({ farmerId }).then(res => {
    const offersEl = document.getElementById('farmer-incoming-offers');
    const statEl = document.getElementById('f-stat-offers');
    if (!offersEl) return;

    if (res.success && res.offers.length > 0) {
      const pendingOffers = res.offers.filter(o => o.status === 'pending');
      if (statEl) statEl.textContent = pendingOffers.length;

      offersEl.innerHTML = res.offers.map(o => `
        <div class="p-5 rounded-2xl border ${o.status === 'pending' ? 'bg-amber-50/50 border-amber-300' : 'bg-neutral-50 border-mitti'} space-y-3">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-mitti/60 pb-3">
            <div class="flex items-center gap-3">
              <span class="text-2xl">${o.buyerType.includes('Wholesale') ? '🏢' : '🏪'}</span>
              <div>
                <div class="font-extrabold text-sm text-neutral-900">${o.buyerName}</div>
                <div class="text-xs text-neutral-500">${o.buyerType} · 📍 ${o.buyerCity} · Phone: ${o.buyerPhone}</div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                o.status === 'pending' ? 'bg-amber-200 text-amber-900' :
                o.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                'bg-neutral-200 text-neutral-700'
              }">
                ${o.status.toUpperCase()}
              </span>
            </div>
          </div>

          <!-- Produce & Proposed Negotiation Rate -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-xl border border-mitti/70">
            <div>
              <span class="text-neutral-400 block">Requested Crop:</span>
              <span class="font-bold text-neutral-800">${o.productName}</span>
            </div>
            <div>
              <span class="text-neutral-400 block">Buyer Offered Price:</span>
              <span class="font-black text-sm text-emerald-900">₹${o.offeredPrice.toLocaleString('en-IN')} / ${o.unit}</span>
              <span class="text-[10px] text-neutral-400 block">Asking was ₹${o.askingPrice}/${o.unit}</span>
            </div>
            <div>
              <span class="text-neutral-400 block">100% Farmer Net Payout:</span>
              <span class="font-black text-base text-emerald-900">₹${o.farmerTotal.toLocaleString('en-IN')}</span>
              <span class="text-[10px] text-emerald-700 font-semibold block">(Zero commission deducted)</span>
            </div>
          </div>

          ${o.buyerNote ? `
            <div class="text-xs text-neutral-600 bg-neutral-100/60 p-2.5 rounded-lg italic">
              "${o.buyerNote}"
            </div>
          ` : ''}

          <!-- Farmer Actions -->
          ${o.status === 'pending' ? `
            <div class="flex items-center justify-end gap-3 pt-2">
              <button onclick="handleRejectOffer('${o.id}')" class="btn-secondary text-xs py-1.5 px-4 text-red-700 border-red-300 hover:bg-red-50">
                ✕ Decline
              </button>
              <button onclick="handleAcceptOffer('${o.id}')" class="btn-primary text-xs py-1.5 px-5 font-bold shadow-sm">
                <span>✓</span> <span>Accept Offer & Confirm Order</span>
              </button>
            </div>
          ` : `
            <div class="text-right text-xs font-bold text-emerald-800">
              ✓ Converted to Confirmed Order
            </div>
          `}

        </div>
      `).join('');
    } else {
      if (statEl) statEl.textContent = '0';
      offersEl.innerHTML = `
        <div class="py-8 text-center text-neutral-400 text-xs bg-neutral-50 rounded-2xl p-6">
          No buyer negotiation offers yet. As buyers discover your listed harvests on the marketplace, offers will appear here.
        </div>
      `;
    }
  });

  // 3. Load Orders
  window.MittiMartAPI.getOrders({ farmerId }).then(res => {
    const ordersEl = document.getElementById('farmer-orders-list');
    const statEarnings = document.getElementById('f-stat-earnings');
    const statTransit = document.getElementById('f-stat-orders');
    if (!ordersEl) return;

    if (res.success && res.orders.length > 0) {
      const totalEarned = res.orders.reduce((sum, o) => sum + (Number(o.farmerPayout) || 0), 0);
      const activeTransit = res.orders.filter(o => o.orderStatus !== 'completed').length;

      if (statEarnings) statEarnings.textContent = `₹${totalEarned.toLocaleString('en-IN')}`;
      if (statTransit) statTransit.textContent = activeTransit;

      ordersEl.innerHTML = res.orders.map(o => `
        <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-mitti/60 pb-3">
            <div>
              <div class="font-extrabold text-sm text-neutral-900">${o.orderNumber} · ${o.productName}</div>
              <div class="text-xs text-neutral-500">Buyer: ${o.buyerName} (${o.buyerPhone}) · Deliver to: ${o.deliveryAddress}</div>
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

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-mitti-sand/40 p-3 rounded-xl border border-mitti">
            <div>
              <span class="text-neutral-400 block">Quantity:</span>
              <span class="font-bold text-neutral-800">${o.quantity} ${o.unit}</span>
            </div>
            <div>
              <span class="text-neutral-400 block">Agreed Rate:</span>
              <span class="font-bold text-neutral-800">₹${o.agreedPricePerUnit}/${o.unit}</span>
            </div>
            <div>
              <span class="text-neutral-400 block">100% Farmer Net Payout:</span>
              <span class="font-black text-sm text-emerald-900">₹${o.farmerPayout.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span class="text-neutral-400 block">Payment Guarantee:</span>
              <span class="font-bold text-emerald-700">${o.paymentStatus === 'farmer_settled' ? '✓ Settled in Full' : '🔒 Secured in Escrow'}</span>
            </div>
          </div>

          <!-- Transport Partner Details -->
          ${o.transportPartner ? `
            <div class="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-lg">🚚</span>
                <div>
                  <div class="font-bold text-blue-900">${o.transportPartner.name} (Vehicle: ${o.transportPartner.vehicleNumber || 'MP-04'})</div>
                  <div class="text-[11px] text-blue-700">Driver: ${o.transportPartner.driverName || 'Sanjay'} · Phone: ${o.transportPartner.driverPhone || '+91 98765 43210'}</div>
                </div>
              </div>
              <div class="text-right text-[11px] text-neutral-500 font-medium">
                ${o.transportPartner.trackingNote || 'Transport en route to farmgate'}
              </div>
            </div>
          ` : ''}

          <!-- Update Order Progression Status Action -->
          ${o.orderStatus !== 'completed' ? `
            <div class="flex items-center justify-end gap-2 pt-1">
              <button onclick="handleAdvanceOrderStatus('${o.id}', '${o.orderStatus}')" class="btn-primary text-xs py-1.5 px-4 font-bold">
                <span>🚚</span> <span>Advance Status (${getNextStatusLabel(o.orderStatus)})</span>
              </button>
            </div>
          ` : ''}

        </div>
      `).join('');
    } else {
      ordersEl.innerHTML = `
        <div class="py-8 text-center text-neutral-400 text-xs bg-neutral-50 rounded-2xl p-6">
          No confirmed orders yet. Once you accept a buyer's offer, confirmed orders will appear here.
        </div>
      `;
    }
  });
}

function handleAcceptOffer(offerId) {
  window.MittiMartAPI.acceptOffer(offerId, 'Agreed by farmer. Ready for dispatch.').then(res => {
    if (res.success) {
      window.MittiMartState.notify(`Offer accepted! Confirmed Order ${res.order.orderNumber} created!`, 'success');
      renderFarmerDashboard();
    } else {
      alert(res.message || 'Error accepting offer');
    }
  });
}

function handleRejectOffer(offerId) {
  if (confirm('Decline this offer?')) {
    window.MittiMartAPI.rejectOffer(offerId, 'Declined by farmer').then(res => {
      if (res.success) {
        window.MittiMartState.notify('Offer declined.', 'info');
        renderFarmerDashboard();
      }
    });
  }
}

function handleDeleteProduct(productId) {
  if (confirm('Remove this harvest listing from MittiMart marketplace?')) {
    window.MittiMartAPI.deleteProduct(productId).then(res => {
      if (res.success) {
        window.MittiMartState.notify('Listing removed.', 'info');
        renderFarmerDashboard();
      }
    });
  }
}

function getNextStatusLabel(current) {
  if (current === 'confirmed') return 'Mark Transport Assigned';
  if (current === 'transport_assigned') return 'Mark Dispatched / In Transit';
  if (current === 'dispatched') return 'Mark Delivered & Release Settlement';
  return 'Completed';
}

function handleAdvanceOrderStatus(orderId, current) {
  let next = 'completed';
  let note = 'Order completed';

  if (current === 'confirmed') {
    next = 'transport_assigned';
    note = 'Transport vehicle dispatched to farmgate';
  } else if (current === 'transport_assigned') {
    next = 'dispatched';
    note = 'Produce inspected, loaded, and en route';
  } else if (current === 'dispatched') {
    next = 'delivered';
    note = 'Produce received and verified by buyer. Escrow funds released to farmer.';
  }

  window.MittiMartAPI.updateOrderStatus(orderId, { status: next, note }).then(res => {
    if (res.success) {
      window.MittiMartState.notify(`Order status advanced to: ${next.toUpperCase()}`, 'success');
      renderFarmerDashboard();
    }
  });
}
