import React, { useState } from 'react';
import { NavigationTab } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenLiveService: () => void;
  onOpenGiving: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenLiveService,
  onOpenGiving
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { tab: NavigationTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'about-us', label: 'About Us' },
    { tab: 'ministries', label: 'Ministries' },
    { tab: 'sermons', label: 'Sermons & Media' },
    { tab: 'choir', label: 'Choir & Music' },
    { tab: 'events', label: 'Events' },
    { tab: 'give', label: 'Giving & Tithing' },
    { tab: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 shadow-[0_8px_32px_-4px_rgba(6,19,36,0.12)]">
      {/* Top Banner Strip */}
      <div className="bg-[#061324] text-white border-b border-amber-400/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-[#9cb4d2]">
              <span className="material-symbols-outlined text-[15px] text-[#e5c158]">schedule</span>
              <span className="text-slate-200">Sunday Services: English 8:00 AM • Swahili 10:30 AM</span>
            </div>
            <div className="hidden xl:flex items-center gap-1.5 text-[#9cb4d2]">
              <span className="material-symbols-outlined text-[15px] text-[#e5c158]">location_on</span>
              <span className="text-slate-300">Nuru Cathedral, Kitale, Trans-Nzoia County</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenLiveService}
              className="flex items-center gap-1.5 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 hover:bg-amber-400/20 transition-all cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <span className="text-[#e5c158] font-semibold text-[11px] tracking-wide">Live Stream Every Sunday</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-white">
              <span className="material-symbols-outlined text-[15px] text-[#e5c158]">call</span>
              <a className="hover:text-[#e5c158] transition-colors" href="tel:+254718016491">
                +254 718 016 491
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-amber-900/10 shadow-sm">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 flex-shrink-0 text-left cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#061324] via-[#0b1e36] to-[#061324] border border-amber-400/40 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-[#e5c158] text-[26px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                light_mode
              </span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#e5c158] ring-2 ring-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-lg tracking-tight text-[#061324] leading-tight font-extrabold">
                AIC NURU KITALE
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#735c00] font-bold">
                Africa Inland Church
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`px-3.5 py-2 transition-all rounded-xl text-xs cursor-pointer ${
                    isActive
                      ? 'bg-[#061324] text-white font-bold shadow-sm'
                      : 'text-[#43474d] hover:text-[#061324] hover:bg-slate-100 font-medium'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Guest Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('plan-visit')}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] text-[#1c1400] text-xs font-bold shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:brightness-105 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">wb_sunny</span>
              <span>Visit Us This Sunday</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-9 h-9 rounded-full bg-[#061324] border border-amber-400/30 flex items-center justify-center text-amber-200 hover:bg-[#0b1e36] transition cursor-pointer"
              title="Connect / Prayer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#061324] hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 py-4 space-y-2 animate-fadeIn shadow-xl">
            {navLinks.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  currentTab === item.tab
                    ? 'bg-[#061324] text-white font-bold'
                    : 'text-[#43474d] hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('plan-visit')}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-[#1c1400] font-bold text-xs uppercase tracking-wider shadow"
              >
                Visit Us This Sunday
              </button>
              <button
                onClick={onOpenGiving}
                className="w-full text-center py-2.5 rounded-xl bg-[#061324] text-white font-bold text-xs"
              >
                Lipa Na M-Pesa (Give)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
