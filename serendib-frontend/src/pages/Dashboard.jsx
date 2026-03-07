import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, ShoppingBag, Clock, CheckCircle, CreditCard, Calendar, Users, Trash2, Edit3, X, Star, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { userInfo, logout, updateProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(location.state?.tab || 'orders');

    // Profile State
    const [profileForm, setProfileForm] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        password: '',
        confirmPassword: ''
    });
    const [profileLoading, setProfileLoading] = useState(false);

    // Order Detail Modal State
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    // Editing State
    const [editingReservation, setEditingReservation] = useState(null);
    const [editForm, setEditForm] = useState({ date: '', time: '', guests: '' });

    // Feedback State
    const [feedbackForm, setFeedbackForm] = useState({ rating: 5, review: '' });
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [editingReview, setEditingReview] = useState(null);

    // Custom Confirm Modal State
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null
    });

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await axiosInstance.get('/orders/user');
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                toast.error("Could not load your orders.");
            }
        };

        const fetchReservations = async () => {
            try {
                const { data } = await axiosInstance.get('/reservations/my');
                setReservations(data);
            } catch (error) {
                console.error("Failed to fetch reservations:", error);
            }
        };

        const fetchMyReviews = async () => {
            try {
                const { data } = await axiosInstance.get('/reviews/my');
                setMyReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.allSettled([fetchOrders(), fetchReservations(), fetchMyReviews()]);
            setLoading(false);
        };

        fetchData();
    }, [userInfo, navigate]);

    if (!userInfo) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success("Successfully logged out");
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsOrderModalOpen(true);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (profileForm.password && profileForm.password !== profileForm.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setProfileLoading(true);
        try {
            await updateProfile({
                name: profileForm.name,
                email: profileForm.email,
                ...(profileForm.password && { password: profileForm.password })
            });
            setProfileForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
        } catch (error) {
            console.error(error);
        } finally {
            setProfileLoading(false);
        }
    };

    const handleDeleteReservation = (id) => {
        setConfirmModal({
            isOpen: true,
            title: 'Cancel Reservation?',
            message: 'This action will remove your table booking. You will need to book again if you change your mind.',
            onConfirm: async () => {
                try {
                    await axiosInstance.delete(`/reservations/${id}`);
                    setReservations(reservations.filter(r => r._id !== id));
                    toast.success('Reservation cancelled');
                } catch (error) {
                    toast.error('Failed to cancel reservation');
                }
            }
        });
    };

    const handleEditReservation = (res) => {
        setEditingReservation(res);
        setEditForm({
            date: new Date(res.date).toISOString().split('T')[0],
            time: res.time,
            guests: res.guests
        });
    };

    const handleUpdateReservation = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.put(`/reservations/${editingReservation._id}`, editForm);
            setReservations(reservations.map(r => r._id === data._id ? data : r));
            setEditingReservation(null);
            toast.success('Reservation updated');
        } catch (error) {
            toast.error('Failed to update reservation');
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setFeedbackLoading(true);
        try {
            if (editingReview) {
                const { data } = await axiosInstance.put(`/reviews/${editingReview._id}`, feedbackForm);
                setMyReviews(myReviews.map(r => r._id === data._id ? data : r));
                toast.success('Review updated!');
                setEditingReview(null);
            } else {
                const { data } = await axiosInstance.post('/reviews', {
                    name: userInfo.name,
                    role: 'Valued Customer',
                    rating: feedbackForm.rating,
                    review: feedbackForm.review,
                    image: '/assets/reviewer_1.png'
                });
                setMyReviews([data, ...myReviews]);
                toast.success('Thank you for your feedback!');
            }
            setFeedbackForm({ rating: 5, review: '' });
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit feedback');
        } finally {
            setFeedbackLoading(false);
        }
    };

    const handleDeleteReview = (id) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Feedback?',
            message: 'Are you sure you want to remove this review? This serendipitous memory will be lost forever.',
            onConfirm: async () => {
                try {
                    await axiosInstance.delete(`/reviews/${id}`);
                    setMyReviews(myReviews.filter(r => r._id !== id));
                    toast.success('Review deleted');
                } catch (error) {
                    toast.error('Failed to delete review');
                }
            }
        });
    };

    const handleEditReview = (rev) => {
        setEditingReview(rev);
        setFeedbackForm({ rating: rev.rating, review: rev.review });
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <div className="w-full bg-[#130f0c] text-white min-h-screen py-24 px-6 md:px-12 selection:bg-[#CDA177] selection:text-black">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row items-start lg:items-center justify-between gap-8 mb-16">
                    <div>
                        <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> MY ACCOUNT
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                            Welcome, {userInfo.name}
                        </h2>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-3 bg-[#1a1511] border border-[#CDA177]/20 text-[#a09c99] px-8 py-4 rounded-full hover:bg-red-900/40 hover:text-white hover:border-red-500/50 transition-colors font-bold uppercase text-[11px] tracking-widest">
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Panel: Profile & Tabs */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#1a1511] p-10 rounded-[32px] shadow-2xl border border-[#CDA177]/10 relative overflow-hidden group hover:border-[#CDA177]/30 transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CDA177]/5 rounded-bl-[100px] pointer-events-none group-hover:bg-[#CDA177]/10 transition-colors"></div>
                            <div className="w-20 h-20 bg-[#130f0c] rounded-full flex items-center justify-center text-[#CDA177] border border-[#CDA177]/20 mb-8 shadow-inner">
                                <User size={36} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-white mb-6 relative z-10">Profile Info</h3>
                            <p className="text-white font-medium mb-2 text-lg relative z-10">{userInfo.name}</p>
                            <p className="text-[#a09c99] text-[15px] mb-8 relative z-10">{userInfo.email}</p>
                            {userInfo.isAdmin && (
                                <span className="bg-[#CDA177] text-black px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] relative z-10 inline-block">
                                    Admin User
                                </span>
                            )}
                        </div>

                        {/* Side Tabs */}
                        <div className="bg-[#1a1511] p-4 rounded-[32px] border border-[#CDA177]/10 flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] transition-all ${activeTab === 'orders' ? 'bg-[#CDA177] text-black shadow-lg shadow-[#CDA177]/20' : 'text-[#a09c99] hover:bg-white/5'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <ShoppingBag size={18} /> Orders
                                </div>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-black/20 text-black' : 'bg-[#CDA177]/20 text-[#CDA177]'}`}>{orders.length}</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('reservations')}
                                className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] transition-all ${activeTab === 'reservations' ? 'bg-[#CDA177] text-black shadow-lg shadow-[#CDA177]/20' : 'text-[#a09c99] hover:bg-white/5'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <Calendar size={18} /> Reservations
                                </div>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'reservations' ? 'bg-black/20 text-black' : 'bg-[#CDA177]/20 text-[#CDA177]'}`}>{reservations.length}</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] transition-all ${activeTab === 'profile' ? 'bg-[#CDA177] text-black shadow-lg shadow-[#CDA177]/20' : 'text-[#a09c99] hover:bg-white/5'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <User size={18} /> Account Settings
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('feedback')}
                                className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] transition-all ${activeTab === 'feedback' ? 'bg-[#CDA177] text-black shadow-lg shadow-[#CDA177]/20' : 'text-[#a09c99] hover:bg-white/5'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <MessageSquare size={18} /> Share Feedback
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#1a1511] p-8 md:p-12 rounded-[32px] shadow-2xl border border-[#CDA177]/10 min-h-[600px]">

                            <AnimatePresence mode="wait">
                                {activeTab === 'orders' ? (
                                    <motion.div
                                        key="orders"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-3xl font-serif font-bold text-white mb-10 flex items-center gap-4">
                                            <ShoppingBag className="text-[#CDA177]" size={28} /> My Orders
                                        </h3>

                                        {loading ? (
                                            <div className="text-center py-20 text-[#a09c99] uppercase tracking-widest text-xs">Loading orders...</div>
                                        ) : orders.length === 0 ? (
                                            <div className="text-center py-20 border border-dashed border-[#CDA177]/20 rounded-3xl">
                                                <p className="text-[#a09c99]">No orders placed yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {orders.map(order => (
                                                    <div
                                                        key={order._id}
                                                        onClick={() => handleViewOrder(order)}
                                                        className="bg-[#130f0c] p-8 rounded-[24px] border border-[#CDA177]/10 hover:border-[#CDA177]/50 hover:bg-[#1a1511] cursor-pointer group transition-all flex flex-col md:flex-row justify-between items-center gap-6"
                                                    >
                                                        <div className="flex-grow">
                                                            <div className="text-[10px] text-[#CDA177] font-bold tracking-widest uppercase mb-3 flex items-center gap-4">
                                                                <span className="flex items-center gap-1.5"><Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                                                <span className="w-1 h-1 bg-[#CDA177]/30 rounded-full"></span>
                                                                <span className="uppercase">{order.orderType}</span>
                                                            </div>
                                                            <h4 className="font-serif font-bold text-2xl text-white mb-4 group-hover:text-[#CDA177] transition-colors">Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h4>
                                                            <div className="flex gap-4">
                                                                <span className="text-xs text-[#a09c99] flex items-center gap-2"><CreditCard size={14} /> {order.paymentMethod === 'online' ? 'Paid' : 'Cash'}</span>
                                                                <span className="text-xs text-[#a09c99] flex items-center gap-2"><ShoppingBag size={14} /> {order.orderItems.length} items</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                                            <span className="text-2xl font-bold text-[#CDA177]">Rs. {order.totalPrice?.toFixed(2)}</span>
                                                            <span className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border transition-colors ${order.status === 'Completed' ? 'border-green-500/50 text-green-400 bg-green-500/5' :
                                                                order.status === 'Cancelled' ? 'border-red-500/50 text-red-400 bg-red-500/5' :
                                                                    'border-[#CDA177]/30 text-[#CDA177]'
                                                                }`}>
                                                                {order.status || 'Processing'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ) : activeTab === 'profile' ? (
                                    <motion.div
                                        key="profile"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-3xl font-serif font-bold text-white mb-10 flex items-center gap-4">
                                            <Edit3 className="text-[#CDA177]" size={28} /> Account Settings
                                        </h3>

                                        <form onSubmit={handleUpdateProfile} className="space-y-8 max-w-xl">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-[#CDA177] uppercase tracking-widest ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={profileForm.name}
                                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                                    className="w-full bg-[#130f0c] border border-[#CDA177]/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#CDA177]/50 transition-all font-medium"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold text-[#CDA177] uppercase tracking-widest ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={profileForm.email}
                                                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                    className="w-full bg-[#130f0c] border border-[#CDA177]/10 rounded-2xl px-6 py-4 text-[#a09c99] outline-none focus:border-[#CDA177]/50 transition-all font-medium cursor-not-allowed opacity-60"
                                                    disabled
                                                />
                                                <p className="text-[9px] text-[#a09c99]/50 italic">Email address cannot be changed for security reasons.</p>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-[#CDA177] uppercase tracking-widest ml-1">New Password</label>
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={profileForm.password}
                                                        onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                                                        className="w-full bg-[#130f0c] border border-[#CDA177]/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#CDA177]/50 transition-all font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-bold text-[#CDA177] uppercase tracking-widest ml-1">Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={profileForm.confirmPassword}
                                                        onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                                                        className="w-full bg-[#130f0c] border border-[#CDA177]/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#CDA177]/50 transition-all font-medium"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={profileLoading}
                                                className="bg-[#CDA177] text-black px-12 py-5 rounded-full font-bold uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#CDA177]/10 disabled:opacity-50"
                                            >
                                                {profileLoading ? "Updating..." : "Save Changes"}
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : activeTab === 'feedback' ? (
                                    <motion.div
                                        key="feedback"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-3xl font-serif font-bold text-white mb-6 flex items-center gap-4">
                                            <MessageSquare className="text-[#CDA177]" size={28} /> Shared Feedback
                                        </h3>
                                        <p className="text-[#a09c99] text-sm mb-12 leading-relaxed max-w-lg">
                                            Your thoughts help us perfect the Café Serendib experience. Tell us about your latest brew or your table visit.
                                        </p>

                                        <form onSubmit={handleFeedbackSubmit} className="space-y-10 max-w-xl">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-[#CDA177] uppercase tracking-[0.3em] ml-1">Overall Rating</label>
                                                <div className="flex gap-4 p-6 bg-[#130f0c] rounded-[24px] border border-[#CDA177]/10 w-fit">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                                                            className={`transition-all ${feedbackForm.rating >= star ? 'text-[#CDA177] scale-110' : 'text-[#a09c99]/20'}`}
                                                        >
                                                            <Star size={28} fill={feedbackForm.rating >= star ? 'currentColor' : 'none'} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-[#CDA177] uppercase tracking-[0.3em] ml-1">Your Experience</label>
                                                <textarea
                                                    required
                                                    rows="5"
                                                    value={feedbackForm.review}
                                                    onChange={(e) => setFeedbackForm({ ...feedbackForm, review: e.target.value })}
                                                    placeholder="The coffee was exceptional, and the ambiance..."
                                                    className="w-full bg-[#130f0c] border border-[#CDA177]/10 rounded-[28px] px-8 py-6 text-white outline-none focus:border-[#CDA177]/50 transition-all font-medium resize-none placeholder:text-white/5"
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={feedbackLoading}
                                                className="bg-[#CDA177] text-black px-12 py-5 rounded-full font-bold uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#CDA177]/10 disabled:opacity-50 flex items-center gap-4"
                                            >
                                                {feedbackLoading ? "Processing..." : editingReview ? "Update Review" : "Submit Review"}
                                                <CheckCircle size={16} />
                                            </button>
                                            {editingReview && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingReview(null);
                                                        setFeedbackForm({ rating: 5, review: '' });
                                                    }}
                                                    className="ml-4 text-xs font-bold uppercase tracking-widest text-[#a09c99] hover:text-white transition-colors"
                                                >
                                                    Cancel Editing
                                                </button>
                                            )}
                                        </form>

                                        {/* My Existing Reviews */}
                                        <div className="mt-20">
                                            <h4 className="text-xl font-serif font-bold text-white mb-8 border-b border-[#CDA177]/10 pb-4">My Previous Feedback</h4>
                                            {myReviews.length === 0 ? (
                                                <p className="text-[#a09c99] italic text-sm">You haven't shared any feedback yet.</p>
                                            ) : (
                                                <div className="grid gap-6">
                                                    {myReviews.map((rev) => (
                                                        <div key={rev._id} className="bg-[#130f0c] p-6 rounded-[24px] border border-[#CDA177]/10 flex justify-between items-start group">
                                                            <div className="flex-grow">
                                                                <div className="flex gap-1 mb-3">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} size={12} fill={i < rev.rating ? '#CDA177' : 'none'} className={i < rev.rating ? 'text-[#CDA177]' : 'text-[#a09c99]/20'} />
                                                                    ))}
                                                                </div>
                                                                <p className="text-sm text-theme-textMuted/80 italic line-clamp-2 mb-2">"{rev.review}"</p>
                                                                <span className="text-[10px] text-[#a09c99] uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="flex gap-2 ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button onClick={() => handleEditReview(rev)} className="p-2 rounded-full bg-white/5 text-[#a09c99] hover:bg-[#CDA177] hover:text-black transition-all">
                                                                    <Edit3 size={14} />
                                                                </button>
                                                                <button onClick={() => handleDeleteReview(rev._id)} className="p-2 rounded-full bg-white/5 text-[#a09c99] hover:bg-red-500/20 hover:text-red-400 transition-all">
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="reservations"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="text-3xl font-serif font-bold text-white mb-10 flex items-center gap-4">
                                            <Calendar className="text-[#CDA177]" size={28} /> My Reservations
                                        </h3>

                                        {loading ? (
                                            <div className="text-center py-20 text-[#a09c99] uppercase tracking-widest text-xs">Loading reservations...</div>
                                        ) : reservations.length === 0 ? (
                                            <div className="text-center py-20 border border-dashed border-[#CDA177]/20 rounded-3xl">
                                                <p className="text-[#a09c99] mb-6">No reservations found.</p>
                                                <button onClick={() => navigate('/reserve')} className="bg-[#CDA177] text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">Book a Table</button>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {reservations.map(res => (
                                                    <div key={res._id} className="bg-[#130f0c] p-8 rounded-[24px] border border-[#CDA177]/10 hover:border-[#CDA177]/30 transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                                                        <div className="flex-grow">
                                                            <div className="text-[10px] text-[#CDA177] font-bold tracking-widest uppercase mb-3 flex items-center gap-4">
                                                                <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(res.date).toLocaleDateString()}</span>
                                                                <span className="w-1 h-1 bg-[#CDA177]/30 rounded-full"></span>
                                                                <span className="flex items-center gap-1.5"><Clock size={12} /> {res.time}</span>
                                                            </div>
                                                            <h4 className="font-serif font-bold text-2xl text-white mb-4">Table for {res.guests} Guests</h4>
                                                            <p className="text-xs text-[#a09c99] flex items-center gap-2 uppercase tracking-widest font-bold">
                                                                Status: <span className={res.status === 'Confirmed' ? 'text-green-400' : 'text-[#CDA177]'}>{res.status}</span>
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={() => handleEditReservation(res)}
                                                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a09c99] hover:bg-[#CDA177] hover:text-black transition-all"
                                                                title="Edit Booking"
                                                            >
                                                                <Edit3 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteReservation(res._id)}
                                                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a09c99] hover:bg-red-500/20 hover:text-red-400 transition-all"
                                                                title="Cancel Booking"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Reservation Modal */}
            <AnimatePresence>
                {editingReservation && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingReservation(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#1a1511] border border-[#CDA177]/20 p-10 rounded-[40px] w-full max-w-md shadow-2xl">
                            <h3 className="text-3xl font-serif font-bold text-white mb-8">Edit Booking</h3>
                            <form onSubmit={handleUpdateReservation} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#CDA177] mb-2 block ml-2">Reservation Date</label>
                                    <input required type="date" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} className="w-full bg-black/40 border border-[#CDA177]/10 rounded-2xl px-6 py-4 outline-none focus:border-[#CDA177]/50" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#CDA177] mb-2 block ml-2">Time Slot</label>
                                        <input required type="time" value={editForm.time} onChange={e => setEditForm({ ...editForm, time: e.target.value })} className="w-full bg-black/40 border border-[#CDA177]/10 rounded-2xl px-6 py-4 outline-none focus:border-[#CDA177]/50" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#CDA177] mb-2 block ml-2">Guests</label>
                                        <input required type="number" min="1" max="10" value={editForm.guests} onChange={e => setEditForm({ ...editForm, guests: e.target.value })} className="w-full bg-black/40 border border-[#CDA177]/10 rounded-2xl px-6 py-4 outline-none focus:border-[#CDA177]/50" />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setEditingReservation(null)} className="flex-1 px-8 py-4 rounded-full border border-[#CDA177]/20 font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                                    <button type="submit" className="flex-1 px-8 py-4 rounded-full bg-[#CDA177] text-black font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-all">Save Changes</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* ORDER DETAIL MODAL */}
            <AnimatePresence>
                {isOrderModalOpen && selectedOrder && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOrderModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="bg-[#1a1511] w-full max-w-2xl rounded-[40px] border border-[#CDA177]/20 relative z-10 overflow-hidden shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className="bg-[#130f0c] px-10 py-8 border-b border-[#CDA177]/10 flex justify-between items-center">
                                <div>
                                    <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-2 uppercase">Order Details</h4>
                                    <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">#{selectedOrder._id.substring(selectedOrder._id.length - 8).toUpperCase()}</h2>
                                </div>
                                <button
                                    onClick={() => setIsOrderModalOpen(false)}
                                    className="w-10 h-10 rounded-full border border-[#CDA177]/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                {/* Order Status Tracker */}
                                <div className="mb-12">
                                    <div className="flex justify-between relative">
                                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#CDA177]/10 transform -translate-y-1/2"></div>
                                        {['Pending', 'Processing', 'Ready', 'Completed'].map((lvl, i) => {
                                            const statuses = ['Pending', 'Processing', 'Ready', 'Completed'];
                                            const currentIdx = statuses.indexOf(selectedOrder.status || 'Pending');
                                            const stepIdx = statuses.indexOf(lvl);
                                            const isActive = stepIdx <= currentIdx || (selectedOrder.status === 'Completed' && stepIdx === 2); // 'Ready' is implicit if completed

                                            return (
                                                <div key={lvl} className="relative z-10 flex flex-col items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive ? 'bg-[#CDA177] border-[#CDA177] text-black' : 'bg-[#1a1511] border-[#CDA177]/20 text-[#CDA177]/40'}`}>
                                                        {isActive ? <CheckCircle size={14} className="stroke-[3px]" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                                    </div>
                                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-[#a09c99]'}`}>{lvl}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="space-y-6 mb-12">
                                    <h5 className="text-[10px] font-bold text-[#CDA177] uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                        Your Order List <span className="flex-grow h-[1px] bg-[#CDA177]/10"></span>
                                    </h5>
                                    {selectedOrder.orderItems.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#130f0c] border border-[#CDA177]/10 flex items-center justify-center text-[#CDA177] font-bold group-hover:border-[#CDA177]/40 transition-colors">
                                                    {item.quantity}
                                                </div>
                                                <div>
                                                    <h6 className="text-white font-bold text-sm tracking-wide">{item.name}</h6>
                                                    <p className="text-[10px] text-[#a09c99] tracking-widest uppercase">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <span className="text-white font-serif font-bold">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order & Delivery Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#CDA177]/10">
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-[#CDA177] uppercase tracking-widest mb-2">Order Method</p>
                                            <div className="flex items-center gap-3 text-white">
                                                <ShoppingBag size={16} className="text-[#a09c99]" />
                                                <span className="text-sm font-bold uppercase tracking-widest">{selectedOrder.orderType}</span>
                                            </div>
                                        </div>
                                        {selectedOrder.orderType === 'delivery' && (
                                            <div>
                                                <p className="text-[10px] font-bold text-[#CDA177] uppercase tracking-widest mb-2">Delivery Partner</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-[9px] font-bold tracking-widest uppercase">
                                                        Arriving with PickMe / Uber
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-[#CDA177] uppercase tracking-widest mb-2">Delivery Address</p>
                                            <div className="flex items-start gap-3 text-white">
                                                <Calendar size={16} className="text-[#a09c99] mt-0.5" />
                                                <span className="text-xs text-[#a09c99] leading-relaxed italic">{selectedOrder.deliveryAddress || 'No address provided'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer / Summary */}
                            <div className="bg-[#130f0c] px-10 py-10 border-t border-[#CDA177]/10">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[#a09c99] text-[10px] font-bold uppercase tracking-widest mb-1">Total Amount</p>
                                        <h3 className="text-3xl font-serif font-bold text-[#CDA177]">Rs. {selectedOrder.totalPrice.toFixed(2)}</h3>
                                    </div>
                                    <button
                                        onClick={() => setIsOrderModalOpen(false)}
                                        className="bg-[#CDA177] text-black px-10 py-4 rounded-full font-bold uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#CDA177]/10"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* CUSTOM CONFIRMATION MODAL */}
            <AnimatePresence>
                {confirmModal.isOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                            className="absolute inset-0 bg-[#0a0807]/90 backdrop-blur-md"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#1a1511] w-full max-w-sm rounded-[32px] border border-[#CDA177]/20 relative z-10 overflow-hidden shadow-2xl p-10 text-center"
                        >
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6 border border-red-500/20">
                                <Trash2 size={28} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-4 tracking-tight">{confirmModal.title}</h3>
                            <p className="text-[#a09c99] text-sm leading-relaxed mb-10">{confirmModal.message}</p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        confirmModal.onConfirm();
                                        setConfirmModal({ ...confirmModal, isOpen: false });
                                    }}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-red-500/20"
                                >
                                    Confirm Action
                                </button>
                                <button
                                    onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                                    className="w-full bg-transparent border border-[#CDA177]/10 text-[#a09c99] py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
