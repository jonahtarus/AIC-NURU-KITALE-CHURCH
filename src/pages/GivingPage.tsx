import React, { useState } from 'react';
import { GIVING_DESIGNATIONS, PRESET_AMOUNTS, CHURCH_INFO } from '../data/churchData';

interface GivingPageProps {
  onOpenMpesaModal: (designationCode: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const GivingPage: React.FC<GivingPageProps> = ({ onOpenMpesaModal, onCopyText }) => {
  const [selectedDesignation, setSelectedDesignation] = useState('TITHE');
  const [paybillChoice, setPaybillChoice] = useState<'247247' | 'TILL'>('247247');
  const [memberCustomName, setMemberCustomName] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('');

  const effectiveAmount = customAmount ? Number(customAmount) : selectedAmount;
  const currentAccountString = `NURU ${selectedDesignation} ${memberCustomName ? memberCustomName.toUpperCase().trim() : '[YOUR NAME]'}`;

  return (
    <div className="flex flex-col w-full">
      {/* ========================================== */}
      {/* HERO & SCRIPTURE SECTION                   */}
      {/* ========================================== */}
      <section className="relative w-full overflow-hidden bg-[#061324] text-[#ffffff] py-16 lg:py-24 border-b border-[#d4af37]/20">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#e5c158] via-[#0b1e36] to-[#061324]"></div>
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#d4af37]/15 blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff]/10 border border-[#e5c158]/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#e5c158] animate-pulse"></span>
                <span className="text-xs text-[#e5c158] uppercase tracking-wider font-bold">
                  Church Stewardship • Trans-Nzoia
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ffffff] leading-tight tracking-tight font-bold">
                Generosity & <br />
                <span className="italic text-[#e5c158] font-normal">Faithful Stewardship</span>
              </h1>

              <p className="text-base text-[#cadcf2] max-w-xl leading-relaxed">
                Every tithe, harvest offering, and building gift radiates Christ's tangible presence across Kitale—equipping disciples, sheltering vulnerable widows, uplifting bright orphans, and driving gospel outreach from the slopes of Mt. Elgon to our rural communities.
              </p>

              {/* Scripture Callout Block */}
              <div className="p-5 md:p-6 rounded-2xl bg-[#ffffff]/10 backdrop-blur-sm border-l-4 border-[#e5c158] space-y-2">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#e5c158] text-3xl shrink-0 opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>
                    format_quote
                  </span>
                  <div className="space-y-1">
                    <blockquote className="font-serif text-base md:text-lg italic text-[#ffffff] font-medium leading-snug">
                      “Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine.”
                    </blockquote>
                    <p className="text-xs uppercase tracking-widest text-[#e5c158] font-bold">
                      — Proverbs 3:9–10 (NIV)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stat Counters */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#00162c]/60 backdrop-blur-sm border border-[#ffffff]/10">
                  <div className="font-serif text-2xl md:text-3xl font-bold text-[#ffdea9]">840+</div>
                  <div className="text-xs text-[#b1c8e8]">Vulnerable Families Fed</div>
                </div>
                <div className="p-4 rounded-xl bg-[#00162c]/60 backdrop-blur-sm border border-[#ffffff]/10">
                  <div className="font-serif text-2xl md:text-3xl font-bold text-[#ffdea9]">14</div>
                  <div className="text-xs text-[#b1c8e8]">Rural Outreaches Planted</div>
                </div>
                <div className="p-4 rounded-xl bg-[#00162c]/60 backdrop-blur-sm border border-[#ffffff]/10">
                  <div className="font-serif text-2xl md:text-3xl font-bold text-[#ffdea9]">100%</div>
                  <div className="text-xs text-[#b1c8e8]">Audited Accountability</div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Anchor */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#ffffff]/5 p-2 border border-[#ffffff]/10">
                <img
                  className="w-full h-[420px] object-cover rounded-xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGw-X7i3lJNJJk2p6r7xV7hsoYR5h2dajksqiLs_fIbGLJV85XXRsqDSzEBbh8j6l8vr6JqsW5E9yXO2cwVcI3FH7-bwMuuD1acV_xJCcGDNvxr_D-rJOTJUk-2oQECO0lZw5SLAzFoffT25TrcocTILHRVmcu0uXz2M6GSDzAzfjqhnl59SH5EK9EOmpjolbjiMHsYc9cFQ4as7FYoSG6yy5AHvB7-H702wvzAcM"
                  alt="Joyful church congregation during Sunday harvest giving at AIC Nuru Kitale"
                />
                <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-[#00162c]/95 backdrop-blur-md text-[#ffffff] border border-[#ffdea9]/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#ffdea9] font-bold uppercase tracking-wider">
                        Sunday Offering • Sadaka ya Shukrani
                      </p>
                      <p className="text-xs text-[#cadcf2]">
                        Join over 1,200 congregants worshipping through giving
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#c59331] flex items-center justify-center text-[#00162c] shrink-0 font-bold">
                      <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* INTERACTIVE PURPOSE DESIGNATIONS           */}
      {/* ========================================== */}
      <section className="w-full py-16 bg-[#f7f9ff]">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#7d5800] font-bold">
                Custom Purpose Allocation
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#00162c] font-bold">
                Where Would You Like to Direct Your Giving?
              </h2>
              <p className="text-sm text-[#43474d] max-w-2xl">
                Select a designated treasury account. Your giving reference on M-Pesa or bank transfer ensures exact allocation by the treasury committee.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e4efff] text-[#00162c] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm text-[#7d5800]">info</span>
              <span>Click any card below to auto-set your M-Pesa reference</span>
            </div>
          </div>

          {/* Designations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {GIVING_DESIGNATIONS.map((des) => {
              const isSelected = selectedDesignation === des.code;
              return (
                <button
                  key={des.id}
                  type="button"
                  onClick={() => setSelectedDesignation(des.code)}
                  className={`text-left p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer border ${
                    isSelected
                      ? 'border-[#c59331] bg-[#ffffff] ring-2 ring-[#c59331]/30 shadow-md'
                      : 'border-[#cadcf2] bg-[#ffffff] hover:border-[#b1c8e8]'
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#c59331] text-[#00162c]'
                          : 'bg-[#e4efff] text-[#00162c] group-hover:bg-[#c59331] group-hover:text-[#00162c]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">{des.icon}</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#00162c]">{des.name}</h3>
                    <p className="text-xs text-[#43474d] leading-relaxed">{des.description}</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs font-bold border-t border-[#cadcf2]/40 mt-4">
                    <span className={isSelected ? 'text-[#7d5800]' : 'text-[#00162c]'}>
                      Ref: <strong>{des.code}</strong>
                    </span>
                    <span className="material-symbols-outlined text-sm">
                      {isSelected ? 'check_circle' : 'arrow_forward'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* M-PESA GIVING HIGHLIGHT SHOWCASE           */}
      {/* ========================================== */}
      <section className="w-full py-16 bg-[#eef4ff] border-y border-[#cadcf2]">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Interactive M-Pesa Portal Card */}
            <div className="lg:col-span-7 card-shadow-frame p-6 md:p-8 rounded-2xl shadow-2xl space-y-6 flex flex-col justify-between">
              <div>
                {/* Header Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003120] text-[#98f5c9] text-xs font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#98f5c9] animate-ping"></span>
                    <span>Direct M-Pesa Mobile Money Integration</span>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-[#ffdea9] text-[#5f4100] text-xs font-bold">
                    Zero Hidden Transaction Fees
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#00162c] font-bold">
                    Give via Lipa na M-Pesa
                  </h3>
                  <p className="text-xs md:text-sm text-[#43474d]">
                    Fast, secure giving directly through your phone via KCB or Equity Paybill numbers.
                  </p>
                </div>

                {/* Paybill Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Option A: Official Paybill */}
                  <div
                    onClick={() => setPaybillChoice('247247')}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      paybillChoice === '247247'
                        ? 'border-[#2e7d32] bg-[#eaf5f0] ring-2 ring-[#2e7d32]/20'
                        : 'border-[#cadcf2] bg-[#fbfcfe] hover:bg-[#ffffff]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#061324] uppercase font-bold tracking-wider">
                        Official Church Paybill
                      </span>
                      <span className="material-symbols-outlined text-[#2e7d32] text-sm">verified</span>
                    </div>
                    <div className="font-mono text-3xl font-bold text-[#061324] my-1">247247</div>
                    <div className="text-xs text-[#43474d]">Account: 0718016491 / NURU {selectedDesignation}</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyText('247247', 'Paybill 247247');
                      }}
                      className="w-full mt-3 py-2 px-3 rounded-lg bg-[#ffffff] text-[#061324] hover:bg-[#061324] hover:text-[#ffffff] text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-[#cadcf2] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                      <span>Copy Paybill 247247</span>
                    </button>
                  </div>

                  {/* Option B: Buy Goods Till Number */}
                  <div
                    onClick={() => setPaybillChoice('TILL')}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      paybillChoice === 'TILL'
                        ? 'border-[#2e7d32] bg-[#eaf5f0] ring-2 ring-[#2e7d32]/20'
                        : 'border-[#cadcf2] bg-[#fbfcfe] hover:bg-[#ffffff]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#061324] uppercase font-bold tracking-wider">
                        Buy Goods / Till Number
                      </span>
                      <span className="material-symbols-outlined text-[#d4af37] text-sm">storefront</span>
                    </div>
                    <div className="font-mono text-3xl font-bold text-[#061324] my-1">8901234</div>
                    <div className="text-xs text-[#43474d]">Lipa na M-Pesa Buy Goods • AIC Nuru</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyText('8901234', 'Till Number 8901234');
                      }}
                      className="w-full mt-3 py-2 px-3 rounded-lg bg-[#ffffff] text-[#061324] hover:bg-[#061324] hover:text-[#ffffff] text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-[#cadcf2] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                      <span>Copy Till 8901234</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Account Reference Generator */}
                <div className="p-5 rounded-xl bg-[#eef4ff] border border-[#cadcf2] space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase font-bold text-[#00162c]">Required Account Reference</span>
                      <p className="text-xs text-[#43474d]">Includes your currently chosen fund ({selectedDesignation})</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#c59331] text-[#00162c] text-xs font-bold">
                      Auto-Generated
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-full p-3.5 rounded-xl bg-[#ffffff] text-[#00162c] font-mono text-sm md:text-base font-bold tracking-wider border border-[#cadcf2] shadow-sm flex items-center justify-between">
                      <span>{currentAccountString}</span>
                      <span className="material-symbols-outlined text-[#7d5800] text-sm">key</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onCopyText(currentAccountString, 'Account Number Format')}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#c59331] text-[#00162c] hover:bg-[#fec65f] transition-colors text-xs font-bold flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                      <span>Copy Reference</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <input
                      type="text"
                      placeholder="Optional: Add your name to personalize reference (e.g. Samuel)..."
                      value={memberCustomName}
                      onChange={(e) => setMemberCustomName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#cadcf2] bg-[#ffffff] text-xs text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    />
                  </div>
                </div>

                {/* Preset Amount Selectors */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#00162c]">
                    Quick Amount Selector (KES)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {PRESET_AMOUNTS.map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedAmount === amt && !customAmount
                            ? 'bg-[#00162c] text-[#ffffff] shadow-md'
                            : 'bg-[#f7f9ff] text-[#00162c] hover:bg-[#e4efff] border border-[#cadcf2]'
                        }`}
                      >
                        {amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Modal Trigger Button */}
              <div className="pt-4 border-t border-[#cadcf2]">
                <button
                  type="button"
                  onClick={() => onOpenMpesaModal(selectedDesignation)}
                  className="w-full py-4 px-6 rounded-2xl bg-[#2b8c67] hover:bg-[#003120] text-[#ffffff] font-bold text-sm md:text-base shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">smartphone</span>
                  <span>
                    Initiate M-Pesa STK Push for KES {effectiveAmount.toLocaleString()} ({selectedDesignation})
                  </span>
                </button>
                <p className="text-[11px] text-[#43474d] text-center mt-2">
                  Instant prompt delivered to your Safaricom line. Official church SMS receipt is dispatched immediately.
                </p>
              </div>
            </div>

            {/* Right: Bank Transfer & International Diaspora Giving */}
            <div className="lg:col-span-5 space-y-6">
              {/* Bank Details Card */}
              <div className="card-shadow-frame p-6 rounded-2xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#cadcf2]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#e4efff] text-[#00162c] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-xl">account_balance</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#00162c]">Direct Bank Wire / EFT</h4>
                      <p className="text-xs text-[#43474d]">For Standing Orders & Building Fund Deposits</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#7d5800]">verified</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2] flex items-center justify-between">
                    <div>
                      <span className="text-[#43474d] block font-medium">Bank Name</span>
                      <span className="font-bold text-[#00162c]">{CHURCH_INFO.bankDetails.bankName}</span>
                    </div>
                    <span className="text-[#7d5800] font-semibold">{CHURCH_INFO.bankDetails.branch}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2] flex items-center justify-between">
                    <div>
                      <span className="text-[#43474d] block font-medium">Account Name</span>
                      <span className="font-bold text-[#00162c]">{CHURCH_INFO.bankDetails.accountName}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2] flex items-center justify-between">
                    <div>
                      <span className="text-[#43474d] block font-medium">Account Number</span>
                      <span className="font-mono font-bold text-[#00162c] text-sm">
                        {CHURCH_INFO.bankDetails.accountNumber}
                      </span>
                    </div>
                    <button
                      onClick={() => onCopyText(CHURCH_INFO.bankDetails.accountNumber, 'KCB Account Number')}
                      className="p-1.5 rounded-lg bg-[#ffffff] hover:bg-[#e4efff] text-[#00162c] border border-[#cadcf2] transition-colors cursor-pointer"
                      title="Copy Account"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f7f9ff] border border-[#cadcf2] flex items-center justify-between">
                    <div>
                      <span className="text-[#43474d] block font-medium">Swift Code (International)</span>
                      <span className="font-mono font-bold text-[#00162c]">{CHURCH_INFO.bankDetails.swiftCode}</span>
                    </div>
                    <button
                      onClick={() => onCopyText(CHURCH_INFO.bankDetails.swiftCode, 'SWIFT Code')}
                      className="p-1.5 rounded-lg bg-[#ffffff] hover:bg-[#e4efff] text-[#00162c] border border-[#cadcf2] transition-colors cursor-pointer"
                      title="Copy Swift"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Diaspora Giving Info */}
              <div className="bg-[#061324] text-[#ffffff] p-6 rounded-2xl shadow-xl space-y-4 border border-[#d4af37]/30">
                <div className="flex items-center gap-2 text-[#e5c158] text-xs uppercase font-bold tracking-wider">
                  <span className="material-symbols-outlined text-sm">public</span>
                  <span>Diaspora & International Partners</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#ffffff]">
                  Giving from Abroad (USA, UK, Europe, Australia)
                </h4>
                <p className="text-xs text-[#cadcf2] leading-relaxed">
                  Diaspora members in North America, the UK, and Europe can send gifts directly via <strong>WorldRemit</strong>, <strong>Sendwave</strong>, or <strong>Remitly</strong> directly to our Safaricom M-Pesa Paybill <strong>247247</strong> Account <strong>0718016491</strong>.
                </p>
                <div className="p-3 rounded-xl bg-[#ffffff]/10 text-xs text-[#a3f69c] flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Instant receipt issued by SMS to your designated contact number.</span>
                </div>
              </div>

              {/* Financial Integrity Statement */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#cadcf2] space-y-2">
                <div className="flex items-center gap-2 text-[#00162c] font-bold text-sm">
                  <span className="material-symbols-outlined text-[#7d5800]">gavel</span>
                  <span>Financial Accountability & Integrity</span>
                </div>
                <p className="text-xs text-[#43474d] leading-relaxed">
                  AIC Nuru Kitale is committed to the highest standards of financial transparency. Our books are audited annually by certified independent accountants, presented during the Annual General Meeting, and supervised by the parish deaconate and eldership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
