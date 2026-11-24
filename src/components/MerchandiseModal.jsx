import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, CheckCircle2, ShieldCheck, ShoppingBag, Truck, 
  MapPin, Phone, User, CreditCard, Sparkles, AlertCircle 
} from 'lucide-react';

export default function MerchandiseModal({ 
  product, 
  isOpen, 
  onClose, 
  onConfirmOrder 
}) {
  const { currentUser } = useAuth();
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState(() => ({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi',
    upiId: ''
  }));

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: currentUser.name || prev.fullName,
        phone: currentUser.phone || prev.phone
      }));
    }
  }, [currentUser]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const shippingCost = 0; // Free shipping for Himalayan merchandise
  const grandTotal = (product.price * quantity) + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login first to complete your merchandise purchase.');
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill all required shipping fields');
      return;
    }

    setIsSubmitting(true);
    const orderId = `SB-MERCH-${Date.now().toString().slice(-6)}`;
    setPlacedOrderId(orderId);

    setTimeout(() => {
      const orderPayload = {
        orderId,
        productId: product.id,
        productTitle: product.title,
        size: selectedSize,
        color: selectedColor,
        quantity,
        pricePerUnit: product.price,
        grandTotal,
        customerName: formData.fullName,
        phone: formData.phone,
        deliveryAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        paymentMethod: formData.paymentMethod.toUpperCase(),
        orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        estimatedDelivery: '3 - 5 Days (SpeedPost / BlueDart)',
        artisanGuild: product.artisanGuild
      };

      if (onConfirmOrder) {
        onConfirmOrder(orderPayload);
      }

      setIsSubmitting(false);
      setOrderComplete(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0C1527] border border-slate-200 dark:border-amber-500/30 rounded-3xl shadow-2xl text-slate-900 dark:text-white overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-gradient-to-r dark:from-[#0F1E38] dark:to-[#121B2F] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 dark:border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
                Official SwargBhraman Store
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-950 dark:text-white">
                {orderComplete ? 'Merchandise Order Confirmed!' : 'Checkout & Express Dispatch'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition border border-slate-200 dark:border-transparent"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderComplete ? (
          /* Order Success State */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Order Placed Successfully</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                Dhanyavaad, {formData.fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                Your authentic Himalayan gear has been routed to our packing station. A tracking SMS has been dispatched to <strong>+91 {formData.phone}</strong>.
              </p>
            </div>

            <div className="p-4 bg-black/40 rounded-2xl border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Order Tracking ID:</span>
                <span className="font-mono text-amber-300 font-bold">{placedOrderId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Item:</span>
                <span className="text-white font-semibold">{product.title} (Qty: {quantity})</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Amount Paid:</span>
                <span className="text-emerald-400 font-bold text-sm">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Address:</span>
                <span className="text-slate-200 text-right truncate max-w-[220px]">{formData.address}, {formData.city}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition"
              >
                Back to Merchandise Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
            
            {/* Product Summary Mini Card */}
            <div className="p-3.5 bg-black/40 border border-white/10 rounded-2xl flex items-center gap-3.5">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-16 h-16 rounded-xl object-cover border border-amber-500/30 flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">{product.category}</span>
                <h4 className="font-bold text-white text-sm truncate">{product.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base font-extrabold text-amber-300 font-serif">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-slate-500 line-through">₹{product.originalPrice}</span>
                  )}
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    Free SpeedPost Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Select Options: Sizes & Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Select Size / Variant:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                          selectedSize === s
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-black/30 text-slate-300 border-white/15 hover:border-white/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Color / Finish:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                          selectedColor === c
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-black/30 text-slate-300 border-white/15 hover:border-white/30'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="font-semibold text-slate-300">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg bg-black/50 text-white font-bold border border-white/20 hover:bg-white/10 flex items-center justify-center"
                >
                  -
                </button>
                <span className="font-bold text-white text-sm w-5 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-7 h-7 rounded-lg bg-black/50 text-white font-bold border border-white/20 hover:bg-white/10 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <span className="font-bold text-amber-400 uppercase tracking-wider block text-[11px] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>Shipping Address (Across All India)</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Singh Mahar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Phone Number (For Tracking SMS) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Delivery Address (House/Street/Flat) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House No. 42, Mall Road, Near Clock Tower"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">City / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dehradun / Almora"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 248001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="font-bold text-slate-300 block">Payment Mode:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR Code', icon: '📱' },
                  { id: 'card', label: 'Debit / Credit Card', icon: '💳' },
                  { id: 'cod', label: 'Cash on Delivery', icon: '📦' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: mode.id })}
                    className={`p-2.5 rounded-xl text-left border transition flex flex-col items-center justify-center text-center gap-1 ${
                      formData.paymentMethod === mode.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{mode.icon}</span>
                    <span className="text-[10px] leading-tight">{mode.label}</span>
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'upi' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 flex items-center justify-between">
                  <span>Instant UPI QR code generated at next step (GPay / PhonePe / Paytm / BHIM)</span>
                  <span className="font-mono font-bold text-xs">swargbraman@upi</span>
                </div>
              )}
            </div>

            {/* Grand Total & Action */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">Grand Total:</span>
                <span className="text-xl font-extrabold text-amber-400 font-serif">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-white/15 text-slate-300 hover:bg-white/5 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs shadow-lg transition flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
