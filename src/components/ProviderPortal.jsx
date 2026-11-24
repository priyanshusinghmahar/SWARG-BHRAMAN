import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Store, Package, Calendar, Phone, MessageSquare, DollarSign,
  CheckCircle, ShieldCheck, TrendingUp, Sparkles, Plus, Search,
  Filter, Tag, Edit, Trash2, ArrowUpRight, Clock, AlertTriangle,
  QrCode, Printer, CheckCircle2, XCircle, Send, ExternalLink,
  ChevronDown, ChevronRight, Award, MapPin, Compass, Mountain,
  Users, RefreshCw, Layers, Check, ShoppingBag, Eye, Zap, AlertCircle,
  Bell, BellRing, HelpCircle, ShieldAlert, LifeBuoy, X, UploadCloud, Upload, Camera
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useSupport } from '../context/SupportContext';
import EmptyState from './EmptyState';

import {
  GUIDE_PROFILES,
  VENDOR_PROFILES,
  SHOP_PROFILES,
  INITIAL_GUIDE_OFFERINGS,
  INITIAL_VENDOR_OFFERINGS,
  INITIAL_ADMIN_NOTIFICATIONS,
  INITIAL_PROVIDER_BOOKINGS,
  INITIAL_PROVIDER_REVIEWS,
  INITIAL_PAYOUT_RECORDS,
  SEASONAL_PRICING_TIERS
} from '../data/providerPortalData';

