import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/contact', formData);
            toast.success(response.data.message || "Message sent successfully!");
            setFormData({
                name: '',
                email: '',
                subject: 'General Inquiry',
                message: ''
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-theme-bg min-h-screen">

            {/* Hero Section */}
            <div className="relative h-[450px] w-full overflow-hidden flex items-center justify-center">
                <img
                    src="/assets/contact-hero.png"
                    alt="Café Interior"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#382D26]/70 backdrop-blur-[2px]"></div>
                <div className="relative z-10 text-center px-6">
                    <h4 className="text-theme-accent font-bold tracking-[0.3em] text-sm mb-4 uppercase">Contact Us</h4>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Let's start a conversation</h1>
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-medium">
                        <span className="hover:text-theme-accent cursor-pointer transition-colors">Home</span>
                        <ArrowRight size={14} />
                        <span className="text-white">Contact</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 -mt-24 pb-24 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Side: Contact Info Cards */}
                    <div className="lg:w-1/3 flex flex-col gap-6">

                        {/* Location Card */}
                        <div className="bg-theme-card p-10 rounded-[40px] shadow-none border border-white/5 border border-theme-text/20/5 group hover:shadow-xl transition-all duration-500">
                            <div className="w-14 h-14 bg-theme-bg rounded-2xl flex items-center justify-center text-theme-accent mb-8 group-hover:scale-110 transition-transform duration-500 bg-theme-card">
                                <MapPin size={28} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-theme-text mb-4">Visit Our Location</h3>
                            <p className="text-theme-text/60 leading-relaxed font-medium mb-6">
                                123 Galle Road, Colombo 03,<br />Sri Lanka (Café Serendib Main)
                            </p>
                            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-theme-accent font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
                                View on Maps <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Quick Contact Card */}
                        <div className="bg-theme-dark p-10 rounded-[40px] shadow-none border border-white/5 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-theme-accent/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                            <h3 className="text-2xl font-serif font-bold mb-8 relative z-10">Quick Support</h3>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-theme-accent">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Call Us</p>
                                        <p className="font-bold text-sm">+94 11 234 5678</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-theme-accent">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Email Us</p>
                                        <p className="font-bold text-sm">hello@cafeserendib.lk</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-theme-accent">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Website</p>
                                        <p className="font-bold text-sm">www.cafeserendib.lk</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours Card */}
                        <div className="bg-[#BA8454] p-10 rounded-[40px] shadow-none border border-white/5 text-white group">
                            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                                <Clock size={24} /> Opening Hours
                            </h3>
                            <div className="space-y-4 font-medium text-sm">
                                <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span>Monday - Friday</span>
                                    <span>7:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span>Saturday</span>
                                    <span>8:00 AM - 11:00 PM</span>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span>Sunday</span>
                                    <span>8:00 AM - 11:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form Section */}
                    <div className="lg:w-2/3 bg-theme-card p-10 md:p-16 rounded-[40px] shadow-none border border-white/5 border border-theme-text/20/5">
                        <div className="mb-12">
                            <h2 className="text-4xl font-serif font-bold text-theme-text mb-4">Send us a message</h2>
                            <p className="text-theme-text/60 font-medium leading-relaxed max-w-xl">
                                Have a question or feedback? We'd love to hear from you. Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-theme-text uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-theme-bg border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card focus:ring-4 focus:ring-theme-accent/5 outline-none transition-all text-theme-text font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-theme-text uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-theme-bg border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card focus:ring-4 focus:ring-theme-accent/5 outline-none transition-all text-theme-text font-medium"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-theme-text uppercase tracking-widest ml-1">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-2xl bg-theme-bg border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card focus:ring-4 focus:ring-theme-accent/5 outline-none transition-all text-theme-text font-medium appearance-none cursor-pointer"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Reservation Question">Reservation Question</option>
                                    <option value="Menu Feedback">Menu Feedback</option>
                                    <option value="Private Event">Private Event</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-theme-text uppercase tracking-widest ml-1">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-theme-bg border border-theme-text/20/10 focus:border-theme-accent focus:bg-theme-card focus:ring-4 focus:ring-theme-accent/5 outline-none transition-all text-theme-text font-medium resize-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-theme-dark text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-theme-accent disabled:bg-theme-dark/50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-theme-dark/10"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} /> Send Message Now
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-20 w-full h-[500px] rounded-[50px] overflow-hidden shadow-2xl shadow-theme-dark/5 border-4 border-white">
                    <iframe
                        title="Cafe Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58281005747!2d79.77395729726563!3d6.927078600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259196321f57d%3A0xf674305dc798fd17!2sGalle%20Rd%2C%20Colombo!5e0!3m2!1sen!2slk!4v1709641234567!5m2!1sen!2slk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
