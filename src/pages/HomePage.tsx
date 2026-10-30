import React, { useState } from 'react';
import { NavigationTab, Sermon, ChurchEvent } from '../types';
import { SERMONS_DATA, EVENTS_DATA, MINISTRIES_DATA, CHURCH_INFO, CHOIR_VIDEOS } from '../data/churchData';
import { useChurchData } from '../context/ChurchDataContext';

interface HomePageProps {
  onNavigate: (tab: NavigationTab) => void;
  onPlaySermonAudio: (sermon: Sermon) => void;
  onOpenSermonVideo: (sermon: Sermon) => void;
  onRegisterEvent: (event: ChurchEvent) => void;
  onOpenGiving: () => void;
  onCopyText: (text: string, label: string) => void;
}

const PRAYER_CATEGORIES = [
  { label: 'Financial Breakthrough', icon: 'payments' },
  { label: 'Health & Healing', icon: 'healing' },
  { label: 'Family & Relationships', icon: 'family_restroom' },
  { label: 'Spiritual Growth', icon: 'auto_stories' },
  { label: 'Youth & Education', icon: 'school' },
  { label: 'Thanksgiving & Praise', icon: 'celebration' },
  { label: 'Deliverance & Peace', icon: 'spa' },
  { label: 'Career & Business', icon: 'trending_up' },
  { label: 'Bereavement & Comfort', icon: 'sentiment_calm' },
  { label: 'Salvation / Dedication', icon: 'church' }
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onPlaySermonAudio,
  onOpenSermonVideo,
  onRegisterEvent,
  onOpenGiving,
  onCopyText
}) => {
  const { siteSettings, announcements, teamMembers } = useChurchData();
  const featuredSermon = SERMONS_DATA[0];
  const archiveSermons = SERMONS_DATA.slice(1, 4);
  const featuredChoir = CHOIR_VIDEOS[0];

  // Prayer form states
  const [selectedCategory, setSelectedCategory] = useState('Financial Breakthrough');
  const [prayerName, setPrayerName] = useState('');
  const [prayerPhone, setPrayerPhone] = useState('');
  const [prayerEmail, setPrayerEmail] = useState('');
  const [prayerNeed, setPrayerNeed] = useState('');
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');

  // Sermon filter state
  const [sermonFilter, setSermonFilter] = useState('all');

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerName.trim() || !prayerPhone.trim() || !prayerNeed.trim()) return;

    const emailValue = prayerEmail.trim() ? prayerEmail.trim() : 'Not provided';

    const formattedMessage = `Greetings Pastoral Care, AIC Nuru Kitale.

PRAYER REQUEST
Name: ${prayerName.trim()}
Phone Number: ${prayerPhone.trim()}
Email: ${emailValue}
Prayer and Ministry Need: ${selectedCategory}
Prayer Need / Message:
${prayerNeed.trim()}`;

    const whatsappUrl = `https://wa.me/254718016491?text=${encodeURIComponent(formattedMessage)}`;
    setSubmittedWhatsAppUrl(whatsappUrl);
    setPrayerSubmitted(true);

    // Open WhatsApp directly with the pre-filled prayer message
    const a = document.createElement('a');
    a.href = whatsappUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface antialiased">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative w-full overflow-hidden bg-[#061324] -mt-28 pt-28 lg:pt-36 min-h-[100vh] lg:min-h-[920px] flex flex-col justify-between">
        {/* Authentic AIC Nuru Kitale Church Sanctuary Photo Background - Fills the Frame */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-[center_35%] sm:bg-[center_40%] lg:bg-[center_45%] w-full h-full"
          style={{
            backgroundImage: `url('${
              siteSettings.bannerImageUrl &&
              !siteSettings.bannerImageUrl.includes('lh3.googleusercontent.com/aida-public/AB6AXuAXo') &&
              !siteSettings.bannerImageUrl.includes('WhatsApp_Image_2026-10-29_at_5.19.12')
                ? siteSettings.bannerImageUrl
                : '/assets/aistudio/WhatsApp_Image_2026-10-29_at_7.24.32_PM_6a635d91.jpeg'
            }')`
          }}
        >
          {/* Natural atmospheric scrim: preserves church building & bright sky while keeping white text crisp */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061324] via-[#061324]/45 to-[#061324]/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#061324]/90 via-[#061324]/60 sm:via-[#061324]/25 to-transparent"></div>
          {/* Subtle top scrim for navbar navigation */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#061324]/70 to-transparent"></div>
          {/* Subtle amber warmth glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-10 pb-28 flex flex-col items-start justify-center">
          {/* Pre-Title Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 shadow-lg mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e5c158] animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#e5c158] font-bold">
              AFRICA INLAND CHURCH • NURU KITALE, KENYA
            </span>
            <span className="text-amber-200/50 text-xs">•</span>
            <span className="text-xs text-amber-100/90 font-medium">“Let Your Light Shine”</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white max-w-4xl tracking-tight mb-6 leading-[1.08] drop-shadow-lg font-bold">
            Walk in the Light at <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#fcedaa] via-[#e5c158] to-[#d4af37] bg-clip-text text-transparent italic font-normal">
              AIC NURU KITALE
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mb-10 leading-relaxed font-light">
            {siteSettings.welcomeMessage ||
              'A premier Christ-centered sanctuary in Trans-Nzoia County illuminating hearts with biblical truth, anointed praise, and transformative community impact. Arise, shine, for your light has come!'}
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => onOpenSermonVideo(featuredSermon)}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] text-[#1c1400] font-bold text-sm shadow-[0_8px_24px_rgba(212,175,55,0.35)] hover:brightness-105 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_circle
              </span>
              <span>Watch Latest Sermon</span>
            </button>

            <button
              onClick={() => onNavigate('plan-visit')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all cursor-pointer"
            >
              <span>Plan Your Visit</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Live Service Notice Strip */}
          <div className="card-shadow-frame-dark inline-flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9cb4d2]">
            <span className="material-symbols-outlined text-[#e5c158] text-[20px]">notifications_active</span>
            <span className="text-xs text-slate-100">
              Next Service: <strong className="text-[#e5c158]">Sunday 8:00 AM</strong> (English Service) •{' '}
              <strong className="text-[#e5c158]">10:30 AM</strong> (Kiswahili Service)
            </span>
          </div>
        </div>

        {/* Downward Gradient Wave */}
        <div className="w-full h-12 bg-gradient-to-t from-surface to-transparent relative z-10"></div>
      </section>

      {/* ========================================================= */}
      {/* 2. FLOATING QUICK ACCESS CARDS                            */}
      {/* ========================================================= */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: New Guest */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mb-6 text-[#735c00]">
                <span className="material-symbols-outlined text-[28px]">waving_hand</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#735c00] font-bold">First Time With Us?</span>
              <h3 className="font-sans text-xl font-bold text-[#061324] mt-1 mb-3">New Here? Plan a Visit</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Experience our warm Karibu welcome, priority guest parking, secure children's check-in, and pastoral fellowship immediately after services.
              </p>
            </div>
            <button
              onClick={() => onNavigate('plan-visit')}
              className="inline-flex items-center gap-2 mt-6 text-xs font-bold text-[#735c00] hover:text-[#d4af37] transition-colors cursor-pointer text-left"
            >
              <span>What to Expect at Nuru</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_right_alt
              </span>
            </button>
          </div>

          {/* Card 2: Prayer Wall */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b1e36]/10 border border-[#0b1e36]/20 flex items-center justify-center mb-6 text-[#061324]">
                <span className="material-symbols-outlined text-[28px]">volunteer_activism</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#061324] font-bold">Pastoral Care &amp; Intercession</span>
              <h3 className="font-sans text-xl font-bold text-[#061324] mt-1 mb-3">Request Confidential Prayer</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Our pastoral council and intercessory prayer warriors stand ready to intercede for your healing, spiritual breakthroughs, and family needs.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('contact-prayer');
                el ? el.scrollIntoView({ behavior: 'smooth' }) : onNavigate('contact');
              }}
              className="inline-flex items-center gap-2 mt-6 text-xs font-bold text-[#061324] hover:text-[#735c00] transition-colors cursor-pointer text-left"
            >
              <span>Submit Prayer Request</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_right_alt
              </span>
            </button>
          </div>

          {/* Card 3: Service Times & Location */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-6 text-[#735c00]">
                <span className="material-symbols-outlined text-[28px]">church</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#735c00] font-bold">Worship Timetable</span>
              <h3 className="font-sans text-xl font-bold text-[#061324] mt-1 mb-3">Service Times &amp; Guides</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                English Service: 8:00 AM • Swahili Service: 10:30 AM. Vibrant Sunday School &amp; Youth Service happen concurrently at Nuru Cathedral.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 mt-6 text-xs font-bold text-[#735c00] hover:text-[#d4af37] transition-colors cursor-pointer text-left"
            >
              <span>Get Directions &amp; Times</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_right_alt
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PARISH ANNOUNCEMENTS (LIVE FIRESTORE CMS)             */}
      {/* ========================================================= */}
      {announcements && announcements.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 w-full">
          <div className="bg-gradient-to-br from-amber-50/50 via-white to-slate-50 border border-amber-400/30 rounded-3xl p-8 lg:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-amber-200/50">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-[#735c00] text-[11px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">campaign</span>
                  <span>Parish Notices</span>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#061324]">
                  Announcements &amp; Church News
                </h3>
              </div>
              <div className="text-xs text-[#735c00] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e5c158] animate-pulse"></span>
                <span>Live Bulletins from Church Office</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="card-shadow-frame rounded-2xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {ann.imageUrl && (
                      <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={ann.imageUrl}
                          alt={ann.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#735c00] text-[10px] font-bold uppercase tracking-wider">
                        {ann.category}
                      </span>
                      {ann.pinned && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-[#735c00] text-[10px] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">push_pin</span>
                          <span>Pinned</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#061324] leading-snug">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-[#735c00] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">event</span>
                      <span>{ann.date}</span>
                    </p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 4. ABOUT US & MISSION PILLARS                             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Left Column */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-400/30 text-[#735c00] w-fit mb-4">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Rooted in Scripture • Shining Since 1974
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#061324] font-bold tracking-tight mb-6">
              A Gospel Beacon in Kitale, Radiating Faith &amp; Overflowing in Grace
            </h2>
            <p className="text-base text-on-surface-variant mb-6 leading-relaxed">
              The Africa Inland Church (AIC) Nuru Kitale carries a sacred heritage of evangelistic zeal, prayerful endurance, and steadfast commitment to biblical truth. Named <strong className="text-[#061324]">“Nuru”</strong> — the Swahili word for Divine Light — our church family has grown into a radiant sanctuary of over 850 believers shining Christ's love across Trans-Nzoia County and Western Kenya.
            </p>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              We exist to magnify Jesus Christ through sound expository teaching, passionate worship, intentional family discipleship, and transformative community compassion across Kitale and beyond.
            </p>

            {/* Scripture Quote Callout Banner */}
            <div className="bg-gradient-to-br from-amber-50/70 to-slate-50 border border-amber-400/25 rounded-2xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute -right-4 -bottom-4 text-amber-200/40 select-none pointer-events-none">
                <span className="material-symbols-outlined text-[110px]">format_quote</span>
              </div>
              <p className="font-serif text-lg sm:text-xl italic text-[#061324] mb-2 relative z-10 leading-relaxed">
                “You are the light of the world. A city that is set on a hill cannot be hidden... Let your light so shine before men, that they may see your good works and glorify your Father in heaven.”
              </p>
              <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block relative z-10">
                — Matthew 5:14, 16 (NKJV)
              </span>
            </div>
          </div>

          {/* Visual Pillars Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-2xl card-shadow-frame">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#061324] text-[#e5c158] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">auto_stories</span>
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-[#061324] mb-1">Biblical Authority</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Uncompromising expository preaching grounded in sound reformed theology and applicable everyday discipleship.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl card-shadow-frame">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#735c00] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">music_note</span>
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-[#061324] mb-1">Passionate Worship</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Reverent hymnody harmonized with authentic contemporary African praise, creating space to glorify God in truth and spirit.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl card-shadow-frame">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#061324] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">diversity_1</span>
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-[#061324] mb-1">Community Action</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Active social outreach via free medical camps, widows' support networks, and secondary school student mentorship in Kitale.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl card-shadow-frame">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-[#735c00] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">family_restroom</span>
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-[#061324] mb-1">Generational Faith</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Nurturing young children, teenagers, and young adults into mature, responsible kingdom citizens and principled leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PASTORAL LEADERSHIP TEAM                               */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24 w-full border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-widest text-[#735c00] font-bold">
              Pastoral Care &amp; Shepherding
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#061324] font-bold tracking-tight mt-2 mb-4">
              Our Servant Leadership
            </h2>
            <p className="text-sm text-on-surface-variant">
              Meet the pastoral council called to shepherd, teach, and equip the saints at AIC Nuru Kitale with integrity and deep pastoral love.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((leader) => (
              <div
                key={leader.id}
                className="card-shadow-frame rounded-2xl overflow-hidden flex flex-col group"
              >
                <div className="relative w-full h-72 overflow-hidden bg-slate-100">
                  <img
                    src={leader.photoUrl}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/400x400/061324/ffffff?text=AIC+Pastor';
                    }}
                  />
                  <div className="absolute bottom-3 left-3 bg-[#061324]/90 backdrop-blur-md px-3 py-1 rounded-md text-white text-[11px] font-semibold border border-amber-400/30">
                    {leader.role}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-sans text-base font-bold text-[#061324] mb-0.5">{leader.name}</h3>
                    <p className="text-xs text-[#735c00] font-semibold mb-3">{leader.role}</p>
                    <p className="text-xs text-on-surface-variant italic mb-4 leading-relaxed">
                      “{leader.bio}”
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-[11px] text-on-surface-variant border-t border-slate-100">
                    <span>Trans-Nzoia Parish</span>
                    <button
                      onClick={() => onNavigate('contact')}
                      className="text-[#061324] font-bold hover:text-[#735c00] transition-colors cursor-pointer"
                    >
                      Connect →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WEEKLY MINISTRIES SHOWCASE                             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#735c00] font-bold">Growing in Fellowship</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#061324] font-bold tracking-tight mt-1">
              Ministries at AIC Nuru Kitale
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md mt-4 md:mt-0">
            There is a place for every family member to belong, flourish in spiritual discipleship, and serve the Body of Christ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ministry 1 */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-amber-500/15 text-[#735c00] border border-amber-400/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">child_care</span>
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-on-surface font-semibold">
                  Ages 2–13
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-[#061324] mb-3">
                Nuru Children &amp; Sunday School (KAYO)
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Age-graded, biblically rooted lessons in a safe, secure, and nurturing environment. Includes joyful action songs, Scripture memory challenges, and an annual December Vacation Bible School (VBS).
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-on-surface-variant text-xs border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#735c00]">schedule</span>
                <span>Sundays 8:00 AM &amp; 10:30 AM</span>
              </span>
              <button onClick={() => onNavigate('ministries')} className="font-bold text-[#061324] group-hover:translate-x-1 transition-transform cursor-pointer">
                →
              </button>
            </div>
          </div>

          {/* Ministry 2 */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-amber-100 text-[#735c00] border border-amber-200 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">female</span>
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-on-surface font-semibold">
                  Women of Faith
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-[#061324] mb-3">
                Women's Guild (Wamama wa AIC Nuru)
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Weekly Tuesday prayer fellowships, monthly prayer breakfasts, compassionate widow support, hospital visitations, and intergenerational marriage and motherhood mentorship.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-on-surface-variant text-xs border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#735c00]">schedule</span>
                <span>Tuesdays 4:30 PM</span>
              </span>
              <button onClick={() => onNavigate('ministries')} className="font-bold text-[#061324] group-hover:translate-x-1 transition-transform cursor-pointer">
                →
              </button>
            </div>
          </div>

          {/* Ministry 3 */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-[#061324] text-[#e5c158] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">electric_bolt</span>
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-on-surface font-semibold">
                  Ages 14–30
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-[#061324] mb-3">
                Nuru Youth &amp; Young Adults Fellowship
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Saturday evening praise rallies, career mentorship sessions, campus and high school evangelistic missions, sports outreach tournaments, and authentic young adult Bible studies.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-on-surface-variant text-xs border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#735c00]">schedule</span>
                <span>Saturdays 3:00 PM</span>
              </span>
              <button onClick={() => onNavigate('ministries')} className="font-bold text-[#061324] group-hover:translate-x-1 transition-transform cursor-pointer">
                →
              </button>
            </div>
          </div>

          {/* Ministry 4: Choir */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-amber-500/15 text-[#735c00] border border-amber-400/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">graphic_eq</span>
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-on-surface font-semibold">
                  Music &amp; Worship
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-[#061324] mb-3">
                Nuru Choir &amp; Praise Team
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Rich 4-part traditional hymnody alongside dynamic contemporary praise. Provides vocal training, keyboard and drum instruction, and represents AIC Nuru at regional music festivals.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-on-surface-variant text-xs border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#735c00]">schedule</span>
                <span>Practice: Sat 4:00 PM</span>
              </span>
              <button onClick={() => onNavigate('choir')} className="font-bold text-[#061324] group-hover:translate-x-1 transition-transform cursor-pointer">
                →
              </button>
            </div>
          </div>

          {/* Ministry 5 */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-slate-100 text-[#061324] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">groups</span>
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-on-surface font-semibold">
                  Men of Integrity
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-[#061324] mb-3">
                Men's Christian Fellowship
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Monthly Saturday dawn prayer breakfasts, biblical fatherhood workshops, facility maintenance work-days, and personal spiritual brotherhood accountability partnerships.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-on-surface-variant text-xs border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#735c00]">schedule</span>
                <span>1st Sat of Month 6:30 AM</span>
              </span>
              <button onClick={() => onNavigate('ministries')} className="font-bold text-[#061324] group-hover:translate-x-1 transition-transform cursor-pointer">
                →
              </button>
            </div>
          </div>

          {/* Ministry 6 */}
          <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-xl bg-amber-400/20 text-[#735c00] border border-amber-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">handshake</span>
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-on-surface font-semibold">
                  Compassion
                </span>
              </div>
              <h3 className="font-sans text-lg font-bold text-[#061324] mb-3">
                Nuru Outreach &amp; Community Care
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Taking the light of Christ beyond our church walls through prison visitations, food basket distribution to vulnerable families, and church-planting missions across rural Trans-Nzoia.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-on-surface-variant text-xs border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#735c00]">schedule</span>
                <span>Bi-weekly Saturdays</span>
              </span>
              <button onClick={() => onNavigate('ministries')} className="font-bold text-[#061324] group-hover:translate-x-1 transition-transform cursor-pointer">
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. CHOIR & MUSIC SPOTLIGHT (YOUTUBE INTEGRATION)          */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-[#061324] via-[#0b1e36] to-[#061324] text-white py-20 w-full relative overflow-hidden border-y border-amber-400/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-[#e5c158] text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-sm">music_note</span>
                <span>AIC Nuru Gospel Singers, Kitale</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Ministering Praise &amp; Sacred Music
              </h2>
            </div>
            <button
              onClick={() => onNavigate('choir')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-[#1c1400] text-xs font-bold shadow-md hover:brightness-105 transition cursor-pointer mt-4 md:mt-0"
            >
              <span>Explore All 15 Choir Videos</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#061324]/80 border border-amber-400/20 p-6 md:p-8 rounded-3xl backdrop-blur-md">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-video bg-black shadow-2xl border border-white/10">
              <iframe
                title="AIC Nuru Gospel Singers"
                src={`https://www.youtube.com/embed/${featuredChoir.youtubeId}`}
                width="100%"
                height="100%"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="px-2.5 py-1 rounded-full bg-amber-400/15 text-[#e5c158] text-[10px] font-bold uppercase tracking-wider">
                Flagship Title Track
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                {featuredChoir.title}
              </h3>
              <p className="text-xs text-[#e5c158] font-semibold">
                Album: {featuredChoir.album} • Duration: {featuredChoir.duration}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {featuredChoir.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('choir')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition cursor-pointer"
                >
                  Watch Full Album Playlist
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=uq-bPrSBWUQ`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition inline-flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  <span>Open on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SERMONS & MEDIA ARCHIVE                                */}
      {/* ========================================================= */}
      <section className="bg-[#061324] text-white py-24 w-full relative overflow-hidden" id="sermons">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/25 text-[#e5c158] text-[11px] font-bold uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[15px]">wb_sunny</span>
                <span>The Word Proclaimed</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight mt-1 font-bold">
                Sermons &amp; Media Archive
              </h2>
            </div>
            <p className="text-sm text-slate-300 max-w-md mt-4 md:mt-0 font-light">
              Listen to anointed exposition of Scripture. Stream live, download high-definition audio MP3s, or access weekly study guides.
            </p>
          </div>

          {/* Featured Sermon Master Card */}
          <div className="bg-[#0b1e36] border border-amber-400/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-16 grid grid-cols-1 lg:grid-cols-12">
            {/* Video Preview Side */}
            <div
              onClick={() => onOpenSermonVideo(featuredSermon)}
              className="lg:col-span-7 relative h-72 lg:h-auto min-h-[340px] overflow-hidden bg-slate-900 group cursor-pointer"
            >
              <img
                src={featuredSermon.thumbnail}
                alt={featuredSermon.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-[#061324]/40 group-hover:bg-[#061324]/20 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fce49e] text-[#1c1400] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-[#061324]/90 backdrop-blur-md px-3 py-1 rounded-md text-amber-200 font-mono text-xs border border-amber-400/20">
                {featuredSermon.duration || '52:14 HD'}
              </div>
              <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-amber-500 px-3.5 py-1 rounded-full text-white text-[11px] uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>Featured Sermon</span>
              </div>
            </div>

            {/* Sermon Details Side */}
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-amber-400/15 border border-amber-400/30 text-[#e5c158] text-[11px] font-bold uppercase">
                    {featuredSermon.series || 'Series: Unshakeable Kingdom • Part 4'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-bold mb-3 leading-snug">
                  {featuredSermon.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                  {featuredSermon.description}
                </p>

                <div className="space-y-2.5 mb-8 text-slate-300 text-xs font-light">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#e5c158] text-[18px]">person</span>
                    <span>
                      Preacher: <strong className="text-white">{featuredSermon.speaker}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#e5c158] text-[18px]">menu_book</span>
                    <span>
                      Passage: <strong className="text-[#e5c158] font-mono">{featuredSermon.scripture}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#e5c158] text-[18px]">calendar_today</span>
                    <span>
                      Preached: <strong className="text-white">{featuredSermon.date}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenSermonVideo(featuredSermon)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] text-[#1c1400] text-xs font-bold hover:brightness-105 transition-colors shadow-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">smart_display</span>
                  <span>Watch Video</span>
                </button>
                <button
                  onClick={() => onPlaySermonAudio(featuredSermon)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">headphones</span>
                  <span>Listen Audio (MP3)</span>
                </button>
                <button
                  onClick={() => onNavigate('sermons')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">description</span>
                  <span>Study Notes</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sermon Filter Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8 items-center">
            {['all', 'sunday', 'youth', 'midweek', 'kesha'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSermonFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer capitalize ${
                  sermonFilter === cat
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#e5c158] text-[#1c1400] shadow-sm'
                    : 'bg-[#0b1e36] border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat === 'all'
                  ? 'All Messages'
                  : cat === 'sunday'
                  ? 'Sunday Services'
                  : cat === 'youth'
                  ? 'Youth Rallies'
                  : cat === 'midweek'
                  ? 'Midweek Bible Studies'
                  : 'Nuru Kesha Nights'}
              </button>
            ))}
          </div>

          {/* Sermon Archive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {archiveSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-[#0b1e36] border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div
                  onClick={() => onOpenSermonVideo(sermon)}
                  className="relative h-48 overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#061324]/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-amber-200">
                    {sermon.duration}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] text-[#e5c158] uppercase font-semibold">{sermon.scripture}</span>
                    <h4 className="font-serif text-lg font-bold text-white mt-1 mb-2 leading-snug">
                      {sermon.title}
                    </h4>
                    <p className="text-xs text-slate-300 mb-4 line-clamp-2 font-light">{sermon.description}</p>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/60">
                    <span>{sermon.date}</span>
                    <button
                      onClick={() => onPlaySermonAudio(sermon)}
                      className="flex items-center gap-1.5 text-[#e5c158] font-bold hover:underline cursor-pointer"
                    >
                      <span>Listen</span>
                      <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. UPCOMING CHURCH EVENTS & CALENDAR                      */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#735c00] font-bold">Mark Your Calendar</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#061324] font-bold tracking-tight mt-1">
              Upcoming Gatherings at Nuru
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md mt-4 md:mt-0 font-light">
            Join in fellowship, outreach, worship nights, and kingdom community across our parish calendar in Kitale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EVENTS_DATA.slice(0, 4).map((evt) => (
            <div
              key={evt.id}
              className="card-shadow-frame rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Date Badge */}
              <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-amber-50 to-slate-50 border border-amber-300/40 flex flex-col items-center justify-center flex-shrink-0 text-center shadow-inner">
                <span className="text-[11px] font-bold text-[#735c00] uppercase tracking-wider">{evt.dateBadge.month}</span>
                <span className="font-serif text-3xl font-extrabold text-[#061324] leading-none mt-1">{evt.dateBadge.day}</span>
                <span className="text-[10px] text-slate-500 mt-1 font-semibold uppercase">{evt.dateBadge.dayOfWeek}</span>
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 text-[#735c00] text-xs font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>{evt.time} • {evt.venue}</span>
                </div>
                <h3 className="font-sans text-base font-bold text-[#061324] mb-2 leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onRegisterEvent(evt)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-[#061324] text-xs font-bold hover:bg-[#e5c158] hover:text-[#1c1400] transition-colors cursor-pointer"
                  >
                    Add to Calendar
                  </button>
                  <span className="text-on-surface-variant text-xs">
                    {evt.registrationFee || 'Free Admission'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. GIVING & TITHING (LIPA NA M-PESA & WIRE)              */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-b from-slate-50 via-[#f6f8fe] to-white py-24 w-full border-t border-slate-200/50" id="giving">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-[#735c00] text-[11px] font-bold uppercase mb-3">
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              <span>Biblical Stewardship &amp; Giving</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#061324] font-bold tracking-tight mb-4">
              Faithful Giving to God's Work
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed font-light">
              “Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.” — 2 Corinthians 9:7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Method 1: M-PESA Paybill */}
            <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase">
                    M-PESA Paybill
                  </span>
                  <span className="material-symbols-outlined text-emerald-600 text-[24px]">verified</span>
                </div>
                <h3 className="font-sans text-lg font-bold text-[#061324] mb-2">Tithe &amp; General Offering</h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  Direct mobile giving for Sunday tithes, benevolence fund, and pastoral upkeep at AIC Nuru Kitale.
                </p>

                <div className="space-y-4 bg-slate-50 border border-slate-200/70 p-4 rounded-xl mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Business Paybill No:</span>
                      <span className="text-xl font-mono font-bold text-[#061324] tracking-wider">247247</span>
                    </div>
                    <button
                      onClick={() => onCopyText('247247', 'Paybill Number 247247')}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-[#061324] hover:bg-[#e5c158] hover:text-[#1c1400] transition-colors shadow-sm cursor-pointer"
                      title="Copy Paybill"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Account Reference:</span>
                      <span className="text-sm font-mono font-bold text-[#735c00]">AIC NURU [TITHE]</span>
                    </div>
                    <button
                      onClick={() => onCopyText('AIC NURU TITHE', 'Account Reference AIC NURU TITHE')}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-[#061324] hover:bg-[#e5c158] hover:text-[#1c1400] transition-colors shadow-sm cursor-pointer"
                      title="Copy Account"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-on-surface-variant text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#061324]">1.</span>
                    <span>Go to M-PESA &gt; Lipa na M-PESA &gt; Paybill</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#061324]">2.</span>
                    <span>Enter Business No: <strong>247247</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#061324]">3.</span>
                    <span>Enter Account: <strong>AIC NURU [TITHE/OFFERING]</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 text-center border-t border-slate-100">
                <span className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> Instant M-PESA SMS Confirmation
                </span>
              </div>
            </div>

            {/* Method 2: Buy Goods Till */}
            <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase">
                    M-PESA Till No
                  </span>
                  <span className="material-symbols-outlined text-[#735c00] text-[24px]">store</span>
                </div>
                <h3 className="font-sans text-lg font-bold text-[#061324] mb-2">Building &amp; Project Fund</h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  Specifically designated for Nuru Cathedral expansion, sanctuary paving, and Sunday school classrooms.
                </p>

                <div className="space-y-4 bg-slate-50 border border-slate-200/70 p-4 rounded-xl mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Till Number:</span>
                      <span className="text-xl font-mono font-bold text-[#061324] tracking-wider">8901234</span>
                    </div>
                    <button
                      onClick={() => onCopyText('8901234', 'Till Number 8901234')}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-[#061324] hover:bg-[#e5c158] hover:text-[#1c1400] transition-colors shadow-sm cursor-pointer"
                      title="Copy Till"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase block font-semibold">Registered Till Name:</span>
                    <span className="text-xs font-semibold text-[#061324]">AIC Nuru Kitale Development</span>
                  </div>
                </div>

                <div className="space-y-2 text-on-surface-variant text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#061324]">1.</span>
                    <span>Select Lipa na M-PESA &gt; Buy Goods &amp; Services</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#061324]">2.</span>
                    <span>Enter Till Number: <strong>8901234</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#061324]">3.</span>
                    <span>Enter Amount &amp; PIN to complete contribution</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 text-center border-t border-slate-100">
                <span className="text-xs text-[#735c00] font-semibold flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">handyman</span> 100% Directed to Sanctuary Projects
                </span>
              </div>
            </div>

            {/* Method 3: Direct Bank Deposit & Diaspora */}
            <div className="card-shadow-frame rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-[#061324] border border-slate-200 text-xs font-bold uppercase">
                    Bank &amp; Diaspora
                  </span>
                  <span className="material-symbols-outlined text-[#061324] text-[24px]">account_balance</span>
                </div>
                <h3 className="font-sans text-lg font-bold text-[#061324] mb-2">Wire Transfer &amp; Diaspora</h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  For standing bank orders, corporate supporters, and diaspora partners worshiping with AIC Nuru from abroad.
                </p>

                <div className="space-y-3 bg-slate-50 border border-slate-200/70 p-4 rounded-xl mb-6 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase block font-semibold">Bank Name:</span>
                    <span className="font-bold text-[#061324]">Kenya Commercial Bank (KCB)</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase block font-semibold">Branch:</span>
                    <span className="text-[#061324] font-semibold">Kitale Main Branch</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase block font-semibold">Account Number:</span>
                      <span className="font-mono font-bold text-[#061324]">1122334455</span>
                    </div>
                    <button
                      onClick={() => onCopyText('1122334455', 'Bank Account 1122334455')}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-[#061324] hover:bg-[#e5c158] hover:text-[#1c1400] transition-colors shadow-sm cursor-pointer"
                      title="Copy Account"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase block font-semibold">SWIFT Code:</span>
                    <span className="font-mono font-bold text-[#735c00]">KCBLKENX</span>
                  </div>
                </div>

                <p className="text-[11px] text-on-surface-variant">
                  Please email receipt to <a href="mailto:jonahtarus20@gmail.com" className="text-[#061324] font-mono font-bold hover:underline">jonahtarus20@gmail.com</a> for official reconciliation.
                </p>
              </div>

              <div className="mt-6 pt-4 text-center border-t border-slate-100">
                <span className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span> Audited Annual Church Accounts
                </span>
              </div>
            </div>
          </div>

          {/* Financial Integrity Transparency Guarantee */}
          <div className="mt-12 card-shadow-frame rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-[#735c00] border border-amber-300 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">policy</span>
              </div>
              <div>
                <h4 className="font-sans text-base font-bold text-[#061324]">Committed to Financial Integrity &amp; Transparency</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Every shilling received at AIC Nuru Kitale is accounted for under the supervision of the local church council, with quarterly reports published to our members and an annual certified audit.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-[#061324] text-xs font-bold hover:bg-[#061324] hover:text-white transition-colors flex-shrink-0 cursor-pointer"
            >
              Request Finance Report
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. LOCATION, DIRECTIONS & PRAYER CONTACT                 */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full" id="visit">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Location & Arrival Guide */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#735c00] font-bold">Directions &amp; Campus</span>
              <h2 className="font-serif text-3xl font-bold text-[#061324] tracking-tight mt-1 mb-6">Visit AIC Nuru Kitale</h2>
              <p className="text-sm text-on-surface-variant mb-8 leading-relaxed font-light">
                We are situated along the scenic Kitale corridor, easily accessible from Kitale Town CBD. Ample secured parking, paved compounds, and dedicated church protocol attendants are on hand every Sunday.
              </p>

              {/* Interactive Map */}
              <div className="w-full h-64 rounded-2xl shadow-md mb-8 relative overflow-hidden group border border-slate-200">
                <iframe
                  title="AIC Nuru Kitale Map"
                  src="https://maps.google.com/maps?q=Kitale,Kenya&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-[#061324] text-[11px] font-semibold shadow-sm border border-slate-200">
                  • AIC Nuru Cathedral Grounds • 8 min from Kitale CBD
                </div>
              </div>

              {/* Transport Info */}
              <div className="space-y-4 mb-8 text-xs">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#735c00] text-[22px] mt-0.5">directions_car</span>
                  <div>
                    <h4 className="font-bold text-[#061324]">By Private Vehicle</h4>
                    <p className="text-on-surface-variant">Follow the highway from Kitale Town toward Nuru Cathedral signage. Secure inner church compound parking available.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#735c00] text-[22px] mt-0.5">directions_bus</span>
                  <div>
                    <h4 className="font-bold text-[#061324]">By Public Matatu / Boda Boda</h4>
                    <p className="text-on-surface-variant">Board Matatus or Boda Bodas from Kitale Main Stage. Alight directly at the AIC Nuru Kitale Church Gate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#735c00] text-[22px] mt-0.5">perm_phone_msg</span>
                  <div>
                    <h4 className="font-bold text-[#061324]">Sunday Welcome Helpline</h4>
                    <p className="text-on-surface-variant">
                      Need guidance? Call Protocol Desk:{' '}
                      <a className="text-[#061324] font-bold hover:underline" href="tel:+254718016491">
                        +254 718 016 491
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-bold text-[#061324]">WhatsApp Pastoral Line</h4>
                    <p className="text-on-surface-variant text-xs mb-1.5">
                      Confidential spiritual counsel, intercession &amp; prayer support:
                    </p>
                    <a
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:text-emerald-800 hover:underline"
                      href={`https://wa.me/254718016491?text=${encodeURIComponent(
                        'Greetings in the name of our Lord. I am contacting AIC Nuru Kitale to connect with the pastoral office.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Message Pastoral Care</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#735c00] text-[24px]">verified</span>
              <span className="text-xs text-[#061324]">
                <strong>Karibu Welcome Team:</strong> We invite first-time guests to the Nuru Karibu Lounge after each service for refreshments and pastoral introductions.
              </span>
            </div>
          </div>

          {/* Right Column: Direct Connect & Prayer Form */}
          <div className="lg:col-span-7 card-shadow-frame rounded-3xl p-8 sm:p-12 shadow-2xl" id="contact-prayer">
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-widest text-[#735c00] font-bold">Pastoral Care &amp; Contact</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#061324] mt-1 mb-2">Send a Prayer Request or Inquiry</h3>
              <p className="text-sm text-on-surface-variant font-light">
                Whether you need spiritual counsel, desire to join a home fellowship, or seek intercession, our pastoral team at AIC Nuru is here for you.
              </p>
            </div>

            {prayerSubmitted ? (
              <div className="p-8 text-center bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/50 rounded-2xl border border-emerald-300 shadow-md space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto shadow-lg">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#061324]">
                    Praise God, {prayerName || 'Beloved'}!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mt-1.5 leading-relaxed">
                    Your prayer request for <strong className="text-[#061324]">{selectedCategory}</strong> has been structured and directly sent to a pastor on WhatsApp (<strong className="text-emerald-700">+254 718 016 491</strong>).
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={submittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                    </svg>
                    <span>Send / Open in WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setPrayerSubmitted(false);
                      setPrayerNeed('');
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#061324] font-bold text-xs transition cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePrayerSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-[#061324] font-semibold mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={prayerName}
                      onChange={(e) => setPrayerName(e.target.value)}
                      placeholder="e.g. Samuel Kipkorir"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-[#e5c158] focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#061324] font-semibold mb-1.5">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={prayerPhone}
                      onChange={(e) => setPrayerPhone(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-[#e5c158] focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#061324] font-semibold mb-1.5">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={prayerEmail}
                    onChange={(e) => setPrayerEmail(e.target.value)}
                    placeholder="youremail@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-[#e5c158] focus:border-amber-400 outline-none"
                  />
                </div>

                {/* 10 Prayer Need Theme Pills */}
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-xs text-[#061324] font-semibold">Select Prayer &amp; Ministry Need *</label>
                    <span className="text-[11px] text-[#735c00] font-medium">Choose most relevant theme</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {PRAYER_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.label;
                      return (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => setSelectedCategory(cat.label)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 text-center cursor-pointer ${
                            isSelected
                              ? 'border-amber-400/80 bg-gradient-to-br from-amber-50 to-amber-100/60 text-[#735c00] shadow-sm ring-2 ring-[#e5c158]/50 font-bold'
                              : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/50 text-[#061324] font-medium'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px] mb-1 text-[#735c00]">
                            {cat.icon}
                          </span>
                          <span className="text-[11px] leading-tight">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#061324] font-semibold mb-1.5">Your Prayer Need or Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={prayerNeed}
                    onChange={(e) => setPrayerNeed(e.target.value)}
                    placeholder="Please share your prayer request or message. Mention if you would like a direct phone call from our pastoral team..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-on-surface text-sm focus:ring-2 focus:ring-[#e5c158] focus:border-amber-400 outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">lock</span>
                  <span>All prayer petitions are treated with strict pastoral confidentiality.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#061324] via-[#0b1e36] to-[#061324] text-white text-xs uppercase font-bold tracking-wider shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2.5 group border border-amber-400/30 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                    </svg>
                  </span>
                  <span>Submit Prayer Request</span>
                  <span className="material-symbols-outlined text-[18px] text-[#e5c158] group-hover:translate-x-1 transition-transform">
                    send
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
