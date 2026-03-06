import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ShoppingBag, Clock, CheckCircle, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Dashboard = () => {
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userInfo, navigate]);

    if (!userInfo) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
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
                    {/* Profile Panel */}
                    <div className="bg-[#1a1511] p-10 rounded-[32px] shadow-2xl border border-[#CDA177]/10 self-start relative overflow-hidden group hover:border-[#CDA177]/30 transition-colors">
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

                    {/* Orders Panel */}
                    <div className="bg-[#1a1511] p-8 md:p-12 rounded-[32px] shadow-2xl border border-[#CDA177]/10 lg:col-span-2">
                        <h3 className="text-3xl font-serif font-bold text-white mb-10 flex items-center gap-4">
                            <ShoppingBag className="text-[#CDA177]" size={28} /> Recent Orders
                        </h3>

                        {loading ? (
                            <div className="text-center py-20 text-[#a09c99] text-[11px] font-bold uppercase tracking-[0.2em] border border-[#CDA177]/10 border-dashed rounded-3xl bg-[#130f0c]/50">
                                Loading your history...
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-20 bg-[#130f0c] rounded-3xl border border-[#CDA177]/10 border-dashed flex flex-col items-center justify-center">
                                <ShoppingBag size={48} className="text-[#CDA177]/20 mb-6" strokeWidth={1} />
                                <p className="text-[#a09c99] font-medium text-lg mb-2">No recent orders found.</p>
                                <p className="text-[#a09c99]/60 text-[13px] max-w-sm">When you place an order from our exquisite menu, your history will appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map(order => (
                                    <div key={order._id} className="bg-[#130f0c] p-6 md:p-8 rounded-[24px] border border-[#CDA177]/10 hover:border-[#CDA177]/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                                        <div className="flex-grow">
                                            <div className="text-[11px] text-[#CDA177]/80 font-bold tracking-widest uppercase mb-3 flex flex-wrap items-center gap-4">
                                                <span className="flex items-center gap-1.5 opacity-80"><Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                                <span className="w-1 h-1 bg-[#CDA177]/40 rounded-full"></span>
                                                <span className="flex items-center gap-1.5 opacity-80">{order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                                            </div>
                                            <h4 className="font-bold text-white font-serif text-2xl mb-2 tracking-wide">Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h4>
                                            <div className="flex items-center gap-6 mt-4">
                                                <p className="text-[13px] text-[#a09c99] font-medium flex items-center gap-2">
                                                    <ShoppingBag size={14} className="text-[#CDA177]/60" /> {order.orderItems.length} items
                                                </p>
                                                <p className="text-[13px] text-[#a09c99] font-medium flex items-center gap-2">
                                                    <CreditCard size={14} className="text-[#CDA177]/60" /> {order.paymentMethod === 'online' ? 'Paid Online' : 'Pay on Collection'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-[#CDA177]/10 md:border-t-0">
                                            <span className="font-bold text-[#CDA177] text-2xl tracking-wide">Rs. {order.totalPrice?.toFixed(2)}</span>
                                            <span className={`text-[10px] px-4 py-1.5 rounded-full flex items-center gap-2 font-bold tracking-[0.2em] uppercase
                                                ${order.status === 'Completed' ? 'bg-green-900/30 text-green-400 border border-green-500/20' :
                                                    order.status === 'Cancelled' ? 'bg-red-900/30 text-red-400 border border-red-500/20' :
                                                        'bg-[#CDA177]/10 text-[#CDA177] border border-[#CDA177]/30'}`}>
                                                <CheckCircle size={14} /> {order.status || 'Processing'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
