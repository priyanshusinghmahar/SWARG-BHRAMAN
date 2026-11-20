import React, { useState } from 'react';
import { User, Calendar, MapPin, Ticket, Heart, MessageSquare, ShieldCheck, Printer, ArrowRight, Sparkles } from 'lucide-react';

export default function UserPortal({
  bookings,
  wishlist = [],
  onOpenBookingModal,
  onOpenAIPlanner
}) {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="py-14 bg-[#07100F] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Header Card */}
        <div className="bg-[#0E201D]/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 mb-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-white/20">
                PS
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl font-bold font-serif text-white">
                    Priyanshu Singh Mahar
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Explorer
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Member since 2026 • Cultural & Trekking Enthusiast • Uttarakhand Roots
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-300">
                  <span>🎟️ <strong className="text-white">{bookings.length}</strong> Active Trips</span>
                  <span>❤️ <strong className="text-white">{wishlist.length || 4}</strong> Saved Sights</span>
                  <span>🎨 <strong className="text-white">2</strong> Artisan Workshops</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={onOpenAIPlanner}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Trip Planner</span>
              </button>
            </div>
          </div>
        </div>

        {/* Portal Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto">
          {[
            { id: 'bookings', label: `My Booked Trips (${bookings.length})`, icon: '🎟️' },
            { id: 'wishlist', label: 'Saved Destinations & Crafts', icon: '❤️' },
            { id: 'inquiries', label: 'Artisan Conversations', icon: '💬' },
            { id: 'rewards', label: 'Green Travel Eco-Credits', icon: '🌿' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow border border-emerald-400/40'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Bookings Content */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="bg-[#0E201D] rounded-3xl p-12 text-center border border-white/10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🏔️
                </div>
                <h3 className="text-xl font-bold font-serif text-white">No Trips Booked Yet</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
                  Ready to experience the sacred peaks and living craft guilds of Uttarakhand? Explore our verified packages or generate an AI itinerary tailored to your budget.
                </p>
                <button
                  onClick={onOpenAIPlanner}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-500 transition"
                >
                  Generate AI Trip Plan
                </button>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#0E201D]/90 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl hover:border-emerald-500/40 transition backdrop-blur-md"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-white/10 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-300">
                          ID: {booking.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                        {booking.packageTitle}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {booking.destination}
                      </p>
                    </div>

                    <div className="text-left lg:text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount Paid</span>
                      <span className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-300">
                        ₹{booking.totalPrice?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Trip Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Travel Dates</span>
                      <span className="font-bold text-white">{booking.travelDate} to {booking.returnDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Travelers</span>
                      <span className="font-bold text-white">{booking.travelers} Guests</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Mountain Stay</span>
                      <span className="font-bold text-white truncate block">{booking.stayType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Pickup Hub</span>
                      <span className="font-bold text-white truncate block">{booking.pickupLocation || 'Kathgodam'}</span>
                    </div>
                  </div>

                  {/* Artisan Workshop Add-on */}
                  {booking.artisanWorkshop && booking.artisanWorkshop !== 'None' && (
                    <div className="p-3 bg-rose-950/50 border border-rose-500/30 rounded-xl text-xs flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-rose-300">
                        <span>🎨</span>
                        <span><strong>Included Artisan Experience:</strong> {booking.artisanWorkshop}</span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-300 uppercase bg-rose-900/60 px-2 py-0.5 rounded">
                        Confirmed with Master Studio
                      </span>
                    </div>
                  )}

                  {/* Host Contact Box */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-white/10 gap-3 text-xs">
                    <div className="text-slate-300">
                      <strong>Host / Artisan Coordinator:</strong> {booking.contactPerson}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 border border-white/20 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 font-bold transition flex items-center gap-1.5 text-xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Pass</span>
                      </button>

                      <a
                        href="tel:+919412048219"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition text-xs"
                      >
                        Call Host
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0E201D] rounded-3xl p-5 border border-white/10 shadow flex flex-col justify-between">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80"
                  alt="Chopta Tungnath"
                  className="w-full h-44 object-cover rounded-2xl mb-3"
                />
                <h4 className="font-bold text-white font-serif text-base">Chopta & Tungnath Temple</h4>
                <p className="text-xs text-slate-400 mt-1">Garhwal Himalayas • 3,680m Altitude</p>
              </div>
              <button
                onClick={() => onOpenBookingModal({ title: 'Chopta & Tungnath Trek', startingPrice: 3800 })}
                className="mt-4 w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Book Trip
              </button>
            </div>

            <div className="bg-[#0E201D] rounded-3xl p-5 border border-white/10 shadow flex flex-col justify-between">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80"
                  alt="Aipan Chowki"
                  className="w-full h-44 object-cover rounded-2xl mb-3"
                />
                <h4 className="font-bold text-white font-serif text-base">Aipan Sacred Chowki Panel</h4>
                <p className="text-xs text-slate-400 mt-1">Meenakshi Joshi Studio, Almora • ₹1,450</p>
              </div>
              <a
                href="https://wa.me/919412048219"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold transition text-center block shadow"
              >
                Inquire on WhatsApp
              </a>
            </div>

            <div className="bg-[#0E201D] rounded-3xl p-5 border border-white/10 shadow flex flex-col justify-between">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80"
                  alt="Bal Mithai"
                  className="w-full h-44 object-cover rounded-2xl mb-3"
                />
                <h4 className="font-bold text-white font-serif text-base">Kheem Singh Bal Mithai (Almora)</h4>
                <p className="text-xs text-slate-400 mt-1">Heritage Sweetmaker 1865 • Paltan Bazaar</p>
              </div>
              <a
                href="tel:+919412084721"
                className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-xs font-bold transition text-center block shadow"
              >
                Call Sweet Shop
              </a>
            </div>
          </div>
        )}

        {/* Tab 3: Conversations */}
        {activeTab === 'inquiries' && (
          <div className="bg-[#0E201D] rounded-3xl p-6 sm:p-8 border border-white/10">
            <h3 className="text-xl font-bold font-serif text-white mb-4">Direct Studio Conversations</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                    alt="Meenakshi"
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">Meenakshi Joshi (Aipan Folk Artist)</h4>
                    <p className="text-slate-400">"Namaste! Your requested 3-hour sacred panel workshop in Almora is confirmed for Dec 16th."</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/919412048219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  Reply on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Eco Credits */}
        {activeTab === 'rewards' && (
          <div className="bg-[#0E201D] rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌿</span>
              <div>
                <h3 className="text-xl font-bold font-serif text-white">Green Mountain Conservation Credits</h3>
                <p className="text-xs text-slate-400">Earned by choosing zero-plastic certified homestays & local mountain guides.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/30">
                <span className="text-xs text-emerald-300 block">Available Credits</span>
                <span className="text-3xl font-extrabold text-white font-serif">650 Pts</span>
                <span className="text-[11px] text-emerald-400 block mt-1">₹650 discount on next trip</span>
              </div>
              <div className="p-4 bg-amber-950/60 rounded-2xl border border-amber-500/30">
                <span className="text-xs text-amber-300 block">Trees Planted (Harela Initiative)</span>
                <span className="text-3xl font-extrabold text-white font-serif">4 Saplings</span>
                <span className="text-[11px] text-amber-400 block mt-1">Planted in Mukteshwar</span>
              </div>
              <div className="p-4 bg-blue-950/60 rounded-2xl border border-blue-500/30">
                <span className="text-xs text-blue-300 block">Artisan Royalty Contribution</span>
                <span className="text-3xl font-extrabold text-white font-serif">100% Direct</span>
                <span className="text-[11px] text-blue-400 block mt-1">Zero platform cut</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
