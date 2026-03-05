import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Bell, Check, ChevronDown } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const { notifications, unreadCount, markAsRead } = useNotification();
    const [showNotifications, setShowNotifications] = React.useState(false);

    React.useEffect(() => {
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
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="LDCE Library" className="w-10 h-10 object-cover rounded-full" />
                    <span className="text-xl font-bold text-gray-800">LDCE Library</span>
                </Link>

                {/* Main Navigation Area */}
                <div className="flex-1 flex flex-col xl:ml-12 lg:ml-8 justify-center">

                    {/* Top Row: Primary Nav & Actions */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-sm xl:text-base">
                            <Link to="/" className="text-gray-600 hover:text-brand-blue font-medium py-1 transition-colors">Home</Link>

                            {/* Digital Resources Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-600 hover:text-brand-blue font-medium py-1 transition-colors focus:outline-none">
                                    Digital Resources <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                                </button>
                                <div className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-md shadow-xl rounded-xl py-2 min-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                    <Link to="/resources/e-newspapers" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">E-Newspapers</Link>
                                    <Link to="/resources/e-books" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">E-Books</Link>
                                    <Link to="/resources/e-magazines" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">E-Magazines</Link>
                                    <Link to="/resources/pamphlets" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">Pamphlets</Link>
                                    <Link to="/resources/audiobooks" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">E-books & Audiobooks</Link>
                                </div>
                            </div>

                            {/* Events Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-600 hover:text-brand-blue font-medium py-1 transition-colors focus:outline-none">
                                    Events <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                                </button>
                                <div className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-md shadow-xl rounded-xl py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                    <Link to="/events" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">Events</Link>
                                    <Link to="/programs" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue transition-colors">Programs</Link>
                                </div>
                            </div>

                            {/* Contact Dropdown with Sub-menus */}
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-600 hover:text-brand-blue font-medium py-1 transition-colors focus:outline-none">
                                    Contact <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                                </button>
                                <div className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-md shadow-xl rounded-xl py-3 min-w-[260px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                    {/* About Sub-menu */}
                                    <div className="px-4 py-1">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">About</h4>
                                        <Link to="/faq" className="block py-1.5 text-sm text-gray-700 hover:text-brand-blue transition-colors">FAQ</Link>
                                        <Link to="/policies" className="block py-1.5 text-sm text-gray-700 hover:text-brand-blue transition-colors">Policies</Link>
                                    </div>
                                    <div className="h-px bg-gray-100 my-2 mx-4"></div>
                                    {/* Contact Info Sub-menu */}
                                    <div className="px-4 py-1">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Info</h4>
                                        <Link to="/contact/email" className="block py-1.5 text-sm text-gray-700 hover:text-brand-blue transition-colors">Email</Link>
                                        <Link to="/contact/telephone" className="block py-1.5 text-sm text-gray-700 hover:text-brand-blue transition-colors">Telephone</Link>
                                        <Link to="/contact/volunteer" className="block py-1.5 text-sm text-gray-700 hover:text-brand-blue transition-colors">Volunteer Opportunities</Link>
                                        <Link to="/contact/librarian" className="block py-1.5 text-sm text-gray-700 hover:text-brand-blue transition-colors">Librarian Details</Link>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            {user && (
                                <Link
                                    to={user.role === 'admin' ? '/admin/dashboard' : '/student/profile'}
                                    className="text-brand-blue font-bold hover:underline py-1"
                                >
                                    Dashboard
                                </Link>
                            )}
                            {user && (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className="relative p-2 text-gray-600 hover:text-brand-blue hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Bell size={24} />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {/* Notification Dropdown */}
                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100]">
                                            <div className="p-3 border-b border-gray-50 flex justify-between items-center bg-gray-50">
                                                <h3 className="font-bold text-gray-700">Notifications</h3>
                                                <span className="text-xs text-gray-500">{unreadCount} unread</span>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                                                ) : (
                                                    notifications.map((notif) => (
                                                        <div
                                                            key={notif._id}
                                                            className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}
                                                            onClick={() => !notif.read && markAsRead(notif._id)}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                                                                <div className="flex-1">
                                                                    <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                                                                        {notif.message}
                                                                    </p>
                                                                    <p className="text-xs text-gray-400 mt-1">
                                                                        {new Date(notif.createdAt).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="bg-brand-dark text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm">
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Bottom Row: Secondary Nav */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base mb-1">
                        <Link to="/feedback" className="text-gray-600 hover:text-brand-blue font-medium transition-colors">Feedback</Link>
                        <Link to="/learning" className="text-gray-600 hover:text-brand-blue font-medium transition-colors">Learning</Link>
                        <Link to="/map" className="text-gray-600 hover:text-brand-blue font-medium transition-colors">Map</Link>
                        <Link to="/committee" className="text-gray-600 hover:text-brand-blue font-medium transition-colors">Committee</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
