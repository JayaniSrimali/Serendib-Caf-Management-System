import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, ArrowRight, Ticket, CheckCircle2, Truck, Store, MapPin, Wallet, X, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, getCartTotal, clearCart } = useCart();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Order Preference States
    const [orderType, setOrderType] = useState('pickup'); // 'pickup' or 'delivery'
    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'online'
    const [address, setAddress] = useState('');

    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

    // Promo Code states
    const [promoInput, setPromoInput] = useState('');
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);

    const handleApplyPromo = () => {
        const code = promoInput.toUpperCase();
        if (code === 'SERENDIB15') {
            setIsPromoApplied(true);
            setDiscountAmount(Number(getCartTotal()) * 0.15);
            toast.success('Promo SERENDIB15 Applied! 15% Discount');
        } else if (code === 'SERENDIB10') {
            setIsPromoApplied(true);
            setDiscountAmount(Number(getCartTotal()) * 0.1);
            toast.success('Promo SERENDIB10 Applied! 10% Discount');
        } else {
            toast.error('Invalid Promo Code');
        }
    };

    const subtotal = Number(getCartTotal());
    const tax = subtotal * 0.1;
    const deliveryFee = orderType === 'delivery' ? 250 : 0;
    const finalTotal = subtotal + tax + deliveryFee - discountAmount;

    const handleCheckoutInitiate = () => {
        if (!userInfo) {
            toast.error('Please login to checkout');
            navigate('/login?redirect=/cart');
            return;
        }

        if (orderType === 'delivery' && !address.trim()) {
            toast.error('Please provide a delivery address');
            return;
        }

        if (paymentMethod === 'online') {
            setShowPaymentModal(true);
        } else {
            handleFinalOrder();
        }
    };

    const handleFinalOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    menuItem: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.discountPrice && item.discountPrice < item.price ? item.discountPrice : item.price
                })),
                orderType,
                paymentMethod,
                deliveryAddress: orderType === 'delivery' ? address : 'Store Pickup',
                totalPrice: finalTotal,
                status: 'Processing'
            };

            await axiosInstance.post('/orders', orderData);
            clearCart();
            toast.success(paymentMethod === 'online' ? 'Payment processed & Order placed!' : 'Order confirmed! Pay on collection.');
            setShowPaymentModal(false);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#130f0c] text-white flex flex-col items-center justify-center py-20 px-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-40 h-40 bg-[#1a1511] rounded-full flex items-center justify-center shadow-lg border border-[#CDA177]/20 mb-8 text-[#CDA177]/50"
                >
                    <ShoppingBag size={80} strokeWidth={1} />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Your cart is empty</h2>
                <p className="text-[#a09c99] mb-12 max-w-lg leading-relaxed text-[15px]">Looks like you haven't made your choice yet. Explore our handcrafted menu and find your perfect treat.</p>
                <Link to="/menu" className="bg-[#CDA177] text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#b88c64] transition-colors shadow-xl shadow-black/40">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#130f0c] text-white min-h-screen py-24 px-6 md:px-12 selection:bg-[#CDA177] selection:text-black">
            <div className="max-w-[1200px] mx-auto">

                <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> FINAL STEP
                </h4>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <h2 className="text-5xl font-serif font-bold text-white">Review & Pay</h2>
                    <span className="text-[#a09c99] text-[12px] font-bold uppercase tracking-widest">{cartItems.length} Handcrafted items</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Section */}
                    <div className="lg:w-2/3 flex flex-col gap-10">

                        {/* 1. Order Type Selection */}
                        <div className="bg-[#1a1511] rounded-[32px] border border-[#CDA177]/10 p-8">
                            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-4">
                                <span className="text-[#CDA177]">01</span> How would you like your order?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <button
                                    onClick={() => setOrderType('delivery')}
                                    className={`flex flex-col items-center gap-4 p-8 rounded-3xl border transition-all ${orderType === 'delivery' ? 'bg-[#CDA177]/10 border-[#CDA177] text-[#CDA177]' : 'bg-black/20 border-[#CDA177]/10 text-[#a09c99] hover:border-[#CDA177]/30'}`}
                                >
                                    <Truck size={32} strokeWidth={1.5} />
                                    <span className="font-bold text-sm tracking-widest uppercase">Delivery</span>
                                </button>
                                <button
                                    onClick={() => setOrderType('pickup')}
                                    className={`flex flex-col items-center gap-4 p-8 rounded-3xl border transition-all ${orderType === 'pickup' ? 'bg-[#CDA177]/10 border-[#CDA177] text-[#CDA177]' : 'bg-black/20 border-[#CDA177]/10 text-[#a09c99] hover:border-[#CDA177]/30'}`}
                                >
                                    <Store size={32} strokeWidth={1.5} />
                                    <span className="font-bold text-sm tracking-widest uppercase">Store Pickup</span>
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {orderType === 'delivery' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-8 pt-8 border-t border-[#CDA177]/10 overflow-hidden"
                                    >
                                        <div className="relative">
                                            <MapPin size={18} className="absolute left-6 top-5 text-[#CDA177]" />
                                            <textarea
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Enter full delivery address in Colombo..."
                                                className="w-full bg-black/40 border border-[#CDA177]/20 rounded-2xl px-14 py-4 text-white text-sm focus:border-[#CDA177]/50 outline-none min-h-[100px] transition-all"
                                            ></textarea>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 2. Item Review */}
                        <div className="bg-[#1a1511] rounded-[32px] shadow-2xl border border-[#CDA177]/10 p-6 md:p-10">
                            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-4">
                                <span className="text-[#CDA177]">02</span> Review Items
                            </h3>
                            <div className="space-y-8">
                                <AnimatePresence mode="popLayout">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={item._id}
                                            className="flex items-center gap-6 pb-6 border-b border-[#CDA177]/10 last:border-0 last:pb-0"
                                        >
                                            <div className="w-20 h-20 bg-black rounded-xl overflow-hidden shrink-0 border border-[#CDA177]/10">
                                                <img src={item.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80'} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-serif font-bold text-lg text-white">{item.name}</h4>
                                                <p className="text-[#a09c99] text-xs">Qty: {item.quantity} x Rs. {(item.discountPrice || item.price).toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => addToCart(item, -1)} disabled={item.quantity <= 1} className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[#a09c99] hover:bg-[#CDA177] hover:text-black transition-all disabled:opacity-20"><Minus size={12} /></button>
                                                <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                                                <button onClick={() => addToCart(item, 1)} className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[#a09c99] hover:bg-[#CDA177] hover:text-black transition-all"><Plus size={12} /></button>
                                                <button onClick={() => removeFromCart(item._id)} className="ml-4 text-[#a09c99] hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* 3. Payment Method Selection */}
                        <div className="bg-[#1a1511] rounded-[32px] border border-[#CDA177]/10 p-8">
                            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-4">
                                <span className="text-[#CDA177]">03</span> Secure Payment Method
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <button
                                    onClick={() => setPaymentMethod('online')}
                                    className={`flex items-center gap-6 p-6 rounded-[24px] border transition-all ${paymentMethod === 'online' ? 'bg-[#CDA177]/10 border-[#CDA177] text-[#CDA177]' : 'bg-black/20 border-[#CDA177]/10 text-[#a09c99] hover:border-[#CDA177]/30'}`}
                                >
                                    <div className={`p-4 rounded-2xl ${paymentMethod === 'online' ? 'bg-[#CDA177] text-black' : 'bg-black/40 text-[#a09c99]'}`}>
                                        <CreditCard size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm uppercase tracking-widest">Pay Online</p>
                                        <p className="text-[10px] opacity-60">Visa, Mastercard, Koko</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`flex items-center gap-6 p-6 rounded-[24px] border transition-all ${paymentMethod === 'cash' ? 'bg-[#CDA177]/10 border-[#CDA177] text-[#CDA177]' : 'bg-black/20 border-[#CDA177]/10 text-[#a09c99] hover:border-[#CDA177]/30'}`}
                                >
                                    <div className={`p-4 rounded-2xl ${paymentMethod === 'cash' ? 'bg-[#CDA177] text-black' : 'bg-black/40 text-[#a09c99]'}`}>
                                        <Wallet size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm uppercase tracking-widest">{orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Store'}</p>
                                        <p className="text-[10px] opacity-60">Collect and pay later</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#1a1511] border border-[#CDA177]/20 text-white rounded-[40px] p-10 md:sticky md:top-32 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CDA177]/5 rounded-bl-[100px]"></div>

                            <h3 className="text-3xl font-serif font-bold mb-10">Order Total</h3>

                            <div className="space-y-6 mb-10 text-[#a09c99] text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxes & Service (10%)</span>
                                    <span className="text-white font-medium">Rs. {tax.toFixed(2)}</span>
                                </div>
                                {orderType === 'delivery' && (
                                    <div className="flex justify-between">
                                        <span>Delivery Fee</span>
                                        <span className="text-white font-medium">Rs. {deliveryFee.toFixed(2)}</span>
                                    </div>
                                )}
                                {isPromoApplied && (
                                    <div className="flex justify-between text-green-400 font-bold uppercase text-[10px]">
                                        <span>Promo Discount</span>
                                        <span>- Rs. {discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="w-full h-[1px] bg-[#CDA177]/10 my-6"></div>
                                <div className="flex justify-between items-end">
                                    <span className="font-serif text-white text-lg">Payable Total</span>
                                    <span className="font-bold text-[#CDA177] text-3xl">Rs. {finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Promo Code Input Minimal */}
                            <div className="relative mb-10">
                                <input
                                    type="text"
                                    value={promoInput}
                                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                                    placeholder="PROMO CODE"
                                    className="w-full bg-black/20 border border-[#CDA177]/10 rounded-full py-4 pl-6 pr-24 text-xs font-bold tracking-[0.2em] outline-none focus:border-[#CDA177]/40"
                                />
                                <button
                                    onClick={handleApplyPromo}
                                    className="absolute right-2 top-2 bottom-2 bg-[#CDA177] text-black px-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#b88c64]"
                                >
                                    Apply
                                </button>
                            </div>

                            <button
                                onClick={handleCheckoutInitiate}
                                disabled={loading}
                                className="w-full bg-[#CDA177] text-black py-6 rounded-full font-black tracking-[0.3em] text-[12px] uppercase hover:bg-white transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : (paymentMethod === 'online' ? 'Pay & Order' : 'Confirm Order')}
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>

                            <p className="mt-8 text-center text-[#a09c99] text-[10px] uppercase font-black tracking-widest opacity-50">
                                {orderType === 'pickup' ? 'Estimated Pickup: 15-20 mins' : 'Estimated Delivery: 30-45 mins'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {showPaymentModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-[500px] bg-[#1a1511] border border-[#CDA177]/20 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-[#CDA177]/10 flex justify-between items-center relative z-10">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-white mb-1">Secure Payment</h3>
                                    <p className="text-[#a09c99] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Lock size={12} className="text-[#CDA177]" /> 256-bit SSL encryption
                                    </p>
                                </div>
                                <button onClick={() => setShowPaymentModal(false)} className="text-[#a09c99] hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="p-8 lg:p-10 space-y-6">
                                {/* Card Visualization */}
                                <div className="w-full aspect-[1.7/1] bg-gradient-to-br from-[#CDA177] via-[#b88c64] to-[#8a684a] rounded-3xl p-8 relative overflow-hidden shadow-2xl mb-10">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-12 h-12 bg-[#130f0c]/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                                            <CreditCard className="text-white/80" />
                                        </div>
                                        <div className="text-[10px] font-black text-white/40 tracking-[0.35em] uppercase">Café Serendib</div>
                                    </div>
                                    <div className="text-white font-mono text-xl tracking-[0.2em] mb-8">
                                        {cardDetails.number || '•••• •••• •••• ••••'}
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-[8px] uppercase text-white/50 mb-1">Card Holder</p>
                                            <p className="text-xs font-bold text-white uppercase tracking-widest">{cardDetails.name || 'Your Name'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[8px] uppercase text-white/50 mb-1">Expires</p>
                                            <p className="text-xs font-bold text-white tracking-widest">{cardDetails.expiry || 'MM/YY'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name on Card"
                                        className="w-full bg-black/40 border border-[#CDA177]/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-[#CDA177]/50 outline-none transition-all"
                                        value={cardDetails.name}
                                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        maxLength="19"
                                        className="w-full bg-black/40 border border-[#CDA177]/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-[#CDA177]/50 outline-none transition-all"
                                        value={cardDetails.number}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                                            setCardDetails({ ...cardDetails, number: val });
                                        }}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            className="w-full bg-black/40 border border-[#CDA177]/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-[#CDA177]/50 outline-none transition-all"
                                            value={cardDetails.expiry}
                                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                        />
                                        <input
                                            type="password"
                                            placeholder="CVV"
                                            maxLength="3"
                                            className="w-full bg-black/40 border border-[#CDA177]/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-[#CDA177]/50 outline-none transition-all"
                                            value={cardDetails.cvv}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleFinalOrder}
                                    disabled={loading || !cardDetails.number || !cardDetails.cvv}
                                    className="w-full bg-[#CDA177] text-black py-5 rounded-full font-black tracking-[0.2em] text-[11px] uppercase hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 shadow-xl shadow-black/40"
                                >
                                    {loading ? 'Validating...' : `Pay Rs. ${finalTotal.toFixed(2)}`}
                                </button>

                                <p className="text-center text-[#a09c99] text-[9px] uppercase font-bold tracking-widest opacity-40">
                                    Your personal data will be used to process your order.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cart;
