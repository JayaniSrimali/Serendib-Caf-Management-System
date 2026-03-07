import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ShoppingBag, Clock, CheckCircle, CreditCard, Calendar, Users, Trash2, Edit3, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'reservations'

    // Editing State
    const [editingReservation, setEditingReservation] = useState(null);
    const [editForm, setEditForm] = useState({ date: '', time: '', guests: '' });

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const [ordersRes, reservationsRes] = await Promise.all([
                    axiosInstance.get('/orders/user'),
                    axiosInstance.get('/reservations/my')
                ]);
                setOrders(ordersRes.data);
                setReservations(reservationsRes.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userInfo, navigate]);

    if (!userInfo) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteReservation = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this reservation?')) return;

        try {
            await axiosInstance.delete(`/reservations/${id}`);
            setReservations(reservations.filter(r => r._id !== id));
            toast.success('Reservation cancelled');
        } catch (error) {
            toast.error('Failed to cancel reservation');
        }
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
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] transition-all ${activeTab === 'orders' ? 'bg-[#CDA177] text-black shadow-lg shadow-[#CDA177]/20' : 'text-[#a09c99] hover:bg-white/5'}`}
                            >
                                <ShoppingBag size={18} /> Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('reservations')}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] transition-all ${activeTab === 'reservations' ? 'bg-[#CDA177] text-black shadow-lg shadow-[#CDA177]/20' : 'text-[#a09c99] hover:bg-white/5'}`}
                            >
                                <Calendar size={18} /> Reservations
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
                                                    <div key={order._id} className="bg-[#130f0c] p-8 rounded-[24px] border border-[#CDA177]/10 hover:border-[#CDA177]/30 transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                                                        <div className="flex-grow">
                                                            <div className="text-[10px] text-[#CDA177] font-bold tracking-widest uppercase mb-3 flex items-center gap-4">
                                                                <span className="flex items-center gap-1.5"><Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                                                <span className="w-1 h-1 bg-[#CDA177]/30 rounded-full"></span>
                                                                <span className="uppercase">{order.orderType}</span>
                                                            </div>
                                                            <h4 className="font-serif font-bold text-2xl text-white mb-4">Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h4>
                                                            <div className="flex gap-4">
                                                                <span className="text-xs text-[#a09c99] flex items-center gap-2"><CreditCard size={14} /> {order.paymentMethod === 'online' ? 'Paid' : 'Cash'}</span>
                                                                <span className="text-xs text-[#a09c99] flex items-center gap-2"><ShoppingBag size={14} /> {order.orderItems.length} items</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                                            <span className="text-2xl font-bold text-[#CDA177]">Rs. {order.totalPrice?.toFixed(2)}</span>
                                                            <span className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border ${order.status === 'Completed' ? 'border-green-500/50 text-green-400 bg-green-500/5' : 'border-[#CDA177]/30 text-[#CDA177]'}`}>
                                                                {order.status || 'Processing'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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
        </div>
    );
};

export default Dashboard;
