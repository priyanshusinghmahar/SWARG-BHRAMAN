import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Compass, Users, Camera, MapPin, Package,
  Edit3, Trash2, Plus, Search, Filter, CheckCircle2, XCircle,
  AlertCircle, Sparkles, Clock, Calendar, DollarSign, Image,
  Eye, RefreshCw, Copy, Save, X, ExternalLink, Award,
  ArrowRight, Sliders, Check, Layers, Lock, Activity,
  Phone, Mail, Tag, ShoppingBag, Globe, ChevronRight, ChevronDown, FileText,
  Headphones, UserPlus, MessageSquare, Send, UserCheck, AlertTriangle,
  Bell, Megaphone, Mountain, UploadCloud, Upload
} from 'lucide-react';
import SwargBhramanLogo from './SwargBhramanLogo';
import { UTTARAKHAND_TOUR_PLANS, TOUR_PLAN_CATEGORIES } from '../data/tourPlansData';
import { VENDOR_PROFILES } from '../data/vendorPortalData';
import { GALLERY_PHOTOS } from '../data/mockData';
import { useSupport } from '../context/SupportContext';
import { INITIAL_ADMIN_NOTIFICATIONS } from '../data/providerPortalData';
import { SWARGBHRAMAN_MERCHANDISE, MERCHANDISE_CATEGORIES } from '../data/merchandiseData';
import EmptyState from './EmptyState';

