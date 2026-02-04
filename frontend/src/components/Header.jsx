import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Bell, Check } from 'lucide-react';
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

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-brand-blue font-medium">Home</Link>
                    <Link to="/about" className="text-gray-600 hover:text-brand-blue font-medium">About us</Link>
                    {user && (
                        <Link
                            to={user.role === 'admin' ? '/admin/dashboard' : '/student/profile'}
                            className="text-brand-blue font-medium hover:underline"
                        >
                            Dashboard
                        </Link>
                    )}
                </nav>



                {/* Actions */}
                <div className="flex items-center gap-4">
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
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="bg-brand-dark text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors">
                            Login / Register
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
