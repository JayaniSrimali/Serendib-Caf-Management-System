import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const About = () => {
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
            `}</style>

            {/* Hero Section */}
            <div className="relative h-[450px] w-full flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop"
                    alt="Coffee setup"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 animate-scale-in opacity-0"
                />
                <div className="absolute inset-0 bg-[#382D26]/70 backdrop-blur-[2px]"></div>

                <div className="relative z-10 text-center px-6 opacity-0 animate-fade-in-up delay-200">
                    <h4 className="text-[#CDA177] font-bold tracking-[0.3em] text-sm mb-4 uppercase">About Us</h4>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Our Story</h1>
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-medium">
                        <span className="hover:text-[#CDA177] cursor-pointer transition-colors">Home</span>
                        <span className="text-[10px]">&#8594;</span>
                        <span className="text-white">Our Story</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-24">

                {/* 1. The Story Section */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-40 items-center">

                    {/* Left: Image */}
                    <div className="lg:w-1/2 w-full opacity-0 animate-fade-in-up delay-200">
                        <div className="relative w-full h-[500px] lg:h-[650px] bg-[#1d1814] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=2000&auto=format&fit=crop"
                                alt="Pouring coffee"
                                className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-[2s]"
                            />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-1/2 w-full opacity-0 animate-fade-in-up delay-400">
                        <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> OUR STORY
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-white mb-8">The Story</h2>

                        <div className="space-y-6 text-[#a09c99] text-[13px] leading-[2.2] mb-12">
                            <p>
                                Founded with a profound passion for Sri Lanka's rich coffee heritage, Café Serendib brings the finest highland roasts straight from the misty hills to your cup. We started our journey believing that coffee is more than just a drink—it’s an experience that connects people.
                            </p>
                            <p>
                                Our master baristas carefully prepare each cup to honor the traditional methods while embracing modern coffee culture. Every sip is a testament to our dedication to quality, community, and the serendipitous moments born in our cozy coffeehouse.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-12 mb-12">
                            <div>
                                <h3 className="text-4xl font-bold text-white mb-2 tracking-wider">05<span className="text-[#CDA177]">+</span></h3>
                                <p className="text-[#a09c99] text-[11px] uppercase tracking-wider">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold text-white mb-2 tracking-wider">12<span className="text-[#CDA177]">+</span></h3>
                                <p className="text-[#a09c99] text-[11px] uppercase tracking-wider">Expert Baristas</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold text-white mb-2 tracking-wider">98<span className="text-[#CDA177]">%</span></h3>
                                <p className="text-[#a09c99] text-[11px] uppercase tracking-wider">Happy Customers</p>
                            </div>
                        </div>

                        {/* Specialities */}
                        <div>
                            <h5 className="text-white text-[11px] font-bold tracking-[0.2em] mb-6 uppercase">Specialities</h5>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                {['Fine Roasts', 'Locally Sourced', 'Ceylon Blends', 'Fresh Pastries'].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-[#a09c99] text-[12px] uppercase tracking-wider">
                                        <div className="w-5 h-5 rounded-full border border-[#CDA177] flex items-center justify-center text-[#CDA177]">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. The Ingredients Section */}
                <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 mb-32 items-center">

                    {/* Left: Content */}
                    <div className="lg:w-1/2 w-full pr-0 lg:pr-10">
                        <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> OUR QUALITY
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-white mb-8">The Coffee Beans</h2>

                        <p className="text-[#a09c99] text-[13px] leading-[2.2] mb-10">
                            We pride ourselves on using 100% locally sourced, shade-grown Arabica and Robusta beans from the central highlands of Sri Lanka. Handpicked at peak ripeness, meticulously processed, and skillfully roasted in-house, these beans guarantee a rich, full-bodied aromatic profile that dances on your palate. Quality isn't just an ingredient; it's our promise.
                        </p>

                        <div className="mb-12">
                            <div className="font-['Allura',cursive] text-4xl text-[#CDA177] opacity-80 mb-2">Tharindu Fernando</div>
                            <p className="text-[#a09c99] text-[11px] uppercase tracking-wider font-bold">Tharindu Fernando , Master Roaster</p>
                        </div>

                        <Link to="/reserve">
                            <button className="bg-[#CDA177] text-black px-10 py-4 rounded-2xl  text-[11px] font-bold uppercase tracking-widest hover:bg-[#b88c64] transition-colors shadow-lg shadow-black/40">
                                RESERVE NOW
                            </button>
                        </Link>
                    </div>

                    {/* Right: Image */}
                    <div className="lg:w-1/2 w-full relative">
                        <div className="w-full h-[500px] lg:h-[600px] bg-[#1d1814] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=2000&auto=format&fit=crop"
                                alt="Roasted coffee beans"
                                className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-[2s]"
                            />
                        </div>
                        {/* Overlapping Info Box */}
                        <div className="absolute -bottom-10 -left-6 lg:left-[-60px] bg-white text-black p-8 md:p-10 w-[90%] md:w-[350px] shadow-2xl z-10">
                            <p className="text-[#333] text-[12px] leading-relaxed italic mb-6">
                                "The aroma of their freshly roasted beans is mesmerizing. True Sri Lankan essence captured in a cup. A must-visit coffeehouse."
                            </p>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-black">
                                Samantha P. — <span className="text-[#CDA177]">Food Critic</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Quote Section */}
                <div className="py-24 flex flex-col items-center justify-center text-center px-4">
                    <div className="text-[#CDA177] text-6xl font-serif mb-6 opacity-60">"</div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white max-w-3xl leading-relaxed italic mb-8">
                        The discovery of a new coffee roast does more for the happiness of mankind than the discovery of a star.
                    </h3>
                    <p className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] uppercase flex items-center justify-center gap-4">
                        <span className="w-6 h-[1px] bg-[#CDA177]/80"></span> JEAN ANTHELME <span className="w-6 h-[1px] bg-[#CDA177]/80"></span>
                    </p>
                </div>

                {/* 4. Our Commitment Section (From Reserve Page conceptual alignment) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start mt-10">

                    {/* Left: Text & People Image */}
                    <div className="flex flex-col gap-8">
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
                    <div className="pt-2 lg:pt-8 pr-4">
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

            {/* 5. Reserve A Table Bottom CTA */}
            <div className="relative w-full py-24 px-6 md:px-12 mt-10">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
                        alt="Restaurant seating"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-[#130f0c]/90"></div>
                </div>

                <div className="relative z-10 max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 border border-[#302720] p-10 lg:p-16">
                    <div className="lg:w-2/3">
                        <h4 className="text-[#CDA177] text-[10px] font-bold tracking-[0.35em] mb-4 uppercase flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[#CDA177]/80"></span> RESERVE
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-white mb-6">Reserve A Table</h2>
                        <p className="text-[#a09c99] text-[13px] leading-[2.2] max-w-xl">
                            Secure your ideal spot at Café Serendib. Experience a serene atmosphere paired with exceptional Ceylon coffee blends. Whether it is an intimate meeting or a grand gathering, a memorable ambiance awaits.
                        </p>
                    </div>
                    <div className="lg:w-1/3 flex justify-start lg:justify-end">
                        <Link to="/reserve">
                            <button className="bg-[#CDA177] text-black px-10 py-5 text-[11px]  rounded-2xl font-bold uppercase tracking-widest hover:bg-[#b88c64] transition-colors shadow-lg shadow-black/40 hover:scale-105">
                                MAKE A RESERVATION
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
