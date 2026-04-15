import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    BookOpen,
    Headphones,
    Newspaper,
    Phone,
    Search
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
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

    const isActivePath = (path) => location.pathname === path;
    const isActiveGroup = (paths) => paths.some((path) => location.pathname.startsWith(path));

    return (
        <header className="z-50 font-body sticky top-0 w-full shadow-sm bg-[#f8f9fb]">
            {/* Top Ticker Bar */}
            <div className="bg-[#293c47] text-[#e0e5eb] overflow-hidden whitespace-nowrap py-2 relative z-[60] text-[13px] font-label font-medium tracking-wide">
                <div className="flex animate-marquee-slower items-center w-max">
                    {[
                        { text: 'New Arrivals: "Deep Learning for Vision" by Andrew Ng now available in the CS Section!', icon: Bell },
                        { text: 'Upcoming Event: SAHYOG-2025 International Symposium', icon: null },
                        { text: 'Daily Update: Digital Repository now accessible via G...', icon: null },
                        { text: 'Notice: Please return overdue books by Friday to avoid fines. Happy Reading!', icon: null }
                    ].map((item, idx) => (
                        <React.Fragment key={`set1-${idx}`}>
                            <span className="flex items-center gap-2 px-8 opacity-90 hover:opacity-100 transition-opacity">
                                {item.icon && <item.icon size={13} className="animate-pulse" />}
                                {item.text}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-white/30 shrink-0"></div>
                        </React.Fragment>
                    ))}
                    {/* Duplicated for seamless scroll */}
                    {[
                        { text: 'New Arrivals: "Deep Learning for Vision" by Andrew Ng now available in the CS Section!', icon: Bell },
                        { text: 'Upcoming Event: SAHYOG-2025 International Symposium', icon: null },
                        { text: 'Daily Update: Digital Repository now accessible via G...', icon: null },
                        { text: 'Notice: Please return overdue books by Friday to avoid fines. Happy Reading!', icon: null }
                    ].map((item, idx) => (
                        <React.Fragment key={`set2-${idx}`}>
                            <span className="flex items-center gap-2 px-8 opacity-90 hover:opacity-100 transition-opacity">
                                {item.icon && <item.icon size={13} className="animate-pulse" />}
                                {item.text}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-white/30 shrink-0"></div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-6 relative z-[60]">
                {/* Branding  - Left */}
                <Link to="/" className="flex items-center gap-3 shrink-0 group py-1">
                    <img src={logo} alt="Library Logo" className="h-[46px] w-auto object-contain" />
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-serif font-extrabold text-[#1a5b51] leading-tight tracking-tight">LDCE Library</h1>
                    </div>
                </Link>

                {/* Desktop Nav Links - Center */}
                <nav className="hidden lg:flex items-center gap-1 xl:gap-6 flex-1 justify-center font-label">
                    <div className="relative group px-1 py-2">
                         <Link
                            to="/"
                            className={`px-1 py-2 text-[15px] font-bold border-b-[3px] transition-colors ${
                                isActivePath('/')
                                    ? 'text-[#1a5b51] border-[#1a5b51]'
                                    : 'text-[#354955] border-transparent hover:text-[#354955] hover:border-[#1a5b51]'
                            }`}
                        >
                            Home
                        </Link>
                    </div>
                     
                    {/* Digital Resources Dropdown */}
                    <div className="relative group px-1 py-2" onMouseEnter={() => setActiveDropdown('digital')} onMouseLeave={() => setActiveDropdown(null)}>
                        <button className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-bold transition-colors border-b-[3px] rounded-none ${
                            isActiveGroup(['/digital']) ? 'text-[#1a5b51] border-[#1a5b51]' : 'text-[#354955] border-transparent hover:text-[#354955] hover:border-[#1a5b51]'
                        }`}>
                            Resources
                        </button>
                        {activeDropdown === 'digital' && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-surface_container_lowest shadow-[0_24px_48px_rgba(25,28,29,0.08)] rounded-xl py-3 animate-in fade-in slide-in-from-top-2 border border-outline_variant">
                                {[
                                    { label: 'E-Newspapers', icon: Newspaper, link: '/digital/newspapers' },
                                    { label: 'E-Books', icon: BookOpen, link: '/digital/books' },
                                    { label: 'Audiobooks', icon: Headphones, link: '/digital/audiobooks' }
                                ].map(item => (
                                    <Link key={item.label} to={item.link} className="flex items-center gap-3 px-5 py-2.5 hover:bg-surface_container_low transition-colors group/item font-label">
                                        <item.icon size={16} className="text-primary/60 group-hover/item:text-primary" />
                                        <span className="text-[14px] font-medium text-on_surface/90 group-hover/item:text-on_surface">{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>



                     {/* Courses Dropdown */}
                    <div className="relative group px-1 py-2" onMouseEnter={() => setActiveDropdown('courses')} onMouseLeave={() => setActiveDropdown(null)}>
                        <button className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-bold transition-colors border-b-[3px] rounded-none ${
                            isActiveGroup(['/learning']) ? 'text-[#1a5b51] border-[#1a5b51]' : 'text-[#354955] border-transparent hover:text-[#354955] hover:border-[#1a5b51]'
                        }`}>
                            Courses
                        </button>
                         {activeDropdown === 'courses' && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-surface_container_lowest shadow-[0_24px_48px_rgba(25,28,29,0.08)] rounded-xl py-3 animate-in fade-in slide-in-from-top-2 border border-outline_variant">
                                <Link to="/learning/nptel" className="flex items-center gap-3 px-5 py-2.5 hover:bg-surface_container_low transition-colors group/item font-label">
                                    <GraduationCap size={16} className="text-primary/60 group-hover/item:text-primary" />
                                    <span className="text-[14px] font-medium text-on_surface/90 group-hover/item:text-on_surface">NPTEL</span>
                                </Link>
                                <Link to="/learning/onos" className="flex items-center gap-3 px-5 py-2.5 hover:bg-surface_container_low transition-colors group/item font-label">
                                    <BookOpen size={16} className="text-primary/60 group-hover/item:text-primary" />
                                    <span className="text-[14px] font-medium text-on_surface/90 group-hover/item:text-on_surface">ONOS</span>
                                </Link>
                            </div>
                         )}
                    </div>

                    <div className="relative group px-1 py-2">
                        <Link
                            to="/feedback"
                            className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-bold transition-colors border-b-[3px] rounded-none ${
                                isActivePath('/feedback') ? 'text-[#1a5b51] border-[#1a5b51]' : 'text-[#354955] border-transparent hover:text-[#354955] hover:border-[#1a5b51]'
                            }`}
                        >
                            Feedback
                        </Link>
                    </div>

                    <div className="relative group px-1 py-2">
                        <Link
                            to="/committee"
                            className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-bold transition-colors border-b-[3px] rounded-none ${
                                isActivePath('/committee') ? 'text-[#1a5b51] border-[#1a5b51]' : 'text-[#354955] border-transparent hover:text-[#354955] hover:border-[#1a5b51]'
                            }`}
                        >
                            Committee
                        </Link>
                    </div>

                    {/* Contact Dropdown */}
                    <div className="relative group px-1 py-2" onMouseEnter={() => setActiveDropdown('contact')} onMouseLeave={() => setActiveDropdown(null)}>
                        <button className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-bold transition-colors border-b-[3px] rounded-none ${
                            isActiveGroup(['/contact', '/faq', '/policies', '/librarian']) ? 'text-[#1a5b51] border-[#1a5b51]' : 'text-[#354955] border-transparent hover:text-[#354955] hover:border-[#1a5b51]'
                        }`}>
                            Contact
                        </button>
                        {activeDropdown === 'contact' && (
                            <div className="absolute top-full right-0 w-80 bg-surface_container_lowest shadow-[0_24px_48px_rgba(25,28,29,0.08)] rounded-xl p-4 animate-in fade-in slide-in-from-top-2 border border-outline_variant flex gap-4">
                                <div className="flex-1 space-y-1">
                                    <h4 className="text-[11px] font-bold text-on_surface/50 uppercase tracking-wider mb-2 px-2">About</h4>
                                    <Link to="/faq" className="block px-2 py-1.5 hover:bg-surface_container_low rounded-md text-[13px] font-medium text-on_surface/90 font-label">FAQ</Link>
                                    <Link to="/policies" className="block px-2 py-1.5 hover:bg-surface_container_low rounded-md text-[13px] font-medium text-on_surface/90 font-label">Policies</Link>
                                </div>
                                <div className="w-px bg-outline_variant"></div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="text-[11px] font-bold text-on_surface/50 uppercase tracking-wider mb-2 px-2">Contact Info</h4>
                                    <Link to="/contact/details" className="flex items-center gap-2 px-2 py-1.5 hover:bg-surface_container_low rounded-md text-[13px] font-medium text-on_surface/90 font-label"><Phone size={14} className="text-primary/60"/> Email/Tel</Link>
                                    <Link to="/librarian" className="flex items-center gap-2 px-2 py-1.5 hover:bg-surface_container_low rounded-md text-[13px] font-medium text-on_surface/90 font-label"><Users size={14} className="text-primary/60"/> Librarian</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Right Actions: Search Icon + Auth */}
                <div className="flex items-center gap-4 shrink-0 font-label">
                    
                    {/* Search Field (Hidden on small, visible on desktop) */}
                    <div className="hidden md:flex items-center relative group">
                         <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a5b51] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search archives..." 
                            className="w-56 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-[14px] outline-none transition-all focus:w-64 focus:border-[#1a5b51] placeholder:text-gray-400 text-gray-700"
                        />
                    </div>

                    {user ? (
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="p-2 hover:bg-surface_container_low rounded-full transition-colors relative"
                                >
                                    <Bell size={20} className={unreadCount > 0 ? "text-primary animate-pulse" : "text-on_surface/60"} />
                                    {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-on_primary text-[9px] font-bold flex items-center justify-center rounded-full border border-surface_container_lowest">{unreadCount}</span>}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-3 w-80 bg-surface_container_lowest rounded-xl shadow-[0_24px_48px_rgba(25,28,29,0.08)] border border-outline_variant overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2">
                                        <div className="p-4 border-b border-outline_variant flex justify-between items-center bg-surface_container_low/50">
                                            <h3 className="font-bold text-primary text-sm">Alerts</h3>
                                            <span className="text-[10px] font-bold text-on_primary bg-primary px-2.5 py-1 rounded-full">{unreadCount} New</span>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="p-8 text-center text-on_surface/40 text-sm">No new signals</div>
                                            ) : (
                                                notifications.map((notif) => (
                                                    <div key={notif._id} className="p-4 border-b border-outline_variant/50 text-sm hover:bg-surface_container_low cursor-pointer transition-colors" onClick={() => !notif.read && markAsRead(notif._id)}>
                                                        <div className="flex items-start gap-3">
                                                            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-primary' : 'bg-transparent'}`} />
                                                            <span className={!notif.read ? 'font-semibold text-on_surface' : 'text-on_surface/60'}>{notif.message}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-outline_variant">
                                <Link to={user.role === 'admin' ? '/admin/profile' : '/student/profile'} className="text-sm font-semibold text-on_surface/80 hover:text-primary transition-colors font-label">
                                    {user.name?.split(' ')[0] || 'User'}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 border border-outline_variant text-on_surface hover:bg-surface_container_low hover:text-primary rounded-xl text-sm font-medium transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-[#1a5b51] text-white px-7 py-2.5 rounded-full text-[14px] font-medium transition-all hover:bg-[#134840] font-label">
                            Login
                        </Link>
                    )}

                    <button className="lg:hidden p-2 text-on_surface hover:bg-surface_container_low rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden fixed inset-0 z-[100] bg-surface_container_lowest transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="p-6 space-y-8 flex flex-col h-full">
                    <div className="flex justify-between items-center pb-4 border-b border-outline_variant">
                        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileMenuOpen(false)}>
                            <img src={logo} alt="LDCE Logo" className="w-[36px] h-[36px] object-cover rounded-full" />
                            <h1 className="text-lg font-display font-bold text-primary">LDCE Library</h1>
                        </Link>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-on_surface hover:bg-surface_container_low rounded-full transition-colors"><X size={24} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <nav className="flex flex-col gap-2 font-label">
                            {[
                                { label: 'Home', link: '/' },
                                { label: 'Digital Resources', link: '/digital' },
                                { label: 'Events & Programs', link: '/events' },
                                { label: 'Contact & FAQ', link: '/contact' },
                                { label: 'NPTEL Courses', link: '/learning/nptel' },
                                { label: 'ONOS Courses', link: '/learning/onos' },
                                { label: 'Feedback', link: '/feedback' },
                                { label: 'Committee', link: '/committee' },
                                { label: 'Library Map', link: '/map' }
                            ].map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.link}
                                    className={`px-4 py-3 rounded-xl font-medium text-[15px] transition-colors ${
                                        location.pathname === item.link || (item.link !== '/' && location.pathname.startsWith(item.link))
                                            ? 'bg-surface_container_low text-primary'
                                            : 'bg-surface_container_low/50 text-on_surface/80 hover:bg-surface_container_low hover:text-primary'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-outline_variant">
                        {user ? (
                           <button onClick={handleLogout} className="w-full text-center bg-surface_container_low text-on_surface py-3.5 rounded-xl font-semibold border border-outline_variant">Logout</button>
                        ) : (
                            <Link to="/login" className="block text-center bg-gradient-to-r from-primary to-primary_container text-on_primary py-3.5 rounded-xl font-semibold shadow-[0_8px_16px_rgba(0,32,89,0.15)]" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
