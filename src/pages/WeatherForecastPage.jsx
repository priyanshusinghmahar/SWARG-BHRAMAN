import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UTTARAKHAND_WEATHER_STATIONS, 
  fetchStationWeather, 
  fetchWeatherOverview 
} from '../utils/weatherService';
import { 
  CloudSun, Wind, Droplets, Thermometer, ShieldAlert, 
  MapPin, RefreshCw, ArrowRight, Mountain, Sparkles, 
  CheckCircle2, Compass, Sun, Snowflake, CloudRain 
} from 'lucide-react';

export default function WeatherForecastPage({ onBookTrip, onOpenWeatherModal }) {
  const [stationsData, setStationsData] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState('kedarnath');
  const [activeWeather, setActiveWeather] = useState(null);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingActive, setLoadingActive] = useState(true);
  const [regionFilter, setRegionFilter] = useState('all');

  // Load all stations overview on mount
  useEffect(() => {
    let isMounted = true;
    setLoadingOverview(true);

    Promise.all(UTTARAKHAND_WEATHER_STATIONS.map(s => fetchStationWeather(s)))
      .then(results => {
        if (isMounted) {
          setStationsData(results);
          setLoadingOverview(false);
          const active = results.find(r => r.stationId === selectedStationId) || results[0];
          setActiveWeather(active);
          setLoadingActive(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update active station when changed
  const handleSelectStation = (stationId) => {
    setSelectedStationId(stationId);
    const existing = stationsData.find(s => s.stationId === stationId);
    if (existing) {
      setActiveWeather(existing);
    } else {
      setLoadingActive(true);
      const station = UTTARAKHAND_WEATHER_STATIONS.find(s => s.id === stationId);
      if (station) {
        fetchStationWeather(station).then(data => {
          setActiveWeather(data);
          setLoadingActive(false);
        });
      }
    }
  };

  const filteredStations = stationsData.filter(s => {
    if (regionFilter === 'garhwal') return s.region === 'Garhwal';
    if (regionFilter === 'kumaon') return s.region === 'Kumaon';
    return true;
  });

  return (
    <div className="py-12 bg-[#090E1A] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-amber-400 transition">Home</Link>
          <span>/</span>
          <span className="text-amber-300 font-semibold">Live Mountain Weather & Temperature</span>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-[#0C1528] via-[#111C36] to-[#0A1020] rounded-3xl p-6 sm:p-10 border border-amber-500/25 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <CloudSun className="w-4 h-4 text-sky-400 animate-spin" />
              <span>Real-Time Satellite Feed • Powered by Open-Meteo</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              Uttarakhand Live Weather & Temperature
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Check live meteorological conditions across high-altitude passes, pilgrim valleys, and pine ridges. Access hourly temperatures, wind chill, 5-day forecasts, and mountain thermal gear advisories before starting your expedition.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>12 Automated Meteorological Stations Active</span>
              </span>
              <span>•</span>
              <span className="text-amber-300">Updated Every 15 Minutes</span>
            </div>
          </div>
        </div>

        {/* Selected Hub Deep-Dive Card */}
        {activeWeather && (
          <div className="bg-gradient-to-br from-[#0F172A] via-[#13203A] to-[#0A101E] rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                  <span>{activeWeather.region} Region</span>
                  <span>•</span>
                  <span>{activeWeather.district} District</span>
                  <span>•</span>
                  <span>Elevation: {activeWeather.altitude}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                  {activeWeather.stationName}
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Coordinates: {activeWeather.lat.toFixed(4)}°N, {activeWeather.lng.toFixed(4)}°E
                </p>
              </div>

              {/* Huge Live Temperature Badge */}
              <div className="flex items-baseline gap-4 bg-black/40 p-5 rounded-3xl border border-white/10 self-start md:self-auto">
                <div className="text-5xl sm:text-7xl font-extrabold font-serif text-white tracking-tight">
                  {activeWeather.currentTemp > 0 ? `+${activeWeather.currentTemp}` : activeWeather.currentTemp}°C
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl flex items-center gap-2 font-bold">
                    <span>{activeWeather.condition.icon}</span>
                    <span className={activeWeather.condition.color}>{activeWeather.condition.label}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Apparent Chill: {activeWeather.apparentTemp}°C
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Triad (Wind, Humidity, Precipitation) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Wind Velocity</div>
                  <div className="text-lg font-bold text-white">{activeWeather.windSpeed} km/h</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Relative Humidity</div>
                  <div className="text-lg font-bold text-white">{activeWeather.humidity}%</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Precipitation</div>
                  <div className="text-lg font-bold text-white">{activeWeather.precipitation} mm</div>
                </div>
              </div>
            </div>

            {/* 5-Day Daily Forecast Strip */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                5-Day Upcoming Weather Forecast for {activeWeather.stationName}
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {activeWeather.dailyForecast?.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center flex flex-col justify-between"
                  >
                    <div className="text-xs font-bold text-white">{day.dayName}</div>
                    <div className="text-3xl my-2">{day.condition.icon}</div>
                    <div className="text-sm font-bold text-white">
                      {day.maxTemp}° / <span className="text-slate-400">{day.minTemp}°</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 truncate">
                      {day.condition.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thermal & Packing Advisory */}
            <div className="p-5 rounded-2xl bg-[#141F38] border border-sky-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wide">
                  <ShieldAlert className="w-4 h-4 text-sky-400" />
                  <span>{activeWeather.advice.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {activeWeather.advice.details}
                </p>
              </div>

              <button
                onClick={() => {
                  if (onBookTrip) {
                    onBookTrip({
                      name: activeWeather.stationName,
                      title: `Expedition to ${activeWeather.stationName}`,
                      destination: activeWeather.region,
                      region: activeWeather.region,
                      pricePerPerson: activeWeather.currentTemp < 5 ? 5500 : 3800,
                      startingPrice: activeWeather.currentTemp < 5 ? 5500 : 3800,
                      duration: '4-5 Days',
                      description: `${activeWeather.altitude} • Verified by Open-Meteo`
                    });
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs transition flex items-center gap-1.5 shadow-lg shadow-amber-950/40 flex-shrink-0"
              >
                <span>Book This Destination</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* All 12 Stations Live Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Live State-Wide Meteorological Stations
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                Current Temperature Across All 12 Hubs
              </h3>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setRegionFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${regionFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                All Stations ({stationsData.length})
              </button>
              <button
                onClick={() => setRegionFilter('garhwal')}
                className={`px-3 py-1.5 rounded-lg transition ${regionFilter === 'garhwal' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Garhwal Himalayas
              </button>
              <button
                onClick={() => setRegionFilter('kumaon')}
                className={`px-3 py-1.5 rounded-lg transition ${regionFilter === 'kumaon' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Kumaon Hills
              </button>
            </div>
          </div>

          {loadingOverview ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-300">Synchronizing satellite telemetry from Open-Meteo API...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStations.map(station => {
                const isSelected = station.stationId === selectedStationId;

                return (
                  <div
                    key={station.stationId}
                    onClick={() => handleSelectStation(station.stationId)}
                    className={`p-5 rounded-2xl transition duration-200 cursor-pointer border flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-[#15233E] border-amber-400 shadow-xl ring-2 ring-amber-400/30'
                        : 'bg-[#101728] border-white/10 hover:border-amber-400/40 hover:bg-[#131D33]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-amber-300">
                          {station.region}
                        </span>
                        <span className="text-[11px] text-slate-400">{station.altitude.split(' ')[0]} m</span>
                      </div>

                      <h4 className="font-extrabold text-white text-lg font-serif">
                        {station.stationName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{station.district} District</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{station.condition.icon}</span>
                        <div>
                          <div className="text-2xl font-extrabold font-serif text-white">
                            {station.currentTemp > 0 ? `+${station.currentTemp}` : station.currentTemp}°C
                          </div>
                          <div className="text-[10px] text-slate-400">{station.condition.label}</div>
                        </div>
                      </div>

                      <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-slate-400 group-hover:text-white'}`}>
                        {isSelected ? 'Selected ●' : 'View Deep Dive →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
