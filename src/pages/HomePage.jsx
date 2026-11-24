import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import LiveUpcomingEvents from '../components/LiveUpcomingEvents';
import InteractiveMap from '../components/InteractiveMap';
import { handleImageError, RELIABLE_HIMALAYAN_IMAGES } from '../utils/imageFallback';
import { UTTARAKHAND_TOUR_PLANS } from '../data/tourPlansData';
import { 
  Mountain, Palette, Radio, UtensilsCrossed, Compass, 
  Camera, Star, Sparkles, ArrowRight, ShieldCheck, Phone, 
  CheckCircle, Layers, MapPin, Store, Ticket, CloudSun, LogIn,
  ShoppingBag, Heart, Calendar, Clock, CheckCircle2, Award,
  Home, FileText, Check, Shield, MessageCircle, Mail
} from 'lucide-react';

// Curated FindingShiva-inspired Exploration Circuits
const EXPLORATION_CIRCUITS = [
  {
    id: 'adi-kailash-om-parvat',
    title: 'Adi Kailash & Om Parvat Sacred Expedition',
    subtitle: 'Vyas & Darma Valley High-Altitude Inner Journey',
    category: 'High Altitude Treks',
    altitude: '4,500m (14,760 ft)',
    duration: '8 Days / 7 Nights',
    route: 'Dharchula → Gunji → Nabi Village → Adi Kailash → Om Parvat',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'May to October',
    highlights: ['Sacred Parvati Sarovar', 'Nabi Community Homestay Stay', 'Rare Om Parvat Snow View', '4x4 Mountain Rover Included'],
    startingPrice: 38500,
    badge: 'Flagship Spiritual Yatra',
    stayType: 'Village Homestay & Alpine Camp'
  },
  {
    id: 'char-dham-maha-circuit',
    title: 'Char Dham & Panch Kedar Sacred Pilgrimage',
    subtitle: 'The Ultimate Devbhoomi Moksha Circuit',
    category: 'Sacred Pilgrimage',
    altitude: '3,584m (Kedarnath Ji)',
    duration: '10 Days / 9 Nights',
    route: 'Haridwar → Yamunotri → Gangotri → Kedarnath → Badrinath',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'May to June & Sep to Nov',
    highlights: ['VIP Priority Darshan Pass', 'Certified NIM Mountain Scout', 'Pure Sattvic Meals Included', 'Oxygen Concentrators on Trail'],
    startingPrice: 32999,
    badge: 'Moksha Yatra',
    stayType: 'Deluxe Alpine Stay'
  },
  {
    id: 'valley-of-flowers-hemkund',
    title: 'Valley of Flowers & Sacred Hemkund Sahib',
    subtitle: 'UNESCO World Heritage Alpine Botanical Eden',
    category: 'High Altitude Treks',
    altitude: '4,329m (Hemkund Lake)',
    duration: '6 Days / 5 Nights',
    route: 'Rishikesh → Govindghat → Ghangaria → Valley of Flowers → Hemkund',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'July to September',
    highlights: ['500+ Wild Alpine Blooms', 'High Altitude Glacial Lake', 'Brahma Kamal Sacred Sighting', 'Eco-Pahadi Mule Assistance'],
    startingPrice: 16500,
    badge: 'UNESCO Heritage',
    stayType: 'Mountain Lodge'
  },
  {
    id: 'chopta-tungnath-chandrashila',
    title: 'Chopta, Tungnath & Chandrashila Summit',
    subtitle: 'Highest Shiva Temple in the World & Himalayan Sunrise',
    category: 'Sacred Pilgrimage',
    altitude: '4,000m (Summit)',
    duration: '4 Days / 3 Nights',
    route: 'Rishikesh → Devprayag → Sari Village → Deoriatal → Tungnath → Chandrashila',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'Year Round (Snow in Winter)',
    highlights: ['360° Himalayan Panorama', 'Tungnath 1000-Yr Temple', 'Deoriatal Emerald Reflection', 'Pine Wood Fireplace Evenings'],
    startingPrice: 9999,
    badge: 'Most Popular',
    stayType: 'Sari Village Homestay'
  },
  {
    id: 'darma-valley-remote-homestays',
    title: 'Darma Valley & Panchachuli Base Camp',
    subtitle: 'Remote Kumaon Border Trails & Bhotia Tribal Culture',
    category: 'Village Homestays',
    altitude: '4,260m (Panchachuli)',
    duration: '7 Days / 6 Nights',
    route: 'Kathgodam → Almora → Munsiyari → Darma Valley → Dantu Village',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'May to June & Sep to Oct',
    highlights: ['5 Sacred Panchachuli Peaks', 'Bhotia Handloom Weaving Meet', 'Traditional Wood Carved Homes', '100% Native Host Income'],
    startingPrice: 24500,
    badge: 'Tribal Cultural Trail',
    stayType: 'Dantu Tribal Homestay'
  },
  {
    id: 'kuari-pass-alpine-meadows',
    title: 'Kuari Pass Lord Curzon Alpine Ridge',
    subtitle: 'Grandstand Views of Nanda Devi & Dronagiri Peaks',
    category: 'High Altitude Treks',
    altitude: '3,876m (Kuari Pass)',
    duration: '5 Days / 4 Nights',
    route: 'Haridwar → Joshimath → Dhak → Tali Top → Kuari Pass → Auli',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'October to April (Snow Trek)',
    highlights: ['Front Row Nanda Devi (7,816m)', 'Dense Oak & Rhododendron Woods', 'Auli Cable Car Ride', 'High Altitude Winter Camps'],
    startingPrice: 13999,
    badge: 'Classic Snow Ridge',
    stayType: 'Alpine Dome Tents'
  }
];

