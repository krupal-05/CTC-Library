import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
    Bell,
    ChevronDown,
    Menu,
    X,
    Calendar,
    Mail,
    Users,
    GraduationCap,
    Map as MapIcon,
    MessageSquare,
    Globe,
    FileText,
    Headphones,
    Newspaper,
    Info,
    Phone,
    HeartHandshake,
    BookOpen
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { notifications, unreadCount, markAsRead } = useNotification();
    const [showNotifications, setShowNotifications] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/');
    };

    return (
        <header className="z-50 font-sans">
            {/* Line 1: FIXED Top Bar (Branding, Search, Auth) - This will STAY on top */}
            <div className="fixed top-0 left-0 right-0 bg-primary text-white shadow-xl z-[60] h-[72px] lg:h-[84px] flex items-center">
                <div className="container mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">

                    {/* Branding */}
                    <Link to="/" className="flex items-center gap-3 shrink-0 group">
                        <div className="bg-white rounded-full w-[45px] h-[45px] lg:w-[55px] lg:h-[55px] flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-[10deg] transition-all duration-300">
                            <img src={logo} alt="LDCE Logo" className="w-[38px] h-[38px] lg:w-[48px] lg:h-[48px] object-cover rounded-full p-0.5" />
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <h1 className="text-lg lg:text-2xl font-black tracking-tight leading-none">LDCE Library</h1>
                            <p className="text-[9px] lg:text-[11px] opacity-70 font-bold uppercase tracking-widest mt-1">L.D. College of Engineering</p>
                        </div>
                    </Link>

                    {/* Right: Auth & Notifications */}
                    <div className="flex items-center gap-2 lg:gap-4 shrink-0">
                        {user ? (
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
                                    >
                                        <Bell size={20} className={unreadCount > 0 ? "text-accent animate-pulse" : "text-white/80"} />
                                        {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-primary text-[9px] font-black flex items-center justify-center rounded-full border-2 border-primary">{unreadCount}</span>}
                                    </button>

                                    {showNotifications && (
                                        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] text-gray-800 animate-in fade-in slide-in-from-top-2">
                                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                                <h3 className="font-black text-primary text-sm uppercase tracking-wider">Alerts</h3>
                                                <span className="text-[10px] font-bold text-accent bg-primary px-2.5 py-1 rounded-full">{unreadCount} New</span>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-8 text-center text-gray-400 text-sm italic">No new signals</div>
                                                ) : (
                                                    notifications.map((notif) => (
                                                        <div key={notif._id} className="p-4 border-b border-gray-50 text-sm hover:bg-gray-50 cursor-pointer" onClick={() => !notif.read && markAsRead(notif._id)}>
                                                            <div className="flex items-start gap-3">
                                                                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-accent' : 'bg-transparent'}`} />
                                                                <span className={!notif.read ? 'font-bold text-primary' : 'text-gray-600'}>{notif.message}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-white/10">
                                    <Link to={user.role === 'admin' ? '/admin/profile' : '/student/profile'} className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">
                                        {user.name?.split(' ')[0] || 'User'}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white/10 hover:bg-white text-white hover:text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border border-white/10"
                                    >
                                        Exit
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white hover:bg-accent text-primary px-4 lg:px-6 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
                                Login
                            </Link>
                        )}

                        <button className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Line 2: Navigation Categories (Scrolls away) */}
            {/* Added margin-top to account for fixed height of Line 1 */}
            <div className="mt-[72px] lg:mt-[84px]">
                <nav className="bg-primary text-white border-b border-white/5 shadow-md hidden lg:block overflow-visible relative z-[40]">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center gap-1">

                            {/* Digital Resources Dropdown */}
                            <div className="relative group p-1" onMouseEnter={() => setActiveDropdown('digital')} onMouseLeave={() => setActiveDropdown(null)}>
                                <button className="flex items-center gap-2 px-4 py-3 text-[13px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg group">
                                    <Globe size={16} className="text-accent" /> Digital Resources <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                {activeDropdown === 'digital' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 text-primary animate-in fade-in slide-in-from-top-2 overflow-hidden">
                                        {[
                                            { label: 'E-Newspapers', icon: Newspaper, link: '/digital/newspapers' },
                                            { label: 'E-Books', icon: BookOpen, link: '/digital/books' },
                                            { label: 'Audiobooks', icon: Headphones, link: '/digital/audiobooks' }
                                        ].map(item => (
                                            <Link key={item.label} to={item.link} className="flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 transition-colors group">
                                                <item.icon size={16} className="text-secondary/50 group-hover:text-secondary" />
                                                <span className="font-bold text-[13px]">{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Events Dropdown */}
                            <div className="relative group p-1" onMouseEnter={() => setActiveDropdown('events')} onMouseLeave={() => setActiveDropdown(null)}>
                                <button className="flex items-center gap-2 px-4 py-3 text-[13px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg group">
                                    <Calendar size={16} className="text-accent" /> Events <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                {activeDropdown === 'events' && (
                                    <div className="absolute top-full left-0 w-48 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 text-primary animate-in fade-in slide-in-from-top-2 overflow-hidden">
                                        <Link to="/events" className="flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 transition-colors group"><Calendar size={16} className="text-secondary/50 group-hover:text-secondary" /><span className="font-bold text-[13px]">Upcoming Events</span></Link>
                                        <Link to="/programs" className="flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 transition-colors group"><Users size={16} className="text-secondary/50 group-hover:text-secondary" /><span className="font-bold text-[13px]">Library Programs</span></Link>
                                    </div>
                                )}
                            </div>

                            {/* Contact Dropdown */}
                            <div className="relative group p-1" onMouseEnter={() => setActiveDropdown('contact')} onMouseLeave={() => setActiveDropdown(null)}>
                                <button className="flex items-center gap-2 px-4 py-3 text-[13px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg group">
                                    <Mail size={16} className="text-accent" /> Contact <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                {activeDropdown === 'contact' && (
                                    <div className="absolute top-full left-0 w-80 bg-white shadow-2xl rounded-2xl border border-gray-100 p-4 text-primary animate-in fade-in slide-in-from-top-2 flex gap-4">
                                        <div className="flex-1 space-y-2">
                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">About</h4>
                                            <Link to="/faq" className="block px-2 py-1.5 hover:bg-blue-50 rounded-lg font-bold text-[12px]">FAQ</Link>
                                            <Link to="/policies" className="block px-2 py-1.5 hover:bg-blue-50 rounded-lg font-bold text-[12px]">Policies</Link>
                                        </div>
                                        <div className="w-px bg-gray-100"></div>
                                        <div className="flex-1 space-y-2">
                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Contact Info</h4>
                                            <Link to="/contact/details" className="flex items-center gap-2 px-2 py-1.5 hover:bg-blue-50 rounded-lg font-bold text-[12px]"><Phone size={12} /> Email/Tel</Link>

                                            <Link to="/librarian" className="flex items-center gap-2 px-2 py-1.5 hover:bg-blue-50 rounded-lg font-bold text-[12px]"><Users size={12} /> Librarian</Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link to="/feedback" className="flex items-center gap-2 px-4 py-3 text-[13px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg"><MessageSquare size={16} className="text-accent" /> Feedback</Link>
                            <Link to="/committee" className="flex items-center gap-2 px-4 py-3 text-[13px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg"><Users size={16} className="text-accent" /> Committee</Link>
                            {/* Courses Dropdown */}
                            <div className="relative group p-1" onMouseEnter={() => setActiveDropdown('courses')} onMouseLeave={() => setActiveDropdown(null)}>
                                <button className="flex items-center gap-2 px-4 py-3 text-[13px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg group">
                                    <GraduationCap size={16} className="text-accent" /> Courses <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                {activeDropdown === 'courses' && (
                                    <div className="absolute top-full left-0 w-48 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 text-primary animate-in fade-in slide-in-from-top-2 overflow-hidden">
                                        <Link to="/learning/nptel" className="flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 transition-colors group">
                                            <GraduationCap size={16} className="text-secondary/50 group-hover:text-secondary" />
                                            <span className="font-bold text-[13px]">NPTEL</span>
                                        </Link>
                                        <Link to="/learning/onos" className="flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 transition-colors group">
                                            <BookOpen size={16} className="text-secondary/50 group-hover:text-secondary" />
                                            <span className="font-bold text-[13px]">ONOS</span>
                                            </Link>
                                    </div>
                                )}
                            </div>
                            <Link to="/map" className="flex items-center gap-2 px-4 py-3 text-[13px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg"><MapIcon size={16} className="text-accent" /> Map</Link>
                        </div>
                    </div>
                </nav>

                {/* Scrolling News Bar */}
                <div className="bg-accent overflow-hidden whitespace-nowrap py-2 border-b border-primary/10 shadow-inner relative z-[30]">
                    <div className="flex animate-marquee-slower items-center w-max text-primary">
                        {/* News Items Set 1 */}
                        {[
                            { text: 'New Arrivals: "Deep Learning for Vision" by Andrew Ng now available in the CS Section!', icon: Bell },
                            { text: 'Upcoming Event: Library Orientation Program on March 15th at 11:00 AM.', icon: null },
                            { text: 'Daily Update: LDCE Library now offers 24/7 access to IEEE Digital Library.', icon: null },
                            { text: 'Notice: Please return overdue books by Friday to avoid fines. Happy Reading!', icon: null }
                        ].map((item, idx) => (
                            <React.Fragment key={`set1-${idx}`}>
                                <span className="flex items-center gap-2 font-black text-[12px] uppercase tracking-wider px-12">
                                    {item.icon && <item.icon size={14} className="animate-bounce" />}
                                    {item.text}
                                </span>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/20 shrink-0"></div>
                            </React.Fragment>
                        ))}
                        {/* Duplicated News Items Set 2 for Seamless Scroll */}
                        {[
                            { text: 'New Arrivals: "Deep Learning for Vision" by Andrew Ng now available in the CS Section!', icon: Bell },
                            { text: 'Upcoming Event: Library Orientation Program on March 15th at 11:00 AM.', icon: null },
                            { text: 'Daily Update: LDCE Library now offers 24/7 access to IEEE Digital Library.', icon: null },
                            { text: 'Notice: Please return overdue books by Friday to avoid fines. Happy Reading!', icon: null }
                        ].map((item, idx) => (
                            <React.Fragment key={`set2-${idx}`}>
                                <span className="flex items-center gap-2 font-black text-[12px] uppercase tracking-wider px-12">
                                    {item.icon && <item.icon size={14} className="animate-bounce" />}
                                    {item.text}
                                </span>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/20 shrink-0"></div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden fixed inset-0 z-[100] bg-primary transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="p-6 space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-black uppercase tracking-widest">Library Menu</h2>
                        <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {[
                            { label: 'Digital Resources', link: '/digital' },
                            { label: 'Events & Programs', link: '/events' },
                            { label: 'Contact & FAQ', link: '/contact' },
                            { label: 'nptel Courses', link: '/learning/nptel' },
                            { label: 'ONOS Courses', link: '/learning/onos' },
                            { label: 'Library Map', link: '/map' }
                        ].map((item) => (
                            <Link key={item.label} to={item.link} className="p-5 bg-white/5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-accent hover:text-primary transition-all" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
                        ))}
                    </nav>

                    {!user && (
                        <Link to="/login" className="block text-center bg-white text-primary p-5 rounded-3xl font-black uppercase tracking-widest shadow-2xl">Login / Register</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
