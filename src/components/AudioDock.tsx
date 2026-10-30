import React, { useState, useEffect } from 'react';
import { Sermon } from '../types';

interface AudioDockProps {
  currentSermon: Sermon | null;
  onClose: () => void;
}

export const AudioDock: React.FC<AudioDockProps> = ({ currentSermon, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(12); // simulated percentage
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5>(1);

  useEffect(() => {
    if (!currentSermon) return;
    setIsPlaying(true);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentSermon]);

  if (!currentSermon) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-md w-[calc(100vw-3rem)] md:w-full bg-[#00162c] text-[#ffffff] rounded-2xl p-4 shadow-2xl border border-[#c59331]/30 flex flex-col gap-3 animate-slideUp">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#c59331] text-[#00162c] flex items-center justify-center shrink-0 shadow">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'graphic_eq' : 'volume_up'}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#fec65f] text-[#00162c]">
                Audio Player
              </span>
              <span className="text-xs text-[#ffdea9]">{currentSermon.scripture}</span>
            </div>
            <p className="font-bold text-sm text-[#ffffff] truncate mt-0.5">
              {currentSermon.title}
            </p>
            <p className="text-xs text-[#b1c8e8] truncate">
              {currentSermon.speaker} • {currentSermon.duration}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full text-[#7b93b1] hover:text-[#ffffff] hover:bg-[#ffffff]/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          title="Close player"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full bg-[#122b44] rounded-full h-1.5 cursor-pointer overflow-hidden">
          <div
            className="bg-[#c59331] h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#7b93b1]">
          <span>{Math.floor((progress * 48) / 100)}:20</span>
          <span>{currentSermon.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1 border-t border-[#122b44]/80">
        <div className="flex items-center gap-2">
          {/* Speed selector */}
          <button
            onClick={() => setSpeed(speed === 1 ? 1.25 : speed === 1.25 ? 1.5 : 1)}
            className="px-2 py-1 rounded bg-[#122b44] text-[#ffdea9] text-xs font-bold hover:bg-[#122b44]/80 transition-colors cursor-pointer"
            title="Playback speed"
          >
            {speed}x
          </button>

          {/* Volume toggle */}
          <div className="flex items-center gap-1.5 text-xs text-[#7b93b1]">
            <span className="material-symbols-outlined text-sm">volume_down</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 h-1 accent-[#c59331] bg-[#122b44] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Play / Pause button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setProgress((p) => Math.max(0, p - 5))}
            className="text-[#b1c8e8] hover:text-[#ffffff] transition-colors cursor-pointer"
            title="Rewind 15 seconds"
          >
            <span className="material-symbols-outlined text-xl">replay_10</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-[#c59331] text-[#00162c] flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={() => setProgress((p) => Math.min(100, p + 5))}
            className="text-[#b1c8e8] hover:text-[#ffffff] transition-colors cursor-pointer"
            title="Forward 15 seconds"
          >
            <span className="material-symbols-outlined text-xl">forward_10</span>
          </button>
        </div>
      </div>
    </div>
  );
};
