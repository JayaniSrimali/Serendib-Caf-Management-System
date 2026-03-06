import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
];

const ResetPassword = () => {
    const [formData, setFormData] = useState({ token: '', password: '', confirmPassword: '' });
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.token) {
            return toast.error("Please enter the reset code sent to your email.");
        }
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        if (formData.password.length < 6) {
            return toast.error("Password must be at least 6 characters.");
        }

        // Simulate password reset logic
        toast.success("Password has been successfully reset!");
        navigate('/login');
    };

    return (
        <div className="w-full min-h-screen relative flex font-sans overflow-hidden bg-[#F2E8DF] items-center justify-center p-4 sm:p-6 selection:bg-theme-accent selection:text-white">

            {/* Vertical Text (Reset) */}
            <div className="absolute left-2 sm:left-6 lg:left-12 xl:left-20 top-1/2 -translate-y-1/2 -rotate-90 origin-bottom-left hidden sm:block z-20">
                <span className="text-black/90 text-[36px] xl:text-[44px] tracking-wider font-sans font-medium whitespace-nowrap">Reset</span>
            </div>

            <div className="w-full max-w-[900px] h-auto md:h-[600px] bg-theme-card rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 border-0">

                {/* Left Side - Form (Reversed layout) */}
                <div className="w-full md:w-1/2 h-full p-8 lg:p-12 flex flex-col justify-center bg-theme-bg relative order-2 md:order-1">

                    {/* Brand / Logo */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-6 md:absolute md:top-8 md:left-12 w-full md:w-auto">
                        <img src="/assets/logo.png" alt="Logo" className="w-[28px] h-[28px] rounded-full" />
                        <span className="text-[18px] font-bold text-theme-text tracking-wide font-serif">Café Serendib</span>
                    </div>

                    <div className="w-full md:mt-10">
                        <h2 className="text-[20px] font-bold text-theme-text mb-1.5 text-center md:text-left">Set New Password</h2>
                        <p className="text-theme-textMuted text-[12px] mb-6 text-center md:text-left">Enter the code sent to your email and your new password.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input required type="text" name="token" value={formData.token} onChange={handleChange} className="w-full px-4 py-3 bg-theme-card border border-theme-text/20 rounded-lg text-[13px] font-medium text-theme-text focus:bg-theme-card focus:border-theme-accent focus:ring-1 focus:ring-theme-accent outline-none transition-all placeholder:text-theme-textMuted" placeholder="Reset Code / OTP" />
                            </div>
                            <div>
                                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-theme-card border border-theme-text/20 rounded-lg text-[13px] font-medium text-theme-text focus:bg-theme-card focus:border-theme-accent focus:ring-1 focus:ring-theme-accent outline-none transition-all placeholder:text-theme-textMuted" placeholder="New Password" />
                            </div>
                            <div>
                                <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 bg-theme-card border border-theme-text/20 rounded-lg text-[13px] font-medium text-theme-text focus:bg-theme-card focus:border-theme-accent focus:ring-1 focus:ring-theme-accent outline-none transition-all placeholder:text-theme-textMuted" placeholder="Confirm New Password" />
                            </div>

                            <button type="submit" className="w-full bg-theme-accent hover:bg-theme-accentDark text-white font-semibold py-3 rounded-lg text-[13px] transition-colors shadow-sm border border-black/5 mt-4 tracking-wide">
                                Reset Password
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-[11px] text-theme-textMuted inline">Remembered your password? </p>
                            <Link to="/login" className="text-theme-accent hover:text-theme-accentDark hover:underline text-[11px] font-bold border-b border-transparent hover:border-theme-accentDark pb-0.5 transition-all">Login</Link>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden bg-theme-dark order-1 md:order-2 flex-shrink-0">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImage}
                            src={images[currentImage]}
                            alt="Cafe Pastries"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.9, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    {/* Pagination dots simulation */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 gap-1.5 hidden md:flex z-10">
                        {images.map((_, idx) => (
                            <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImage === idx ? 'bg-theme-accent w-4' : 'bg-white/40'}`}></div>
                        ))}
                    </div>
                </div>

            </div>

            <Link to="/" className="absolute top-6 right-6 text-black/70 hover:text-theme-accent transition-colors text-[13px] flex items-center gap-2 z-20">
                Home &rarr;
            </Link>
        </div>
    );
};

export default ResetPassword;
