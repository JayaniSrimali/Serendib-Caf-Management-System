import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const { data } = await axiosInstance.get('/menu');
                // If backend is empty, provide some default realistic data for demonstration
                if (data.length === 0) {
                    setMenuItems([
                        { _id: '1', name: "Ceylon Cinnamon Latte", description: "Cozy blend of rich espresso & pure Ceylon cinnamon.", price: 5.50, category: "Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80" },
                        { _id: '2', name: "Serendib Mocha", description: "Dark chocolate meets our signature dark roast.", price: 6.00, category: "Coffee", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80" },
                        { _id: '3', name: "Kithul Treacle Cake", description: "Moist cake sweetened with natural Kithul treacle.", price: 7.00, category: "Dessert", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
                        { _id: '4', name: "Organic Iced Coffee", description: "Cold brewed overnight for a perfectly smooth finish.", price: 4.50, category: "Cold Beverage", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80" },
                        { _id: '5', name: "Spicy Chicken Pastry", description: "Flaky crust packed with savory roasted chicken.", price: 4.00, category: "Savory", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&q=80" },
                        { _id: '6', name: "Classic Cappuccino", description: "Perfect balance of espresso, steamed milk and foam.", price: 5.00, category: "Coffee", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80" },
                    ]);
                } else {
                    setMenuItems(data);
                }
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
        <div className="w-full bg-theme-bg min-h-screen py-16 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h4 className="text-theme-text/50 font-bold tracking-[0.2em] text-sm mb-4 uppercase">Discover</h4>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-text mb-6">Our Full Menu</h2>
                    <p className="max-w-2xl mx-auto text-theme-text/70 px-4">
                        Explore our wide range of handcrafted beverages, sweet treats, and savory delights.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filter === cat ? 'bg-theme-accent text-white' : 'bg-theme-card text-theme-text shadow-sm border border-black/5 hover:bg-theme-accent/10'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full bg-theme-card border-2 border-transparent focus:border-theme-accent/50 outline-none shadow-sm border border-black/5 text-sm"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-theme-text/40" size={18} />
                    </div>
                </div>

                {/* Menu Grid */}
                {loading ? (
                    <div className="text-center py-20 text-theme-text/50 font-medium">Loading exquisite tastes...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map(item => (
                            <div key={item._id} className="bg-theme-card rounded-[24px] p-5 shadow-sm border border-black/5 hover:shadow-xl transition-shadow group flex flex-col h-full border border-theme-text/20/5">
                                <div className="rounded-[16px] overflow-hidden mb-6 h-56 relative">
                                    <img src={item.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80'} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-3 right-3 bg-theme-dark/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-theme-text">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-3 gap-2">
                                        <h3 className="font-serif font-bold text-lg text-theme-text leading-tight">{item.name}</h3>
                                        <span className="font-bold text-theme-accent shrink-0">Rs. {item.price.toFixed(2)}</span>
                                    </div>
                                    <p className="text-theme-text/60 text-sm mb-6 flex-grow">{item.description}</p>
                                    <button
                                        onClick={() => {
                                            addToCart(item);
                                            toast.success(`Added ${item.name} to cart`);
                                        }}
                                        className="w-full bg-theme-bg text-theme-text py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-theme-accent hover:text-white transition-colors flex items-center justify-center gap-2 border border-theme-text/20/10"
                                    >
                                        <ShoppingBag size={16} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredItems.length === 0 && (
                    <div className="text-center py-20 text-theme-text/50 font-medium text-lg">
                        No items found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
