import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ShoppingBag, Clock, CheckCircle } from 'lucide-react';
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
        <div className="w-full bg-theme-bg min-h-screen py-24 px-6 md:px-12">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row items-start lg:items-center justify-between gap-8 mb-16">
                    <div>
                        <h4 className="text-theme-accent font-bold tracking-[0.2em] text-sm mb-4 uppercase">My Account</h4>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-text">
                            Welcome, {userInfo.name}
                        </h2>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 bg-theme-dark text-white px-6 py-3 rounded-full hover:bg-theme-accent transition-colors font-semibold text-sm">
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Panel */}
                    <div className="bg-theme-card p-8 rounded-[32px] shadow-none border border-white/5 border border-theme-text/20/5 self-start">
                        <div className="w-16 h-16 bg-theme-bg rounded-full flex items-center justify-center text-theme-accent mb-6">
                            <User size={32} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-theme-text mb-4">Profile Info</h3>
                        <p className="text-theme-text/70 font-medium mb-1">{userInfo.name}</p>
                        <p className="text-theme-text/60 text-sm mb-4">{userInfo.email}</p>

                        {userInfo.isAdmin && (
                            <span className="bg-theme-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest leading-none block w-max mt-4">
                                Admin User
                            </span>
                        )}
                    </div>

                    {/* Orders Panel */}
                    <div className="bg-theme-card p-8 rounded-[32px] shadow-none border border-white/5 border border-theme-text/20/5 lg:col-span-2">
                        <h3 className="text-2xl font-serif font-bold text-theme-text mb-6 flex items-center gap-3">
                            <ShoppingBag className="text-theme-accent" /> Recent Orders
                        </h3>

                        {loading ? (
                            <div className="text-center py-10 text-theme-text/50 font-medium">Loading orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-10 bg-theme-bg rounded-2xl border-2 border-dashed border-theme-text/20/10">
                                <p className="text-theme-text/50 font-medium">No recent orders found.</p>
                                <p className="text-theme-text/40 text-sm mt-2">When you place an order, it will appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order._id} className="bg-theme-bg/50 p-6 rounded-2xl border border-theme-text/20/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <div className="text-xs text-theme-text/50 mb-1 flex items-center gap-2">
                                                <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                            <h4 className="font-bold text-theme-text font-serif text-lg">Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h4>
                                            <p className="text-sm text-theme-text/70 mt-1">
                                                {order.orderItems.length} items
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-2">
                                            <span className="font-bold text-theme-accent text-lg">Rs. {order.totalPrice?.toFixed(2)}</span>
                                            <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 font-bold tracking-wider uppercase
                                                ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-orange-100 text-orange-700'}`}>
                                                <CheckCircle size={12} /> {order.status || 'Processing'}
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
