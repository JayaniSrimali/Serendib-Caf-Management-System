import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, getCartTotal, clearCart } = useCart();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (!userInfo) {
            toast.error('Please login to checkout');
            navigate('/login?redirect=/cart');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    menuItem: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: Number(getCartTotal())
            };

            await axiosInstance.post('/orders', orderData);
            clearCart();
            toast.success('Order placed successfully! We are preparing it.');
            navigate('/dashboard'); // Need a dashboard/orders page
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#130f0c] text-white flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-40 h-40 bg-[#1a1511] rounded-full flex items-center justify-center shadow-lg border border-[#CDA177]/20 mb-8 text-[#CDA177]/50">
                    <ShoppingBag size={80} strokeWidth={1} />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Your cart is empty</h2>
                <p className="text-[#a09c99] mb-12 max-w-lg leading-relaxed text-[15px]">Looks like you haven't made your choice yet. Explore our handcrafted menu and find your perfect treat.</p>
                <Link to="/menu" className="bg-[#CDA177] text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#b88c64] transition-colors shadow-xl">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#130f0c] text-white min-h-screen py-24 px-6 md:px-12 selection:bg-[#CDA177] selection:text-black">
            <div className="max-w-[1200px] mx-auto">

                <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> SECURE CHECKOUT
                </h4>
                <h2 className="text-5xl font-serif font-bold text-white mb-12">Your Order Summary</h2>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 bg-[#1a1511] rounded-[32px] shadow-2xl border border-[#CDA177]/10 p-6 md:p-10">
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-[#CDA177]/10 last:border-0 last:pb-0">
                                    <div className="w-32 h-32 bg-black rounded-2xl overflow-hidden shrink-0 border border-[#CDA177]/20">
                                        <img src={item.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80'} alt={item.name} className="w-full h-full object-cover grayscale-[0.2]" />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between self-stretch py-2 w-full text-center sm:text-left">
                                        <div>
                                            <h3 className="font-serif font-bold text-2xl text-white tracking-wide">{item.name}</h3>
                                            <p className="text-[#CDA177] text-[10px] font-bold uppercase tracking-[0.2em] mt-2">{item.category}</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-0 gap-4">

                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-4 bg-[#130f0c] rounded-full px-5 py-2.5 border border-[#CDA177]/20">
                                                    <button onClick={() => addToCart(item, -1)} disabled={item.quantity <= 1} className="text-[#a09c99] hover:text-[#CDA177] disabled:opacity-30 transition-colors"><Minus size={14} /></button>
                                                    <span className="font-bold text-sm w-4 text-center text-white">{item.quantity}</span>
                                                    <button onClick={() => addToCart(item, 1)} className="text-[#a09c99] hover:text-[#CDA177] transition-colors"><Plus size={14} /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item._id)} className="text-[#a09c99] hover:text-red-400 transition-colors p-3 bg-[#130f0c] rounded-full border border-[#CDA177]/10 border-transparent hover:border-red-400/30">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="font-bold text-xl text-[#CDA177] sm:py-2">
                                                Rs. {(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#1a1511] border border-[#CDA177]/20 text-white rounded-[32px] p-8 md:p-10 sticky top-32 shadow-2xl relative overflow-hidden">
                            {/* Decorative blur element inner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CDA177]/5 rounded-bl-[100px] pointer-events-none"></div>

                            <h3 className="text-3xl font-serif font-bold mb-10 relative z-10">Checkout</h3>

                            <div className="space-y-5 mb-10 text-[#a09c99] text-[15px] relative z-10">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">Rs. {getCartTotal()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxes (10%)</span>
                                    <span className="text-white font-medium">Rs. {(Number(getCartTotal()) * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="w-full h-px bg-[#CDA177]/20 my-6"></div>
                                <div className="flex justify-between text-xl items-end">
                                    <span className="font-serif text-white tracking-wide">Total</span>
                                    <span className="font-bold text-[#CDA177] text-2xl">Rs. {(Number(getCartTotal()) * 1.1).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full bg-[#CDA177] text-black py-5 rounded-full font-bold tracking-[0.2em] text-[11px] uppercase hover:bg-[#b88c64] transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 relative z-10 shadow-xl shadow-black/50"
                            >
                                {loading ? 'Processing...' : 'Place Order'} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </button>

                            <div className="mt-10 flex items-center justify-center gap-3 text-[#a09c99] text-[11px] uppercase tracking-widest font-bold opacity-70 relative z-10">
                                <CreditCard size={14} /> Secure connection & payment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
