import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Book, CreditCard, Library } from 'lucide-react';

const Sidebar = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    const getLinkClass = ({ isActive }) => {
        return `flex items-center gap-3 px-6 py-4 transition-colors font-medium border-l-4 ${isActive
            ? 'bg-[#4c7c9b]/20 border-[#4c7c9b] text-[#4c7c9b]'
            : 'hover:bg-gray-100 border-transparent text-gray-600'
            }`;
    };

    return (
        <aside className="w-64 bg-[#4c7c9b] text-white flex-shrink-0 min-h-full flex flex-col">
            {/* User Profile Summary in Sidebar */}
            <div className="p-8 flex flex-col items-center border-b border-white/20">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden">
                    <User className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg text-center">{userInfo.name || 'Student'}</h3>
            </div>

            <nav className="flex-1">
                <div className="flex flex-col text-white">
                    <NavLink to="/student/profile"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        Profile
                    </NavLink>

                    <NavLink to="/student/browse-udc"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        All Books
                    </NavLink>
                    <NavLink to="/student/payment"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        Payment
                    </NavLink>
                    <NavLink to="/student/mybooks"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        My Books
                    </NavLink>
                </div>

            </nav>
        </aside>
    );
};

export default Sidebar;
