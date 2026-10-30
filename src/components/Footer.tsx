import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { CHURCH_INFO } from '../data/churchData';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#061324] text-white pt-16 pb-8 border-t border-amber-400/20 shadow-[0_-4px_24px_rgba(0,20,40,0.12)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#061324] to-[#0b1e36] border border-amber-400/40 flex items-center justify-center shadow">
                <span
                  className="material-symbols-outlined text-[#e5c158] text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  light_mode
                </span>
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                AIC Nuru Kitale
              </span>
            </div>
            <p className="font-serif text-sm italic text-[#e5c158]">
              “Arise, Shine, for Your Light Has Come”
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Proclaiming the everlasting Gospel of Jesus Christ, radiating spiritual light across Kitale and beyond through steadfast worship, prayer, and discipleship.
            </p>
          </div>

          {/* Col 2: Ministries & Community */}
          <div>
            <h3 className="font-serif text-base font-bold text-white mb-4">
              Ministries &amp; Community
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('ministries')}
                  className="hover:text-[#e5c158] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#e5c158]">chevron_right</span>
                  <span>Children &amp; Sunday School (KAYO)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ministries')}
                  className="hover:text-[#e5c158] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#e5c158]">chevron_right</span>
                  <span>Women's Guild Fellowship</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ministries')}
                  className="hover:text-[#e5c158] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#e5c158]">chevron_right</span>
                  <span>Youth &amp; Young Adults Fellowship</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('choir')}
                  className="hover:text-[#e5c158] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#e5c158]">chevron_right</span>
                  <span>Nuru Choir &amp; Praise Team</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ministries')}
                  className="hover:text-[#e5c158] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#e5c158]">chevron_right</span>
                  <span>Men's Fellowship Brotherhood</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Worship & Gatherings */}
          <div>
            <h3 className="font-serif text-base font-bold text-white mb-4">
              Worship &amp; Gatherings
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#e5c158] text-[18px] mt-0.5">event_upcoming</span>
                <div>
                  <p className="font-semibold text-white">Sunday Worship</p>
                  <p className="text-slate-300">1st Service (English): 8:00 AM – 10:00 AM</p>
                  <p className="text-slate-300">2nd Service (Swahili): 10:30 AM – 1:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#e5c158] text-[18px] mt-0.5">schedule</span>
                <div>
                  <p className="font-semibold text-white">Midweek Prayer Meeting</p>
                  <p className="text-slate-300">Wednesday Services: 5:00 PM – 6:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#e5c158] text-[18px] mt-0.5">place</span>
                <div>
                  <p className="font-semibold text-white">Nuru Cathedral Location</p>
                  <p className="text-slate-300">AIC Nuru Center, Kitale, Trans-Nzoia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Give & Connect */}
          <div>
            <h3 className="font-serif text-base font-bold text-white mb-4">
              Give &amp; Connect
            </h3>
            <div className="bg-[#0b1e36] p-4 rounded-xl border border-amber-400/30 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#e5c158]">M-PESA GIVING</span>
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
              </div>
              <div className="text-xs">
                <p className="text-slate-300">
                  Paybill: <strong className="text-white font-mono">247247</strong>
                </p>
                <p className="text-slate-300">
                  Acc: <strong className="text-white font-mono">AIC NURU [TITHE]</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <a
                href={`https://wa.me/254718016491?text=${encodeURIComponent(
                  'Greetings in the name of our Lord. I am contacting AIC Nuru Kitale to connect with the pastoral office.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-white text-xs font-semibold transition"
              >
                <svg className="w-4 h-4 fill-current text-[#25D366] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                </svg>
                <span>Message Pastoral Care</span>
              </a>
              <button
                onClick={() => onNavigate('sermons')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-red-400">smart_display</span>
                <span>Live Media</span>
              </button>
            </div>

            <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jonahtarus20@gmail.com"
                required
                className="w-full bg-[#0b1e36] border border-slate-700 rounded-lg px-3 py-2 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-[#e5c158] text-[#1c1400] text-xs uppercase font-bold hover:brightness-105 transition cursor-pointer"
              >
                Join
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#e5c158] mt-1">Thank you for joining our email bulletin!</p>
            )}
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <p>© 2025 AIC Nuru Kitale Church. All Rights Reserved. Affiliated with Africa Inland Church Kenya.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('about-us')} className="hover:text-[#e5c158] transition">
              About Our Faith
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#e5c158] transition">
              Pastoral Help
            </button>
            <button onClick={() => onNavigate('give')} className="hover:text-[#e5c158] transition">
              Stewardship
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
