import React, { useState, useEffect } from 'react';
import { BookOpen, Book, AlertCircle, Plus, Upload, UserPlus, FileText, RotateCcw, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ManageBooks = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const navigate = useNavigate();
    const [statsData, setStatsData] = useState({
        totalBooks: 0,
        totalBorrowed: 0,
        overdueBooks: 0,
        totalIssued: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(error.response?.data?.message || 'Failed to fetch statistics. Are you logged in as Admin?');
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats = [
        { title: 'Total Books', value: statsData.totalBooks, sub: 'In Library Catalog', icon: <BookOpen size={32} /> },
        { title: 'Books Borrowed', value: statsData.totalBorrowed, sub: 'Currently issued', icon: <Book size={32} /> },
        { title: 'Overdue Books', value: statsData.overdueBooks, sub: 'Needs attention', icon: <AlertCircle size={32} /> },
        { title: 'Total Issued', value: statsData.totalIssued, sub: 'All time history', icon: <RotateCcw size={32} /> },
    ];

    const actions = [
        { title: 'Add New Book', desc: 'Add a New Book to the Library catalog', label: 'Add books', icon: <Plus size={32} />, path: '/admin/add-book' },
        { title: 'Issue Book', desc: 'Issue a book to a member', label: 'Issue', icon: <Book size={32} />, path: '/admin/issue-book' },
        { title: 'Remove Book', desc: 'Remove a book from the catalog', label: 'Remove', icon: <Trash2 size={32} />, path: '/admin/remove-book' },
        { title: 'Register Admin', desc: 'Register a new library member', label: 'Register', icon: <UserPlus size={32} />, path: '/register' },
        { title: 'Manage Students', desc: 'View and manage registered students', label: 'Students', icon: <UserPlus size={32} />, path: '/admin/students' },
    ];

    const handleActionClick = (path) => {
        if (path === '/register') {
            navigate(path);
            return;
        }
        navigate(path);
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Library Manager</h1>
                <p className="text-gray-500">Overview of library status and quick actions</p>
                {error && (
                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

export default ManageBooks;
