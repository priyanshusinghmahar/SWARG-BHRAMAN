import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UTTARAKHAND_WEATHER_STATIONS, 
  fetchStationWeather, 
  fetchLiveCoordsWeather,
  findNearestStation
} from '../utils/weatherService';

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const [selectedStationId, setSelectedStationId] = useState(() => {
    return localStorage.getItem('safarnama_weather_station') || 'kedarnath';
  });

  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied' | 'unsupported'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load weather for a given station ID
  const loadStationWeather = useCallback(async (stationId) => {
    const station = UTTARAKHAND_WEATHER_STATIONS.find(s => s.id === stationId) || UTTARAKHAND_WEATHER_STATIONS[0];
    try {
      const data = await fetchStationWeather(station);
      setCurrentWeather(data);
      return data;
    } catch (err) {
      console.warn('Error loading station weather:', err);
    }
  }, []);

  // Request browser geolocation and update weather reactively (NO PAGE RELOAD)
  const requestCurrentLocation = useCallback((isUserInitiated = true) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      const err = 'Geolocation is not supported by your browser.';
      setLocationError(err);
      if (isUserInitiated) alert(err);
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Fetch real-time weather from Open-Meteo + reverse geocoded city
          const liveData = await fetchLiveCoordsWeather(latitude, longitude);
          
          // Atomically update React state without page reload
          setCurrentWeather(liveData);
          setSelectedStationId('live-gps');
          setIsLocating(false);
          setLocationError(null);
          setPermissionStatus('granted');

          // Persist user preference for next visit
          localStorage.setItem('safarnama_weather_station', 'live-gps');
          localStorage.setItem(
            'safarnama_gps_coords', 
            JSON.stringify({ lat: latitude, lng: longitude, timestamp: Date.now() })
          );
        } catch (apiErr) {
          console.error('Weather fetch error for coordinates:', apiErr);
          setIsLocating(false);
          setLocationError('Unable to fetch live weather for coordinates.');
          loadStationWeather('kedarnath');
        }
      },
      (error) => {
        setIsLocating(false);
        let errorMsg = 'Could not access your location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = 'Location permission was denied. Select any mountain destination manually.';
            setPermissionStatus('denied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = 'Location signal is unavailable in this environment.';
            break;
          case error.TIMEOUT:
            errorMsg = 'Location request timed out. Please try again.';
            break;
          default:
            errorMsg = error.message || 'An unknown location error occurred.';
            break;
        }

        setLocationError(errorMsg);
        console.warn('Browser Geolocation notice:', errorMsg);

        // Fall back gracefully to Kedarnath or saved station without reloading
        const savedStation = localStorage.getItem('safarnama_weather_station');
        const fallbackId = (savedStation && savedStation !== 'live-gps') ? savedStation : 'kedarnath';
        setSelectedStationId(fallbackId);
        loadStationWeather(fallbackId);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, [loadStationWeather]);

  // Select a mountain area or live location
  const selectStation = useCallback((stationId) => {
    setSelectedStationId(stationId);
    setLocationError(null);

    if (stationId === 'live-gps') {
      requestCurrentLocation(true);
      return;
    }

    localStorage.setItem('safarnama_weather_station', stationId);
    loadStationWeather(stationId);
  }, [loadStationWeather, requestCurrentLocation]);

  // Refresh current active weather without reload
  const refreshCurrentWeather = useCallback(async () => {
    setIsRefreshing(true);
    if (selectedStationId === 'live-gps') {
      const savedCoords = localStorage.getItem('safarnama_gps_coords');
      if (savedCoords) {
        try {
          const { lat, lng } = JSON.parse(savedCoords);
          const data = await fetchLiveCoordsWeather(lat, lng);
          setCurrentWeather(data);
          setIsRefreshing(false);
          return;
        } catch (e) {}
      }
      requestCurrentLocation(false);
    } else {
      await loadStationWeather(selectedStationId);
    }
    setIsRefreshing(false);
  }, [selectedStationId, loadStationWeather, requestCurrentLocation]);

  // On mount: check browser permissions & initialize weather
  useEffect(() => {
    // 1. Check navigator.permissions query if supported
    if (typeof navigator !== 'undefined' && navigator.permissions?.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((permission) => {
          setPermissionStatus(permission.state);

          // If permission is already granted and user preferred live-gps, auto fetch location!
          const savedStation = localStorage.getItem('safarnama_weather_station');
          if (permission.state === 'granted' && savedStation === 'live-gps') {
            requestCurrentLocation(false);
          }

          // Listen for permission change (e.g. user toggles in browser address bar)
          permission.onchange = () => {
            setPermissionStatus(permission.state);
            if (permission.state === 'granted') {
              requestCurrentLocation(false);
            }
          };
        })
        .catch(() => {
          // Permissions API query not supported for geolocation in some environments
        });
    }

    // 2. Initial weather load
    const savedStation = localStorage.getItem('safarnama_weather_station');
    if (savedStation === 'live-gps') {
      const savedCoords = localStorage.getItem('safarnama_gps_coords');
      if (savedCoords) {
        try {
          const { lat, lng } = JSON.parse(savedCoords);
          fetchLiveCoordsWeather(lat, lng).then(data => {
            setCurrentWeather(data);
          }).catch(() => {
            loadStationWeather('kedarnath');
          });
          return;
        } catch (e) {}
      }
      // If no cached coords, request live location
      requestCurrentLocation(false);
    } else {
      loadStationWeather(savedStation || 'kedarnath');
    }
    // 3. Periodic background refresh (every 8 minutes) to transition day/night gracefully
    const refreshTimer = setInterval(() => {
      refreshCurrentWeather();
    }, 8 * 60 * 1000);

    return () => clearInterval(refreshTimer);
  }, [loadStationWeather, requestCurrentLocation, refreshCurrentWeather]);

  const value = {
    currentWeather,
    selectedStationId,
    isLocating,
    isRefreshing,
    locationError,
    permissionStatus,
    stations: UTTARAKHAND_WEATHER_STATIONS,
    requestCurrentLocation,
    selectStation,
    refreshCurrentWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
