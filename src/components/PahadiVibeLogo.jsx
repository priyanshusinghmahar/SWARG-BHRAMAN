import React from 'react';

export default function SafarNamaLogo({ size = 'md', showSubtitle = true, className = '' }) {
  // Dimension presets
  const sizeMap = {
    sm: { iconSize: 32, textScale: 'text-base', subScale: 'text-[8px]' },
    md: { iconSize: 42, textScale: 'text-xl sm:text-2xl', subScale: 'text-[9px] sm:text-[10px]' },
    lg: { iconSize: 56, textScale: 'text-2xl sm:text-3xl', subScale: 'text-xs' },
    xl: { iconSize: 72, textScale: 'text-3xl sm:text-4xl', subScale: 'text-sm' },
  };

  const { iconSize, textScale, subScale } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Mountain Crest SVG Badge */}
      <div className="relative group/logo flex-shrink-0">
        {/* Ambient Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-sky-400 opacity-60 blur-md group-hover/logo:opacity-90 transition duration-500" />
        
        {/* Insignia Box */}
        <div 
          style={{ width: iconSize, height: iconSize }}
          className="relative rounded-2xl bg-gradient-to-b from-[#131E35] via-[#0E1627] to-[#0A0E1A] border border-amber-400/40 p-1 flex items-center justify-center shadow-xl shadow-black/60 group-hover/logo:scale-105 transition-transform duration-300"
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              {/* Sun Gradient */}
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0.8" />
              </radialGradient>
              
              {/* Peak Primary Gradient */}
              <linearGradient id="peakLeft" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="45%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>

              {/* Peak Right Shading */}
              <linearGradient id="peakRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="40%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              {/* Gold Sun Rays */}
              <linearGradient id="goldRay" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Sacred River Curve */}
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>

            {/* Rising Golden Himalayan Sun */}
            <circle cx="50" cy="38" r="19" fill="url(#sunGlow)" />
            
            {/* Soft Sun Ray Halo */}
            <circle cx="50" cy="38" r="23" stroke="url(#goldRay)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* Background Mountain Peaks */}
            <polygon points="12,78 36,42 60,78" fill="#1E293B" opacity="0.6" />
            <polygon points="40,78 64,44 88,78" fill="#1E293B" opacity="0.6" />

            {/* Majestic Central Peak (Nanda Devi / Trishul Silhouette) */}
            {/* Left lit face */}
            <polygon points="50,22 18,78 50,78" fill="url(#peakLeft)" />
            {/* Right shadowed face */}
            <polygon points="50,22 50,78 82,78" fill="url(#peakRight)" />
            
            {/* Snow Ridge Highlight */}
            <line x1="50" y1="22" x2="50" y2="78" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

            {/* Fore peak (Chopta / Chandrashila) */}
            <polygon points="66,48 50,78 82,78" fill="#0F172A" opacity="0.85" />
            <polygon points="66,48 66,78 82,78" fill="#1E293B" opacity="0.9" />

            {/* Sacred Ganga / Alaknanda Meandering River Curve */}
            <path
              d="M 24 82 Q 50 74, 52 83 T 78 86"
              stroke="url(#riverGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 32 87 Q 50 81, 54 88 T 68 89"
              stroke="#BAE6FD"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />

            {/* Auspicious Morning Star / Compass Point */}
            <polygon points="50,14 52,19 57,20 53,23 54,28 50,25 46,28 47,23 43,20 48,19" fill="#FEF08A" />
          </svg>
        </div>
      </div>

      {/* Typography */}
      <div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`font-black font-serif tracking-tight text-white leading-none ${textScale}`}>
            Safar<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Nama</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-extrabold text-amber-400 tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
            Devbhoomi
          </span>
        </div>
        
        {showSubtitle && (
          <p className={`text-slate-400 font-medium tracking-wide leading-tight mt-0.5 ${subScale}`}>
            Sacred Peaks • Native Artisans • 0% Middleman
          </p>
        )}
      </div>
    </div>
  );
}

// Backward compatibility alias
export const PahadiVibeLogo = SafarNamaLogo;
