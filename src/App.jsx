import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import { SupportProvider } from './context/SupportContext';
import ScrollToTop from './components/ScrollToTop';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LoginRequiredModal from './components/LoginRequiredModal';
import ThemeToggleButton from './components/ThemeToggleButton';
import CustomerSupportWidget from './components/CustomerSupportWidget';
import LogoutConfirmModal from './components/LogoutConfirmModal';

import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import ArtisansPage from './pages/ArtisansPage';
import EventsPage from './pages/EventsPage';
import FoodShopsPage from './pages/FoodShopsPage';
import MapPage from './pages/MapPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import LoginPage from './pages/LoginPage';
import ProviderLoginPage from './pages/ProviderLoginPage';
import GuidesPage from './pages/GuidesPage';
import MyTripsPage from './pages/MyTripsPage';
import TemplesHistoryPage from './pages/TemplesHistoryPage';
import DistrictsMarketplacePage from './pages/DistrictsMarketplacePage';
import PersonalSuggesterPage from './pages/PersonalSuggesterPage';
import WeatherForecastPage from './pages/WeatherForecastPage';
import MerchandisePage from './pages/MerchandisePage';
import DonationPage from './pages/DonationPage';
import TourPlansPage from './pages/TourPlansPage';
import SupportPage from './pages/SupportPage';

import UserPortal from './components/UserPortal';
import ProviderPortal from './components/ProviderPortal';
import VendorPortal from './components/VendorPortal';
import AdminPortal from './components/AdminPortal';
import ProductPurchaseModal from './components/ProductPurchaseModal';
import WeatherModal from './components/WeatherModal';
import RoleProtectedRoute from './components/RoleProtectedRoute';

// Isolated Administrative Subsystem Components (Dedicated Guard, Layout, & Login)
import AdminAuthGuard from './admin/AdminAuthGuard';
import AdminLoginPage from './admin/AdminLoginPage';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';

import { UTTARAKHAND_TOUR_PLANS } from './data/tourPlansData';
import { VENDOR_PROFILES } from './data/vendorPortalData';

import {
  DESTINATIONS,
  ARTISANS_AND_CRAFTS,
  LIVE_AND_UPCOMING_EVENTS,
  FAMOUS_FOOD_AND_ART_SHOPS,
  GALLERY_PHOTOS,
  REVIEWS,
  TOUR_PACKAGES,
  INITIAL_USER_BOOKINGS,
  INITIAL_VENDOR_PRODUCTS,
  LOCAL_GUIDES,
  FAMOUS_TEMPLES_AND_HISTORICAL_PLACES,
  UTTARAKHAND_DISTRICTS_DATA
} from './data/mockData';

