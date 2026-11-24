import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Headphones, Send, ShieldCheck, Phone, AlertTriangle, CheckCircle2,
  Clock, MessageSquare, Compass, Sparkles, User, ArrowRight,
  RefreshCw, ChevronRight, HelpCircle, Shield, Radio, Check,
  Mail, MessageCircle, Copy
} from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { useAuth } from '../context/AuthContext';

const SUPPORT_CATEGORIES = [
  { id: 'Expedition & Booking', label: 'Expedition & Booking', icon: '🧭', desc: 'Tour packages, guide slots, high altitude passes' },
  { id: 'Weather & Road Advisory', label: 'Weather & Trail Alerts', icon: '⛅', desc: 'Snowfall, landslide routes, road clearance' },
  { id: 'District Haat Order', label: '13 Districts Haat Orders', icon: '🛍️', desc: 'Artisan craft parcels, SpeedPost delivery status' },
  { id: 'Emergency Mountain Dispatch', label: 'Emergency Rescue & Medical', icon: '🚨', desc: 'SDRF hotline, medical evacuation, urgent SOS' },
  { id: 'Char Dham Pilgrimage', label: 'Char Dham Pilgrimage', icon: '🛕', desc: 'Biometric pass, senior citizen assistance, helicopter' },
  { id: 'General Inquiry', label: 'General Assistance', icon: '💬', desc: 'Homestay inquiries, local culture, general help' }
];

