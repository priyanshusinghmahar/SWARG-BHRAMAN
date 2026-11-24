import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ArtisansSection from '../components/ArtisansSection';
import { Store, ArrowRight, Sparkles } from 'lucide-react';

export default function ArtisansPage({ artisans, onBookWorkshop }) {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-12">
      <ArtisansSection
        artisans={artisans}
        onBookWorkshop={onBookWorkshop}
        onLocateOnMap={() => navigate('/map')}
        onOpenArtisanChat={(art) => {
          window.open(`https://wa.me/${art.whatsapp}?text=Namaste!%20I%20am%20interested%20in%20your%20craft.`, '_blank');
        }}
      />

      {/* Traveler Conscious Heritage Impact Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-[#0B1724] rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Heritage Support for Travelers
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              100% Direct-to-Artisan Purchases & Guaranteed Pahadi Purity
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Every handmade souvenir purchased or studio workshop booked through SwargBhraman supports 4th-generation Himalayan artisan families directly with zero commission deductions.
            </p>
          </div>
          <Link
            to="/districts-haat"
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-xl transition flex items-center gap-2 whitespace-nowrap flex-shrink-0"
          >
            <span>Explore 13 Districts Haat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
