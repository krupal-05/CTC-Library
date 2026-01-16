import React, { useState, useEffect } from 'react';
import { BookOpen, Book, AlertCircle, Plus, Upload, UserPlus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const navigate = useNavigate();
    const [statsData, setStatsData] = useState({
        totalBooks: 0,
        totalBorrowed: 0,
        overdueBooks: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/admin/stats', config);
                setStatsData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin stats", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats = [
        { title: 'Total Books', value: statsData.totalBooks, sub: 'In Library Catalog', icon: <BookOpen size={32} /> },
        { title: 'Books Borrowed', value: statsData.totalBorrowed, sub: 'Currently issued', icon: <Book size={32} /> },
        { title: 'Overdue Books', value: statsData.overdueBooks, sub: 'Needs attention', icon: <AlertCircle size={32} /> },
    ];

    const actions = [
        { title: 'Add New Book', desc: 'Add a New Book to the Library catalog', label: 'Add books', icon: <Plus size={32} />, path: '/admin/add-book' },
        { title: 'Issue Book', desc: 'Issue a book to a member', label: 'Issue', icon: <Book size={32} />, path: '/admin/issue-book' }, // Future: implement issue book page
        { title: 'Register Admin', desc: 'Register a new library member', label: 'Register', icon: <UserPlus size={32} />, path: '/register' },
        { title: 'Generate Report', desc: 'Create library activity reports', label: 'Generate', icon: <FileText size={32} />, path: '/admin/reports' },
    ];

    const handleActionClick = (path) => {
        if (path === '/register') {
            // Special handling for register to pass admin props perhaps, or just navigate
            navigate(path);
            return;
        }
        navigate(path);
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userInfo.name || 'Admin'}</h1>
                <p className="text-gray-500">Here's what's happening in your library today</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-green-50 rounded-2xl p-6 border border-green-100 flex items-start justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative z-10">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{stat.title}</h3>
                            <p className="text-4xl font-bold text-gray-800 mb-1">{stat.value}</p>
                            <span className="text-xs font-medium text-green-700 bg-green-200/50 px-2 py-1 rounded">{stat.sub}</span>
                        </div>
                        <div className="bg-black text-white p-3 rounded-xl z-10">
                            {stat.icon}
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-green-200/30 rounded-full blur-2xl"></div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {actions.map((action, index) => (
                        <div key={index} className="bg-[#5da8d6] hover:bg-[#4c96c2] transition-colors rounded-2xl p-6 text-white flex flex-col items-center text-center shadow-md border-b-4 border-[#3a7ca3]">
                            <div className="bg-white/20 p-4 rounded-full mb-4">
                                {action.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                            <p className="text-white/80 text-xs mb-6 flex-grow">{action.desc}</p>
                            <button
                                onClick={() => handleActionClick(action.path)}
                                className="bg-gray-200 text-gray-800 px-6 py-1.5 rounded-full font-bold text-sm hover:bg-white transition-colors w-full uppercase tracking-wide"
                            >
                                {action.label}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
