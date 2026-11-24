import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  swargbraman: {
    id: 'swargbraman',
    name: 'SwargBhraman Sacred Gold',
    icon: '🛕',
    tagline: 'Devbhoomi Saffron, Sacred Himalayan Gold & Midnight Navy',
    accent: '#F59E0B',
    accentSecondary: '#EA580C',
    bgBase: '#070B19',
    bgSurface: '#0D1528',
    bgCard: '#121D38',
    border: 'rgba(245, 158, 11, 0.25)',
    glow: 'rgba(245, 158, 11, 0.35)',
    gradient: 'from-amber-400 via-orange-400 to-amber-300',
    buttonGrad: 'from-amber-500 via-orange-500 to-amber-600',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  },
  glacial: {
    id: 'glacial',
    name: 'Trishul Glacial Frost',
    icon: '🏔️',
    tagline: 'High-Altitude Icy Cyan, Snow & Midnight Navy',
    accent: '#06B6D4',
    accentSecondary: '#38BDF8',
    bgBase: '#050B16',
    bgSurface: '#081224',
    bgCard: '#0E1E38',
    border: 'rgba(6, 182, 212, 0.25)',
    glow: 'rgba(6, 182, 212, 0.35)',
    gradient: 'from-cyan-400 via-sky-300 to-blue-200',
    buttonGrad: 'from-cyan-600 via-blue-700 to-indigo-800',
    badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
  },
  sunset: {
    id: 'sunset',
    name: 'Nanda Devi Alpenglow',
    icon: '🌅',
    tagline: 'Golden Hour Dusk, Wild Buransh & Terracotta',
    accent: '#F59E0B',
    accentSecondary: '#F43F5E',
    bgBase: '#0E0812',
    bgSurface: '#181022',
    bgCard: '#241733',
    border: 'rgba(245, 158, 11, 0.25)',
    glow: 'rgba(245, 158, 11, 0.35)',
    gradient: 'from-amber-400 via-orange-400 to-rose-400',
    buttonGrad: 'from-amber-600 via-orange-600 to-rose-700',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  },
  aurora: {
    id: 'aurora',
    name: 'Kedarkantha Starlight',
    icon: '🌌',
    tagline: 'Deep Cosmic Obsidian, Aurora Violet & Starlight',
    accent: '#A855F7',
    accentSecondary: '#14B8A6',
    bgBase: '#070512',
    bgSurface: '#100C24',
    bgCard: '#1C153D',
    border: 'rgba(168, 85, 247, 0.25)',
    glow: 'rgba(168, 85, 247, 0.35)',
    gradient: 'from-purple-400 via-pink-400 to-teal-300',
    buttonGrad: 'from-purple-600 via-indigo-700 to-teal-700',
    badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30'
  }
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Theme Color Palette - SwargBhraman Sacred Gold is the default
  const [themeId, setThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_theme');
      if (saved && saved !== 'emerald' && THEMES[saved]) return saved;
    } catch (e) {}
    return 'swargbraman';
  });

  // Light / Dark Mode State ('dark' | 'light')
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_theme_mode');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return 'dark'; // Midnight Himalayan default
  });

  const isDark = themeMode === 'dark';
  const isLight = themeMode === 'light';
  const currentTheme = THEMES[themeId] || THEMES.swargbraman;

  // Sync mode to HTML root and meta theme-color
  useEffect(() => {
    try {
      localStorage.setItem('swargbraman_theme_mode', themeMode);
      const root = document.documentElement;
      
      if (themeMode === 'light') {
        root.classList.add('light');
        root.classList.remove('dark');
        root.setAttribute('data-theme-mode', 'light');
      } else {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme-mode', 'dark');
      }

      // Update mobile browser address bar color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeMode === 'light' ? '#F8FAFC' : '#080D1A');
      }
    } catch (e) {
      console.error('Failed to sync theme mode:', e);
    }
  }, [themeMode]);

  // Sync palette variables to HTML root
  useEffect(() => {
    try {
      localStorage.setItem('swargbraman_theme', themeId);
      document.documentElement.setAttribute('data-theme', themeId);

      const root = document.documentElement;
      const isL = themeMode === 'light';

      root.style.setProperty('--theme-accent', currentTheme.accent);
      root.style.setProperty('--theme-accent-sec', currentTheme.accentSecondary);
      root.style.setProperty('--theme-bg-base', isL ? '#F8FAFC' : currentTheme.bgBase);
      root.style.setProperty('--theme-bg-surface', isL ? '#FFFFFF' : currentTheme.bgSurface);
      root.style.setProperty('--theme-bg-card', isL ? '#FFFFFF' : currentTheme.bgCard);
      root.style.setProperty('--theme-border', isL ? 'rgba(217, 119, 6, 0.3)' : currentTheme.border);
      root.style.setProperty('--theme-glow', currentTheme.glow);
    } catch (e) {
      console.error('Failed to sync theme palette:', e);
    }
  }, [themeId, currentTheme, themeMode]);

  const toggleThemeMode = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (id) => {
    if (THEMES[id]) {
      setThemeId(id);
    }
  };

  const cycleTheme = () => {
    const keys = Object.keys(THEMES);
    const currentIndex = keys.indexOf(themeId);
    const nextKey = keys[(currentIndex + 1) % keys.length];
    setTheme(nextKey);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeId,
        theme: currentTheme,
        setTheme,
        cycleTheme,
        themes: Object.values(THEMES),
        themeMode,
        isDark,
        isLight,
        toggleThemeMode,
        setThemeMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      themeId: 'swargbraman',
      theme: THEMES.swargbraman,
      themeMode: 'dark',
      isDark: true,
      isLight: false,
      toggleThemeMode: () => {},
      setThemeMode: () => {},
      setTheme: () => {},
      cycleTheme: () => {},
      themes: Object.values(THEMES)
    };
  }
  return context;
};
