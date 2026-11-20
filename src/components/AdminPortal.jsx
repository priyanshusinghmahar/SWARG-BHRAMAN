import React, { useState } from 'react';
import { ShieldCheck, Users, CheckCircle, XCircle, AlertCircle, BarChart3, MapPin, Sparkles, TrendingUp, Compass, Star } from 'lucide-react';

export default function AdminPortal({
  destinations,
  artisans,
  foodShops,
  bookings,
  reviews
}) {
  const [activeTab, setActiveTab] = useState('verification');

  // Pending verification applications queue
  const [pendingArtisans, setPendingArtisans] = useState([
    {
      id: 'app-1',
      name: 'Kishan Singh Rawat',
      craft: 'Chamoli Wild Pine-Needle Weaving (Baskets & Mats)',
      village: 'Urgam Valley, Chamoli District',
      contact: '+91 94115 88921',
      experience: '16 Years',
      appliedDate: '2026-11-19',
      status: 'PENDING'
    },
    {
      id: 'app-2',
      name: 'Deepa Devi Joshi',
      craft: 'Organic Pahadi Lemon Pickle & Buransh Preserves',
      village: 'Lohaghat, Champawat District',
      contact: '+91 97560 33419',
      experience: '12 Years',
      appliedDate: '2026-11-18',
      status: 'PENDING'
    },
    {
      id: 'app-3',
      name: 'Maheshwari Homestay & Gharat Watermill',
      craft: 'Heritage Stone Watermill & Village Organic Stay',
      village: 'Sari Village, Rudraprayag',
      contact: '+91 98371 44520',
      experience: '8 Years Host',
      appliedDate: '2026-11-17',
      status: 'PENDING'
    }
  ]);

  const [verifiedList, setVerifiedList] = useState(artisans);

  const handleApprove = (id) => {
    const item = pendingArtisans.find(a => a.id === id);
    if (!item) return;

    setPendingArtisans(pendingArtisans.filter(a => a.id !== id));
    setVerifiedList([
      ...verifiedList,
      {
        id: `art-approved-${Date.now()}`,
        name: item.name,
        craftType: item.craft,
        locationName: item.village,
        experienceYears: parseInt(item.experience) || 10,
        contactPhone: item.contact,
        verified: true,
        rating: 5.0,
        reviews: 0,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        heroImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        story: 'Newly verified artisan approved via Devbhoomi Trust Portal.',
        specialties: [item.craft],
        workshopOffered: 'Introduction to mountain craft workshop',
        workshopPrice: 500,
        products: []
      }
    ]);
  };

  const handleReject = (id) => {
    setPendingArtisans(pendingArtisans.filter(a => a.id !== id));
  };

  return (
    <div id="admin-portal" className="py-12 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Banner */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase mb-2 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                PahadiVibe Trust • State Administration Console
              </div>
              <h2 className="text-3xl font-extrabold font-serif text-white">
                Platform Admin Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Overseeing verified artisan guilds, homestay certifications, traveler booking volume, and AI planner analytics.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono text-emerald-400 font-bold">ALL SYSTEMS LIVE</span>
            </div>
          </div>
        </div>

        {/* Top Platform KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 shadow">
            <span className="text-xs text-slate-400 block">Total Traveler Bookings</span>
            <span className="text-3xl font-extrabold font-serif text-white mt-1 block">4,821</span>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-1">↑ +18.4% this month</span>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 shadow">
            <span className="text-xs text-slate-400 block">Direct Economy Generated</span>
            <span className="text-3xl font-extrabold font-serif text-amber-400 mt-1 block">₹3.42 Cr</span>
            <span className="text-[11px] text-slate-400 font-semibold block mt-1">100% paid to hill families</span>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 shadow">
            <span className="text-xs text-slate-400 block">Verified Artisans & Hosts</span>
            <span className="text-3xl font-extrabold font-serif text-emerald-400 mt-1 block">{verifiedList.length}</span>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-1">{pendingArtisans.length} pending review</span>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 shadow">
            <span className="text-xs text-slate-400 block">Avg. Traveler Trust Score</span>
            <span className="text-3xl font-extrabold font-serif text-white mt-1 block">4.94 / 5.0</span>
            <span className="text-[11px] text-amber-400 font-semibold block mt-1">From 4,800+ reviews</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto text-xs sm:text-sm font-semibold">
          {[
            { id: 'verification', label: `Artisan KYC Verification (${pendingArtisans.length} Pending)`, icon: '🛡️' },
            { id: 'destinations', label: `Manage Destinations (${destinations.length})`, icon: '🏔️' },
            { id: 'ai-analytics', label: 'AI Planner Analytics', icon: '⚡' },
            { id: 'reviews-queue', label: `Reviews Moderation (${reviews.length})`, icon: '⭐' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Artisan Verification Queue */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white">
                    Pending Artisan & Business Verification Queue
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Verify genuine Uttarakhand artisans, traditional food outlets, and homestay hosts to grant the official Devbhoomi Trust badge.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                  {pendingArtisans.length} Applications Pending
                </span>
              </div>

              {pendingArtisans.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">
                  ✓ All artisan applications have been reviewed and verified!
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingArtisans.map(app => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white font-serif">{app.name}</h4>
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                            {app.experience}
                          </span>
                        </div>
                        <div className="text-slate-300">
                          <strong>Craft / Business:</strong> {app.craft}
                        </div>
                        <div className="text-slate-400 flex items-center gap-3">
                          <span>📍 {app.village}</span>
                          <span>📞 {app.contact}</span>
                          <span>Applied: {app.appliedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleReject(app.id)}
                          className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-400 rounded-xl font-bold transition"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve & Verify</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Currently Active Verified Artisans List */}
            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold font-serif text-white mb-4">
                Active Verified Artisans on Devbhoomi Platform ({verifiedList.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {verifiedList.map((art, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 flex items-center gap-3">
                    <img src={art.avatar} alt={art.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white text-xs truncate">{art.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{art.craftType}</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Active
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Destinations */}
        {activeTab === 'destinations' && (
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold font-serif text-white mb-4">
              Featured Uttarakhand Sights & Destinations ({destinations.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinations.map(d => (
                <div key={d.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white text-sm font-serif">{d.name}</h4>
                    <span className="text-slate-400">{d.region} • {d.altitude}</span>
                    <div className="text-amber-400 mt-1">Tours from ₹{d.startingPrice}</div>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-900/80 text-emerald-300 font-bold text-[10px]">
                    PUBLISHED
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: AI Planner Analytics */}
        {activeTab === 'ai-analytics' && (
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold font-serif text-white">
              AI Budget Trip Planner Engine Telemetry
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-2 font-bold">Top Requested Budget Brackets</span>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>₹20,000 - ₹45,000 (Explorer)</span>
                      <span className="font-bold">46%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '46%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>₹5,000 - ₹15,000 (Backpacker)</span>
                      <span className="font-bold">32%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '32%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>₹50,000+ (Luxury Chalet)</span>
                      <span className="font-bold">22%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '22%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-2 font-bold">Top Matched Theme Interests</span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
                    <span>🎨 Pahadi Arts & Aipan</span>
                    <span className="text-emerald-400 font-bold">1,890 plans</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
                    <span>🥾 Chopta & High Bugyals</span>
                    <span className="text-emerald-400 font-bold">1,420 plans</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
                    <span>🕉️ Ganga Aarti & Sacred Kedarnath</span>
                    <span className="text-emerald-400 font-bold">1,210 plans</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-2 font-bold">Average Budget Optimization</span>
                <div className="text-3xl font-extrabold text-amber-400 font-serif">₹4,280</div>
                <p className="text-xs text-slate-400 mt-1">
                  Saved per traveler by bypassing commercial aggregators and booking direct mountain homestays.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews Queue */}
        {activeTab === 'reviews-queue' && (
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold font-serif text-white mb-4">
              Recent Traveler Reviews ({reviews.length})
            </h3>
            <div className="space-y-3">
              {reviews.map(rev => (
                <div key={rev.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{rev.userName} ({rev.userCity})</span>
                    <span className="text-amber-400">★ {rev.rating}.0</span>
                  </div>
                  <p className="text-slate-300">"{rev.comment}"</p>
                  <div className="text-slate-500 mt-1">Trip: {rev.tripTaken} • Status: Approved</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
