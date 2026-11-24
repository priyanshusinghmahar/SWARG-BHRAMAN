import React from 'react';

export default function SwargBhramanLogo({ size = 'md', showSubtitle = true, className = '' }) {
  // Dimension presets with clean responsive scaling
  const sizeMap = {
    sm: { iconSize: 30, textScale: 'text-sm sm:text-base xl:text-lg', subScale: 'text-[8px]' },
    md: { iconSize: 40, textScale: 'text-base sm:text-lg lg:text-xl xl:text-2xl', subScale: 'text-[9px] sm:text-[10px]' },
    lg: { iconSize: 52, textScale: 'text-xl sm:text-2xl lg:text-3xl', subScale: 'text-xs' },
    xl: { iconSize: 70, textScale: 'text-2xl sm:text-3xl lg:text-4xl', subScale: 'text-sm' },
  };

  const { iconSize, textScale, subScale } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Official SwargBhraman Emblem */}
      <div className="relative group/logo flex-shrink-0">
        {/* Warm Golden Glow Behind Logo */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 opacity-60 blur-md group-hover/logo:opacity-90 transition duration-500" />
        
        {/* Emblem Container with Full Rounded Protection */}
        <div 
          style={{ width: iconSize, height: iconSize }}
          className="relative rounded-xl overflow-hidden border border-amber-400/80 bg-[#0E1627] shadow-lg shadow-black/50 group-hover/logo:scale-105 transition-transform duration-300 flex items-center justify-center p-0.5"
        >
          <img
            src="/swargbraman-logo.jpg"
            alt="SwargBhraman Logo"
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.innerHTML = `
                <div class="w-full h-full bg-gradient-to-b from-[#131E35] to-[#0A0E1A] flex items-center justify-center p-1">
                  <span class="text-xl">🛕</span>
                </div>
              `;
            }}
          />
        </div>
      </div>

      {/* Typography */}
      <div className="min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className={`font-black font-serif tracking-tight text-slate-900 dark:text-white leading-none ${textScale} whitespace-nowrap`}>
            Swarg<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-amber-300 dark:via-orange-400 dark:to-amber-200">Bhraman</span>
          </span>
          <span className={`${size === 'sm' ? 'hidden xl:inline-flex text-[8px] xl:text-[9px]' : 'hidden sm:inline-flex text-[9px] sm:text-[10px]'} font-extrabold text-amber-700 dark:text-amber-300 tracking-wider uppercase px-1.5 py-0.2 rounded-full bg-amber-500/15 border border-amber-500/40 whitespace-nowrap`}>
            Devbhoomi
          </span>
        </div>
        
        {showSubtitle && (
          <p className={`hidden sm:block text-slate-600 dark:text-slate-300 font-medium tracking-wide leading-tight mt-0.5 ${subScale} truncate`}>
            Sacred Peaks • Native Artisans • Divine Journey
          </p>
        )}
      </div>
    </div>
  );
}

// Aliases for backwards compatibility
export const SafarNamaLogo = SwargBhramanLogo;
export const PahadiVibeLogo = SwargBhramanLogo;
