import React, { useState, useEffect, useRef } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import { isCurrentlyDaytime } from '../utils/weatherService';
import { 
  CloudSun, Thermometer, ChevronRight, MapPin, Navigation, 
  ChevronDown, Check, Clock, AlertCircle, RefreshCw 
} from 'lucide-react';

export default function LiveWeatherPill({ onOpenWeatherModal }) {
  const { isDark } = useTheme();
  const {
    currentWeather,
    selectedStationId,
    isLocating,
    isRefreshing,
    locationError,
    stations,
    requestCurrentLocation,
    selectStation,
    refreshCurrentWeather
  } = useWeather();

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle GPS location request without page reload
  const handleDetectLiveLocation = () => {
    requestCurrentLocation(true);
  };

  // Handle station selection without page reload
  const handleSelectArea = (stationId) => {
    selectStation(stationId);
    setShowPicker(false);
  };

  const displayName = currentWeather 
    ? (currentWeather.city || currentWeather.stationName.split(' ')[0])
    : 'Kedarnath';

  const displayTemp = currentWeather 
    ? (currentWeather.currentTemp > 0 ? `+${currentWeather.currentTemp}` : currentWeather.currentTemp) 
    : '-2';

  return (
    <div className="relative inline-block" ref={pickerRef}>
      
      {/* Weather Pill Button */}
      <div className="inline-flex items-center rounded-full bg-slate-100/95 dark:bg-slate-900/90 border border-slate-300 dark:border-amber-500/30 hover:border-amber-500 p-0.5 shadow-sm dark:shadow-lg backdrop-blur-xl text-xs transition">
        
        {/* Click to open quick area picker */}
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition cursor-pointer text-xs"
          title="Click to change selected area or detect live GPS location (No Reload)"
        >
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${currentWeather?.isLiveGps ? 'bg-sky-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
          
          <span className="text-amber-800 dark:text-amber-300 font-bold max-w-[50px] sm:max-w-[80px] truncate inline-block text-[11px] sm:text-xs">
            {isLocating ? 'GPS...' : displayName}
          </span>

          <span className="font-extrabold text-slate-900 dark:text-white font-mono text-[11px] sm:text-xs whitespace-nowrap">
            {displayTemp}°C
          </span>

          <span className="text-xs sm:text-sm flex-shrink-0">
            {currentWeather?.condition?.icon || (isCurrentlyDaytime() ? '☀️' : '🌙')}
          </span>

          <ChevronDown className={`w-3 h-3 text-slate-500 dark:text-slate-400 transition-transform flex-shrink-0 ${showPicker ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Quick Location & Area Selector Popover */}
      {showPicker && (
        <div className={`fixed inset-x-3 top-16 sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-80 max-w-sm border-2 rounded-3xl p-3.5 shadow-2xl backdrop-blur-2xl z-50 text-xs animate-in fade-in zoom-in-95 space-y-2.5 ${
          isDark 
            ? 'bg-[#0E1627] border-amber-500/40 text-white shadow-black/80' 
            : 'bg-white border-slate-300 text-slate-900 shadow-slate-300/60'
        }`}>
          
          <div className={`flex items-center justify-between pb-2 border-b px-1 ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}>
            <span className={`font-bold uppercase tracking-wider text-[10px] ${
              isDark ? 'text-amber-300' : 'text-amber-800'
            }`}>
              Select Area / Live Location
            </span>
            <span className={`text-[10px] flex items-center gap-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Real-Time Open-Meteo
            </span>
          </div>

          {/* 1. Detect Live GPS Location Button */}
          <button
            type="button"
            onClick={handleDetectLiveLocation}
            disabled={isLocating}
            className={`w-full p-2.5 rounded-2xl border transition flex items-center justify-between text-left ${
              selectedStationId === 'live-gps'
                ? (isDark ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold' : 'bg-sky-50 border-sky-400 text-sky-950 font-bold')
                : (isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800')
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-xl ${
                selectedStationId === 'live-gps'
                  ? (isDark ? 'bg-sky-400/20 text-sky-300' : 'bg-sky-100 text-sky-700')
                  : (isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-200 text-slate-700')
              }`}>
                <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin text-sky-500' : (isDark ? 'text-sky-400' : 'text-sky-600')}`} />
              </div>
              <div>
                <div className={`font-bold text-xs flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <span>{isLocating ? 'Detecting Browser Coordinates...' : '📍 Use My Live Location'}</span>
                  {selectedStationId === 'live-gps' && (
                    <span className="text-[9px] bg-sky-500 text-white dark:text-slate-950 px-1.5 py-0.2 rounded-full font-bold">ACTIVE</span>
                  )}
                </div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentWeather?.isLiveGps && currentWeather?.city 
                    ? `Detected: ${currentWeather.city} (${currentWeather.lat}°, ${currentWeather.lng}°)` 
                    : 'Browser Geolocation API (Instant update without reload)'}
                </div>
              </div>
            </div>
            {selectedStationId === 'live-gps' && <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />}
          </button>

          {/* Error Message if GPS was denied */}
          {locationError && (
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-[10px] flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{locationError}</span>
            </div>
          )}

          {/* 2. Uttarakhand Station Areas List */}
          <div className="pt-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-1 block mb-1.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Or Choose Selected Mountain Area:
            </span>

            <div className="max-h-52 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
              {stations.map(st => {
                const isSelected = selectedStationId === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectArea(st.id)}
                    className={`w-full px-2.5 py-1.5 rounded-xl text-left flex items-center justify-between transition text-xs ${
                      isSelected
                        ? (isDark ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold' : 'bg-amber-100 border border-amber-400 text-amber-950 font-bold')
                        : (isDark ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-100 text-slate-800')
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span className="truncate">{st.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0 text-[11px] font-mono">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{st.region}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Link to Full Forecast Page */}
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] px-1">
            <button
              type="button"
              onClick={refreshCurrentWeather}
              disabled={isRefreshing}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white flex items-center gap-1 transition"
              title="Refresh weather without reload"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-amber-500 dark:text-amber-400' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowPicker(false);
                onOpenWeatherModal?.(selectedStationId);
              }}
              className="text-amber-700 dark:text-amber-400 hover:underline font-bold"
            >
              Open Full Forecast →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
