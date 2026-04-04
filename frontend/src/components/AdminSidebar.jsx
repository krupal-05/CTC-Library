import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react';

const AdminSidebar = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    return (
        <aside className="w-64 bg-primary text-white flex-shrink-0 min-h-full flex flex-col shadow-xl">
            {/* User Profile Summary in Sidebar */}
            <div className="p-8 flex flex-col items-center border-b border-white/10 bg-black/10">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden shadow-lg border-4 border-secondary/30">
                    <User className="w-12 h-12 text-primary/40" />
                </div>
                {/* Fallback to 'Admin' if name not set */}
                <h3 className="font-bold text-lg text-center truncate w-full tracking-wide">Admin Dashboard</h3>
                <p className="text-xs text-white/60 mt-1">{userInfo.name || 'Administrator'}</p>
            </div>

            <nav className="flex-1">
                <div className="flex flex-col text-white">
                    <NavLink to="/admin/profile"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        Profile
                    </NavLink>
                    <NavLink to="/admin/books"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        Browse All Books
                    </NavLink>
                    <NavLink to="/admin/manage-books"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        Book Manager
                    </NavLink>
                    <NavLink to="/admin/students"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        Student Manager
                    </NavLink>
                    <NavLink to="/admin/issue-book"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        Issue / Return
                    </NavLink>
                    <NavLink to="/admin/requests"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        Requests
                    </NavLink>
                    <NavLink to="/admin/reports"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        Reports
                    </NavLink>
                    <NavLink to="/admin/history"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        History
                    </NavLink>
                    <NavLink to="/admin/feedback"
                        className={({ isActive }) => `px-6 py-3 text-left font-bold border-b border-white/5 transition-all hover:bg-white/5 ${isActive ? 'bg-secondary text-white border-white/20 shadow-inner' : 'text-white/70'}`}
                    >
                        User Feedback
                    </NavLink>
                </div>

            </nav>
        </aside>
    );
};

export default AdminSidebar;