// Official Accreditations and Certifications
const OFFICIAL_CERTIFICATES = [
  {
    title: 'Uttarakhand Tourism Development Board (UTDB)',
    badge: 'Government Authorized Tour Operator',
    idNumber: 'Reg: UK-UTDB-2024-9182',
    icon: '🏛️',
    description: 'Certified native operator authorized for Char Dham, Adi Kailash, and high-altitude Himalayan pilgrim corridors.',
    authority: 'Govt. of Uttarakhand'
  },
  {
    title: 'Nehru Institute of Mountaineering (NIM)',
    badge: 'Certified Alpine Guides & Rescue',
    idNumber: 'Graduation Cert: NIM/EXP/2022-77',
    icon: '🏔️',
    description: 'All expedition leads hold NIM Uttarkashi certification in high-altitude glacier navigation and crevasse rescue.',
    authority: 'Ministry of Defence & NIM'
  },
  {
    title: 'Ministry of Tourism, Govt of India',
    badge: 'Incredible India Recognized Operator',
    idNumber: 'Accreditation: MOT/ADV/IND-5542',
    icon: '🇮🇳',
    description: 'Approved sustainable adventure travel provider committed to responsible ecotourism in Devbhoomi.',
    authority: 'Govt. of India'
  },
  {
    title: 'ISO 9001:2015 Safety Certified',
    badge: 'High Altitude Safety & Protocol',
    idNumber: 'Standard: ISO-QMS-UK-9001',
    icon: '🛡️',
    description: 'Strict adherence to medical oxygen checks, hyperbaric safety protocols, and 24x7 satellite emergency dispatch.',
    authority: 'Quality International Bureau'
  },
  {
    title: 'Leave No Trace (LNT) Eco-Pahadi Steward',
    badge: 'Zero-Plastic Himalayan Pledge',
    idNumber: 'Pledge ID: LNT-HIM-2024-001',
    icon: '🌿',
    description: '100% biodegradable mountain waste management, solar homestay energy, and sacred river conservation.',
    authority: 'Himalayan Eco-Council'
  },
  {
    title: 'Devbhoomi Biometric Darshan Gateway',
    badge: 'Authorized Yatra Registration',
    idNumber: 'Gate Token: UK-BIO-PASS-2026',
    icon: '🛕',
    description: 'Official digital biometric yatra registration and priority senior citizen corridor coordination.',
    authority: 'Badrinath-Kedarnath Temple Committee'
  }
];

