// Open-Meteo Weather Service for Uttarakhand Mountain Destinations
// Uses free Open-Meteo Forecast API (no API key required)

export const UTTARAKHAND_WEATHER_STATIONS = [
  {
    id: 'kedarnath',
    name: 'Kedarnath Dham',
    region: 'Garhwal',
    district: 'Rudraprayag',
    lat: 30.7352,
    lng: 79.0669,
    altitude: '3,584 m (11,758 ft)',
    type: 'High Altitude Pilgrimage & Shrine',
    fallbackTemp: -2,
    fallbackDesc: 'Freezing Cold • Clear Mountain Sky'
  },
  {
    id: 'badrinath',
    name: 'Badrinath Dham',
    region: 'Garhwal',
    district: 'Chamoli',
    lat: 30.7433,
    lng: 79.4938,
    altitude: '3,300 m (10,827 ft)',
    type: 'High Altitude Sacred Valley',
    fallbackTemp: 0,
    fallbackDesc: 'Chilly • Alpine Sun'
  },
  {
    id: 'auli',
    name: 'Auli Ski Resort',
    region: 'Garhwal',
    district: 'Chamoli',
    lat: 30.5293,
    lng: 79.5694,
    altitude: '2,800 m (9,186 ft)',
    type: 'Alpine Ski Meadow & Slopes',
    fallbackTemp: 2,
    fallbackDesc: 'Crisp Cold • Powder Snow'
  },
  {
    id: 'chopta',
    name: 'Chopta & Tungnath',
    region: 'Garhwal',
    district: 'Rudraprayag',
    lat: 30.4856,
    lng: 79.1764,
    altitude: '2,680 m (8,792 ft)',
    type: 'Evergreen Bugyal & High Trek',
    fallbackTemp: 4,
    fallbackDesc: 'Cool Mountain Breeze'
  },
  {
    id: 'nainital',
    name: 'Nainital Lake City',
    region: 'Kumaon',
    district: 'Nainital',
    lat: 29.3803,
    lng: 79.4636,
    altitude: '2,084 m (6,837 ft)',
    type: 'Emerald Lake & Pine Ridge',
    fallbackTemp: 11,
    fallbackDesc: 'Pleasant Lakeside Weather'
  },
  {
    id: 'almora',
    name: 'Almora & Kasar Devi',
    region: 'Kumaon',
    district: 'Almora',
    lat: 29.5971,
    lng: 79.6591,
    altitude: '1,638 m (5,374 ft)',
    type: 'Cultural & Pine Forest Ridge',
    fallbackTemp: 13,
    fallbackDesc: 'Crisp Sunshine & Clear Views'
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie & Landour',
    region: 'Garhwal',
    district: 'Dehradun',
    lat: 30.4598,
    lng: 78.0644,
    altitude: '2,005 m (6,578 ft)',
    type: 'Queen of Hills & Deodar Ridge',
    fallbackTemp: 12,
    fallbackDesc: 'Misty Pines & Cool Air'
  },
  {
    id: 'munsiyari',
    name: 'Munsiyari (Panchachuli)',
    region: 'Kumaon',
    district: 'Pithoragarh',
    lat: 30.0668,
    lng: 80.2333,
    altitude: '2,200 m (7,217 ft)',
    type: 'Johar High Border Valley',
    fallbackTemp: 6,
    fallbackDesc: 'Cold Mountain Crest'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh Valley',
    region: 'Garhwal',
    district: 'Dehradun / Tehri',
    lat: 30.0869,
    lng: 78.2676,
    altitude: '372 m (1,220 ft)',
    type: 'Ganges Valley & Foothills',
    fallbackTemp: 22,
    fallbackDesc: 'Mild & Sunny Riverbank'
  },
  {
    id: 'dehradun',
    name: 'Dehradun Capital',
    region: 'Garhwal',
    district: 'Dehradun',
    lat: 30.3165,
    lng: 78.0322,
    altitude: '450 m (1,476 ft)',
    type: 'Doon Valley Gateway',
    fallbackTemp: 23,
    fallbackDesc: 'Warm Day & Mild Evening'
  },
  {
    id: 'jim-corbett',
    name: 'Jim Corbett National Park',
    region: 'Kumaon',
    district: 'Nainital / Pauri',
    lat: 29.5300,
    lng: 78.7747,
    altitude: '400 m (1,312 ft)',
    type: 'Sal Forest & Tiger Belt',
    fallbackTemp: 21,
    fallbackDesc: 'Pleasant Forest Safari'
  },
  {
    id: 'tehri',
    name: 'Tehri Lake & Dam',
    region: 'Garhwal',
    district: 'Tehri Garhwal',
    lat: 30.3794,
    lng: 78.4800,
    altitude: '1,750 m (5,741 ft)',
    type: 'Aquatic High Reservoir',
    fallbackTemp: 14,
    fallbackDesc: 'Breezy Lakeside'
  }
];