export default function ProviderPortal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { tickets, createTicket, sendCustomerMessage } = useSupport();

  // Detect query param role or logged in role: '?role=guide' or '?role=vendor'
  const queryParams = new URLSearchParams(location.search);
  const initialRoleParam = queryParams.get('role');

  // Active Provider Category: 'guide' | 'artisan' | 'shop' (or 'vendor')
  const [providerType, setProviderType] = useState(() => {
    if (initialRoleParam === 'guide' || currentUser?.role === 'guide') return 'guide';
    if (initialRoleParam === 'shop' || currentUser?.role === 'shop') return 'shop';
    if (initialRoleParam === 'vendor' || initialRoleParam === 'artisan' || currentUser?.role === 'vendor' || currentUser?.role === 'artisan') return 'artisan';
    return 'guide';
  });

  // Active Persona IDs
  const [selectedGuideId, setSelectedGuideId] = useState('guide-arjun');
  const [selectedVendorId, setSelectedVendorId] = useState('vendor-meenakshi');
  const [selectedShopId, setSelectedShopId] = useState('shop-ramesh');

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Live Availability Status
  const [isLiveOpen, setIsLiveOpen] = useState(true);

  // Offerings State
  const [guideOfferings, setGuideOfferings] = useState(INITIAL_GUIDE_OFFERINGS);
  const [vendorOfferings, setVendorOfferings] = useState(INITIAL_VENDOR_OFFERINGS);

  // Bookings / Reservations State
  const [bookings, setBookings] = useState(INITIAL_PROVIDER_BOOKINGS);

  // Customer Reviews State
  const [reviews, setReviews] = useState(INITIAL_PROVIDER_REVIEWS);

  // Payout Settlements State
  const [payouts, setPayouts] = useState(INITIAL_PAYOUT_RECORDS);

  // Admin Broadcast Notifications State (with localStorage persistence)
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_admin_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ADMIN_NOTIFICATIONS;
  });

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState('all');

  // Admin Contact Modal State
  const [adminContactModalOpen, setAdminContactModalOpen] = useState(false);
  const [adminQueryTopic, setAdminQueryTopic] = useState('Permit & Forest Clearance');
  const [adminQuerySubject, setAdminQuerySubject] = useState('');
  const [adminQueryMessage, setAdminQueryMessage] = useState('');
  const [adminPriority, setAdminPriority] = useState('Normal');

  // Modals & Tools
  const [addOfferingModalOpen, setAddOfferingModalOpen] = useState(false);
  const [editOfferingModalOpen, setEditOfferingModalOpen] = useState(false);
  const [selectedOfferingForEdit, setSelectedOfferingForEdit] = useState(null);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [selectedBookingForDispatch, setSelectedBookingForDispatch] = useState(null);
  const [printSlipModalOpen, setPrintSlipModalOpen] = useState(false);
  const [selectedBookingForPrint, setSelectedBookingForPrint] = useState(null);
  const [qrVerifyModalOpen, setQrVerifyModalOpen] = useState(false);
  const [qrInputCode, setQrInputCode] = useState('');
  const [qrScanResult, setQrScanResult] = useState(null);

  // Pricing & Calculator State
  const [activeSeasonTier, setActiveSeasonTier] = useState('regular');
  const [calculatorPrice, setCalculatorPrice] = useState(3800);

  // Promotional Coupons
  const [coupons, setCoupons] = useState([
    { id: 'c-1', code: 'HIMALAYA10', discount: 10, minOrder: 1500, active: true, usageCount: 28 },
    { id: 'c-2', code: 'DEVBHOOMI15', discount: 15, minOrder: 3000, active: true, usageCount: 19 },
    { id: 'c-3', code: 'PEAKTREK20', discount: 20, minOrder: 5000, active: false, usageCount: 7 }
  ]);

  // Filters & Search
  const [inventorySearch, setInventorySearch] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState('All');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');
  const [replyInputs, setReplyInputs] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  // New Offering Form
  const [newOfferingForm, setNewOfferingForm] = useState({
    title: '',
    category: 'High-Altitude Alpine Trek',
    type: 'expedition',
    price: '',
    costPrice: '',
    stock: 8,
    lowStockThreshold: 3,
    duration: '3 Days / 2 Nights',
    difficulty: 'Moderate',
    leadTime: 'Immediate Confirmation',
    description: '',
    badges: 'Certified Guide, Includes Meals',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80'
  });

  // Courier Dispatch Form
  const [courierName, setCourierName] = useState('India Post Speed Post (Uttarakhand Eco-Dak)');
  const [trackingNumber, setTrackingNumber] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Convert device photo file to Base64 data URL
  const handlePhotoFileUpload = (file, callback) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (dataUrl && typeof callback === 'function') {
        callback(dataUrl);
        showToast('📷 Photo uploaded from device successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Sync role if query param changes
  useEffect(() => {
    if (initialRoleParam === 'guide') setProviderType('guide');
    if (initialRoleParam === 'shop') setProviderType('shop');
    if (initialRoleParam === 'vendor' || initialRoleParam === 'artisan') setProviderType('artisan');
  }, [initialRoleParam]);

  // Current Active Profile
  const currentProfile = useMemo(() => {
    if (providerType === 'guide') {
      return GUIDE_PROFILES.find(g => g.id === selectedGuideId) || GUIDE_PROFILES[0];
    } else if (providerType === 'shop') {
      return SHOP_PROFILES.find(s => s.id === selectedShopId) || SHOP_PROFILES[0];
    } else {
      return VENDOR_PROFILES.find(v => v.id === selectedVendorId) || VENDOR_PROFILES[0];
    }
  }, [providerType, selectedGuideId, selectedVendorId, selectedShopId]);

  const isGuide = providerType === 'guide';
  const isShop = providerType === 'shop';
  const isArtisan = providerType === 'artisan' || providerType === 'vendor';

  // Current Offerings (Filtered strictly by current provider ID)
  const currentOfferings = useMemo(() => {
    const list = isGuide ? guideOfferings : vendorOfferings;
    return list.filter(item => item.ownerId === currentProfile.id);
  }, [isGuide, guideOfferings, vendorOfferings, currentProfile.id]);

  // Current Bookings (Filtered strictly by current provider ID)
  const currentBookings = useMemo(() => {
    return bookings.filter(b => b.ownerId === currentProfile.id);
  }, [bookings, currentProfile.id]);

  // Current Reviews
  const currentReviews = useMemo(() => {
    return reviews.filter(r => r.ownerId === currentProfile.id);
  }, [reviews, currentProfile.id]);

  // Current Payouts
  const currentPayouts = useMemo(() => {
    return payouts.filter(p => p.ownerId === currentProfile.id);
  }, [payouts, currentProfile.id]);

  // Relevant Notifications for current provider
  const relevantNotifications = useMemo(() => {
    return notifications.filter(n => {
      const roleMatches = n.targetRole === 'all' || n.targetRole === providerType;
      const categoryMatches =
        notificationFilter === 'all'
          ? true
          : notificationFilter === 'urgent'
          ? n.priority === 'urgent'
          : true;
      return roleMatches && categoryMatches;
    });
  }, [notifications, providerType, notificationFilter]);

  const unreadNotificationsCount = useMemo(() => {
    return relevantNotifications.filter(n => !(n.readBy || []).includes(currentProfile.id)).length;
  }, [relevantNotifications, currentProfile.id]);

  // Calculated Metrics
  const calculatedMetrics = useMemo(() => {
    const totalRev = currentBookings
      .filter(b => b.status === 'Completed' || b.status === 'Confirmed' || b.status === 'Dispatched')
      .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0) + (currentProfile.metrics?.totalRevenue || 140000);

    const completedCount = currentBookings.filter(b => b.status === 'Completed').length;
    const activeCount = currentBookings.filter(b => b.status === 'Confirmed' || b.status === 'Dispatched').length;
    const lowStockCount = currentOfferings.filter(o => o.stock <= (o.lowStockThreshold || 3) && o.stock > 0).length;

    return {
      totalRev,
      completedCount,
      activeCount,
      lowStockCount,
      rating: currentProfile.metrics?.rating || 4.98,
      reviewsCount: currentProfile.metrics?.reviewsCount || 180,
      pendingSettlement: currentProfile.metrics?.pendingSettlement || 24500
    };
  }, [currentBookings, currentOfferings, currentProfile]);

  // Handle Mark Notifications as Read
  const handleMarkAllNotificationsRead = () => {
    const updated = notifications.map(n => ({
      ...n,
      readBy: Array.from(new Set([...(n.readBy || []), currentProfile.id]))
    }));
    setNotifications(updated);
    try {
      localStorage.setItem('swargbraman_admin_notifications', JSON.stringify(updated));
    } catch (e) {}
    showToast('All admin advisories marked as read.');
  };

  // Stock / Slot adjustment
  const handleUpdateStock = (offeringId, delta) => {
    const updater = isGuide ? setGuideOfferings : setVendorOfferings;
    updater(prev =>
      prev.map(item => {
        if (item.id === offeringId) {
          const newStock = Math.max(0, (item.stock || 0) + delta);
          let newStatus = isGuide ? 'Active Slots' : 'In Stock';
          if (newStock === 0) newStatus = isGuide ? 'Fully Booked' : 'Out of Stock';
          else if (!isGuide && newStock <= (item.lowStockThreshold || 3)) newStatus = 'Low Stock';
          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      })
    );
    showToast(`${isGuide ? 'Expedition slots' : 'Unit inventory'} updated!`);
  };

  // Create Offering (Expedition for Guide, Product for Vendor)
  const handleCreateOffering = (e) => {
    e.preventDefault();
    if (!newOfferingForm.title || !newOfferingForm.price) return;

    const created = {
      id: `off-${Date.now()}`,
      ownerId: currentProfile.id,
      type: isGuide ? 'expedition' : 'product',
      sku: `${currentProfile.name.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      title: newOfferingForm.title,
      category: newOfferingForm.category,
      price: Number(newOfferingForm.price),
      costPrice: Number(newOfferingForm.costPrice) || Math.round(Number(newOfferingForm.price) * 0.4),
      stock: Number(newOfferingForm.stock),
      lowStockThreshold: Number(newOfferingForm.lowStockThreshold),
      status: Number(newOfferingForm.stock) > 0 ? (isGuide ? 'Active Slots' : 'In Stock') : 'Out of Stock',
      ordersCount: 0,
      leadTime: newOfferingForm.leadTime,
      duration: newOfferingForm.duration,
      difficulty: newOfferingForm.difficulty,
      description: newOfferingForm.description || (isGuide ? 'Certified high-altitude Himalayan guided expedition.' : 'Handcrafted authentic mountain creation.'),
      image: newOfferingForm.image,
      badges: newOfferingForm.badges.split(',').map(b => b.trim()).filter(Boolean)
    };

    if (isGuide) {
      setGuideOfferings([created, ...guideOfferings]);
    } else {
      setVendorOfferings([created, ...vendorOfferings]);
    }

    try {
      confetti({ particleCount: 75, spread: 60 });
    } catch (e) {}

    setAddOfferingModalOpen(false);
    showToast(`Published "${created.title}" live on the Devbhoomi platform!`);
  };

  // Submit Inquiry to Admin Desk
  const handleSendAdminTicket = (e) => {
    e.preventDefault();
    if (!adminQuerySubject || !adminQueryMessage) return;

    try {
      createTicket({
        customerName: `${currentProfile.name} (${isGuide ? 'Himalayan Guide' : 'Artisan Vendor'})`,
        customerContact: currentProfile.phone,
        customerEmail: currentProfile.email,
        category: adminQueryTopic,
        urgency: adminPriority,
        initialMessage: `[PROVIDER INQUIRY - ${isGuide ? 'GUIDE SCOUT' : 'ARTISAN GUILD'}] Subject: ${adminQuerySubject}\n\n${adminQueryMessage}`
      });
    } catch (err) {}

    try {
      confetti({ particleCount: 60, spread: 50 });
    } catch (e) {}

    setAdminContactModalOpen(false);
    setAdminQuerySubject('');
    setAdminQueryMessage('');
    showToast(`Inquiry dispatched directly to Master Admin desk. Response will appear here.`);
  };

  // Instant Payout Withdrawal
  const handleInstantWithdraw = () => {
    const amount = calculatedMetrics.pendingSettlement;
    if (amount <= 0) return;

    const newPayout = {
      id: `PAY-REQ-${Date.now()}`,
      ownerId: currentProfile.id,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      bankName: currentProfile.bankDetails?.bankName || 'State Bank of India',
      accountLast4: currentProfile.bankDetails?.accountNumber?.slice(-4) || '6612',
      refNumber: `IMPS-CR-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      status: 'Settled',
      breakdown: `Instant 100% Direct Payout to ${currentProfile.bankDetails?.upiId} (0% Platform Fee)`
    };

    setPayouts([newPayout, ...payouts]);

    try {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.5 } });
    } catch (err) {}

    showToast(`₹${amount.toLocaleString('en-IN')} transferred to ${currentProfile.bankDetails?.upiId}!`);
  };

  // QR Pass Scanner
  const handleVerifyQRCode = (e) => {
    e.preventDefault();
    const code = qrInputCode.trim().toUpperCase();
    const found = bookings.find(
      b => b.id.toUpperCase() === code || (b.trackingNumber && b.trackingNumber.toUpperCase() === code)
    );

    if (found) {
      setQrScanResult({
        valid: true,
        booking: found,
        message: `VALID DIGITAL BOARDING PASS: ${found.customerName} (${found.offeringTitle})`
      });
      try {
        confetti({ particleCount: 65, spread: 55 });
      } catch (err) {}
    } else {
      setQrScanResult({
        valid: false,
        message: `NO MATCH: Pass code "${code}" is invalid or not registered in Devbhoomi registry.`
      });
    }
  };

  // Filtered inventory list
  const filteredOfferings = useMemo(() => {
    return currentOfferings.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        item.sku.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        item.category.toLowerCase().includes(inventorySearch.toLowerCase());

      const matchesStock =
        stockStatusFilter === 'All'
          ? true
          : stockStatusFilter === 'Low'
          ? item.stock <= (item.lowStockThreshold || 3) && item.stock > 0
          : stockStatusFilter === 'Out'
          ? item.stock === 0
          : item.stock > (item.lowStockThreshold || 3);

      return matchesSearch && matchesStock;
    });
  }, [currentOfferings, inventorySearch, stockStatusFilter]);

  // Filtered bookings list
  const filteredBookings = useMemo(() => {
    return currentBookings.filter(b => {
      return (
        bookingStatusFilter === 'All' ||
        b.status.toLowerCase() === bookingStatusFilter.toLowerCase()
      );
    });
  }, [currentBookings, bookingStatusFilter]);

  return (
    <div id="provider-portal" className="py-8 pb-28 sm:pb-32 bg-gradient-to-b from-[#040D0A] via-[#071713] to-[#040D0A] text-slate-100 min-h-screen">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-400/40 backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Access Denied Notification Banner (e.g. When redirected from /portal/admin) */}
        {location.state?.accessDenied && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{location.state.message || 'Access Denied: Admin control nexus is restricted to Master Administrators.'}</span>
            </div>
            <button
              onClick={() => navigate('/admin/login')}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs whitespace-nowrap self-start sm:self-auto transition cursor-pointer"
            >
              Sign in as Admin
            </button>
          </div>
        )}

        {/* 1. Header Provider Banner with Role Switcher & Admin Contact */}
        <div className="bg-[#0B1E19]/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/25 mb-8 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Row: Provider Category Switcher Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Provider Mode:
              </span>
              <div className="flex flex-wrap sm:inline-flex p-1 bg-black/50 rounded-2xl border border-emerald-500/30 gap-1 sm:gap-0">
                <button
                  type="button"
                  onClick={() => {
                    setProviderType('guide');
                    setActiveTab('overview');
                    showToast('Switched to Certified Mountain Guide Portal View');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 sm:gap-2 ${
                    isGuide
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Compass className="w-4 h-4 flex-shrink-0" />
                  <span>🧭 Mountain Guide</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProviderType('artisan');
                    setActiveTab('overview');
                    showToast('Switched to Native Artisan & Craftsman Portal View');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 sm:gap-2 ${
                    isArtisan
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Palette className="w-4 h-4 flex-shrink-0" />
                  <span>🎨 Native Artisan</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProviderType('shop');
                    setActiveTab('overview');
                    showToast('Switched to Local Mountain Shop Owner Portal View');
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 sm:gap-2 ${
                    isShop
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Store className="w-4 h-4 flex-shrink-0" />
                  <span>🏪 Local Shop Owner</span>
                </button>
              </div>
            </div>

            {/* Admin Desk Actions & Notification Bell */}
            <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-end">
              
              {/* Notification Bell */}
              <button
                type="button"
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2.5 bg-black/40 hover:bg-black/60 text-slate-200 rounded-2xl border border-emerald-500/30 transition shadow"
                title="Admin Broadcast Advisories"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse border-2 border-[#0B1E19]">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Contact Admin Desk Button */}
              <button
                type="button"
                onClick={() => setAdminContactModalOpen(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 text-white rounded-2xl text-xs font-extrabold shadow-lg transition flex items-center gap-2 border border-emerald-400/30"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Contact Admin Desk</span>
              </button>
            </div>
          </div>

          {/* Profile Identity Details */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative">
                <img
                  src={currentProfile.avatar}
                  alt={currentProfile.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400/50 shadow-xl"
                />
                <span
                  className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-[#0B1E19] flex items-center justify-center ${
                    isLiveOpen ? 'bg-emerald-500' : 'bg-slate-500'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isLiveOpen ? 'bg-white animate-pulse' : 'bg-slate-300'}`} />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                    {currentProfile.name}
                  </h1>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {currentProfile.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isGuide ? currentProfile.base : currentProfile.studio}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-300 font-semibold">{currentProfile.category}</span>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2 font-medium">
                  <span>Phone: <strong className="text-slate-200">{currentProfile.phone}</strong></span>
                  <span>UPI: <strong className="text-emerald-400 font-mono">{currentProfile.bankDetails?.upiId}</strong></span>
                  <span>Platform Fee: <strong className="text-emerald-300">0% Commission (100% Payout)</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Availability Toggle & Persona Presets */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsLiveOpen(!isLiveOpen);
                  showToast(isLiveOpen ? 'Status set to ON LEAVE / OFFLINE' : 'Status set to LIVE & ACCEPTING BOOKINGS!');
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 border ${
                  isLiveOpen
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-white/10'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${isLiveOpen ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                <span>{isLiveOpen ? (isGuide ? 'ACCEPTING EXPEDITIONS (Live)' : 'STUDIO OPEN (Live on Map)') : 'ON EXPEDITION / CLOSED'}</span>
              </button>

              {/* Persona Switcher within active role */}
              <select
                value={isGuide ? selectedGuideId : (isShop ? selectedShopId : selectedVendorId)}
                onChange={(e) => {
                  if (isGuide) setSelectedGuideId(e.target.value);
                  else if (isShop) setSelectedShopId(e.target.value);
                  else setSelectedVendorId(e.target.value);
                  showToast(`Viewing portal as ${e.target.options[e.target.selectedIndex].text}`);
                }}
                className="px-4 py-2.5 text-xs font-bold border border-emerald-500/30 rounded-2xl bg-[#06120F] text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {isGuide ? (
                  <>
                    <option value="guide-arjun">🏔️ Arjun Singh Negi (Joshimath - Alpine Scout)</option>
                    <option value="guide-kundan">🐅 Kundan Rawat (Corbett - Tiger Naturalist)</option>
                    <option value="guide-pooja">🏛️ Pooja Pande (Almora - Heritage Storyteller)</option>
                  </>
                ) : isShop ? (
                  <>
                    <option value="shop-ramesh">🏪 Ramesh Chandra Joshi (Ranikhet Organic Haat)</option>
                    <option value="shop-bhupendra">🏔️ Bhupendra Singh Rawat (Kedarnath Valley Provisions)</option>
                  </>
                ) : (
                  <>
                    <option value="vendor-meenakshi">🎨 Meenakshi Joshi (Almora - Aipan Master)</option>
                    <option value="vendor-harish">🔨 Harish Tamta (Almora - Tamta Copperware)</option>
                    <option value="vendor-sunita">🐑 Sunita Devi Bhotia (Munsiyari - Sheep Woolens)</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Section Switcher (< sm) */}
        <div className="block sm:hidden mb-6">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
            Switch Workspace Section:
          </label>
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-[#071310] border border-emerald-500/30 rounded-2xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg appearance-none cursor-pointer"
            >
              {[
                { id: 'overview', label: isGuide ? '📊 Guide Dashboard' : '📊 Artisan Dashboard' },
                { id: 'inventory', label: isGuide ? `🏔️ Expeditions & Slots (${currentOfferings.length})` : `📦 Handcrafted Inventory (${currentOfferings.length})` },
                { id: 'pricing', label: isGuide ? '💰 Guide Rates & Surge' : '💰 Craft Pricing Engine' },
                { id: 'bookings', label: isGuide ? `📅 Trekker Bookings (${currentBookings.length})` : `🛍️ Orders & Dispatch (${currentBookings.length})` },
                { id: 'analytics', label: '✨ Disbursements & Reviews' },
                { id: 'settings', label: isGuide ? '🧭 Guide Scout Profile' : '🏛️ Studio Storefront' }
              ].map(t => (
                <option key={t.id} value={t.id} className="bg-[#0B1E19] text-white">
                  {t.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* 2. Primary Portal Tabs (STRICTLY ROLE-ADAPTIVE, sm+) */}
        <div className="hidden sm:flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-8">
          {[
            { id: 'overview', label: isGuide ? 'Guide Dashboard' : 'Artisan Dashboard', icon: TrendingUp },
            { id: 'inventory', label: isGuide ? 'Expeditions & Slots' : 'Handcrafted Inventory', icon: Package, badge: currentOfferings.length },
            { id: 'pricing', label: isGuide ? 'Guide Rates & Surge' : 'Craft Pricing Engine', icon: DollarSign },
            { id: 'bookings', label: isGuide ? 'Trekker Bookings' : 'Orders & Dispatch', icon: Calendar, badge: currentBookings.length },
            { id: 'analytics', label: 'Disbursements & Reviews', icon: Sparkles },
            { id: 'settings', label: isGuide ? 'Guide Scout Profile' : 'Studio Storefront', icon: Store }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-2 border ${
                  isActive
                    ? isGuide
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : isGuide ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-slate-950 text-white' : 'bg-white/10 text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & PERFORMANCE METRICS */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-[#0B1E19] rounded-3xl border border-white/10 shadow-xl group hover:border-emerald-500/40 transition">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>{isGuide ? 'Total Guide Earnings' : 'Total Direct Craft Sales'}</span>
                  <div className="p-2 bg-emerald-500/15 rounded-xl text-emerald-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-serif text-white">
                  ₹{calculatedMetrics.totalRev.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{currentProfile.metrics?.growthRate} MoM Growth (100% Payout)</span>
                </div>
              </div>

              <div className="p-6 bg-[#0B1E19] rounded-3xl border border-white/10 shadow-xl group hover:border-teal-500/40 transition">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>{isGuide ? 'Active Expeditions & Treks' : 'Listed Handcrafted Artifacts'}</span>
                  <div className="p-2 bg-teal-500/15 rounded-xl text-teal-400">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-serif text-white">
                  {currentOfferings.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  {isGuide ? 'All departure slots active' : `${calculatedMetrics.lowStockCount} items at low threshold`}
                </div>
              </div>

              <div className="p-6 bg-[#0B1E19] rounded-3xl border border-white/10 shadow-xl group hover:border-purple-500/40 transition">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>{isGuide ? 'Trek Travelers Guided' : 'Orders Dispatched'}</span>
                  <div className="p-2 bg-purple-500/15 rounded-xl text-purple-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-serif text-white">
                  {currentProfile.metrics?.ordersCompleted}
                </div>
                <div className="text-[11px] text-purple-400 font-bold mt-2">
                  {calculatedMetrics.activeCount} active in progress
                </div>
              </div>

              <div className="p-6 bg-[#0B1E19] rounded-3xl border border-white/10 shadow-xl group hover:border-amber-500/40 transition">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Traveler Rating</span>
                  <div className="p-2 bg-amber-500/15 rounded-xl text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-serif text-amber-300">
                  {calculatedMetrics.rating} ★
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  From {calculatedMetrics.reviewsCount} verified reviews
                </div>
              </div>
            </div>

            {/* Instant Direct Bank Payout Strip */}
            <div className="p-6 bg-gradient-to-r from-emerald-950/80 via-[#0B251F] to-[#0B1E19] rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Ready for Immediate Bank Settlement (0% Platform Fee)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-serif text-white">
                    ₹{calculatedMetrics.pendingSettlement.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400">Settles to {currentProfile.bankDetails?.upiId}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleInstantWithdraw}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Withdraw to Bank (Instant UPI / IMPS)</span>
              </button>
            </div>

            {/* Recent Bookings Feed & Quick Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="text-base font-bold font-serif text-white">
                    {isGuide ? 'Recent Guided Trek Reservations' : 'Recent Customer Orders'}
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>View All ({currentBookings.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {currentBookings.slice(0, 3).map(b => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-emerald-500/20 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{b.customerName}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold border border-emerald-500/20">
                            {b.status}
                          </span>
                        </div>
                        <div className="text-xs text-amber-300 font-semibold mt-1">
                          {b.offeringTitle}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Amount: <strong>₹{b.totalPrice.toLocaleString('en-IN')}</strong> • {b.scheduledDate || b.bookingDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={`https://wa.me/${b.customerPhone?.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(b.customerName)},%20this%20is%20${encodeURIComponent(currentProfile.name)}%20from%20Swarg%20Bhraman%20regarding%20booking%20#${b.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 sm:flex-none px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${b.customerPhone}`}
                          className="flex-1 sm:flex-none px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Provider Utilities */}
              <div className="space-y-4">
                <div className="p-6 bg-[#0B1E19] rounded-3xl border border-white/10 shadow-xl">
                  <h4 className="font-bold font-serif text-white text-sm mb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    {isGuide ? 'Add New Mountain Trek' : 'Add Handcrafted Product'}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {isGuide
                      ? 'List a new summit expedition, wildlife trail, or heritage walk with group size limits.'
                      : 'Publish a new handcrafted Aipan, copperware vessel, or woolen blanket.'}
                  </p>
                  <button
                    onClick={() => setAddOfferingModalOpen(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 rounded-xl text-xs font-extrabold shadow hover:opacity-95 transition"
                  >
                    {isGuide ? '+ Create Expedition' : '+ List New Product'}
                  </button>
                </div>

                <div className="p-6 bg-[#0B1E19] rounded-3xl border border-white/10 shadow-xl">
                  <h4 className="font-bold font-serif text-white text-sm mb-2 flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    Verify Traveler QR Pass
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Instantly validate digital boarding passes on trekker arrival or studio pickup.
                  </p>
                  <button
                    onClick={() => setQrVerifyModalOpen(true)}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>Open Pass Scanner</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INVENTORY & OFFERINGS (STRICTLY ROLE-ADAPTIVE) */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            <div className="bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">
                  {isGuide ? 'Guided Treks, Expeditions & Departure Slot Management' : 'Handcrafted Inventory & Studio Workshops'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isGuide
                    ? 'Independently manage trek departure dates, max group caps, difficulty ratings, and guide gear inclusions.'
                    : 'Maintain physical unit inventory, trigger low-stock alerts, and set crafting lead times.'}
                </p>
              </div>

              <button
                onClick={() => setAddOfferingModalOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-slate-950 rounded-2xl text-xs font-extrabold shadow-lg transition flex items-center justify-center gap-2 self-start lg:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isGuide ? 'Add New Expedition' : 'Publish Product'}</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-[#0B1E19] rounded-2xl p-4 border border-white/10 shadow flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={isGuide ? 'Search treks by title, circuit or difficulty...' : 'Search artifacts by title, SKU or category...'}
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <select
                value={stockStatusFilter}
                onChange={(e) => setStockStatusFilter(e.target.value)}
                className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="All">{isGuide ? 'All Slot Capacities' : 'All Stock Levels'}</option>
                <option value="Low">{isGuide ? 'Few Slots Left (≤3)' : 'Low Stock Alert (≤3)'}</option>
                <option value="Healthy">{isGuide ? 'Ample Open Slots' : 'Healthy Stock'}</option>
              </select>
            </div>

            {/* Grid of offerings */}
            {filteredOfferings.length === 0 ? (
              <EmptyState
                icon={isGuide ? Mountain : Package}
                title={isGuide ? 'No Mountain Expeditions Listed' : 'No Handcrafted Products in Catalog'}
                description={
                  isGuide
                    ? 'You have not listed any Himalayan treks or routes yet. Click below to add your first expedition, set departure dates, and configure daily guide rates.'
                    : 'You have not added any artisanal products to your catalog yet. Click below to publish your first handcrafted item with 0% platform commission.'
                }
                actionLabel={isGuide ? '+ List New Expedition' : '+ Publish New Product'}
                onAction={() => setAddOfferingModalOpen(true)}
                secondaryLabel={inventorySearch || stockStatusFilter !== 'All' ? 'Clear Filters' : undefined}
                onSecondaryAction={() => { setInventorySearch(''); setStockStatusFilter('All'); }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOfferings.map(item => {
                const isLow = item.stock <= (item.lowStockThreshold || 3) && item.stock > 0;
                const isOut = item.stock === 0;

                return (
                  <div
                    key={item.id}
                    className="bg-[#0B1E19] rounded-3xl border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-emerald-500/30 transition duration-300"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E19] via-transparent to-black/30" />

                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none z-10">
                        <div className="flex flex-wrap items-center gap-1.5 max-w-[55%] pointer-events-auto">
                          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-white/15 text-[10px] font-bold truncate">
                            {item.sku}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-slate-300 border border-white/15 text-[10px] font-bold truncate">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex-shrink-0 pointer-events-auto">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border shadow-lg whitespace-nowrap ${
                              isOut
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : isLow
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            }`}
                          >
                            {isGuide
                              ? isOut ? 'FULLY BOOKED' : `${item.stock} SLOTS`
                              : isOut ? 'OUT OF STOCK' : `${item.stock} IN STOCK`}
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-4">
                        <div className="text-2xl font-extrabold font-serif text-white drop-shadow">
                          ₹{item.price.toLocaleString('en-IN')}
                          {isGuide && <span className="text-xs font-normal text-slate-300 ml-1">/ trekker</span>}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-base font-serif leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.badges?.map((badge, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-slate-300 border border-white/5"
                            >
                              ✓ {badge}
                            </span>
                          ))}
                        </div>

                        {/* Guide departure dates */}
                        {isGuide && item.upcomingDates && (
                          <div className="mt-3 p-2.5 bg-black/40 rounded-xl border border-white/5 text-[11px] space-y-1">
                            <span className="font-bold text-emerald-400 block">Upcoming Scheduled Dates:</span>
                            {item.upcomingDates.slice(0, 2).map((d, dIdx) => (
                              <div key={dIdx} className="flex justify-between text-slate-300">
                                <span>{d.date}</span>
                                <span className="font-semibold text-amber-300">{d.slotsRemaining} spots left</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Stock / Slot Quick Adjust Bar */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">
                            {isGuide ? 'Open Group Slots:' : 'Physical Stock:'}
                          </span>
                          <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10">
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-slate-200"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-bold text-emerald-400 text-xs">
                              {item.stock}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(item.id, +1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-slate-200"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(item.id, +5)}
                              className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold"
                            >
                              +5
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedOfferingForEdit({ ...item });
                              setEditOfferingModalOpen(true);
                            }}
                            className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border border-white/10"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit Offering</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PRICING ENGINE & PROFIT CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'pricing' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold font-serif text-white">
                {isGuide ? 'Himalayan Guide Dynamic Rate Cards & Seasonal Surge' : 'Handicraft Pricing Engine & Direct Profit Margin'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {isGuide
                  ? 'Configure base daily guiding rates, apply Char Dham rush surge multipliers, and configure group volume discounts.'
                  : 'Manage artifact prices, configure festival multipliers, and verify your 100% net earnings.'}
              </p>
            </div>

            {/* Seasonal Multiplier Cards */}
            <div className="bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <h4 className="text-base font-bold font-serif text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                1-Click Seasonal Multipliers
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SEASONAL_PRICING_TIERS.map(tier => {
                  const isCurrent = activeSeasonTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => {
                        setActiveSeasonTier(tier.id);
                        showToast(`Applied ${tier.name} (${tier.badge}) to all offerings!`);
                      }}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-emerald-500/15 border-emerald-400 ring-1 ring-emerald-400'
                          : 'bg-black/40 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300">
                        {tier.badge}
                      </span>
                      <h5 className="font-bold text-white text-sm font-serif mt-2">{tier.name}</h5>
                      <p className="text-[11px] text-amber-300/80 mt-1">{tier.period}</p>
                      <p className="text-xs text-slate-400 mt-2">{tier.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fair-Trade Profit Slider */}
            <div className="bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <h4 className="text-base font-bold font-serif text-white mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Zero Commission Fair-Trade Payout Calculator
              </h4>

              <div className="space-y-4 max-w-xl">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Set Service / Artifact Price:</span>
                  <span className="text-emerald-400 text-base font-serif">₹{calculatorPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="100"
                  value={calculatorPrice}
                  onChange={(e) => setCalculatorPrice(Number(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />

                <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Traveler Pays:</span>
                    <strong className="text-white">₹{calculatorPrice}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Swarg Bhraman Platform Fee:</span>
                    <span>₹0 (0% Commission Pledge)</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold">
                    <span className="text-white">Net Direct Payout to You:</span>
                    <span className="text-emerald-400 text-base font-serif">₹{calculatorPrice} (100%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: BOOKINGS & ORDERS (ROLE-ADAPTIVE PIPELINE) */}
        {/* ========================================================================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">
                  {isGuide ? 'Trekker Group Bookings & Permits' : 'Customer Orders & Dispatch Pipeline'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isGuide
                    ? 'Verify trekker medical clearances, manage trail departures, and confirm guide QR passes.'
                    : 'Dispatch parcels via India Post or courier, track delivery AWB, and print shipping slips.'}
                </p>
              </div>

              <button
                onClick={() => setQrVerifyModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow"
              >
                <QrCode className="w-4 h-4" />
                <span>Validate Pass</span>
              </button>
            </div>

            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <EmptyState
                  icon={isGuide ? Calendar : Package}
                  title={isGuide ? 'No Trekker Bookings Yet' : 'No Customer Orders in Pipeline'}
                  description={
                    isGuide
                      ? 'No active group bookings or trekker clearances registered right now. Upcoming bookings for your trails will appear here automatically.'
                      : 'No customer orders in your dispatch pipeline. New orders placed through the 13 Districts Haat will appear here for courier fulfillment.'
                  }
                  actionLabel={isGuide ? 'Validate Digital QR Pass' : 'View Catalog Offerings'}
                  onAction={() => (isGuide ? setQrVerifyModalOpen(true) : setActiveTab('inventory'))}
                />
              ) : (
                filteredBookings.map(b => (
                  <div
                    key={b.id}
                    className="bg-[#0B1E19] rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        #{b.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {b.status.toUpperCase()}
                      </span>
                      <span className="text-slate-400 text-xs">Date: {b.bookingDate}</span>
                    </div>

                    <h4 className="text-base font-bold font-serif text-white">{b.offeringTitle}</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      <div><strong className="text-white">Traveler:</strong> {b.customerName}</div>
                      <div><strong className="text-white">{isGuide ? 'Group Size:' : 'Quantity:'}</strong> {b.quantity} {isGuide ? 'trekkers' : 'unit(s)'}</div>
                      <div className="sm:col-span-2 text-slate-400">
                        <strong className="text-slate-200">{isGuide ? 'Base Meet Point:' : 'Delivery Address:'}</strong> {b.shippingAddress}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 flex-shrink-0">
                    <div className="text-left lg:text-right">
                      <div className="text-2xl font-extrabold font-serif text-amber-300">
                        ₹{b.totalPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-semibold">{b.paymentStatus}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://wa.me/${b.customerPhone?.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(b.customerName)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-emerald-600/20 text-emerald-300 rounded-xl border border-emerald-500/30 text-xs font-bold flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBookingForPrint(b);
                          setPrintSlipModalOpen(true);
                        }}
                        className="p-2 bg-white/5 text-slate-300 rounded-xl border border-white/10 text-xs font-bold flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Slip</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DISBURSEMENTS & REVIEWS */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold font-serif text-white">Disbursements Ledger & Reputation</h3>
              <p className="text-xs text-slate-400 mt-1">Review bank transfers and publicly reply to travelers.</p>
            </div>

            {/* Payouts Table */}
            <div className="bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl overflow-x-auto">
              <h4 className="text-base font-bold font-serif text-white mb-4">Direct Bank Settlement Ledger</h4>
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead>
                  <tr className="text-slate-400 border-b border-white/10 pb-2">
                    <th className="py-2">Date</th>
                    <th className="py-2">Reference ID</th>
                    <th className="py-2">Account</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentPayouts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <DollarSign className="w-6 h-6 text-emerald-400/60" />
                          <span className="font-semibold text-white">No Settlement Records Yet</span>
                          <span className="text-[11px] text-slate-500">Completed bookings and dispatches are settled directly with 0% platform commission.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentPayouts.map(p => (
                      <tr key={p.id}>
                        <td className="py-3 text-white">{p.date}</td>
                        <td className="py-3 font-mono text-amber-400">{p.refNumber}</td>
                        <td className="py-3 text-slate-300">{p.bankName} (**{p.accountLast4})</td>
                        <td className="py-3 font-bold text-emerald-400">₹{p.amount.toLocaleString('en-IN')}</td>
                        <td className="py-3 text-right text-emerald-300 font-bold">SETTLED</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Reviews */}
            <div className="bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
              <h4 className="text-base font-bold font-serif text-white">Customer Feedback & Official Replies</h4>
              {currentReviews.length === 0 ? (
                <EmptyState
                  icon="⭐"
                  title="No Traveler Feedback Yet"
                  description="Verified reviews from Himalayan trekkers and craft collectors will appear here as your offerings are fulfilled."
                />
              ) : (
                currentReviews.map(r => (
                <div key={r.id} className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{r.reviewerName}</span>
                    <span className="text-amber-400">{'★'.repeat(r.rating)}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{r.comment}"</p>
                  {r.vendorReply ? (
                    <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-xs text-emerald-200">
                      <strong>Your Reply:</strong> {r.vendorReply}
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Type official reply to this review..."
                        value={replyInputs[r.id] || ''}
                        onChange={(e) => setReplyInputs({ ...replyInputs, [r.id]: e.target.value })}
                        className="flex-1 px-3 py-1.5 bg-black/60 border border-white/15 rounded-xl text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const val = replyInputs[r.id]?.trim();
                          if (!val) return;
                          setReviews(reviews.map(x => x.id === r.id ? { ...x, vendorReply: val } : x));
                          setReplyInputs({ ...replyInputs, [r.id]: '' });
                          showToast('Reply posted publicly!');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              )))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PROFILE & GEAR SETTINGS */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto bg-[#0B1E19] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl animate-in fade-in">
            <h3 className="text-xl font-bold font-serif text-white">
              {isGuide ? 'Mountain Guide Credentials & Scout Base' : 'Artisan Studio & GI Tag Settings'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Provider profile updated successfully!');
              }}
              className="space-y-4 mt-6 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Name</label>
                  <input type="text" defaultValue={currentProfile.name} className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{isGuide ? 'Base Camp Location' : 'Studio Address'}</label>
                  <input type="text" defaultValue={isGuide ? currentProfile.base : currentProfile.studio} className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Verified Phone & WhatsApp</label>
                  <input type="text" defaultValue={currentProfile.phone} className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Instant UPI ID</label>
                  <input type="text" defaultValue={currentProfile.bankDetails?.upiId} className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white font-mono" />
                </div>
              </div>
              <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold">
                Save Details
              </button>
            </form>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* DRAWER: ADMIN BROADCAST NOTIFICATIONS */}
      {/* ========================================================================= */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#081512] text-white h-full p-6 shadow-2xl border-l border-emerald-500/30 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <BellRing className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold font-serif text-lg text-white">Admin Broadcast Advisories</h3>
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action: Mark read */}
              <div className="flex justify-between items-center mb-4 text-xs">
                <span className="text-slate-400">Targeted for: <strong>{isGuide ? 'Guides & Scouts' : 'Artisans & Vendors'}</strong></span>
                <button
                  onClick={handleMarkAllNotificationsRead}
                  className="text-emerald-400 hover:underline font-bold"
                >
                  Mark all read
                </button>
              </div>

              {/* Notification list */}
              <div className="space-y-3">
                {relevantNotifications.length === 0 ? (
                  <EmptyState
                    icon={Bell}
                    title="No Advisories or Notices"
                    description={notificationFilter === 'urgent' ? "No urgent high-priority alerts broadcasted right now." : "You're all caught up! No active administrative notices at this time."}
                    actionLabel={notificationFilter === 'urgent' ? "View All Notices" : undefined}
                    onAction={notificationFilter === 'urgent' ? () => setNotificationFilter('all') : undefined}
                  />
                ) : (
                  relevantNotifications.map(n => {
                    const isUnread = !(n.readBy || []).includes(currentProfile.id);
                    return (
                      <div
                        key={n.id}
                        className={`p-4 rounded-2xl border transition ${
                          n.priority === 'urgent'
                            ? 'bg-rose-950/40 border-rose-500/40'
                            : isUnread
                            ? 'bg-emerald-950/40 border-emerald-500/40'
                            : 'bg-black/40 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white/10 text-slate-200">
                            {n.category}
                          </span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <h5 className="font-bold text-white text-xs leading-snug mt-1">{n.title}</h5>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{n.message}</p>
                        <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-slate-400 flex justify-between">
                          <span>From: {n.sender}</span>
                          <span>{n.date}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <button
              onClick={() => setNotificationsOpen(false)}
              className="mt-6 w-full py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold"
            >
              Close Advisories
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DIRECT CONTACT ADMIN DESK */}
      {/* ========================================================================= */}
      {adminContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0B1E19] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-emerald-500/30 relative">
            <button
              onClick={() => setAdminContactModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold font-serif text-white">
                Contact State Admin Command Desk
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-6">
              Official channel connecting {currentProfile.name} directly to Master Administrator Priyanshu Singh Mahar and District Officers.
            </p>

            <form onSubmit={handleSendAdminTicket} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Select Topic</label>
                <select
                  value={adminQueryTopic}
                  onChange={(e) => setAdminQueryTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none"
                >
                  <option value="Permit & Forest Clearance">📜 Route Permit & Forest Dept Clearance</option>
                  <option value="Guild Verification & Badges">🛡️ Guild Verification & Certified Scout Badges</option>
                  <option value="Payment Settlement & Direct Payout">💰 Bank Settlement & Payout Inquiry</option>
                  <option value="Emergency Weather & Trail Incident">⚠️ Emergency Weather & Trail Safety Escalation</option>
                  <option value="District Haat Exhibition Stalls">🎨 District Haat Exhibition & Stall Allocation</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of request or advisory..."
                  value={adminQuerySubject}
                  onChange={(e) => setAdminQuerySubject(e.target.value)}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Detailed Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Provide complete details, dates, permit numbers, or bank account reference..."
                  value={adminQueryMessage}
                  onChange={(e) => setAdminQueryMessage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAdminContactModalOpen(false)}
                  className="flex-1 py-2.5 border border-white/15 rounded-xl font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-extrabold rounded-xl shadow"
                >
                  Send to Admin Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD OFFERING (EXPEDITION OR PRODUCT) */}
      {/* ========================================================================= */}
      {addOfferingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0B1E19] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddOfferingModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-serif text-white mb-1">
              {isGuide ? 'List New Guided Expedition' : 'Publish Handcrafted Artifact'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              This offering will appear publicly across the Devbhoomi travel ecosystem.
            </p>

            <form onSubmit={handleCreateOffering} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Title</label>
                <input
                  type="text"
                  required
                  placeholder={isGuide ? 'e.g. Dayara Bugyal Winter Snow Trek' : 'e.g. Hand-beaten Copper Kalash'}
                  value={newOfferingForm.title}
                  onChange={(e) => setNewOfferingForm({ ...newOfferingForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newOfferingForm.price}
                    onChange={(e) => setNewOfferingForm({ ...newOfferingForm, price: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">{isGuide ? 'Max Slots' : 'Units Stock'}</label>
                  <input
                    type="number"
                    value={newOfferingForm.stock}
                    onChange={(e) => setNewOfferingForm({ ...newOfferingForm, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                  />
                </div>
              </div>

              {/* Image Preview & Photo Upload */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-200 font-bold text-xs">
                    {isGuide ? 'Trek Route Cover Photo' : 'Craft Product Photo'}
                  </label>
                  <label className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs cursor-pointer flex items-center gap-1.5 transition shadow">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoFileUpload(e.target.files?.[0], (dataUrl) => setNewOfferingForm({ ...newOfferingForm, image: dataUrl }))}
                    />
                  </label>
                </div>

                <div className="flex gap-3 items-center">
                  {newOfferingForm.image && (
                    <img
                      src={newOfferingForm.image}
                      alt="Offering Preview"
                      className="w-16 h-14 object-cover rounded-xl border border-white/20 flex-shrink-0"
                    />
                  )}
                  <input
                    type="text"
                    value={newOfferingForm.image || ''}
                    onChange={(e) => setNewOfferingForm({ ...newOfferingForm, image: e.target.value })}
                    placeholder="Upload photo above or paste image URL..."
                    className="flex-1 px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Description</label>
                <textarea
                  rows="3"
                  value={newOfferingForm.description}
                  onChange={(e) => setNewOfferingForm({ ...newOfferingForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddOfferingModalOpen(false)}
                  className="flex-1 py-2.5 border border-white/15 rounded-xl font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold rounded-xl shadow"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: QR PASS SCANNER */}
      {/* ========================================================================= */}
      {qrVerifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0B1E19] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/15 relative">
            <button
              onClick={() => {
                setQrVerifyModalOpen(false);
                setQrScanResult(null);
                setQrInputCode('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-serif text-white mb-1 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-amber-400" />
              Digital Pass Verification
            </h3>
            <p className="text-xs text-slate-400 mb-4">Enter booking ID or scan pass code (e.g. BK-TRK-9901 or BK-UK-7892).</p>

            <form onSubmit={handleVerifyQRCode} className="space-y-4 text-xs">
              <input
                type="text"
                required
                placeholder="Enter Pass ID e.g. BK-TRK-9901"
                value={qrInputCode}
                onChange={(e) => setQrInputCode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white font-mono uppercase text-sm"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-extrabold rounded-xl"
              >
                Verify Pass Authenticity
              </button>

              {qrScanResult && (
                <div
                  className={`p-4 rounded-2xl border text-xs ${
                    qrScanResult.valid
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {qrScanResult.valid ? '✓ VERIFIED OFFICIAL PASS' : '✗ PASS NOT FOUND'}
                  </div>
                  <p>{qrScanResult.message}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PRINT VOUCHER / SLIP */}
      {/* ========================================================================= */}
      {printSlipModalOpen && selectedBookingForPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border-4 border-emerald-700">
            <button
              onClick={() => setPrintSlipModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 text-lg font-bold"
            >
              ✕
            </button>

            <div className="border-b-2 border-slate-900 pb-3 text-center">
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-800">
                Official Devbhoomi {isGuide ? 'Expedition Boarding Pass' : 'Artisan Packing Slip'}
              </span>
              <h3 className="text-xl font-extrabold font-serif text-slate-950 mt-0.5">
                SWARG BHRAMAN
              </h3>
              <p className="text-[11px] text-slate-600">
                Issued by {currentProfile.name} • {isGuide ? currentProfile.base : currentProfile.studio}
              </p>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between font-mono text-[11px] border-b border-slate-200 pb-2">
                <span>Pass: <strong>{selectedBookingForPrint.id}</strong></span>
                <span>Date: <strong>{selectedBookingForPrint.bookingDate}</strong></span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Traveler</span>
                <span className="font-bold text-sm text-slate-950">{selectedBookingForPrint.customerName}</span>
                <p className="text-slate-600 text-[11px] mt-0.5">{selectedBookingForPrint.shippingAddress}</p>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Offering</span>
                <div className="font-bold text-slate-900">{selectedBookingForPrint.offeringTitle}</div>
                <div className="flex justify-between text-slate-700 text-[11px]">
                  <span>{isGuide ? 'Trekkers:' : 'Qty:'} {selectedBookingForPrint.quantity}</span>
                  <span className="font-bold text-slate-950">₹{selectedBookingForPrint.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold"
            >
              Print Document
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
