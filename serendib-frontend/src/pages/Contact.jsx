import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="w-full bg-theme-bg min-h-screen py-16 px-6 md:px-12">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h4 className="text-theme-dark/50 font-bold tracking-[0.2em] text-sm mb-4 uppercase">Get in Touch</h4>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-theme-dark mb-6">We'd Love to Hear from You</h2>
                    <p className="max-w-2xl mx-auto text-theme-dark/70 px-4">
                        Whether you have a question about our menu, reservations, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Contact Info */}
                    <div className="lg:w-1/3 space-y-8">
                        <div className="bg-white p-8 rounded-[32px] shadow-sm flex items-start gap-6 border border-theme-dark/5">
                            <div className="bg-theme-bg p-4 rounded-full text-theme-accent shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-xl text-theme-dark mb-2">Call Us</h4>
                                <p className="text-theme-dark/60 text-sm mb-1">+94 11 234 5678</p>
                                <p className="text-theme-dark/60 text-sm">+94 77 123 4567</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-sm flex items-start gap-6 border border-theme-dark/5">
                            <div className="bg-theme-bg p-4 rounded-full text-theme-accent shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-xl text-theme-dark mb-2">Email Us</h4>
                                <p className="text-theme-dark/60 text-sm mb-1">hello@cafeserendib.lk</p>
                                <p className="text-theme-dark/60 text-sm">support@cafeserendib.lk</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-sm flex items-start gap-6 border border-theme-dark/5">
                            <div className="bg-theme-bg p-4 rounded-full text-theme-accent shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-xl text-theme-dark mb-2">Visit Us</h4>
                                <p className="text-theme-dark/60 text-sm leading-relaxed">
                                    123 Galle Road,<br />Colombo 03,<br />Sri Lanka
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3 bg-theme-dark text-white p-10 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
                        {/* Abstract background blobs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-theme-accent/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-serif font-bold mb-8">Send a Message</h3>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-theme-bg/70">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-theme-accent focus:bg-white/10 outline-none transition-all text-white" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-theme-bg/70">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-theme-accent focus:bg-white/10 outline-none transition-all text-white" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-theme-bg/70">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-theme-accent focus:bg-white/10 outline-none transition-all text-white" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-theme-bg/70">Message</label>
                                    <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-theme-accent focus:bg-white/10 outline-none transition-all text-white resize-none" placeholder="How can we help you?"></textarea>
                                </div>
                                <button className="w-full bg-theme-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-theme-dark transition-colors flex items-center justify-center gap-2 mt-8">
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
