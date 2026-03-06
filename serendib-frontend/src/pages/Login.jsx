import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
];

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [currentImage, setCurrentImage] = useState(0);
    const { login, userInfo } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) navigate('/');

        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [userInfo, navigate]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            toast.success('Welcome Back!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Login failed');
        }
    };

    return (
        <div className="w-full min-h-screen relative flex font-sans overflow-hidden bg-[#F2E8DF] items-center justify-center p-4 sm:p-6 selection:bg-theme-accent selection:text-white">



            <div className="w-full max-w-[900px] h-auto md:h-[600px] bg-theme-card rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 border-0">

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden bg-theme-dark flex-shrink-0">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImage}
                            src={images[currentImage]}
                            alt="Coffee aesthetic"
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

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 h-full p-8 lg:p-12 flex flex-col justify-center bg-theme-bg relative">

                    {/* Brand / Logo */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-8 md:absolute md:top-8 md:left-12 w-full md:w-auto">
                        <img src="/assets/logo.png" alt="Logo" className="w-[28px] h-[28px] rounded-full" />
                        <span className="text-[18px] font-bold text-theme-text tracking-wide font-serif">Café Serendib</span>
                    </div>

                    <div className="w-full md:mt-10">
                        <h2 className="text-[20px] font-bold text-theme-text mb-1.5 text-center md:text-left">Login to your account</h2>
                        <p className="text-theme-textMuted text-[12px] mb-8 text-center md:text-left">Welcome back! Login With Email</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-theme-card border border-theme-text/20 rounded-lg text-[13px] font-medium text-theme-text focus:bg-theme-card focus:border-theme-accent focus:ring-1 focus:ring-theme-accent outline-none transition-all placeholder:text-theme-textMuted" placeholder="Number or email address" />
                            </div>
                            <div>
                                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-theme-card border border-theme-text/20 rounded-lg text-[13px] font-medium text-theme-text focus:bg-theme-card focus:border-theme-accent focus:ring-1 focus:ring-theme-accent outline-none transition-all placeholder:text-theme-textMuted" placeholder="Password" />
                            </div>

                            <div className="flex items-center justify-between pt-1 pb-2">
                                <div className="flex flex-row items-center gap-2">
                                    <input type="checkbox" id="remember" className="w-[13px] h-[13px] border-theme-text/20 rounded text-theme-accent focus:ring-theme-accent cursor-pointer" />
                                    <label htmlFor="remember" className="text-[12px] text-theme-textMuted cursor-pointer">Remember me</label>
                                </div>
                                <Link to="/forgot-password" className="text-[12px] text-theme-accent hover:text-theme-accentDark hover:underline font-semibold transition-colors">Forgot password?</Link>
                            </div>

                            <button type="submit" className="w-full bg-theme-accent hover:bg-theme-accentDark text-white font-semibold py-3 rounded-lg text-[13px] transition-colors shadow-sm border border-black/5 tracking-wide">
                                Login
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-center gap-3">
                            <hr className="flex-1 border-t border-theme-text/20" />
                            <span className="text-theme-textMuted text-[10px] whitespace-nowrap uppercase tracking-wider">Or select method to log in</span>
                            <hr className="flex-1 border-t border-theme-text/20" />
                        </div>

                        <div className="mt-5 flex justify-center gap-8">
                            <button className="flex items-center gap-2 text-[12px] font-semibold text-theme-textMuted hover:text-theme-text transition-colors">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-[16px] h-[16px]" alt="Google" /> Google
                            </button>
                            <button className="flex items-center gap-2 text-[12px] font-semibold text-theme-textMuted hover:text-theme-text transition-colors">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-[16px] h-[16px]" alt="Facebook" /> Facebook
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-[12px] text-theme-textMuted inline">Don't have an account? </p>
                            <Link to="/register" className="text-theme-accent hover:text-theme-accentDark hover:underline text-[12px] font-bold border-b border-transparent hover:border-theme-accentDark pb-0.5 transition-all">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/" className="absolute top-6 left-6 text-black/50 hover:text-theme-accent transition-colors text-[13px] flex items-center gap-2">
                &larr; Home
            </Link>
        </div>
    );
};

export default Login;
