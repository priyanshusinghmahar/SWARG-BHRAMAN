import React, { useState, useEffect } from 'react';
import { 
  Calendar, Radio, MapPin, Users, Ticket, Bell, Sparkles, 
  ExternalLink, Play, CheckCircle, Volume2, VolumeX, Flame, 
  Send, Heart, Clock, ShieldCheck, Share2 
} from 'lucide-react';

export default function LiveUpcomingEvents({ events, onLocateOnMap, onBookEventPass }) {
  const [filterType, setFilterType] = useState('all');
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const [remindedEvents, setRemindedEvents] = useState({});
  const [selectedStreamId, setSelectedStreamId] = useState('triveni');
  
  // Interactive Live Devotion State
  const [diyaCount, setDiyaCount] = useState(4820);
  const [petalsActive, setPetalsActive] = useState(false);
  const [floatingDiyas, setFloatingDiyas] = useState([]);
  const [prayerText, setPrayerText] = useState('');
  const [userPrayers, setUserPrayers] = useState([
    { name: 'Priyanshu (Dehradun)', message: 'Har Har Gange! Blessings for health and peace.', time: 'Just now' },
    { name: 'Sunita Rawat (Almora)', message: 'Jai Badri Vishal! Om Namah Shivaya.', time: '1m ago' },
    { name: 'Rahul Sharma (Delhi)', message: 'Praying for family prosperity from Delhi.', time: '2m ago' },
    { name: 'Meenakshi (Rishikesh)', message: 'Beautiful divine energy this evening at the ghat.', time: '3m ago' }
  ]);
  const [bellRinging, setBellRinging] = useState(false);

  // Live Feeds Data
  const LIVE_STREAMS = [
    {
      id: 'triveni',
      name: 'Maha Ganga Aarti • Triveni Ghat',
      location: 'Triveni Ghat, Rishikesh',
      time: 'Daily 6:15 PM IST',
      viewers: '5,140 Devotees Live',
      chant: 'Om Jai Gange Mata & Vedic Rudrashtakam',
      bgImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      badge: 'Live Evening Aarti'
    },
    {
      id: 'harkipauri',
      name: 'Har Ki Pauri Deepdaan Aarti',
      location: 'Har Ki Pauri, Haridwar',
      time: 'Daily 6:30 PM IST',
      viewers: '7,890 Devotees Live',
      chant: 'Maha Aarti of Ganga Maiya with 108 Brass Torches',
      bgImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      badge: 'Haridwar Sanctum Live'
    },
    {
      id: 'kedarnath',
      name: 'Kedarnath Dham Peak Cam & Evening Dhoop',
      location: 'Kedarnath Valley (3,584m)',
      time: 'Sunset Prayers 6:00 PM IST',
      viewers: '4,220 Devotees Live',
      chant: 'Kedarnath Shivalinga Abhishek & Conch Resonance',
      bgImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
      badge: 'High Himalaya Live Cam'
    },
    {
      id: 'badrinath',
      name: 'Badrinath Temple Alaknanda Sanctum Chants',
      location: 'Badrinath Dham (3,133m)',
      time: 'Maha Sandhya Darshan 6:45 PM',
      viewers: '3,810 Devotees Live',
      chant: 'Vishnu Sahasranama Chanting & Shaligram Puja',
      bgImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      badge: 'Badrinath Valley'
    }
  ];

  const currentStream = LIVE_STREAMS.find(s => s.id === selectedStreamId) || LIVE_STREAMS[0];

  // Web Audio API Synthesizer for Authentic Bronze Temple Bell & Conch Sound
  const playSacredTempleBell = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      setBellRinging(true);
      setTimeout(() => setBellRinging(false), 1200);

      // Multi-harmonic bell strike simulation
      const fundamental = 587.33; // D5 pitch
      const harmonics = [1, 2.76, 5.4, 8.9];
      const gains = [0.6, 0.4, 0.2, 0.1];

      harmonics.forEach((h, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * h, ctx.currentTime);

        // Exponential decay envelope
        gainNode.gain.setValueAtTime(gains[idx] * 0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.2);
      });
    } catch (e) {
      console.warn('Audio synthesis not permitted or supported:', e);
    }
  };

  const handleOfferDiya = () => {
    setDiyaCount(prev => prev + 1);
    const newDiya = {
      id: Date.now(),
      left: Math.floor(Math.random() * 80) + 10,
      size: Math.floor(Math.random() * 10) + 20
    };
    setFloatingDiyas(prev => [...prev.slice(-6), newDiya]);
    playSacredTempleBell();
  };

  const handleShowerPetals = () => {
    setPetalsActive(true);
    playSacredTempleBell();
    setTimeout(() => setPetalsActive(false), 3000);
  };

  const handleSendPrayer = (e) => {
    e.preventDefault();
    if (!prayerText.trim()) return;
    setUserPrayers([
      { name: 'You (Devotee)', message: prayerText, time: 'Just now' },
      ...userPrayers
    ]);
    setPrayerText('');
  };

  const handleToggleReminder = (evtId) => {
    setRemindedEvents(prev => ({
      ...prev,
      [evtId]: !prev[evtId]
    }));
  };

  const filteredEvents = events.filter(evt => {
    if (filterType === 'live') return evt.isLive;
    if (filterType === 'upcoming') return !evt.isLive;
    return true;
  });

  return (
    <section id="events-section" className="py-16 bg-[#07110F] text-white relative overflow-hidden">
      {/* Decorative Aurora Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold tracking-wide uppercase mb-3">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              Devbhoomi Cultural & Spiritual Calendar
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              Live Ceremonies & Sacred Fairs
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Experience transcendental live evening Ganga Aarti broadcasts, offer virtual diyas, ring sacred temple bells, or reserve VIP ghat passes for centuries-old Himalayan melas.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#0C1E1B] p-1.5 rounded-2xl border border-white/10 self-start md:self-auto shadow-inner">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filterType === 'all' 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md border border-emerald-400/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setFilterType('live')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                filterType === 'live' 
                  ? 'bg-rose-600 text-white shadow-md' 
                  : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>Live Streams (4)</span>
            </button>
            <button
              onClick={() => setFilterType('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                filterType === 'upcoming' 
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' 
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <span>Upcoming Fairs</span>
            </button>
          </div>
        </div>

        {/* Featured Live Stream Broadcast Console */}
        <div className="mb-14 bg-gradient-to-br from-[#0E2521] via-[#0A1A18] to-[#071311] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Channel Selector Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/10 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2 whitespace-nowrap">
              <Radio className="w-3.5 h-3.5 text-rose-400" />
              Live Feeds:
            </span>
            {LIVE_STREAMS.map(stream => (
              <button
                key={stream.id}
                onClick={() => setSelectedStreamId(stream.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
                  selectedStreamId === stream.id
                    ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md border border-rose-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>{stream.name.split('•')[0]}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Live Video Player Card */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-video bg-black border border-emerald-500/30 group shadow-2xl">
              <img
                src={currentStream.bgImage}
                alt={currentStream.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-85"
              />
              
              {/* Overlay Gradient & Stream Status */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 flex flex-col justify-between p-4 sm:p-5">
                
                {/* Top Badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-white" />
                      LIVE FEED
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      ● {currentStream.viewers}
                    </span>
                  </div>
                  <span className="text-[10px] bg-black/70 px-2 py-0.5 rounded text-amber-300 font-mono border border-white/10">
                    1080p HD • 60fps
                  </span>
                </div>

                {/* Central Play / Interactive Action Center */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideoModal(true)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-rose-500 hover:scale-110 text-white flex items-center justify-center shadow-2xl transition duration-300 ring-4 ring-rose-500/30 group-hover:ring-rose-400"
                    title="Click to expand full live broadcast"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
                  </button>
                </div>

                {/* Floating Animated Diyas Canvas Simulation */}
                {floatingDiyas.map(diya => (
                  <div
                    key={diya.id}
                    style={{ left: `${diya.left}%`, bottom: '22%' }}
                    className="absolute animate-bounce text-xl pointer-events-none drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                  >
                    🪔
                  </div>
                ))}

                {/* Flower Petals Shower Simulation */}
                {petalsActive && (
                  <div className="absolute inset-0 pointer-events-none flex justify-around overflow-hidden animate-in fade-in">
                    {['🌸', '🌺', '🌼', '🌸', '🌺', '🌼'].map((p, i) => (
                      <span key={i} className="text-2xl animate-pulse" style={{ animationDuration: `${0.8 + i * 0.2}s` }}>
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom Stream Bar */}
                <div className="bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="font-bold font-serif truncate text-amber-300">
                      {currentStream.name}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      {currentStream.time}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 truncate mt-0.5">
                    Chanting: <em>"{currentStream.chant}"</em>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Devotion & Prayer Console */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Sacred Ritual & Virtual Darshan
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                  {currentStream.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Connect live to holy chants, ringing bells, and the holy resonance of Devbhoomi. Participate from anywhere in the world by offering virtual diyas, sounding sacred temple bells, and submitting prayers.
                </p>
              </div>

              {/* Devotional Actions Bar */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <button
                  onClick={handleOfferDiya}
                  className="p-3 bg-gradient-to-b from-amber-950/70 to-amber-900/40 hover:from-amber-900/80 hover:to-amber-800/60 border border-amber-500/40 rounded-2xl text-center transition group active:scale-95"
                >
                  <div className="text-2xl mb-1 group-hover:scale-125 transition">🪔</div>
                  <div className="text-xs font-bold text-amber-300">Offer Diya</div>
                  <div className="text-[10px] text-slate-300">{diyaCount} Offered</div>
                </button>

                <button
                  onClick={playSacredTempleBell}
                  className={`p-3 bg-gradient-to-b from-emerald-950/70 to-teal-900/40 hover:from-emerald-900/80 hover:to-teal-800/60 border border-emerald-500/40 rounded-2xl text-center transition group active:scale-95 ${
                    bellRinging ? 'ring-2 ring-emerald-400 scale-95' : ''
                  }`}
                >
                  <div className="text-2xl mb-1 group-hover:scale-125 transition">🔔</div>
                  <div className="text-xs font-bold text-emerald-300">Temple Bell</div>
                  <div className="text-[10px] text-slate-300">Play Sacred Chime</div>
                </button>

                <button
                  onClick={handleShowerPetals}
                  className="p-3 bg-gradient-to-b from-rose-950/70 to-pink-900/40 hover:from-rose-900/80 hover:to-pink-800/60 border border-rose-500/40 rounded-2xl text-center transition group active:scale-95"
                >
                  <div className="text-2xl mb-1 group-hover:scale-125 transition">🌸</div>
                  <div className="text-xs font-bold text-rose-300">Offer Petals</div>
                  <div className="text-[10px] text-slate-300">Marigold & Rose</div>
                </button>
              </div>

              {/* Live Devotee Prayer Wall Ticker */}
              <div className="p-3.5 bg-black/40 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                    <span>💬</span>
                    <span>Live Devotee Prayer Wall</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Live Sync</span>
                </div>

                <div className="h-20 overflow-y-auto space-y-2 pr-1 text-[11px] scrollbar-thin">
                  {userPrayers.slice(0, 4).map((p, i) => (
                    <div key={i} className="p-2 bg-white/5 rounded-xl border border-white/5 flex items-start justify-between gap-2">
                      <div>
                        <strong className="text-amber-300">{p.name}: </strong>
                        <span className="text-slate-200">{p.message}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 whitespace-nowrap">{p.time}</span>
                    </div>
                  ))}
                </div>

                {/* Submit Prayer Input */}
                <form onSubmit={handleSendPrayer} className="mt-2.5 flex gap-2">
                  <input
                    type="text"
                    value={prayerText}
                    onChange={(e) => setPrayerText(e.target.value)}
                    placeholder="Type your prayer or chant (e.g. Har Har Mahadev)..."
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </button>
                </form>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => setActiveVideoModal(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Full Screen Broadcast</span>
                </button>
                
                <button
                  onClick={() => onBookEventPass({
                    title: `VIP Ghat Seating: ${currentStream.name}`,
                    location: currentStream.location,
                    date: 'Today Evening Reserved Seating',
                    price: 250
                  })}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Reserve VIP Ghat Pass (₹250)</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Filtered Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(evt => {
            const isReminded = remindedEvents[evt.id];

            return (
              <div
                key={evt.id}
                className="bg-[#0C1E1B] rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Event Cover Image */}
                  <div className="relative h-52 bg-black overflow-hidden">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E1B] via-transparent to-black/40" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/30">
                        {evt.badge}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        evt.isLive
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {evt.status}
                      </span>
                    </div>

                    {/* Date Tag */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date}</span>
                      </div>
                      <h3 className="font-bold text-white text-lg font-serif leading-snug drop-shadow">
                        {evt.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{evt.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {evt.description}
                    </p>

                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-[11px] space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Organizer:</span>
                        <span className="text-slate-200 font-medium truncate max-w-[170px]">{evt.organizer}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Access / Pass:</span>
                        <span className="text-emerald-300 font-bold">{evt.entry}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => handleToggleReminder(evt.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center ${
                      isReminded
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={isReminded ? 'Reminder set' : 'Remind me before event'}
                  >
                    <Bell className={`w-4 h-4 ${isReminded ? 'fill-white' : ''}`} />
                  </button>

                  <button
                    onClick={() => onBookEventPass({
                      title: evt.title,
                      location: evt.location,
                      date: evt.date,
                      price: evt.entry.includes('Free') ? 0 : 1500
                    })}
                    className="flex-1 py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{evt.isLive ? 'VIP Seating Pass' : 'Book Fair Pass / Stay'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Expanded Broadcast Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="bg-[#0C1E1B] border border-amber-500/40 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative text-white">
            <button
              onClick={() => setActiveVideoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold bg-white/10 w-9 h-9 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Full Live Stream Broadcast • {currentStream.location}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mb-4">
              {currentStream.name}
            </h3>

            {/* Video Player Frame with visualizer */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-inner flex items-center justify-center">
              <img
                src={currentStream.bgImage}
                alt={currentStream.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
                      LIVE
                    </span>
                    <span>Chanting: "{currentStream.chant}"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">● {currentStream.viewers}</span>
                    <span>1080p 60fps</span>
                  </div>
                </div>
                
                {/* Visualizer bars */}
                <div className="flex items-end gap-1 h-6 mt-3">
                  {[40, 70, 90, 50, 80, 100, 60, 45, 95, 75, 85, 40, 65, 90, 100, 70, 50, 85, 95, 60, 80, 90, 65, 45].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Devotion Actions */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOfferDiya}
                  className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl font-bold flex items-center gap-1.5"
                >
                  <span>🪔</span>
                  <span>Offer Diya ({diyaCount})</span>
                </button>
                <button
                  onClick={playSacredTempleBell}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold flex items-center gap-1.5"
                >
                  <span>🔔</span>
                  <span>Ring Bell</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveVideoModal(false);
                    onBookEventPass({
                      title: `VIP Ghat Pass: ${currentStream.name}`,
                      location: currentStream.location,
                      date: 'Today Evening Reserved Seating',
                      price: 250
                    });
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl font-bold transition shadow"
                >
                  Reserve VIP Seating Pass
                </button>
                <button
                  onClick={() => setActiveVideoModal(false)}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
