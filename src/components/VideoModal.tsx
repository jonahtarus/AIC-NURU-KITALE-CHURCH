import React, { useState } from 'react';
import { Sermon } from '../types';

interface VideoModalProps {
  sermon: Sermon | null;
  onClose: () => void;
  onPlayAudioInstead: (sermon: Sermon) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  sermon,
  onClose,
  onPlayAudioInstead
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'scripture'>('video');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!sermon) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00162c]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-[#122b44]/10">
        {/* Modal Header */}
        <div className="p-4 md:px-6 bg-[#00162c] text-[#ffffff] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-1 rounded bg-[#c59331] text-[#00162c] text-xs font-bold uppercase tracking-wider">
              {sermon.series || 'Sunday Sermon Stream'}
            </span>
            <span className="text-xs text-[#ffdea9] truncate">{sermon.scripture}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClose();
                onPlayAudioInstead(sermon);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 text-xs text-[#ffffff] font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">headphones</span>
              <span>Audio Only</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full text-[#b1c8e8] hover:text-[#ffffff] hover:bg-[#ffffff]/10 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1">
          {/* Simulated Video Player Container */}
          <div className="relative aspect-video w-full bg-[#000000] overflow-hidden flex items-center justify-center group">
            <img
              src={sermon.thumbnail}
              alt={sermon.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00162c]/90 via-[#00162c]/30 to-transparent"></div>

            {/* Video center live simulated overlay */}
            <div className="relative z-10 text-center space-y-3 p-6 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59331] text-[#00162c] text-xs font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
                <span>HD Stream • AIC Nuru Pulpit</span>
              </div>
              <h2 className="font-serif text-xl md:text-3xl font-bold text-[#ffffff] drop-shadow-md">
                {sermon.title}
              </h2>
              <p className="text-xs md:text-sm text-[#ffdea9]">
                Preached by {sermon.speaker} ({sermon.speakerRole})
              </p>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#000000] to-transparent flex items-center justify-between text-[#ffffff] text-xs">
              <div className="flex items-center gap-3">
                <button className="text-[#c59331] hover:scale-110 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    pause_circle
                  </span>
                </button>
                <span className="font-mono">14:32 / {sermon.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-[#ffffff]/20 font-bold">1080p 60fps</span>
                <button onClick={handleCopyLink} className="hover:text-[#c59331] transition-colors cursor-pointer" title="Share link">
                  <span className="material-symbols-outlined text-lg">share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="border-b border-[#cadcf2] bg-[#f7f9ff] px-6 flex items-center gap-4">
            <button
              onClick={() => setActiveTab('video')}
              className={`py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'video'
                  ? 'border-[#c59331] text-[#00162c]'
                  : 'border-transparent text-[#43474d] hover:text-[#00162c]'
              }`}
            >
              Overview & Key Points
            </button>
            <button
              onClick={() => setActiveTab('scripture')}
              className={`py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'scripture'
                  ? 'border-[#c59331] text-[#00162c]'
                  : 'border-transparent text-[#43474d] hover:text-[#00162c]'
              }`}
            >
              Scripture Passage ({sermon.scripture})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'notes'
                  ? 'border-[#c59331] text-[#00162c]'
                  : 'border-transparent text-[#43474d] hover:text-[#00162c]'
              }`}
            >
              Study Notes & PDF
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 space-y-6">
            {activeTab === 'video' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#00162c]">{sermon.title}</h3>
                  <p className="text-xs text-[#7d5800] font-bold mt-1">
                    Scripture Anchor: {sermon.scripture} • Date: {sermon.date}
                  </p>
                  <p className="text-sm text-[#43474d] mt-3 leading-relaxed">
                    {sermon.description}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="bg-[#eef4ff] p-5 rounded-xl border border-[#d2e4fb] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00162c] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#7d5800] text-sm">lightbulb</span>
                    <span>Core Teachings & Spiritual Action Steps</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-[#0b1d2d]">
                    {sermon.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#fec65f] text-[#755100] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pull Quote */}
                <div className="p-4 rounded-xl bg-[#fdfbf7] border-l-4 border-[#c59331] space-y-1">
                  <p className="font-serif italic text-sm text-[#00162c] leading-relaxed">
                    {sermon.excerpt}
                  </p>
                  <span className="text-xs font-bold uppercase text-[#7d5800] block">
                    — {sermon.speaker}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'scripture' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#cadcf2]">
                  <h3 className="font-serif text-xl font-bold text-[#00162c]">
                    {sermon.scripture}
                  </h3>
                  <span className="px-2.5 py-1 rounded bg-[#e4efff] text-xs font-bold text-[#00162c]">
                    New International Version (NIV)
                  </span>
                </div>
                <div className="bg-[#f7f9ff] p-6 rounded-xl border border-[#d2e4fb] text-sm leading-loose text-[#0b1d2d] font-serif space-y-3">
                  <p>
                    <sup className="font-sans font-bold text-xs text-[#7d5800] mr-1">8</sup>
                    For you were once darkness, but now you are light in the Lord. Live as children of light
                  </p>
                  <p>
                    <sup className="font-sans font-bold text-xs text-[#7d5800] mr-1">9</sup>
                    (for the fruit of the light consists in all goodness, righteousness and truth)
                  </p>
                  <p>
                    <sup className="font-sans font-bold text-xs text-[#7d5800] mr-1">10</sup>
                    and find out what pleases the Lord.
                  </p>
                  <p>
                    <sup className="font-sans font-bold text-xs text-[#7d5800] mr-1">11</sup>
                    Have nothing to do with the fruitless deeds of darkness, but rather expose them.
                  </p>
                  <p>
                    <sup className="font-sans font-bold text-xs text-[#7d5800] mr-1">14</sup>
                    This is why it is said: “Wake up, sleeper, rise from the dead, and Christ will shine on you.”
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#e4efff] border border-[#cadcf2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00162c] text-[#ffffff] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#00162c]">{sermon.title} - Study Guide</h4>
                      <p className="text-xs text-[#43474d]">PDF Document • 4 Pages • Includes Jumuiya Cell Discussion Questions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading study notes for: ${sermon.title}`)}
                    className="px-4 py-2 rounded-xl bg-[#c59331] text-[#00162c] font-bold text-xs hover:bg-[#fec65f] transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download PDF (1.4 MB)</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00162c]">Cell Group Discussion Prompts:</h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#43474d] leading-relaxed">
                    <li>In what areas of workplace or family life do believers face the subtle temptation to compromise?</li>
                    <li>How does recognizing our identity as 'Children of Light' empower our boldness in Kitale?</li>
                    <li>Spend time in your cell group praying for revival in our town and blessing one another.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f7f9ff] border-t border-[#cadcf2] flex items-center justify-between">
          {copiedLink ? (
            <span className="text-xs text-[#2b8c67] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">check</span>
              <span>Sermon link copied! Share with friends.</span>
            </span>
          ) : (
            <button
              onClick={handleCopyLink}
              className="text-xs text-[#00162c] font-bold flex items-center gap-1.5 hover:text-[#7d5800] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">share</span>
              <span>Share Sermon Link</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#00162c] text-[#ffffff] text-xs font-bold hover:bg-[#122b44] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
