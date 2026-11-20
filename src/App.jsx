import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import ArtisansPage from './pages/ArtisansPage';
import EventsPage from './pages/EventsPage';
import FoodShopsPage from './pages/FoodShopsPage';
import MapPage from './pages/MapPage';
import AITripPlannerPage from './pages/AITripPlannerPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import LoginPage from './pages/LoginPage';
import GuidesPage from './pages/GuidesPage';
import MyTripsPage from './pages/MyTripsPage';
import TemplesHistoryPage from './pages/TemplesHistoryPage';
import DistrictsMarketplacePage from './pages/DistrictsMarketplacePage';
import PersonalSuggesterPage from './pages/PersonalSuggesterPage';

import UserPortal from './components/UserPortal';
import VendorPortal from './components/VendorPortal';
import AdminPortal from './components/AdminPortal';
import ProductPurchaseModal from './components/ProductPurchaseModal';

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
  const [destinations, setDestinations] = useState(DESTINATIONS);
  const [artisans, setArtisans] = useState(ARTISANS_AND_CRAFTS);
  const [foodShops, setFoodShops] = useState(FAMOUS_FOOD_AND_ART_SHOPS);
  const [events, setEvents] = useState(LIVE_AND_UPCOMING_EVENTS);
  const [photos, setPhotos] = useState(GALLERY_PHOTOS);
  const [reviews, setReviews] = useState(REVIEWS);
  const [userBookings, setUserBookings] = useState(INITIAL_USER_BOOKINGS);
  const [vendorProducts, setVendorProducts] = useState(INITIAL_VENDOR_PRODUCTS);
  const [guides, setGuides] = useState(LOCAL_GUIDES);
  const [templeSites, setTempleSites] = useState(FAMOUS_TEMPLES_AND_HISTORICAL_PLACES);
  const [districtsData, setDistrictsData] = useState(UTTARAKHAND_DISTRICTS_DATA);

  // Haat Purchase Modal State
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] = useState(null);
  const [haatOrders, setHaatOrders] = useState([]);

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingModalData, setBookingModalData] = useState({});

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
    setReviews([newRev, ...reviews]);
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
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#090E1A] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
          
          {/* Universal Multi-Page Sticky Navigation */}
          <Navbar
            bookingsCount={userBookings.length}
            onOpenBookingModal={handleOpenBookingModal}
          />

          {/* Dedicated Page Routes */}
          <main className="flex-1">
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
                    onOpenBookingModal={handleOpenBookingModal}
                  />
                }
              />

              {/* 2. Destinations Page */}
              <Route
                path="/destinations"
                element={
                  <DestinationsPage
                    destinations={destinations}
                    onBookLocation={handleOpenBookingModal}
                  />
                }
              />

              {/* 2b. Famous Temples & Historical Places Page */}
              <Route
                path="/temples-history"
                element={
                  <TemplesHistoryPage
                    sites={templeSites}
                    onBookSitePass={handleOpenBookingModal}
                  />
                }
              />

              {/* 2c. 13 Districts Famous Things & Haat Purchase Page */}
              <Route
                path="/districts-haat"
                element={
                  <DistrictsMarketplacePage
                    districtsData={districtsData}
                    onBuyProduct={handleOpenPurchaseModal}
                  />
                }
              />

              {/* 3. Artisans & Crafts Page */}
              <Route
                path="/artisans"
                element={
                  <ArtisansPage
                    artisans={artisans}
                    onBookWorkshop={handleBookArtisanWorkshop}
                  />
                }
              />

              {/* 4. Live Events Page */}
              <Route
                path="/events"
                element={
                  <EventsPage
                    events={events}
                    onBookEventPass={(evt) => handleOpenBookingModal(evt)}
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
                    onOpenBookingModal={handleOpenBookingModal}
                  />
                }
              />

              {/* 7. AI Trip Planner Page */}
              <Route
                path="/ai-planner"
                element={
                  <AITripPlannerPage
                    onBookGeneratedPlan={handleBookGeneratedPlan}
                  />
                }
              />

              {/* 7b. Personal Suggester & Mountain Matcher Page */}
              <Route
                path="/personal-suggester"
                element={
                  <PersonalSuggesterPage
                    onBookCircuit={handleOpenBookingModal}
                    onSaveToTrips={handleSaveSuggestedTrip}
                  />
                }
              />
              <Route
                path="/suggester"
                element={
                  <PersonalSuggesterPage
                    onBookCircuit={handleOpenBookingModal}
                    onSaveToTrips={handleSaveSuggestedTrip}
                  />
                }
              />

              {/* 8. Gallery Page */}
              <Route
                path="/gallery"
                element={
                  <GalleryPage
                    photos={photos}
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

              {/* 10. Login / Authentication Page */}
              <Route
                path="/login"
                element={<LoginPage />}
              />

              {/* 11. My Booked Trips Page */}
              <Route
                path="/my-trips"
                element={
                  <MyTripsPage
                    bookings={userBookings}
                    haatOrders={haatOrders}
                    onOpenBookingModal={handleOpenBookingModal}
                  />
                }
              />

              {/* 12. Mountain Guides Page */}
              <Route
                path="/guides"
                element={
                  <GuidesPage
                    guides={guides}
                    onBookGuide={handleBookGuide}
                  />
                }
              />

              {/* 13. User Portal Page */}
              <Route
                path="/portal/user"
                element={
                  <UserPortal
                    bookings={userBookings}
                    wishlist={[]}
                    onOpenBookingModal={handleOpenBookingModal}
                    onOpenAIPlanner={() => {}}
                  />
                }
              />

              {/* 12. Vendor Portal Page (Artisan & Business Hub) */}
              <Route
                path="/portal/vendor"
                element={
                  <VendorPortal
                    initialProducts={vendorProducts}
                    onAddNewProduct={handleAddNewVendorProduct}
                  />
                }
              />

              {/* 13. Admin Portal Page (State Trust Administration) */}
              <Route
                path="/portal/admin"
                element={
                  <AdminPortal
                    destinations={destinations}
                    artisans={artisans}
                    foodShops={foodShops}
                    bookings={userBookings}
                    reviews={reviews}
                  />
                }
              />
            </Routes>
          </main>

          {/* Universal Footer */}
          <Footer />

          {/* Universal Booking Checkout Modal */}
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            initialData={bookingModalData}
            onConfirmBooking={handleConfirmBooking}
          />

          {/* Direct District Haat Product Purchase Modal */}
          <ProductPurchaseModal
            isOpen={purchaseModalOpen}
            onClose={() => setPurchaseModalOpen(false)}
            product={selectedPurchaseProduct}
            onConfirmOrder={handleConfirmHaatOrder}
          />

        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
