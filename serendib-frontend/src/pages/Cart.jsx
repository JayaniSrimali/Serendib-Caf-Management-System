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
            <div className="w-full min-h-screen bg-theme-bg flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-32 h-32 bg-theme-card rounded-full flex items-center justify-center shadow-sm border border-black/5 mb-6 text-theme-text/20">
                    <ShoppingBag size={64} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-theme-text mb-4">Your cart is empty</h2>
                <p className="text-theme-text/60 mb-8 max-w-md">Looks like you haven't made your choice yet. Explore our handcrafted menu and find your perfect treat.</p>
                <Link to="/menu" className="bg-theme-accent text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-wider hover:bg-theme-dark transition-colors shadow-lg">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full bg-theme-bg min-h-screen py-16 px-6 md:px-12">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-4xl font-serif font-bold text-theme-text mb-10">Your Order summary</h2>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 bg-theme-card rounded-[32px] shadow-sm border border-black/5 p-6 md:p-10 border border-theme-text/20/5">
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-theme-text/20/10 last:border-0 last:pb-0">
                                    <div className="w-32 h-32 bg-theme-bg rounded-2xl overflow-hidden shrink-0">
                                        <img src={item.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80'} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between self-stretch py-2 w-full text-center sm:text-left">
                                        <div>
                                            <h3 className="font-serif font-bold text-xl text-theme-text">{item.name}</h3>
                                            <p className="text-theme-text/60 text-sm mt-1">{item.category}</p>
                                        </div>
                                        <div className="flex items-center justify-center sm:justify-start gap-6 mt-4 sm:mt-0">
                                            <div className="flex items-center gap-4 bg-theme-bg rounded-full px-4 py-2 border border-theme-text/20/10">
                                                <button onClick={() => addToCart(item, -1)} disabled={item.quantity <= 1} className="text-theme-text hover:text-theme-accent disabled:opacity-30"><Minus size={16} /></button>
                                                <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => addToCart(item, 1)} className="text-theme-text hover:text-theme-accent"><Plus size={16} /></button>
                                            </div>
                                            <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 transition-colors p-2 bg-red-50 rounded-full">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="font-bold text-xl text-theme-text sm:self-end sm:py-2">
                                        Rs. {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-theme-dark text-white rounded-[32px] p-8 md:p-10 sticky top-32 shadow-xl">
                            <h3 className="text-2xl font-serif font-bold mb-8">Checkout</h3>

                            <div className="space-y-4 mb-8 text-theme-textMuted text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">Rs. {getCartTotal()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxes (10%)</span>
                                    <span className="text-white font-medium">Rs. {(Number(getCartTotal()) * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="w-full h-px bg-[#D8C7B9]/20 my-4"></div>
                                <div className="flex justify-between text-lg">
                                    <span className="font-serif text-white">Total</span>
                                    <span className="font-bold text-theme-accent">Rs. {(Number(getCartTotal()) * 1.1).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full bg-theme-accent text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-theme-card hover:text-theme-text transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Place Order'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 flex items-center justify-center gap-2 text-theme-textMuted text-xs opacity-70">
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
