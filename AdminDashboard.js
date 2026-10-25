/**
 * MittiMart Admin & Governance Dashboard
 * Platform oversight, verification queue, GMV monitoring (Slide 12 & 13)
 */

function renderAdminDashboard() {
  const container = document.getElementById('view-container');
  if (!container) return;

  const user = window.MittiMartState.currentUser;
  const isAdmin = user.role === 'admin';

  if (!isAdmin) {
    container.innerHTML = `
      <div class="py-16 max-w-xl mx-auto px-4 text-center space-y-4">
        <div class="text-5xl">🛡️</div>
        <h2 class="text-2xl font-black text-mitti-deep font-serif-indian">Admin & Governance Portal</h2>
        <p class="text-xs text-neutral-600">
          You are currently viewing as <strong>${user.name}</strong> (${user.role.toUpperCase()}). Switch to the Admin persona to inspect GMV progress against the ₹5 Crore target, manage verification approvals, and moderate platform listings.
        </p>
        <button onclick="handlePersonaSwitch('user-admin-1', 'admin')" class="btn-primary text-xs py-2.5 px-6 font-bold shadow-md">
          Switch to Admin (Governance Team) →
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <!-- Admin Header Banner -->
      <div class="bg-gradient-to-r from-purple-950 via-slate-900 to-mitti-deep text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-900/80 border-2 border-purple-400 flex items-center justify-center text-3xl shadow-md">
              🛡️
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-indian">Platform Governance Admin</h1>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-400 text-purple-950 uppercase">
                  Pitch Challenge 2026 Admin
                </span>
              </div>
              <p class="text-xs text-purple-200 mt-0.5">
                MittiMart Central Operations Hub · System Security: Active
              </p>
              <div class="flex flex-wrap items-center gap-3 text-xs text-purple-100/90 mt-2">
                <span>🏆 Startup Pitch Challenge 2026</span>
                <span>📊 Course: BCA DS & AI</span>
                <span>👥 Team: Vanshika & Zainab, Utkarsh, Prince, Sudhanshu</span>
              </div>
            </div>
          </div>

          <button onclick="handleResetData()" class="btn-secondary text-xs py-2 px-4 font-bold text-red-700 bg-white hover:bg-red-50 self-start sm:self-auto">
            ↺ Reset Demo Seeds
          </button>

        </div>
      </div>

      <!-- Financial Projections Overview Component (Slide 12 & 13) -->
      <div id="admin-financial-container">
        ${renderFinancialOverview()}
      </div>

      <!-- KYC Verification Queue (Slide 10 Trust Framework) -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-mitti shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase">
              Trust & Verification
            </div>
            <h2 class="text-xl font-black text-mitti-deep mt-1">Seller & Buyer Verification Queue (KYC)</h2>
            <p class="text-xs text-neutral-500">Review submitted Kisan Credit Cards, Aadhaar records, and trade credentials</p>
          </div>
        </div>

        <div id="admin-users-table" class="overflow-x-auto">
          <div class="py-8 text-center text-neutral-400 text-xs">Loading verification queue...</div>
        </div>
      </div>

      <!-- Platform Harvest Listings Moderation -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-mitti shadow-sm space-y-6">
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <h2 class="text-xl font-black text-mitti-deep">Harvest Listings Moderation</h2>
            <p class="text-xs text-neutral-500">Inspect listed harvests, mandi benchmark fairness, and quality standards</p>
          </div>
        </div>

        <div id="admin-products-table" class="overflow-x-auto">
          <div class="py-8 text-center text-neutral-400 text-xs">Loading harvest listings...</div>
        </div>
      </div>

    </div>
  `;

  loadAdminDashboardData();
}

function loadAdminDashboardData() {
  // 1. Load Analytics
  window.MittiMartAPI.getAdminAnalytics().then(res => {
    if (res.success && res.analytics) {
      const finContainer = document.getElementById('admin-financial-container');
      if (finContainer) {
        finContainer.innerHTML = renderFinancialOverview(res.analytics);
      }
    }
  });

  // 2. Load Users Verification Queue
  window.MittiMartAPI.getAdminUsers().then(res => {
    const tableEl = document.getElementById('admin-users-table');
    if (!tableEl) return;

    if (res.success && res.users.length > 0) {
      tableEl.innerHTML = `
        <table class="w-full text-left text-xs">
          <thead class="bg-mitti-sand text-neutral-700 uppercase font-bold text-[11px] border-b border-mitti">
            <tr>
              <th class="py-3 px-4">User</th>
              <th class="py-3 px-4">Role</th>
              <th class="py-3 px-4">Location</th>
              <th class="py-3 px-4">Submitted Verification Doc</th>
              <th class="py-3 px-4">KYC Status</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-mitti text-neutral-800">
            ${res.users.map(u => `
              <tr class="hover:bg-neutral-50">
                <td class="py-3 px-4">
                  <div class="font-bold text-neutral-900">${u.name}</div>
                  <div class="text-[10px] text-neutral-400">${u.phone}</div>
                </td>
                <td class="py-3 px-4">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    u.role === 'farmer' ? 'bg-emerald-100 text-emerald-800' :
                    u.role === 'buyer' ? 'bg-blue-100 text-blue-800' :
                    u.role === 'saathi' ? 'bg-amber-100 text-amber-900' :
                    'bg-purple-100 text-purple-900'
                  }">
                    ${u.role}
                  </span>
                </td>
                <td class="py-3 px-4">${u.district || 'MP'}, ${u.state || 'India'}</td>
                <td class="py-3 px-4 text-neutral-600 font-medium">${u.verificationDoc || 'Aadhaar / Kisan Card'}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    u.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  }">
                    ${u.isVerified ? '✓ Verified' : 'Pending Review'}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <button onclick="handleToggleVerifyUser('${u.id}', ${!u.isVerified})" 
                    class="px-2.5 py-1 rounded text-xs font-bold transition ${
                      u.isVerified 
                        ? 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200' 
                        : 'bg-emerald-700 text-white hover:bg-emerald-800'
                    }">
                    ${u.isVerified ? 'Revoke KYC' : 'Approve KYC'}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  });

  // 3. Load Products Table for Moderation
  window.MittiMartAPI.getProducts().then(res => {
    const el = document.getElementById('admin-products-table');
    if (!el) return;

    if (res.success && res.products.length > 0) {
      el.innerHTML = `
        <table class="w-full text-left text-xs">
          <thead class="bg-mitti-sand text-neutral-700 uppercase font-bold text-[11px] border-b border-mitti">
            <tr>
              <th class="py-3 px-4">Harvest</th>
              <th class="py-3 px-4">Farmer</th>
              <th class="py-3 px-4">Available Stock</th>
              <th class="py-3 px-4">Asking Price</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-mitti text-neutral-800">
            ${res.products.map(p => `
              <tr class="hover:bg-neutral-50">
                <td class="py-3 px-4 font-bold text-neutral-900">${p.name}</td>
                <td class="py-3 px-4">${p.farmerName} (${p.farmerLocation.district})</td>
                <td class="py-3 px-4">${p.quantity} ${p.unit}</td>
                <td class="py-3 px-4 font-bold text-emerald-900">₹${p.askingPrice.toLocaleString('en-IN')} / ${p.unit}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    p.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }">
                    ${p.status}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <button onclick="handleDeleteProductAdmin('${p.id}')" class="text-xs text-red-600 hover:underline">
                    Remove Listing
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  });
}

function handleToggleVerifyUser(userId, makeVerified) {
  window.MittiMartAPI.verifyUser(userId, makeVerified ? 'verified' : 'pending').then(res => {
    if (res.success) {
      window.MittiMartState.notify(`User verification status updated!`, 'success');
      loadAdminDashboardData();
    }
  });
}

function handleDeleteProductAdmin(productId) {
  if (confirm('Moderate and delete this product listing from MittiMart?')) {
    window.MittiMartAPI.deleteProduct(productId).then(res => {
      if (res.success) {
        window.MittiMartState.notify('Product listing removed by admin.', 'info');
        loadAdminDashboardData();
      }
    });
  }
}
