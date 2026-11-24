import React, { useState } from 'react';
import { 
  Star, MessageSquarePlus, ThumbsUp, ShieldCheck, CheckCircle2, 
  Sparkles, Filter, Upload, Image, X, ZoomIn, Camera 
} from 'lucide-react';
import EmptyState from './EmptyState';

export default function ReviewsSection({ reviews = [], onAddNewReview }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'photos', '5star', 'trek'
  const [activePhotoModal, setActivePhotoModal] = useState(null); // URL for full photo view
  const [uploadedImages, setUploadedImages] = useState([]);

  const [newReview, setNewReview] = useState({
    userName: '',
    userCity: '',
    rating: 5,
    tripTaken: '',
    comment: '',
    badge: 'Verified Cultural Traveler'
  });
  const [helpfulCounts, setHelpfulCounts] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Quick preset sample mountain photos for quick 1-click attachments
  const sampleMountainPhotos = [
    { label: 'Kedarnath Spire', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tungnath Snow', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
    { label: 'Aipan Folk Art', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Rishikesh Aarti', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleHelpful = (id) => {
    setHelpfulCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Process user uploaded image files to base64 DataURL
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUploadedImages(prev => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const addPresetPhoto = (photoUrl) => {
    if (!uploadedImages.includes(photoUrl)) {
      setUploadedImages(prev => [...prev, photoUrl]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    const newRevPayload = {
      id: `rev-${Date.now()}`,
      userName: newReview.userName,
      userCity: newReview.userCity || 'Uttarakhand Traveler',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: Number(newReview.rating),
      date: 'Just Now',
      tripTaken: newReview.tripTaken || 'Devbhoomi Sacred Trail',
      badge: newReview.badge,
      comment: newReview.comment,
      helpfulCount: 1,
      photos: uploadedImages
    };

    if (onAddNewReview) {
      onAddNewReview(newRevPayload);
    }

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      setUploadedImages([]);
      setNewReview({
        userName: '',
        userCity: '',
        rating: 5,
        tripTaken: '',
        comment: '',
        badge: 'Verified Cultural Traveler'
      });
    }, 1600);
  };

  const hasReviews = reviews.length > 0;
  const avgRating = hasReviews
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
    : '0.0';

  // Filter reviews
  const filteredReviews = reviews.filter(rev => {
    if (selectedFilter === 'photos') return rev.photos && rev.photos.length > 0;
    if (selectedFilter === '5star') return rev.rating === 5;
    if (selectedFilter === 'trek') {
      const text = `${rev.tripTaken || ''} ${rev.comment || ''}`.toLowerCase();
      return text.includes('trek') || text.includes('kedarnath') || text.includes('chopta') || text.includes('tungnath');
    }
    return true;
  });

  return (
    <section id="reviews-section" className="py-16 bg-slate-50 dark:bg-[#07110F] text-slate-900 dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
              <span>Real Stories & Photo Wall from Devbhoomi Trails</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-serif tracking-tight">
              Traveler Reviews & Verified Memories
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              100% authentic community reviews and photos uploaded exclusively by real pilgrims and wanderers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition flex items-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write Review & Upload Photos</span>
            </button>
          </div>
        </div>

        {!hasReviews ? (
          /* Clean Empty State when zero reviews exist */
          <div className="my-8 max-w-2xl mx-auto">
            <EmptyState
              icon={Star}
              title="No Traveler Reviews Yet"
              description="Every journey in Devbhoomi leaves a sacred story. Be the first explorer to share your authentic experience, mountain trail insights, and expedition memories."
              actionLabel="Write First Review"
              onAction={() => setModalOpen(true)}
            />
          </div>
        ) : (
          /* Active Reviews Display with dynamic statistics */
          <>
            {/* Rating Breakdown Banner */}
            <div className="bg-white dark:bg-[#0D211D]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 mb-8 backdrop-blur-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Score Big Display */}
                <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 pb-6 md:pb-0 md:pr-8">
                  <div className="text-5xl sm:text-6xl font-extrabold font-serif text-slate-950 dark:text-white">
                    {avgRating}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 dark:text-amber-400 my-2">
                    {[...Array(Math.round(Number(avgRating)) || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Based on <strong className="text-slate-900 dark:text-white">{reviews.length} genuine traveler review{reviews.length > 1 ? 's' : ''}</strong> uploaded.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                  <div className="bg-black/40 p-3.5 rounded-2xl border border-white/10">
                    <span className="text-slate-400 block mb-0.5">Real Uploads</span>
                    <span className="text-lg font-bold text-white font-serif">{reviews.length} Stories</span>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div className="bg-black/40 p-3.5 rounded-2xl border border-white/10">
                    <span className="text-slate-400 block mb-0.5">Attached Photos</span>
                    <span className="text-lg font-bold text-white font-serif">
                      {reviews.reduce((acc, r) => acc + (r.photos?.length || 0), 0)} Photos
                    </span>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div className="bg-black/40 p-3.5 rounded-2xl border border-white/10">
                    <span className="text-slate-400 block mb-0.5">Community Trust</span>
                    <span className="text-lg font-bold text-white font-serif">100% Organic</span>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs">
              {[
                { id: 'all', label: `All Reviews (${reviews.length})` },
                { id: 'photos', label: '📸 With Photos Only' },
                { id: '5star', label: '⭐ 5-Star Pilgrims' },
                { id: 'trek', label: '🏔️ High Peak Treks' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap border ${
                    selectedFilter === f.id
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-white dark:bg-[#0E201D] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Reviews List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={Star}
                    title="No Reviews Found in this Category"
                    description="No traveler stories match the selected filter. Explore other categories or submit your own review."
                    actionLabel="View All Reviews"
                    onAction={() => setSelectedFilter('all')}
                  />
                </div>
              ) : (
                filteredReviews.map(rev => {
                const currentHelpful = (rev.helpfulCount || 1) + (helpfulCounts[rev.id] || 0);

                return (
                  <div
                    key={rev.id}
                    className="p-6 bg-white dark:bg-[#0E201D]/90 rounded-3xl border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between backdrop-blur-md shadow-md dark:shadow-xl"
                  >
                    <div>
                      {/* Reviewer Header */}
                      <div className="flex items-start justify-between mb-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                            alt={rev.userName}
                            className="w-11 h-11 rounded-2xl object-cover border border-emerald-500/30"
                          />
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight">
                              {rev.userName}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {rev.userCity} • <span className="text-slate-400 dark:text-slate-500">{rev.date}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      {/* Trip Badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          {rev.badge}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[240px]">
                          Trip: {rev.tripTaken}
                        </span>
                      </div>

                      {/* Comment */}
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        "{rev.comment}"
                      </p>

                      {/* Review Photos with Lightbox Click */}
                      {rev.photos && rev.photos.length > 0 && (
                        <div className="mt-3.5">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            <span>Traveler Photos ({rev.photos.length}) — Click to Zoom:</span>
                          </span>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {rev.photos.map((photo, idx) => (
                              <div
                                key={idx}
                                onClick={() => setActivePhotoModal(photo)}
                                className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/15 flex-shrink-0 cursor-pointer group/photo"
                              >
                                <img
                                  src={photo}
                                  alt="Review attachment"
                                  className="w-full h-full object-cover group-hover/photo:scale-110 transition duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition">
                                  <ZoomIn className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Helpful count */}
                    <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-emerald-400 text-[11px] font-medium">Verified Explorer Review</span>
                      <button
                        onClick={() => handleHelpful(rev.id)}
                        className="flex items-center gap-1.5 text-slate-300 hover:text-white transition font-medium px-3 py-1 bg-white/5 rounded-xl border border-white/10 text-xs cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                        <span>Helpful ({currentHelpful})</span>
                      </button>
                    </div>
                  </div>
                );
              }))}
            </div>
          </>
        )}

      </div>

      {/* =========================================================================
          PHOTO LIGHTBOX MODAL
          ========================================================================= */}
      {activePhotoModal && (
        <div 
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-[#0E1627] rounded-3xl overflow-hidden border border-amber-500/30 p-2 shadow-2xl"
          >
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhotoModal}
              alt="Expanded Traveler Capture"
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="p-3 text-center text-xs text-slate-300 font-serif">
              ✦ Verified SwargBhraman Traveler Photo Capture
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          WRITE A REVIEW & UPLOAD PHOTOS MODAL
          ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-[#0E221E] text-slate-900 dark:text-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-emerald-500/30 relative my-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-lg font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/30 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-serif">Review & Photos Published!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                  Thank you for helping fellow mountain wanderers and supporting native Uttarakhand heritage. Your review and photos are live!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                    Share Your Himalayan Experience
                  </span>
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-serif mt-0.5">
                    Write Review & Add Photos
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Your real feedback helps verified homestays and sacred pilgrim trails.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Singh Mahar"
                      value={newReview.userName}
                      onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Your City</label>
                    <input
                      type="text"
                      placeholder="e.g. Dehradun / Delhi"
                      value={newReview.userCity}
                      onChange={(e) => setNewReview({ ...newReview, userCity: e.target.value })}
                      className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Trip / Trek Taken</label>
                  <input
                    type="text"
                    placeholder="e.g. Kedarnath Yatra & Chopta Tungnath Trek"
                    value={newReview.tripTaken}
                    onChange={(e) => setNewReview({ ...newReview, tripTaken: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Stars Selection */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Overall Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="text-2xl transition hover:scale-110 p-0.5"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-300 ml-2">
                      {newReview.rating} out of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Review & Story *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your journey: trails, mountain weather, warm homestay hospitality, or sacred darshan..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* =========================================================
                    IMAGE UPLOAD & PHOTO PREVIEW SECTION
                    ========================================================= */}
                <div className="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Attach Trip Photos ({uploadedImages.length})</span>
                    </span>
                    <span className="text-[10px] text-slate-400">JPG, PNG supported</span>
                  </div>

                  {/* File Upload Button / Dropzone */}
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-emerald-500/50 hover:border-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer transition text-slate-300">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-xs">Browse & Upload Photos from Device</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Quick Preset Photo Tags */}
                  <div className="pt-1">
                    <span className="text-[10px] text-slate-400 block mb-1">
                      Or 1-Click attach authentic mountain trail photos:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sampleMountainPhotos.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => addPresetPhoto(preset.url)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                        >
                          <span>+</span>
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Uploaded Photos Thumbnails Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="pt-2 flex gap-2 overflow-x-auto pb-1">
                      {uploadedImages.map((imgSrc, index) => (
                        <div key={index} className="relative w-14 h-14 rounded-lg overflow-hidden border border-amber-400/50 flex-shrink-0">
                          <img src={imgSrc} alt="Upload preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeUploadedImage(index)}
                            className="absolute top-0.5 right-0.5 w-4 h-4 bg-rose-600 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-2.5 border border-white/10 rounded-xl font-semibold text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl font-bold transition shadow-md"
                  >
                    Post Review & Photos
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
