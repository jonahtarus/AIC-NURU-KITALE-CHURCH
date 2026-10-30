import React, { useState } from 'react';
import { CHURCH_INFO } from '../data/churchData';

export const PlanVisitPage: React.FC = () => {
  const [visitorName, setVisitorName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [chosenService, setChosenService] = useState('2nd Service (10:30 AM - Family & Youth)');
  const [familyMembers, setFamilyMembers] = useState('2');
  const [hasKids, setHasKids] = useState('yes');
  const [specialNote, setSpecialNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative bg-[#122b44] text-[#ffffff] py-16 lg:py-24 overflow-hidden border-b border-[#c59331]/20">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff]/10 text-[#ffdea9] text-xs font-bold">
            <span className="material-symbols-outlined text-sm">front_hand</span>
            <span>You Are Our Honored Guest</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ffffff] font-bold tracking-tight">
            Plan Your Visit This Sunday
          </h1>
          <p className="text-base md:text-lg text-[#b1c8e8] max-w-2xl leading-relaxed">
            Walking through church doors for the first time can feel overwhelming. At AIC Nuru Kitale, we make sure you and your loved ones feel welcomed, safe, and truly at home from the moment you arrive.
          </p>
        </div>
      </section>

      {/* What to Expect 4-Pillars */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 py-20 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#7d5800] font-bold">
            First-Time Guest Experience
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#00162c] font-bold">
            What to Expect on Your First Sunday
          </h2>
          <p className="text-sm text-[#43474d]">
            Here is a quick walkthrough of your morning with us at AIC Nuru Kitale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#e4efff] text-[#7d5800] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">local_cafe</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#00162c]">Warm Kenyan Chai</h3>
            <p className="text-xs text-[#43474d] leading-relaxed">
              Before and after each service, visit our Hospitality Lounge for hot spiced Kenyan tea, fresh mandazi, and warm conversations with our welcome team.
            </p>
          </div>

          <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#e4efff] text-[#7d5800] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">child_friendly</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#00162c]">Safe Kids & Awana Wing</h3>
            <p className="text-xs text-[#43474d] leading-relaxed">
              Our trained Sunday school teachers check in your children into secure, age-appropriate classes with Bible stories, memory verses, and puppets.
            </p>
          </div>

          <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#e4efff] text-[#7d5800] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">checkroom</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#00162c]">Come As You Are</h3>
            <p className="text-xs text-[#43474d] leading-relaxed">
              Whether you prefer a traditional African kitenge dress, a smart suit, or casual jeans and a polo, you will fit right in. What matters is your heart.
            </p>
          </div>

          <div className="card-shadow-frame p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#e4efff] text-[#7d5800] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">local_parking</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#00162c]">Secure Parking & Usheting</h3>
            <p className="text-xs text-[#43474d] leading-relaxed">
              Our gated church compound has ample parking with attentive parking stewards and dedicated security personnel on duty throughout the service.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Form & Directions Grid */}
      <section className="w-full bg-[#eef4ff] py-20 border-y border-[#cadcf2]">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 card-shadow-frame p-8 rounded-3xl shadow-2xl space-y-6">
              <div>
                <span className="text-xs text-[#7d5800] uppercase font-bold tracking-wider">
                  Visitor Hospitality Concierge
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-[#00162c] font-bold mt-1">
                  Let Us Know You're Coming!
                </h3>
                <p className="text-xs md:text-sm text-[#43474d] mt-1">
                  When you let us know in advance, our welcome deaconate will reserve front-row seats for you and have a welcome gift package ready.
                </p>
              </div>

              {!confirmed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#00162c] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="e.g. Peter & Sarah Ndegwa"
                        className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#00162c] mb-1">Phone Number (SMS Directions) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="07XX XXX XXX"
                        className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#00162c] mb-1">Which Service Will You Attend?</label>
                      <select
                        value={chosenService}
                        onChange={(e) => setChosenService(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#cadcf2] bg-[#f7f9ff] text-xs font-semibold text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                      >
                        <option value="1st Service (8:00 AM - Early Dawn)">1st Service: 8:00 AM (Early Dawn)</option>
                        <option value="2nd Service (10:30 AM - Family & Youth)">2nd Service: 10:30 AM (Family & Youth)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#00162c] mb-1">Total Family / Party Size</label>
                      <select
                        value={familyMembers}
                        onChange={(e) => setFamilyMembers(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#cadcf2] bg-[#f7f9ff] text-xs font-semibold text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                      >
                        <option value="1">Just Me</option>
                        <option value="2">2 People (Couple / Pair)</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5+">5 or More People</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#00162c] mb-1">Bringing Children (Ages 2–12)?</label>
                      <select
                        value={hasKids}
                        onChange={(e) => setHasKids(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#cadcf2] bg-[#f7f9ff] text-xs font-semibold text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                      >
                        <option value="yes">Yes (We will prepare Sunday School badges)</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#00162c] mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@gmail.com"
                        className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">Any Questions or Special Assistance?</label>
                    <textarea
                      rows={2}
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      placeholder="e.g. Wheelchair access needed, moving to Kitale from Nairobi, prayer request..."
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#c59331] hover:bg-[#fec65f] text-[#00162c] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">celebration</span>
                    <span>Confirm My Sunday Visit</span>
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center bg-[#fdfbf7] rounded-2xl border border-[#c59331] space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#003120] text-[#98f5c9] flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined text-4xl">favorite</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#00162c]">
                      Karibu Sana, {visitorName}!
                    </h4>
                    <p className="text-sm text-[#43474d] mt-2">
                      We are thrilled to expect you for <strong>{chosenService}</strong>. Our welcome team will look out for you at the entrance with your visitor welcome packet.
                    </p>
                    <p className="text-xs text-[#7d5800] font-bold mt-2">
                      SMS directions sent to {phone}. God bless your journey!
                    </p>
                  </div>
                  <button
                    onClick={() => setConfirmed(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#00162c] text-[#ffffff] font-bold text-xs hover:bg-[#122b44] transition-colors cursor-pointer"
                  >
                    Register Another Guest
                  </button>
                </div>
              )}
            </div>

            {/* Directions & Location Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#ffffff] p-6 rounded-3xl shadow-md border border-[#cadcf2] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold text-[#00162c]">How to Find Us</h3>
                  <span className="material-symbols-outlined text-[#c59331] text-2xl">directions</span>
                </div>

                <div
                  className="w-full h-52 rounded-2xl bg-cover bg-[center_35%] overflow-hidden relative shadow-inner"
                  style={{
                    backgroundImage: `url('/assets/aistudio/WhatsApp_Image_2026-10-29_at_7.24.32_PM_6a635d91.jpeg')`
                  }}
                >
                  <div className="absolute inset-0 bg-[#00162c]/15"></div>
                  <div className="absolute bottom-3 left-3 bg-[#ffffff]/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[#00162c] text-xs font-bold flex items-center gap-1 shadow">
                    <span className="material-symbols-outlined text-[#c59331] text-xs">pin_drop</span>
                    <span>AIC Nuru Kitale Sanctuary</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[#43474d]">
                  <p className="font-bold text-[#00162c] text-sm">{CHURCH_INFO.location}</p>
                  <p>
                    <strong>Coming from Kitale Town:</strong> Take the Eldoret Highway past the Kitale Law Courts. Continue for approximately 2.5 km towards Airstrip Junction. The church entrance and tall blue-and-gold cross will be visible on your left.
                  </p>
                  <p>
                    <strong>Public Transport (Matatu / Boda Boda):</strong> Board any Eldoret-bound matatu or town stage boda boda. Ask to alight at "AIC Nuru Church" (Stage ya Nuru).
                  </p>
                </div>

                <a
                  href="https://maps.google.com/?q=Kitale,+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block py-3 rounded-xl bg-[#00162c] text-[#ffffff] font-bold text-xs hover:bg-[#122b44] transition-colors shadow"
                >
                  Open in Google Maps Navigation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