// Authentic Village Homestay Locations ("Where to Stay")
const COMMUNITY_HOMESTAYS = [
  {
    name: 'Nabi Heritage Bhotia Homestay',
    location: 'Vyas Valley (Adi Kailash Route), Pithoragarh',
    altitude: '3,120m',
    host: 'Sanju & Maya Kutiyal (Native Bhotia Weavers)',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    tag: 'Community Owned',
    price: '₹1,800/night (Incl. Organic Meals)'
  },
  {
    name: 'Sari Village Pine Wood Retreat',
    location: 'Base of Deoriatal & Tungnath, Rudraprayag',
    altitude: '2,000m',
    host: 'Kailash Singh Negi (Senior Trek Scout)',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    tag: 'Valley View',
    price: '₹1,500/night (Wood Fireplace)'
  },
  {
    name: 'Dantu Traditional Stone Homestay',
    location: 'Darma Valley (Panchachuli Base), Dharchula',
    altitude: '3,400m',
    host: 'Prakash Datal (Panchachuli Shepherd Guild)',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    tag: 'Glacier Facing',
    price: '₹2,200/night (Traditional Thali)'
  },
  {
    name: 'Sankri Cedar Forest Homestay',
    location: 'Har Ki Dun & Kedarkantha Trailhead, Uttarkashi',
    altitude: '1,950m',
    host: 'Rawat Family (Local Apple Orchardists)',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=600&q=80',
    tag: 'Apple Orchard',
    price: '₹1,600/night (Local Pahadi Food)'
  }
];

