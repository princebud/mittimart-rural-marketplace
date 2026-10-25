/**
 * MittiMart About & Team Page View
 * Directly honors Slide 3, 4, 6, 14 of the Startup Pitch Challenge 2026 presentation
 */

function renderAboutPage() {
  const container = document.getElementById('view-container');
  if (!container) return;

  container.innerHTML = `
    <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Presentation Title Banner -->
      <div class="text-center max-w-3xl mx-auto space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
          Startup Pitch Challenge 2026 · College Presentation
        </div>
        <h1 class="text-4xl sm:text-5xl font-black text-mitti-deep font-serif-indian">
          About MittiMart
        </h1>
        <p class="text-amber-800 font-semibold italic text-lg sm:text-xl">
          "Aapki Mitti, Aapka Daam, MittiMart Aapke Sath."
        </p>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Rooted People · Real Markets. Empowering rural agricultural producers to achieve fair price discovery, direct buyer connections, and economic independence.
        </p>
      </div>

      <!-- Presentation Team Recognition Card (Slide 3 & 14) -->
      <div class="bg-gradient-to-br from-white via-mitti-sand to-amber-50/50 rounded-3xl p-8 border-2 border-emerald-900/10 shadow-xl max-w-4xl mx-auto">
        <div class="text-center border-b border-mitti pb-6 mb-6">
          <span class="text-xs font-black uppercase tracking-widest text-emerald-800">Presentation Team</span>
          <h2 class="text-2xl font-black text-mitti-deep font-serif-indian mt-1">Founding Student Strategists & Developers</h2>
          <p class="text-xs text-neutral-500 mt-0.5">Course: <strong>BCA DS & AI</strong> · Event: <strong>Startup Pitch Challenge 2026</strong></p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          
          <!-- Presenters -->
          <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm space-y-3 text-center sm:text-left">
            <span class="text-xs font-extrabold text-amber-800 uppercase tracking-wider block">Presented By</span>
            <div class="text-xl font-black text-mitti-deep">Vanshika & Zainab</div>
            <p class="text-xs text-neutral-600 leading-relaxed">
              Product vision, rural-commerce design strategy, bilingual usability, and business model pitch presentation.
            </p>
          </div>

          <!-- Team Members -->
          <div class="p-5 rounded-2xl bg-white border border-mitti shadow-sm space-y-3 text-center sm:text-left">
            <span class="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">Core Team Members</span>
            <div class="text-base font-extrabold text-mitti-deep space-y-1">
              <div>Utkarsh Kumar Dubey</div>
              <div>Prince Kumar</div>
              <div>Sudhanshu Yadav</div>
            </div>
            <p class="text-xs text-neutral-600 leading-relaxed">
              Data science & AI engineering, full-stack architecture, transparent fee calculations, and Mitti Saathi field framework.
            </p>
          </div>

        </div>
      </div>

      <!-- The Problem (Slide 4) -->
      <div class="bg-white rounded-3xl p-8 border border-mitti shadow-sm max-w-5xl mx-auto space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 px-3 py-1 rounded-full">
            Slide 4 · Problem Statement
          </span>
          <h2 class="text-2xl sm:text-3xl font-black text-mitti-deep font-serif-indian">
            The Problem Faced by the Farmer
          </h2>
          <p class="text-xs text-neutral-500">
            Rural producers often have limited access to buyers outside their immediate area. Dependence on multiple intermediaries reduces the producer's share while limited price visibility makes it difficult to compare offers.
          </p>
        </div>

        <!-- Problem vs MittiMart Solution Table (Slide 4) -->
        <div class="overflow-x-auto rounded-2xl border border-mitti">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-mitti-sand text-neutral-800 uppercase font-bold text-xs border-b border-mitti">
              <tr>
                <th class="py-3 px-4 w-1/3 text-red-900">Challenges</th>
                <th class="py-3 px-4 text-emerald-900">What MittiMart Addresses</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-mitti text-neutral-700">
              <tr class="hover:bg-neutral-50">
                <td class="py-3 px-4 font-bold text-neutral-900">Limited market access</td>
                <td class="py-3 px-4 text-neutral-800 font-medium">Connect producers with buyers beyond the local village or trader network.</td>
              </tr>
              <tr class="hover:bg-neutral-50">
                <td class="py-3 px-4 font-bold text-neutral-900">Low price transparency</td>
                <td class="py-3 px-4 text-neutral-800 font-medium">Show buyer offers and product information in one unified, clear place.</td>
              </tr>
              <tr class="hover:bg-neutral-50">
                <td class="py-3 px-4 font-bold text-neutral-900">Dependence on intermediaries</td>
                <td class="py-3 px-4 text-neutral-800 font-medium">Reduce unnecessary layers while recognizing that logistics and transport services may still be required.</td>
              </tr>
              <tr class="hover:bg-neutral-50">
                <td class="py-3 px-4 font-bold text-neutral-900">Difficulty using digital platforms</td>
                <td class="py-3 px-4 text-neutral-800 font-medium">Use <strong>Mitti Saathis</strong> to help producers who are uncomfortable or hesitant using smartphone apps.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- The Solution: Direct Connection (Slide 6) -->
      <div class="bg-gradient-to-r from-emerald-900 to-mitti-deep text-white rounded-3xl p-8 sm:p-12 shadow-xl max-w-5xl mx-auto space-y-6">
        <div class="max-w-2xl space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-300">Slide 6 · Direct Connection</span>
          <h2 class="text-3xl font-black font-serif-indian">The Old Way vs. The MittiMart Way</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          <div class="p-6 rounded-2xl bg-white/10 border border-white/10 space-y-3">
            <span class="text-xs font-bold text-red-300 uppercase tracking-wider">The Old Way (Exploitative)</span>
            <div class="text-sm font-semibold text-neutral-200">
              Farmer → Middleman → Wholesaler → Shop → Customer
            </div>
            <p class="text-xs text-neutral-300 leading-relaxed">
              Middlemen dictate rates, delay payments, and extract hefty commissions. Farmers receive only ₹8,000 to ₹8,500 for produce worth ₹10,000+.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white/20 border-2 border-amber-400 space-y-3">
            <span class="text-xs font-bold text-amber-300 uppercase tracking-wider">The MittiMart Way (Empowering)</span>
            <div class="text-sm font-semibold text-amber-200">
              Farmer → MittiMart connects directly with buyers (shops, restaurants, wholesalers, customers)
            </div>
            <p class="text-xs text-emerald-100 leading-relaxed">
              Farmers access more buyers and receive 100% of their agreed price (full ₹10,000). MittiMart earns a small 7% service fee from the buyer side on successful transactions.
            </p>
          </div>

        </div>
      </div>

    </div>
  `;
}
