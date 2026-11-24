import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Headphones, MessageSquare, X, Send, ShieldCheck, Sparkles,
  ExternalLink, Mail, Phone, Copy, Check, MessageCircle, AlertTriangle
} from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { useAuth } from '../context/AuthContext';

export default function CustomerSupportWidget() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const {
    tickets,
    currentCustomerTicketId,
    sendCustomerMessage,
    createTicket,
    markTicketReadByCustomer
  } = useSupport();

  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [activeChannelTab, setActiveChannelTab] = useState('chat'); // 'chat' | 'mail' | 'whatsapp'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const activeTicket = tickets.find(t => t.id === currentCustomerTicketId) || tickets[0];
  const hasUnread = activeTicket?.unreadByCustomer;

  const chatEndRef = useRef(null);

  const isDedicatedSupportPage = location.pathname === '/support' || location.pathname === '/customer-support';
  const isAdminPortal = location.pathname.startsWith('/portal/admin') || location.pathname.startsWith('/admin');
  const isAdminUser = currentUser?.role === 'admin';

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (isOpen && activeTicket) {
      markTicketReadByCustomer(activeTicket.id);
    }
  }, [isOpen, activeTicket?.messages?.length]);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('priyanshu.meher88@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendQuickReply = (e) => {
    e.preventDefault();
    if (!quickMessage.trim()) return;

    if (!activeTicket) {
      createTicket({
        customerName: 'Valued Traveler',
        customerContact: '+91 98000 00000',
        category: 'General Inquiry',
        urgency: 'Normal',
        initialMessage: quickMessage.trim()
      });
      setQuickMessage('');
    } else {
      sendCustomerMessage(
        activeTicket.id,
        quickMessage.trim(),
        activeTicket.customerName || 'Traveler'
      );
      setQuickMessage('');
    }
  };

  // Do NOT render the Help Support widget on support page, admin portal, or for admin users!
  // (Admin provides support, they do not need customer support widget)
  if (isDedicatedSupportPage || isAdminPortal || isAdminUser) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      
      {/* Popover Support Card / Chat Drawer */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] max-h-[580px] bg-white dark:bg-[#0A1122] rounded-3xl border border-slate-300 dark:border-amber-500/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 text-slate-900 dark:text-white">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-black/20 text-white">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  Help Support / Help Desk
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                  <span>24x7 Traveler Command Desk • Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                to="/support"
                onClick={() => setIsOpen(false)}
                title="Open Fullscreen Help Desk"
                className="p-1.5 rounded-xl hover:bg-white/20 text-white transition"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* 3 Direct Contact Options (Mail, WhatsApp, Live Chat) */}
          <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-100 dark:bg-[#070D1A] border-b border-slate-200 dark:border-white/10 text-[11px]">
            <button
              onClick={() => setActiveChannelTab('chat')}
              className={`py-2 px-1.5 rounded-xl font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                activeChannelTab === 'chat'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                  : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="truncate">Live Chat</span>
            </button>

            <a
              href="https://wa.me/919528731865?text=Namaste%20Priyanshu!%20I%20need%20assistance%20regarding%20my%20Devbhoomi%20travel%20on%20SwargBhraman."
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-1.5 rounded-xl font-bold flex flex-col items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 transition text-center cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span className="truncate text-emerald-900 dark:text-emerald-200 font-bold">WhatsApp</span>
            </a>

            <button
              onClick={() => setActiveChannelTab('mail')}
              className={`py-2 px-1.5 rounded-xl font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
                activeChannelTab === 'mail'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                  : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate">Mail Desk</span>
            </button>
          </div>

          {/* CHANNEL VIEW: MAIL OPTION */}
          {activeChannelTab === 'mail' && (
            <div className="p-5 space-y-4 bg-slate-50 dark:bg-[#080E1C] flex-1 overflow-y-auto">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white font-serif">Official Mail Help Desk</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">Direct inquiries to Priyanshu Meher (SwargBhraman Executive Support)</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D162B] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Official Support Email</div>
                  <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 select-all">priyanshu.meher88@gmail.com</div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <a
                href="mailto:priyanshu.meher88@gmail.com?subject=SwargBhraman%20Traveler%20Support%20Inquiry&body=Namaste%20Priyanshu,%0A%0AMy%20Name:%20%0APhone:%20%0AMy%20Inquiry%20regarding%20Devbhoomi%20Tour%20Plan:%20"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Open Mail App / Compose Inquiry ✉️</span>
              </a>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                Response SLA: Within 1-2 hours during mountain business hours.
              </div>
            </div>
          )}

          {/* CHANNEL VIEW: LIVE CHAT WITH ADMIN */}
          {activeChannelTab === 'chat' && (
            <>
              {/* Ticket Status Bar */}
              <div className="px-4 py-2 bg-slate-100 dark:bg-[#080D1A] border-b border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 dark:text-slate-400">
                  Live Ticket: <strong className="text-amber-600 dark:text-amber-400 font-mono">{activeTicket ? activeTicket.id : 'Ready'}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Admin On Duty</span>
                </span>
              </div>

              {/* Messages Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[280px] bg-slate-50/50 dark:bg-[#070D18]">
                {activeTicket?.messages && activeTicket.messages.length > 0 ? (
                  activeTicket.messages.map(msg => {
                    const isAdmin = msg.sender === 'admin';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{msg.senderName}</span>
                          {isAdmin && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/25 text-amber-900 dark:text-amber-300 font-black text-[8px] uppercase border border-amber-500/40">
                              Admin Verified
                            </span>
                          )}
                          <span>•</span>
                          <span className="text-slate-500 dark:text-slate-400 font-medium">{msg.timestamp}</span>
                        </div>
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                            isAdmin
                              ? 'bg-white dark:bg-[#121B2F] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-amber-500/30'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-medium'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-slate-400 space-y-1">
                    <MessageSquare className="w-8 h-8 mx-auto text-amber-500/40" />
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Direct Admin Channel</p>
                    <p className="text-[11px]">Type below to chat directly with SwargBhraman Admin Master.</p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Reply Form */}
              <form
                onSubmit={handleSendQuickReply}
                className="p-3 bg-white dark:bg-[#0A1122] border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  placeholder="Ask Admin a question..."
                  className="flex-1 bg-slate-100 dark:bg-[#070D1A] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={!quickMessage.trim()}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}

          {/* Quick Footer */}
          <div className="px-4 py-2 bg-slate-100 dark:bg-[#070B14] border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
            <span>24x7 Helplines: 1364 / 112 / 108</span>
            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
            >
              Full Help Desk Portal →
            </Link>
          </div>

        </div>
      )}

      {/* Floating Trigger Button at bottom-4 right-4 sm:bottom-6 sm:right-6 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-black text-xs shadow-2xl shadow-emerald-950/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40"
        title="Help Support / Help Desk (Live Chat, WhatsApp, Mail)"
        aria-label="Help Support Desk"
      >
        <div className="relative flex items-center justify-center">
          <Headphones className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        </div>
        <span className="font-bold hidden sm:inline">Help Support</span>
        {hasUnread && (
          <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-black animate-bounce">
            NEW
          </span>
        )}
      </button>

    </div>
  );
}
