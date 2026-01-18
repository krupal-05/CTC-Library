import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Loader, AlertCircle } from 'lucide-react';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                // Assuming localhost:5000 based on server.js
                const { data } = await axios.get('http://localhost:5000/api/feedback', config);
                setFeedbacks(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
    );

    if (error) return (
        <div className="p-4 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">User Feedback</h1>

            {feedbacks.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                    No feedback received yet.
                </div>
            ) : (
                <div className="grid gap-6">
                    {feedbacks.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-100 p-2 rounded-full">
                                        <Mail className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.email}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                "{item.message}"
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminFeedback;
