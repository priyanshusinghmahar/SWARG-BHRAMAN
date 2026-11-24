import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import { 
  CloudSun, Wind, Droplets, Thermometer, ShieldAlert, 
  MapPin, RefreshCw, X, ArrowRight, Mountain, Sparkles, 
  CheckCircle2, Navigation, Clock, AlertCircle 
} from 'lucide-react';

export default function WeatherModal({ isOpen, onClose, initialStationId = 'kedarnath', onBookTrip }) {
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

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'garhwal', 'kumaon'

  useEffect(() => {
    if (isOpen && initialStationId && initialStationId !== selectedStationId) {
      selectStation(initialStationId);
    }
  }, [isOpen, initialStationId, selectedStationId, selectStation]);

  if (!isOpen) return null;

  const filteredStations = stations.filter(s => {
    if (activeTab === 'garhwal') return s.region === 'Garhwal';
    if (activeTab === 'kumaon') return s.region === 'Kumaon';
    return true;
  });

  const handleSelectStation = (stationId) => {
    selectStation(stationId);
  };

  const handleDetectLiveLocation = () => {
    requestCurrentLocation(true);
  };

  const loading = !currentWeather || isLocating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-gradient-to-br dark:from-[#0B1220] dark:via-[#0E1729] dark:to-[#070B14] border border-slate-200 dark:border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-8 space-y-6 max-h-[92vh] flex flex-col text-slate-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-base font-bold w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 flex items-center justify-center transition border border-slate-200 dark:border-white/10 z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-800 dark:text-sky-300 text-xs font-bold border border-sky-500/30 uppercase flex items-center gap-1.5">
              <CloudSun className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
              <span>Live Open-Meteo Satellite Feed</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <span className={`w-2 h-2 rounded-full ${currentWeather?.isLiveGps ? 'bg-sky-400 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
              <span>{currentWeather?.isLiveGps ? 'Live Browser GPS' : 'Uttarakhand Stations'}</span>
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-950 dark:text-white flex items-center gap-2">
            <span>Uttarakhand Live Weather & Temperature</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            Real-time temperatures, WMO alpine weather codes, wind gusts, and local time at your selected location. Zero page reload.
          </p>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
          
          {/* Live Location / Station Bar */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Select Mountain Area or Detect Live Location:</span>
              </span>

              {/* Region Filter */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-0.5 rounded-lg border border-slate-200 dark:border-white/10 text-[11px] self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-2 py-0.5 rounded transition ${activeTab === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'}`}
                >
                  All ({stations.length})
                </button>
                <button
                  onClick={() => setActiveTab('garhwal')}
                  className={`px-2 py-0.5 rounded transition ${activeTab === 'garhwal' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'}`}
                >
                  Garhwal
                </button>
                <button
                  onClick={() => setActiveTab('kumaon')}
                  className={`px-2 py-0.5 rounded transition ${activeTab === 'kumaon' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'}`}
                >
                  Kumaon
                </button>
              </div>
            </div>

            {/* Quick Location Chips with Live Location Pill */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              
              {/* Live GPS Chip */}
              <button
                type="button"
                onClick={handleDetectLiveLocation}
                disabled={isLocating}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                  selectedStationId === 'live-gps'
                    ? 'bg-sky-500 text-white dark:text-slate-950 border-sky-400 font-extrabold shadow-lg shadow-sky-950/20'
                    : 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 hover:text-sky-950 dark:hover:text-white border-sky-300 dark:border-sky-500/30 hover:bg-sky-100 dark:hover:bg-sky-900/50'
                }`}
              >
                <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Acquiring GPS...' : '📍 Use My Live Location'}</span>
              </button>

              {filteredStations.map(station => {
                const isSelected = station.id === selectedStationId;
                return (
                  <button
                    key={station.id}
                    onClick={() => handleSelectStation(station.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-950/20'
                        : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-slate-200 dark:border-white/10 hover:bg-slate-200/70 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{station.name.split(' ')[0]}</span>
                    <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-black/20 text-slate-950' : 'bg-slate-200 dark:bg-white/10 text-amber-800 dark:text-amber-300'}`}>
                      {station.region}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Location Notice / Error */}
            {locationError && (
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>{locationError}</span>
              </div>
            )}
          </div>

          {/* Current Live Weather Hero Card */}
          {loading ? (
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center space-y-3 min-h-[220px]">
              <RefreshCw className="w-8 h-8 text-amber-500 dark:text-amber-400 animate-spin" />
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {isLocating ? 'Retrieving coordinates from browser Geolocation API...' : 'Fetching satellite data from Open-Meteo...'}
              </p>
            </div>
          ) : currentWeather ? (
            <div className="space-y-5">
              
              <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-r from-[#121E36] via-[#162544] to-[#0E182D] border-amber-500/30' 
                  : 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-sky-500/10 border-amber-400/40'
              }`}>
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  
                  {/* Left Station Info & Main Temp */}
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className={`font-bold flex items-center gap-1 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                        {currentWeather.isLiveGps && <Navigation className="w-3.5 h-3.5 text-sky-400 animate-pulse" />}
                        <span>{currentWeather.fullLocationName || currentWeather.stationName}</span>
                      </span>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>•</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{currentWeather.region}</span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className={`text-5xl sm:text-6xl font-extrabold font-serif tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {currentWeather.currentTemp > 0 ? `+${currentWeather.currentTemp}` : currentWeather.currentTemp}°C
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-xl sm:text-2xl font-bold flex items-center gap-1.5">
                          <span>{currentWeather.condition.icon}</span>
                          <span className={isDark ? 'text-amber-300 font-bold' : 'text-amber-700 font-bold'}>
                            {currentWeather.condition.label}
                          </span>
                        </div>
                        <div className={`text-xs flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                          <span>Feels like {currentWeather.apparentTemp}°C</span>
                          <span>•</span>
                          <span className={`flex items-center gap-1 font-semibold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                            <Clock className="w-3 h-3" />
                            <span>Time: {currentWeather.lastUpdated}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {currentWeather.isLiveGps && currentWeather.lat && (
                      <div className={`text-[11px] font-mono mt-1.5 flex items-center gap-1 ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                        <Navigation className="w-3 h-3 text-sky-400" />
                        <span>GPS Coordinates: {currentWeather.lat}° N, {currentWeather.lng}° E</span>
                      </div>
                    )}
                  </div>

                  {/* Right Micro Stats */}
                  <div className={`grid grid-cols-3 sm:grid-cols-1 gap-2.5 p-3 sm:p-4 rounded-2xl border text-xs shadow-xs ${
                    isDark ? 'bg-black/40 border-white/10 text-slate-300' : 'bg-white/90 border-slate-200 text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-sky-400" />
                      <div>
                        <div className={`text-[10px] leading-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Wind Speed</div>
                        <div className={`font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentWeather.windSpeed} km/h</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className={`text-[10px] leading-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Humidity</div>
                        <div className={`font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentWeather.humidity}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className={`text-[10px] leading-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Altitude</div>
                        <div className={`font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentWeather.altitude}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Thermal Packing Advice Alert */}
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-white/[0.03] border border-amber-500/25 dark:border-white/10 flex items-start gap-3 text-xs">
                <span className="text-2xl flex-shrink-0">🧥</span>
                <div>
                  <div className="font-bold text-amber-800 dark:text-amber-300 font-serif mb-0.5">
                    Recommended Mountain Attire for {currentWeather.stationName.split(' ')[0]}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                    {currentWeather.advice.details}
                  </p>
                </div>
              </div>

              {/* 5-Day Alpine Forecast */}
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                  5-Day Mountain Temperature Forecast
                </span>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {currentWeather.dailyForecast?.map((day, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-center flex flex-col justify-between shadow-xs"
                    >
                      <div className="font-bold text-xs text-slate-800 dark:text-slate-200">{day.dayName}</div>
                      <div className="text-2xl my-1.5">{day.condition.icon}</div>
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                        {day.maxTemp > 0 ? `+${day.maxTemp}` : day.maxTemp}°
                        <span className="text-slate-500 dark:text-slate-400 font-normal ml-1 text-[10px]">
                          {day.minTemp > 0 ? `+${day.minTemp}` : day.minTemp}°
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-white/10 text-xs">
                <button
                  onClick={refreshCurrentWeather}
                  disabled={isRefreshing}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-amber-600 dark:text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh Satellite Feed</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onBookTrip?.({ destination: currentWeather.stationName, region: currentWeather.region });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
                >
                  <span>Book Expedition to {currentWeather.stationName.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : null}

        </div>

      </div>
    </div>
  );
}
