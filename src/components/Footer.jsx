import React from 'react';
import { Link } from 'react-router-dom';
import PahadiVibeLogo from './PahadiVibeLogo';
import { Mountain, Phone, ShieldCheck, Heart, Sparkles, MapPin, Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070B14] text-slate-300 pt-16 pb-12 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block hover:opacity-95 transition">
              <PahadiVibeLogo size="lg" />
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An indigenous cultural initiative connecting conscious travelers directly with sacred Himalayan peaks, historic Aipan folk artists, Bhotia sheep-wool weavers, and organic village homestays across Garhwal and Kumaon.
            </p>

            <div className="p-3 bg-white/[0.04] rounded-2xl border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>100% Zero-Commission Direct Support for Mountain Artisans & Guides</span>
            </div>
          </div>

          {/* Quick Page Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Explore Devbhoomi
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/destinations" className="hover:text-amber-400 transition">Famous Locations</Link></li>
              <li><Link to="/districts-haat" className="hover:text-amber-400 transition text-amber-300 font-bold">🛍️ 13 Districts Haat (Buy Specialties)</Link></li>
              <li><Link to="/temples-history" className="hover:text-amber-400 transition text-amber-300 font-semibold">🛕 Temples & History</Link></li>
              <li><Link to="/guides" className="hover:text-amber-400 transition">Certified Mountain Guides</Link></li>
              <li><Link to="/artisans" className="hover:text-amber-400 transition">Master Craftsmen & Aipan</Link></li>
              <li><Link to="/events" className="hover:text-amber-400 transition">Live Ganga Aarti & Fairs</Link></li>
              <li><Link to="/food-shops" className="hover:text-amber-400 transition">Bal Mithai & Sweets</Link></li>
              <li><Link to="/map" className="hover:text-amber-400 transition">GPS Traffic Map</Link></li>
              <li><Link to="/weather" className="hover:text-amber-400 transition text-sky-300 font-semibold">⛅ Live Weather & Temperature</Link></li>
              <li><Link to="/gallery" className="hover:text-amber-400 transition">Mountain Photo Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-amber-400 transition">Traveler Reviews</Link></li>
            </ul>
          </div>

          {/* Portals Access */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Portals & AI Tool
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/my-trips" className="hover:text-amber-400 transition font-bold text-amber-300">
                  🎟️ My Booked Trips & Passes
                </Link>
              </li>
              <li>
                <Link to="/ai-planner" className="hover:text-amber-400 transition">
                  ✨ AI Budget Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/personal-suggester" className="hover:text-amber-400 transition text-amber-300 font-bold">
                  🎯 Personal Mountain Suggester
                </Link>
              </li>
              <li>
                <Link to="/portal/user" className="hover:text-amber-400 transition">
                  Traveler Portal Hub
                </Link>
              </li>
              <li>
                <Link to="/portal/vendor" className="hover:text-amber-400 transition">
                  Artisan & Vendor Hub
                </Link>
              </li>
              <li>
                <Link to="/portal/admin" className="hover:text-amber-400 transition">
                  State Trust Admin Console
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-400 transition">
                  Sign In / Switch Role
                </Link>
              </li>
              <li>
                <Link to="/ai-planner" className="text-amber-400 hover:underline font-bold transition flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Budget Trip Planner</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Tourism Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>Uttarakhand 24x7 Helplines</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Disaster Control:</span>
                <span className="font-mono text-white font-bold">1070 / 1077</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Police & Rescue:</span>
                <span className="font-mono text-white font-bold">112</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Tourism Helpline:</span>
                <span className="font-mono text-amber-300 font-bold">1364</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Forest Fire Hotline:</span>
                <span className="font-mono text-rose-300 font-bold">1926</span>
              </li>
              <li className="flex justify-between">
                <span>Medical Emergency:</span>
                <span className="font-mono text-white font-bold">108</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PahadiVibe Uttarakhand. Created with pride for mountain heritage & community empowerment.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">Eco-Pahadi Pledge</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">Artisan Code of Ethics</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">Leave No Trace</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
