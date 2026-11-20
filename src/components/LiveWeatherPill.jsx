import React, { useState, useEffect } from 'react';
import { fetchStationWeather, UTTARAKHAND_WEATHER_STATIONS } from '../utils/weatherService';
import { CloudSun, Thermometer, ChevronRight } from 'lucide-react';

export default function LiveWeatherPill({ onOpenWeatherModal }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [stationIndex, setStationIndex] = useState(0);

  const keyStations = ['kedarnath', 'auli', 'chopta', 'nainital', 'almora', 'rishikesh'];

  useEffect(() => {
    let isMounted = true;
    const stationId = keyStations[stationIndex];
    const station = UTTARAKHAND_WEATHER_STATIONS.find(s => s.id === stationId) || UTTARAKHAND_WEATHER_STATIONS[0];

    fetchStationWeather(station).then(data => {
      if (isMounted) {
        setCurrentWeather(data);
      }
    });

    // Rotate station every 6 seconds
    const timer = setInterval(() => {
      setStationIndex(prev => (prev + 1) % keyStations.length);
    }, 6000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [stationIndex]);

  return (
    <button
      onClick={() => onOpenWeatherModal?.(currentWeather?.stationId || 'kedarnath')}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-xl border border-sky-400/30 hover:border-amber-400/50 text-xs text-sky-200 transition shadow-lg group cursor-pointer"
      title="Click to view full Uttarakhand Weather & Temperature"
    >
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-amber-400 font-bold">
          {currentWeather ? currentWeather.stationName.split(' ')[0] : 'Kedarnath'}:
        </span>
        <span className="font-extrabold text-white">
          {currentWeather ? (currentWeather.currentTemp > 0 ? `+${currentWeather.currentTemp}` : currentWeather.currentTemp) : '-2'}°C
        </span>
        <span className="text-xs">
          {currentWeather?.condition?.icon || '❄️'}
        </span>
      </span>

      <span className="text-[10px] text-slate-400 group-hover:text-amber-300 transition flex items-center">
        <span>Live Weather</span>
        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
      </span>
    </button>
  );
}
