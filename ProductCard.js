/**
 * MittiMart Product Card Component
 * Displays agricultural harvests with Mandi comparison benchmarks and Saathi badges
 */

function renderProductCard(product) {
  const isSaved = window.MittiMartState.savedProductIds.has(product.id);
  const lang = getLanguage();
  const displayName = lang === 'hi' && product.nameHindi ? product.nameHindi : product.name;
  const image = (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80';

  const categoryLabels = {
    grains: '🌾 Grains',
    vegetables: '🥬 Vegetable',
    fruits: '🍎 Fruit',
    pulses: '🥣 Pulses',
    spices: '🌶️ Spice',
    seeds: '🌻 Seeds',
    organic: '🌱 Organic'
  };

  return `
    <div class="product-card bg-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm relative group">
      
      <!-- Top Image Area -->
      <div class="relative h-48 w-full overflow-hidden bg-neutral-100 cursor-pointer" onclick="openProductDetailModal('${product.id}')">
        <img src="${image}" alt="${displayName}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
        
        <!-- Category & Organic Badges -->
        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-sm text-neutral-800 shadow-sm">
            ${categoryLabels[product.category] || product.category}
          </span>
          ${product.isOrganic ? `
            <span class="px-2 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-sm">
              100% Organic
            </span>
          ` : ''}
        </div>

        <!-- Wishlist Save Button -->
        <button onclick="event.stopPropagation(); window.MittiMartState.toggleSaveProduct('${product.id}'); renderMarketplace();" 
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-sm shadow-md transition ${isSaved ? 'text-red-500' : 'text-neutral-400 hover:text-red-500'}">
          ${isSaved ? '❤️' : '🤍'}
        </button>

        <!-- Grade Tag -->
        <div class="absolute bottom-2 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold">
          ${product.grade || 'Grade A Quality'}
        </div>
      </div>

      <!-- Card Body Content -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <!-- Title & Location -->
        <div>
          <div class="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span class="flex items-center gap-1">
              <span>📍</span> <span>${product.farmerLocation.district}, ${product.farmerLocation.state}</span>
            </span>
            <span class="text-[11px] font-semibold text-emerald-800">
              Stock: ${product.quantity} ${product.unit}
            </span>
          </div>

          <h3 onclick="openProductDetailModal('${product.id}')" 
            class="font-bold text-base text-mitti-deep hover:text-emerald-700 cursor-pointer line-clamp-1">
            ${displayName}
          </h3>
        </div>

        <!-- Farmer Information Snippet -->
        <div class="p-2.5 rounded-xl bg-mitti-sand/70 border border-mitti/60 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="text-base">👨‍🌾</span>
            <div>
              <div class="font-bold text-neutral-800 flex items-center gap-1">
                <span>${product.farmerName.split(' ')[0]}</span>
                ${product.isFarmerVerified ? `<span class="text-emerald-700 font-bold" title="Verified KYC">✓</span>` : ''}
              </div>
              <div class="text-[10px] text-neutral-500">${product.farmerLocation.village || 'Village Hub'}</div>
            </div>
          </div>
          ${product.assistedBySaathi ? `
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300" title="Assisted by local Mitti Saathi">
              🤝 Saathi Verified
            </span>
          ` : `
            <span class="text-[10px] font-medium text-neutral-500">
              ⭐ 4.9 Rating
            </span>
          `}
        </div>

        <!-- Pricing & Mandi Comparison (Slide 11 principle) -->
        <div class="border-t border-mitti/80 pt-3">
          <div class="flex items-baseline justify-between">
            <div>
              <span class="text-xs text-neutral-500 font-medium">Asking Price:</span>
              <div class="text-xl font-extrabold text-mitti-deep">
                ₹${product.askingPrice.toLocaleString('en-IN')} <span class="text-xs text-neutral-500 font-normal">/ ${product.unit}</span>
              </div>
            </div>
            
            <!-- Mandi Comparison Badge -->
            ${product.mandiBenchmarkPrice > 0 ? `
              <div class="text-right">
                <span class="text-[10px] text-neutral-400 block">APMC Mandi Rate:</span>
                <span class="text-xs font-bold text-neutral-500 line-through">
                  ₹${product.mandiBenchmarkPrice.toLocaleString('en-IN')}
                </span>
                <span class="text-[10px] font-bold text-emerald-700 block">
                  +${Math.round(((product.askingPrice - product.mandiBenchmarkPrice) / product.mandiBenchmarkPrice) * 100)}% to Farmer
                </span>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="grid grid-cols-2 gap-2 pt-2">
          <button onclick="openOfferModal('${product.id}')" 
            class="btn-secondary text-xs py-2 px-2.5 font-bold border-emerald-700/30 text-emerald-900 hover:bg-emerald-50">
            <span>💬</span> <span>${t('btnMakeOffer')}</span>
          </button>

          <button onclick="openCheckoutModal('${product.id}')" 
            class="btn-primary text-xs py-2 px-2.5 font-bold">
            <span>⚡</span> <span>${t('btnBuyDirect')}</span>
          </button>
        </div>

      </div>

    </div>
  `;
}