// Helper: Check if current time is daytime in India / local time (06:15 AM to 17:30 PM)
export function isCurrentlyDaytime(date = new Date()) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  // Mountain sunset occurs between 17:15 and 17:30 in autumn/winter
  if (hour < 6 || hour > 17) return false;
  if (hour === 6 && minutes < 15) return false;
  if (hour === 17 && minutes >= 30) return false;
  return true;
}

// WMO Weather Codes mapping to human conditions, icons and clothing advice (with Day/Night support)
export function getWeatherInterpretation(code, isDay = null) {
  // If isDay is not explicitly provided, calculate dynamically from current local time
  const isDaytime = isDay !== null ? Boolean(isDay) : isCurrentlyDaytime();

  switch (code) {
    case 0:
      return {
        label: isDaytime ? 'Clear Sky' : 'Clear Mountain Night',
        icon: isDaytime ? '☀️' : '🌙',
        badge: isDaytime ? 'Sunny & Clear' : 'Clear & Starry 🌙',
        color: isDaytime ? 'text-amber-500 dark:text-amber-400' : 'text-amber-600 dark:text-amber-300',
        bg: isDaytime ? 'bg-amber-500/10 border-amber-500/30' : 'bg-indigo-500/10 border-indigo-500/30'
      };
    case 1:
      return {
        label: isDaytime ? 'Mainly Clear' : 'Starry Night',
        icon: isDaytime ? '🌤️' : '✨',
        badge: isDaytime ? 'Mostly Sunny' : 'Starry Sky ✨',
        color: isDaytime ? 'text-amber-600 dark:text-amber-300' : 'text-amber-500 dark:text-amber-300',
        bg: isDaytime ? 'bg-amber-500/10 border-amber-500/25' : 'bg-purple-500/10 border-purple-500/25'
      };
    case 2:
      return {
        label: isDaytime ? 'Partly Cloudy' : 'Passing Night Clouds',
        icon: isDaytime ? '⛅' : '☁️',
        badge: isDaytime ? 'Passing Clouds' : 'Night Clouds ☁️',
        color: isDaytime ? 'text-sky-600 dark:text-sky-300' : 'text-sky-600 dark:text-sky-300',
        bg: 'bg-sky-500/10 border-sky-500/25'
      };
    case 3:
      return {
        label: isDaytime ? 'Overcast' : 'Cloudy Night',
        icon: '☁️',
        badge: isDaytime ? 'Heavy Cloud Cover' : 'Overcast Night',
        color: 'text-slate-600 dark:text-slate-300',
        bg: 'bg-slate-500/10 border-slate-500/25'
      };
    case 45:
    case 48:
      return {
        label: isDaytime ? 'Himalayan Fog / Mist' : 'Himalayan Night Fog',
        icon: '🌫️',
        badge: isDaytime ? 'Reduced Visibility' : 'Low Visibility Night',
        color: 'text-slate-600 dark:text-slate-400',
        bg: 'bg-slate-600/15 border-slate-400/30'
      };
    case 51:
    case 53:
    case 55:
      return {
        label: isDaytime ? 'Light Mountain Drizzle' : 'Night Mountain Drizzle',
        icon: isDaytime ? '🌦️' : '🌧️',
        badge: isDaytime ? 'Light Showers' : 'Night Drizzle',
        color: 'text-cyan-600 dark:text-cyan-300',
        bg: 'bg-cyan-500/10 border-cyan-500/25'
      };
    case 61:
    case 63:
    case 65:
      return {
        label: isDaytime ? 'Alpine Rain' : 'Night Mountain Rain',
        icon: '🌧️',
        badge: isDaytime ? 'Rainfall Alert' : 'Cold Night Rain Alert',
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-500/15 border-blue-500/30'
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        label: isDaytime ? 'Powder Snowfall' : 'Night Snowfall',
        icon: '❄️',
        badge: isDaytime ? 'Fresh Snow Alert' : 'Night Snowfall Alert',
        color: 'text-sky-600 dark:text-sky-200',
        bg: 'bg-sky-400/20 border-sky-300/40'
      };
    case 80:
    case 81:
    case 82:
      return {
        label: isDaytime ? 'Heavy Rain Showers' : 'Heavy Night Rain',
        icon: '⛈️',
        badge: isDaytime ? 'Carry Rain Poncho' : 'Heavy Rain Alert',
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-500/20 border-indigo-400/40'
      };
    case 85:
    case 86:
      return {
        label: isDaytime ? 'Snow Blizzard / Showers' : 'Night Snow Blizzard',
        icon: '🌨️',
        badge: isDaytime ? 'Heavy Snowpack' : 'Freezing Night Blizzard',
        color: 'text-sky-600 dark:text-sky-300',
        bg: 'bg-sky-500/25 border-sky-400/40'
      };
    case 95:
    case 96:
    case 99:
      return {
        label: isDaytime ? 'Mountain Thunderstorm' : 'Night Mountain Thunderstorm',
        icon: '⚡',
        badge: 'Stay Indoors',
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-500/20 border-yellow-500/40'
      };
    default:
      return {
        label: isDaytime ? 'Mild Mountain Climate' : 'Quiet Mountain Night',
        icon: isDaytime ? '🏔️' : '🌙',
        badge: isDaytime ? 'Stable Weather' : 'Clear Alpine Night',
        color: isDaytime ? 'text-amber-600 dark:text-amber-300' : 'text-indigo-600 dark:text-indigo-300',
        bg: 'bg-amber-500/10 border-amber-500/20'
      };
  }
}