export default function App() {
  // Clean slate: ensure all legacy mock reviews, guides, gallery photos, duplicate trial plans & demo packages are cleared
  try {
    if (localStorage.getItem('swargbraman_theme') === 'emerald') {
      localStorage.setItem('swargbraman_theme', 'swargbraman');
    }
    if (!localStorage.getItem('swargbraman_clean_slate_v4')) {
      localStorage.removeItem('swargbraman_reviews');
      localStorage.removeItem('swargbraman_guides');
      localStorage.removeItem('swargbraman_gallery_photos');
      localStorage.removeItem('swargbraman_donations');
      localStorage.removeItem('swargbraman_admin_packages');
      localStorage.setItem('swargbraman_theme', 'swargbraman');
      const savedPlans = localStorage.getItem('swargbraman_tour_plans');
      if (savedPlans) {
        try {
          const parsed = JSON.parse(savedPlans);
          const cleaned = parsed.filter(p => !p.title?.includes('(Copy)') && !p.id?.includes('copy'));
          localStorage.setItem('swargbraman_tour_plans', JSON.stringify(cleaned));
        } catch (e) {
          localStorage.removeItem('swargbraman_tour_plans');
        }
      }
      localStorage.setItem('swargbraman_clean_slate_v4', 'true');
    }
  } catch (e) {}
  const [destinations, setDestinations] = useState(DESTINATIONS);
  const [artisans, setArtisans] = useState(ARTISANS_AND_CRAFTS);
  const [foodShops, setFoodShops] = useState(FAMOUS_FOOD_AND_ART_SHOPS);
  const [events, setEvents] = useState(LIVE_AND_UPCOMING_EVENTS);
  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_gallery_photos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return GALLERY_PHOTOS;
  });
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return REVIEWS;
  });
  const [userBookings, setUserBookings] = useState(INITIAL_USER_BOOKINGS);
  const [vendorProducts, setVendorProducts] = useState(INITIAL_VENDOR_PRODUCTS);
  const [guides, setGuides] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_guides');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return LOCAL_GUIDES;
  });
  const [templeSites, setTempleSites] = useState(FAMOUS_TEMPLES_AND_HISTORICAL_PLACES);
  const [districtsData, setDistrictsData] = useState(UTTARAKHAND_DISTRICTS_DATA);
  const [packages, setPackages] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_admin_packages');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return TOUR_PACKAGES;
  });

  const [tourPlans, setTourPlans] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_tour_plans');
      if (saved) {
        const parsed = JSON.parse(saved);
        const cleaned = parsed.filter(p => !p.title?.includes('(Copy)') && !p.id?.includes('copy'));
        if (cleaned.length > 0) return cleaned;
      }
    } catch (e) {}
    return UTTARAKHAND_TOUR_PLANS;
  });

  const [vendors, setVendors] = useState(() => {
    try {
      const saved = localStorage.getItem('swargbraman_admin_vendors');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return VENDOR_PROFILES;
  });

  const handleUpdateTourPlans = (newPlans) => {
    setTourPlans(newPlans);
    try {
      localStorage.setItem('swargbraman_tour_plans', JSON.stringify(newPlans));
      localStorage.setItem('swargbraman_admin_packages', JSON.stringify(newPlans));
    } catch (e) {}
  };

  const handleUpdateVendors = (newVendors) => {
    setVendors(newVendors);
    try {
      localStorage.setItem('swargbraman_admin_vendors', JSON.stringify(newVendors));
    } catch (e) {}
  };

  const handleUpdatePhotos = (newPhotos) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem('swargbraman_gallery_photos', JSON.stringify(newPhotos));
    } catch (e) {}
  };

  const handleUpdateDestinations = (newDests) => {
    setDestinations(newDests);
    try {
      localStorage.setItem('swargbraman_destinations', JSON.stringify(newDests));
    } catch (e) {}
  };

  // Haat Purchase Modal State
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] = useState(null);
  const [haatOrders, setHaatOrders] = useState([]);

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingModalData, setBookingModalData] = useState({});

  // Live Weather Modal State
  const [weatherModalOpen, setWeatherModalOpen] = useState(false);
  const [selectedWeatherStationId, setSelectedWeatherStationId] = useState('kedarnath');

  const handleOpenWeatherModal = (stationId = 'kedarnath') => {
    setSelectedWeatherStationId(stationId);
    setWeatherModalOpen(true);
  };

  const handleOpenBookingModal = (data = {}) => {
    setBookingModalData(data);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (newBooking) => {
    setUserBookings([newBooking, ...userBookings]);
  };

  const handleBookGeneratedPlan = (generatedPlan) => {
    handleOpenBookingModal({
      title: generatedPlan.title,
      pricePerPerson: Math.round(generatedPlan.costBreakdown.total / (generatedPlan.travelersCount || 2)),
      startingPrice: Math.round(generatedPlan.costBreakdown.total / (generatedPlan.travelersCount || 2)),
      duration: `${generatedPlan.duration} Days`,
      region: 'Custom AI Circuit',
      location: generatedPlan.route.join(' → ')
    });
  };

  const handleBookArtisanWorkshop = (artisan) => {
    handleOpenBookingModal({
      title: `${artisan.workshopOffered} with ${artisan.name}`,
      startingPrice: artisan.workshopPrice + 2500,
      pricePerPerson: artisan.workshopPrice,
      region: artisan.region,
      location: artisan.locationName
    });
  };

  const handleBookGuide = (guide) => {
    handleOpenBookingModal({
      title: `Guided Expedition with ${guide.name} (${guide.badge})`,
      pricePerPerson: guide.dailyRate,
      startingPrice: guide.dailyRate,
      duration: '1-Day Certified Native Guide',
      region: guide.base,
      location: guide.specialties?.slice(0, 2).join(', ') || guide.base
    });
  };

  const handleAddNewReview = (newRev) => {
    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('swargbraman_reviews', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleConfirmMerchandiseOrder = (order) => {
    const orderBookingItem = {
      id: order.orderId,
      packageTitle: `Official Merchandise: ${order.productTitle}`,
      destination: `${order.deliveryAddress}`,
      travelDate: order.orderDate,
      returnDate: order.estimatedDelivery,
      travelers: order.quantity,
      totalPrice: order.grandTotal,
      status: 'SHIPPED VIA SPEEDPOST',
      stayType: `Size: ${order.size} • Color: ${order.color}`,
      pickupLocation: order.deliveryAddress,
      contactPerson: order.artisanGuild,
      artisanWorkshop: `Official SwargBhraman Gear (${order.productTitle})`
    };
    setUserBookings([orderBookingItem, ...userBookings]);
  };

  const handleAddNewPhoto = (newPhoto) => {
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    try {
      localStorage.setItem('swargbraman_gallery_photos', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddNewGuide = (newGuide) => {
    const updated = [newGuide, ...guides];
    setGuides(updated);
    try {
      localStorage.setItem('swargbraman_guides', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddNewVendorProduct = (newProd) => {
    setVendorProducts([newProd, ...vendorProducts]);
  };

  const handleOpenPurchaseModal = (product) => {
    setSelectedPurchaseProduct(product);
    setPurchaseModalOpen(true);
  };

  const handleConfirmHaatOrder = (order) => {
    setHaatOrders([order, ...haatOrders]);
    // Append directly to active passes so it tracks on My Trips
    const orderBookingItem = {
      id: order.orderId,
      packageTitle: `District Haat Order: ${order.productTitle}`,
      destination: `${order.district} District Haat Delivery`,
      travelDate: order.orderDate,
      returnDate: 'Delivery in 3-5 Days',
      travelers: order.quantity,
      totalPrice: order.grandTotal,
      status: 'PURCHASED & DISPATCHING',
      stayType: 'Eco Pine Wood Parcel',
      pickupLocation: order.deliveryAddress,
      contactPerson: `${order.artisanGuild}`,
      artisanWorkshop: `${order.productTitle} (${order.district})`
    };
    setUserBookings([orderBookingItem, ...userBookings]);
  };

  const handleSaveSuggestedTrip = (savedTrip) => {
    setUserBookings([savedTrip, ...userBookings]);
  };

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <WeatherProvider>
            <SupportProvider>
              <ScrollToTop />
              <AppShell
                userBookings={userBookings}
                handleOpenBookingModal={handleOpenBookingModal}
                handleOpenWeatherModal={handleOpenWeatherModal}
                destinations={destinations}
                artisans={artisans}
                events={events}
                foodShops={foodShops}
                photos={photos}
                reviews={reviews}
                templeSites={templeSites}
                districtsData={districtsData}
                guides={guides}
                tourPlans={tourPlans}
                handleUpdateTourPlans={handleUpdateTourPlans}
                vendors={vendors}
                handleUpdateVendors={handleUpdateVendors}
                handleUpdatePhotos={handleUpdatePhotos}
                handleUpdateDestinations={handleUpdateDestinations}
                vendorProducts={vendorProducts}
                setVendorProducts={setVendorProducts}
                haatOrders={haatOrders}
                handleBookArtisanWorkshop={handleBookArtisanWorkshop}
                handleBookGuide={handleBookGuide}
                handleAddNewReview={handleAddNewReview}
                handleConfirmMerchandiseOrder={handleConfirmMerchandiseOrder}
                handleAddNewPhoto={handleAddNewPhoto}
                handleAddNewGuide={handleAddNewGuide}
                handleAddNewVendorProduct={handleAddNewVendorProduct}
                handleOpenPurchaseModal={handleOpenPurchaseModal}
                handleConfirmHaatOrder={handleConfirmHaatOrder}
                handleSaveSuggestedTrip={handleSaveSuggestedTrip}
                bookingModalOpen={bookingModalOpen}
                setBookingModalOpen={setBookingModalOpen}
                bookingModalData={bookingModalData}
                handleConfirmBooking={handleConfirmBooking}
                purchaseModalOpen={purchaseModalOpen}
                setPurchaseModalOpen={setPurchaseModalOpen}
                selectedPurchaseProduct={selectedPurchaseProduct}
                weatherModalOpen={weatherModalOpen}
                setWeatherModalOpen={setWeatherModalOpen}
                selectedWeatherStationId={selectedWeatherStationId}
              />
            </SupportProvider>
          </WeatherProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function AppShell({
  userBookings,
  handleOpenBookingModal,
  handleOpenWeatherModal,
  destinations,
  artisans,
  events,
  foodShops,
  photos,
  reviews,
  templeSites,
  districtsData,
  guides,
  tourPlans,
  handleUpdateTourPlans,
  vendors,
  handleUpdateVendors,
  handleUpdatePhotos,
  handleUpdateDestinations,
  vendorProducts,
  setVendorProducts,
  haatOrders,
  handleBookArtisanWorkshop,
  handleBookGuide,
  handleAddNewReview,
  handleConfirmMerchandiseOrder,
  handleAddNewPhoto,
  handleAddNewGuide,
  handleAddNewVendorProduct,
  handleOpenPurchaseModal,
  handleConfirmHaatOrder,
  handleSaveSuggestedTrip,
  bookingModalOpen,
  setBookingModalOpen,
  bookingModalData,
  handleConfirmBooking,
  purchaseModalOpen,
  setPurchaseModalOpen,
  selectedPurchaseProduct,
  weatherModalOpen,
  setWeatherModalOpen,
  selectedWeatherStationId
}) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { currentUser } = useAuth();

  // Authentication barrier for bookings & purchases ("Please login first")
  const [loginRequiredModalOpen, setLoginRequiredModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // { type: 'booking' | 'purchase', data: any }

  // Auth-gated booking handler
  const guardedOpenBookingModal = (data = {}) => {
    if (!currentUser) {
      setPendingAction({ type: 'booking', data });
      setLoginRequiredModalOpen(true);
      return;
    }
    handleOpenBookingModal(data);
  };

  // Auth-gated purchase handler
  const guardedOpenPurchaseModal = (product) => {
    if (!currentUser) {
      setPendingAction({ type: 'purchase', data: product });
      setLoginRequiredModalOpen(true);
      return;
    }
    handleOpenPurchaseModal(product);
  };

  // Auth-gated artisan workshop booking
  const guardedBookArtisanWorkshop = (artisan) => {
    if (!currentUser) {
      setPendingAction({
        type: 'booking',
        data: {
          title: `${artisan.workshopOffered} with ${artisan.name}`,
          startingPrice: (artisan.workshopPrice || 1500) + 2500,
          pricePerPerson: artisan.workshopPrice || 1500,
          region: artisan.region,
          location: artisan.locationName
        }
      });
      setLoginRequiredModalOpen(true);
      return;
    }
    handleBookArtisanWorkshop(artisan);
  };

  // Auth-gated guide booking
  const guardedBookGuide = (guide) => {
    if (!currentUser) {
      setPendingAction({
        type: 'booking',
        data: {
          title: `Guided Expedition with ${guide.name} (${guide.badge})`,
          pricePerPerson: guide.dailyRate || 2200,
          startingPrice: guide.dailyRate || 2200,
          duration: '1-Day Certified Native Guide',
          region: guide.base,
          location: guide.specialties?.slice(0, 2).join(', ') || guide.base
        }
      });
      setLoginRequiredModalOpen(true);
      return;
    }
    handleBookGuide(guide);
  };

  // Resume pending action after successful authentication
  const handleLoginSuccess = () => {
    setLoginRequiredModalOpen(false);
    if (pendingAction?.type === 'booking') {
      handleOpenBookingModal(pendingAction.data || {});
    } else if (pendingAction?.type === 'purchase') {
      handleOpenPurchaseModal(pendingAction.data);
    }
    setPendingAction(null);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white dark:bg-[#070B19] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 transition-colors duration-300">
      
      {/* Universal Multi-Page Sticky Navigation (PUBLIC CONSUMER WEBSITE ONLY - HIDDEN ON ADMIN) */}
      {!isAdminRoute && (
        <Navbar
          bookingsCount={userBookings.length}
          onOpenBookingModal={guardedOpenBookingModal}
          onOpenWeatherModal={handleOpenWeatherModal}
        />
      )}

      {/* Dedicated Page Routes */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Routes>
              {/* 1. Home Page */}
              <Route
                path="/"
                element={
                  <HomePage
                    destinations={destinations}
                    artisans={artisans}
                    events={events}
                    foodShops={foodShops}
                    photos={photos}
                    reviews={reviews}
                    sites={templeSites}
                    onOpenBookingModal={guardedOpenBookingModal}
                    onOpenWeatherModal={handleOpenWeatherModal}
                  />
                }
              />

              {/* 2. Destinations Page */}
              <Route
                path="/destinations"
                element={
                  <DestinationsPage
                    destinations={destinations}
                    onBookLocation={guardedOpenBookingModal}
                  />
                }
              />

              {/* 2b. Famous Temples & Historical Places Page */}
              <Route
                path="/temples-history"
                element={
                  <TemplesHistoryPage
                    sites={templeSites}
                    onBookSitePass={guardedOpenBookingModal}
                  />
                }
              />

              {/* 2c. 13 Districts Famous Things & Haat Purchase Page */}
              <Route
                path="/districts-haat"
                element={
                  <DistrictsMarketplacePage
                    districtsData={districtsData}
                    onBuyProduct={guardedOpenPurchaseModal}
                  />
                }
              />

              {/* 3. Artisans & Crafts Page */}
              <Route
                path="/artisans"
                element={
                  <ArtisansPage
                    artisans={artisans}
                    onBookWorkshop={guardedBookArtisanWorkshop}
                  />
                }
              />

              {/* 4. Live Events Page */}
              <Route
                path="/events"
                element={
                  <EventsPage
                    events={events}
                    onBookEventPass={(evt) => guardedOpenBookingModal(evt)}
                  />
                }
              />

              {/* 5. Food & Sweets Page */}
              <Route
                path="/food-shops"
                element={
                  <FoodShopsPage
                    foodShops={foodShops}
                  />
                }
              />

              {/* 6. Map & Live Traffic Navigation Page */}
              <Route
                path="/map"
                element={
                  <MapPage
                    destinations={destinations}
                    artisans={artisans}
                    foodShops={foodShops}
                    events={events}
                    sites={templeSites}
                    onOpenBookingModal={guardedOpenBookingModal}
                  />
                }
              />

              {/* Redirection for deprecated AI Planner to Mountain Soul Suggester */}
              <Route path="/ai-planner" element={<Navigate to="/personal-suggester" replace />} />

              {/* 7b. Personal Suggester & Mountain Matcher Page */}
              <Route
                path="/personal-suggester"
                element={
                  <PersonalSuggesterPage
                    onBookCircuit={guardedOpenBookingModal}
                    onSaveToTrips={handleSaveSuggestedTrip}
                  />
                }
              />
              <Route
                path="/suggester"
                element={
                  <PersonalSuggesterPage
                    onBookCircuit={guardedOpenBookingModal}
                    onSaveToTrips={handleSaveSuggestedTrip}
                  />
                }
              />

              {/* 7c. Live Weather & Temperature Page */}
              <Route
                path="/weather"
                element={
                  <WeatherForecastPage
                    onBookTrip={guardedOpenBookingModal}
                    onOpenWeatherModal={handleOpenWeatherModal}
                  />
                }
              />

              {/* 8. Gallery Page */}
              <Route
                path="/gallery"
                element={
                  <GalleryPage
                    photos={photos}
                    onAddNewPhoto={handleAddNewPhoto}
                  />
                }
              />

              {/* 9. Reviews Page */}
              <Route
                path="/reviews"
                element={
                  <ReviewsPage
                    reviews={reviews}
                    onAddNewReview={handleAddNewReview}
                  />
                }
              />

              {/* 10. Login / Authentication Page (Traveler Explorer Hub) */}
              <Route
                path="/login"
                element={<LoginPage />}
              />

              {/* 10b. Dedicated Partner & Provider Login Page (Guides, Artisans, Local Shops) */}
              <Route
                path="/provider/login"
                element={<ProviderLoginPage />}
              />
              <Route path="/vendor/login" element={<Navigate to="/provider/login" replace />} />

              {/* 11. My Booked Trips Page (Travelers & Admin Only) */}
              <Route
                path="/my-trips"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'traveler']} portalName="My Booked Trips">
                    <MyTripsPage
                      bookings={userBookings}
                      haatOrders={haatOrders}
                      onOpenBookingModal={guardedOpenBookingModal}
                    />
                  </RoleProtectedRoute>
                }
              />

              {/* 12. Mountain Guides Page */}
              <Route
                path="/guides"
                element={
                  <GuidesPage
                    guides={guides}
                    onBookGuide={guardedBookGuide}
                    onAddNewGuide={handleAddNewGuide}
                  />
                }
              />

              {/* Dedicated Traveler Portal Hub (Travelers & Admin Only) */}
              <Route
                path="/portal/user"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'traveler']} portalName="Traveler Explorer Hub">
                    <UserPortal
                      bookings={userBookings}
                      wishlist={[]}
                      onOpenBookingModal={guardedOpenBookingModal}
                      onOpenAIPlanner={() => {}}
                    />
                  </RoleProtectedRoute>
                }
              />

              {/* 13. Curated Tour Plans & Expeditions */}
              <Route
                path="/tour-plans"
                element={<TourPlansPage tourPlans={tourPlans} onOpenBookingModal={guardedOpenBookingModal} />}
              />
              <Route path="/tours" element={<Navigate to="/tour-plans" replace />} />

              {/* 14. SwargBhraman Official Merchandise Store */}
              <Route
                path="/merchandise"
                element={<MerchandisePage onConfirmOrder={handleConfirmMerchandiseOrder} />}
              />
              <Route path="/store" element={<Navigate to="/merchandise" replace />} />

              {/* 15. Devbhoomi Seva & Temple Daan Contribution */}
              <Route
                path="/donate"
                element={<DonationPage />}
              />
              <Route path="/seva" element={<Navigate to="/donate" replace />} />

              {/* 16. 24x7 Customer Support & Live Admin Command */}
              <Route path="/support" element={<SupportPage />} />
              <Route path="/customer-support" element={<SupportPage />} />

              {/* ============================================================ */}
              {/* DEDICATED ISOLATED ADMIN SUBSYSTEM (GUARDED & DISTINCT)     */}
              {/* ============================================================ */}
              {/* 1. Dedicated Admin Login Gateway */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* 2. Guarded Admin Dashboard Routes */}
              <Route
                path="/admin"
                element={
                  <AdminAuthGuard>
                    <AdminLayout>
                      <AdminDashboard
                        tourPlans={tourPlans}
                        onUpdateTourPlans={handleUpdateTourPlans}
                        vendors={vendors}
                        onUpdateVendors={handleUpdateVendors}
                        photos={photos}
                        onUpdatePhotos={handleUpdatePhotos}
                        destinations={destinations}
                        onUpdateDestinations={handleUpdateDestinations}
                        vendorProducts={vendorProducts}
                        onUpdateVendorProducts={setVendorProducts}
                      />
                    </AdminLayout>
                  </AdminAuthGuard>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <AdminAuthGuard>
                    <AdminLayout>
                      <AdminDashboard
                        tourPlans={tourPlans}
                        onUpdateTourPlans={handleUpdateTourPlans}
                        vendors={vendors}
                        onUpdateVendors={handleUpdateVendors}
                        photos={photos}
                        onUpdatePhotos={handleUpdatePhotos}
                        destinations={destinations}
                        onUpdateDestinations={handleUpdateDestinations}
                        vendorProducts={vendorProducts}
                        onUpdateVendorProducts={setVendorProducts}
                      />
                    </AdminLayout>
                  </AdminAuthGuard>
                }
              />

              {/* Seamless redirect from legacy /portal/admin to /admin */}
              <Route path="/portal/admin" element={<Navigate to="/admin" replace />} />

              {/* Dedicated Provider Portal (VENDORS, GUIDES & ADMIN ONLY) */}
              <Route
                path="/portal/provider"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'vendor', 'guide']} portalName="Vendor & Guide Provider Portal">
                    <ProviderPortal />
                  </RoleProtectedRoute>
                }
              />
              <Route
                path="/portal/vendor"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'vendor', 'guide']} portalName="Vendor Portal">
                    <ProviderPortal />
                  </RoleProtectedRoute>
                }
              />
              <Route
                path="/portal/guide"
                element={
                  <RoleProtectedRoute allowedRoles={['admin', 'vendor', 'guide']} portalName="Guide Portal">
                    <ProviderPortal />
                  </RoleProtectedRoute>
                }
              />
              <Route path="/provider" element={<Navigate to="/portal/provider" replace />} />
              <Route path="/vendor" element={<Navigate to="/portal/provider" replace />} />
              <Route path="/portal-guide" element={<Navigate to="/portal/provider?role=guide" replace />} />
              <Route path="/guide-portal" element={<Navigate to="/portal/provider?role=guide" replace />} />
            </Routes>
          </main>

          {/* Universal Footer (PUBLIC CONSUMER WEBSITE ONLY - HIDDEN ON ADMIN) */}
          {!isAdminRoute && <Footer />}

          {/* Universal Booking Checkout Modal (PUBLIC CONSUMER WEBSITE ONLY) */}
          {!isAdminRoute && (
            <>
              <BookingModal
                isOpen={bookingModalOpen}
                onClose={() => setBookingModalOpen(false)}
                initialData={bookingModalData}
                onConfirmBooking={handleConfirmBooking}
              />
              <ProductPurchaseModal
                isOpen={purchaseModalOpen}
                onClose={() => setPurchaseModalOpen(false)}
                product={selectedPurchaseProduct}
                onConfirmOrder={handleConfirmHaatOrder}
              />
              <WeatherModal
                isOpen={weatherModalOpen}
                onClose={() => setWeatherModalOpen(false)}
                initialStationId={selectedWeatherStationId}
                onBookTrip={guardedOpenBookingModal}
              />
              <LoginRequiredModal
                isOpen={loginRequiredModalOpen}
                onClose={() => {
                  setLoginRequiredModalOpen(false);
                  setPendingAction(null);
                }}
                pendingAction={pendingAction}
                onLoginSuccess={handleLoginSuccess}
              />
              <CustomerSupportWidget />
              <LogoutConfirmModal />
              <ThemeToggleButton variant="floating" />
            </>
          )}

        </div>
  );
}
