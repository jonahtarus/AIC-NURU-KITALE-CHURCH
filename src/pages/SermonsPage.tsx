import React, { useState, useMemo } from 'react';
import { Sermon } from '../types';
import { SERMONS_DATA } from '../data/churchData';

interface SermonsPageProps {
  onPlayAudio: (sermon: Sermon) => void;
  onOpenVideo: (sermon: Sermon) => void;
}

export const SermonsPage: React.FC<SermonsPageProps> = ({ onPlayAudio, onOpenVideo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedExcerpts, setExpandedExcerpts] = useState<{ [id: string]: boolean }>({});

  const filterTabs = [
    { id: 'all', label: 'All Sermons' },
    { id: 'series', label: 'Current Series' },
    { id: 'sunday', label: 'Sunday Messages' },
    { id: 'midweek', label: 'Midweek Teachings' },
    { id: 'swahili', label: 'Swahili Service' }
  ];

  const filteredSermons = useMemo(() => {
    return SERMONS_DATA.filter((sermon) => {
      const matchesCategory =
        selectedCategory === 'all' || sermon.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        sermon.title.toLowerCase().includes(q) ||
        sermon.speaker.toLowerCase().includes(q) ||
        sermon.scripture.toLowerCase().includes(q) ||
        sermon.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExcerpt = (id: string) => {
    setExpandedExcerpts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero & Search Header */}
      <section className="relative bg-[#122b44] text-[#ffffff] overflow-hidden pb-16 pt-12 border-b border-[#c59331]/20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#fec65f] blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#7d5800] blur-3xl"></div>
        </div>

        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff]/10 w-fit">
              <span className="material-symbols-outlined text-[#f5bd58] text-sm">auto_stories</span>
              <span className="text-xs uppercase tracking-wider text-[#ffdea9] font-bold">
                Spiritual Nourishment • Kitale, Kenya
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffffff] tracking-tight">
              Sermons & Spiritual Resources
            </h1>
            <p className="text-base text-[#b1c8e8] leading-relaxed">
              Equipping your faith journey with weekly expository Bible teachings, message study guides, and video recordings from AIC Nuru Kitale. Rooted in God’s truth, shining Christ’s light across Trans-Nzoia.
            </p>
          </div>

          {/* Search & Topic Filter */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-2xl bg-[#ffffff] rounded-2xl shadow-xl p-2 flex items-center gap-2 border border-[#cadcf2]">
              <span className="material-symbols-outlined text-[#74777e] ml-2 text-2xl">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sermons by title, scripture, speaker (e.g. Prayer, Ephesians, Grace)..."
                className="w-full bg-transparent text-[#0b1d2d] text-sm md:text-base placeholder:text-[#74777e] focus:outline-none px-2"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-[#74777e] hover:text-[#0b1d2d] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-[#c59331] text-[#00162c] font-bold text-xs hover:bg-[#fec65f] transition-colors shrink-0 shadow cursor-pointer"
              >
                Search
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {filterTabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#c59331] text-[#00162c] shadow-md'
                        : 'bg-[#ffffff]/15 text-[#ffffff] hover:bg-[#ffffff]/25'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Current Sermon Series Banner */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 -mt-8 relative z-20 mb-16">
        <div className="bg-[#ffffff] rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#cadcf2]">
          {/* Media Aspect Left */}
          <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[460px] bg-[#00162c] flex flex-col justify-end p-6 md:p-10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdqJTQPIBVfRJUFtLry7vtHwrFsncPMVpOK2OVo-ayDDxQVVpLB4Fas8Fi0-Z9egmp3FAfEQht-fbBvTJXrORSLRS7QzZaixW0hRZhmVzOBaVrO3wTOkQZT1B3jMHpnvFYcReTK-KYHXeG-8x5YDMREx-xHf_CR9SSSNGTpc7eUa7uz0ihTOpgjblCNdU4oP_BidBoNcGBJX2UIvAWy78kyDZOYppAaB1BjTJ7mzI')`
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#00162c] via-[#00162c]/60 to-transparent"></div>
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c59331] text-[#00162c] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00162c] animate-ping"></span>
                  Current Teaching Series
                </span>
                <span className="px-3 py-1 rounded-full bg-[#ffffff]/20 backdrop-blur-md text-[#ffffff] text-xs font-semibold">
                  4-Part Exposition
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#ffffff] font-bold leading-tight">
                Living in the Light: Walk as Children of Light
              </h2>
              <p className="text-sm text-[#b1c8e8] line-clamp-2">
                A comprehensive study exploring Paul's exhortation in Ephesians to walk in moral clarity, spiritual readiness, and selfless love in a complex world.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenVideo(SERMONS_DATA[0])}
                  className="px-5 py-2.5 rounded-xl bg-[#c59331] text-[#00162c] text-xs font-bold flex items-center gap-2 hover:bg-[#fec65f] transition-all cursor-pointer shadow"
                >
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_circle
                  </span>
                  <span>Watch Latest Episode</span>
                </button>
                <button
                  onClick={() => alert('Downloading "Living in the Light" 4-Part Study Guide PDF (2.8 MB)...')}
                  className="px-4 py-2.5 rounded-xl bg-[#ffffff]/15 backdrop-blur-sm text-[#ffffff] text-xs font-bold hover:bg-[#ffffff]/25 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  <span>Download Series Guide</span>
                </button>
              </div>
            </div>
          </div>

          {/* Series Overview Right */}
          <div className="lg:col-span-5 bg-[#f7f9ff] p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#cadcf2]">
                <div>
                  <p className="text-xs text-[#7d5800] font-bold uppercase tracking-wider">Epistle Exegesis</p>
                  <h3 className="font-serif text-lg text-[#00162c] font-bold">Scripture Anchor</h3>
                </div>
                <span className="material-symbols-outlined text-[#c59331] text-2xl">menu_book</span>
              </div>

              {/* Scripture Callout */}
              <div className="bg-[#ffffff] p-4 rounded-xl border border-[#cadcf2] space-y-1.5 shadow-sm">
                <p className="font-serif text-sm italic text-[#00162c] leading-relaxed">
                  “For you were once darkness, but now you are light in the Lord. Live as children of light...”
                </p>
                <p className="text-xs text-[#7d5800] font-bold tracking-wide">EPHESIANS 5:8-14 (NIV)</p>
              </div>

              {/* 4-Part Roadmap */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs text-[#43474d] font-bold uppercase tracking-wider">Series Curriculum Schedule</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ffffff] border border-[#cadcf2] shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#fec65f] text-[#755100] flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-xs text-[#00162c] font-bold">Awake, O Sleeper (Eph 5:8-10)</span>
                    </div>
                    <span className="text-[10px] text-[#2b8c67] font-bold bg-[#eaf5f0] px-2 py-0.5 rounded">Archived</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ffffff] border border-[#cadcf2] shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#fec65f] text-[#755100] flex items-center justify-center text-xs font-bold">2</span>
                      <span className="text-xs text-[#00162c] font-bold">Exposing Unfruitful Works (v. 11-13)</span>
                    </div>
                    <span className="text-[10px] text-[#2b8c67] font-bold bg-[#eaf5f0] px-2 py-0.5 rounded">Archived</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#eef4ff] border border-[#c59331] shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#c59331] text-[#00162c] flex items-center justify-center text-xs font-bold">3</span>
                      <span className="text-xs text-[#00162c] font-bold">Walking Wisely & Redeeming the Time</span>
                    </div>
                    <span className="text-[10px] text-[#7d5800] font-bold bg-[#ffdea9] px-2 py-0.5 rounded">Current</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ffffff]/60 border border-[#cadcf2]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#cadcf2] text-[#43474d] flex items-center justify-center text-xs font-bold">4</span>
                      <span className="text-xs text-[#43474d]">Filled with the Holy Spirit (v. 15-20)</span>
                    </div>
                    <span className="text-[10px] text-[#74777e] font-semibold">This Sunday</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-[#43474d] border-t border-[#cadcf2]/60">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#7d5800]">schedule</span>
                <span>Sundays 8:00 AM & 10:30 AM</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#7d5800]">location_on</span>
                <span>Main Sanctuary</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Grid Section */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs text-[#7d5800] uppercase font-bold tracking-wider">The Pulpit Archive</p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#00162c] font-bold">
              Recent Sermons & Expositions
            </h2>
          </div>
          <span className="text-xs text-[#43474d]">
            Showing {filteredSermons.length} of {SERMONS_DATA.length} messages
          </span>
        </div>

        {filteredSermons.length === 0 ? (
          <div className="p-12 text-center bg-[#ffffff] rounded-2xl border border-[#cadcf2] space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#7d5800]">search_off</span>
            <p className="font-serif text-lg font-bold text-[#00162c]">No sermons found matching "{searchQuery}"</p>
            <p className="text-xs text-[#43474d]">Try clearing your search query or selecting "All Sermons".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#00162c] text-[#ffffff] text-xs font-bold hover:bg-[#122b44] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => {
              const isExcerptOpen = expandedExcerpts[sermon.id] || false;
              return (
                <article
                  key={sermon.id}
                  className="bg-[#ffffff] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-[#cadcf2]/60"
                >
                  {/* Thumbnail & Play Overlay */}
                  <div className="relative aspect-video w-full bg-[#00162c] overflow-hidden group">
                    <img
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-[#00162c]/20 group-hover:bg-[#00162c]/35 transition-colors"></div>

                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#00162c]/80 backdrop-blur-md text-[#ffffff] text-[11px] font-semibold">
                        {sermon.category === 'swahili' ? 'Ibada ya Kiswahili' : 'Sunday Service'}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#c59331] text-[#00162c] text-[11px] font-bold">
                        {sermon.duration}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenVideo(sermon)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      aria-label={`Play ${sermon.title}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#ffffff]/90 text-[#00162c] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#c59331] group-hover:text-[#00162c] transition-all">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          play_arrow
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#43474d]">
                        <span className="flex items-center gap-1 text-[#7d5800] font-bold">
                          <span className="material-symbols-outlined text-sm">bookmark</span>
                          <span>{sermon.scripture}</span>
                        </span>
                        <span>{sermon.date}</span>
                      </div>

                      <h3
                        onClick={() => onOpenVideo(sermon)}
                        className="font-serif text-lg font-bold text-[#00162c] hover:text-[#7d5800] transition-colors cursor-pointer line-clamp-2"
                      >
                        {sermon.title}
                      </h3>

                      <p className="text-xs text-[#43474d] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-[#7d5800]">person</span>
                        <span>{sermon.speaker} ({sermon.speakerRole})</span>
                      </p>

                      <p className="text-xs text-[#43474d] line-clamp-2 leading-relaxed">
                        {sermon.description}
                      </p>
                    </div>

                    {/* Transcript Accordion */}
                    <div className="pt-2 border-t border-[#cadcf2]/50">
                      <button
                        onClick={() => toggleExcerpt(sermon.id)}
                        className="text-xs text-[#7d5800] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">description</span>
                        <span>{isExcerptOpen ? 'Hide Key Excerpt' : 'Read Key Excerpt'}</span>
                        <span className="material-symbols-outlined text-xs">
                          {isExcerptOpen ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>

                      {isExcerptOpen && (
                        <div className="mt-2 p-3 rounded-xl bg-[#fdfbf7] border border-[#cadcf2] text-xs font-serif italic text-[#00162c] leading-relaxed animate-fadeIn">
                          {sermon.excerpt}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#cadcf2]/50">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onPlayAudio(sermon)}
                          className="px-3 py-1.5 rounded-lg bg-[#e4efff] text-[#00162c] text-xs font-bold hover:bg-[#c59331] hover:text-[#00162c] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">headphones</span>
                          <span>Listen</span>
                        </button>

                        <button
                          onClick={() => alert(`Downloading Study Guide for: ${sermon.title} (PDF 1.2 MB)`)}
                          className="p-1.5 rounded-lg text-[#43474d] hover:text-[#00162c] hover:bg-[#e4efff] transition-colors cursor-pointer"
                          title="Download Study Notes (PDF)"
                        >
                          <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                        </button>
                      </div>

                      <button
                        onClick={() => onOpenVideo(sermon)}
                        className="text-xs text-[#7d5800] hover:text-[#00162c] font-bold flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Watch HD</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
