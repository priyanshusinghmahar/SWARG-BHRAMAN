import React, { useState } from 'react';
import { Camera, Heart, MapPin, Maximize2, X, Sparkles, Compass } from 'lucide-react';

export default function GallerySection({ photos, onPlanTripToLocation }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [likesState, setLikesState] = useState({});

  const categories = ['All', 'High Peaks', 'Spiritual', 'Local Arts & Culture', 'Lakes & Valleys', 'Wildlife'];

  const filteredPhotos = photos.filter(p => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikesState(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="gallery-section" className="py-20 bg-[#070E0D] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-3">
            <Camera className="w-3.5 h-3.5 text-blue-400" />
            Visual Splendors of Devbhoomi
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
            Himalayan Gallery & Famous Photographs
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Glimpse the ethereal alpenglow over Nanda Devi, sacred evening fires along the Ganges, master Aipan motifs, and hidden alpine meadows captured by native mountain photographers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border border-blue-400/40'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map(photo => {
            const currentLikes = photo.likes + (likesState[photo.id] || 0);

            return (
              <div
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 shadow-xl cursor-pointer hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-500 h-80 border border-white/10 hover:border-emerald-500/40 hover:-translate-y-1.5"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-85 group-hover:opacity-100"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                    {photo.category}
                  </span>
                </div>

                {/* Like Button */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-rose-300 hover:text-rose-400 text-xs font-bold border border-white/20 transition"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{currentLikes}</span>
                  </button>
                </div>

                {/* Caption at bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-bold text-base font-serif leading-tight text-white drop-shadow">
                    {photo.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-300 mt-1.5">
                    <span className="flex items-center gap-1 text-amber-300 truncate">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      {photo.location}
                    </span>
                    <span className="text-slate-400">📷 {photo.photographer}</span>
                  </div>
                </div>

                {/* Hover zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-5xl w-full bg-[#0E201D] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
            
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="lg:w-2/3 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                className="w-full h-full max-h-[60vh] lg:max-h-[85vh] object-contain"
              />
            </div>

            <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between text-white overflow-y-auto">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  {lightboxPhoto.category}
                </span>

                <h3 className="text-2xl font-bold font-serif leading-tight">
                  {lightboxPhoto.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{lightboxPhoto.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lightboxPhoto.description}
                </p>

                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-xs space-y-1">
                  <div className="text-slate-400">Photographer:</div>
                  <div className="font-bold text-white">{lightboxPhoto.photographer}</div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    const loc = lightboxPhoto.location;
                    setLightboxPhoto(null);
                    onPlanTripToLocation(loc);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Compass className="w-4 h-4" />
                  <span>Plan Trip to {lightboxPhoto.location}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
