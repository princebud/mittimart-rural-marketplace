/**
 * MittiMart Reusable Interactive Modals
 * Supports: Make Offer, Checkout, Product Detail, Add Crop, Assist Farmer, Cart
 */

// Global modal container helper
function showModal(contentHtml) {
  const container = document.getElementById('modal-container');
  if (!container) return;
  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in" onclick="handleBackdropClick(event)">
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-mitti" onclick="event.stopPropagation()">
        ${contentHtml}
      </div>
    </div>
  `;
}

function closeModal() {
  const container = document.getElementById('modal-container');
  if (container) container.innerHTML = '';
}

function handleBackdropClick(e) {
  if (e.target === e.currentTarget) closeModal();
}

// 1. MAKE AN OFFER MODAL
function openOfferModal(productId) {
  window.MittiMartAPI.getProduct(productId).then(res => {
    if (!res.success || !res.product) return;
    const p = res.product;
    const user = window.MittiMartState.currentUser;
    const defaultQty = Math.min(5, p.quantity);
    const defaultPrice = p.askingPrice;

    showModal(`
      <div class="p-6 sm:p-8 space-y-6">
        
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">Direct Negotiation</span>
            <h3 class="text-xl font-black text-mitti-deep">Make an Offer to Farmer</h3>
          </div>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold">
            ✕
          </button>
        </div>

        <!-- Product Summary -->
        <div class="flex items-center gap-4 p-4 rounded-2xl bg-mitti-sand border border-mitti">
          <img src="${(p.images && p.images[0]) || ''}" class="w-16 h-16 rounded-xl object-cover border border-white" alt="${p.name}"/>
          <div>
            <div class="font-bold text-base text-neutral-900">${p.name}</div>
            <div class="text-xs text-neutral-600">Farmer: ${p.farmerName} · ${p.farmerLocation.district}, ${p.farmerLocation.state}</div>
            <div class="text-xs font-bold text-emerald-800 mt-0.5">Asking Price: ₹${p.askingPrice.toLocaleString('en-IN')} / ${p.unit}</div>
          </div>
        </div>

        <!-- Negotiation Inputs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-neutral-700 mb-1">Your Offered Price (₹ / ${p.unit}):</label>
            <input type="number" id="offer-price" value="${defaultPrice}" min="1" max="1000000"
              oninput="updateOfferBreakdown('${p.unit}')"
              class="w-full px-3 py-2 rounded-xl border border-mitti font-bold text-lg text-emerald-900 focus:ring-2 focus:ring-emerald-600 outline-none bg-white"/>
            <span class="text-[10px] text-neutral-400">Asking was ₹${p.askingPrice}/${p.unit}</span>
          </div>

          <div>
            <label class="block text-xs font-bold text-neutral-700 mb-1">Quantity Requested (${p.unit}):</label>
            <input type="number" id="offer-qty" value="${defaultQty}" min="1" max="${p.quantity}"
              oninput="updateOfferBreakdown('${p.unit}')"
              class="w-full px-3 py-2 rounded-xl border border-mitti font-bold text-lg text-emerald-900 focus:ring-2 focus:ring-emerald-600 outline-none bg-white"/>
            <span class="text-[10px] text-neutral-400">Max available: ${p.quantity} ${p.unit}</span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Preferred Delivery Method:</label>
          <select id="offer-delivery" class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white font-medium">
            <option value="Local Transport Partner (Recommended)">🚚 Local Transport Partner Pickup (Recommended)</option>
            <option value="Mandi Depot Drop">🏢 Mandi Central Depot Drop</option>
            <option value="Buyer Arranged Pickup">🚜 Buyer Self-Arranged Transport</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Message or Special Requirements to Farmer:</label>
          <textarea id="offer-note" rows="2" placeholder="e.g. We require delivery by next Tuesday. Packaging in 50kg gunny bags preferred." 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm outline-none bg-white"></textarea>
        </div>

        <!-- Slide 11 Live Calculation Preview -->
        <div class="p-4 rounded-2xl bg-neutral-50 border border-mitti space-y-2 text-xs">
          <div class="font-bold text-neutral-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
            <span>Slide 11 Transparent Invoice Preview</span>
            <span class="text-emerald-700">0% Farmer Deduction</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>Farmer Payout (100% of agreed price):</span>
            <span class="font-bold text-neutral-900" id="preview-farmer-payout">₹${(defaultQty * defaultPrice).toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>MittiMart Service Fee (7%):</span>
            <span class="font-bold text-amber-700" id="preview-platform-fee">₹${Math.round(defaultQty * defaultPrice * 0.07).toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>Logistics & Transit:</span>
            <span class="font-bold text-neutral-700" id="preview-logistics-fee">₹300</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-mitti font-black text-sm text-mitti-deep">
            <span>Total Buyer Commitment:</span>
            <span class="text-emerald-800" id="preview-buyer-total">₹${(defaultQty * defaultPrice + Math.round(defaultQty * defaultPrice * 0.07) + 300).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button onclick="closeModal()" class="btn-secondary text-xs py-2 px-4">
            Cancel
          </button>
          <button onclick="submitNegotiationOffer('${p.id}')" class="btn-primary text-xs py-2.5 px-6">
            <span>💬</span> <span>Submit Offer to Farmer</span>
          </button>
        </div>

      </div>
    `);
  });
}

function updateOfferBreakdown(unit) {
  const price = Number(document.getElementById('offer-price')?.value) || 0;
  const qty = Number(document.getElementById('offer-qty')?.value) || 0;

  const farmerTotal = price * qty;
  const platformFee = Math.round(farmerTotal * 0.07);
  const logisticsFee = farmerTotal >= 20000 ? Math.round(farmerTotal * 0.02) + 300 : 300;
  const buyerTotal = farmerTotal + platformFee + logisticsFee;

  const elP = document.getElementById('preview-farmer-payout');
  const elF = document.getElementById('preview-platform-fee');
  const elL = document.getElementById('preview-logistics-fee');
  const elT = document.getElementById('preview-buyer-total');

  if (elP) elP.textContent = `₹${farmerTotal.toLocaleString('en-IN')}`;
  if (elF) elF.textContent = `₹${platformFee.toLocaleString('en-IN')}`;
  if (elL) elL.textContent = `₹${logisticsFee.toLocaleString('en-IN')}`;
  if (elT) elT.textContent = `₹${buyerTotal.toLocaleString('en-IN')}`;
}

function submitNegotiationOffer(productId) {
  const offeredPrice = document.getElementById('offer-price').value;
  const quantity = document.getElementById('offer-qty').value;
  const deliveryMethod = document.getElementById('offer-delivery').value;
  const buyerNote = document.getElementById('offer-note').value;

  const user = window.MittiMartState.currentUser;
  const buyerId = user.role === 'buyer' ? user.id : 'user-buyer-1';

  window.MittiMartAPI.submitOffer({
    productId,
    buyerId,
    offeredPrice,
    quantity,
    deliveryMethod,
    buyerNote
  }).then(res => {
    if (res.success) {
      closeModal();
      window.MittiMartState.notify('Offer submitted directly to the farmer! Notification dispatched.', 'success');
      // If currently on farmer dashboard or buyer dashboard, refresh
      if (window.renderCurrentPage) window.renderCurrentPage();
    } else {
      alert(res.message || 'Error submitting offer');
    }
  });
}

// 2. DEMO CHECKOUT MODAL
function openCheckoutModal(productId) {
  window.MittiMartAPI.getProduct(productId).then(res => {
    if (!res.success || !res.product) return;
    const p = res.product;
    const user = window.MittiMartState.currentUser;
    const qty = Math.min(2, p.quantity); // Demo default
    const farmerPayout = qty * p.askingPrice;
    const platformFee = Math.round(farmerPayout * 0.07);
    const logistics = 300;
    const total = farmerPayout + platformFee + logistics;

    showModal(`
      <div class="p-6 sm:p-8 space-y-6">
        
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">Demo Checkout</span>
            <h3 class="text-xl font-black text-mitti-deep">Direct Purchase Order</h3>
          </div>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold">
            ✕
          </button>
        </div>

        <!-- Demonstration Notice Banner -->
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
          <span>ℹ️</span>
          <span><strong>College / Pitch Demo Mode:</strong> No real payment gateway credentials are connected. All payment operations simulate digital escrow safely.</span>
        </div>

        <!-- Harvest Item -->
        <div class="p-4 rounded-2xl bg-mitti-sand border border-mitti flex items-center gap-4">
          <img src="${(p.images && p.images[0]) || ''}" class="w-16 h-16 rounded-xl object-cover border border-white" alt="${p.name}"/>
          <div class="flex-1">
            <div class="font-bold text-neutral-900">${p.name}</div>
            <div class="text-xs text-neutral-600">Farmer: ${p.farmerName} (${p.farmerLocation.district}, ${p.farmerLocation.state})</div>
            <div class="text-xs font-bold text-emerald-800 mt-1">₹${p.askingPrice.toLocaleString('en-IN')} / ${p.unit}</div>
          </div>
        </div>

        <!-- Quantity & Delivery Address -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-neutral-700 mb-1">Purchase Quantity (${p.unit}):</label>
            <input type="number" id="checkout-qty" value="${qty}" min="1" max="${p.quantity}"
              oninput="updateCheckoutBreakdown(${p.askingPrice}, '${p.unit}')"
              class="w-full px-3 py-2 rounded-xl border border-mitti font-bold text-lg text-emerald-900 bg-white"/>
          </div>

          <div>
            <label class="block text-xs font-bold text-neutral-700 mb-1">Destination Hub Address:</label>
            <input type="text" id="checkout-address" value="Arera Colony Market Hub, Bhopal, MP - 462016"
              class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white"/>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Payment Method (Simulation):</label>
          <select id="checkout-payment-method" class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white font-medium">
            <option value="MittiMart Safe Digital (Escrow)">🔒 MittiMart Safe Digital (Escrow - Released on Delivery)</option>
            <option value="Direct Mandi UPI Demo">📱 Direct UPI Mandi Demo</option>
            <option value="Cash upon Physical Inspection">🤝 Cash on Farmgate / Mandi Inspection</option>
          </select>
        </div>

        <!-- Transparent Pricing Invoice Box (Slide 11) -->
        <div class="p-5 rounded-2xl bg-neutral-50 border border-mitti space-y-2.5 text-xs">
          <div class="font-bold text-neutral-800 uppercase tracking-wider text-[11px] border-b border-mitti pb-2">
            Transparent Pricing Invoice (Slide 11)
          </div>
          <div class="flex justify-between text-neutral-700">
            <span>Farmer Payout (100% full agreed price):</span>
            <span class="font-black text-sm text-neutral-900" id="co-farmer-payout">₹${farmerPayout.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>MittiMart Service Platform Fee (7%):</span>
            <span class="font-bold text-amber-700" id="co-platform-fee">₹${platformFee.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between text-neutral-600">
            <span>Local Transport Partner Logistics:</span>
            <span class="font-bold text-neutral-700" id="co-logistics-fee">₹${logistics}</span>
          </div>
          <div class="flex justify-between pt-2.5 border-t border-mitti font-black text-base text-mitti-deep">
            <span>Total Buyer Payment:</span>
            <span class="text-emerald-800 text-lg" id="co-total">₹${total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button onclick="closeModal()" class="btn-secondary text-xs py-2 px-4">
            Cancel
          </button>
          <button onclick="submitDirectCheckout('${p.id}')" class="btn-primary text-xs py-2.5 px-6">
            <span>✓</span> <span>Confirm Order & Fund Escrow (Demo)</span>
          </button>
        </div>

      </div>
    `);
  });
}

function updateCheckoutBreakdown(unitPrice, unit) {
  const qty = Number(document.getElementById('checkout-qty')?.value) || 1;
  const farmerPayout = qty * unitPrice;
  const platformFee = Math.round(farmerPayout * 0.07);
  const logistics = farmerPayout >= 20000 ? Math.round(farmerPayout * 0.02) + 300 : 300;
  const total = farmerPayout + platformFee + logistics;

  const elP = document.getElementById('co-farmer-payout');
  const elF = document.getElementById('co-platform-fee');
  const elL = document.getElementById('co-logistics-fee');
  const elT = document.getElementById('co-total');

  if (elP) elP.textContent = `₹${farmerPayout.toLocaleString('en-IN')}`;
  if (elF) elF.textContent = `₹${platformFee.toLocaleString('en-IN')}`;
  if (elL) elL.textContent = `₹${logistics.toLocaleString('en-IN')}`;
  if (elT) elT.textContent = `₹${total.toLocaleString('en-IN')}`;
}

function submitDirectCheckout(productId) {
  const quantity = document.getElementById('checkout-qty').value;
  const deliveryAddress = document.getElementById('checkout-address').value;
  const paymentMethod = document.getElementById('checkout-payment-method').value;

  const user = window.MittiMartState.currentUser;
  const buyerId = user.role === 'buyer' ? user.id : 'user-buyer-1';

  window.MittiMartAPI.checkoutOrder({
    productId,
    buyerId,
    quantity,
    deliveryAddress,
    paymentMethod
  }).then(res => {
    if (res.success) {
      closeModal();
      window.MittiMartState.notify(`Order ${res.order.orderNumber} confirmed! Transport partner assigned.`, 'success');
      navigateTo('buyer');
    } else {
      alert(res.message || 'Error processing checkout');
    }
  });
}

// 3. PRODUCT DETAIL MODAL
function openProductDetailModal(productId) {
  window.MittiMartAPI.getProduct(productId).then(res => {
    if (!res.success || !res.product) return;
    const p = res.product;
    const pr = res.singleUnitPricing;

    showModal(`
      <div class="p-6 sm:p-8 space-y-6">
        
        <div class="flex items-center justify-between border-b border-mitti pb-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              ${p.category.toUpperCase()}
            </span>
            ${p.isOrganic ? `<span class="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white">100% Organic</span>` : ''}
          </div>
          <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold">
            ✕
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div class="space-y-3">
            <img src="${(p.images && p.images[0]) || ''}" class="w-full h-64 rounded-2xl object-cover border border-mitti shadow-md" alt="${p.name}"/>
            ${p.images && p.images.length > 1 ? `
              <div class="flex gap-2">
                ${p.images.map(img => `<img src="${img}" class="w-16 h-16 rounded-xl object-cover border border-mitti cursor-pointer"/>`).join('')}
              </div>
            ` : ''}
          </div>

          <div class="space-y-4">
            <div>
              <h2 class="text-2xl font-black text-mitti-deep leading-tight">${p.name}</h2>
              ${p.nameHindi ? `<div class="text-sm font-semibold text-amber-800">${p.nameHindi}</div>` : ''}
              <div class="text-xs text-neutral-500 mt-1">📍 ${p.farmerLocation.village}, ${p.farmerLocation.district}, ${p.farmerLocation.state}</div>
            </div>

            <div class="p-4 rounded-2xl bg-mitti-sand border border-mitti space-y-1">
              <span class="text-xs text-neutral-500 font-semibold">Farmer Asking Price:</span>
              <div class="text-3xl font-black text-emerald-900">
                ₹${p.askingPrice.toLocaleString('en-IN')} <span class="text-sm text-neutral-500 font-normal">/ ${p.unit}</span>
              </div>
              ${p.mandiBenchmarkPrice > 0 ? `
                <div class="text-xs text-neutral-500 pt-1">
                  Local APMC Mandi Rate: <span class="line-through">₹${p.mandiBenchmarkPrice.toLocaleString('en-IN')}</span> 
                  <strong class="text-emerald-700">(+${Math.round(((p.askingPrice - p.mandiBenchmarkPrice)/p.mandiBenchmarkPrice)*100)}% better price for farmer)</strong>
                </div>
              ` : ''}
            </div>

            <!-- Farmer & Saathi Badge -->
            <div class="p-3 rounded-xl bg-neutral-50 border border-mitti flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="text-2xl">👨‍🌾</span>
                <div>
                  <div class="font-bold text-neutral-800">${p.farmerName}</div>
                  <div class="text-[10px] text-neutral-500">Contact: ${p.farmerPhone}</div>
                </div>
              </div>
              ${p.assistedBySaathi ? `
                <span class="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-[10px]">
                  🤝 Saathi Verified
                </span>
              ` : `
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  ✓ Verified Kisan
                </span>
              `}
            </div>

            <!-- Harvest Specs -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2.5 rounded-xl bg-white border border-mitti">
                <div class="text-neutral-400">Available Stock:</div>
                <div class="font-bold text-neutral-800">${p.quantity} ${p.unit}</div>
              </div>
              <div class="p-2.5 rounded-xl bg-white border border-mitti">
                <div class="text-neutral-400">Grade & Quality:</div>
                <div class="font-bold text-neutral-800">${p.grade || 'Grade A'}</div>
              </div>
              <div class="p-2.5 rounded-xl bg-white border border-mitti">
                <div class="text-neutral-400">Harvest Date:</div>
                <div class="font-bold text-neutral-800">${p.harvestDate || 'Fresh lot'}</div>
              </div>
              <div class="p-2.5 rounded-xl bg-white border border-mitti">
                <div class="text-neutral-400">Shelf Life:</div>
                <div class="font-bold text-neutral-800">${p.shelfLifeDays || 30} Days</div>
              </div>
            </div>

          </div>
        </div>

        <div class="space-y-2 border-t border-mitti pt-4">
          <h4 class="font-bold text-sm text-neutral-900">Crop Details & Quality Notes:</h4>
          <p class="text-xs text-neutral-600 leading-relaxed">${p.description}</p>
        </div>

        <!-- Action CTAs -->
        <div class="flex items-center justify-end gap-3 pt-2 border-t border-mitti">
          <a href="https://wa.me/919826012345?text=Hello%20MittiMart,%20I%20am%20interested%20in%20${encodeURIComponent(p.name)}" 
            target="_blank" class="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 text-emerald-800">
            <span>💬</span> <span>WhatsApp Producer</span>
          </a>
          <button onclick="closeModal(); openOfferModal('${p.id}');" class="btn-secondary text-xs py-2 px-4 font-bold">
            <span>💬</span> <span>Make an Offer</span>
          </button>
          <button onclick="closeModal(); openCheckoutModal('${p.id}');" class="btn-primary text-xs py-2.5 px-6 font-bold">
            <span>⚡</span> <span>Direct Buy</span>
          </button>
        </div>

      </div>
    `);
  });
}

// 4. ADD PRODUCT MODAL (Farmer or Saathi)
function openAddProductModal() {
  const user = window.MittiMartState.currentUser;
  const isSaathi = user.role === 'saathi';

  showModal(`
    <div class="p-6 sm:p-8 space-y-5">
      
      <div class="flex items-center justify-between border-b border-mitti pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">${isSaathi ? 'Mitti Saathi Facilitator' : 'Farmer Selling Desk'}</span>
          <h3 class="text-xl font-black text-mitti-deep">List New Agricultural Harvest</h3>
        </div>
        <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold">
          ✕
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Crop / Produce Name (English):</label>
          <input type="text" id="add-prod-name" placeholder="e.g. Sharbati Wheat, Basmati 1121" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white font-medium"/>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">नाम (हिन्दी - Hindi):</label>
          <input type="text" id="add-prod-hindi" placeholder="उदा. शरबती गेहूं, बासमती धान" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white font-medium"/>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Category:</label>
          <select id="add-prod-cat" class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white font-medium">
            <option value="grains">🌾 Grains & Cereals</option>
            <option value="vegetables">🥬 Vegetables</option>
            <option value="fruits">🍎 Fruits</option>
            <option value="pulses">🥣 Pulses & Dal</option>
            <option value="spices">🌶️ Spices</option>
            <option value="seeds">🌻 Oil Seeds</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Quantity:</label>
          <input type="number" id="add-prod-qty" value="50" min="1" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm font-bold bg-white"/>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Unit:</label>
          <select id="add-prod-unit" class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white font-medium">
            <option value="Quintal">Quintal</option>
            <option value="Kg">Kg</option>
            <option value="Bag (50kg)">Bag (50kg)</option>
            <option value="Crate">Crate</option>
            <option value="Tonne">Tonne</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Your Asking Price (₹ per unit):</label>
          <input type="number" id="add-prod-price" value="2800" min="1" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm font-bold text-emerald-900 bg-white"/>
          <span class="text-[10px] text-neutral-400">Paid 100% to farmer (0% commission deducted)</span>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Local Mandi Benchmark (₹):</label>
          <input type="number" id="add-prod-mandi" value="2400" min="1" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm font-bold text-neutral-600 bg-white"/>
          <span class="text-[10px] text-neutral-400">Used to show fair value comparison to buyers</span>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-neutral-700 mb-1">Crop Description & Quality Details:</label>
        <textarea id="add-prod-desc" rows="2" placeholder="Describe soil, moisture level, grain color, drying method, etc."
          class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white"></textarea>
      </div>

      <div class="flex items-center gap-6">
        <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-800">
          <input type="checkbox" id="add-prod-organic" class="w-4 h-4 accent-emerald-700 rounded"/>
          <span>🌱 100% Organically Grown (रसायन मुक्त)</span>
        </label>
        ${isSaathi ? `
          <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-900">
            <input type="checkbox" id="add-prod-saathi-assist" checked class="w-4 h-4 accent-amber-600 rounded"/>
            <span>🤝 Attach Mitti Saathi Quality Badge</span>
          </label>
        ` : ''}
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3 pt-3 border-t border-mitti">
        <button onclick="closeModal()" class="btn-secondary text-xs py-2 px-4">
          Cancel
        </button>
        <button onclick="submitNewProductListing()" class="btn-primary text-xs py-2.5 px-6 font-bold">
          <span>🌾</span> <span>Publish Harvest to Marketplace</span>
        </button>
      </div>

    </div>
  `);
}

function submitNewProductListing() {
  const name = document.getElementById('add-prod-name')?.value;
  const nameHindi = document.getElementById('add-prod-hindi')?.value;
  const category = document.getElementById('add-prod-cat')?.value;
  const quantity = document.getElementById('add-prod-qty')?.value;
  const unit = document.getElementById('add-prod-unit')?.value;
  const askingPrice = document.getElementById('add-prod-price')?.value;
  const mandiBenchmarkPrice = document.getElementById('add-prod-mandi')?.value;
  const description = document.getElementById('add-prod-desc')?.value;
  const isOrganic = document.getElementById('add-prod-organic')?.checked;
  const saathiAssist = document.getElementById('add-prod-saathi-assist')?.checked;

  if (!name || !askingPrice || !quantity) {
    alert('Please fill crop name, quantity, and asking price.');
    return;
  }

  const user = window.MittiMartState.currentUser;

  window.MittiMartAPI.createProduct({
    farmerId: user.role === 'farmer' ? user.id : 'user-farmer-1',
    name,
    nameHindi,
    category,
    quantity,
    unit,
    askingPrice,
    mandiBenchmarkPrice,
    description,
    isOrganic,
    assistedBySaathi: Boolean(saathiAssist || user.role === 'saathi'),
    saathiId: user.role === 'saathi' ? user.id : null
  }).then(res => {
    if (res.success) {
      closeModal();
      window.MittiMartState.notify('Harvest listed successfully on MittiMart marketplace!', 'success');
      navigateTo('marketplace');
    } else {
      alert(res.message || 'Error creating listing');
    }
  });
}

// 5. ASSIST FARMER ONBOARDING MODAL (Mitti Saathi)
function openAssistFarmerModal() {
  showModal(`
    <div class="p-6 sm:p-8 space-y-5">
      
      <div class="flex items-center justify-between border-b border-mitti pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-800">Village Outreach</span>
          <h3 class="text-xl font-black text-mitti-deep">Onboard Unassisted Village Farmer</h3>
        </div>
        <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold">
          ✕
        </button>
      </div>

      <p class="text-xs text-neutral-600">
        As a certified Mitti Saathi, register a local producer who lacks smartphone fluency. All registration is 100% free with zero upfront fee.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Farmer Full Name:</label>
          <input type="text" id="asst-name" placeholder="e.g. Radheshyam Sharma" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white font-medium"/>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Mobile Number:</label>
          <input type="tel" id="asst-phone" placeholder="10-digit mobile" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white font-medium"/>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Gram / Village:</label>
          <input type="text" id="asst-village" placeholder="Village name" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white"/>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">District:</label>
          <input type="text" id="asst-district" value="Sehore" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white"/>
        </div>

        <div>
          <label class="block text-xs font-bold text-neutral-700 mb-1">Farm Land Size (Acres):</label>
          <input type="number" id="asst-acres" value="3.5" step="0.5" 
            class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white"/>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-neutral-700 mb-1">Primary Crops Grown (comma separated):</label>
        <input type="text" id="asst-crops" placeholder="e.g. Sharbati Wheat, Chana, Mustard" 
          class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white"/>
      </div>

      <div>
        <label class="block text-xs font-bold text-neutral-700 mb-1">Field Assistance Notes:</label>
        <textarea id="asst-notes" rows="2" placeholder="e.g. Verified Kisan Bhoomi passbook on-site, photographed wheat harvest sample." 
          class="w-full px-3 py-2 rounded-xl border border-mitti text-sm bg-white"></textarea>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3 pt-3 border-t border-mitti">
        <button onclick="closeModal()" class="btn-secondary text-xs py-2 px-4">
          Cancel
        </button>
        <button onclick="submitAssistedFarmer()" class="btn-primary text-xs py-2.5 px-6 font-bold">
          <span>🤝</span> <span>Register & Verify Farmer</span>
        </button>
      </div>

    </div>
  `);
}

function submitAssistedFarmer() {
  const farmerName = document.getElementById('asst-name')?.value;
  const phone = document.getElementById('asst-phone')?.value;
  const village = document.getElementById('asst-village')?.value;
  const district = document.getElementById('asst-district')?.value;
  const farmSizeAcres = document.getElementById('asst-acres')?.value;
  const primaryCrops = document.getElementById('asst-crops')?.value;
  const notes = document.getElementById('asst-notes')?.value;

  if (!farmerName || !phone || !village) {
    alert('Please enter farmer name, phone number, and village.');
    return;
  }

  const user = window.MittiMartState.currentUser;

  window.MittiMartAPI.assistFarmer({
    saathiId: user.id || 'user-saathi-1',
    farmerName,
    phone,
    village,
    district,
    farmSizeAcres,
    primaryCrops,
    notes
  }).then(res => {
    if (res.success) {
      closeModal();
      window.MittiMartState.notify(`Farmer ${farmerName} registered successfully!`, 'success');
      navigateTo('saathi');
    } else {
      alert(res.message || 'Error registering assisted farmer');
    }
  });
}

// 6. TRADE CART MODAL
function openCartModal() {
  const cart = window.MittiMartState.cart;

  if (cart.length === 0) {
    showModal(`
      <div class="p-8 text-center space-y-4">
        <div class="text-5xl">🛒</div>
        <h3 class="text-xl font-bold text-neutral-800">Your Trade Cart is Empty</h3>
        <p class="text-xs text-neutral-500 max-w-sm mx-auto">
          Explore authentic harvests listed directly by farmers and verified by Mitti Saathis.
        </p>
        <button onclick="closeModal(); navigateTo('marketplace');" class="btn-primary text-xs py-2.5 px-6 mx-auto">
          Explore Harvests →
        </button>
      </div>
    `);
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.product.askingPrice * item.quantity), 0);
  const platformFee = Math.round(subtotal * 0.07);
  const logistics = 300;
  const grandTotal = subtotal + platformFee + logistics;

  showModal(`
    <div class="p-6 sm:p-8 space-y-6">
      <div class="flex items-center justify-between border-b border-mitti pb-4">
        <h3 class="text-xl font-black text-mitti-deep">Trade Cart (${cart.length} harvest lots)</h3>
        <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold">
          ✕
        </button>
      </div>

      <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
        ${cart.map((item, idx) => `
          <div class="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-mitti text-xs">
            <div class="flex items-center gap-3">
              <img src="${(item.product.images && item.product.images[0]) || ''}" class="w-12 h-12 rounded-lg object-cover"/>
              <div>
                <div class="font-bold text-neutral-900">${item.product.name}</div>
                <div class="text-neutral-500">${item.product.farmerName} · ₹${item.product.askingPrice}/${item.product.unit}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold text-sm text-emerald-900">₹${(item.product.askingPrice * item.quantity).toLocaleString('en-IN')}</div>
              <div class="text-[11px] text-neutral-400">Qty: ${item.quantity} ${item.product.unit}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Slide 11 Breakdown -->
      <div class="p-4 rounded-xl bg-mitti-sand border border-mitti text-xs space-y-2">
        <div class="flex justify-between">
          <span>Farmer Payout (100% full value):</span>
          <span class="font-bold">₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div class="flex justify-between text-amber-800">
          <span>MittiMart 7% Platform Fee:</span>
          <span class="font-bold">₹${platformFee.toLocaleString('en-IN')}</span>
        </div>
        <div class="flex justify-between text-neutral-600">
          <span>Farmgate Logistics & Handling:</span>
          <span class="font-bold">₹${logistics}</span>
        </div>
        <div class="flex justify-between pt-2 border-t border-mitti font-black text-sm text-mitti-deep">
          <span>Total Buyer Invoice:</span>
          <span class="text-emerald-900 text-base">₹${grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2">
        <button onclick="window.MittiMartState.clearCart(); closeModal();" class="text-xs text-red-600 hover:underline">
          Clear Cart
        </button>
        <div class="flex gap-3">
          <button onclick="closeModal()" class="btn-secondary text-xs py-2 px-4">
            Continue Browsing
          </button>
          <button onclick="closeModal(); openCheckoutModal('${cart[0].product.id}');" class="btn-primary text-xs py-2 px-6">
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  `);
}
