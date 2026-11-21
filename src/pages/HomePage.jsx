import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import LoginSection from '../components/LoginSection';
import { handleImageError } from '../utils/imageFallback';
import { 
  Mountain, Palette, Radio, UtensilsCrossed, Compass, 
  Camera, Star, Sparkles, ArrowRight, ShieldCheck, Phone, CheckCircle 
} from 'lucide-react';

export default function HomePage({
  destinations,
  artisans,
  events,
  foodShops,
  photos,
  reviews,
  onOpenBookingModal,
  onOpenWeatherModal
}) {
  const navigate = useNavigate();

  return (
    <div className="space-y-0 bg-[#090E1A] text-slate-100">
      
      {/* 1. Hero Banner */}
      <Hero
        onOpenAIPlanner={() => navigate('/ai-planner')}
        onOpenPersonalSuggester={() => navigate('/personal-suggester')}
        onOpenWeatherModal={onOpenWeatherModal}
        onExploreDestinations={() => navigate('/destinations')}
        onExploreArtisans={() => navigate('/artisans')}
        onOpenEvents={() => navigate('/events')}
      />

      {/* 2. Quick Feature Gateway Strip */}
      <section className="py-12 bg-[#0C1424] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            
            <Link
              to="/destinations"
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🏔️</div>
                <div className="font-bold text-white text-sm font-serif">Locations</div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Kedarnath, Chopta & Auli</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              to="/guides"
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🧭</div>
                <div className="font-bold text-white text-sm font-serif">Guides</div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">NIM certified trek leaders</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-sky-400 font-bold">
                <span>View Scouts</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              to="/districts-haat"
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🛍️</div>
                <div className="font-bold text-white text-sm font-serif">13 Districts Haat</div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Buy direct specialties</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                <span>Shop Haat</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              to="/events"
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🪔</div>
                <div className="font-bold text-white text-sm font-serif">Ganga Aarti</div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Daily live streams & bells</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                <span>Live Stream</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              to="/my-trips"
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🎟️</div>
                <div className="font-bold text-white text-sm font-serif">My Trips</div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">QR digital passes & host</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                <span>View Passes</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              to="/map"
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-blue-400/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🚦</div>
                <div className="font-bold text-white text-sm font-serif">Live Map</div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Highway traffic & GPS</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-blue-400 font-bold">
                <span>GPS Routes</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <Link
              to="/weather"
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/40 transition group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition">⛅</div>
                <div className="font-bold text-white text-sm font-serif">Live Weather</div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Open-Meteo temps & snow</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-sky-400 font-bold">
                <span>Check Temps</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>

            <a
              href="#login-section"
              className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 hover:border-amber-400/50 transition group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition">🔐</div>
                <div className="font-bold text-amber-300 text-sm font-serif">Sign In / Portals</div>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">Traveler, artisan & admin</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                <span>Access Portals</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* 3. Featured Destinations Preview */}
      <section className="py-16 bg-[#090E1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Handpicked Himalayan Spots
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Featured Mountain Destinations
              </h2>
            </div>
            <Link
              to="/destinations"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View All 12 Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.slice(0, 3).map(dest => (
              <div
                key={dest.id}
                className="bg-[#101728] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101728] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-bold">
                    {dest.region}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-serif">{dest.name}</h3>
                    <p className="text-xs text-slate-300 mt-0.5">{dest.altitude}</p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-semibold">Tours From</span>
                      <span className="text-lg font-extrabold text-amber-400 font-serif">₹{dest.startingPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => onOpenBookingModal(dest)}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-xl text-xs font-extrabold shadow"
                    >
                      Book Trip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3b. Sacred Temples & Historical Marvels Spotlight */}
      <section className="py-16 bg-[#0D1526] text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Sacred Antiquity • Land of the Gods
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Famous Temples & Historical Marvels
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                From Kedarnath’s 8th-century granite Jyotirlinga to the 124 stone shrines of Jageshwar and George Everest’s 1832 observatory.
              </p>
            </div>
            <Link
              to="/temples-history"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Explore All 14 Sites</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/temples-history"
              className="p-5 rounded-3xl bg-[#121B2F] border border-white/10 hover:border-amber-400/40 transition group shadow-xl"
            >
              <div className="h-44 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80"
                  alt="Kedarnath Dham"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 text-amber-300 text-[10px] font-bold">
                  8th Century Jyotirlinga
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                  3,584m Altitude
                </span>
              </div>
              <h4 className="font-bold text-white text-lg font-serif">Kedarnath Dham</h4>
              <p className="text-xs text-slate-400 mt-1">Interlocking granite masonry, highest of the 12 Jyotirlingas.</p>
              <span className="text-xs font-bold text-amber-400 mt-3 inline-block">Read Legend & Timings →</span>
            </Link>

            <Link
              to="/temples-history"
              className="p-5 rounded-3xl bg-[#121B2F] border border-white/10 hover:border-amber-400/40 transition group shadow-xl"
            >
              <div className="h-44 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
                  alt="Jageshwar Dham"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 text-amber-300 text-[10px] font-bold">
                  124 Deodar Stone Shrines
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                  Almora, Kumaon
                </span>
              </div>
              <h4 className="font-bold text-white text-lg font-serif">Jageshwar Dham Complex</h4>
              <p className="text-xs text-slate-400 mt-1">7th-12th century Katyuri cluster hidden in ancient deodar pines.</p>
              <span className="text-xs font-bold text-amber-400 mt-3 inline-block">Read Legend & Timings →</span>
            </Link>

            <Link
              to="/temples-history"
              className="p-5 rounded-3xl bg-[#121B2F] border border-white/10 hover:border-amber-400/40 transition group shadow-xl"
            >
              <div className="h-44 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                  alt="Tungnath Temple"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 text-amber-300 text-[10px] font-bold">
                  World's Highest Shiva Shrine
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                  3,680m Altitude
                </span>
              </div>
              <h4 className="font-bold text-white text-lg font-serif">Tungnath Temple (Chopta)</h4>
              <p className="text-xs text-slate-400 mt-1">Highest Shiva temple on earth with views of 30+ Himalayan peaks.</p>
              <span className="text-xs font-bold text-amber-400 mt-3 inline-block">Read Legend & Timings →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3c. 13 Districts Famous Things & Direct Purchase Haat Spotlight */}
      <section className="py-16 bg-[#090E1A] text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Zero Middlemen • 100% Direct Payout to Rural Cooperatives
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Famous Things of All 13 Districts
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Almora Bal Mithai, Munsiyari Snow Rajma, Dehradun Basmati, and Badrinath Ringal. Order genuine GI-tagged specialties directly through us.
              </p>
            </div>
            <Link
              to="/districts-haat"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Explore 13 Districts Haat</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <Link
              to="/districts-haat"
              className="p-4 rounded-2xl bg-[#121B2F] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="text-xl mb-1.5 block">🍬</span>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Almora District</span>
                <h4 className="font-bold text-white text-sm font-serif">Original Bal Mithai</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Slow-roasted chocolate fudge with sugar beads</p>
              </div>
              <span className="text-amber-400 font-bold mt-3 block">From ₹340 • Buy Now →</span>
            </Link>

            <Link
              to="/districts-haat"
              className="p-4 rounded-2xl bg-[#121B2F] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="text-xl mb-1.5 block">🌾</span>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Pithoragarh District</span>
                <h4 className="font-bold text-white text-sm font-serif">Munsiyari Snow Rajma</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">GI-tagged tender melting white kidney beans</p>
              </div>
              <span className="text-amber-400 font-bold mt-3 block">From ₹290 • Buy Now →</span>
            </Link>

            <Link
              to="/districts-haat"
              className="p-4 rounded-2xl bg-[#121B2F] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="text-xl mb-1.5 block">🍚</span>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Dehradun District</span>
                <h4 className="font-bold text-white text-sm font-serif">GI Dehradun Basmati</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Type-3 aged aromatic extra-long grain</p>
              </div>
              <span className="text-amber-400 font-bold mt-3 block">From ₹380 • Buy Now →</span>
            </Link>

            <Link
              to="/districts-haat"
              className="p-4 rounded-2xl bg-[#121B2F] border border-white/10 hover:border-amber-400/40 transition group flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="text-xl mb-1.5 block">🪔</span>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Almora & Bageshwar</span>
                <h4 className="font-bold text-white text-sm font-serif">Pure Copper Carafe</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Tamta Mohalla hand-hammered jug</p>
              </div>
              <span className="text-amber-400 font-bold mt-3 block">From ₹1,480 • Buy Now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4a. Personal Suggester Highlight Banner */}
      <section className="py-14 bg-gradient-to-r from-[#0C1528] via-[#101E3C] to-[#0A1020] border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 uppercase">
                🎯 Personal Mountain Matcher
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Not Sure Where To Go? Let Our Personal Suggester Find Your Vibe
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Take our quick 1-minute Mountain Soul Quiz. Whether you want high-altitude summit treks in Chopta, quiet deodar meditation in Jageshwar, cozy fireplaces in Auli, or family lakeside retreats in Nainital — get instant personalized recommendations with verified local homestays and NIM guides.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-start lg:justify-end gap-3">
              <Link
                to="/personal-suggester"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-extrabold text-sm rounded-2xl shadow-2xl flex items-center justify-center gap-2 transition"
              >
                <span>Take Personal Vibe Quiz 🎯</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4b. AI Budget Planner Highlight Card */}
      <section className="py-14 bg-gradient-to-r from-[#0C1528] via-[#101A31] to-[#080D1A] border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 uppercase">
                ✦ Smart Mountain Concierge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Plan a Custom Uttarakhand Trip Around Your Exact Budget
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Enter any amount from ₹5,000 to ₹1,50,000+. Our AI dynamically generates customized day-by-day itineraries, exact per-diem financial breakdowns (stays, transit, food, artisan workshops), and verified village homestays.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/ai-planner"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm rounded-2xl shadow-2xl flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch AI Trip Planner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Master Artisans Preview */}
      <section className="py-16 bg-[#090E1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Zero Middlemen • 100% Direct Payouts
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Meet Uttarakhand's Master Craftsmen
              </h2>
            </div>
            <Link
              to="/artisans"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>View All Artisans & Studios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artisans.slice(0, 3).map(art => (
              <div
                key={art.id}
                className="bg-[#101728] rounded-3xl p-6 border border-white/10 hover:border-amber-400/40 transition duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <img src={art.avatar} alt={art.name} onError={handleImageError} className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/30" />
                    <div>
                      <h4 className="font-bold text-white text-base font-serif">{art.name}</h4>
                      <p className="text-xs text-amber-300">{art.craftType}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{art.locationName}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {art.story}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={`https://wa.me/${art.whatsapp}?text=Namaste!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs"
                  >
                    WhatsApp Studio
                  </a>
                  <Link
                    to="/artisans"
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    View Workshops →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Account Login & Role Portal Section */}
      <LoginSection />

    </div>
  );
}
