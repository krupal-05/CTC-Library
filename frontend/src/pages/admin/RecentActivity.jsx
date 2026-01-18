import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, User, BookOpen, UserPlus, FileText } from 'lucide-react';

const RecentActivity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/admin/activities', config);
                setActivities(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch recent activities');
                setLoading(false);
            }
        };

        fetchActivities();

        // Optional: Poll every 30 seconds for live updates
        const interval = setInterval(fetchActivities, 30000);
        return () => clearInterval(interval);

    }, []);

    const getIcon = (action) => {
        switch (action) {
            case 'REGISTER': return <UserPlus className="text-green-500" />;
            case 'BORROW': return <BookOpen className="text-blue-500" />;
            case 'RETURN': return <BookOpen className="text-purple-500" />;
            case 'ADD_BOOK': return <FileText className="text-indigo-500" />;
            case 'ISSUE_BOOK': return <BookOpen className="text-orange-500" />;
            default: return <Clock className="text-gray-400" />;
        }
    };

    const formatAction = (action) => {
        return action.replace('_', ' '); // ADD_BOOK -> ADD BOOK
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading activity log...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Recent Activity</h1>
            <p className="text-gray-500 mb-8">Real-time log of library operations</p>

            {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6">{error}</div>}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {activities.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                        <Clock className="w-12 h-12 mb-4 opacity-20" />
                        <p>No recent activity recorded.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {activities.map((activity) => (
                            <div key={activity._id} className="p-5 hover:bg-gray-50 transition-colors flex items-start gap-4">
                                <div className="p-2 bg-gray-50 rounded-full shrink-0">
                                    {getIcon(activity.action)}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-700 text-sm">{formatAction(activity.action)}</h3>
                                        <span className="text-xs text-gray-400 font-medium">{formatDate(activity.timestamp)}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{activity.details}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <User size={12} className="text-gray-400" />
                                        <span className="text-xs text-gray-500">User: {activity.user}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
