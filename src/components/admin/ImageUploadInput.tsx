import React, { useState, useRef } from 'react';

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  recommendedAspect?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  value,
  onChange,
  label = 'Image / Photo',
  recommendedAspect = 'Recommended: 16:9 or 4:3'
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const PRESET_IMAGES = [
    {
      name: 'Sanctuary Interior',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCehi7oM8eWTPrUDCLkiDuVml23FsWuFudfs0t-lnlqJxIMF1Ndf2tgrN4L1MPUihUeAPzA_-p9-VJx64eF-izNqI2OxCfJMAi_cNpETXZfdWYcLDarGtHSsJkjGurTLnCHH4mQVelWNrpl1-ya1VOO-t52_XK4fYSmsKFXSXa_qEBHqwC1ky3QQUKaqgA8ZedVJIlSe3DyumyTqTmadiHGwz_rH_DssUAxKeH2CHY'
    },
    {
      name: 'Worship Service',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1P2Q3-sample-praise-worship-kitale-service'
    },
    {
      name: 'Pastor Portrait',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq4hTT78tsMqlVWVQbFsvR9A4tQNizfaOQZ-dAQhLq9QS6T536mDPVMki6IPpToN8SGGv00zr_BEecPuL4ka62ZyCI2hRY2gGtXqHKVMKvY1-Sy4DyKhyVqvf-RJogtNaDDWRA7U19o4nzJF5RFHgKpJ-6OLdxfuq4n_C47qbBWmK7SCsSDRZ0MTv-7N6Xi6QL4uoG1GWmt4MkFp6YhP9cGNU-G7d672xg9XbHLUc'
    },
    {
      name: 'Church Banner Exterior',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA276P2-8-hN3qB4oD54r_91n4wz5rI9_yP0hV9B4c_0mN2V3x-X4yZ0_qR8sW7uT4vP2Q6rN8tY3uI9mO1_pA2wX8sE4dG7hJ0kL3oN6qS9vU2wY5zA7bC4eF8hK1'
    }
  ];

  // Client-side image compression: reads file, draws to canvas, compresses to JPEG data URL (~40-80KB)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimension 1200px
          const MAX_DIM = 1200;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Could not get canvas context');

          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with 0.78 quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78);
          onChange(compressedDataUrl);
          setIsProcessing(false);
        } catch (err) {
          setErrorMsg('Failed to process image. Try another file or paste a URL.');
          setIsProcessing(false);
        }
      };
      img.onerror = () => {
        setErrorMsg('Invalid image file.');
        setIsProcessing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#00162c] uppercase tracking-wider">
          {label}
        </label>
        <span className="text-[11px] text-[#43474d]">{recommendedAspect}</span>
      </div>

      {/* Preview Box */}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-[#c59331]/30 bg-[#f8f9fa] shadow-sm group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-44 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/600x400/00162c/ffffff?text=Image+Preview';
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white text-[#00162c] text-xs font-bold hover:bg-white/90 shadow transition"
            >
              Change Photo
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow transition"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-[#c59331] rounded-xl p-6 text-center cursor-pointer bg-gray-50/50 hover:bg-[#fff9ed]/50 transition-all"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="material-symbols-outlined text-3xl text-[#c59331]">
              cloud_upload
            </span>
            <span className="text-xs font-semibold text-gray-700">
              Click to upload photo from your device
            </span>
            <span className="text-[11px] text-gray-400">
              Supports JPG, PNG, WebP (auto-optimized)
            </span>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {isProcessing && (
        <p className="text-xs text-[#c59331] font-semibold animate-pulse">
          Optimizing and uploading image...
        </p>
      )}

      {errorMsg && (
        <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
      )}

      {/* Or Paste Direct URL */}
      <div className="pt-1 flex items-center gap-2">
        <input
          type="text"
          value={value.startsWith('data:') ? '(Uploaded photo from device)' : value}
          onChange={(e) => {
            if (!e.target.value.startsWith('(Uploaded')) {
              onChange(e.target.value);
            }
          }}
          placeholder="Or paste an image web link (https://...)"
          className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#c59331] bg-white text-gray-700"
        />
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="text-xs px-2.5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 font-medium whitespace-nowrap"
        >
          {showPresets ? 'Close Samples' : 'Sample Images'}
        </button>
      </div>

      {showPresets && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-2 gap-2">
          {PRESET_IMAGES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onChange(preset.url);
                setShowPresets(false);
              }}
              className="text-left text-xs p-2 rounded bg-white hover:bg-[#fff9ed] border border-gray-100 flex items-center gap-2 truncate"
            >
              <img
                src={preset.url}
                alt=""
                className="w-7 h-7 rounded object-cover flex-shrink-0"
              />
              <span className="truncate font-medium text-gray-700">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
