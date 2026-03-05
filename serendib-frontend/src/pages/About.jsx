import { Coffee, Users, History, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="w-full bg-theme-bg min-h-screen py-16 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h4 className="text-theme-text/50 font-bold tracking-[0.2em] text-sm mb-4 uppercase">Our Story</h4>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-text mb-6">A Journey of Flavor</h2>
                    <p className="max-w-2xl mx-auto text-theme-text/70 px-4">
                        From the lush hills of Sri Lanka to your cup, discover the passion and history behind Café Serendib.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24 bg-theme-card rounded-[40px] p-8 md:p-16 shadow-none border border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-theme-bg rounded-bl-full opacity-60"></div>
                    <div className="lg:w-1/2 relative z-10 space-y-6">
                        <h3 className="text-3xl font-serif font-bold text-theme-text">The Heart of Ceylon</h3>
                        <p className="text-theme-text/70 leading-relaxed text-lg">
                            Founded in 2020, Café Serendib was born out of a profound love for traditional Sri Lankan flavors and modern coffee culture. The name "Serendib" is an ancient name for Sri Lanka, famously known as the origin of the word "serendipity" - meaning a happy or pleasant surprise.
                        </p>
                        <p className="text-theme-text/70 leading-relaxed text-lg">
                            That's exactly what we aim to deliver with every cup and every bite: a pleasant surprise. We source our beans ethically from local farmers, ensuring the highest quality while supporting our community.
                        </p>
                    </div>
                    <div className="lg:w-1/2 z-10">
                        <img
                            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80"
                            alt="Cafe Interior"
                            className="w-full h-[400px] object-cover rounded-[30px] shadow-2xl"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {[
                        { icon: <Coffee size={32} />, stat: "50k+", label: "Cups Served" },
                        { icon: <Users size={32} />, stat: "10k+", label: "Happy Customers" },
                        { icon: <History size={32} />, stat: "4 Years", label: "of Excellence" },
                        { icon: <Award size={32} />, stat: "15+", label: "Local Awards" }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-theme-dark text-white rounded-[32px] p-10 flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform shadow-lg">
                            <div className="text-theme-accent mb-4">{item.icon}</div>
                            <div className="text-4xl font-serif font-bold mb-2">{item.stat}</div>
                            <div className="text-theme-bg/60 text-sm tracking-widest uppercase">{item.label}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default About;
