import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            return toast.error("Please enter your email address.");
        }
        // Simulate password reset request
        toast.success("Password reset code has been sent to your email!");
        navigate('/reset-password');
    };

    return (
        <div className="w-full min-h-screen relative flex font-sans overflow-hidden bg-[#2D211A] items-center justify-center p-4 sm:p-6 selection:bg-[#E1A162] selection:text-white">

            {/* Vertical Text (Reset) */}
            <div className="absolute right-2 sm:right-6 lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 -rotate-90 origin-bottom-right hidden sm:block">
                <span className="text-white/90 text-[36px] xl:text-[44px] tracking-wider font-sans font-medium whitespace-nowrap">Reset</span>
            </div>

            <div className="w-full max-w-[900px] h-auto md:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 border-0">

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden bg-[#1d1a19] flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80" alt="Coffee aesthetic" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" />
                    {/* Pagination dots simulation */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 gap-1.5 hidden md:flex">
                        <div className="w-2 h-2 rounded-full bg-[#E1A162]"></div>
                        <div className="w-2 h-2 rounded-full bg-white/40"></div>
                        <div className="w-2 h-2 rounded-full bg-white/40"></div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 h-full p-8 lg:p-12 flex flex-col justify-center bg-[#FDFBF7] relative">

                    {/* Brand / Logo */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-8 md:absolute md:top-8 md:left-12 w-full md:w-auto">
                        <img src="/assets/logo.png" alt="Logo" className="w-[28px] h-[28px] rounded-full" />
                        <span className="text-[18px] font-bold text-[#2D211A] tracking-wide font-serif">Café Serendib</span>
                    </div>

                    <div className="w-full md:mt-10">
                        <h2 className="text-[20px] font-bold text-[#2D211A] mb-1.5 text-center md:text-left">Forgot Password?</h2>
                        <p className="text-[#A69B92] text-[12px] mb-8 text-center md:text-left md:pr-4">Enter your registered email address below and we will send you a link to reset your password.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white border border-[#EBE5DF] rounded-lg text-[13px] font-medium text-[#4d4239] focus:bg-white focus:border-[#92A760] focus:ring-1 focus:ring-[#92A760] outline-none transition-all placeholder:text-[#A69B92]" placeholder="Enter your email address" />
                            </div>

                            <button type="submit" className="w-full bg-[#92A760] hover:bg-[#7d8f4a] text-white font-semibold py-3 rounded-lg text-[13px] transition-colors shadow-sm tracking-wide mt-2">
                                Send Reset Link
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-[12px] text-[#A69B92] inline">Remembered your password? </p>
                            <Link to="/login" className="text-[#92A760] hover:text-[#7d8f4a] hover:underline text-[12px] font-bold border-b border-transparent hover:border-[#7d8f4a] pb-0.5 transition-all">Back to Login</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/" className="absolute top-6 left-6 text-white/50 hover:text-[#E1A162] transition-colors text-[13px] flex items-center gap-2">
                &larr; Home
            </Link>
        </div>
    );
};

export default ForgotPassword;
