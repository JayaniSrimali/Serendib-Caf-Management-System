import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState(query);
    const { addToCart } = useCart();

    // Effect to update search term if URL params change
    useEffect(() => {
        if (query) {
            setSearchTerm(query);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    }, [query]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const { data } = await axiosInstance.get('/menu');
                setMenuItems(data);
            } catch (error) {
                console.error("Failed to fetch menu", error);
                toast.error("Failed to load menu items");
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const categories = ['All', ...new Set(menuItems.map(item => item.category))];

    const filteredItems = menuItems.filter(item => {
        return (filter === 'All' || item.category === filter) &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="w-full bg-[#130f0c] text-white min-h-screen selection:bg-[#CDA177] selection:text-black">

            {/* 1. Hero Banner for Menu */}
            <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2000&auto=format&fit=crop"
                        alt="Menu Hero"
                        className="w-full h-full object-cover opacity-40 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130f0c] via-transparent to-black/60"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-6"
                >
                    <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.4em] mb-4 uppercase">Experience</h4>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">Our Full Menu</h1>
                    <div className="flex items-center justify-center gap-3 text-white/40 text-xs font-bold uppercase tracking-widest">
                        <span>Home</span>
                        <span className="w-1 h-1 bg-[#CDA177] rounded-full"></span>
                        <span className="text-[#CDA177]">Menu</span>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">

                {/* Filters and Search */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-20">
                    <div className="flex gap-4 overflow-x-auto w-full lg:w-auto pb-4 scrollbar-hide">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border ${filter === cat
                                    ? 'bg-[#CDA177] text-black border-[#CDA177] shadow-lg shadow-[#CDA177]/20'
                                    : 'bg-[#1a1511] text-[#a09c99] border-[#CDA177]/10 hover:border-[#CDA177]/40 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96">
                        <input
                            type="text"
                            placeholder="Search our collection..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-full bg-[#1a1511] border border-[#CDA177]/10 focus:border-[#CDA177]/40 outline-none text-white text-sm transition-all focus:bg-[#231d17]"
                        />
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#CDA177]" size={18} />
                    </div>
                </div>

                {/* Menu Grid */}
                {loading ? (
                    <div className="text-center py-40">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-12 h-12 border-2 border-[#CDA177]/20 border-t-[#CDA177] rounded-full mb-6"
                        ></motion.div>
                        <p className="text-[#a09c99] text-[10px] font-bold uppercase tracking-[0.3em]">Preparing the items...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, idx) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    key={item._id}
                                    className="bg-[#1a1511] rounded-[24px] p-5 border border-[#CDA177]/10 hover:border-[#CDA177]/40 transition-all duration-300 group flex flex-col h-full hover:shadow-2xl hover:shadow-black/60 relative overflow-hidden"
                                >
                                    {item.discountPrice && (
                                        <div className="absolute top-8 left-8 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                                            <Tag size={10} /> Save Rs. {(item.price - item.discountPrice).toFixed(0)}
                                        </div>
                                    )}

                                    <div className="rounded-[18px] overflow-hidden mb-6 h-60 relative bg-black">
                                        <img
                                            src={item.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80'}
                                            alt={item.name}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <button
                                                onClick={() => {
                                                    addToCart(item);
                                                    toast.success(`Exclusive: ${item.name} added!`);
                                                }}
                                                className="w-full bg-[#CDA177] text-black py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl"
                                            >
                                                Quick Add
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex-grow flex flex-col px-2">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[#CDA177] text-[9px] font-bold uppercase tracking-[0.2em]">{item.category}</span>
                                            <div className="h-[1px] flex-grow bg-[#CDA177]/10"></div>
                                        </div>
                                        <h3 className="font-serif font-bold text-xl text-white mb-3 group-hover:text-[#CDA177] transition-colors">{item.name}</h3>
                                        <p className="text-[#a09c99] text-[13px] leading-relaxed mb-6 flex-grow">{item.description}</p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex flex-col">
                                                {item.discountPrice ? (
                                                    <>
                                                        <span className="text-[#a09c99] text-xs line-through mb-1 opacity-50">Rs. {item.price.toFixed(2)}</span>
                                                        <span className="text-[#CDA177] font-bold text-xl">Rs. {item.discountPrice.toFixed(2)}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-[#CDA177] font-bold text-xl">Rs. {item.price.toFixed(2)}</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    addToCart(item);
                                                    toast.success(`Special ${item.name} added!`);
                                                }}
                                                className="bg-transparent border border-[#CDA177]/30 text-[#CDA177] p-3 rounded-full hover:bg-[#CDA177] hover:text-black transition-all group-hover:scale-110"
                                            >
                                                <ShoppingBag size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 border border-[#CDA177]/10 border-dashed rounded-[32px] bg-[#1a1511]/30"
                    >
                        <Search size={48} className="mx-auto text-[#CDA177]/20 mb-6" strokeWidth={1} />
                        <h3 className="text-xl font-serif text-white mb-2">No items found</h3>
                        <p className="text-[#a09c99] text-sm">We couldn't find any results matching "{searchTerm}"</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Menu;
