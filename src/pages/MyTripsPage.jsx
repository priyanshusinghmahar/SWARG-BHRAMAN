import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Ticket, Calendar, MapPin, Users, Printer, Phone, 
  MessageSquare, ShieldCheck, ArrowRight, Sparkles, 
  Download, QrCode, AlertTriangle, CheckCircle2, Compass, 
  Clock, Navigation, ChevronRight, ExternalLink, ShoppingBag 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MyTripsPage({ bookings = [], haatOrders = [], onOpenBookingModal }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedPass, setSelectedPass] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'trips', 'haat'

  const handleCopyId = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#090E1A] text-slate-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Subtitle */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Home</Link>
          <span>/</span>
          <span className="text-amber-600 dark:text-amber-300 font-semibold">My Trips & Passes</span>
        </div>

        {/* Page Header */}
        <div className="bg-white dark:bg-gradient-to-r dark:from-[#0D1528] dark:via-[#101A31] dark:to-[#0A0F1D] rounded-3xl p-6 sm:p-10 border border-amber-500/30 dark:border-amber-500/25 shadow-xl mb-10 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Ticket className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                Verified Himalayan Expedition Passes
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 dark:text-white tracking-tight">
                My Booked Trips
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Manage your confirmed Uttarakhand itineraries, access digital QR gate passes for forest checkpoints, view guide contacts, and track live mountain weather.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <Link
                to="/personal-suggester"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white text-xs font-bold transition shadow-lg flex items-center gap-2"
              >
                <span>Personal Suggester 🎯</span>
              </Link>
              <Link
                to="/districts-haat"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs font-extrabold transition shadow-lg flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>13 Districts Haat</span>
              </Link>
              <Link
                to="/guides"
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Hire Mountain Guide</span>
              </Link>
            </div>
          </div>

          {/* User Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-xs">
            <div className="bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200 dark:border-white/10">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Active Bookings</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-300">{bookings.length} Confirmed</span>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200 dark:border-white/10">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Haat Direct Orders</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-amber-600 dark:text-amber-300">🛍️ {haatOrders.length} Parcels</span>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200 dark:border-white/10">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Artisan Support Share</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-teal-600 dark:text-teal-300">100% Direct</span>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200 dark:border-white/10">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Traveler Status</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-purple-600 dark:text-purple-300">Verified Explorer</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4 mb-8 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow'
                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>📜</span>
            <span>All Passes & Haat Orders ({bookings.length + haatOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('trips')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'trips'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow'
                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>🎟️</span>
            <span>Expedition Passes ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('haat')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'haat'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow'
                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-amber-700 dark:text-amber-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>🛍️</span>
            <span>Haat District Orders ({haatOrders.length})</span>
          </button>
        </div>

        {/* Haat Orders Section (when activeTab is 'all' or 'haat') */}
        {(activeTab === 'all' || activeTab === 'haat') && haatOrders.length > 0 && (
          <div className="mb-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-amber-700 dark:text-amber-300 flex items-center gap-2">
                <span>🛍️</span>
                <span>District Haat Orders ({haatOrders.length})</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Shipped via Himalayan Speed Post</span>
            </div>

            <div className="space-y-4">
              {haatOrders.map((order, idx) => (
                <div
                  key={order.orderId || idx}
                  className="bg-white dark:bg-[#0C1E1B] rounded-2xl border border-amber-500/30 p-6 shadow-md dark:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase">
                        {order.status || 'PURCHASED & DISPATCHING'}
                      </span>
                      <span className="font-mono text-xs text-slate-600 dark:text-slate-300 font-bold">REF: {order.orderId}</span>
                    </div>
                    <span className="text-amber-700 dark:text-amber-300 font-extrabold font-serif text-lg">
                      ₹{order.grandTotal?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-4 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Item Purchased</span>
                      <strong className="text-slate-900 dark:text-white">{order.productTitle}</strong>
                      <span className="text-emerald-700 dark:text-emerald-300 text-[11px] block">{order.quantity} Units</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Artisan Guild</span>
                      <span className="text-slate-700 dark:text-slate-200 block">{order.artisanGuild}</span>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] block">{order.district} District</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Delivery Address</span>
                      <span className="text-slate-700 dark:text-slate-200 truncate block">{order.deliveryAddress}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Tracking Status</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold block">📦 Dispatched in Eco Pine Wood Box</span>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] block">{order.deliveryEst}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                      100% fair-share payment processed directly to {order.district} cooperative.
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white rounded-xl font-bold flex items-center gap-1.5 border border-slate-200 dark:border-transparent transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Invoice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white dark:bg-[#0C1E1B] rounded-3xl p-12 sm:p-16 text-center border border-slate-200 dark:border-white/10 max-w-2xl mx-auto shadow-xl">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
              🏔️
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
              No Trips Booked Yet
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 mb-8 leading-relaxed">
              Your mountain adventure is waiting to begin. Connect directly with Uttarakhand's indigenous artisan communities, sacred shrines, and alpine trails.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/personal-suggester"
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>🎯 Match Your Mountain Soul</span>
              </Link>
              <Link
                to="/destinations"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold rounded-xl text-xs transition border border-slate-200 dark:border-white/15 flex items-center justify-center gap-2"
              >
                <span>Browse Iconic Destinations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map((booking, idx) => (
              <div
                key={booking.id || idx}
                className="bg-white dark:bg-[#0D211E]/95 rounded-3xl border border-slate-200 dark:border-emerald-500/20 shadow-xl overflow-hidden backdrop-blur-xl transition hover:border-emerald-500/40"
              >
                {/* Trip Card Top Bar */}
                <div className="bg-slate-50 dark:bg-[#122A26] px-6 sm:px-8 py-4 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-extrabold uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {booking.status || 'CONFIRMED & ISSUED'}
                    </span>
                    <button
                      onClick={() => handleCopyId(booking.id)}
                      className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10"
                      title="Click to copy pass ID"
                    >
                      <span>PASS: {booking.id}</span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">{copiedId === booking.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      Trip Countdown: <strong className="text-slate-900 dark:text-white ml-1">Upcoming</strong>
                    </span>
                  </div>
                </div>

                {/* Main Content Body */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Details (8 Cols) */}
                    <div className="lg:col-span-8 space-y-6">
                      <div>
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                          {booking.destination || 'Uttarakhand Himalayan Circuit'}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                          {booking.packageTitle}
                        </h2>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Pickup: {booking.pickupLocation || 'Kathgodam / Haridwar Junction'}</span>
                        </p>
                      </div>

                      {/* Travel Specs Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs">
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Travel Dates</span>
                          <span className="font-bold text-slate-900 dark:text-white text-sm">
                            {booking.travelDate}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">to {booking.returnDate}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Party Size</span>
                          <span className="font-bold text-slate-900 dark:text-white text-sm">
                            {booking.travelers} Guests
                          </span>
                          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold block">All Passes Issued</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Mountain Stay</span>
                          <span className="font-bold text-slate-900 dark:text-white text-sm truncate block">
                            {booking.stayType}
                          </span>
                          <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold block">Solar Heated • Eco</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Total Paid</span>
                          <span className="font-extrabold text-amber-700 dark:text-amber-300 font-serif text-lg">
                            ₹{booking.totalPrice?.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Taxes & Permits Incl.</span>
                        </div>
                      </div>

                      {/* Artisan Workshop Add-on Badge */}
                      {booking.artisanWorkshop && booking.artisanWorkshop !== 'None' && (
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-950/60 dark:to-purple-950/60 border border-rose-300 dark:border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-rose-500/15 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 flex items-center justify-center text-lg font-bold">
                              🎨
                            </span>
                            <div>
                              <span className="text-rose-700 dark:text-rose-400 font-bold block text-[10px] uppercase">Included Master Artisan Studio Session</span>
                              <span className="text-slate-900 dark:text-white font-bold text-sm">{booking.artisanWorkshop}</span>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-rose-500/15 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-400/40 text-[10px] font-bold uppercase whitespace-nowrap">
                            Materials & Tools Pre-Allocated
                          </span>
                        </div>
                      )}

                      {/* Lead Coordinator / Guide Contact */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-lg font-bold">
                            🧭
                          </div>
                          <div>
                            <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block">Mountain Scout & Homestay Coordinator</span>
                            <span className="text-slate-900 dark:text-white font-bold text-sm">{booking.contactPerson || 'SwargBhraman Verified Field Host'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <a
                            href="tel:+919412048219"
                            className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call Host</span>
                          </a>
                          <a
                            href="https://wa.me/919412048219"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 border border-slate-200 dark:border-white/15"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Right Card: Digital QR Gate Pass & Actions (4 Cols) */}
                    <div className="lg:col-span-4 bg-slate-50 dark:bg-[#081715] p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center justify-between text-center">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2">
                          <QrCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Digital QR Boarding Pass</span>
                        </div>
                        
                        {/* QR Code Canvas Representation */}
                        <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 dark:border-transparent mx-auto my-3 inline-block">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=SWARGBHRAMAN-PASS-${booking.id}-${encodeURIComponent(booking.packageTitle)}`}
                            alt={`Pass QR Code for ${booking.id}`}
                            className="w-32 h-32 object-contain"
                          />
                        </div>

                        <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-1">
                          Pass Token: <strong className="text-amber-700 dark:text-amber-300">{booking.id}</strong>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 max-w-[200px] mx-auto">
                          Show this at forest entry gates, temple priority queues, and homestay reception.
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="w-full space-y-2 mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
                        <button
                          onClick={() => window.print()}
                          className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white rounded-xl font-bold transition flex items-center justify-center gap-2 border border-slate-200 dark:border-white/15"
                        >
                          <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Print Voucher / PDF</span>
                        </button>

                        <Link
                          to="/map"
                          className="w-full py-2.5 px-4 bg-emerald-600/10 hover:bg-emerald-600/20 dark:bg-emerald-600/30 dark:hover:bg-emerald-600/40 text-emerald-800 dark:text-emerald-300 rounded-xl font-bold transition flex items-center justify-center gap-2 border border-emerald-500/30"
                        >
                          <Navigation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>View GPS Traffic Route</span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>

                {/* High Altitude Safety Advice Footer */}
                <div className="bg-slate-100 dark:bg-black/40 px-6 sm:px-8 py-3.5 border-t border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Includes Uttarakhand Disaster Response (SDRF) emergency coverage and local mountain insurance.</span>
                  </div>
                  <div className="text-amber-700 dark:text-amber-300 font-semibold">
                    Packing: Warm windproof layers & sturdy footwear recommended
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Local Mountain Guides Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 dark:from-emerald-950/70 dark:via-teal-950/50 dark:to-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-2xl flex-shrink-0">
              🧭
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Need a Certified NIM Trek Leader or Wildlife Naturalist?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                Explore Uttarakhand safely with licensed native mountaineers from Joshimath, Corbett tiger trackers, and Kumaon heritage storytellers.
              </p>
            </div>
          </div>
          <Link
            to="/guides"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <span>View Mountain Guides</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 24x7 State Emergency Helpline Box */}
        <div className="mt-8 bg-white dark:bg-[#091513] rounded-2xl p-6 border border-slate-200 dark:border-white/10 text-xs shadow-md">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold mb-3 uppercase tracking-wider text-[11px]">
            <AlertTriangle className="w-4 h-4" />
            <span>24x7 Uttarakhand State Emergency & Mountain Helplines</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
              <strong className="text-slate-900 dark:text-white block">Uttarakhand Tourism Helpline</strong>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono text-sm block font-bold">1364 / 1800-180-4145</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Toll-free information & assistance</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
              <strong className="text-slate-900 dark:text-white block">SDRF Mountain Rescue Team</strong>
              <span className="text-rose-700 dark:text-rose-400 font-mono text-sm block font-bold">1070 / 112</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">State Disaster Response Force</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
              <strong className="text-slate-900 dark:text-white block">SwargBhraman Traveler Support</strong>
              <span className="text-amber-700 dark:text-amber-300 font-mono text-sm block font-bold">+91 94120 48219</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Direct concierge WhatsApp line</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