export default function AdminPortal({
  tourPlans = [],
  onUpdateTourPlans,
  vendors = [],
  onUpdateVendors,
  photos = [],
  onUpdatePhotos,
  destinations = [],
  onUpdateDestinations,
  vendorProducts = [],
  onUpdateVendorProducts
}) {
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'vendors' | 'gallery' | 'destinations' | 'inventory' | 'merchandise' | 'overview' | 'support' | 'provider_broadcast'
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // -------------------------------------------------------------
  // PROVIDER BROADCAST ADVISORIES (GUIDES & VENDORS NOTIFICATION HUB)
  // -------------------------------------------------------------
  const [adminNotifications, setAdminNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_admin_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ADMIN_NOTIFICATIONS;
  });

  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastFilter, setBroadcastFilter] = useState('all'); // 'all' | 'guide' | 'vendor'
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    targetRole: 'all', // 'guide' | 'vendor' | 'all'
    priority: 'important', // 'urgent' | 'important' | 'normal'
    category: 'Weather & Trail Advisory',
    sender: 'Priyanshu Singh Mahar (Master Admin & SDRF Liaison)'
  });

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastForm.title.trim() || !broadcastForm.message.trim()) {
      alert('Please fill both the Notification Title and Message content.');
      return;
    }

    const newNotif = {
      id: `notif-${Date.now()}`,
      title: broadcastForm.title.trim(),
      message: broadcastForm.message.trim(),
      targetRole: broadcastForm.targetRole,
      priority: broadcastForm.priority,
      category: broadcastForm.category,
      sender: broadcastForm.sender || 'Master Admin',
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      readBy: []
    };

    const updated = [newNotif, ...adminNotifications];
    setAdminNotifications(updated);
    try {
      localStorage.setItem('swargbraman_admin_notifications', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}

    setBroadcastModalOpen(false);
    setBroadcastForm({
      title: '',
      message: '',
      targetRole: 'all',
      priority: 'important',
      category: 'Weather & Trail Advisory',
      sender: 'Priyanshu Singh Mahar (Master Admin & SDRF Liaison)'
    });
    showToast(`📢 Advisory broadcasted to ${broadcastForm.targetRole === 'guide' ? 'All Mountain Guides' : broadcastForm.targetRole === 'vendor' ? 'All Local Artisans' : 'All Providers'}!`);
  };

  const handleDeleteBroadcast = (id) => {
    const updated = adminNotifications.filter(n => n.id !== id);
    setAdminNotifications(updated);
    try {
      localStorage.setItem('swargbraman_admin_notifications', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
    showToast('Broadcast notice deleted.');
  };

  // -------------------------------------------------------------
  // OFFICIAL MERCHANDISE CMS & STORE STUDIO (MASTER ADMIN COMMAND)
  // -------------------------------------------------------------
  const [merchandiseList, setMerchandiseList] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_merchandise');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SWARGBHRAMAN_MERCHANDISE;
  });

  const [selectedMerchCategory, setSelectedMerchCategory] = useState('All Items');
  const [merchSearchQuery, setMerchSearchQuery] = useState('');
  
  // Edit Merchandise Modal State
  const [editingMerch, setEditingMerch] = useState(null);
  const [isEditMerchModalOpen, setIsEditMerchModalOpen] = useState(false);
  
  // Add New Merchandise Modal State
  const [isAddMerchModalOpen, setIsAddMerchModalOpen] = useState(false);
  const [newMerchForm, setNewMerchForm] = useState({
    title: '',
    subtitle: '',
    category: 'Apparel & Trek Gear',
    price: 999,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: '',
    featuresText: '380 GSM Heavyweight Organic Mountain Cotton\nReinforced seams for alpine durability\nHandcrafted in Almora cooperative',
    sizesText: 'S, M, L, XL, XXL',
    colorsText: 'Alpine Forest Green, Midnight Slate, Sacred Maroon',
    badge: 'Bestseller',
    inStock: true,
    artisanGuild: 'SwargBhraman Official Guild • Almora Unit'
  });

  // Save changes to localStorage and trigger storage event
  const persistMerchandise = (updated) => {
    setMerchandiseList(updated);
    try {
      localStorage.setItem('swargbraman_merchandise', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  const handleOpenEditMerch = (item) => {
    setEditingMerch({
      ...item,
      featuresText: Array.isArray(item.features) ? item.features.join('\n') : (item.features || ''),
      sizesText: Array.isArray(item.sizes) ? item.sizes.join(', ') : (item.sizes || ''),
      colorsText: Array.isArray(item.colors) ? item.colors.join(', ') : (item.colors || '')
    });
    setIsEditMerchModalOpen(true);
  };

  const handleSaveEditMerch = (e) => {
    e.preventDefault();
    if (!editingMerch) return;

    const updatedItem = {
      ...editingMerch,
      price: Number(editingMerch.price) || 0,
      originalPrice: Number(editingMerch.originalPrice) || 0,
      features: typeof editingMerch.featuresText === 'string'
        ? editingMerch.featuresText.split('\n').map(s => s.trim()).filter(Boolean)
        : (editingMerch.features || []),
      sizes: typeof editingMerch.sizesText === 'string'
        ? editingMerch.sizesText.split(',').map(s => s.trim()).filter(Boolean)
        : (editingMerch.sizes || []),
      colors: typeof editingMerch.colorsText === 'string'
        ? editingMerch.colorsText.split(',').map(s => s.trim()).filter(Boolean)
        : (editingMerch.colors || [])
    };
    delete updatedItem.featuresText;
    delete updatedItem.sizesText;
    delete updatedItem.colorsText;

    const updated = merchandiseList.map(item => item.id === updatedItem.id ? updatedItem : item);
    persistMerchandise(updated);
    setIsEditMerchModalOpen(false);
    setEditingMerch(null);
    showToast(`✅ Merchandise "${updatedItem.title}" updated successfully!`);
  };

  const handleCreateMerch = (e) => {
    e.preventDefault();
    if (!newMerchForm.title.trim()) {
      alert('Merchandise title is required');
      return;
    }

    const newItem = {
      id: `merch-${Date.now()}`,
      title: newMerchForm.title.trim(),
      subtitle: newMerchForm.subtitle.trim(),
      category: newMerchForm.category,
      price: Number(newMerchForm.price) || 0,
      originalPrice: Number(newMerchForm.originalPrice) || 0,
      rating: 5.0,
      reviewsCount: 1,
      image: newMerchForm.image.trim() || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      description: newMerchForm.description.trim(),
      features: newMerchForm.featuresText.split('\n').map(s => s.trim()).filter(Boolean),
      sizes: newMerchForm.sizesText.split(',').map(s => s.trim()).filter(Boolean),
      colors: newMerchForm.colorsText.split(',').map(s => s.trim()).filter(Boolean),
      badge: newMerchForm.badge || 'New Gear',
      inStock: Boolean(newMerchForm.inStock),
      artisanGuild: newMerchForm.artisanGuild || 'SwargBhraman Mountain Guild'
    };

    const updated = [newItem, ...merchandiseList];
    persistMerchandise(updated);
    setIsAddMerchModalOpen(false);
    setNewMerchForm({
      title: '',
      subtitle: '',
      category: 'Apparel & Trek Gear',
      price: 999,
      originalPrice: 1499,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      description: '',
      featuresText: '380 GSM Heavyweight Organic Mountain Cotton\nReinforced seams for alpine durability\nHandcrafted in Almora cooperative',
      sizesText: 'S, M, L, XL, XXL',
      colorsText: 'Alpine Forest Green, Midnight Slate, Sacred Maroon',
      badge: 'Bestseller',
      inStock: true,
      artisanGuild: 'SwargBhraman Official Guild • Almora Unit'
    });
    showToast(`🎉 New Merchandise "${newItem.title}" added to store!`);
  };

  const handleToggleMerchStock = (id) => {
    const updated = merchandiseList.map(item => {
      if (item.id === id) {
        const nextState = !item.inStock;
        showToast(nextState ? `📦 "${item.title}" marked IN STOCK` : `⚠️ "${item.title}" marked OUT OF STOCK`);
        return { ...item, inStock: nextState };
      }
      return item;
    });
    persistMerchandise(updated);
  };

  const handleDeleteMerch = (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" from the merchandise store?`)) {
      return;
    }
    const updated = merchandiseList.filter(item => item.id !== id);
    persistMerchandise(updated);
    showToast(`🗑️ "${title}" removed from merchandise.`);
  };

  const handleResetMerchDefaults = () => {
    if (!window.confirm('Reset merchandise store to default SwargBhraman catalog? This will restore original items.')) {
      return;
    }
    persistMerchandise(SWARGBHRAMAN_MERCHANDISE);
    showToast('✨ Merchandise catalog reset to official defaults.');
  };

  // -------------------------------------------------------------
  // CUSTOMER SUPPORT & AGENT TEAM NEXUS (MASTER ADMIN COMMAND)
  // -------------------------------------------------------------
  const {
    tickets = [],
    agents = [],
    sendAdminMessage,
    markTicketReadByAdmin,
    updateTicketStatus,
    assignTicket,
    addAgent,
    updateAgent,
    removeAgent,
    getAgentTicketCount
  } = useSupport();

  const [supportSubTab, setSupportSubTab] = useState('tickets'); // 'tickets' | 'team'
  const [selectedSupportTicketId, setSelectedSupportTicketId] = useState(() => {
    return tickets[0]?.id || 'TKT-1048';
  });
  const [ticketStatusFilter, setTicketStatusFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'EMERGENCY' | 'RESOLVED'
  const [ticketSearchQuery, setTicketSearchQuery] = useState('');
  const [adminReplyText, setAdminReplyText] = useState('');
  const [addAgentModalOpen, setAddAgentModalOpen] = useState(false);
  const [newAgentForm, setNewAgentForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: 'Booking & Expeditions',
    status: 'ACTIVE',
    avatar: '👨‍💼'
  });

  const chatScrollRef = useRef(null);

  // Selected ticket
  const selectedSupportTicket = tickets.find(t => t.id === selectedSupportTicketId) || tickets[0];

  useEffect(() => {
    if (selectedSupportTicketId) {
      markTicketReadByAdmin(selectedSupportTicketId);
    }
  }, [selectedSupportTicketId]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [selectedSupportTicket?.messages?.length, selectedSupportTicketId]);

  const activeTicketsCount = tickets.filter(t => t.status !== 'RESOLVED').length;
  const emergencyTicketsCount = tickets.filter(t => t.urgency === 'Emergency' && t.status !== 'RESOLVED').length;
  const unreadTicketsCount = tickets.filter(t => t.unreadByAdmin).length;

  const handleAdminSendReply = (e) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !selectedSupportTicket) return;

    sendAdminMessage(
      selectedSupportTicket.id,
      adminReplyText.trim(),
      'Priyanshu Singh Mahar (Master Admin)'
    );
    setAdminReplyText('');
    showToast(`✉️ Direct reply sent to ${selectedSupportTicket.customerName}`);
  };

  const handleCreateAgent = (e) => {
    e.preventDefault();
    if (!newAgentForm.name.trim() || !newAgentForm.email.trim() || !newAgentForm.role.trim()) {
      alert('Agent Name, Email, and Support Role are mandatory.');
      return;
    }

    const created = addAgent({
      name: newAgentForm.name,
      email: newAgentForm.email,
      phone: newAgentForm.phone || '+91 98000 00000',
      role: newAgentForm.role,
      department: newAgentForm.department,
      status: newAgentForm.status,
      avatar: newAgentForm.avatar
    });

    setAddAgentModalOpen(false);
    setNewAgentForm({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: 'Booking & Expeditions',
      status: 'ACTIVE',
      avatar: '👨‍💼'
    });
    showToast(`✨ Support Agent "${created.name}" onboarded to team with verified access!`);
  };

  // Show temporary toast message
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Convert device photo file to Base64 data URL with preview
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

  // -------------------------------------------------------------
  // 1. TOUR PLANS STATE & HANDLERS
  // -------------------------------------------------------------
  const [plansList, setPlansList] = useState(() => {
    const rawList = (tourPlans && tourPlans.length > 0) ? tourPlans : (() => {
      try {
        const saved = localStorage.getItem('swargbraman_tour_plans');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
      return UTTARAKHAND_TOUR_PLANS;
    })();
    return (rawList || []).filter(p => !p.title?.includes('(Copy)') && !p.id?.includes('copy'));
  });

  const [selectedPlanCategory, setSelectedPlanCategory] = useState('All');
  const [editPlanModalOpen, setEditPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isNewPlanMode, setIsNewPlanMode] = useState(false);

  const syncPlans = (updatedList) => {
    setPlansList(updatedList);
    try {
      localStorage.setItem('swargbraman_tour_plans', JSON.stringify(updatedList));
      localStorage.setItem('swargbraman_admin_packages', JSON.stringify(updatedList));
    } catch (e) {}
    if (onUpdateTourPlans) onUpdateTourPlans(updatedList);
  };

  const handleOpenEditPlan = (plan) => {
    setIsNewPlanMode(false);
    setEditingPlan({
      ...plan,
      highlightsText: Array.isArray(plan.highlights) ? plan.highlights.join('\n') : (plan.highlights || ''),
      inclusionsText: Array.isArray(plan.inclusions) ? plan.inclusions.join('\n') : (plan.inclusions || ''),
      exclusionsText: Array.isArray(plan.exclusions) ? plan.exclusions.join('\n') : (plan.exclusions || '')
    });
    setEditPlanModalOpen(true);
  };

  const handleOpenCreatePlan = () => {
    setIsNewPlanMode(true);
    setEditingPlan({
      id: `tour-custom-${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'Spiritual & Char Dham',
      duration: '5 Days / 4 Nights',
      daysCount: 5,
      pricePerPerson: 12999,
      originalPrice: 16999,
      discount: '25% OFF',
      grade: 'Moderate Trek',
      altitude: '3,200m',
      bestSeason: 'May to Oct',
      pickupDrop: 'Haridwar / Dehradun',
      groupSize: 'Max 12 Pilgrims',
      rating: 4.9,
      reviewsCount: 12,
      badge: '✨ New Curated Plan',
      seatsLeft: 8,
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      overview: 'Curated Himalayan spiritual expedition designed by native mountain pilots.',
      highlightsText: 'VIP Priority Darshan Access\nCertified Himalayan Lead Guide\nOrganic Pahadi Meals Included',
      inclusionsText: 'Deluxe Alpine Stay\nAll Meals & High Energy Trail Packs\nPrivate 4x4 / Tempo Traveller',
      exclusionsText: 'Personal porter expenses\nHelicopter tickets (can be requested)',
      status: 'ACTIVE'
    });
    setEditPlanModalOpen(true);
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!editingPlan.title) {
      alert('Plan title is required.');
      return;
    }

    const processedHighlights = editingPlan.highlightsText
      ? editingPlan.highlightsText.split('\n').map(s => s.trim()).filter(Boolean)
      : (editingPlan.highlights || []);

    const processedInclusions = editingPlan.inclusionsText
      ? editingPlan.inclusionsText.split('\n').map(s => s.trim()).filter(Boolean)
      : (editingPlan.inclusions || []);

    const processedExclusions = editingPlan.exclusionsText
      ? editingPlan.exclusionsText.split('\n').map(s => s.trim()).filter(Boolean)
      : (editingPlan.exclusions || []);

    const finalPlan = {
      ...editingPlan,
      pricePerPerson: Number(editingPlan.pricePerPerson) || 0,
      originalPrice: Number(editingPlan.originalPrice) || 0,
      daysCount: Number(editingPlan.daysCount) || 1,
      seatsLeft: Number(editingPlan.seatsLeft) || 1,
      highlights: processedHighlights,
      inclusions: processedInclusions,
      exclusions: processedExclusions
    };

    delete finalPlan.highlightsText;
    delete finalPlan.inclusionsText;
    delete finalPlan.exclusionsText;

    let updated;
    if (isNewPlanMode) {
      updated = [finalPlan, ...plansList];
      showToast(`✨ Successfully created new tour plan "${finalPlan.title}"`);
    } else {
      updated = plansList.map(p => p.id === finalPlan.id ? finalPlan : p);
      showToast(`💾 Saved changes to tour plan "${finalPlan.title}"`);
    }

    syncPlans(updated);
    setEditPlanModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (planId, title) => {
    if (window.confirm(`Are you sure you want to permanently delete plan "${title}"?`)) {
      const updated = plansList.filter(p => p.id !== planId);
      syncPlans(updated);
      showToast(`🗑️ Tour plan "${title}" deleted`);
    }
  };

  const handleDuplicatePlan = (plan) => {
    const duplicated = {
      ...plan,
      id: `tour-copy-${Date.now()}`,
      title: `${plan.title} (Copy)`,
      seatsLeft: 6
    };
    const updated = [duplicated, ...plansList];
    syncPlans(updated);
    showToast(`📋 Duplicated plan "${plan.title}"`);
  };

  // -------------------------------------------------------------
  // 2. VENDORS STATE, EDIT & APPROVAL HANDLERS
  // -------------------------------------------------------------
  const [vendorsList, setVendorsList] = useState(() => {
    if (vendors && vendors.length > 0) return vendors;
    try {
      const saved = localStorage.getItem('swargbraman_admin_vendors');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    
    // Seed default vendor list with sample pending applications
    const initialProfiles = [...VENDOR_PROFILES];
    const defaultPendingApps = [
      {
        id: 'vendor-app-101',
        type: 'vendor',
        name: 'Ramesh Singh Negi',
        studio: 'Chamoli High Valley Ringal Guild',
        category: 'Handcrafted Ringal Bamboo Baskets & Trek Poles',
        tagline: 'Eco-friendly high altitude bamboo baskets woven by traditional Bhotia tribal elders',
        phone: '+91 94115 88921',
        whatsapp: '919411588921',
        email: 'ramesh.ringal@chamoli.in',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        coverImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
        verified: false,
        verificationStatus: 'PENDING',
        badge: 'Verification Pending Review',
        district: 'Chamoli, Garhwal',
        experienceYears: 18,
        commissionTier: 'Standard 10%',
        bankDetails: { upiId: 'ramesh.negi@okaxis' },
        metrics: { totalRevenue: 0, ordersCompleted: 0, rating: 5.0 }
      },
      {
        id: 'vendor-app-102',
        type: 'vendor',
        name: 'Sunita Rawat',
        studio: 'Kedarnath Valley Badri Ghee & Mountain Honey',
        category: 'Organic Badri Cow Desi Ghee & High Flora Honey',
        tagline: '100% pasture-grazed Badri cow A2 bilona ghee and raw rhododendron wildflower honey',
        phone: '+91 98370 12894',
        whatsapp: '9837012894',
        email: 'sunita.badri@kedar.in',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        coverImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
        verified: false,
        verificationStatus: 'PENDING',
        badge: 'Verification Pending Review',
        district: 'Rudraprayag, Garhwal',
        experienceYears: 14,
        commissionTier: 'Standard 10%',
        bankDetails: { upiId: 'sunita.rawat@oksbi' },
        metrics: { totalRevenue: 0, ordersCompleted: 0, rating: 5.0 }
      }
    ];
    return [...initialProfiles, ...defaultPendingApps];
  });

  const [vendorFilter, setVendorFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'VERIFIED' | 'SUSPENDED'
  const [editVendorModalOpen, setEditVendorModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [isNewVendorMode, setIsNewVendorMode] = useState(false);

  const syncVendors = (updatedList) => {
    setVendorsList(updatedList);
    try {
      localStorage.setItem('swargbraman_admin_vendors', JSON.stringify(updatedList));
    } catch (e) {}
    if (onUpdateVendors) onUpdateVendors(updatedList);
  };

  // 1-Click Vendor Approval
  const handleApproveVendor = (vendorId, grantGold = true) => {
    const updated = vendorsList.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          verified: true,
          verificationStatus: 'VERIFIED',
          badge: grantGold ? 'GI Tagged Master Artisan • Verified' : 'Certified Native Guild Member',
          approvedAt: new Date().toISOString()
        };
      }
      return v;
    });
    syncVendors(updated);
    showToast(`✅ Vendor Approved! Verified badge issued to artisan.`);
  };

  // 1-Click Reject Application
  const handleRejectVendor = (vendorId) => {
    const reason = window.prompt('Enter rejection feedback or requirement needed from vendor:', 'Missing valid GI certificate / Artisan ID card');
    if (reason === null) return;
    const updated = vendorsList.map(v => {
      if (v.id === vendorId) {
        return {
          ...v,
          verified: false,
          verificationStatus: 'REJECTED',
          badge: 'Application Rejected',
          rejectionReason: reason
        };
      }
      return v;
    });
    syncVendors(updated);
    showToast(`⚠️ Application rejected with feedback provided.`);
  };

  // 1-Click Suspend Vendor
  const handleSuspendVendor = (vendorId) => {
    if (window.confirm('Temporarily suspend this vendor and hide their store products?')) {
      const updated = vendorsList.map(v => {
        if (v.id === vendorId) {
          return {
            ...v,
            verified: false,
            verificationStatus: 'SUSPENDED',
            badge: 'Store Suspended by Admin'
          };
        }
        return v;
      });
      syncVendors(updated);
      showToast(`🛑 Vendor suspended from public marketplace.`);
    }
  };

  const handleOpenEditVendor = (vendor) => {
    setIsNewVendorMode(false);
    setEditingVendor({
      ...vendor,
      bankUpi: vendor.bankDetails?.upiId || '',
      bankName: vendor.bankDetails?.bankName || 'State Bank of India',
      bankAcc: vendor.bankDetails?.accountNumber || '**** **** **** 0000',
      commissionTier: vendor.commissionTier || 'Standard 10%'
    });
    setEditVendorModalOpen(true);
  };

  const handleOpenCreateVendor = () => {
    setIsNewVendorMode(true);
    setEditingVendor({
      id: `vendor-manual-${Date.now()}`,
      type: 'vendor',
      name: '',
      studio: '',
      category: 'Traditional Pahadi Handicrafts',
      tagline: '',
      phone: '+91 ',
      whatsapp: '',
      email: '',
      district: 'Almora, Kumaon',
      experienceYears: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      verified: true,
      verificationStatus: 'VERIFIED',
      badge: 'GI Tagged Master Artisan • Verified',
      commissionTier: 'Standard 10%',
      bankUpi: '',
      bankName: 'SBI',
      metrics: { totalRevenue: 0, ordersCompleted: 0, rating: 5.0 }
    });
    setEditVendorModalOpen(true);
  };

  const handleSaveVendor = (e) => {
    e.preventDefault();
    if (!editingVendor.name || !editingVendor.studio) {
      alert('Artisan name and studio/guild name are required.');
      return;
    }

    const finalVendor = {
      ...editingVendor,
      experienceYears: Number(editingVendor.experienceYears) || 0,
      bankDetails: {
        ...(editingVendor.bankDetails || {}),
        upiId: editingVendor.bankUpi || '',
        bankName: editingVendor.bankName || '',
        accountNumber: editingVendor.bankAcc || ''
      }
    };
    delete finalVendor.bankUpi;
    delete finalVendor.bankName;
    delete finalVendor.bankAcc;

    let updated;
    if (isNewVendorMode) {
      updated = [finalVendor, ...vendorsList];
      showToast(`✨ Registered new vendor "${finalVendor.name}"`);
    } else {
      updated = vendorsList.map(v => v.id === finalVendor.id ? finalVendor : v);
      showToast(`💾 Saved profile changes for "${finalVendor.name}"`);
    }

    syncVendors(updated);
    setEditVendorModalOpen(false);
    setEditingVendor(null);
  };

  // -------------------------------------------------------------
  // 3. HIMALAYAN GALLERY CMS STATE & HANDLERS
  // -------------------------------------------------------------
  const [galleryList, setGalleryList] = useState(() => {
    if (photos && photos.length > 0) return photos;
    try {
      const saved = localStorage.getItem('swargbraman_gallery_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return GALLERY_PHOTOS;
  });

  const [galleryFilter, setGalleryFilter] = useState('All');
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [isNewPhotoMode, setIsNewPhotoMode] = useState(false);

  const syncGallery = (updatedList) => {
    setGalleryList(updatedList);
    try {
      localStorage.setItem('swargbraman_gallery_photos', JSON.stringify(updatedList));
    } catch (e) {}
    if (onUpdatePhotos) onUpdatePhotos(updatedList);
  };

  const handleOpenAddPhoto = () => {
    setIsNewPhotoMode(true);
    setEditingPhoto({
      id: `photo-${Date.now()}`,
      title: '',
      location: 'Uttarakhand',
      category: 'High Peaks',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      photographer: 'Admin Curated',
      likes: 50,
      description: 'Stunning high-resolution capture from the sacred Himalayan trails of Devbhoomi.'
    });
    setPhotoModalOpen(true);
  };

  const handleOpenEditPhoto = (photo) => {
    setIsNewPhotoMode(false);
    setEditingPhoto({ ...photo });
    setPhotoModalOpen(true);
  };

  const handleSavePhoto = (e) => {
    e.preventDefault();
    if (!editingPhoto.title || !editingPhoto.image) {
      alert('Photo title and image URL are required.');
      return;
    }

    let updated;
    if (isNewPhotoMode) {
      updated = [editingPhoto, ...galleryList];
      showToast(`📸 Added new photo "${editingPhoto.title}" to gallery`);
    } else {
      updated = galleryList.map(p => p.id === editingPhoto.id ? editingPhoto : p);
      showToast(`💾 Saved changes to photo "${editingPhoto.title}"`);
    }

    syncGallery(updated);
    setPhotoModalOpen(false);
    setEditingPhoto(null);
  };

  const handleDeletePhoto = (photoId, title) => {
    if (window.confirm(`Delete photo "${title}" from the public gallery?`)) {
      const updated = galleryList.filter(p => p.id !== photoId);
      syncGallery(updated);
      showToast(`🗑️ Deleted photo "${title}" from gallery`);
    }
  };

  // -------------------------------------------------------------
  // 4. DESTINATIONS CMS STATE & HANDLERS
  // -------------------------------------------------------------
  const [destList, setDestList] = useState(() => {
    if (destinations && destinations.length > 0) return destinations;
    try {
      const saved = localStorage.getItem('swargbraman_destinations');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [editingDest, setEditingDest] = useState(null);
  const [editDestModalOpen, setEditDestModalOpen] = useState(false);

  const handleOpenEditDest = (dest) => {
    setEditingDest({ ...dest });
    setEditDestModalOpen(true);
  };

  const handleSaveDest = (e) => {
    e.preventDefault();
    if (!editingDest) return;
    const updated = destList.map(d => d.id === editingDest.id ? editingDest : d);
    setDestList(updated);
    try {
      localStorage.setItem('swargbraman_destinations', JSON.stringify(updated));
    } catch (e) {}
    if (onUpdateDestinations) onUpdateDestinations(updated);
    showToast(`💾 Updated destination "${editingDest.name}"`);
    setEditDestModalOpen(false);
    setEditingDest(null);
  };

  // -------------------------------------------------------------
  // 5. HAAT INVENTORY CMS STATE & HANDLERS
  // -------------------------------------------------------------
  const [invList, setInvList] = useState(() => {
    if (vendorProducts && vendorProducts.length > 0) return vendorProducts;
    try {
      const saved = localStorage.getItem('swargbraman_inventory');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [editingInvItem, setEditingInvItem] = useState(null);
  const [editInvModalOpen, setEditInvModalOpen] = useState(false);

  const handleOpenEditInv = (item) => {
    setEditingInvItem({ ...item });
    setEditInvModalOpen(true);
  };

  const handleSaveInvItem = (e) => {
    e.preventDefault();
    if (!editingInvItem) return;
    const updated = invList.map(item => item.id === editingInvItem.id ? editingInvItem : item);
    setInvList(updated);
    try {
      localStorage.setItem('swargbraman_inventory', JSON.stringify(updated));
    } catch (e) {}
    if (onUpdateVendorProducts) onUpdateVendorProducts(updated);
    showToast(`💾 Saved inventory item "${editingInvItem.title}"`);
    setEditInvModalOpen(false);
    setEditingInvItem(null);
  };

  // -------------------------------------------------------------
  // COUNTERS & FILTERED LISTS
  // -------------------------------------------------------------
  const pendingVendorsCount = vendorsList.filter(v => v.verificationStatus === 'PENDING' || !v.verified).length;
  const verifiedVendorsCount = vendorsList.filter(v => v.verificationStatus === 'VERIFIED' || v.verified).length;
  const totalTourPlansCount = plansList.length;
  const totalGalleryCount = galleryList.length;

  const filteredPlans = plansList.filter(p => {
    const matchesCat = selectedPlanCategory === 'All' || p.category === selectedPlanCategory;
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredVendors = vendorsList.filter(v => {
    let matchesStatus = true;
    if (vendorFilter === 'PENDING') matchesStatus = v.verificationStatus === 'PENDING' || !v.verified;
    else if (vendorFilter === 'VERIFIED') matchesStatus = v.verificationStatus === 'VERIFIED' || v.verified;
    else if (vendorFilter === 'SUSPENDED') matchesStatus = v.verificationStatus === 'SUSPENDED';

    const matchesSearch = !searchQuery ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.studio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.district?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const filteredGallery = galleryList.filter(p => {
    const matchesCat = galleryFilter === 'All' || p.category === galleryFilter;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.photographer?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080D1A] text-slate-100 pb-24 selection:bg-amber-500 selection:text-black">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 border border-emerald-300">
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Administrative Header (Clean natural-flow relative banner, never sticks or overlaps navbar) */}
      <div className="border-b border-white/10 bg-[#0E1627] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
                <div className="w-full h-full bg-[#0E1627] rounded-[14px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex flex-wrap items-center gap-1.5">
                    <span>SwargBhraman</span> <span className="text-amber-400 font-serif">Command Nexus</span>
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/20 border border-rose-500/40 text-rose-400 whitespace-nowrap">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate max-w-xl">
                  Plans Studio • Vendor Verification & Approval • Himalayan Gallery CMS • Platform Operations
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs flex-1 sm:flex-initial">
                <Compass className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 truncate">Tour Plans</div>
                  <div className="font-bold text-white truncate">{totalTourPlansCount} Active</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs flex-1 sm:flex-initial">
                <Users className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 truncate">Vendors</div>
                  <div className="font-bold text-white flex items-center gap-1.5 truncate">
                    <span>{verifiedVendorsCount} Verified</span>
                    {pendingVendorsCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-extrabold animate-pulse">
                        {pendingVendorsCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs flex-1 sm:flex-initial">
                <Camera className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400 truncate">Gallery</div>
                  <div className="font-bold text-white truncate">{totalGalleryCount} Live</div>
                </div>
              </div>

              <Link
                to="/"
                className="px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition flex-1 sm:flex-initial whitespace-nowrap"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Mobile Tab Dropdown for < sm viewports */}
          <div className="sm:hidden mt-4 pt-3 border-t border-white/10">
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 bg-[#090F1E] border border-amber-500/40 rounded-2xl text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10"
              >
                <option value="plans">🧭 Tour Plans Studio ({totalTourPlansCount})</option>
                <option value="vendors">👥 Vendors & Approval Studio {pendingVendorsCount > 0 ? `(${pendingVendorsCount} Pending)` : ''}</option>
                <option value="gallery">📸 Himalayan Gallery CMS ({totalGalleryCount})</option>
                <option value="destinations">📍 Destinations CMS</option>
                <option value="inventory">🛍️ Haat & Inventory Control</option>
                <option value="merchandise">🏷️ Merchandise Studio ({merchandiseList.length})</option>
                <option value="support">🎧 Help Support / Help Desk ({activeTicketsCount} Active)</option>
                <option value="provider_broadcast">📢 Provider Broadcast & Desk ({adminNotifications.length})</option>
                <option value="overview">📊 Platform Telemetry</option>
              </select>
              <ChevronDown className="w-4 h-4 text-amber-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Primary Navigation Tabs (Responsive Wrapped Grid/Flex) */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/5">
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === 'plans'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Tour Plans Studio ({totalTourPlansCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 relative ${
                activeTab === 'vendors'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Vendors & Approval Studio</span>
              {pendingVendorsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold ml-1">
                  {pendingVendorsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === 'gallery'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Himalayan Gallery CMS ({totalGalleryCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('destinations')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === 'destinations'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Destinations CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === 'inventory'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Haat & Inventory Control</span>
            </button>

            <button
              onClick={() => setActiveTab('merchandise')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 relative ${
                activeTab === 'merchandise'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Merchandise Studio ({merchandiseList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 relative ${
                activeTab === 'support'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Help Support / Help Desk ({activeTicketsCount})</span>
              {unreadTicketsCount > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold ml-1 animate-pulse">
                  {unreadTicketsCount} New
                </span>
              ) : emergencyTicketsCount > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold ml-1">
                  SOS
                </span>
              ) : null}
            </button>

            <button
              onClick={() => setActiveTab('provider_broadcast')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 relative ${
                activeTab === 'provider_broadcast'
                  ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Megaphone className="w-4 h-4 text-emerald-400" />
              <span>Provider Broadcast & Desk ({adminNotifications.length})</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black ml-0.5">
                Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Platform Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28 sm:pb-32 w-full max-w-full overflow-hidden">

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: TOUR PLANS & PACKAGES STUDIO                           */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E1627] border border-white/10 p-6 rounded-3xl">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Expedition Packages & Tour Plans Management</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Curated Himalayan Tour Plans Studio
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Edit pricing, day-by-day itineraries, mountain grades, altitude limits, and publish live to the public Tour Plans page.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenCreatePlan}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold flex items-center gap-2 shadow-xl shadow-amber-500/20 transition transform active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Tour Plan</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search plan title, region, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080D1A] border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
                {['All', 'Spiritual & Char Dham', 'High Altitude Treks', 'Heritage & Culture', 'Wildlife & Leisure'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPlanCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      selectedPlanCategory === cat
                        ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
                        : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tour Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={Compass}
                    title="No Tour Plans Found"
                    description={`No itineraries match "${searchQuery || selectedPlanCategory}". Add a new expedition or reset filters.`}
                    actionLabel="Create Tour Plan"
                    onAction={() => { resetPlanForm(); setPlanModalOpen(true); }}
                    secondaryLabel={searchQuery || selectedPlanCategory !== 'All' ? "Reset Filter" : undefined}
                    onSecondaryAction={searchQuery || selectedPlanCategory !== 'All' ? () => { setSearchQuery(''); setSelectedPlanCategory('All'); } : undefined}
                  />
                </div>
              ) : (
                filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-[#0E1627] border border-white/10 hover:border-amber-500/40 rounded-3xl overflow-hidden flex flex-col transition duration-300 shadow-xl group"
                >
                  {/* Card Cover Image with Quick Status */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1627] via-transparent to-black/40" />

                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none z-10">
                      <div className="flex flex-wrap items-center gap-1.5 max-w-[calc(100%-75px)] pointer-events-auto">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-extrabold text-amber-400 border border-amber-500/30 truncate">
                          {plan.category}
                        </span>
                        {plan.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-[10px] font-bold text-white truncate">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0 pointer-events-auto">
                        <button
                          onClick={() => handleDuplicatePlan(plan)}
                          title="Duplicate Plan"
                          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePlan(plan.id, plan.title)}
                          title="Delete Plan"
                          className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sky-400" />
                        {plan.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        {plan.seatsLeft} seats left
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-amber-400 transition">
                        {plan.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {plan.subtitle || plan.overview}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-300">
                        <div>
                          <span className="text-slate-500 block">Altitude:</span>
                          <span className="font-semibold text-slate-200">{plan.altitude || 'High Himalayan'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Grade:</span>
                          <span className="font-semibold text-slate-200">{plan.grade || 'Moderate'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Edit CTA */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting Price</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-amber-400">
                            ₹{(plan.pricePerPerson || 0).toLocaleString('en-IN')}
                          </span>
                          {plan.originalPrice && (
                            <span className="text-xs text-slate-500 line-through">
                              ₹{plan.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenEditPlan(plan)}
                        className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 border border-amber-500/30 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Plan</span>
                      </button>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: VENDORS PROFILE & APPROVAL STUDIO                      */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E1627] border border-white/10 p-6 rounded-3xl">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Vendor Profiles & 1-Click Verification Gateway</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Artisans, Guilds & Vendor Partners Hub
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Verify GI applications, edit artisan bio and bank details, grant verified badges, or suspend accounts.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenCreateVendor}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold flex items-center gap-2 shadow-xl shadow-amber-500/20 transition transform active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Native Artisan</span>
                </button>
              </div>
            </div>

            {/* Verification Status Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search vendor name, studio, craft, or district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080D1A] border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
                <button
                  onClick={() => setVendorFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    vendorFilter === 'ALL'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  All Vendors ({vendorsList.length})
                </button>

                <button
                  onClick={() => setVendorFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    vendorFilter === 'PENDING'
                      ? 'bg-rose-500 text-white'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Pending Approval ({pendingVendorsCount})</span>
                </button>

                <button
                  onClick={() => setVendorFilter('VERIFIED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    vendorFilter === 'VERIFIED'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Masters ({verifiedVendorsCount})</span>
                </button>
              </div>
            </div>

            {/* Vendors Cards List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVendors.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={Users}
                    title="No Providers Found"
                    description={`No local artisans or guides match "${searchQuery || vendorFilter}". Onboard a new provider or adjust filter criteria.`}
                    actionLabel="Register Provider"
                    onAction={() => { resetVendorForm(); setVendorModalOpen(true); }}
                    secondaryLabel={vendorFilter !== 'ALL' || searchQuery ? "Show All Providers" : undefined}
                    onSecondaryAction={vendorFilter !== 'ALL' || searchQuery ? () => { setSearchQuery(''); setVendorFilter('ALL'); } : undefined}
                  />
                </div>
              ) : (
                filteredVendors.map((vendor) => {
                const isPending = vendor.verificationStatus === 'PENDING' || !vendor.verified;
                const isSuspended = vendor.verificationStatus === 'SUSPENDED';

                return (
                  <div
                    key={vendor.id}
                    className={`bg-[#0E1627] border rounded-3xl p-6 transition duration-300 shadow-xl flex flex-col justify-between ${
                      isPending
                        ? 'border-rose-500/50 bg-gradient-to-br from-[#0E1627] to-rose-950/20'
                        : isSuspended
                        ? 'border-yellow-500/30 opacity-75'
                        : 'border-white/10 hover:border-amber-500/40'
                    }`}
                  >
                    <div>
                      {/* Top Header of Vendor Card */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <img
                            src={vendor.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
                            alt={vendor.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-md flex-shrink-0"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-extrabold text-white">
                                {vendor.name}
                              </h3>
                              {vendor.verified ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-extrabold">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>VERIFIED</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-extrabold animate-pulse">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>ACTION NEEDED</span>
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-amber-300 font-semibold mt-0.5">
                              {vendor.studio}
                            </p>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {vendor.district || 'Uttarakhand'} • {vendor.experienceYears || 10}+ Years Exp.
                            </p>
                          </div>
                        </div>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEditVendor(vendor)}
                          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition flex-shrink-0 self-start sm:self-auto"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Edit Profile</span>
                        </button>
                      </div>

                      {/* Craft Specialty & Tagline */}
                      <div className="mt-4 bg-white/[0.03] border border-white/5 rounded-2xl p-3.5">
                        <div className="text-[11px] text-slate-400 uppercase tracking-wide font-bold">
                          Craft Specialty
                        </div>
                        <div className="text-xs font-bold text-white mt-0.5">
                          {vendor.category}
                        </div>
                        {vendor.tagline && (
                          <p className="text-xs text-slate-400 italic mt-1">
                            "{vendor.tagline}"
                          </p>
                        )}
                      </div>

                      {/* Contact & Banking preview */}
                      <div className="grid grid-cols-2 gap-3 mt-3 text-xs text-slate-300">
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="truncate">{vendor.phone || 'No phone'}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          <span className="truncate">{vendor.email || 'No email'}</span>
                        </div>
                      </div>
                    </div>

                    {/* 1-Click Approval Action Bar */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs text-slate-400">
                        Badge: <span className="text-slate-200 font-semibold">{vendor.badge}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPending ? (
                          <>
                            <button
                              onClick={() => handleApproveVendor(vendor.id, true)}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition active:scale-95"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Approve (Gold GI Badge)</span>
                            </button>
                            <button
                              onClick={() => handleRejectVendor(vendor.id)}
                              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs transition"
                            >
                              Reject
                            </button>
                          </>
                        ) : isSuspended ? (
                          <button
                            onClick={() => handleApproveVendor(vendor.id, true)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                          >
                            Reactivate Vendor
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSuspendVendor(vendor.id)}
                              className="px-3 py-1.5 rounded-xl bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-300 font-semibold text-xs transition"
                            >
                              Suspend Store
                            </button>
                            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              Active Verified
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: HIMALAYAN GALLERY CMS                                  */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E1627] border border-white/10 p-6 rounded-3xl">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Public Himalayan Gallery Photo Wall CMS</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  High-Resolution Himalayan Gallery Studio
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Add new scenic photos, change images, modify captions and locations, and curate what travelers see on the Gallery page.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenAddPhoto}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition transform active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Photo to Gallery</span>
                </button>
              </div>
            </div>

            {/* Gallery Category Filter & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search photo title, location, or photographer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080D1A] border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
                {['All', 'High Peaks', 'Spiritual', 'Local Arts & Culture', 'Lakes & Valleys', 'Wildlife'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      galleryFilter === cat
                        ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGallery.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={Camera}
                    title="No Photos in Visual Archives"
                    description={`No media items found matching "${searchQuery || galleryFilter}". Upload a photograph or reset filters.`}
                    actionLabel="Upload Photo"
                    onAction={() => { resetPhotoForm(); setPhotoModalOpen(true); }}
                    secondaryLabel={galleryFilter !== 'All' || searchQuery ? "Reset Filter" : undefined}
                    onSecondaryAction={galleryFilter !== 'All' || searchQuery ? () => { setSearchQuery(''); setGalleryFilter('All'); } : undefined}
                  />
                </div>
              ) : (
                filteredGallery.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-[#0E1627] border border-white/10 hover:border-emerald-500/40 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl group transition duration-300"
                >
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1627] via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-extrabold text-emerald-300 border border-emerald-500/30 truncate pointer-events-auto">
                        {photo.category}
                      </span>
                      <button
                        onClick={() => handleDeletePhoto(photo.id, photo.title)}
                        title="Delete photo"
                        className="p-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 transition flex-shrink-0 pointer-events-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 text-[11px] text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {photo.location}
                      </span>
                      <span>❤️ {photo.likes || 12}</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {photo.description || 'Authentic photograph captured on the Devbhoomi trails.'}
                      </p>
                      <div className="text-[10px] text-slate-500 mt-2">
                        Captured by: <span className="text-slate-300">{photo.photographer || 'Explorer'}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-end">
                      <button
                        onClick={() => handleOpenEditPhoto(photo)}
                        className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-500/30 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Change / Edit Photo</span>
                      </button>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: DESTINATIONS CMS                                       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="bg-[#0E1627] border border-white/10 p-6 rounded-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Devbhoomi Destinations & Sacred Sights Content</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Destinations & High Altitude Passes CMS
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Edit destination starting prices, altitude descriptions, tags, and banner photos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destList.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={Mountain}
                    title="No Destinations Configured"
                    description="No Devbhoomi destinations or high-altitude passes are currently listed."
                  />
                </div>
              ) : (
                destList.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-[#0E1627] border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-900">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1627] via-transparent to-black/30" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 text-[10px] font-bold text-sky-300 border border-sky-500/30">
                        {dest.region}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-3 right-3 text-xs text-white font-bold flex items-center justify-between">
                      <span>{dest.altitude}</span>
                      <span className="text-amber-400">From ₹{(dest.startingPrice || 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-base font-bold text-white">{dest.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{dest.tagline || dest.description}</p>
                    </div>

                    <button
                      onClick={() => handleOpenEditDest(dest)}
                      className="w-full py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Destination Details</span>
                    </button>
                  </div>
                </div>
              )))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: HAAT & INVENTORY CMS                                   */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-[#0E1627] border border-white/10 p-6 rounded-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>13 Districts Direct Haat Marketplace Products</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Craft Goods & Inventory Control
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Manage stock levels, update pricing, and edit product listings from native artisans across all 13 districts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invList.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={ShoppingBag}
                    title="No District Haat Goods"
                    description="No artisan haat items found in inventory catalog."
                  />
                </div>
              ) : (
                invList.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0E1627] border border-white/10 rounded-3xl overflow-hidden shadow-xl p-4 flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-2xl object-cover border border-white/10"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                          {item.stockStatus || 'IN_STOCK'}
                        </span>
                        <span className="text-xs font-extrabold text-amber-400">
                          ₹{(item.price || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">By {item.artisanName || 'Guild'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEditInv(item)}
                    className="w-full py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Price & Stock</span>
                  </button>
                </div>
              )))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB: OFFICIAL MERCHANDISE CMS & STORE STUDIO                  */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'merchandise' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Telemetry & Control Bar */}
            <div className="bg-[#0B1E19] border border-emerald-500/30 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official SwargBhraman Gear & Devbhoomi Goods</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Merchandise Store CMS</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                    Live Sync
                  </span>
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Edit prices, original MRP discounts, descriptions, high-res images, stock availability, and badge labels for all official mountain hoodies, pure copperware, Lokta journals, and trek essentials.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleResetMerchDefaults}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition flex items-center gap-1.5"
                  title="Reset to original SwargBhraman merchandise items"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddMerchModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-950/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  <span>+ Add New Merchandise Item</span>
                </button>
              </div>
            </div>

            {/* Metrics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#071310] border border-emerald-500/20 p-4 rounded-2xl">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Store Products</div>
                <div className="text-xl font-black text-white mt-1">{merchandiseList.length} Items</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Catalog Live</div>
              </div>

              <div className="bg-[#071310] border border-emerald-500/20 p-4 rounded-2xl">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">In Stock Ready</div>
                <div className="text-xl font-black text-emerald-400 mt-1">
                  {merchandiseList.filter(m => m.inStock).length} Available
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Dispatched in 24h</div>
              </div>

              <div className="bg-[#071310] border border-emerald-500/20 p-4 rounded-2xl">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Out of Stock</div>
                <div className="text-xl font-black text-rose-400 mt-1">
                  {merchandiseList.filter(m => !m.inStock).length} Sold Out
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Replenishment needed</div>
              </div>

              <div className="bg-[#071310] border border-emerald-500/20 p-4 rounded-2xl">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Categories Active</div>
                <div className="text-xl font-black text-amber-400 mt-1">
                  {new Set(merchandiseList.map(m => m.category)).size} Types
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Gear, Crafts & Food</div>
              </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#071310] border border-emerald-500/20 p-3.5 rounded-2xl">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {MERCHANDISE_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedMerchCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      selectedMerchCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search merchandise..."
                  value={merchSearchQuery}
                  onChange={(e) => setMerchSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Merchandise Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(() => {
                const filtered = merchandiseList.filter(item => {
                  const matchCat = selectedMerchCategory === 'All Items' || item.category === selectedMerchCategory;
                  const query = merchSearchQuery.toLowerCase();
                  const matchQuery = !query || 
                    item.title.toLowerCase().includes(query) || 
                    (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
                    (item.badge && item.badge.toLowerCase().includes(query)) ||
                    (item.artisanGuild && item.artisanGuild.toLowerCase().includes(query));
                  return matchCat && matchQuery;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="col-span-full">
                      <EmptyState
                        icon={ShoppingBag}
                        title="No Merchandise Listed"
                        description={`No handcrafted products match "${merchSearchQuery || selectedMerchCategory}". Add a new catalog item or clear filter.`}
                        actionLabel="Add Merchandise"
                        onAction={() => { resetMerchForm(); setMerchModalOpen(true); }}
                        secondaryLabel={selectedMerchCategory !== 'All Items' || merchSearchQuery ? "Reset Filter" : undefined}
                        onSecondaryAction={selectedMerchCategory !== 'All Items' || merchSearchQuery ? () => { setMerchSearchQuery(''); setSelectedMerchCategory('All Items'); } : undefined}
                      />
                    </div>
                  );
                }

                return filtered.map(item => {
                  const discountPercent = item.originalPrice > item.price 
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) 
                    : 0;

                  return (
                    <div
                      key={item.id}
                      className="bg-[#071310] border border-emerald-500/20 hover:border-emerald-500/40 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition group"
                    >
                      {/* Image Header with Badges */}
                      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071310] via-transparent to-black/30" />

                        {/* Badges & Stock Status Bar */}
                        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none z-10">
                          <div className="flex items-center gap-1.5 flex-wrap max-w-[calc(100%-95px)] pointer-events-auto">
                            {item.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase shadow truncate">
                                {item.badge}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full bg-black/60 text-slate-300 text-[10px] font-mono border border-white/10 truncate">
                              {item.category}
                            </span>
                          </div>

                          <div className="flex-shrink-0 pointer-events-auto">
                            <button
                              type="button"
                              onClick={() => handleToggleMerchStock(item.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition flex items-center gap-1 cursor-pointer ${
                                item.inStock
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                              }`}
                              title="Click to toggle stock status"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${item.inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                              <span>{item.inStock ? 'In Stock' : 'Out of Stock'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Price Banner */}
                        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
                          <div className="flex items-baseline gap-1.5 bg-black/70 px-2.5 py-1 rounded-xl border border-white/10">
                            <span className="text-base font-black text-amber-400">₹{(item.price || 0).toLocaleString('en-IN')}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-xs text-slate-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                            )}
                            {discountPercent > 0 && (
                              <span className="text-[10px] text-emerald-400 font-bold">({discountPercent}% OFF)</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                          {item.subtitle && (
                            <p className="text-[11px] text-amber-300/80 line-clamp-1 font-medium mt-0.5">{item.subtitle}</p>
                          )}
                          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Guild & Meta */}
                        <div className="pt-2 border-t border-white/5 space-y-1.5 text-[11px] text-slate-400">
                          <div className="flex items-center justify-between">
                            <span className="text-emerald-400/90 font-medium truncate max-w-[200px]">
                              🏛️ {item.artisanGuild || 'Official Guild'}
                            </span>
                            <span className="text-amber-400 font-bold">⭐ {item.rating || 4.9}</span>
                          </div>

                          {item.sizes && item.sizes.length > 0 && (
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 overflow-hidden truncate">
                              <span className="text-slate-500">Sizes:</span>
                              <span>{Array.isArray(item.sizes) ? item.sizes.join(', ') : item.sizes}</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => handleOpenEditMerch(item)}
                            className="flex-1 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Item</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteMerch(item.id, item.title)}
                            className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white transition cursor-pointer"
                            title="Delete Merchandise"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: TELEMETRY & OVERVIEW                                   */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0E1627] border border-white/10 p-6 rounded-3xl">
                <div className="text-xs text-slate-400 font-bold uppercase">Platform Health</div>
                <div className="text-2xl font-black text-emerald-400 mt-2 flex items-center gap-2">
                  <Activity className="w-6 h-6 animate-pulse" />
                  <span>100% Operational</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  All 13 districts sync pipelines and Char Dham booking gateways are active.
                </p>
              </div>

              <div className="bg-[#0E1627] border border-white/10 p-6 rounded-3xl">
                <div className="text-xs text-slate-400 font-bold uppercase">Pending Vendor Queue</div>
                <div className="text-2xl font-black text-rose-400 mt-2 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  <span>{pendingVendorsCount} Applications</span>
                </div>
                <button
                  onClick={() => { setActiveTab('vendors'); setVendorFilter('PENDING'); }}
                  className="text-xs text-amber-400 font-bold mt-2 hover:underline flex items-center gap-1"
                >
                  Review Applications Now <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-[#0E1627] border border-white/10 p-6 rounded-3xl">
                <div className="text-xs text-slate-400 font-bold uppercase">Himalayan Gallery Live Assets</div>
                <div className="text-2xl font-black text-sky-400 mt-2 flex items-center gap-2">
                  <Camera className="w-6 h-6" />
                  <span>{totalGalleryCount} Photographs</span>
                </div>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="text-xs text-sky-400 font-bold mt-2 hover:underline flex items-center gap-1"
                >
                  Open Gallery CMS <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 8: PROVIDER BROADCAST ADVISORIES & INQUIRY DESK           */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'provider_broadcast' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0B1E19] border border-emerald-500/30 p-5 rounded-3xl">
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Total Broadcasts</div>
                <div className="text-2xl font-black text-white mt-1.5 flex items-center justify-between">
                  <span>{adminNotifications.length} Published</span>
                  <Megaphone className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Live in all Provider Portals</div>
              </div>

              <div className="bg-[#0B1E19] border border-emerald-500/30 p-5 rounded-3xl">
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">To Mountain Guides</div>
                <div className="text-2xl font-black text-emerald-400 mt-1.5 flex items-center justify-between">
                  <span>{adminNotifications.filter(n => n.targetRole === 'guide' || n.targetRole === 'all').length} Active</span>
                  <Mountain className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Summit safety & permit bulletins</div>
              </div>

              <div className="bg-[#0B1E19] border border-amber-500/30 p-5 rounded-3xl">
                <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">To Local Artisans</div>
                <div className="text-2xl font-black text-amber-400 mt-1.5 flex items-center justify-between">
                  <span>{adminNotifications.filter(n => n.targetRole === 'vendor' || n.targetRole === 'all').length} Active</span>
                  <Package className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Haat stalls & courier updates</div>
              </div>

              <div className="bg-[#0B1E19] border border-rose-500/30 p-5 rounded-3xl">
                <div className="text-[11px] text-rose-400 font-bold uppercase tracking-wider">Urgent Warnings</div>
                <div className="text-2xl font-black text-rose-400 mt-1.5 flex items-center justify-between">
                  <span>{adminNotifications.filter(n => n.priority === 'urgent').length} Alerts</span>
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">High priority alerts active</div>
              </div>
            </div>

            {/* Actions & Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0B1E19] border border-emerald-500/30 p-4 rounded-3xl">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setBroadcastFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    broadcastFilter === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  All Advisories ({adminNotifications.length})
                </button>
                <button
                  type="button"
                  onClick={() => setBroadcastFilter('guide')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    broadcastFilter === 'guide'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  🧭 Guides Only
                </button>
                <button
                  type="button"
                  onClick={() => setBroadcastFilter('vendor')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    broadcastFilter === 'vendor'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  🎨 Artisans Only
                </button>
              </div>

              <button
                type="button"
                onClick={() => setBroadcastModalOpen(true)}
                className="py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-slate-950 font-black rounded-2xl text-xs transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Megaphone className="w-4 h-4 text-slate-950" />
                <span>+ Broadcast New Advisory to Providers</span>
              </button>
            </div>

            {/* Broadcast Notices List */}
            <div className="space-y-3">
              {(() => {
                const filteredBroadcasts = adminNotifications.filter(
                  n => broadcastFilter === 'all' || n.targetRole === broadcastFilter || n.targetRole === 'all'
                );

                if (filteredBroadcasts.length === 0) {
                  return (
                    <EmptyState
                      icon={Megaphone}
                      title="No Broadcast Advisories"
                      description="No administrative notices or weather alerts match the active filter."
                      actionLabel="Broadcast Advisory"
                      onAction={() => setBroadcastModalOpen(true)}
                      secondaryLabel={broadcastFilter !== 'all' ? "Show All Advisories" : undefined}
                      onSecondaryAction={broadcastFilter !== 'all' ? () => setBroadcastFilter('all') : undefined}
                    />
                  );
                }

                return filteredBroadcasts.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-5 rounded-3xl bg-[#081512] border border-emerald-500/20 hover:border-emerald-500/40 transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          notif.priority === 'urgent'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : notif.priority === 'important'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {notif.priority === 'urgent' ? '🚨 Urgent Alert' : notif.priority === 'important' ? '⚠️ Important' : 'ℹ️ Advisory'}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold">
                          {notif.targetRole === 'guide' ? '🧭 Mountain Guides' : notif.targetRole === 'vendor' ? '🎨 Local Artisans' : '🌐 All Providers'}
                        </span>

                        <span className="text-[11px] text-emerald-400/80 font-mono">
                          📁 {notif.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-mono">
                          🕒 {notif.date} at {notif.timestamp}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteBroadcast(notif.id)}
                          className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                          title="Delete Advisory"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white">{notif.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-white/5">
                      {notif.message}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Dispatched by: <strong className="text-emerald-300">{notif.sender}</strong></span>
                      <span className="text-emerald-400 font-semibold">
                        ✓ Delivered to Provider Notification Drawer
                      </span>
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Provider Support Tickets Nexus */}
            <div className="p-6 rounded-3xl bg-[#0B1E19] border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-emerald-400" />
                    <span>Provider Inquiries Desk</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live tickets submitted by Guides and Artisans from their Provider Portal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('support')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Open Full Support Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tickets.slice(0, 4).map(ticket => (
                  <div
                    key={ticket.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-emerald-500/30 transition space-y-2 cursor-pointer"
                    onClick={() => {
                      setSelectedSupportTicketId(ticket.id);
                      setActiveTab('support');
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">{ticket.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ticket.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">{ticket.subject}</div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>From: {ticket.customerName}</span>
                      <span className="text-emerald-400 font-semibold hover:underline">Reply in Nexus →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 7: CUSTOMER SUPPORT & AGENT TEAM NEXUS (MASTER ADMIN)      */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            
            {/* Top Telemetry & Control Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0E1627] border border-white/10 p-5 rounded-3xl">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Traveler Tickets</div>
                <div className="text-2xl font-black text-white mt-1.5 flex items-center justify-between">
                  <span>{tickets.length} Registered</span>
                  <Headphones className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Direct inquiries routed to Admin Nexus</div>
              </div>

              <div className="bg-[#0E1627] border border-white/10 p-5 rounded-3xl">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Active Open Inquiries</div>
                <div className="text-2xl font-black text-amber-400 mt-1.5 flex items-center justify-between">
                  <span>{activeTicketsCount} Active</span>
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">{unreadTicketsCount} awaiting admin response</div>
              </div>

              <div className="bg-[#0E1627] border border-rose-500/30 p-5 rounded-3xl bg-rose-950/10">
                <div className="text-[11px] text-rose-400 font-bold uppercase tracking-wider">Emergency SOS Alerts</div>
                <div className="text-2xl font-black text-rose-400 mt-1.5 flex items-center justify-between">
                  <span>{emergencyTicketsCount} Alerts</span>
                  <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse" />
                </div>
                <div className="text-xs text-rose-300/80 mt-1">High priority trail/medical dispatch</div>
              </div>

              <div className="bg-[#0E1627] border border-white/10 p-5 rounded-3xl">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Support Fleet On Duty</div>
                <div className="text-2xl font-black text-emerald-400 mt-1.5 flex items-center justify-between">
                  <span>{agents.filter(a => a.status === 'ACTIVE').length} Agents</span>
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Admin + Scalable Support Leads</div>
              </div>
            </div>

            {/* Sub-Navigation & Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0E1627] border border-white/10 p-4 rounded-3xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSupportSubTab('tickets')}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                    supportSubTab === 'tickets'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Live Support Tickets ({activeTicketsCount})</span>
                  {unreadTicketsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-black">
                      {unreadTicketsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setSupportSubTab('team')}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                    supportSubTab === 'team'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Support Team Roster ({agents.length})</span>
                </button>
              </div>

              <button
                onClick={() => setAddAgentModalOpen(true)}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20 self-start sm:self-auto"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Onboard Support Team Member</span>
              </button>
            </div>

            {/* ========================================================= */}
            {/* SUB-VIEW 1: LIVE SUPPORT TICKETS & DIRECT CHAT DESK       */}
            {/* ========================================================= */}
            {supportSubTab === 'tickets' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Tickets Queue (4 of 12 cols) */}
                <div className="lg:col-span-5 bg-[#0E1627] border border-white/10 rounded-3xl p-5 space-y-4">
                  
                  {/* Filters & Search */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={ticketSearchQuery}
                        onChange={(e) => setTicketSearchQuery(e.target.value)}
                        placeholder="Search customer, phone, ticket ID..."
                        className="w-full bg-[#080D1A] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                      {['ALL', 'ACTIVE', 'EMERGENCY', 'RESOLVED'].map(filterKey => (
                        <button
                          key={filterKey}
                          onClick={() => setTicketStatusFilter(filterKey)}
                          className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition ${
                            ticketStatusFilter === filterKey
                              ? 'bg-amber-500 text-slate-950 font-black'
                              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {filterKey}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Tickets List */}
                  <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                    {(() => {
                      const filteredTickets = tickets
                        .filter(t => {
                          if (ticketStatusFilter === 'ACTIVE') return t.status !== 'RESOLVED';
                          if (ticketStatusFilter === 'EMERGENCY') return t.urgency === 'Emergency';
                          if (ticketStatusFilter === 'RESOLVED') return t.status === 'RESOLVED';
                          return true;
                        })
                        .filter(t => {
                          if (!ticketSearchQuery.trim()) return true;
                          const q = ticketSearchQuery.toLowerCase();
                          return (
                            t.id.toLowerCase().includes(q) ||
                            t.customerName.toLowerCase().includes(q) ||
                            t.customerContact.toLowerCase().includes(q) ||
                            t.category.toLowerCase().includes(q)
                          );
                        });

                      if (filteredTickets.length === 0) {
                        return (
                          <EmptyState
                            icon={Headphones}
                            title="No Inquiries Found"
                            description="No customer tickets match the current search or status filter."
                            actionLabel={ticketStatusFilter !== 'ALL' || ticketSearchQuery ? "Show All Tickets" : undefined}
                            onAction={ticketStatusFilter !== 'ALL' || ticketSearchQuery ? () => { setTicketSearchQuery(''); setTicketStatusFilter('ALL'); } : undefined}
                          />
                        );
                      }

                      return filteredTickets.map(t => {
                        const isSelected = t.id === selectedSupportTicket?.id;
                        const lastMsg = t.messages[t.messages.length - 1];
                        return (
                          <div
                            key={t.id}
                            onClick={() => {
                              setSelectedSupportTicketId(t.id);
                              markTicketReadByAdmin(t.id);
                            }}
                            className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                                : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-black text-amber-400">
                                {t.id}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {t.urgency === 'Emergency' && (
                                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-black border border-rose-500/30 animate-pulse">
                                    🚨 SOS
                                  </span>
                                )}
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                  t.status === 'ACTIVE'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : t.status === 'IN_PROGRESS'
                                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                    : 'bg-slate-500/20 text-slate-400'
                                }`}>
                                  {t.status}
                                </span>
                              </div>
                            </div>

                            <div className="mt-1.5 flex items-center justify-between">
                              <span className="text-xs font-bold text-white">
                                {t.customerName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {t.customerContact}
                              </span>
                            </div>

                            <div className="text-[11px] text-amber-300/80 font-medium mt-0.5">
                              {t.category}
                            </div>

                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                              {lastMsg?.text || 'No message'}
                            </p>

                            <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-white/5">
                              <span className="text-slate-400 font-semibold truncate max-w-[180px]">
                                👤 {t.assignedTo}
                              </span>
                              <span>{lastMsg?.timestamp || ''}</span>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>

                </div>

                {/* Right Column: Live Direct Chat Desk (7 of 12 cols) */}
                <div className="lg:col-span-7 bg-[#0E1627] border border-white/10 rounded-3xl flex flex-col h-[680px] overflow-hidden shadow-2xl">
                  
                  {selectedSupportTicket ? (
                    <>
                      {/* Chat Desk Header */}
                      <div className="p-4 sm:p-5 border-b border-white/10 bg-[#0A101D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black text-white">
                              {selectedSupportTicket.customerName}
                            </h3>
                            <span className="font-mono text-xs text-amber-400 font-bold">
                              ({selectedSupportTicket.id})
                            </span>
                            {selectedSupportTicket.urgency === 'Emergency' && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-black border border-rose-500/30">
                                🚨 SOS Emergency
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                            <a
                              href={`tel:${selectedSupportTicket.customerContact}`}
                              className="text-amber-400 hover:underline flex items-center gap-1 font-mono"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{selectedSupportTicket.customerContact}</span>
                            </a>
                            {selectedSupportTicket.customerEmail && (
                              <span className="hidden sm:inline text-slate-400 truncate max-w-[200px]">
                                {selectedSupportTicket.customerEmail}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Status & Assignment Quick Selectors */}
                        <div className="flex items-center gap-2">
                          {/* Status Picker */}
                          <select
                            value={selectedSupportTicket.status}
                            onChange={(e) => updateTicketStatus(selectedSupportTicket.id, e.target.value)}
                            className="bg-[#080D1A] border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-amber-400 font-bold focus:outline-none"
                          >
                            <option value="ACTIVE">Status: ACTIVE</option>
                            <option value="IN_PROGRESS">Status: IN PROGRESS</option>
                            <option value="RESOLVED">Status: RESOLVED</option>
                          </select>

                          {/* Agent Assignment Dropdown (Master Admin Oversight) */}
                          <select
                            value={selectedSupportTicket.assignedAgentId}
                            onChange={(e) => {
                              const targetAgent = agents.find(a => a.id === e.target.value);
                              if (targetAgent) {
                                assignTicket(selectedSupportTicket.id, targetAgent.id, `${targetAgent.name} (${targetAgent.role.split(' ')[0]})`);
                                showToast(`Assigned ticket ${selectedSupportTicket.id} to ${targetAgent.name}`);
                              }
                            }}
                            className="bg-[#080D1A] border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 font-medium focus:outline-none max-w-[150px] truncate"
                          >
                            {agents.map(ag => (
                              <option key={ag.id} value={ag.id}>
                                {ag.isMasterAdmin ? `👑 ${ag.name} (Admin)` : `👤 ${ag.name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Chat Messages Stream */}
                      <div
                        ref={chatScrollRef}
                        className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#080D1A]/80"
                      >
                        {selectedSupportTicket.messages && selectedSupportTicket.messages.length > 0 ? (
                          selectedSupportTicket.messages.map(msg => {
                            const isAdmin = msg.sender === 'admin';
                            return (
                              <div
                                key={msg.id}
                                className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[11px] font-bold text-slate-400">
                                    {msg.senderName}
                                  </span>
                                  {isAdmin && (
                                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-black uppercase tracking-wider border border-amber-500/30">
                                      Master Admin
                                    </span>
                                  )}
                                  <span className="text-[10px] text-slate-500">
                                    {msg.timestamp}
                                  </span>
                                </div>

                                <div
                                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-md ${
                                    isAdmin
                                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-medium rounded-tr-sm'
                                      : 'bg-[#131D33] text-white border border-white/10 rounded-tl-sm'
                                  }`}
                                >
                                  {msg.text}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                            No messages in this inquiry.
                          </div>
                        )}
                      </div>

                      {/* Canned Responses Pills */}
                      <div className="px-4 py-2 bg-[#0A101D] border-t border-white/5 flex items-center gap-2 overflow-x-auto text-[11px]">
                        <span className="text-[10px] font-bold text-slate-500 uppercase flex-shrink-0">Quick Fill:</span>
                        {[
                          'Verified: NIM-certified lead guide assigned. Trail clear.',
                          'SDRF & Forest range dispatched. Standby at current location.',
                          'Your artisan parcel dispatched via SpeedPost (ID: UK982341908IN).',
                          'Biometric Char Dham priority pass verified for senior travelers.'
                        ].map((canned, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setAdminReplyText(canned)}
                            className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] whitespace-nowrap transition border border-white/5"
                          >
                            {canned.slice(0, 35)}...
                          </button>
                        ))}
                      </div>

                      {/* Direct Admin Reply Box */}
                      <form
                        onSubmit={handleAdminSendReply}
                        className="p-3 sm:p-4 bg-[#0A101D] border-t border-white/10 flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={adminReplyText}
                          onChange={(e) => setAdminReplyText(e.target.value)}
                          placeholder="Type direct response to traveler as Master Admin..."
                          className="flex-1 bg-[#080D1A] border border-white/15 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="submit"
                          disabled={!adminReplyText.trim()}
                          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                        >
                          <span>Send Reply</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                      Select a ticket from the left queue to start direct chat.
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* SUB-VIEW 2: SUPPORT TEAM ROSTER & ACCESS CONTROL          */}
            {/* ========================================================= */}
            {supportSubTab === 'team' && (
              <div className="space-y-6">
                
                {/* Admin Master Authority Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/30">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin Master Oversight & Support Fleet Management</span>
                    </div>
                    <h3 className="text-lg font-black text-white">
                      Scalable Support Team Access Control
                    </h3>
                    <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                      As the administrator, you hold root access over all customer support operations. You can onboard new support specialists to manage high-altitude mountain rescues, Char Dham biometric passes, or District Haat orders as the organization scales.
                    </p>
                  </div>

                  <button
                    onClick={() => setAddAgentModalOpen(true)}
                    className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 whitespace-nowrap shadow-lg shadow-amber-500/20"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Onboard New Agent</span>
                  </button>
                </div>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agents.map(ag => {
                    const ticketCount = getAgentTicketCount(ag.id);
                    return (
                      <div
                        key={ag.id}
                        className={`p-6 rounded-3xl border transition relative ${
                          ag.isMasterAdmin
                            ? 'bg-[#0E1627] border-amber-500/50 shadow-lg shadow-amber-500/10'
                            : 'bg-[#0E1627] border-white/10 hover:border-white/20'
                        }`}
                      >
                        {/* Master Admin Ribbon */}
                        {ag.isMasterAdmin && (
                          <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Master Admin</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                            {ag.avatar || '👨‍💼'}
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                              {ag.name}
                            </h4>
                            <p className="text-xs text-amber-400 font-semibold">{ag.role}</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-400">
                            <span>Department:</span>
                            <span className="text-white font-medium">{ag.department}</span>
                          </div>

                          <div className="flex items-center justify-between text-slate-400">
                            <span>Email:</span>
                            <span className="text-slate-300 font-mono">{ag.email}</span>
                          </div>

                          <div className="flex items-center justify-between text-slate-400">
                            <span>Phone:</span>
                            <span className="text-amber-300 font-mono">{ag.phone}</span>
                          </div>

                          <div className="flex items-center justify-between text-slate-400 pt-1">
                            <span>Active Load:</span>
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold text-[11px]">
                              {ticketCount} Active Tickets
                            </span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              const newStatus = ag.status === 'ACTIVE' ? 'OFFLINE' : 'ACTIVE';
                              updateAgent(ag.id, { status: newStatus });
                              showToast(`Status updated for ${ag.name} to ${newStatus}`);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                              ag.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-500/20 text-slate-400 border border-white/5'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${ag.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                            <span>{ag.status}</span>
                          </button>

                          {!ag.isMasterAdmin && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to remove ${ag.name} from the support team? All assigned tickets will return to Master Admin.`)) {
                                  removeAgent(ag.id);
                                  showToast(`Removed agent ${ag.name}. Tickets reassigned to Admin.`);
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition border border-rose-500/20"
                            >
                              Remove Agent
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* ============================================================= */}
      {/* MODAL 1: EDIT / CREATE TOUR PLAN                              */}
      {/* ============================================================= */}
      {editPlanModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0E1627] border border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isNewPlanMode ? 'Create New Tour Plan' : `Edit Plan: ${editingPlan.title}`}
                  </h3>
                  <p className="text-xs text-slate-400">Changes reflect immediately across all public tour catalog pages.</p>
                </div>
              </div>
              <button
                onClick={() => setEditPlanModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Plan Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.title}
                    onChange={(e) => setEditingPlan({ ...editingPlan, title: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Char Dham Maha Yatra"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={editingPlan.subtitle || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, subtitle: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="Yamunotri • Gangotri • Kedarnath • Badrinath"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
                  <select
                    value={editingPlan.category}
                    onChange={(e) => setEditingPlan({ ...editingPlan, category: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Spiritual & Char Dham">Spiritual & Char Dham</option>
                    <option value="High Altitude Treks">High Altitude Treks</option>
                    <option value="Heritage & Culture">Heritage & Culture</option>
                    <option value="Wildlife & Leisure">Wildlife & Leisure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Price Per Person (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingPlan.pricePerPerson}
                    onChange={(e) => setEditingPlan({ ...editingPlan, pricePerPerson: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-amber-400 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingPlan.originalPrice || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, originalPrice: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Duration Text</label>
                  <input
                    type="text"
                    value={editingPlan.duration || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="10 Days / 9 Nights"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Days Count (Number)</label>
                  <input
                    type="number"
                    value={editingPlan.daysCount || 1}
                    onChange={(e) => setEditingPlan({ ...editingPlan, daysCount: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Seats Left</label>
                  <input
                    type="number"
                    value={editingPlan.seatsLeft || 4}
                    onChange={(e) => setEditingPlan({ ...editingPlan, seatsLeft: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Grade</label>
                  <input
                    type="text"
                    value={editingPlan.grade || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, grade: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="Spiritual Yatra / Moderate"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Max Altitude</label>
                  <input
                    type="text"
                    value={editingPlan.altitude || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, altitude: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="Up to 3,584m"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Pickup / Drop</label>
                  <input
                    type="text"
                    value={editingPlan.pickupDrop || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, pickupDrop: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="Haridwar / Dehradun Airport"
                  />
                </div>
              </div>

              {/* Cover Image URL & Photo Upload with Live Preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">Cover Image</label>
                  <label className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1 transition">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoFileUpload(e.target.files?.[0], (dataUrl) => setEditingPlan({ ...editingPlan, image: dataUrl }))}
                    />
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={editingPlan.image}
                    onChange={(e) => setEditingPlan({ ...editingPlan, image: e.target.value })}
                    className="flex-1 bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="Upload photo above or paste image URL..."
                  />
                  {editingPlan.image && (
                    <img
                      src={editingPlan.image}
                      alt="Preview"
                      className="w-16 h-10 object-cover rounded-xl border border-white/20"
                    />
                  )}
                </div>
              </div>

              {/* Highlights (One per line) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Highlights (Enter one highlight per line)
                </label>
                <textarea
                  rows={3}
                  value={editingPlan.highlightsText || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, highlightsText: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="VIP Priority Darshan coordination&#10;Holy dip in Tapt Kund natural hot springs&#10;Comfortable deluxe twin-sharing stays"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditPlanModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Plan Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 2: EDIT / VERIFY VENDOR PROFILE                         */}
      {/* ============================================================= */}
      {editVendorModalOpen && editingVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0E1627] border border-blue-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isNewVendorMode ? 'Register New Native Artisan' : `Edit Profile: ${editingVendor.name}`}
                  </h3>
                  <p className="text-xs text-slate-400">Manage GI badges, business contact, craft specialties, and verification.</p>
                </div>
              </div>
              <button
                onClick={() => setEditVendorModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVendor} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Artisan / Master Name *</label>
                  <input
                    type="text"
                    required
                    value={editingVendor.name}
                    onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Meenakshi Joshi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Studio / Guild Name *</label>
                  <input
                    type="text"
                    required
                    value={editingVendor.studio}
                    onChange={(e) => setEditingVendor({ ...editingVendor, studio: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Aipan Heritage Studio, Almora"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Craft Category</label>
                  <input
                    type="text"
                    value={editingVendor.category}
                    onChange={(e) => setEditingVendor({ ...editingVendor, category: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Traditional Aipan Folk Art"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">District & Location</label>
                  <input
                    type="text"
                    value={editingVendor.district || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, district: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Almora, Kumaon"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingVendor.phone || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, phone: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="+91 94120 48219"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={editingVendor.whatsapp || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, whatsapp: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="919412048219"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={editingVendor.experienceYears || 0}
                    onChange={(e) => setEditingVendor({ ...editingVendor, experienceYears: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Verification Status & Badge Setting */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Verification Status</label>
                  <select
                    value={editingVendor.verificationStatus || (editingVendor.verified ? 'VERIFIED' : 'PENDING')}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingVendor({
                        ...editingVendor,
                        verificationStatus: val,
                        verified: val === 'VERIFIED'
                      });
                    }}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="VERIFIED">VERIFIED (Full Store Access)</option>
                    <option value="PENDING">PENDING (Under Review)</option>
                    <option value="REJECTED">REJECTED (Needs Correction)</option>
                    <option value="SUSPENDED">SUSPENDED (Temporarily Paused)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Public Badge Title</label>
                  <input
                    type="text"
                    value={editingVendor.badge || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, badge: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="GI Tagged Master Artisan • Verified"
                  />
                </div>
              </div>

              {/* Bio / Tagline */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Bio / Tagline</label>
                <textarea
                  rows={2}
                  value={editingVendor.tagline || ''}
                  onChange={(e) => setEditingVendor({ ...editingVendor, tagline: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="Preserving 1000-year sacred geometric Himalayan art through natural Geru & rice paste"
                />
              </div>

              {/* Avatar Image URL & Photo Upload with Live Preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">Profile Photo</label>
                  <label className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1 transition">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoFileUpload(e.target.files?.[0], (dataUrl) => setEditingVendor({ ...editingVendor, avatar: dataUrl }))}
                    />
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={editingVendor.avatar || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, avatar: e.target.value })}
                    className="flex-1 bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    placeholder="Upload photo above or paste image URL..."
                  />
                  {editingVendor.avatar && (
                    <img
                      src={editingVendor.avatar}
                      alt="Avatar"
                      className="w-10 h-10 object-cover rounded-xl border border-white/20"
                    />
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditVendorModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-blue-500/20 transition active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Vendor Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 3: ADD / EDIT GALLERY PHOTO CMS                         */}
      {/* ============================================================= */}
      {photoModalOpen && editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0E1627] border border-emerald-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isNewPhotoMode ? 'Add New Himalayan Photograph' : `Edit Photo: ${editingPhoto.title}`}
                  </h3>
                  <p className="text-xs text-slate-400">Live preview and instant synchronization to the public gallery.</p>
                </div>
              </div>
              <button
                onClick={() => setPhotoModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Photograph Title *</label>
                <input
                  type="text"
                  required
                  value={editingPhoto.title}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  placeholder="e.g. Kedarnath Dham Shrine under Alpenglow"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
                  <select
                    value={editingPhoto.category}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="High Peaks">High Peaks</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Local Arts & Culture">Local Arts & Culture</option>
                    <option value="Lakes & Valleys">Lakes & Valleys</option>
                    <option value="Wildlife">Wildlife</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Location / District</label>
                  <input
                    type="text"
                    value={editingPhoto.location}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                    placeholder="e.g. Rudraprayag (3,584m)"
                  />
                </div>
              </div>

              {/* Image URL & Instant Live Preview with Photo Upload */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">Image *</label>
                  <label className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1 transition">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoFileUpload(e.target.files?.[0], (dataUrl) => setEditingPhoto({ ...editingPhoto, image: dataUrl }))}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  required
                  value={editingPhoto.image}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, image: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 mb-2"
                  placeholder="Upload photo above or paste image URL..."
                />

                {editingPhoto.image && (
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-white/20 bg-slate-900 mt-2">
                    <img
                      src={editingPhoto.image}
                      alt="Live Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] text-emerald-400 font-bold border border-emerald-500/30">
                      Live Image Preview
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Photographer Name</label>
                  <input
                    type="text"
                    value={editingPhoto.photographer || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, photographer: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                    placeholder="e.g. Priyanshu Singh"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Initial Likes</label>
                  <input
                    type="number"
                    value={editingPhoto.likes || 10}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, likes: Number(e.target.value) })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={editingPhoto.description || ''}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                  placeholder="Describe the moment and Himalayan vista captured..."
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPhotoModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Gallery Image</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 4: EDIT DESTINATION                                     */}
      {/* ============================================================= */}
      {editDestModalOpen && editingDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0E1627] border border-sky-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="text-lg font-bold text-white">Edit Destination: {editingDest.name}</h3>
              <button
                onClick={() => setEditDestModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Starting Price (₹)</label>
                <input
                  type="number"
                  value={editingDest.startingPrice || 0}
                  onChange={(e) => setEditingDest({ ...editingDest, startingPrice: Number(e.target.value) })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-amber-400 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Altitude</label>
                <input
                  type="text"
                  value={editingDest.altitude || ''}
                  onChange={(e) => setEditingDest({ ...editingDest, altitude: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">Banner Image</label>
                  <label className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1 transition">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoFileUpload(e.target.files?.[0], (dataUrl) => setEditingDest({ ...editingDest, image: dataUrl }))}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={editingDest.image || ''}
                  onChange={(e) => setEditingDest({ ...editingDest, image: e.target.value })}
                  placeholder="Upload photo above or paste image URL..."
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Tagline / Overview</label>
                <textarea
                  rows={2}
                  value={editingDest.tagline || editingDest.description || ''}
                  onChange={(e) => setEditingDest({ ...editingDest, tagline: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditDestModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 5: EDIT INVENTORY ITEM                                  */}
      {/* ============================================================= */}
      {editInvModalOpen && editingInvItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0E1627] border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-base font-bold text-white">Edit Product: {editingInvItem.title}</h3>
              <button
                onClick={() => setEditInvModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveInvItem} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Product Price (₹)</label>
                <input
                  type="number"
                  value={editingInvItem.price || 0}
                  onChange={(e) => setEditingInvItem({ ...editingInvItem, price: Number(e.target.value) })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3 py-2 text-sm text-amber-400 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Stock Status</label>
                <select
                  value={editingInvItem.stockStatus || 'IN_STOCK'}
                  onChange={(e) => setEditingInvItem({ ...editingInvItem, stockStatus: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="IN_STOCK">IN_STOCK (Available for Immediate Order)</option>
                  <option value="LOW_STOCK">LOW_STOCK (Few units left)</option>
                  <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase">Product Image</label>
                  <label className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer flex items-center gap-1 transition">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoFileUpload(e.target.files?.[0], (dataUrl) => setEditingInvItem({ ...editingInvItem, image: dataUrl }))}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={editingInvItem.image || ''}
                  onChange={(e) => setEditingInvItem({ ...editingInvItem, image: e.target.value })}
                  placeholder="Upload photo above or paste image URL..."
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditInvModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 6: ADD SUPPORT TEAM MEMBER (SCALABLE FLEET DESK)        */}
      {/* ============================================================= */}
      {addAgentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0E1627] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Onboard Support Team Member
                  </h3>
                  <p className="text-xs text-slate-400">Grant authorized team credentials for customer assistance.</p>
                </div>
              </div>
              <button
                onClick={() => setAddAgentModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Agent Full Name *</label>
                <input
                  type="text"
                  required
                  value={newAgentForm.name}
                  onChange={(e) => setNewAgentForm({ ...newAgentForm, name: e.target.value })}
                  placeholder="e.g. Rajesh Rawat"
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newAgentForm.email}
                    onChange={(e) => setNewAgentForm({ ...newAgentForm, email: e.target.value })}
                    placeholder="e.g. rajesh@swargbraman.in"
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={newAgentForm.phone}
                    onChange={(e) => setNewAgentForm({ ...newAgentForm, phone: e.target.value })}
                    placeholder="e.g. +91 98765 12345"
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Department</label>
                <select
                  value={newAgentForm.department}
                  onChange={(e) => setNewAgentForm({ ...newAgentForm, department: e.target.value })}
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Booking & Expeditions">Booking Operations & Expeditions</option>
                  <option value="Emergency Response & Safety">Mountain Safety, Weather & Emergency Dispatch</option>
                  <option value="Char Dham & Temple Pilgrimages">Char Dham & Sacred Temple Pilgrimages</option>
                  <option value="District Haat & Artisan Guilds">13 Districts Haat & Artisan Guilds</option>
                  <option value="General Traveler Care">General Traveler Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Support Role Title *</label>
                <input
                  type="text"
                  required
                  value={newAgentForm.role}
                  onChange={(e) => setNewAgentForm({ ...newAgentForm, role: e.target.value })}
                  placeholder="e.g. High Altitude Guide Specialist"
                  className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Status</label>
                  <select
                    value={newAgentForm.status}
                    onChange={(e) => setNewAgentForm({ ...newAgentForm, status: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="OFFLINE">OFFLINE / ON LEAVE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Avatar Badge</label>
                  <select
                    value={newAgentForm.avatar}
                    onChange={(e) => setNewAgentForm({ ...newAgentForm, avatar: e.target.value })}
                    className="w-full bg-[#080D1A] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="👨‍💼">👨‍💼 Support Lead (Male)</option>
                    <option value="👩‍💼">👩‍💼 Support Lead (Female)</option>
                    <option value="🏔️">🏔️ Mountain Scout</option>
                    <option value="🛕">🛕 Temple Coordinator</option>
                    <option value="🎨">🎨 Artisan Guild</option>
                    <option value="🛡️">🛡️ Safety Warden</option>
                    <option value="🧭">🧭 Expedition Pilot</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setAddAgentModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-500/20"
                >
                  Onboard Agent to Fleet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: EDIT MERCHANDISE ITEM                                  */}
      {/* ------------------------------------------------------------- */}
      {isEditMerchModalOpen && editingMerch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-[#0B1E19] border border-emerald-500/40 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Edit Merchandise Item</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditMerchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditMerch} className="mt-4 space-y-4 text-xs">
              {/* Image Preview & Upload / URL Controls */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative group w-24 h-24 rounded-2xl overflow-hidden border border-amber-400/40 flex-shrink-0 bg-slate-900 shadow-md">
                    <img
                      src={editingMerch.image || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Camera className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-bold text-slate-200">
                        Product Photo
                      </label>
                      <span className="text-[10px] text-emerald-400 font-semibold">JPG, PNG, WebP</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs cursor-pointer flex items-center gap-1.5 transition shadow shadow-emerald-950/30">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoFileUpload(e.target.files?.[0], (dataUrl) => setEditingMerch({ ...editingMerch, image: dataUrl }))}
                        />
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={editingMerch.image || ''}
                        onChange={(e) => setEditingMerch({ ...editingMerch, image: e.target.value })}
                        placeholder="Or paste external image URL..."
                        className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-[11px] focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingMerch.title || ''}
                    onChange={(e) => setEditingMerch({ ...editingMerch, title: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-amber-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Subtitle / Highlight Tagline</label>
                  <input
                    type="text"
                    value={editingMerch.subtitle || ''}
                    onChange={(e) => setEditingMerch({ ...editingMerch, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={editingMerch.category || 'Apparel & Trek Gear'}
                    onChange={(e) => setEditingMerch({ ...editingMerch, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-amber-400"
                  >
                    {MERCHANDISE_CATEGORIES.filter(c => c !== 'All Items').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Badge (e.g. Bestseller, GI Tagged, Handmade)</label>
                  <input
                    type="text"
                    value={editingMerch.badge || ''}
                    onChange={(e) => setEditingMerch({ ...editingMerch, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-amber-300 focus:ring-1 focus:ring-amber-400 font-bold"
                  />
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/10 items-center">
                <div>
                  <label className="block font-semibold text-amber-300 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingMerch.price || 0}
                    onChange={(e) => setEditingMerch({ ...editingMerch, price: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-amber-500/30 rounded-xl text-amber-400 font-black text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={editingMerch.originalPrice || 0}
                    onChange={(e) => setEditingMerch({ ...editingMerch, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Stock Availability</label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingMerch.inStock)}
                      onChange={(e) => setEditingMerch({ ...editingMerch, inStock: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-500 bg-black/60 border-white/20 focus:ring-0 cursor-pointer"
                    />
                    <span className={`text-xs font-bold ${editingMerch.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {editingMerch.inStock ? '✓ In Stock Ready' : '✕ Out of Stock'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Artisan Guild / Sourcing */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Artisan Guild / Production Unit</label>
                <input
                  type="text"
                  value={editingMerch.artisanGuild || ''}
                  onChange={(e) => setEditingMerch({ ...editingMerch, artisanGuild: e.target.value })}
                  placeholder="e.g. SwargBhraman Alpine Gear Lab • Almora Unit"
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={editingMerch.description || ''}
                  onChange={(e) => setEditingMerch({ ...editingMerch, description: e.target.value })}
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white leading-relaxed focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Features (One per line) */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Key Features (One point per line)</label>
                <textarea
                  rows={3}
                  value={editingMerch.featuresText || ''}
                  onChange={(e) => setEditingMerch({ ...editingMerch, featuresText: e.target.value })}
                  placeholder="380 GSM Heavyweight organic fleece&#10;Windproof ribbed cuffs&#10;Golden embroidered Kedarnath spire"
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-xs leading-relaxed focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Sizes & Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={editingMerch.sizesText || ''}
                    onChange={(e) => setEditingMerch({ ...editingMerch, sizesText: e.target.value })}
                    placeholder="S, M, L, XL, XXL"
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Colors (Comma separated)</label>
                  <input
                    type="text"
                    value={editingMerch.colorsText || ''}
                    onChange={(e) => setEditingMerch({ ...editingMerch, colorsText: e.target.value })}
                    placeholder="Alpine Green, Midnight Black, Sand"
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditMerchModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-950/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-slate-950" />
                  <span>Save Merchandise Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: ADD NEW MERCHANDISE ITEM                               */}
      {/* ------------------------------------------------------------- */}
      {isAddMerchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-[#0B1E19] border border-emerald-500/40 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Add New Merchandise Gear</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddMerchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMerch} className="mt-4 space-y-4 text-xs">
              {/* Image Preview & Upload / URL Controls */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative group w-24 h-24 rounded-2xl overflow-hidden border border-amber-400/40 flex-shrink-0 bg-slate-900 shadow-md">
                    <img
                      src={newMerchForm.image || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Camera className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-bold text-slate-200">
                        Product Photo *
                      </label>
                      <span className="text-[10px] text-emerald-400 font-semibold">JPG, PNG, WebP</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs cursor-pointer flex items-center gap-1.5 transition shadow shadow-emerald-950/30">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoFileUpload(e.target.files?.[0], (dataUrl) => setNewMerchForm({ ...newMerchForm, image: dataUrl }))}
                        />
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={newMerchForm.image || ''}
                        onChange={(e) => setNewMerchForm({ ...newMerchForm, image: e.target.value })}
                        placeholder="Or paste external image URL..."
                        className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-[11px] focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SwargBhraman Alpine Summit Jacket"
                    value={newMerchForm.title}
                    onChange={(e) => setNewMerchForm({ ...newMerchForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Subtitle / Highlight Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. 700 Fill Power Goose Down with Waterproof Shell"
                    value={newMerchForm.subtitle}
                    onChange={(e) => setNewMerchForm({ ...newMerchForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={newMerchForm.category}
                    onChange={(e) => setNewMerchForm({ ...newMerchForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white"
                  >
                    {MERCHANDISE_CATEGORIES.filter(c => c !== 'All Items').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Badge (e.g. New Arrival, Bestseller)</label>
                  <input
                    type="text"
                    value={newMerchForm.badge}
                    onChange={(e) => setNewMerchForm({ ...newMerchForm, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-amber-300 font-bold"
                  />
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/10 items-center">
                <div>
                  <label className="block font-semibold text-amber-300 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newMerchForm.price}
                    onChange={(e) => setNewMerchForm({ ...newMerchForm, price: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-amber-500/30 rounded-xl text-amber-400 font-black text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={newMerchForm.originalPrice}
                    onChange={(e) => setNewMerchForm({ ...newMerchForm, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Initial Stock Status</label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newMerchForm.inStock}
                      onChange={(e) => setNewMerchForm({ ...newMerchForm, inStock: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-500 bg-black/60 border-white/20 focus:ring-0 cursor-pointer"
                    />
                    <span className={`text-xs font-bold ${newMerchForm.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {newMerchForm.inStock ? '✓ In Stock Ready' : '✕ Out of Stock'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Guild */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Artisan Guild / Supplier Unit</label>
                <input
                  type="text"
                  value={newMerchForm.artisanGuild}
                  onChange={(e) => setNewMerchForm({ ...newMerchForm, artisanGuild: e.target.value })}
                  placeholder="e.g. SwargBhraman Mountain Lab • Almora"
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the fabric, mountain utility, and cultural heritage..."
                  value={newMerchForm.description}
                  onChange={(e) => setNewMerchForm({ ...newMerchForm, description: e.target.value })}
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white leading-relaxed"
                />
              </div>

              {/* Features (One per line) */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Key Features (One point per line)</label>
                <textarea
                  rows={3}
                  value={newMerchForm.featuresText}
                  onChange={(e) => setNewMerchForm({ ...newMerchForm, featuresText: e.target.value })}
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Sizes & Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={newMerchForm.sizesText}
                    onChange={(e) => setNewMerchForm({ ...newMerchForm, sizesText: e.target.value })}
                    placeholder="S, M, L, XL, XXL"
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Colors (Comma separated)</label>
                  <input
                    type="text"
                    value={newMerchForm.colorsText}
                    onChange={(e) => setNewMerchForm({ ...newMerchForm, colorsText: e.target.value })}
                    placeholder="Alpine Green, Midnight Black, Sand"
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddMerchModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-950/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  <span>Publish Merchandise Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {broadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0B1E19] border border-emerald-500/40 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Broadcast Advisory to Providers</h3>
              </div>
              <button
                type="button"
                onClick={() => setBroadcastModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-emerald-300 mb-1">Target Audience</label>
                  <select
                    value={broadcastForm.targetRole}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, targetRole: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/50 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 text-xs"
                  >
                    <option value="all">🌐 All Providers (Guides & Artisans)</option>
                    <option value="guide">🧭 Mountain Guides Only</option>
                    <option value="vendor">🎨 Local Artisans Only</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-emerald-300 mb-1">Priority / Urgency</label>
                  <select
                    value={broadcastForm.priority}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, priority: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/50 border border-emerald-500/30 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 text-xs"
                  >
                    <option value="important">⚠️ Important Notice</option>
                    <option value="urgent">🚨 Urgent / SOS Warning</option>
                    <option value="normal">ℹ️ General Information</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={broadcastForm.category}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 text-xs"
                  >
                    <option value="Weather & Trail Advisory">Weather & Trail Advisory</option>
                    <option value="Route Permits & Forest Passes">Route Permits & Forest Passes</option>
                    <option value="Artisan Haat & Stall Allocation">Artisan Haat & Stall Allocation</option>
                    <option value="Payout & Zero Commission Remittance">Payout & Zero Commission Remittance</option>
                    <option value="Safety & Equipment Directives">Safety & Equipment Directives</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Official Sender Authority</label>
                  <input
                    type="text"
                    value={broadcastForm.sender}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, sender: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Advisory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 🚨 High Altitude Snowfall Advisory: Treks Above 11,000 ft"
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Advisory Bulletin Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter detailed directives for mountain guides or artisans..."
                  value={broadcastForm.message}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                  className="w-full p-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-xs leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setBroadcastModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-950/40 flex items-center gap-1.5"
                >
                  <Megaphone className="w-3.5 h-3.5" />
                  <span>Disseminate Broadcast Immediately</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
