import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react';

const AdminSidebar = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    return (
        <aside className="w-64 bg-[#4c7c9b] text-white flex-shrink-0 min-h-full flex flex-col">
            {/* User Profile Summary in Sidebar */}
            <div className="p-8 flex flex-col items-center border-b border-white/20">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden shadow-inner">
                    <User className="w-12 h-12 text-gray-400" />
                </div>
                {/* Fallback to 'Admin' if name not set */}
                <h3 className="font-bold text-lg text-center truncate w-full">{userInfo.name || 'Admin'}</h3>
            </div>

            <nav className="flex-1">
                <div className="flex flex-col text-white">
                    <NavLink to="/admin/profile"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        Profile
                    </NavLink>
                    <NavLink to="/admin/books"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        All Books
                    </NavLink>
                    <NavLink to="/admin/manage-books"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        Manager
                    </NavLink>
                    <NavLink to="/admin/activity"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        Recent Activity
                    </NavLink>
                    <NavLink to="/admin/history"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        History
                    </NavLink>
                    <NavLink to="/admin/feedback"
                        className={({ isActive }) => `px-6 py-4 text-center font-bold border-b border-white/20 hover:bg-white/10 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
                    >
                        Feedback
                    </NavLink>
                </div>

            </nav>
        </aside>
    );
};

export default AdminSidebar;
