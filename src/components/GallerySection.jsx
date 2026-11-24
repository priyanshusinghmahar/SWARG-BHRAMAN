import React, { useState } from 'react';
import { Camera, Heart, MapPin, Maximize2, X, Sparkles, Compass, Upload, CheckCircle2, Plus } from 'lucide-react';
import EmptyState from './EmptyState';

export default function GallerySection({ photos = [], onAddNewPhoto, onPlanTripToLocation }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [likesState, setLikesState] = useState({});
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState('');
  const [newPhotoForm, setNewPhotoForm] = useState({
    title: '',
    location: '',
    photographer: '',
    category: 'High Peaks',
    description: ''
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const categories = ['All', 'High Peaks', 'Spiritual', 'Local Arts & Culture', 'Lakes & Valleys', 'Wildlife'];

  // 1-Click Mountain presets for quick testing
  const sampleMountainCaptures = [
    { label: 'Nanda Devi Summit', url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80', loc: 'Auli (3,050m)', cat: 'High Peaks' },
    { label: 'Ganga Evening Aarti', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80', loc: 'Triveni Ghat, Rishikesh', cat: 'Spiritual' },
    { label: 'Kedarnath Temple', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80', loc: 'Kedarnath Dham (3,584m)', cat: 'Spiritual' }
  ];

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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadedImagePreview || !newPhotoForm.title) {
      alert('Please attach an image and enter a title');
      return;
    }

    const newPhotoPayload = {
      id: `photo-${Date.now()}`,
      title: newPhotoForm.title,
      location: newPhotoForm.location || 'Uttarakhand',
      category: newPhotoForm.category,
      image: uploadedImagePreview,
      photographer: newPhotoForm.photographer || 'Verified Explorer',
      likes: 1,
      description: newPhotoForm.description || 'Authentic photograph captured on the Devbhoomi trails.'
    };

    if (onAddNewPhoto) {
      onAddNewPhoto(newPhotoPayload);
    }

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setUploadedImagePreview('');
      setNewPhotoForm({
        title: '',
        location: '',
        photographer: '',
        category: 'High Peaks',
        description: ''
      });
    }, 1500);
  };

  return (
    <section id="gallery-section" className="py-16 bg-slate-50 dark:bg-[#070E0D] text-slate-900 dark:text-white relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Traveler-Uploaded Devbhoomi Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Himalayan Photo Wall & Real Captures
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              100% authentic captures taken by real mountain wanderers and pilgrims across Uttarakhand.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Your Himalayan Photo</span>
            </button>
          </div>
        </div>

        {photos.length === 0 ? (
          /* Clean Empty State when zero photos exist */
          <div className="text-center py-20 px-6 bg-white dark:bg-[#0E1B29]/70 rounded-3xl border border-slate-200 dark:border-white/10 max-w-2xl mx-auto space-y-4 my-8 shadow-md dark:shadow-xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30 text-3xl">
              📸
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
              No Traveler Photos Uploaded Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              All fake stock photos have been removed. Be the first explorer to showcase your sacred peaks, temples, or mountain trail moments!
            </p>
            <div className="pt-2">
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition inline-flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload First Himalayan Photo</span>
              </button>
            </div>
          </div>
        ) : (
          /* Photo Grid */
          <>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    activeFilter === cat
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border border-blue-400/40'
                      : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-xs'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhotos.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={Camera}
                    title="No Photographs Found"
                    description={`No visual archive moments found under "${activeFilter}". Explore other categories or upload a moment.`}
                    actionLabel="View All Photos"
                    onAction={() => setActiveFilter('All')}
                  />
                </div>
              ) : (
                filteredPhotos.map(photo => {
                const currentLikes = (photo.likes || 1) + (likesState[photo.id] || 0);

                return (
                  <div
                    key={photo.id}
                    onClick={() => setLightboxPhoto(photo)}
                    className="group relative rounded-3xl overflow-hidden bg-slate-900 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-500 h-80 border border-slate-200 dark:border-white/10 hover:border-blue-400/50 hover:-translate-y-1"
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 truncate pointer-events-auto">
                        {photo.category}
                      </span>
                      <button
                        onClick={(e) => handleLike(photo.id, e)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-rose-300 hover:text-rose-400 text-xs font-bold border border-white/20 transition flex-shrink-0 pointer-events-auto"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span>{currentLikes}</span>
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-bold text-sm font-serif leading-tight text-white drop-shadow truncate">
                        {photo.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
                        <span className="flex items-center gap-1 text-amber-300 truncate">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {photo.location}
                        </span>
                        <span className="text-slate-400 truncate max-w-[100px]">📷 {photo.photographer}</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              }))}
            </div>
          </>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-white dark:bg-[#0E1627] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/20 shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-2/3 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                className="w-full h-full max-h-[60vh] md:max-h-[85vh] object-contain"
              />
            </div>

            <div className="md:w-1/3 p-6 flex flex-col justify-between text-slate-900 dark:text-white overflow-y-auto">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-500/30">
                  {lightboxPhoto.category}
                </span>

                <h3 className="text-xl font-bold font-serif leading-tight text-slate-900 dark:text-white">
                  {lightboxPhoto.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{lightboxPhoto.location}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lightboxPhoto.description}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-xs space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px]">Photographer Credit:</div>
                  <div className="font-bold text-slate-900 dark:text-white">{lightboxPhoto.photographer}</div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => {
                    const loc = lightboxPhoto.location;
                    setLightboxPhoto(null);
                    if (onPlanTripToLocation) onPlanTripToLocation(loc);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Tours to {lightboxPhoto.location}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0C1527] text-slate-900 dark:text-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-blue-500/30 relative my-6">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-5 right-5 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            {uploadSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-500/30 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Photo Published!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                  Your photo is now live on the Devbhoomi Himalayan Gallery.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                    Share Your Himalayan Eye
                  </span>
                  <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mt-0.5">
                    Upload Photograph
                  </h3>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Photo Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kedarnath Valley After Fresh Snowfall"
                    value={newPhotoForm.title}
                    onChange={(e) => setNewPhotoForm({ ...newPhotoForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Location in Uttarakhand</label>
                    <input
                      type="text"
                      placeholder="e.g. Chopta / Auli / Munsiyari"
                      value={newPhotoForm.location}
                      onChange={(e) => setNewPhotoForm({ ...newPhotoForm, location: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Your Name (Photographer)</label>
                    <input
                      type="text"
                      placeholder="e.g. Priyanshu Singh Mahar"
                      value={newPhotoForm.photographer}
                      onChange={(e) => setNewPhotoForm({ ...newPhotoForm, photographer: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">Category</label>
                  <select
                    value={newPhotoForm.category}
                    onChange={(e) => setNewPhotoForm({ ...newPhotoForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="High Peaks">High Peaks</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Local Arts & Culture">Local Arts & Culture</option>
                    <option value="Lakes & Valleys">Lakes & Valleys</option>
                    <option value="Wildlife">Wildlife</option>
                  </select>
                </div>

                {/* File Upload Box */}
                <div className="p-3 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2">
                  <span className="font-bold text-blue-600 dark:text-blue-300 text-xs block">Attach Photo File:</span>
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-blue-400 dark:border-blue-500/50 hover:border-blue-500 bg-blue-50/50 dark:bg-blue-500/5 cursor-pointer transition text-slate-700 dark:text-slate-300">
                    <Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-xs">Browse Photo from Computer / Phone</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {/* 1-Click Mountain presets */}
                  <div className="pt-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">Or 1-click test photo:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {sampleMountainCaptures.map(preset => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setUploadedImagePreview(preset.url);
                            setNewPhotoForm(prev => ({
                              ...prev,
                              title: prev.title || preset.label,
                              location: prev.location || preset.loc,
                              category: preset.cat
                            }));
                          }}
                          className="px-2 py-0.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                        >
                          + {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {uploadedImagePreview && (
                    <div className="relative h-32 rounded-xl overflow-hidden border border-blue-400/50 mt-2">
                      <img src={uploadedImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setUploadedImagePreview('')}
                        className="absolute top-1 right-1 w-5 h-5 bg-rose-600 rounded-full text-white text-xs flex items-center justify-center font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-300 dark:border-white/10 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition shadow"
                  >
                    Upload & Publish Photo
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
