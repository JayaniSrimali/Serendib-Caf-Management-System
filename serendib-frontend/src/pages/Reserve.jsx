import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const rightImages = [
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2000&auto=format&fit=crop"
];

const ctaImages = [
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495474472201-419b4b0eaf95?q=80&w=2000&auto=format&fit=crop"
];

const Reserve = () => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        phone: '',
        date: '',
        time: '',
        guests: 2
    });

    useEffect(() => {
        if (userInfo) {
            setFormData(prev => ({
                ...prev,
                name: userInfo.name,
                email: userInfo.email
            }));
        }
    }, [userInfo]);

    const [loading, setLoading] = useState(false);
    const [rightImageIndex, setRightImageIndex] = useState(0);
    const [ctaImageIndex, setCtaImageIndex] = useState(0);

    useEffect(() => {
        const rightInterval = setInterval(() => {
            setRightImageIndex((prev) => (prev + 1) % rightImages.length);
        }, 4000);

        const ctaInterval = setInterval(() => {
            setCtaImageIndex((prev) => (prev + 1) % ctaImages.length);
        }, 5000);

        return () => {
            clearInterval(rightInterval);
            clearInterval(ctaInterval);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/reservations', formData);
            toast.success('Table reserved successfully!');
            setFormData({ name: userInfo?.name || '', email: userInfo?.email || '', phone: '', date: '', time: '', guests: 2 });
            if (userInfo) navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reserve table');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-[#130f0c] text-white font-sans selection:bg-[#CDA177] selection:text-black">
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in-left { animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-scale-in { animation: scaleIn 2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-400 { animation-delay: 400ms; }
                .delay-500 { animation-delay: 500ms; }
                .delay-600 { animation-delay: 600ms; }
                .delay-700 { animation-delay: 700ms; }
            `}</style>

            {/* Hero Section */}
            <div className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2000&auto=format&fit=crop"
                    alt="Cafe Interior Dark"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 animate-scale-in opacity-0"
                />
                <div className="absolute inset-0 bg-[#382D26]/70 backdrop-blur-[2px]"></div>

                <div className="relative z-10 text-center px-6 opacity-0 animate-fade-in-up delay-200">
                    <h4 className="text-[#CDA177] font-bold tracking-[0.3em] text-sm mb-4 uppercase">Reservation</h4>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Book Your Table</h1>
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-medium">
                        <span className="hover:text-[#CDA177] cursor-pointer transition-colors">Home</span>
                        <span className="text-[10px]">&#8594;</span>
                        <span className="text-white">Reservation</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-24">

                {/* Top Row: Form & Right Image */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32">

                    {/* Left: Form */}
                    <div className="lg:w-1/2 flex flex-col justify-center opacity-0 animate-fade-in-up delay-300">
                        <div className="mb-12">
                            <h4 className="text-[#CDA177] text-xs font-bold tracking-[0.2em] mb-4 uppercase flex items-center gap-4">
                                <span className="w-10 h-[2px] bg-[#CDA177]"></span> Your Details
                            </h4>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-white">Book Your Coffee Experience</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3 opacity-0 animate-fade-in-up delay-400">
                                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl  bg-[#1d1814] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#CDA177] transition-all text-sm border-none shadow-inner"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-3 opacity-0 animate-fade-in-up delay-400">
                                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl  bg-[#1d1814] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#CDA177] transition-all text-sm border-none shadow-inner"
                                        placeholder="email@gmail.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 opacity-0 animate-fade-in-up delay-500">
                                <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-2xl  bg-[#1d1814] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#CDA177] transition-all text-sm border-none shadow-inner"
                                    placeholder="(00) 98123456789"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3 opacity-0 animate-fade-in-up delay-600">
                                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">Date *</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl  bg-[#1d1814] text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#CDA177] transition-all text-sm border-none shadow-inner [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-3 opacity-0 animate-fade-in-up delay-600">
                                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">Time *</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl  bg-[#1d1814] text-white/80 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#CDA177] transition-all text-sm border-none shadow-inner [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 opacity-0 animate-fade-in-up delay-700">
                                <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">Number Of Person *</label>
                                <select
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-2xl  bg-[#1d1814] text-white/80 focus:outline-none focus:ring-1 focus:ring-[#CDA177] transition-all text-sm appearance-none cursor-pointer border-none shadow-inner"
                                >
                                    <option value="1">1 Person</option>
                                    <option value="2">2 People</option>
                                    <option value="3">3 People</option>
                                    <option value="4">4 People</option>
                                    <option value="5">5 People</option>
                                    <option value="6">6+ People</option>
                                </select>
                            </div>

                            <div className="opacity-0 animate-fade-in-up delay-700">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#CDA177] text-black px-10 py-5 rounded-2xl  text-sm font-bold uppercase tracking-widest mt-8 hover:bg-[#b88c64] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 w-[280px] shadow-lg shadow-black"
                                >
                                    {loading ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : 'Make A Reservation'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right: Image Group (Vertical Image) Slideshow */}
                    <div className="lg:w-1/2 opacity-0 animate-fade-in-left delay-400">
                        <div className="w-full h-full min-h-[500px] lg:h-[750px] bg-[#1d1814] overflow-hidden relative">
                            {rightImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt="Cozy coffee setup"
                                    className={`absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-all duration-[2000ms] ease-in-out cursor-pointer ${index === rightImageIndex ? 'opacity-90 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Commitment Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start mt-10">

                    {/* Left: Text & People Image */}
                    <div className="flex flex-col gap-8 opacity-0 animate-fade-in-up delay-200">
                        <div className="h-[300px] lg:h-[380px] w-full overflow-hidden bg-[#1d1814]">
                            <img
                                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2000&auto=format&fit=crop"
                                alt="Barista pouring latte art"
                                className="w-full h-full object-cover opacity-90 grayscale-[0.2] hover:scale-110 transition-transform duration-[1.5s] cursor-pointer"
                            />
                        </div>
                        <p className="text-[#a09c99] text-sm lg:text-[15px] leading-[2] font-medium max-w-lg mt-4">
                            We provide valuable experiences that you will never forget with your friends or partner. The finest sustainably sourced coffee blends and refreshing baked goods will make you feel relaxed and satisfied.
                        </p>
                    </div>

                    {/* Right: Our Commitment */}
                    <div className="pt-2 lg:pt-8 pr-4 opacity-0 animate-fade-in-up delay-400">
                        <h4 className="text-[#a09c99] text-[11px] font-bold tracking-[0.25em] mb-8 uppercase">Our Coffee Commitment</h4>
                        <div className="space-y-6 text-[#a09c99] text-[13px] leading-[2.2] mb-12">
                            <p>
                                We are committed to providing the best coffee experience and serving wholeheartedly to our customers. We provide the best service from the waitstaff to the master baristas who craft your beverages. A perfect cup with a rich aroma, giving satisfaction to the heart.
                            </p>
                            <p>
                                We will give our absolute best so that you leave feeling energized and satisfied. The cozy ambiance and carefully curated blends are designed to make you feel right at home. Hopefully, you will always find joy in our coffeehouse.
                            </p>
                        </div>
                        <div className="h-[180px] lg:h-[220px] w-full max-w-[320px] overflow-hidden bg-[#1d1814]">
                            <img
                                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
                                alt="Modern people at cafe"
                                className="w-full h-full object-cover opacity-90 grayscale-[0.2] hover:scale-110 transition-transform duration-[1.5s] cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Stay Close With Us CTA Footer Section Slideshow */}
            <div className="relative h-[400px] lg:h-[450px] w-full mt-24 flex flex-col items-center justify-center overflow-hidden">
                {ctaImages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt="Coffee Background Showcase"
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2500ms] ease-in-out ${index === ctaImageIndex ? 'opacity-25 scale-105 z-0' : 'opacity-0 scale-100 z-0'}`}
                    />
                ))}
                <div className="absolute inset-0 bg-[#15100d]/90 z-0"></div>

                <div className="relative z-10 flex flex-col items-center text-center px-6 opacity-0 animate-fade-in-up delay-300">
                    <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-6 uppercase flex items-center justify-center gap-6">
                        <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> ANY QUESTION ? <span className="w-8 h-[1px] bg-[#CDA177]/80"></span>
                    </h4>
                    <h2 className="text-5xl md:text-6xl font-bold mb-10 text-white tracking-wide">Stay Close With Us</h2>
                    <Link to="/contact">
                        <button className="bg-[#CDA177] text-black px-10 py-4  rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#b88c64] transition-colors shadow-lg shadow-black/40 hover:scale-105">
                            CONTACT US
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Reserve;
