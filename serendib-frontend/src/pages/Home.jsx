import { motion } from 'framer-motion';
import { ShoppingBag, Star, CheckCircle2, ChevronRight, Quote, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="w-full">

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
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Elegant Dark Gradient Overlays */}
                <div className="absolute inset-0 z-0 bg-black/60"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                <div className="max-w-[1000px] mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center mt-16">

                    {/* Top subtle badge/icon */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-theme-accent"></div>
                        <span className="text-theme-accent uppercase tracking-[0.3em] text-sm font-bold">Est. 2024</span>
                        <div className="h-[1px] w-12 bg-theme-accent"></div>
                    </motion.div>

                    {/* Main Title */}
                    <div className="overflow-hidden mb-6">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            className="text-5xl md:text-7xl lg:text-[90px] font-serif font-bold text-white leading-tight drop-shadow-2xl"
                        >
                            The True Taste <br className="hidden md:block" />
                            <span className="italic font-light text-theme-textMuted">of Ceylon</span>
                        </motion.h1>
                    </div>

                    {/* Subtitle / Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-theme-textMuted/90 text-lg md:text-xl font-light max-w-2xl mb-12 drop-shadow-lg leading-relaxed"
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
                            className="w-full sm:w-auto px-10 py-4 bg-theme-accent text-white font-bold tracking-widest uppercase text-sm rounded-none hover:bg-theme-card hover:text-theme-text transition-colors duration-300 shadow-xl"
                        >
                            Explore Menu
                        </Link>
                        <Link
                            to="/reserve"
                            className="w-full sm:w-auto px-10 py-4 bg-transparent border border-[#D8C7B9] text-theme-textMuted font-bold tracking-widest uppercase text-sm rounded-none hover:bg-[#D8C7B9]/10 transition-colors duration-300"
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
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                >
                    <span className="text-theme-textMuted/50 uppercase tracking-widest text-xs font-bold">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-12 bg-gradient-to-b from-[#D8C7B9]/50 to-transparent"
                    ></motion.div>
                </motion.div>
            </section>

            {/* 2. ABOUT PREVIEW SECTION */}
            <section className="w-full bg-theme-bg py-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-theme-card rounded-[40px] shadow-sm border border-black/5 p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">
                        {/* Abstract shapes inside the white card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-theme-bg rounded-bl-full opacity-60"></div>

                        <div className="lg:w-1/2 relative z-10">
                            <h4 className="text-theme-accent font-bold tracking-[0.2em] text-sm mb-4 uppercase">Discover</h4>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-text mb-6">Our Story</h2>
                            <p className="text-theme-text/70 text-lg leading-relaxed mb-8">
                                At Café Serendib, we blend tradition with modern flavors. Inspired by the rich heritage of Ceylon, our café offers a unique experience filled with aroma, comfort, and unforgettable taste.
                            </p>
                            <Link to="/about" className="text-theme-accent font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:text-theme-accentDark transition-colors group">
                                Read More <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="lg:w-1/2 relative z-10">
                            <div className="relative rounded-[30px] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                                    alt="Café Environment"
                                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Small overlapping image */}
                            <img
                                src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80"
                                alt="Cinnamon Coffee"
                                className="absolute -bottom-10 -left-10 w-48 h-48 object-cover rounded-[20px] shadow-xl border-8 border-white hidden md:block"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FEATURED MENU SECTION */}
            <section className="w-full bg-white py-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto text-center">
                    <h4 className="text-theme-text/50 font-bold tracking-[0.2em] text-sm mb-4 uppercase">Taste The Best</h4>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-text mb-6">Our Signature Favorites</h2>
                    <p className="max-w-2xl mx-auto text-theme-text/70 mb-16 px-4">
                        Carefully crafted drinks and pastries blending local spices with world-class beans. Every item is a masterpiece.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                        {[
                            { name: "Ceylon Cinnamon Latte", desc: "Cozy blend of rich espresso & pure Ceylon cinnamon.", price: "Rs. 1100.00", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80" },
                            { name: "Serendib Mocha", desc: "Dark chocolate meets our signature dark roast.", price: "Rs. 1400.00", img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=400&q=80" },
                            { name: "Kithul Treacle Cake", desc: "Moist cake sweetened with natural Kithul treacle.", price: "Rs. 1200.00", img: "https://images.unsplash.com/photo-1557365362-e6e729a73e44?auto=format&fit=crop&w=400&q=80" },
                            { name: "Organic Iced Coffee", desc: "Cold brewed overnight for a perfectly smooth finish.", price: "Rs. 950.00", img: "https://images.unsplash.com/photo-1461023058943-07cb14c97940?auto=format&fit=crop&w=400&q=80" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-theme-bg rounded-[24px] p-5 shadow-sm border border-black/5 hover:shadow-xl transition-shadow group flex flex-col h-full">
                                <div className="rounded-[16px] overflow-hidden mb-6 h-56">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-3 gap-2">
                                        <h3 className="font-serif font-bold text-lg text-theme-text leading-tight">{item.name}</h3>
                                        <span className="font-bold text-theme-accent shrink-0">{item.price}</span>
                                    </div>
                                    <p className="text-theme-text/60 text-sm mb-6 flex-grow">{item.desc}</p>
                                    <button className="w-full bg-theme-accent text-white py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-theme-dark transition-colors flex items-center justify-center gap-2">
                                        <ShoppingBag size={16} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. WHY CHOOSE US SECTION */}
            <section className="w-full bg-theme-bg py-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=800&q=80"
                            alt="Coffee Beans"
                            className="w-full h-[500px] object-cover rounded-[40px] shadow-lg"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h4 className="text-theme-accent font-bold tracking-[0.2em] text-sm mb-4 uppercase">Promises</h4>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-text mb-8">Why Café Serendib?</h2>

                        <div className="space-y-6">
                            {[
                                "Premium Quality Ingredients",
                                "Freshly Brewed Coffee",
                                "Cozy & Relaxing Atmosphere",
                                "Friendly Service"
                            ].map((point, i) => (
                                <div key={i} className="flex items-center gap-4 bg-theme-card p-5 rounded-2xl shadow-sm border border-black/5 border border-transparent hover:border-theme-accent/30 transition-colors">
                                    <div className="bg-theme-bg p-3 rounded-full text-theme-accent">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <span className="text-lg font-medium text-theme-text">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. SPECIAL OFFER BANNER */}
            <section className="w-full bg-theme-bg pb-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    {/* The long rectangular image banner style from the reference */}
                    <div className="relative w-full rounded-[40px] overflow-hidden flex flex-col md:flex-row bg-theme-accent/5 items-stretch shadow-xl min-h-[300px]">

                        {/* Image area */}
                        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1557365362-e6e729a73e44?auto=format&fit=crop&w=800&q=80"
                                alt="Special Offer Pastries"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            {/* Gradient fade to blend into the background color */}
                            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#D3B497] to-transparent hidden md:block"></div>
                        </div>

                        {/* Text area */}
                        <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center relative z-10 text-theme-text">
                            <h4 className="font-bold tracking-[0.2em] text-sm mb-2 uppercase opacity-70">Today’s Special Offer</h4>
                            <h2 className="text-3xl lg:text-[40px] font-serif font-bold leading-tight mb-6">
                                Enjoy 15% off on all signature coffees every Friday evening!
                            </h2>
                            <button className="self-start bg-theme-dark text-white px-8 py-3 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-theme-accent transition-colors">
                                Claim Offer
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CUSTOMER TESTIMONIALS */}
            <section className="w-full bg-white py-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto text-center">
                    <h4 className="text-theme-text/50 font-bold tracking-[0.2em] text-sm mb-4 uppercase">Reviews</h4>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-text mb-16">What Our Guests Say</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {[
                            { name: "Sarah L.", role: "Local Guide", rating: 5, review: "The absolute best coffee I've had in a long time! The ambiance is incredibly cozy and the staff makes you feel right at home." },
                            { name: "Nuwan D.", role: "Food Critic", rating: 5, review: "A perfect blend of modern café aesthetics and local flavors. The Kithul cake is an absolute masterpiece and a must-try!" },
                            { name: "Emily R.", role: "Regular Customer", rating: 4, review: "My new favorite spot to work and relax. Fast wifi, great seating, and the Ceylon latte is out of this world." }
                        ].map((testi, i) => (
                            <div key={i} className="bg-theme-bg p-8 lg:p-10 rounded-[30px] shadow-sm border border-black/5 relative pt-12">
                                <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-theme-accent text-white p-3 rounded-full shadow-lg">
                                    <Quote size={24} className="fill-current" />
                                </div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} size={18} className={idx < testi.rating ? "text-theme-accent fill-theme-accent" : "text-theme-text/20"} />
                                    ))}
                                </div>
                                <p className="text-theme-text/80 italic mb-8 flex-grow leading-relaxed">
                                    "{testi.review}"
                                </p>
                                <div className="border-t border-theme-text/20/10 pt-6">
                                    <h4 className="font-serif font-bold text-lg text-theme-text">{testi.name}</h4>
                                    <p className="text-sm text-theme-accent font-medium">{testi.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. CALL TO ACTION SECTION */}
            <section className="w-full bg-theme-bg py-32 px-6 md:px-12 relative overflow-hidden">
                {/* Decorative large logo watermark */}
                <div className="absolute right-[-10%] bottom-[-20%] w-[600px] h-[600px] bg-theme-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                <div className="max-w-[800px] mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-theme-text mb-8">Ready to Relax and Sip?</h2>
                    <p className="text-lg md:text-xl text-theme-text/70 mb-12">
                        Reserve your table today or order online and enjoy the Café Serendib experience from anywhere.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/orders" className="bg-theme-accent text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-theme-dark hover:shadow-xl transition-all uppercase tracking-wide">
                            Order Now
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
