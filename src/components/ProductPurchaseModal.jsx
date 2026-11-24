import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { handleImageError } from '../utils/imageFallback';
import { 
  X, ShieldCheck, CheckCircle2, Truck, Package, 
  CreditCard, MapPin, Phone, User, QrCode, ArrowRight, 
  Printer, Sparkles, HeartHandshake, AlertCircle, ShoppingBag 
} from 'lucide-react';

export default function ProductPurchaseModal({ 
  isOpen, 
  onClose, 
  product, 
  onConfirmOrder 
}) {
  const { currentUser } = useAuth();
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState(() => ({
    name: currentUser?.name || 'Priyanshu Singh Mahar',
    phone: currentUser?.phone || '+91 94120 48219',
    address: 'Circular Road, Near Pine View',
    city: 'Dehradun',
    state: 'Uttarakhand',
    pincode: '248001',
    paymentMethod: 'upi',
    specialNotes: 'Please pack in eco-friendly pine wood container.'
  }));

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        phone: currentUser.phone || prev.phone
      }));
    }
  }, [currentUser]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const unitPrice = product.price || 300;
  const subtotal = unitPrice * quantity;
  const shippingFee = subtotal >= 500 ? 0 : 60;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = {
        orderId: `ORD-UK-${Math.floor(1000 + Math.random() * 9000)}`,
        productTitle: product.title,
        district: product.district,
        quantity,
        unitPrice,
        grandTotal,
        shippingFee,
        artisanGuild: product.artisanGuild,
        customerName: formData.name,
        customerPhone: formData.phone,
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        paymentMethod: formData.paymentMethod.toUpperCase(),
        orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        deliveryEst: '3 - 5 Business Days via Himalayan Speed Post',
        status: 'CONFIRMED & DISPATCH PREPARED'
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      if (onConfirmOrder) {
        onConfirmOrder(order);
      }
    }, 900);
  };

  const handleReset = () => {
    setConfirmedOrder(null);
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-[#0C121E] text-slate-900 dark:text-white border border-slate-200 dark:border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition border border-slate-200 dark:border-transparent"
        >
          ✕
        </button>

        {confirmedOrder ? (
          /* Order Confirmation View */
          <div className="text-center py-4 space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl">
              ✓
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                Order Placed Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-950 dark:text-white mt-2">
                SwargBhraman Haat Order Confirmed!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Your direct purchase has been allocated to <strong>{confirmedOrder.artisanGuild}</strong> in {confirmedOrder.district}.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-slate-50 dark:bg-[#070B14] p-6 rounded-2xl border border-slate-200 dark:border-white/10 text-left text-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-slate-400">Order Reference:</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300 text-sm">{confirmedOrder.orderId}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Purchased Specialty:</span>
                <span className="font-bold text-slate-900 dark:text-white text-right max-w-[260px] truncate">{confirmedOrder.productTitle}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Quantity & Weight:</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">{confirmedOrder.quantity} Units ({product.weight})</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Total Paid (Incl. Shipping):</span>
                <span className="font-extrabold text-amber-700 dark:text-amber-400 text-base font-serif">₹{confirmedOrder.grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Delivery Address:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 text-right max-w-[260px] truncate">{confirmedOrder.deliveryAddress}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-slate-400">Estimated Delivery:</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">{confirmedOrder.deliveryEst}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span>100% Direct Payout to Rural Mountain Producers Guarantee</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-200 dark:border-white/15"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Order Receipt</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg"
              >
                Continue Browsing Haat
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold uppercase mb-2 border border-emerald-500/30">
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Direct District Haat • Zero Middlemen
            </div>

            <h3 className="text-2xl font-extrabold font-serif text-slate-950 dark:text-white">
              Purchase Through SwargBhraman
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 mb-6">
              Procured directly from verified cooperatives, sweetmakers, and women's self-help groups in Uttarakhand.
            </p>

            {/* Product Summary Mini Card */}
            <div className="p-4 bg-slate-50 dark:bg-[#081715] rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-4 mb-6">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-white/10"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase block">
                  {product.district} Specialty • {product.category}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{product.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Pack: <strong className="text-slate-900 dark:text-white">{product.weight}</strong> • Guild: {product.artisanGuild}
                </p>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-2 bg-white dark:bg-black/40 p-1.5 rounded-xl border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white flex items-center justify-center font-bold"
                >
                  −
                </button>
                <span className="font-bold text-sm text-slate-900 dark:text-white px-1">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white dark:bg-[#081715] border border-slate-300 dark:border-white/15 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Phone (for Delivery SMS)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white dark:bg-[#081715] border border-slate-300 dark:border-white/15 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Delivery Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House/Flat No., Apartment, Street, Landmark"
                  className="w-full bg-white dark:bg-[#081715] border border-slate-300 dark:border-white/15 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white dark:bg-[#081715] border border-slate-300 dark:border-white/15 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white dark:bg-[#081715] border border-slate-300 dark:border-white/15 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Pincode</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-white dark:bg-[#081715] border border-slate-300 dark:border-white/15 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-2 font-semibold">Select Payment Method</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / GPay / QR', icon: '📱' },
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                    { id: 'card', label: 'Debit / Credit Card', icon: '💳' },
                    { id: 'netbanking', label: 'Net Banking', icon: '🏦' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        formData.paymentMethod === m.id
                          ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow'
                          : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="text-base mb-0.5">{m.icon}</div>
                      <div className="text-[10px] leading-tight">{m.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-3.5 bg-slate-50 dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10 space-y-1.5 pt-3">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Product Subtotal ({quantity}x ₹{unitPrice}):</span>
                  <span className="text-slate-900 dark:text-white font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Himalayan Speed Post Shipping:</span>
                  <span className={shippingFee === 0 ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-900 dark:text-white'}>
                    {shippingFee === 0 ? 'FREE (Orders ₹500+)' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 dark:text-white font-bold text-sm pt-2 border-t border-slate-200 dark:border-white/10">
                  <span>Total Amount:</span>
                  <span className="text-amber-700 dark:text-amber-300 font-serif text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-bold text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Securing with Mountain Guild...' : `Confirm Purchase (₹${grandTotal.toLocaleString('en-IN')})`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>100% Zero-Adulteration & Direct Artisan Support Guarantee</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