export default function SupportPage() {
  const {
    tickets,
    currentCustomerTicketId,
    setCurrentCustomerTicketId,
    createTicket,
    sendCustomerMessage,
    sendAdminMessage,
    updateTicketStatus,
    markTicketReadByCustomer,
    markTicketReadByAdmin
  } = useSupport();

  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'new_ticket' | 'faq'
  const [selectedCategory, setSelectedCategory] = useState('Expedition & Booking');
  const [urgency, setUrgency] = useState('Normal');
  const [name, setName] = useState(currentUser?.displayName || currentUser?.name || '');
  const [contact, setContact] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [initialMsg, setInitialMsg] = useState('');
  const [replyInput, setReplyInput] = useState('');

  const chatEndRef = useRef(null);

  // Active ticket object
  const activeTicket = tickets.find(t => t.id === currentCustomerTicketId) || tickets[0];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (activeTicket) {
      if (isAdmin) {
        markTicketReadByAdmin?.(activeTicket.id);
      } else {
        markTicketReadByCustomer(activeTicket.id);
      }
    }
  }, [activeTicket?.messages?.length, activeTicket?.id, isAdmin]);

  // Handle creating new inquiry ticket
  const handleStartInquiry = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please provide your name so Admin can address you.');
      return;
    }
    if (!contact.trim()) {
      alert('Please provide your WhatsApp or phone number for direct contact.');
      return;
    }
    if (!initialMsg.trim()) {
      alert('Please describe your query or message.');
      return;
    }

    const created = createTicket({
      customerName: name,
      customerContact: contact,
      customerEmail: email,
      category: selectedCategory,
      urgency,
      initialMessage: initialMsg
    });

    setInitialMsg('');
    setActiveTab('chat');
  };

  // Handle sending reply (either Admin or Customer depending on auth role)
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeTicket) return;

    if (isAdmin) {
      sendAdminMessage(
        activeTicket.id,
        replyInput.trim(),
        currentUser?.name ? `${currentUser.name} (Master Admin)` : 'Priyanshu Singh Mahar (Master Admin)'
      );
    } else {
      sendCustomerMessage(
        activeTicket.id,
        replyInput.trim(),
        name || activeTicket.customerName || 'Traveler'
      );
    }
    setReplyInput('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600/15 via-teal-600/10 to-amber-500/15 dark:from-[#0B1528] dark:via-[#0E1F3D] dark:to-[#122A54] border border-emerald-500/30 dark:border-amber-500/30 p-6 sm:p-10 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <Headphones className="w-3.5 h-3.5 animate-bounce text-emerald-500" />
              <span>Devbhoomi 24x7 Traveler Command Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-serif">
              Help Support / Help Desk
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Connect directly with SwargBhraman Command Chief and certified Himalayan mountain dispatchers. We provide 3 direct channels for instant resolution: Live Chat, WhatsApp Hotline, and Dedicated Mail Desk.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Admin On Duty: Priyanshu Singh Mahar</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>Avg Response: &lt; 3 mins</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>End-to-End Verified Mountain Support</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3 Prominent Contact Channels (Mail, WhatsApp, Live Chat) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Channel 1: Live Chat */}
          <div
            onClick={() => setActiveTab('chat')}
            className={`p-5 rounded-3xl border transition cursor-pointer shadow-md ${
              activeTab === 'chat'
                ? 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/30'
                : 'bg-white dark:bg-[#0E1627] border-slate-200 dark:border-white/10 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Now
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">1. Live Chat with Admin</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              Instant real-time bidirectional messaging with SwargBhraman Admin Master & Lead Guides.
            </p>
            <div className="mt-3 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <span>Open Chat Thread</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Channel 2: WhatsApp Desk */}
          <a
            href="https://wa.me/919528731865?text=Namaste%20SwargBhraman%20Help%20Desk!%20I%20need%20assistance%20regarding%20my%20Devbhoomi%20travel."
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-white dark:bg-[#0E1627] border border-slate-200 dark:border-white/10 hover:border-emerald-500 transition shadow-md group block"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase">
                WhatsApp 24x7
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">2. Connect to WhatsApp</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              Chat directly on WhatsApp (+91 9528731865) for route clearance, permits & fast coordination.
            </p>
            <div className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>Launch WhatsApp Chat</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </a>

          {/* Channel 3: Email Help Desk */}
          <a
            href="mailto:priyanshu.meher88@gmail.com?subject=SwargBhraman%20Traveler%20Support%20Inquiry&body=Namaste%20Help%20Desk,%0A%0AMy%20Name:%20%0APhone:%20%0AInquiry:%20"
            className="p-5 rounded-3xl bg-white dark:bg-[#0E1627] border border-slate-200 dark:border-white/10 hover:border-sky-500 transition shadow-md group block"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-500 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Mail className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-400 text-[10px] font-black uppercase font-mono">
                priyanshu.meher88@gmail.com
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">3. Mail to Support</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              Official email channel for group tour proposals, custom circuits & payment queries (priyanshu.meher88@gmail.com).
            </p>
            <div className="mt-3 text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
              <span>Send Official Email</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </a>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Active Live Chat ({activeTicket ? activeTicket.id : 'None'})</span>
            {activeTicket?.status === 'ACTIVE' && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('new_ticket')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'new_ticket'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New Inquiry / Emergency SOS</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === 'faq'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Helplines & FAQs</span>
          </button>
        </div>

        {/* ============================================================= */}
        {/* TAB 1: ACTIVE LIVE CHAT                                       */}
        {/* ============================================================= */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Traveler's Previous / Active Inquiries */}
            <div className="lg:col-span-1 bg-white dark:bg-[#0E1627] rounded-3xl p-5 border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-500" />
                  <span>{isAdmin ? 'All Traveler Inquiries' : 'Your Support Tickets'}</span>
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">
                  {tickets.length} {isAdmin ? 'Total' : 'Registered'}
                </span>
              </div>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {tickets.map(t => {
                  const isCurrent = t.id === activeTicket?.id;
                  const lastMsg = t.messages[t.messages.length - 1];
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setCurrentCustomerTicketId(t.id);
                        if (isAdmin) {
                          markTicketReadByAdmin?.(t.id);
                        } else {
                          markTicketReadByCustomer(t.id);
                        }
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                        isCurrent
                          ? 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 shadow-sm'
                          : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black font-mono text-amber-600 dark:text-amber-400">
                          {t.id}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          t.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                            : t.status === 'IN_PROGRESS'
                            ? 'bg-sky-500/20 text-sky-700 dark:text-sky-400'
                            : 'bg-slate-500/20 text-slate-600 dark:text-slate-400'
                        }`}>
                          {t.status}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                        {isAdmin ? `${t.customerName} • ${t.category}` : t.category}
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {lastMsg?.text || 'No messages yet'}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 pt-2 border-t border-slate-200 dark:border-white/5">
                        <span>Lead: {t.assignedTo?.split(' ')[0]}</span>
                        <span>{lastMsg?.timestamp || ''}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!isAdmin && (
                <button
                  onClick={() => setActiveTab('new_ticket')}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition flex items-center justify-center gap-1.5"
                >
                  <span>+ Ask a Different Query</span>
                </button>
              )}
            </div>

            {/* Right Col: Live Chat Stream & Direct Admin Communication */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0E1627] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg flex flex-col h-[650px] overflow-hidden">
              
              {/* Chat Thread Header */}
              {activeTicket ? (
                <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1120] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-500/30 shrink-0">
                      {isAdmin ? '👑' : '🛡️'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {isAdmin ? `Traveler: ${activeTicket.customerName}` : 'SwargBhraman Admin Command Desk'}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Connected
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {isAdmin ? (
                          <>
                            Contact: <a href={`tel:${activeTicket.customerContact}`} className="text-amber-600 dark:text-amber-400 font-bold hover:underline">{activeTicket.customerContact}</a> • Ticket: <span className="font-mono font-bold">{activeTicket.id}</span>
                          </>
                        ) : (
                          <>
                            Assigned Officer: <span className="text-amber-600 dark:text-amber-400 font-bold">{activeTicket.assignedTo}</span> • Ticket: <span className="font-mono font-bold">{activeTicket.id}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Admin Status Controls or Category Badge */}
                  <div className="flex items-center gap-2">
                    {isAdmin ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Status:</span>
                        <select
                          value={activeTicket.status}
                          onChange={(e) => updateTicketStatus(activeTicket.id, e.target.value)}
                          className="text-xs font-bold px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:ring-1 focus:ring-amber-500 cursor-pointer"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                      </div>
                    ) : (
                      <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Category</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{activeTicket.category}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">No active ticket selected</div>
              )}

              {/* Chat Message Scrollable Stream */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-[#080D1A]/70">
                {activeTicket?.messages && activeTicket.messages.length > 0 ? (
                  activeTicket.messages.map(msg => {
                    const isSenderAdmin = msg.sender === 'admin';
                    const isSelf = isAdmin ? isSenderAdmin : !isSenderAdmin;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                            {msg.senderName}
                          </span>
                          {isSenderAdmin && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[9px] font-black uppercase tracking-wider border border-amber-500/30">
                              Admin
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">
                            {msg.timestamp}
                          </span>
                        </div>

                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                            isSelf
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-medium rounded-tr-sm'
                              : 'bg-white dark:bg-[#131D33] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-amber-500/30 rounded-tl-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <MessageSquare className="w-10 h-10 text-amber-500/40 mb-2" />
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300">No messages in this inquiry yet.</p>
                    <p className="text-xs text-slate-400 mt-1">Send a message below to connect immediately.</p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Reply Input Bar */}
              {activeTicket ? (
                <div className="bg-white dark:bg-[#0B1120] border-t border-slate-200 dark:border-white/10 p-3 sm:p-4 space-y-2">
                  {/* Admin Quick Replies */}
                  {isAdmin && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Quick Replies:</span>
                      {[
                        'Namaste! Your expedition slot is confirmed.',
                        'Trail & weather cleared for safe travel.',
                        'Connecting you directly with local NIM squad leader.'
                      ].map((quickText, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setReplyInput(quickText)}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-white/10 transition"
                        >
                          {quickText}
                        </button>
                      ))}
                    </div>
                  )}

                  <form
                    onSubmit={handleSendReply}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder={isAdmin ? `Type official response to ${activeTicket.customerName} as Master Admin...` : "Type your message to SwargBhraman Admin..."}
                      className="flex-1 bg-slate-100 dark:bg-[#080D1A] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
                    />
                    <button
                      type="submit"
                      disabled={!replyInput.trim()}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      <span>{isAdmin ? 'Reply as Admin' : 'Send'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ) : null}

            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 2: CREATE NEW INQUIRY / EMERGENCY SOS                     */}
        {/* ============================================================= */}
        {activeTab === 'new_ticket' && (
          <div className="bg-white dark:bg-[#0E1627] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-xl max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Direct Admin Routing</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Initiate a Traveler Support Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Your request goes straight to the Admin Command Desk. You will immediately be connected to a live chat thread.
              </p>
            </div>

            <form onSubmit={handleStartInquiry} className="space-y-6">
              
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Select Assistance Category *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUPPORT_CATEGORIES.map(cat => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 shadow-sm ring-1 ring-amber-500'
                          : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{cat.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{cat.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency Toggle */}
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Inquiry Urgency
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency('Normal')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition ${
                      urgency === 'Normal'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-300'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Standard Question (Booking / Route advice)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('Emergency')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                      urgency === 'Emergency'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-400'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                    <span>🚨 Urgent / Stranded on Trail</span>
                  </button>
                </div>
              </div>

              {/* Traveler Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-slate-50 dark:bg-[#080D1A] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. +91 98234 56789"
                    className="w-full bg-slate-50 dark:bg-[#080D1A] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. traveler@example.com"
                  className="w-full bg-slate-50 dark:bg-[#080D1A] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  How can Admin assist you today? *
                </label>
                <textarea
                  rows={4}
                  required
                  value={initialMsg}
                  onChange={(e) => setInitialMsg(e.target.value)}
                  placeholder="Please describe your question, required dates, tour plan, or urgent mountain assistance..."
                  className="w-full bg-slate-50 dark:bg-[#080D1A] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Connect Directly to Admin Command Desk ⚡</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 3: HELPLINES & FAQS                                       */}
        {/* ============================================================= */}
        {activeTab === 'faq' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Government & Emergency Helplines */}
            <div className="bg-white dark:bg-[#0E1627] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <h3 className="text-base font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>Uttarakhand 24x7 Emergency Hotlines</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                In case of extreme network cutoffs or immediate distress in high altitude ridges, dial these toll-free government hotlines directly:
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">State Disaster Response Force (SDRF)</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Flood, Avalanche & Landslide Rescue</div>
                  </div>
                  <a href="tel:1070" className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs">
                    1070 / 1077
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Police & Emergency SOS</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">All 13 districts national dial</div>
                  </div>
                  <a href="tel:112" className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs">
                    112
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Uttarakhand Tourism Helpline</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Char Dham & Pass Information</div>
                  </div>
                  <a href="tel:1364" className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs">
                    1364
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Mountain Medical Ambulance</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Emergency paramedical transit</div>
                  </div>
                  <a href="tel:108" className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs">
                    108
                  </a>
                </div>
              </div>
            </div>

            {/* Support Protocols & FAQs */}
            <div className="bg-white dark:bg-[#0E1627] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Support Guarantee & Protocols</span>
              </h3>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">How does Admin Direct Chat work?</div>
                  <p>When you submit a ticket or message, it flashes immediately on the Master Admin Command Desk. The Admin or a designated departmental specialist will reply directly into your live thread.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">Can other support staff handle my query?</div>
                  <p>Yes. The Master Admin has the authority to assign specialized team members (such as Lead Mountain Guides, Char Dham Coordinators, or Haat Order Managers) to resolve technical requirements swiftly.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">What if I am already on a mountain trail?</div>
                  <p>Mark your inquiry urgency as "🚨 Urgent / Stranded". Our emergency dispatchers verify GPS coordinates and liaise with local forest stations and SDRF outposts immediately.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
