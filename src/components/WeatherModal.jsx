import React, { useState, useEffect } from 'react';
import { 
  UTTARAKHAND_WEATHER_STATIONS, 
  fetchStationWeather 
} from '../utils/weatherService';
import { 
  CloudSun, Wind, Droplets, Thermometer, ShieldAlert, 
  MapPin, RefreshCw, X, ArrowRight, Mountain, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function WeatherModal({ isOpen, onClose, initialStationId = 'kedarnath', onBookTrip }) {
  const [selectedStationId, setSelectedStationId] = useState(initialStationId);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'garhwal', 'kumaon'

  useEffect(() => {
    if (initialStationId) {
      setSelectedStationId(initialStationId);
    }
  }, [initialStationId]);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    const station = UTTARAKHAND_WEATHER_STATIONS.find(s => s.id === selectedStationId) || UTTARAKHAND_WEATHER_STATIONS[0];

    fetchStationWeather(station).then(data => {
      if (isMounted) {
        setWeatherData(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedStationId]);

  if (!isOpen) return null;

  const currentStation = UTTARAKHAND_WEATHER_STATIONS.find(s => s.id === selectedStationId) || UTTARAKHAND_WEATHER_STATIONS[0];

  const filteredStations = UTTARAKHAND_WEATHER_STATIONS.filter(s => {
    if (activeTab === 'garhwal') return s.region === 'Garhwal';
    if (activeTab === 'kumaon') return s.region === 'Kumaon';
    return true;
  });

  const handleRefresh = () => {
    setLoading(true);
    fetchStationWeather(currentStation).then(data => {
      setWeatherData(data);
      setLoading(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-gradient-to-br from-[#0B1220] via-[#0E1729] to-[#070B14] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl p-5 sm:p-8 space-y-6 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-base font-bold w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition border border-white/10 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 uppercase flex items-center gap-1.5">
              <CloudSun className="w-3.5 h-3.5 text-sky-400" />
              <span>Live Open-Meteo Satellite Feed</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-time</span>
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white flex items-center gap-2">
            <span>Uttarakhand Live Mountain Weather</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time temperatures, WMO alpine weather codes, wind gusts & thermal packing advisories.
          </p>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          
          {/* Station Selection Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Weather Station / Valley</span>
              </span>

              {/* Region Filter */}
              <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-[11px]">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-2 py-0.5 rounded ${activeTab === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  All ({UTTARAKHAND_WEATHER_STATIONS.length})
                </button>
                <button
                  onClick={() => setActiveTab('garhwal')}
                  className={`px-2 py-0.5 rounded ${activeTab === 'garhwal' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Garhwal
                </button>
                <button
                  onClick={() => setActiveTab('kumaon')}
                  className={`px-2 py-0.5 rounded ${activeTab === 'kumaon' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Kumaon
                </button>
              </div>
            </div>

            {/* Station Chips Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {filteredStations.map(station => {
                const isSelected = station.id === selectedStationId;
                return (
                  <button
                    key={station.id}
                    onClick={() => setSelectedStationId(station.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border flex items-center gap-1.5 flex-shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-950/40'
                        : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span>{station.name.split(' ')[0]}</span>
                    <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-black/20 text-slate-950' : 'bg-white/10 text-amber-300'}`}>
                      {station.region}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Live Weather Hero Card */}
          {loading ? (
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center space-y-3 min-h-[220px]">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-xs text-slate-300">
                Fetching satellite data for {currentStation.name} from Open-Meteo...
              </p>
            </div>
          ) : weatherData ? (
            <div className="space-y-5">
              
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121E36] via-[#162544] to-[#0E182D] border border-amber-500/30 shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  
                  {/* Left Station Info & Main Temp */}
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                      <span className="font-bold text-amber-400">{weatherData.stationName}</span>
                      <span>•</span>
                      <span>{weatherData.region} ({weatherData.district})</span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl sm:text-6xl font-extrabold font-serif text-white tracking-tight">
                        {weatherData.currentTemp > 0 ? `+${weatherData.currentTemp}` : weatherData.currentTemp}°C
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-xl sm:text-2xl font-bold flex items-center gap-1.5">
                          <span>{weatherData.condition.icon}</span>
                          <span className={weatherData.condition.color}>{weatherData.condition.label}</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Feels like {weatherData.apparentTemp}°C • Altitude: {weatherData.altitude}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Micro Stats */}
                  <div className="grid grid-cols-3 sm:grid-cols-1 gap-2.5 bg-black/30 p-3 sm:p-4 rounded-2xl border border-white/10 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-sky-400" />
                      <div>
                        <div className="text-[10px] text-slate-400 leading-none">Wind Speed</div>
                        <div className="font-bold text-white leading-tight">{weatherData.windSpeed} km/h</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-[10px] text-slate-400 leading-none">Humidity</div>
                        <div className="font-bold text-white leading-tight">{weatherData.humidity}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-[10px] text-slate-400 leading-none">Precipitation</div>
                        <div className="font-bold text-white leading-tight">{weatherData.precipitation} mm</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer of Hero with Refresh */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Synchronized with Open-Meteo (Updated {weatherData.lastUpdated})</span>
                  </div>

                  <button
                    onClick={handleRefresh}
                    className="hover:text-amber-300 flex items-center gap-1 transition"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* 5-Day Forecast Grid */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  5-Day Meteorological Forecast
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                  {weatherData.dailyForecast.map((day, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition text-center flex flex-col justify-between"
                    >
                      <div className="text-xs font-bold text-white">{day.dayName}</div>
                      <div className="text-2xl my-1">{day.condition.icon}</div>
                      <div className="text-[11px] font-bold text-slate-200">
                        {day.maxTemp}° / <span className="text-slate-400">{day.minTemp}°</span>
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1 truncate">
                        {day.condition.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clothing & Mountain Packing Advisory */}
              <div className="p-4 rounded-2xl bg-[#141E34] border border-sky-400/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wide">
                    <ShieldAlert className="w-4 h-4 text-sky-400" />
                    <span>Himalayan Packing & Thermal Advisory</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-200 border border-sky-400/30">
                    {weatherData.advice.badge}
                  </span>
                </div>

                <div className="text-sm font-bold text-white">
                  {weatherData.advice.title}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {weatherData.advice.details}
                </p>
              </div>

            </div>
          ) : null}

        </div>

        {/* Modal Footer Controls */}
        <div className="flex-shrink-0 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Coordinates: {currentStation.lat.toFixed(4)}°N, {currentStation.lng.toFixed(4)}°E • Devbhoomi
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition border border-white/10"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                if (onBookTrip) {
                  onBookTrip({
                    name: currentStation.name,
                    title: `Expedition to ${currentStation.name}`,
                    destination: currentStation.region,
                    region: currentStation.region,
                    pricePerPerson: currentStation.fallbackTemp < 5 ? 5500 : 3800,
                    startingPrice: currentStation.fallbackTemp < 5 ? 5500 : 3800,
                    duration: '4-5 Days',
                    description: `${currentStation.type} (${currentStation.altitude})`
                  });
                }
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs transition flex items-center gap-1.5 shadow-lg shadow-amber-950/40"
            >
              <span>Book Trip to {currentStation.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
