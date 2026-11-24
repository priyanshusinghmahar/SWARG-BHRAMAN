import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggleButton({ 
  variant = 'pill', 
  className = '', 
  showLabel = true 
}) {
  const { themeMode, isDark, toggleThemeMode } = useTheme();

  // Floating variant for instant 1-click access anywhere
  if (variant === 'floating') {
    return (
      <button
        type="button"
        onClick={toggleThemeMode}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Current: ${isDark ? 'Dark (Midnight Himalayan)' : 'Light (Alpine Daylight)'}. Click to switch.`}
        className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center cursor-pointer border ${
          isDark 
            ? 'bg-[#0E1627]/95 border-amber-400/40 text-amber-300 hover:text-amber-200 hover:bg-[#131F38] shadow-amber-950/60' 
            : 'bg-white/95 border-amber-500/30 text-amber-600 hover:text-amber-700 hover:bg-slate-50 shadow-slate-400/30'
        } backdrop-blur-xl ${className}`}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400 animate-spin-slow transition-transform" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600 transition-transform" />
          )}
        </div>
      </button>
    );
  }

  // Mobile menu full-width switch
  if (variant === 'switch') {
    return (
      <div 
        onClick={toggleThemeMode}
        className={`w-full flex items-center justify-between p-3 rounded-2xl cursor-pointer transition border ${
          isDark
            ? 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-slate-200'
            : 'bg-slate-100 border-slate-200 hover:bg-slate-200/70 text-slate-800'
        } ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${
            isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
          }`}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </div>
          <div>
            <div className="text-xs font-bold font-serif">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </div>
            <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {isDark ? 'Switch to bright Alpine Daylight' : 'Switch to Midnight Himalayan'}
            </div>
          </div>
        </div>

        <div className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
          isDark ? 'bg-amber-500/30' : 'bg-slate-300'
        }`}>
          <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
            isDark ? 'translate-x-5 bg-amber-400' : 'translate-x-0'
          }`} />
        </div>
      </div>
    );
  }

  // Compact icon button
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleThemeMode}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Current: ${isDark ? 'Dark Mode (Midnight)' : 'Light Mode (Daylight)'}. Click to switch.`}
        className={`p-2 rounded-xl transition duration-300 border-2 flex items-center justify-center cursor-pointer shadow-sm ${
          isDark
            ? 'bg-[#0E1627] hover:bg-[#131F38] border-amber-400/50 text-amber-300 hover:text-amber-200'
            : 'bg-white hover:bg-slate-100 border-slate-300 text-amber-600 hover:text-amber-700'
        } ${className}`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform hover:rotate-90 duration-300 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 transition-transform hover:-rotate-12 duration-300 text-slate-900" />
        )}
      </button>
    );
  }

  // Default: High-Contrast Pill button for Navbar & Topbars
  return (
    <button
      type="button"
      onClick={toggleThemeMode}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current: ${isDark ? 'Dark Mode' : 'Light Mode'}. Click to switch to ${isDark ? 'Light' : 'Dark'}.`}
      className={`group px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border-2 shadow-md cursor-pointer whitespace-nowrap select-none ${
        isDark
          ? 'bg-[#0B1328] hover:bg-[#131F38] border-amber-500/50 text-amber-300 hover:text-amber-200'
          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-900 hover:text-slate-950 shadow-sm'
      } ${className}`}
    >
      <div className={`p-1 rounded-full transition-transform duration-300 group-hover:scale-110 ${
        isDark ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-100 text-amber-700'
      }`}>
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-slate-900 group-hover:-rotate-12 transition-transform" />
        )}
      </div>

      {showLabel && (
        <span className="text-[11px] font-bold tracking-wide">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
}
