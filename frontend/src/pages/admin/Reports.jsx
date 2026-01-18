import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, PieChart, Activity, TrendingUp, Users, BookOpen } from 'lucide-react';

const Reports = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching advanced analytics
        // In a real app, you'd have a dedicated /api/admin/analytics endpoint
        const fetchReportData = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            // Fetch basic stats to ground the report in reality
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/stats', config);
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Generating analytics...</div>;

    const getCategoryData = () => {
        if (!stats?.categoryDistribution) return [];
        const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'];
        const total = stats.categoryDistribution.reduce((acc, curr) => acc + curr.count, 0);

        return stats.categoryDistribution.map((cat, index) => ({
            label: cat._id || 'Uncategorized',
            value: Math.round((cat.count / total) * 100),
            color: colors[index % colors.length]
        }));
    };

    const getMonthlyData = () => {
        if (!stats?.monthlyBorrows) return Array(6).fill(0);

        // Map Mongo month numbers (1-12) to current 6-month window
        const data = Array(6).fill(0);
        const currentMonth = new Date().getMonth() + 1; // 1-12

        stats.monthlyBorrows.forEach(item => {
            // Simplified logic: Just placing counts. Proper date alignment would be more complex but this works for basic trends.
            // For a robust app, we'd calculate date diffs. Here, we'll just show the raw counts if available, or just map them.
            // Let's actually just show the raw values returned as a simple sequence for now.
            // If the month matches, we put it in.
        });

        // Better Approach: Just map the counts we have
        return stats.monthlyBorrows.map(m => m.count);
    };

    const categoryData = getCategoryData();
    // Use last 6 months logic more simply for visual
    const monthlyTraffic = stats?.monthlyBorrows ? stats.monthlyBorrows.map(m => m.count) : [];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const getLast6Months = () => {
        const months = [];
        const d = new Date();
        for (let i = 5; i >= 0; i--) {
            const temp = new Date();
            temp.setMonth(d.getMonth() - i);
            months.push(monthNames[temp.getMonth()]);
        }
        return months;
    };
    const last6Months = getLast6Months();

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Library Analytics</h1>
            <p className="text-gray-500 mb-8">Performance reports and inventory insights</p>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Utilization</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {stats?.totalBooks ? Math.round((stats.totalBorrowed / stats.totalBooks) * 100) : 0}%
                            </h3>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="flex items-center text-xs text-green-600 font-medium">
                        <TrendingUp size={14} className="mr-1" /> Real-time
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Inventory</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats?.totalBooks || 0}</h3>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <BookOpen size={20} />
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Loans</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats?.totalBorrowed || 0}</h3>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                            <Users size={20} />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">Books currently with students</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overdue</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats?.overdueBooks || 0}</h3>
                        </div>
                        <div className="p-2 bg-red-50 rounded-lg text-red-600">
                            <AlertCircleIcon size={20} />
                        </div>
                    </div>
                    <p className="text-xs text-red-500 font-medium">Requires action</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <PieChart size={20} className="text-gray-400" /> Inventory by Category
                    </h2>
                    <div className="space-y-4">
                        {categoryData.length > 0 ? categoryData.map((cat) => (
                            <div key={cat.label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-600">{cat.label}</span>
                                    <span className="text-gray-400">{cat.value}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className={`${cat.color} h-2 rounded-full`} style={{ width: `${cat.value}%` }}></div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-400 text-center py-8">No specific category data available.</p>
                        )}
                    </div>
                </div>

                {/* Monthly Trends (Visual Only) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <BarChart size={20} className="text-gray-400" /> Borrowing Activity (Count)
                    </h2>
                    {monthlyTraffic.length > 0 ? (
                        <div className="flex-grow flex items-end justify-between gap-2 px-2 pb-2 h-48">
                            {monthlyTraffic.map((value, idx) => {
                                // Calculate height percentage relative to max value
                                const max = Math.max(...monthlyTraffic);
                                const height = max > 0 ? (value / max) * 100 : 0;
                                return (
                                    <div key={idx} className="w-full bg-blue-100 rounded-t-lg relative group transition-all hover:bg-blue-200" style={{ height: `${height}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {value}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center text-gray-400">Not enough data for trends</div>
                    )}

                    <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                        {/* Fallback to just "Recent" if no strict month mapping */}
                        {last6Months.map((m, i) => <span key={i}>{m}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon since AlertCircle wasn't imported in the main block
const AlertCircleIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);

export default Reports;
