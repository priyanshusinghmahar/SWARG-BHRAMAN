import React, { useState } from 'react';
import { Star, MessageSquarePlus, ThumbsUp, ShieldCheck, CheckCircle2, UserCheck, Sparkles, Filter } from 'lucide-react';

export default function ReviewsSection({ reviews, onAddNewReview }) {
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleHelpful = (id) => {
    setHelpfulCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    onAddNewReview({
      id: `rev-${Date.now()}`,
      userName: newReview.userName,
      userCity: newReview.userCity || 'India',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: Number(newReview.rating),
      date: 'Just Now',
      tripTaken: newReview.tripTaken || 'Uttarakhand Heritage Journey',
      badge: newReview.badge,
      comment: newReview.comment,
      helpfulCount: 1,
      photos: []
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      setNewReview({
        userName: '',
        userCity: '',
        rating: 5,
        tripTaken: '',
        comment: '',
        badge: 'Verified Cultural Traveler'
      });
    }, 1800);
  };

  return (
    <section id="reviews-section" className="py-20 bg-[#07110F] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Real Stories from the Devbhoomi Trail
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">
              Traveler Experiences & Artisan Testimonials
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Authentic reviews from wanderers, trekkers, and cultural explorers who connected directly with Uttarakhand’s local families, artisans, and sacred valleys.
            </p>
          </div>

          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Rating Breakdown Banner */}
        <div className="bg-[#0D211D]/90 border border-white/10 rounded-3xl p-6 sm:p-10 mb-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Score Big Display (4 Cols) */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="text-6xl sm:text-7xl font-extrabold font-serif text-white">
                4.94
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 my-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-400">
                Based on <strong className="text-white">4,820+ verified bookings</strong> across Garhwal & Kumaon
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Traveler Reviews</span>
              </div>
            </div>

            {/* Category Breakdown (8 Cols) */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                <span className="text-slate-400 block mb-1">Artisan Authenticity</span>
                <span className="text-xl font-bold text-white font-serif">5.0 / 5.0</span>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                <span className="text-slate-400 block mb-1">Homestay Warmth</span>
                <span className="text-xl font-bold text-white font-serif">4.9 / 5.0</span>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                <span className="text-slate-400 block mb-1">Scenic & Safety</span>
                <span className="text-xl font-bold text-white font-serif">4.9 / 5.0</span>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '97%' }} />
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                <span className="text-slate-400 block mb-1">Zero-Middleman Value</span>
                <span className="text-xl font-bold text-white font-serif">4.95 / 5.0</span>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2.5">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '99%' }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {reviews.map(rev => {
            const currentHelpful = rev.helpfulCount + (helpfulCounts[rev.id] || 0);

            return (
              <div
                key={rev.id}
                className="p-7 bg-[#0E201D]/90 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        className="w-12 h-12 rounded-2xl object-cover border border-emerald-500/30"
                      />
                      <div>
                        <h4 className="font-bold text-white text-base leading-tight">
                          {rev.userName}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {rev.userCity} • <span className="text-slate-500">{rev.date}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Trip Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {rev.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium truncate">
                      Trip: {rev.tripTaken}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* Review Photos */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                      {rev.photos.map((p, idx) => (
                        <img
                          key={idx}
                          src={p}
                          alt="Review attachment"
                          className="w-16 h-16 rounded-xl object-cover border border-white/10 flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Helpful count */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-emerald-400">Verified Mountain Explorer</span>
                  <button
                    onClick={() => handleHelpful(rev.id)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-white transition font-medium px-3 py-1 bg-white/5 rounded-xl border border-white/10"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>Helpful ({currentHelpful})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0E221E] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-emerald-500/30 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {submittedSuccess ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">Review Published!</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Thank you for helping fellow mountain wanderers and supporting native Uttarakhand artisans. Your review is now live!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Share Your Himalayan Journey</span>
                  <h3 className="text-2xl font-bold text-white font-serif mt-0.5">
                    Write a Review
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your feedback directly helps authentic homestays and heritage craft guilds.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={newReview.userName}
                      onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Your City / Country</label>
                    <input
                      type="text"
                      placeholder="e.g. New Delhi, India"
                      value={newReview.userCity}
                      onChange={(e) => setNewReview({ ...newReview, userCity: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Trip / Experience Taken</label>
                  <input
                    type="text"
                    placeholder="e.g. Chopta Tungnath & Aipan Workshop in Almora"
                    value={newReview.tripTaken}
                    onChange={(e) => setNewReview({ ...newReview, tripTaken: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Stars Selection */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Overall Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="text-2xl transition hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
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
                  <label className="block font-semibold text-slate-300 mb-1">Your Honest Review & Story</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your experience with local guides, food, artisans, or scenic trails..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

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
                    Post Review
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
