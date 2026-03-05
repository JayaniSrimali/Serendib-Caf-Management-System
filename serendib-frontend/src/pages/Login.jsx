import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, userInfo } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard'); // or redirect to intended target
        }
    }, [userInfo, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Login failed');
        }
    };

    return (
        <div className="w-full bg-theme-bg min-h-screen py-16 px-6 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl border border-theme-dark/5">
                <div className="text-center mb-10">
                    <img src="/assets/logo.png" alt="Logo" className="w-16 h-16 mx-auto rounded-full mb-4 bg-theme-dark p-1 border-2 border-theme-accent" />
                    <h2 className="text-3xl font-serif font-bold text-theme-dark">Welcome Back</h2>
                    <p className="text-theme-dark/60 text-sm mt-2">Sign in to your Café Serendib account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-theme-dark/70">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-theme-bg/50 border border-theme-dark/10 focus:border-theme-accent focus:bg-white outline-none transition-all" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-theme-dark/70">Password</label>
                            <span className="text-xs text-theme-accent hover:underline cursor-pointer">Forgot?</span>
                        </div>
                        <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-theme-bg/50 border border-theme-dark/10 focus:border-theme-accent focus:bg-white outline-none transition-all" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full bg-theme-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-theme-accent transition-colors mt-8 shadow-lg">
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-theme-dark/60 mt-8">
                    Don't have an account? <Link to="/register" className="text-theme-accent font-bold hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