// Clothing & Gear Recommendation based on temperature, altitude & time of day
export function getClothingAdvice(temp, altitudeMeters = 2000, isDay = null) {
  const isDaytime = isDay !== null ? Boolean(isDay) : isCurrentlyDaytime();

  if (temp <= 0) {
    return {
      title: isDaytime ? 'Heavy Thermal Arctic Layering Required' : 'Extreme Sub-Zero Night Freeze Alert',
      details: isDaytime
        ? 'Sub-zero temperatures. Wear 3-layer system: thermal inners (merino wool), fleece mid-layer, and windproof down feather jacket. Carry woolen cap (balaclava), waterproof trekking gloves, and warm woolen socks.'
        : 'Severe sub-zero nighttime freeze. Stay indoors in heated lodgings or use extreme 4-season down sleeping bags. Wear thermal base layers, fleece and heavy balaclava.',
      level: 'severe-cold',
      badge: isDaytime ? 'Sub-Zero Freeze ❄️' : 'Sub-Zero Night ❄️'
    };
  } else if (temp <= 8) {
    return {
      title: isDaytime ? 'Warm Winter Layering' : 'Chilly Mountain Night - Heavy Fleece Required',
      details: isDaytime
        ? 'Chilly alpine climate. Thermal base layer, warm fleece jacket, windbreaker, and beanie. Nights get significantly colder.'
        : 'Alpine night temperatures drop rapidly after sunset. Heavy fleece jacket, windbreaker, thermal base layer and beanie are essential for evening and night hours.',
      level: 'cold',
      badge: isDaytime ? 'Alpine Chill 🧥' : 'Alpine Night Chill 🧥'
    };
  } else if (temp <= 16) {
    return {
      title: isDaytime ? 'Comfortable Mountain Layers' : 'Brisk Mountain Night - Warm Jacket Advised',
      details: isDaytime
        ? 'Crisp Himalayan air. A light sweater or softshell jacket is comfortable during daytime. Keep a warm fleece jacket handy for morning and evening strolls.'
        : 'Brisk evening and nighttime weather. A warm jacket, sweater or shawl is strongly recommended for outdoor dinner or evening riverside walks.',
      level: 'cool',
      badge: isDaytime ? 'Brisk & Crisp 🧣' : 'Chilly Evening & Night 🧣'
    };
  } else {
    return {
      title: isDaytime ? 'Lightweight Breathable Attire' : 'Pleasant Mountain Night',
      details: isDaytime
        ? 'Pleasant sunny climate. Breathable cotton tees and light pants. Carry sunglasses, sunscreen and a light stole.'
        : 'Pleasant evening and night air. A light cardigan or long-sleeve cotton shirt is comfortable for evening breezes.',
      level: 'mild',
      badge: isDaytime ? 'Pleasant & Sunny ☀️' : 'Cool Pleasant Night 🌙'
    };
  }
}

// In-memory cache to avoid rate limiting
const weatherCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

// Calculate distance in km between two lat/lng coordinates (Haversine formula)
export function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Find closest Uttarakhand station from coordinates
export function findNearestStation(lat, lng) {
  let closest = UTTARAKHAND_WEATHER_STATIONS[0];
  let minDistance = Infinity;

  for (const station of UTTARAKHAND_WEATHER_STATIONS) {
    const dist = getDistanceKm(lat, lng, station.lat, station.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = station;
    }
  }

  return { station: closest, distanceKm: Math.round(minDistance) };
}

