import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Devbhoomi Pine',
    icon: '🌲',
    tagline: 'Mystical Pine, Sacred Green & Temple Amber',
    accent: '#10B981',
    accentSecondary: '#F59E0B',
    bgBase: '#060D0C',
    bgSurface: '#0B1715',
    bgCard: '#102320',
    border: 'rgba(16, 185, 129, 0.25)',
    glow: 'rgba(16, 185, 129, 0.35)',
    gradient: 'from-emerald-500 via-teal-400 to-amber-300',
    buttonGrad: 'from-emerald-600 via-teal-700 to-emerald-800',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  },
  glacial: {
    id: 'glacial',
    name: 'Trishul Glacial Frost',
    icon: '🏔️',
    tagline: 'High-Altitude Icy Cyan, Snow & Midnight Navy',
    accent: '#06B6D4',
    accentSecondary: '#38BDF8',
    bgBase: '#040914',
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
    bgBase: '#0E0706',
    bgSurface: '#190E0C',
    bgCard: '#2A1714',
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
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('pahadivibe_theme') || 'emerald';
  });

  const currentTheme = THEMES[themeId] || THEMES.emerald;

  useEffect(() => {
    localStorage.setItem('pahadivibe_theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);

    // Inject CSS variables directly on root
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-accent-sec', currentTheme.accentSecondary);
    root.style.setProperty('--theme-bg-base', currentTheme.bgBase);
    root.style.setProperty('--theme-bg-surface', currentTheme.bgSurface);
    root.style.setProperty('--theme-bg-card', currentTheme.bgCard);
    root.style.setProperty('--theme-border', currentTheme.border);
    root.style.setProperty('--theme-glow', currentTheme.glow);
  }, [themeId, currentTheme]);

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
        themes: Object.values(THEMES)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
