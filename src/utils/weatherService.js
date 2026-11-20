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

// WMO Weather Codes mapping to human conditions, icons and clothing advice
export function getWeatherInterpretation(code, isDay = 1) {
  switch (code) {
    case 0:
      return {
        label: 'Clear Sky',
        icon: isDay ? '☀️' : '🌙',
        badge: 'Sunny & Clear',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30'
      };
    case 1:
      return {
        label: 'Mainly Clear',
        icon: isDay ? '🌤️' : '✨',
        badge: 'Mostly Sunny',
        color: 'text-amber-300',
        bg: 'bg-amber-500/10 border-amber-500/25'
      };
    case 2:
      return {
        label: 'Partly Cloudy',
        icon: '⛅',
        badge: 'Passing Clouds',
        color: 'text-sky-300',
        bg: 'bg-sky-500/10 border-sky-500/25'
      };
    case 3:
      return {
        label: 'Overcast',
        icon: '☁️',
        badge: 'Heavy Cloud Cover',
        color: 'text-slate-300',
        bg: 'bg-slate-500/10 border-slate-500/25'
      };
    case 45:
    case 48:
      return {
        label: 'Himalayan Fog / Mist',
        icon: '🌫️',
        badge: 'Reduced Visibility',
        color: 'text-slate-400',
        bg: 'bg-slate-600/15 border-slate-400/30'
      };
    case 51:
    case 53:
    case 55:
      return {
        label: 'Light Mountain Drizzle',
        icon: '🌦️',
        badge: 'Light Showers',
        color: 'text-cyan-300',
        bg: 'bg-cyan-500/10 border-cyan-500/25'
      };
    case 61:
    case 63:
    case 65:
      return {
        label: 'Alpine Rain',
        icon: '🌧️',
        badge: 'Rainfall Alert',
        color: 'text-blue-400',
        bg: 'bg-blue-500/15 border-blue-500/30'
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        label: 'Powder Snowfall',
        icon: '❄️',
        badge: 'Fresh Snow Alert',
        color: 'text-sky-200',
        bg: 'bg-sky-400/20 border-sky-300/40'
      };
    case 80:
    case 81:
    case 82:
      return {
        label: 'Heavy Rain Showers',
        icon: '⛈️',
        badge: 'Carry Rain Poncho',
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/20 border-indigo-400/40'
      };
    case 85:
    case 86:
      return {
        label: 'Snow Blizzard / Showers',
        icon: '🌨️',
        badge: 'Heavy Snowpack',
        color: 'text-sky-300',
        bg: 'bg-sky-500/25 border-sky-400/40'
      };
    case 95:
    case 96:
    case 99:
      return {
        label: 'Mountain Thunderstorm',
        icon: '⚡',
        badge: 'Stay Indoors',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20 border-yellow-500/40'
      };
    default:
      return {
        label: 'Mild Mountain Climate',
        icon: '🏔️',
        badge: 'Stable Weather',
        color: 'text-amber-300',
        bg: 'bg-amber-500/10 border-amber-500/20'
      };
  }
}

// Clothing & Gear Recommendation based on temperature & altitude
export function getClothingAdvice(temp, altitudeMeters = 2000) {
  if (temp <= 0) {
    return {
      title: 'Heavy Thermal Arctic Layering Required',
      details: 'Sub-zero temperatures. Wear 3-layer system: thermal inners (merino wool), fleece mid-layer, and windproof down feather jacket. Carry woolen cap (balaclava), waterproof trekking gloves, and warm woolen socks.',
      level: 'severe-cold',
      badge: 'Sub-Zero Freeze ❄️'
    };
  } else if (temp <= 8) {
    return {
      title: 'Warm Winter Layering',
      details: 'Chilly alpine climate. Thermal base layer, warm fleece jacket, windbreaker, and beanie. Nights get significantly colder.',
      level: 'cold',
      badge: 'Alpine Chill 🧥'
    };
  } else if (temp <= 16) {
    return {
      title: 'Comfortable Mountain Layers',
      details: 'Crisp Himalayan air. A light sweater or softshell jacket is comfortable during daytime. Keep a warm fleece jacket handy for morning and evening strolls.',
      level: 'cool',
      badge: 'Brisk & Crisp 🧣'
    };
  } else {
    return {
      title: 'Lightweight Breathable Attire',
      details: 'Pleasant sunny climate. Breathable cotton tees and light pants. Carry a light jacket or stole for breezy evenings by the river.',
      level: 'mild',
      badge: 'Pleasant & Sunny ☀️'
    };
  }
}

// In-memory cache to avoid rate limiting
const weatherCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

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
    const isDay = json.current?.is_day ?? 1;
    const humidity = json.current?.relative_humidity_2m ?? 45;
    const windSpeed = Math.round(json.current?.wind_speed_10m ?? 8);
    const precipitation = json.current?.precipitation ?? 0;

    const condition = getWeatherInterpretation(weatherCode, isDay);
    const advice = getClothingAdvice(currentTemp);

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
        const dayCond = getWeatherInterpretation(dayCode, 1);

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
      humidity,
      windSpeed,
      precipitation,
      condition,
      advice,
      dailyForecast,
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isLive: true
    };

    weatherCache.set(station.id, { data: result, timestamp: now });
    return result;
  } catch (error) {
    console.warn(`Failed to fetch live weather for ${station.name}, using mountain fallback:`, error);
    
    // Graceful offline fallback
    const condition = getWeatherInterpretation(0, 1);
    const advice = getClothingAdvice(station.fallbackTemp);
    
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
      humidity: 40,
      windSpeed: 6,
      precipitation: 0,
      condition,
      advice,
      dailyForecast: [
        { dayName: 'Today', maxTemp: station.fallbackTemp + 5, minTemp: station.fallbackTemp - 4, condition },
        { dayName: 'Tomorrow', maxTemp: station.fallbackTemp + 6, minTemp: station.fallbackTemp - 3, condition },
        { dayName: 'Day 3', maxTemp: station.fallbackTemp + 4, minTemp: station.fallbackTemp - 5, condition }
      ],
      lastUpdated: 'Live Fallback',
      isLive: false
    };
  }
}

// Fetch overview of top stations for tickers and header strips
export async function fetchWeatherOverview() {
  const topStationIds = ['kedarnath', 'auli', 'chopta', 'nainital', 'almora', 'rishikesh'];
  const stationsToFetch = UTTARAKHAND_WEATHER_STATIONS.filter(s => topStationIds.includes(s.id));
  
  const results = await Promise.all(
    stationsToFetch.map(s => fetchStationWeather(s))
  );

  return results;
}