// Fetch real-time weather from Open-Meteo for a specific station
export async function fetchStationWeather(station) {
  const cached = weatherCache.get(station.id);
  const now = Date.now();

  if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${station.lat}&longitude=${station.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Open-Meteo API returned status: ${response.status}`);
    }

    const json = await response.json();

    const currentTemp = Math.round(json.current?.temperature_2m ?? station.fallbackTemp);
    const apparentTemp = Math.round(json.current?.apparent_temperature ?? currentTemp);
    const weatherCode = json.current?.weather_code ?? 0;
    
    // Cross-verify Open-Meteo is_day with local IST daytime to prevent showing daytime sun at night
    const isDaytime = isCurrentlyDaytime();
    const isDay = json.current?.is_day !== undefined
      ? (Number(json.current.is_day) === 1 && isDaytime ? 1 : 0)
      : (isDaytime ? 1 : 0);

    const humidity = json.current?.relative_humidity_2m ?? 45;
    const windSpeed = Math.round(json.current?.wind_speed_10m ?? 8);
    const precipitation = json.current?.precipitation ?? 0;

    const condition = getWeatherInterpretation(weatherCode, isDay);
    const advice = getClothingAdvice(currentTemp, 2000, isDay);

    // Current local time
    const localTimeStr = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

    // Parse next 5-7 days daily forecast
    const dailyForecast = [];
    if (json.daily?.time && Array.isArray(json.daily.time)) {
      for (let i = 0; i < Math.min(json.daily.time.length, 6); i++) {
        const dateStr = json.daily.time[i];
        const dateObj = new Date(dateStr);
        const dayName = i === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const dayCode = json.daily.weather_code?.[i] ?? 0;
        const maxTemp = Math.round(json.daily.temperature_2m_max?.[i] ?? currentTemp + 4);
        const minTemp = Math.round(json.daily.temperature_2m_min?.[i] ?? currentTemp - 5);
        // Today reflects active night/day, future days reflect daytime forecast
        const dayCond = i === 0 ? getWeatherInterpretation(dayCode, isDay) : getWeatherInterpretation(dayCode, 1);

        dailyForecast.push({
          date: dateStr,
          dayName,
          maxTemp,
          minTemp,
          weatherCode: dayCode,
          condition: dayCond
        });
      }
    }

    const result = {
      stationId: station.id,
      stationName: station.name,
      region: station.region,
      district: station.district,
      altitude: station.altitude,
      lat: station.lat,
      lng: station.lng,
      currentTemp,
      apparentTemp,
      weatherCode,
      isDay,
      humidity,
      windSpeed,
      precipitation,
      condition,
      advice,
      dailyForecast,
      lastUpdated: localTimeStr,
      isLive: true
    };

    weatherCache.set(station.id, { data: result, timestamp: now });
    return result;
  } catch (error) {
    console.warn(`Failed to fetch live weather for ${station.name}, using mountain fallback:`, error);
    
    // Graceful offline fallback with daytime/nighttime awareness
    const isDaytime = isCurrentlyDaytime();
    const isDay = isDaytime ? 1 : 0;
    const condition = getWeatherInterpretation(0, isDay);
    const advice = getClothingAdvice(station.fallbackTemp, 2000, isDay);
    
    return {
      stationId: station.id,
      stationName: station.name,
      region: station.region,
      district: station.district,
      altitude: station.altitude,
      lat: station.lat,
      lng: station.lng,
      currentTemp: station.fallbackTemp,
      apparentTemp: station.fallbackTemp - 2,
      weatherCode: 0,
      isDay,
      humidity: 40,
      windSpeed: 6,
      precipitation: 0,
      condition,
      advice,
      dailyForecast: [
        { dayName: 'Today', maxTemp: station.fallbackTemp + 5, minTemp: station.fallbackTemp - 4, condition },
        { dayName: 'Tomorrow', maxTemp: station.fallbackTemp + 6, minTemp: station.fallbackTemp - 3, condition: getWeatherInterpretation(0, 1) },
        { dayName: 'Day 3', maxTemp: station.fallbackTemp + 4, minTemp: station.fallbackTemp - 5, condition: getWeatherInterpretation(0, 1) }
      ],
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      isLive: false
    };
  }
}

// Reverse geocode coordinates to get user's city and locality (free client API, no API key needed)
export async function reverseGeocodeCity(lat, lng) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || 'Live Location';
      const locality = data.locality || data.city || '';
      const state = data.principalSubdivision || '';
      const country = data.countryName || 'India';
      return {
        city,
        locality,
        state,
        country,
        fullLabel: locality && locality !== city ? `${locality}, ${city}` : (state ? `${city}, ${state}` : city)
      };
    }
  } catch (e) {
    console.warn('Reverse geocode warning, continuing with nearest station:', e);
  }
  return {
    city: 'Live Location',
    locality: '',
    state: 'Uttarakhand',
    country: 'India',
    fullLabel: 'Live GPS Location'
  };
}

// Fetch live weather by coordinates (e.g. from browser navigator.geolocation)
export async function fetchLiveCoordsWeather(lat, lng, customName = null) {
  const nearest = findNearestStation(lat, lng);
  const geoPromise = reverseGeocodeCity(lat, lng);
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

  try {
    const [geo, res] = await Promise.all([
      geoPromise,
      fetch(weatherUrl)
    ]);

    if (!res.ok) throw new Error(`Open-Meteo API returned status ${res.status}`);
    const json = await res.json();

    const currentTemp = Math.round(json.current?.temperature_2m ?? 18);
    const apparentTemp = Math.round(json.current?.apparent_temperature ?? currentTemp);
    const weatherCode = json.current?.weather_code ?? 0;
    
    // Cross-verify Open-Meteo is_day with local daytime to prevent showing daytime sun at night
    const isDaytime = isCurrentlyDaytime();
    const isDay = json.current?.is_day !== undefined
      ? (Number(json.current.is_day) === 1 && isDaytime ? 1 : 0)
      : (isDaytime ? 1 : 0);

    const humidity = json.current?.relative_humidity_2m ?? 50;
    const windSpeed = Math.round(json.current?.wind_speed_10m ?? 7);
    const precipitation = json.current?.precipitation ?? 0;

    const condition = getWeatherInterpretation(weatherCode, isDay);
    const advice = getClothingAdvice(currentTemp, 2000, isDay);

    const localTimeStr = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

    const dailyForecast = [];
    if (json.daily?.time && Array.isArray(json.daily.time)) {
      for (let i = 0; i < Math.min(json.daily.time.length, 6); i++) {
        const dateStr = json.daily.time[i];
        const dateObj = new Date(dateStr);
        const dayName = i === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const dayCode = json.daily.weather_code?.[i] ?? 0;
        const maxTemp = Math.round(json.daily.temperature_2m_max?.[i] ?? currentTemp + 4);
        const minTemp = Math.round(json.daily.temperature_2m_min?.[i] ?? currentTemp - 4);
        // Today reflects active night/day, future days reflect daytime forecast
        const dayCond = i === 0 ? getWeatherInterpretation(dayCode, isDay) : getWeatherInterpretation(dayCode, 1);

        dailyForecast.push({
          date: dateStr,
          dayName,
          maxTemp,
          minTemp,
          weatherCode: dayCode,
          condition: dayCond
        });
      }
    }

    const detectedStationName = customName || geo.city || 'Live Location';
    const regionText = nearest.distanceKm <= 120 
      ? `${nearest.station.region} • Near ${nearest.station.name} (~${nearest.distanceKm} km)` 
      : `${geo.state || 'Live GPS'} • Nearest peak: ${nearest.station.name} (~${nearest.distanceKm} km)`;

    return {
      stationId: 'live-gps',
      stationName: detectedStationName,
      fullLocationName: geo.fullLabel || detectedStationName,
      city: geo.city,
      state: geo.state,
      region: regionText,
      district: geo.city || (nearest.distanceKm <= 120 ? nearest.station.district : 'Live Location'),
      altitude: nearest.distanceKm <= 40 ? nearest.station.altitude : 'Local Altitude',
      lat: Number(lat.toFixed(4)),
      lng: Number(lng.toFixed(4)),
      currentTemp,
      apparentTemp,
      weatherCode,
      isDay,
      humidity,
      windSpeed,
      precipitation,
      condition,
      advice,
      dailyForecast,
      lastUpdated: localTimeStr,
      isLive: true,
      isLiveGps: true,
      nearestStation: nearest.station,
      distanceKm: nearest.distanceKm
    };
  } catch (err) {
    console.warn('Failed coords weather, falling back to nearest station', err);
    return fetchStationWeather(nearest.station);
  }
}

// Fetch overview of top stations
export async function fetchWeatherOverview() {
  const topStationIds = ['kedarnath', 'auli', 'chopta', 'nainital', 'almora', 'rishikesh'];
  const stationsToFetch = UTTARAKHAND_WEATHER_STATIONS.filter(s => topStationIds.includes(s.id));
  
  const results = await Promise.all(
    stationsToFetch.map(s => fetchStationWeather(s))
  );

  return results;
}
