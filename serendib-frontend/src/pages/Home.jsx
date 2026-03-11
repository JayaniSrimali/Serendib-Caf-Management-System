import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, CheckCircle2, ChevronRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

const Home = () => {
    const { addToCart } = useCart();
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { data } = await axiosInstance.get('/menu/featured');
                setFeaturedItems(data);
            } catch (error) {
                console.error("Failed to fetch featured items:", error);
            } finally {
                setLoadingFeatured(false);
            }
        };

        const fetchReviews = async () => {
            try {
                const { data } = await axiosInstance.get('/reviews');
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoadingReviews(false);
            }
        };

        fetchFeatured();
        fetchReviews();
    }, []);

    return (
        <div className="w-full bg-[#130f0c] text-white font-sans selection:bg-[#CDA177] selection:text-black">

            {/* 1. HERO SECTION (Professional, Ultra-Premium layout) */}
            <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with slow zoom (Ken Burns) */}
                <motion.div
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1920&q=80"
                        alt="Premium Coffee Background"
                        className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
                    />
                </motion.div>

                {/* Elegant Dark Gradient Overlays */}
                <div className="absolute inset-0 z-0 bg-[#130f0c]/70"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#130f0c] via-transparent to-black/50"></div>

                <div className="max-w-[1000px] mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center mt-16">

                    {/* Top subtle badge/icon */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-[#CDA177]/80"></div>
                        <span className="text-[#CDA177] uppercase tracking-[0.4em] text-[10px] font-bold">Est. 2024</span>
                        <div className="h-[1px] w-12 bg-[#CDA177]/80"></div>
                    </motion.div>

                    {/* Main Title */}
                    <div className="overflow-hidden mb-6">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            className="text-6xl md:text-8xl lg:text-[100px] font-serif font-bold text-white leading-tight"
                        >
                            The True Taste <br className="hidden md:block" />
                            <span className="italic font-light text-[#CDA177]/80">of Ceylon</span>
                        </motion.h1>
                    </div>

                    {/* Subtitle / Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-[#a09c99] text-sm md:text-lg font-light max-w-2xl mb-12 drop-shadow-lg leading-[2.2]"
                    >
                        Immerse yourself in an unforgettable coffee experience. Crafted with passion, authentic spices, and the finest beans in Sri Lanka.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <Link
                            to="/menu"
                            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#CDA177] text-black font-bold tracking-widest uppercase text-[11px] hover:bg-[#b88c64] transition-colors duration-300 shadow-xl"
                        >
                            Explore Menu
                        </Link>
                        <Link
                            to="/reserve"
                            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-transparent border border-[#CDA177]/40 text-white font-bold tracking-widest uppercase text-[11px] hover:bg-[#CDA177]/10 transition-colors duration-300 backdrop-blur-sm"
                        >
                            Book a Table
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
                >
                    <span className="text-[#a09c99] uppercase tracking-[0.3em] text-[10px] font-bold">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-16 bg-gradient-to-b from-[#CDA177]/50 to-transparent"
                    ></motion.div>
                </motion.div>
            </section>

            {/* 2. ABOUT PREVIEW SECTION */}
            <section className="w-full py-32 px-6 md:px-12 relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="lg:w-1/2 relative z-10 pr-0 lg:pr-10"
                        >
                            <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> DISCOVER
                            </h4>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">Our Story</h2>
                            <p className="text-[#a09c99] text-[13px] leading-[2.2] mb-10">
                                At Café Serendib, we blend tradition with modern flavors. Inspired by the rich heritage of Ceylon, our café offers a unique experience filled with aroma, comfort, and unforgettable taste. We ethically source our beans from local highland farmers to ensure quality and give back to our roots.
                            </p>
                            <Link to="/about" className="text-[#CDA177] font-bold uppercase tracking-[0.2em] text-[11px] flex items-center gap-3 hover:text-white transition-colors group">
                                Read More <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Images */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1 }}
                            className="lg:w-1/2 relative z-10 w-full"
                        >
                            <div className="relative w-full h-[500px] overflow-hidden bg-[#1d1814]">
                                <img
                                    src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
                                    alt="Café Environment"
                                    className="w-full h-full object-cover grayscale-[0.2] hover:scale-110 transition-transform duration-[2s]"
                                />
                            </div>
                            {/* Small overlapping image */}
                            <div className="absolute -bottom-12 -left-8 lg:-left-16 w-56 h-56 bg-[#1a1511] p-3 shadow-2xl hidden md:block border border-[#CDA177]/20">
                                <img
                                    src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80"
                                    alt="Cinnamon Coffee"
                                    className="w-full h-full object-cover grayscale-[0.1]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. FEATURED MENU SECTION */}
            <section className="w-full bg-[#1a1511] py-32 px-6 md:px-12 border-y border-[#CDA177]/10">
                <div className="max-w-[1400px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center justify-center gap-4">
                            <span className="w-6 h-[1px] bg-[#CDA177]/80"></span> TASTE THE BEST <span className="w-6 h-[1px] bg-[#CDA177]/80"></span>
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Our Signature Favorites</h2>
                        <p className="max-w-2xl mx-auto text-[#a09c99] text-[14px] leading-relaxed mb-20 px-4">
                            Carefully crafted drinks and pastries blending local spices with world-class beans. Every item is a masterpiece.
                        </p>
                    </motion.div>

                    {loadingFeatured ? (
                        <div className="text-center py-20 text-[#a09c99] uppercase tracking-widest text-[10px] font-bold">Curating masterpieces...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                            {featuredItems.map((item, idx) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                                    className="bg-[#130f0c] p-5 border border-[#CDA177]/10 hover:border-[#CDA177]/40 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
                                >
                                    <div className="overflow-hidden mb-6 h-60 relative bg-black">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                        {item.discountPrice && (
                                            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ">
                                                Sale
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow flex flex-col px-2">
                                        <h3 className="font-serif font-bold text-xl text-white leading-tight mb-2 uppercase tracking-wide group-hover:text-[#CDA177] transition-colors">{item.name}</h3>
                                        <div className="flex items-center gap-3 mb-4">
                                            {item.discountPrice ? (
                                                <>
                                                    <span className="font-bold text-[#CDA177] text-lg">Rs. {item.discountPrice.toFixed(2)}</span>
                                                    <span className="text-[#a09c99] text-xs line-through opacity-50 font-bold">Rs. {item.price.toFixed(2)}</span>
                                                </>
                                            ) : (
                                                <span className="font-bold text-[#CDA177] text-lg">Rs. {item.price.toFixed(2)}</span>
                                            )}
                                        </div>
                                        <p className="text-[#a09c99] text-[13px] mb-8 flex-grow leading-[1.8] font-light">{item.description}</p>
                                        <button
                                            onClick={() => {
                                                addToCart(item);
                                                toast.success(`${item.name} added to cart!`);
                                            }}
                                            className="w-full bg-transparent text-white py-4 font-bold uppercase text-[10px] tracking-widest hover:bg-[#CDA177] hover:text-black transition-colors flex items-center justify-center gap-3 border border-[#CDA177]/40"
                                        >
                                            <ShoppingBag size={14} /> Add to Cart
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 4. WHY CHOOSE US SECTION */}
            <section className="w-full py-32 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 w-full"
                    >
                        <div className="w-full h-[600px] bg-[#1d1814] overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=2000&auto=format&fit=crop"
                                alt="Roasted Coffee Beans"
                                className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-[3s]"
                            />
                            {/* Decorative overlay border */}
                            <div className="absolute inset-4 border border-[#CDA177]/30 z-10 pointer-events-none"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2"
                    >
                        <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> PROMISES
                        </h4>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-10">Why Café Serendib?</h2>

                        <div className="space-y-6">
                            {[
                                "Premium Quality Arabica & Robusta Beans",
                                "Authentic Sri Lankan Spice Blends",
                                "Cozy, Heritage-inspired Atmosphere",
                                "Master Baristas & Heartwarming Service"
                            ].map((point, i) => (
                                <div key={i} className="flex items-center gap-6 bg-[#1a1511] p-6 border border-[#CDA177]/10 hover:border-[#CDA177]/40 transition-colors group">
                                    <div className="text-[#CDA177] group-hover:scale-110 transition-transform">
                                        <CheckCircle2 size={24} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[14px] font-medium text-[#a09c99] tracking-wide">{point}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 5. SPECIAL OFFER BANNER (Parallax-like) */}
            <section className="relative w-full py-32 px-6 md:px-12 mt-10">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
                        alt="Restaurant seating"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-[#130f0c]/90"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative z-10 max-w-[1200px] mx-auto bg-[#1a1511]/80 backdrop-blur-md border border-[#CDA177]/20 p-12 lg:p-20 text-center flex flex-col items-center"
                >
                    <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-6 uppercase flex items-center justify-center gap-6">
                        <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> TODAY'S SPECIAL OFFER <span className="w-8 h-[1px] bg-[#CDA177]/80"></span>
                    </h4>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 max-w-3xl leading-tight">
                        Enjoy 15% off on all signature coffees every Friday evening!
                    </h2>
                    <p className="text-[#a09c99] text-[13px] leading-[2.2] max-w-xl mb-10">
                        Stop by after work, soak in the ambiance, and treat yourself to our master roasts at a special price.
                    </p>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText('SERENDIB15');
                            toast.success('Promo Code SERENDIB15 copied to clipboard!');
                        }}
                        className="bg-[#CDA177] text-black px-12 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#b88c64] transition-colors shadow-lg shadow-black/40 hover:scale-105"
                    >
                        Claim Offer
                    </button>
                </motion.div>
            </section>

            {/* 6. TESTIMONIALS SECTION */}
            <section className="w-full bg-[#130f0c] py-32 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#CDA177]/20 to-transparent"></div>
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div>
                            <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> WHAT OUR GUESTS SAY
                            </h4>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-0 uppercase tracking-widest">Our Reviews</h2>
                        </div>
                        <p className="max-w-md text-[#a09c99] text-[13px] leading-relaxed italic border-l border-[#CDA177]/30 pl-8">
                            "Serendipity is finding something good without looking for it. Our guests find it every day in our coffeehouse."
                        </p>
                    </div>

                    {loadingReviews ? (
                        <div className="text-center py-20 text-[#a09c99] uppercase tracking-widest text-[10px] font-bold">Listening to our guests...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {reviews.map((testi, i) => (
                                <motion.div
                                    key={testi._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.2 }}
                                    className="bg-[#1a1511] p-12 border border-[#CDA177]/5 hover:border-[#CDA177]/20 transition-all duration-500 relative group"
                                >
                                    <Quote className="absolute top-8 right-10 text-[#CDA177]/10 group-hover:text-[#CDA177]/20 transition-colors" size={40} />
                                    <div className="flex gap-1 mb-8">
                                        {[...Array(testi.rating)].map((_, i) => (
                                            <Star key={i} size={14} className="fill-[#CDA177] text-[#CDA177]" />
                                        ))}
                                    </div>
                                    <p className="text-white text-lg font-serif italic mb-10 leading-relaxed font-light">"{testi.review}"</p>
                                    <div className="flex items-center gap-5 mt-auto">
                                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#CDA177]/20 group-hover:border-[#CDA177]/50 transition-colors">
                                            <img src={testi.image || "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80"} alt={testi.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">{testi.name}</h4>
                                            <p className="text-[#CDA177] text-[10px] font-bold tracking-widest uppercase opacity-80">{testi.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default Home;
