import React, { useState, useMemo } from 'react';
import { CHOIR_VIDEOS, CHURCH_INFO } from '../data/churchData';
import { ChoirVideo } from '../types';

export const ChoirPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<ChoirVideo>(CHOIR_VIDEOS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'album' | 'praise' | 'hymn'>('all');
  const [auditionModalOpen, setAuditionModalOpen] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [voicePart, setVoicePart] = useState('Soprano');
  const [playsInstrument, setPlaysInstrument] = useState('None (Vocalist)');
  const [candidateMessage, setCandidateMessage] = useState(
    'Greetings Choir Director & Pastoral Office, AIC Nuru Kitale. I would love to audition and join the choir and worship ministry.'
  );
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAuditionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = [
      'CHOIR AUDITION REQUEST',
      `Name: ${candidateName.trim()}`,
      `Phone Number: ${candidatePhone.trim()}`,
      `Voice Part: ${voicePart}`,
      `Instrumental Skill: ${playsInstrument}`,
      'Message:',
      candidateMessage.trim() || 'Greetings Choir Director & Pastoral Office, AIC Nuru Kitale. I would love to audition and join the choir and worship ministry.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/254718016491?text=${encodeURIComponent(formattedMessage)}`;
    setSubmittedWhatsAppUrl(whatsappUrl);
    setSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  const filteredVideos = useMemo(() => {
    return CHOIR_VIDEOS.filter((vid) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        vid.title.toLowerCase().includes(q) ||
        vid.description.toLowerCase().includes(q) ||
        vid.album.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (activeFilter === 'album') return vid.album.includes('Mashujaa');
      if (activeFilter === 'hymn') return vid.title.includes('Msalaba') || vid.title.includes('Amani') || vid.title.includes('Maombi');
      if (activeFilter === 'praise') return vid.title.includes('Mashujaa') || vid.title.includes('Tutashinda') || vid.title.includes('Tunaye');

      return true;
    });
  }, [searchQuery, activeFilter]);

  const handleSelectVideo = (video: ChoirVideo) => {
    setSelectedVideo(video);
    const element = document.getElementById('featured-video');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-[#122b44] text-[#ffffff] py-16 lg:py-24 overflow-hidden border-b border-[#c59331]/20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#fec65f] blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#7d5800] blur-3xl"></div>
        </div>

        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff]/10 text-[#ffdea9] text-xs font-bold">
            <span className="material-symbols-outlined text-sm">music_note</span>
            <span>Official Channel • AIC Nuru Gospel Singers, Kitale</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#ffffff] font-bold tracking-tight">
            AIC Nuru Kitale Choir & <br />
            <span className="italic text-[#ffdea9] font-normal">Gospel Singers</span>
          </h1>

          <p className="text-base md:text-lg text-[#b1c8e8] max-w-2xl leading-relaxed">
            All official releases, praise anthems, and worship hymns from the <strong>AIC Nuru Gospel Singers, Kitale</strong> YouTube channel. Stream each song directly here or join our choir family!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#featured-video"
              className="px-6 py-3 rounded-xl bg-[#c59331] text-[#00162c] font-bold text-xs hover:bg-[#fec65f] transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">play_arrow</span>
              <span>Watch Video Stream</span>
            </a>

            <button
              onClick={() => setAuditionModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-[#ffffff]/15 hover:bg-[#ffffff]/25 text-[#ffffff] font-bold text-xs backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">mic</span>
              <span>Audition / Join Choir</span>
            </button>

            <a
              href="https://www.youtube.com/channel/UCx1CA871jUMEvzxMuEGXeOw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#ba1a1a] text-[#ffffff] font-bold text-xs hover:bg-[#93000a] transition-all shadow flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">smart_display</span>
              <span>Channel on YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Video Player Showcase */}
      <section id="featured-video" className="w-full max-w-[1240px] mx-auto px-4 md:px-8 -mt-8 relative z-20 mb-16">
        <div className="bg-[#ffffff] rounded-3xl shadow-2xl overflow-hidden border border-[#cadcf2] grid grid-cols-1 lg:grid-cols-12">
          {/* Main YouTube Embedded Video Player */}
          <div className="lg:col-span-8 bg-[#000000] flex flex-col justify-center">
            <div className="relative aspect-video w-full bg-[#000000]">
              <iframe
                key={selectedVideo.youtubeId}
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                title={`${selectedVideo.title} - ${selectedVideo.artist}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Meta Bar */}
            <div className="p-5 bg-[#00162c] text-[#ffffff] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#122b44]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded bg-[#c59331] text-[#00162c] text-[10px] font-bold uppercase tracking-wider">
                    Now Playing
                  </span>
                  <span className="text-xs text-[#ffdea9]">{selectedVideo.album}</span>
                </div>
                <h3 className="font-serif text-lg md:text-xl font-bold text-[#ffffff]">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-[#b1c8e8]">{selectedVideo.artist} • Duration: {selectedVideo.duration}</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#ffffff]/10 hover:bg-[#ffffff]/20 text-xs text-[#ffdea9] font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  <span>Open in YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Playlist Sidebar */}
          <div className="lg:col-span-4 bg-[#f7f9ff] p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#cadcf2]">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#cadcf2]">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#00162c]">All Channel Tracks ({CHOIR_VIDEOS.length})</h4>
                  <p className="text-xs text-[#43474d]">Click any song to play instantly</p>
                </div>
                <span className="material-symbols-outlined text-[#c59331] text-2xl">playlist_play</span>
              </div>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {CHOIR_VIDEOS.map((vid) => {
                  const isCurrent = selectedVideo.id === vid.id;
                  return (
                    <button
                      key={vid.id}
                      onClick={() => setSelectedVideo(vid)}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center gap-3 border ${
                        isCurrent
                          ? 'bg-[#ffffff] border-[#c59331] ring-2 ring-[#c59331]/20 shadow-md'
                          : 'bg-[#ffffff]/70 border-[#cadcf2] hover:bg-[#ffffff]'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#00162c] text-[#ffdea9] flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: isCurrent ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          {isCurrent ? 'volume_up' : 'play_circle'}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-bold truncate ${isCurrent ? 'text-[#7d5800]' : 'text-[#00162c]'}`}>
                          {vid.title}
                        </p>
                        <p className="text-[11px] text-[#43474d] truncate">{vid.album}</p>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-[#74777e]">{vid.duration}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-[#eef4ff] border border-[#cadcf2] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#7d5800] tracking-wider block">Song Insights</span>
                <p className="text-xs text-[#43474d] leading-relaxed">
                  {selectedVideo.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#cadcf2]/60">
              <a
                href="https://www.youtube.com/channel/UCx1CA871jUMEvzxMuEGXeOw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#00162c] text-[#ffffff] hover:bg-[#122b44] text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm text-[#ba1a1a]">smart_display</span>
                <span>Subscribe on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Video Catalog Grid */}
      <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 mb-20 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7d5800] font-bold">
              Video Catalog
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#00162c] font-bold">
              All Videos from AIC Nuru Gospel Singers, Kitale
            </h2>
            <p className="text-sm text-[#43474d]">
              Browse the complete album tracklist, live praise recordings, and sacred hymns.
            </p>
          </div>

          {/* Search bar & filter tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined text-[#74777e] absolute left-3 top-2.5 text-lg">search</span>
              <input
                type="text"
                placeholder="Search tracks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl border border-[#cadcf2] bg-[#ffffff] text-xs text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331] w-full sm:w-48"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#00162c] text-[#ffffff]'
                    : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                }`}
              >
                All ({CHOIR_VIDEOS.length})
              </button>
              <button
                onClick={() => setActiveFilter('album')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeFilter === 'album'
                    ? 'bg-[#00162c] text-[#ffffff]'
                    : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                }`}
              >
                Album Tracks
              </button>
              <button
                onClick={() => setActiveFilter('hymn')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeFilter === 'hymn'
                    ? 'bg-[#00162c] text-[#ffffff]'
                    : 'bg-[#e4efff] text-[#00162c] hover:bg-[#d2e4fb]'
                }`}
              >
                Hymns & Prayers
              </button>
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isPlaying = selectedVideo.id === video.id;
            return (
              <div
                key={video.id}
                className={`bg-[#ffffff] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border ${
                  isPlaying ? 'border-[#c59331] ring-2 ring-[#c59331]/20' : 'border-[#cadcf2]'
                }`}
              >
                <div>
                  {/* Thumbnail */}
                  <div
                    onClick={() => handleSelectVideo(video)}
                    className="relative aspect-video w-full bg-[#00162c] overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      onError={(e) => {
                        // fallback image if youtube thumbnail fails
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-[#00162c]/30 group-hover:bg-[#00162c]/10 transition-colors"></div>

                    {/* Play Badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#c59331] text-[#00162c] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          play_arrow
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00162c]/80 backdrop-blur-md text-[#ffdea9] text-[10px] font-bold">
                        {video.album}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#00162c]/90 text-[#ffffff] text-[10px] font-mono">
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <h3
                      onClick={() => handleSelectVideo(video)}
                      className="font-serif text-base font-bold text-[#00162c] hover:text-[#7d5800] transition-colors cursor-pointer"
                    >
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#7d5800] font-semibold">{video.artist}</p>
                    <p className="text-xs text-[#43474d] line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#cadcf2]/50 mt-2">
                  <button
                    onClick={() => handleSelectVideo(video)}
                    className="text-xs font-bold text-[#00162c] hover:text-[#7d5800] flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">play_circle</span>
                    <span>Play in Cinema</span>
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#74777e] hover:text-[#ba1a1a] flex items-center gap-1 transition-colors"
                  >
                    <span>YouTube</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Choir Background Story */}
      <section className="w-full bg-[#eef4ff] py-20 border-y border-[#cadcf2]">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#7d5800] font-bold">
                The Choir Journey
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#00162c] font-bold">
                Singing Praises in Kitale for 28 Years
              </h2>
              <div className="space-y-4 text-sm text-[#43474d] leading-relaxed">
                <p>
                  The <strong>AIC Nuru Gospel Singers, Kitale</strong> has grown from a humble praise group into one of the most beloved and disciplined church choirs in Trans-Nzoia County. Clothed in their signature royal navy and gold robes, their songs are broadcast to churches, fellowships, and homes across East Africa.
                </p>
                <p>
                  From their recorded album <em>Mashujaa wa Yesu</em> to classic four-part Swahili hymns, the choir is dedicated to biblical truth, musical excellence, and sacrificial ministry.
                </p>
                <p>
                  We invite every member of our congregation gifted with voice or instruments to step forward and serve God through the choir.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setAuditionModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#c59331] text-[#00162c] font-bold text-xs hover:bg-[#fec65f] transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">mic</span>
                  <span>Join the Choir & Audition</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#00162c] border border-[#cadcf2]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9F6KqL5Ewkj1OHcYCaZeO6on1MNhqhObX-WCQ-1mrgoakvKM87ydR_YTgALRv-yDFGsWK1_ETzhU3g-qspP3KOModWbRa2V80q4gYx__vb4uDi4f69Vk04AYCoHQVfHfhfSWi-h6_cN7nWASEN8Sj0ph0yEs-M0_v_-43kaTWYEwJpeeT6v0enQxemyugKmz3H4sVUbIpJco1FaelThKaI5DhJTj9u2Vvr3JpDQw"
                  alt="AIC Nuru Kitale Choir"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00162c]/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-[#ffffff]/95 backdrop-blur-md text-[#0b1d2d] shadow">
                  <p className="font-serif text-base font-bold text-[#00162c]">Weekly Practice Hours</p>
                  <p className="text-xs text-[#43474d] mt-0.5">
                    Thursdays: 5:30 PM – 7:30 PM • Saturdays: 3:00 PM – 6:00 PM • Main Choir Loft
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audition Modal */}
      {auditionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00162c]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#ffffff] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#cadcf2] max-h-[92vh] flex flex-col">
            <div className="p-5 bg-gradient-to-r from-[#00162c] via-[#061324] to-[#00162c] text-[#ffffff] flex items-center justify-between border-b border-amber-400/20 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                  </svg>
                </span>
                <div>
                  <span className="text-[10px] text-[#fec65f] uppercase tracking-wider font-bold block">
                    Worship Ministry • Direct to WhatsApp
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#ffffff] leading-tight">
                    Join the Choir &amp; Audition
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setAuditionModalOpen(false)}
                className="w-8 h-8 rounded-full text-[#b1c8e8] hover:text-[#ffffff] hover:bg-[#ffffff]/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {!submitted ? (
                <form onSubmit={handleAuditionSubmit} className="space-y-4">
                  {/* Warm Encouragement & Instructions Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-amber-50/40 to-slate-50 border border-emerald-200 text-xs text-emerald-950 space-y-1.5 shadow-sm">
                    <p className="font-bold flex items-center gap-1.5 text-emerald-900 text-sm">
                      <span className="material-symbols-outlined text-[18px] text-emerald-700">music_note</span>
                      Karibu to AIC Nuru Gospel Singers &amp; Choir!
                    </p>
                    <p className="text-xs leading-relaxed text-[#43474d]">
                      We would love to welcome you to the choir! Auditions are warm, encouraging vocal assessments conducted by Director Caleb Wasike. Submitting this application will format and send your details directly to our WhatsApp line (<strong>+254 718 016 491</strong>) so the director can connect with you on rehearsals.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tabitha Chepkemoi"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">Phone Number (Call / WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 718 016 491 or 07XX XXX XXX"
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-sm text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#00162c] mb-1">Voice Part</label>
                      <select
                        value={voicePart}
                        onChange={(e) => setVoicePart(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#cadcf2] bg-[#f7f9ff] text-xs font-semibold text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                      >
                        <option value="Soprano">Soprano</option>
                        <option value="Alto">Alto</option>
                        <option value="Tenor">Tenor</option>
                        <option value="Bass">Bass</option>
                        <option value="Not Sure">Not Sure Yet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#00162c] mb-1">Instrumental Skill</label>
                      <select
                        value={playsInstrument}
                        onChange={(e) => setPlaysInstrument(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#cadcf2] bg-[#f7f9ff] text-xs font-semibold text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                      >
                        <option value="None (Vocalist)">None (Vocalist only)</option>
                        <option value="Keyboard / Piano">Keyboard / Piano</option>
                        <option value="Guitar">Acoustic / Bass Guitar</option>
                        <option value="Drums">Drums / Percussion</option>
                        <option value="Sound Engineering">Sound Engineering</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#00162c] mb-1">
                      Choir Ministry Message / Desire to Serve
                    </label>
                    <textarea
                      rows={3}
                      value={candidateMessage}
                      onChange={(e) => setCandidateMessage(e.target.value)}
                      placeholder="Share your desire to join the choir..."
                      className="w-full p-2.5 rounded-xl border border-[#cadcf2] text-xs text-[#00162c] focus:outline-none focus:ring-2 focus:ring-[#c59331]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#061324] via-[#0b1e36] to-[#061324] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2.5 border border-amber-400/30 cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                      </svg>
                    </span>
                    <span>Submit Audition to WhatsApp (+254 718 016 491)</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto shadow-lg">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#00162c]">
                      Praise God, {candidateName || 'Beloved'}!
                    </h4>
                    <p className="text-xs text-[#43474d] mt-1.5 leading-relaxed max-w-sm mx-auto">
                      Your choir audition application for the <strong className="text-[#00162c]">{voicePart}</strong> section has been structured and sent directly to Choir Director Caleb Wasike on WhatsApp (<strong className="text-emerald-700">+254 718 016 491</strong>).
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={submittedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.17c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.41c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.26-8.22 8.26zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z"/>
                      </svg>
                      <span>Open in WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setAuditionModalOpen(false);
                        setSubmitted(false);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00162c] font-bold text-xs transition cursor-pointer"
                    >
                      Done / Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