export default function HomePage({
  destinations = [],
  artisans = [],
  events = [],
  foodShops = [],
  photos = [],
  reviews = [],
  sites = [],
  onOpenBookingModal,
  onOpenWeatherModal
}) {
  const navigate = useNavigate();
  const [selectedCircuitCategory, setSelectedCircuitCategory] = useState('All');

  const filteredCircuits = selectedCircuitCategory === 'All'
    ? EXPLORATION_CIRCUITS
    : EXPLORATION_CIRCUITS.filter(c => c.category === selectedCircuitCategory);

  return (
    <div className="bg-slate-50 dark:bg-[#070B18] text-slate-900 dark:text-slate-100 w-full overflow-x-hidden transition-colors duration-300">
      
      {/* 1. Hero Gateway Banner */}
      <Hero
        onOpenPersonalSuggester={() => navigate('/personal-suggester')}
        onOpenWeatherModal={onOpenWeatherModal}
        onExploreDestinations={() => navigate('/destinations')}
        onExploreArtisans={() => navigate('/artisans')}
        onOpenEvents={() => navigate('/events')}
      />

      {/* 2. Platform Trust & Mission Bar - Sleek, Compact & Responsive in Both Modes */}
      <section className="py-2.5 sm:py-3 bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-[#0A1428] dark:via-[#0E1D3B] dark:to-[#0A1428] text-slate-900 dark:text-white border-y border-amber-200 dark:border-amber-500/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-3 text-center md:text-left">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-amber-400/80 bg-[#0E1627] shadow-md flex-shrink-0 p-0.5">
                <img
                  src="/swargbraman-logo.jpg"
                  alt="SwargBhraman Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-slate-950 dark:text-white font-serif uppercase tracking-wider">
                  SwargBhraman • Conscious Himalayan Exploration &amp; Sacred Yatras
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 line-clamp-1 sm:line-clamp-none">
                  Zero-middlemen travel initiative connecting conscious travelers directly to native guides, sacred peaks, and authentic mountain homestays.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to="/tour-plans"
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition shadow-md whitespace-nowrap"
              >
                Explore All Circuits
              </Link>
              <Link
                to="/support"
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold border border-slate-300 dark:border-white/15 transition flex items-center gap-1 whitespace-nowrap"
              >
                <span>Help Desk 🎧</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sacred Himalayan Exploration Circuits */}
      <section className="py-16 bg-white dark:bg-[#070B18] text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Devbhoomi Expeditions • Exploration Circuits</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
                Handpicked Himalayan Explorations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                From the remote spiritual heights of Adi Kailash and Om Parvat to the sacred Jyotirlingas of Kedarnath and hidden Bhotia valleys. Led exclusively by certified native mountaineers.
              </p>
            </div>

            {/* Category Filter Pills (Wrapped cleanly without overflow) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs max-w-full">
              {['All', 'High Altitude Treks', 'Sacred Pilgrimage', 'Village Homestays'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCircuitCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCircuitCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#131F3B] dark:hover:bg-[#1A2A4E] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-amber-500/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Exploration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCircuits.map(circuit => (
              <div
                key={circuit.id}
                className="group rounded-3xl bg-slate-50 dark:bg-[#0D1527] border border-slate-200 dark:border-amber-500/20 overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Banner */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={circuit.image}
                    alt={circuit.title}
                    onError={(e) => handleImageError(e, circuit.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                    {circuit.badge}
                  </div>

                  {/* Altitude Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold flex items-center gap-1">
                    <Mountain className="w-3 h-3 text-emerald-400" />
                    <span>{circuit.altitude}</span>
                  </div>

                  {/* Duration on bottom */}
                  <div className="absolute bottom-3 left-3 text-white text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{circuit.duration}</span>
                    <span>•</span>
                    <span className="text-amber-300">{circuit.bestSeason}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-serif text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition">
                      {circuit.title}
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                      {circuit.subtitle}
                    </p>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 bg-slate-100 dark:bg-white/[0.03] p-2.5 rounded-xl border border-slate-200 dark:border-white/5 font-mono">
                      📍 {circuit.route}
                    </div>

                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {circuit.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Booking Trigger */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">All-Inclusive</div>
                      <div className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                        ₹{circuit.startingPrice.toLocaleString()}
                        <span className="text-[10px] text-slate-400 font-normal"> / person</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBookingModal?.({
                        title: circuit.title,
                        pricePerPerson: circuit.startingPrice,
                        startingPrice: circuit.startingPrice,
                        duration: circuit.duration,
                        region: circuit.subtitle,
                        location: circuit.route
                      })}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1.5"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Book Pass</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/tour-plans"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg hover:shadow-xl hover:scale-102 transform duration-200 cursor-pointer"
            >
              <span>View All 15 Curated Day-by-Day Himalayan Itineraries</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Live Sacred Ceremonies, Ganga Aarti Streams & Cultural Fairs */}
      <LiveUpcomingEvents
        events={events}
        onLocateOnMap={() => {
          const el = document.getElementById('interactive-map');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else navigate('/map');
        }}
        onBookEventPass={(evt) => onOpenBookingModal?.(evt)}
      />

      {/* 5. Interactive SwargBhraman 13 Districts & Highway Navigation Traffic Map */}
      <InteractiveMap
        destinations={destinations}
        artisans={artisans}
        foodShops={foodShops}
        events={events}
        sites={sites || []}
        onSelectDestination={(d) => onOpenBookingModal?.(d)}
      />

      {/* 4. Our Milestones & Trail Record */}
      <section className="py-16 bg-gradient-to-b from-slate-100 to-white dark:from-[#0B1326] dark:to-[#070B18] text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Proven Himalayan Track Record • Milestones</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
              Pioneering Responsible Tourism Across Devbhoomi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Numbers that reflect our dedication to sacred heritage, pilgrim safety, and mountain village empowerment.
            </p>
          </div>

          {/* Achievement Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1629] border border-slate-200 dark:border-amber-500/20 shadow-xl text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-600 dark:text-amber-400">
                15,000+
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                Pilgrims & Trekkers Guided
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Across sacred Char Dham, Panch Kedar, Adi Kailash, and high altitude glaciated passes.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1629] border border-slate-200 dark:border-emerald-500/20 shadow-xl text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                100%
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                Zero-Incident Safety Record
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Strict medical clearance, oxygen pulse monitoring, and certified NIM expedition leaders.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1629] border border-slate-200 dark:border-sky-500/20 shadow-xl text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-black font-mono text-sky-600 dark:text-sky-400">
                13 Districts
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                Direct Homestay Network
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Empowering native Pahadi families in remote valleys like Nabi, Sari, Dantu, and Sankri.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1629] border border-slate-200 dark:border-orange-500/20 shadow-xl text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-black font-mono text-orange-600 dark:text-orange-400">
                ₹2.4+ Cr
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                Direct Native Revenue
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                100% commission-free income transferred to Aipan folk artists, copper masters, and guides.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Official Accreditations & Govt Certifications */}
      <section className="py-16 bg-white dark:bg-[#070B18] text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Government Recognized &amp; Verified • Accreditations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
              Official Certificates & Accreditations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              SwargBhraman operates with full statutory compliance, mountaineering accreditation, and safety certifications.
            </p>
          </div>

          {/* Certificate Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICIAL_CERTIFICATES.map((cert, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0E1627] border border-slate-200 dark:border-white/10 hover:border-amber-500/50 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{cert.icon}</span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                      Verified
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif leading-snug">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {cert.badge}
                  </div>

                  <div className="mt-2 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-white/[0.04] px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/5">
                    {cert.idNumber}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Accreditation Body:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{cert.authority}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Authentic Himalayan Village Homestays */}
      <section className="py-16 bg-slate-100 dark:bg-[#0A101F] text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
                <Home className="w-3.5 h-3.5" />
                <span>Community Lodging • Authentic Homestays</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
                Authentic Mountain Village Homestays
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Experience authentic Pahadi hospitality. 100% of your stay fees go directly to host families preserving traditional architecture and organic farming.
              </p>
            </div>

            <Link
              to="/districts-haat"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md self-start sm:self-auto whitespace-nowrap"
            >
              Explore 13 Districts Homestays →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMUNITY_HOMESTAYS.map((stay, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-white dark:bg-[#0E1627] border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-xl hover:border-amber-400 transition"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    onError={(e) => handleImageError(e, stay.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-amber-300 text-[10px] font-black uppercase border border-amber-400/40">
                    {stay.tag}
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                    {stay.altitude}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-serif leading-snug">
                    {stay.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500 flex-shrink-0" />
                    <span className="truncate">{stay.location}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300">
                    Host: <span className="font-semibold">{stay.host}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono">
                      {stay.price}
                    </span>
                    <button
                      onClick={() => onOpenBookingModal?.({
                        title: stay.name,
                        startingPrice: 1800,
                        pricePerPerson: 1800,
                        duration: 'Nightly Stay',
                        region: stay.location,
                        location: stay.location
                      })}
                      className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold"
                    >
                      Book Stay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Real High-Res Himalayan Photo Wall */}
      <section className="py-16 bg-white dark:bg-[#070B18] text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5" />
                <span>Visual Moments • Photos & Memories</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
                Himalayan Trail Captures
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Real captures by our explorers, pilgrims, and native mountain leaders along sacred ridges and alpine valleys.
              </p>
            </div>

            <Link
              to="/gallery"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-xs transition border border-slate-200 dark:border-white/10 self-start sm:self-auto"
            >
              Open Full Photo Gallery ({photos.length || 24}) →
            </Link>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {(photos && photos.length > 0 ? photos.slice(0, 8) : [
              { title: 'Kedarnath Dawn Aarti', location: 'Kedarnath Temple (3,584m)', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80' },
              { title: 'Adi Kailash Reflection', location: 'Parvati Sarovar, Vyas Valley', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
              { title: 'Tungnath in Winter Snow', location: 'Chopta Ridge, Rudraprayag', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' },
              { title: 'Valley of Flowers Bloom', location: 'Bhyundar Valley, Chamoli', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
              { title: 'Panchachuli Five Peaks', location: 'Darma Valley, Dharchula', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
              { title: 'Nanda Devi Gold Glow', location: 'Kuari Pass Ridge, Joshimath', url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80' },
              { title: 'Ganga Aarti Evening Fire', location: 'Har Ki Pauri, Haridwar', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' },
              { title: 'Aipan Folk Art Tradition', location: 'Almora Heritage Workshop', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80' }
            ]).map((photo, i) => (
              <div
                key={i}
                className="group relative h-48 sm:h-64 rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-white/10"
              >
                <img
                  src={photo.url || photo.image}
                  alt={photo.title}
                  onError={(e) => handleImageError(e, photo.title)}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h5 className="font-bold text-xs sm:text-sm font-serif line-clamp-1">{photo.title}</h5>
                  <p className="text-[10px] text-amber-300 font-mono mt-0.5 line-clamp-1">📍 {photo.location}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7b. Provider Portal Homepage Section (Devbhoomi Partner Network) */}
      <section id="provider-portal" className="py-16 bg-gradient-to-b from-slate-900 via-[#061512] to-slate-950 text-white border-t border-b border-emerald-500/30 w-full relative overflow-hidden">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Devbhoomi Partner Network • 0% Platform Commission</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
                Provider Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Empowering native Himalayan guides, master artisans, and local shopkeepers with direct bookings, zero commission fees, and 100% verified payouts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
              <Link
                to="/provider/login"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span>Open Provider Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3 Provider Categories Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            {/* 1. Mountain Guides */}
            <div className="p-6 rounded-3xl bg-[#0B1E19]/90 border border-emerald-500/30 shadow-xl flex flex-col justify-between hover:border-emerald-400/60 transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-inner">
                  <Mountain className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    High-Altitude Leaders
                  </span>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Mountain Guides &amp; Scouts
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lead certified alpine treks, manage daily guiding rates, issue digital QR trail permits, and coordinate rescue alerts.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-white/10 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>NIM / IMF Leader Certifications</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Direct traveler trek bookings</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>100% direct UPI settlement</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/provider/login?role=guide"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white border border-emerald-500/40 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Login as Mountain Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. Native Artisans */}
            <div className="p-6 rounded-3xl bg-[#1A1810]/90 border border-amber-500/30 shadow-xl flex flex-col justify-between hover:border-amber-400/60 transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-inner">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Sacred Crafts &amp; GI Guilds
                  </span>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Native Pahadi Artisans
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Showcase traditional Aipan folk art, Almora Tamta copperware, and Bhotia sheep woolens with zero commission.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-white/10 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>GI-tagged craft authenticity tag</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Direct workshop booking slots</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>India Post Eco-Dak logistics support</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/provider/login?role=artisan"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Login as Native Artisan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. Local Mountain Shops */}
            <div className="p-6 rounded-3xl bg-[#091819]/90 border border-teal-500/30 shadow-xl flex flex-col justify-between hover:border-teal-400/60 transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shadow-inner">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                    Organic Mountain Haats
                  </span>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Local Shops &amp; Haat Owners
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  List pure forest honey, Badri cow A2 ghee, organic pulses, and temple puja samagri directly to pilgrims and tourists.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-white/10 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    <span>Native produce certified tags</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    <span>Real-time inventory and courier tracking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    <span>Direct pilgrim pre-orders</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/provider/login?role=shop"
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-white border border-teal-500/40 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Login as Local Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom Banner with Quick Registration CTA */}
          <div className="p-6 rounded-3xl bg-black/40 border border-emerald-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">
                  Not registered yet as a Devbhoomi provider?
                </h4>
                <p className="text-xs text-slate-400">
                  Registration takes less than 2 minutes. Get verified and start accepting bookings today.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/provider/login?tab=signup"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs transition text-center shadow-md cursor-pointer whitespace-nowrap"
              >
                Register as Provider
              </Link>
              <Link
                to="/provider/login"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition text-center shadow-md cursor-pointer whitespace-nowrap"
              >
                Provider Login
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Help Support / Help Desk Direct Callout Banner */}
      <section className="py-12 bg-gradient-to-r from-amber-600/10 via-orange-600/10 to-amber-500/15 dark:from-[#0B1528] dark:via-[#0E1F3D] dark:to-[#122A54] border-t border-slate-200 dark:border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A1122] border-2 border-slate-300 dark:border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>Help Support / Help Desk 24x7</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white">
                Need Help Planning Your Devbhoomi Expedition?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                Chat live with Master Admin Priyanshu Singh Mahar, connect on WhatsApp (+91 9528731865), or email priyanshu.meher88@gmail.com.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
              <a
                href="https://wa.me/919528731865?text=Namaste%20Priyanshu!%20I%20need%20assistance%20regarding%20Devbhoomi%20travel%20on%20SwargBhraman."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+91 9528731865)</span>
              </a>

              <a
                href="mailto:priyanshu.meher88@gmail.com?subject=SwargBhraman%20Traveler%20Support%20Inquiry"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email (priyanshu.meher88@gmail.com)</span>
              </a>

              <Link
                to="/support"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Open Live Chat Desk</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
