import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Calendar, Clock, Users, User, Phone, Mail } from 'lucide-react';

const Reserve = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/reservations', formData);
            toast.success('Table reserved successfully! We will see you soon.');
            setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 2 });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reserve table');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-theme-bg py-20 px-6 md:px-12 flex items-center justify-center">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col lg:flex-row bg-theme-card rounded-[40px] shadow-2xl overflow-hidden">

                {/* Left side info/image */}
                <div className="lg:w-2/5 relative bg-theme-dark text-white p-12 flex flex-col justify-center overflow-hidden min-h-[400px]">
                    <div className="absolute inset-0 z-0 opacity-20"><img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" alt="Cafe" className="w-full h-full object-cover" /></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-serif font-bold mb-6 text-theme-bg">Reserve Your Experience</h2>
                        <p className="text-theme-textMuted mb-10 leading-relaxed text-sm lg:text-base">
                            Whether it's a cozy coffee date, a business meeting, or a warm gathering with friends, secure your perfect spot at Café Serendib.
                        </p>
                        <ul className="space-y-6 text-theme-textMuted text-sm">
                            <li className="flex items-center gap-4"><Calendar className="text-theme-accent" /> Open Every Day</li>
                            <li className="flex items-center gap-4"><Clock className="text-theme-accent" /> 07:00 AM - 11:00 PM</li>
                            <li className="flex items-center gap-4"><Phone className="text-theme-accent" /> +94 11 234 5678</li>
                        </ul>
                    </div>
                </div>

                {/* Right side form */}
                <div className="lg:w-3/5 p-10 md:p-16">
                    <h3 className="text-2xl font-serif font-bold text-theme-text mb-8">Book a Table</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-theme-text/70 flex items-center gap-2"><User size={16} /> Full Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-theme-bg/50 border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-theme-text/70 flex items-center gap-2"><Mail size={16} /> Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-theme-bg/50 border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card outline-none transition-all" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-theme-text/70 flex items-center gap-2"><Phone size={16} /> Phone Number</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-theme-bg/50 border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card outline-none transition-all" placeholder="+94 7X XXX XXXX" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-theme-text/70 flex items-center gap-2"><Users size={16} /> Number of Guests</label>
                                <input required type="number" min="1" max="20" name="guests" value={formData.guests} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-theme-bg/50 border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card outline-none transition-all" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-theme-text/70 flex items-center gap-2"><Calendar size={16} /> Date</label>
                                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-theme-bg/50 border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card outline-none transition-all text-theme-text" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-theme-text/70 flex items-center gap-2"><Clock size={16} /> Time</label>
                                <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-theme-bg/50 border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card outline-none transition-all text-theme-text" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 bg-theme-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-theme-dark transition-colors disabled:bg-theme-dark/30 shadow-md shadow-theme-accent/20"
                        >
                            {loading ? 'Reserving...' : 'Confirm Reservation'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reserve;
