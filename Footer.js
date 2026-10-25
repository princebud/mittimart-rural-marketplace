/**
 * MittiMart Footer Component
 */

function renderFooter() {
  return `
    <footer class="bg-mitti-deep text-white border-t border-emerald-800/40 mt-16 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <!-- Brand & Presentation Info -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full seal-ring bg-emerald-800 flex items-center justify-center text-xl">
                🌾
              </div>
              <span class="text-2xl font-black tracking-tight font-serif-indian">MittiMart</span>
            </div>
            <p class="text-xs text-emerald-200/90 italic font-serif-indian">
              "${t('taglineHindi')}"
            </p>
            <p class="text-xs text-neutral-300 leading-relaxed max-w-sm">
              A rural marketplace connecting farmers and local producers directly with retail, wholesale, and institutional buyers — backed by local Mitti Saathis on the ground.
            </p>
            <div class="pt-2 text-[11px] text-amber-300 font-semibold space-y-0.5">
              <div>🏆 Startup Pitch Challenge 2026</div>
              <div>Course: BCA DS & AI</div>
              <div>Team: Vanshika & Zainab, Utkarsh, Prince, Sudhanshu</div>
            </div>
          </div>

          <!-- Quick Navigation -->
          <div class="space-y-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-amber-400">Platform</h4>
            <ul class="text-xs space-y-2 text-neutral-300">
              <li><button onclick="navigateTo('home')" class="hover:text-white transition">Home</button></li>
              <li><button onclick="navigateTo('marketplace')" class="hover:text-white transition">Agricultural Marketplace</button></li>
              <li><button onclick="navigateTo('farmer')" class="hover:text-white transition">Farmer Selling Portal</button></li>
              <li><button onclick="navigateTo('buyer')" class="hover:text-white transition">Buyer Procurement</button></li>
              <li><button onclick="navigateTo('saathi')" class="hover:text-white transition">Mitti Saathi Program</button></li>
            </ul>
          </div>

          <!-- Business Model & Trust -->
          <div class="space-y-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-amber-400">Pricing & Trust</h4>
            <ul class="text-xs space-y-2 text-neutral-300">
              <li><button onclick="navigateTo('pricing')" class="hover:text-white transition">Slide 11 Pricing Calculator</button></li>
              <li><button onclick="navigateTo('trust')" class="hover:text-white transition">Slide 10 Trust & Safety</button></li>
              <li><button onclick="navigateTo('admin')" class="hover:text-white transition">Slide 12 & 13 Financials</button></li>
              <li><button onclick="navigateTo('about')" class="hover:text-white transition">Slide 3 & 4 Problem / Team</button></li>
              <li><a href="#" onclick="alert('Privacy Policy: MittiMart strictly protects farmer and buyer phone numbers and land verification records.'); return false;" class="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Contact & WhatsApp Community (Slide 9) -->
          <div class="space-y-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-amber-400">Community & Support</h4>
            <p class="text-xs text-neutral-300">
              Join our WhatsApp farmer network or reach our rural helpline.
            </p>
            <div class="space-y-2 pt-1">
              <a href="https://wa.me/919826012345?text=Hello%20MittiMart%20Team" target="_blank" 
                class="btn-gold text-[11px] py-1.5 px-3 w-full flex items-center justify-center gap-1.5 shadow">
                <span>💬</span> <span>WhatsApp Community</span>
              </a>
              <div class="text-[11px] text-emerald-200">
                📞 Kisan Helpline: +91 98260 12345
              </div>
            </div>
          </div>

        </div>

        <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-4">
          <div>
            © 2026 MittiMart Technologies. Rooted People · Real Markets. All rights reserved.
          </div>
          <div class="text-emerald-300 font-semibold">
            0% Commission to Farmers · 100% Agreed Price Payout · 7% Transparent Buyer Fee
          </div>
        </div>

      </div>
    </footer>
  `;
}
