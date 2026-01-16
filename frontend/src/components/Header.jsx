import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

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

                {/* Action Button */}
                <div>
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
