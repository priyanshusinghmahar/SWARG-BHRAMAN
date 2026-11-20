import React, { useState } from 'react';
import { Store, Plus, Package, Calendar, Phone, MessageSquare, DollarSign, CheckCircle, ShieldCheck, ToggleLeft, ToggleRight, Sparkles, TrendingUp } from 'lucide-react';

export default function VendorPortal({ initialProducts, onAddNewProduct }) {
  const [currentVendor, setCurrentVendor] = useState({
    id: 'v-1',
    name: 'Meenakshi Joshi',
    studio: 'Aipan Heritage Studio, Paltan Bazar, Almora',
    category: 'Traditional Aipan Folk Art',
    phone: '+91 94120 48219',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    verified: true
  });

  const [isOpenForVisitors, setIsOpenForVisitors] = useState(true);
  const [products, setProducts] = useState(initialProducts);

  const [addProductModal, setAddProductModal] = useState(false);
  const [newProd, setNewProd] = useState({
    title: '',
    category: 'Aipan Art',
    price: '',
    stock: 10,
    description: ''
  });

  const [addWorkshopModal, setAddWorkshopModal] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    duration: '2.5 Hours',
    price: 750,
    maxSeats: 8
  });

  const [workshops, setWorkshops] = useState([
    { id: 'ws-1', title: '3-Hour Sacred Aipan Painting & Symbolism Masterclass', price: 750, bookings: 24, duration: '3 Hours' },
    { id: 'ws-2', title: 'Aipan Coaster & Wooden Tray Painting Session', price: 500, bookings: 14, duration: '1.5 Hours' }
  ]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.title || !newProd.price) return;

    const created = {
      id: `vp-${Date.now()}`,
      title: newProd.title,
      category: newProd.category,
      price: Number(newProd.price),
      stock: Number(newProd.stock),
      status: 'In Stock',
      ordersCount: 0,
      artisanName: currentVendor.name
    };

    setProducts([created, ...products]);
    if (onAddNewProduct) onAddNewProduct(created);

    setAddProductModal(false);
    setNewProd({ title: '', category: 'Aipan Art', price: '', stock: 10, description: '' });
  };

  const handleCreateWorkshop = (e) => {
    e.preventDefault();
    if (!newWorkshop.title) return;

    setWorkshops([
      ...workshops,
      {
        id: `ws-${Date.now()}`,
        title: newWorkshop.title,
        price: Number(newWorkshop.price),
        bookings: 0,
        duration: newWorkshop.duration
      }
    ]);

    setAddWorkshopModal(false);
    setNewWorkshop({ title: '', duration: '2.5 Hours', price: 750, maxSeats: 8 });
  };

  return (
    <div id="vendor-portal" className="py-14 bg-[#07100F] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vendor Header Card */}
        <div className="bg-[#0E201D]/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 mb-8 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <img
                src={currentVendor.avatar}
                alt={currentVendor.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold font-serif text-white">
                    {currentVendor.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Artisan Guild Partner
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentVendor.studio} • {currentVendor.category}
                </p>
                <div className="text-xs text-slate-300 mt-1 font-medium">
                  Verified Contact: <strong>{currentVendor.phone}</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="p-3 bg-black/40 rounded-2xl border border-white/10 flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300">Studio Open for Visitors:</span>
                <button
                  onClick={() => setIsOpenForVisitors(!isOpenForVisitors)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                    isOpenForVisitors
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isOpenForVisitors ? 'bg-white animate-pulse' : 'bg-slate-500'}`} />
                  <span>{isOpenForVisitors ? 'OPEN (Live on Map)' : 'CLOSED FOR DAY'}</span>
                </button>
              </div>

              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'meenakshi') {
                    setCurrentVendor({
                      id: 'v-1',
                      name: 'Meenakshi Joshi',
                      studio: 'Aipan Heritage Studio, Paltan Bazar, Almora',
                      category: 'Traditional Aipan Folk Art',
                      phone: '+91 94120 48219',
                      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
                      verified: true
                    });
                  } else if (val === 'harish') {
                    setCurrentVendor({
                      id: 'v-2',
                      name: 'Harish Tamta',
                      studio: 'Tamta Mohalla Metalcraft Lane, Almora',
                      category: 'Almora Hand-Hammered Copperware',
                      phone: '+91 98371 90432',
                      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                      verified: true
                    });
                  } else {
                    setCurrentVendor({
                      id: 'v-3',
                      name: 'Sunita Devi Bhotia',
                      studio: 'Johar Valley Weavers Guild, Munsiyari',
                      category: 'Bhotia Sheep Wool Handlooms',
                      phone: '+91 94563 11874',
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                      verified: true
                    });
                  }
                }}
                className="px-3.5 py-2.5 text-xs font-bold border border-white/20 rounded-xl bg-slate-900 text-white shadow focus:outline-none"
              >
                <option value="meenakshi">Switch: Meenakshi Joshi (Aipan)</option>
                <option value="harish">Switch: Harish Tamta (Copperware)</option>
                <option value="sunita">Switch: Sunita Bhotia (Woolens)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Vendor Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-[#0E201D] rounded-2xl border border-white/10 shadow">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Total Direct Sales</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold font-serif text-white">₹84,200</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">100% Payout • 0% Cut</div>
          </div>

          <div className="p-5 bg-[#0E201D] rounded-2xl border border-white/10 shadow">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Active Products</span>
              <Package className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold font-serif text-white">{products.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">All in active inventory</div>
          </div>

          <div className="p-5 bg-[#0E201D] rounded-2xl border border-white/10 shadow">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Workshop Bookings</span>
              <Calendar className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold font-serif text-white">38 Travelers</div>
            <div className="text-[11px] text-purple-400 font-semibold mt-1">Next session: Dec 16</div>
          </div>

          <div className="p-5 bg-[#0E201D] rounded-2xl border border-white/10 shadow">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Customer Rating</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold font-serif text-amber-300">4.95 / 5.0</div>
            <div className="text-[11px] text-slate-400 mt-1">From 132 reviews</div>
          </div>
        </div>

        {/* Section 1: Manage Products */}
        <div className="bg-[#0E201D] rounded-3xl p-6 sm:p-8 border border-white/10 shadow mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-white">
                Your Handcrafted Products & Catalog
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Add, manage stock, and sell authentic creations directly to travelers across the world.
              </p>
            </div>

            <button
              onClick={() => setAddProductModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-700 to-orange-700 hover:from-rose-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(prod => (
              <div
                key={prod.id}
                className="p-4 bg-black/40 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {prod.category}
                  </span>
                  <h4 className="font-bold text-white text-sm mt-1 leading-snug">
                    {prod.title}
                  </h4>
                  <div className="text-base font-extrabold text-amber-300 font-serif mt-2">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Stock: <strong>{prod.stock} units</strong> • {prod.ordersCount || 0} sold
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {prod.status}
                  </span>
                  <button
                    onClick={() => {
                      setProducts(products.map(p => p.id === prod.id ? { ...p, stock: p.stock + 1 } : p));
                    }}
                    className="text-slate-300 hover:text-white font-bold"
                  >
                    + Add Stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Manage Workshops */}
        <div className="bg-[#0E201D] rounded-3xl p-6 sm:p-8 border border-white/10 shadow mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-white">
                Your Studio Workshops & Masterclasses
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Offer tourists interactive mountain art and craft sessions right at your studio.
              </p>
            </div>

            <button
              onClick={() => setAddWorkshopModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Masterclass</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workshops.map(ws => (
              <div
                key={ws.id}
                className="p-5 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-white text-sm font-serif">
                    {ws.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Duration: {ws.duration} • Total Bookings: <strong>{ws.bookings}</strong>
                  </p>
                  <div className="text-sm font-extrabold text-amber-300 font-serif mt-2">
                    ₹{ws.price} / person
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold block mb-2 border border-emerald-500/30">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Inquiries */}
        <div className="bg-[#0E201D] rounded-3xl p-6 sm:p-8 border border-white/10 shadow">
          <h3 className="text-xl font-bold font-serif text-white mb-1">
            Recent Traveler Inquiries & Booking Requests
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Respond quickly to travelers interested in visiting your studio or buying custom creations.
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-white">Priyanshu Singh Mahar</span>
                <span className="text-slate-400"> • Dec 16 Booking • 2 Guests</span>
                <p className="text-slate-300 mt-1">"Looking forward to attending the 3-hour sacred Aipan painting session."</p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/919876543210"
                  className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg font-bold"
                >
                  WhatsApp
                </a>
                <a
                  href="tel:+919876543210"
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Add Product Modal */}
      {addProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0E221E] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/15 relative animate-in fade-in">
            <button
              onClick={() => setAddProductModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-serif text-white mb-4">
              Add New Handcrafted Product
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hand-painted Aipan Wooden Tray"
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                  >
                    <option value="Aipan Art">Aipan Art</option>
                    <option value="Copperware">Copperware</option>
                    <option value="Woolen Handloom">Woolen Handloom</option>
                    <option value="Organic Spices">Organic Spices</option>
                    <option value="Woodcraft">Garhwali Woodcraft</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1200"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Available Stock (Units)</label>
                <input
                  type="number"
                  value={newProd.stock}
                  onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddProductModal(false)}
                  className="flex-1 py-2.5 border border-white/15 rounded-xl font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-rose-700 to-orange-700 text-white rounded-xl font-bold"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Workshop Modal */}
      {addWorkshopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0E221E] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/15 relative animate-in fade-in">
            <button
              onClick={() => setAddWorkshopModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold font-serif text-white mb-4">
              Add New In-Person Masterclass
            </h3>

            <form onSubmit={handleCreateWorkshop} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Workshop Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2-Hour Traditional Metal Relief Beating Workshop"
                  value={newWorkshop.title}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newWorkshop.duration}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Fee per Traveler (₹)</label>
                  <input
                    type="number"
                    value={newWorkshop.price}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, price: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddWorkshopModal(false)}
                  className="flex-1 py-2.5 border border-white/15 rounded-xl font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl font-bold"
                >
                  Create Masterclass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
