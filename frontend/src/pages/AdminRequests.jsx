import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get('http://localhost:5000/api/admin/requests', config);
            setRequests(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const handleApprove = async (userId, requestId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put('http://localhost:5000/api/admin/approve', { userId, requestId }, config);
            // Refresh requests
            fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const handleReject = async (userId, requestId) => {
        if (!window.confirm('Are you sure you want to reject this request?')) return;

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put('http://localhost:5000/api/admin/reject', { userId, requestId }, config);
            // Refresh requests
            fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Borrow Requests</h1>

                {loading ? (
                    <p>Loading requests...</p>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                ) : requests.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                        No pending borrow requests found.
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
                        <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Student
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Book
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Requested Date
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-indigo-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request._id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div>
                                                        <p className="text-gray-900 whitespace-no-wrap font-semibold">
                                                            {request.user.name}
                                                        </p>
                                                        <p className="text-gray-600 whitespace-no-wrap text-xs">
                                                            {request.user.enrollmentNo}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{request.book?.title || 'Unknown Book'}</p>
                                                <p className="text-gray-600 whitespace-no-wrap text-xs">{request.book?.isbn}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {new Date(request.borrowDate).toLocaleDateString()}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleApprove(request.user._id, request._id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-300"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(request.user._id, request._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-300"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminRequests;
