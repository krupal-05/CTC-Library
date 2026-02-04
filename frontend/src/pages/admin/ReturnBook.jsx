import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCcw, Check, RefreshCw, Calendar, Book, User, ArrowLeft } from 'lucide-react';

const ReturnBook = () => {
    const navigate = useNavigate();
    // Stats for manual entry
    const [enrollmentNo, setEnrollmentNo] = useState('');
    const [isbn, setIsbn] = useState('');

    // Stats for Active Issues List
    const [activeIssues, setActiveIssues] = useState([]);
    const [loadingList, setLoadingList] = useState(true);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const fetchActiveIssues = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            // Ensure this endpoint exists in backend/routes/adminRoutes.js
            const { data } = await axios.get('http://localhost:5000/api/admin/active-issues', config);
            setActiveIssues(data);
            setLoadingList(false);
        } catch (err) {
            console.error(err);
            setLoadingList(false);
        }
    };

    useEffect(() => {
        fetchActiveIssues();
    }, []);

    const processReturn = async (studentEnrollment, bookIsbn) => {
        setMessage('');
        setError('');

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };

            const { data } = await axios.post(
                'http://localhost:5000/api/admin/return-book',
                { enrollmentNo: studentEnrollment, isbn: bookIsbn },
                config
            );

            const penaltyMsg = data.penalty > 0 ? ` Penalty Fee: Rs ${data.penalty}` : '';
            setMessage(`Success: ${data.message} (${data.book}).${penaltyMsg}`);
            // Refresh list
            fetchActiveIssues();

            // Clear manual forms if they matched
            if (enrollmentNo === studentEnrollment) setEnrollmentNo('');
            if (isbn === bookIsbn) setIsbn('');

        } catch (err) {
            setError(err.response?.data?.message || 'Return failed');
        }
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        processReturn(enrollmentNo, isbn);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/manage-books')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <RotateCcw className="text-blue-600" /> Return Book
                </h1>
            </div>

            {/* Status Messages */}
            {message && <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 mb-6 flex items-center gap-2"><Check size={20} /> {message}</div>}
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6">Error: {error}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Manual Return Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-700 mb-4">Manual Entry</h2>
                        <form onSubmit={handleManualSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Student Enrollment No</label>
                                <input
                                    type="text"
                                    value={enrollmentNo}
                                    onChange={(e) => setEnrollmentNo(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. 123456"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Book ISBN</label>
                                <input
                                    type="text"
                                    value={isbn}
                                    onChange={(e) => setIsbn(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. 978-3-16-148410-0"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={18} /> Return Book
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right: Active Issues List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-700">Active Issued Books</h2>
                            <button onClick={fetchActiveIssues} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Refresh List">
                                <RefreshCw size={18} />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Book</th>
                                        <th className="px-6 py-4">Due Date</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loadingList ? (
                                        <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Loading active loans...</td></tr>
                                    ) : activeIssues.length === 0 ? (
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-400">No books are currently issued.</td></tr>
                                    ) : (
                                        activeIssues.map((issue, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-800">{issue.studentName}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1"><User size={10} /> {issue.enrollmentNo}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-800">{issue.bookTitle}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1"><Book size={10} /> {issue.isbn}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`text-sm font-medium ${new Date(issue.dueDate) < new Date() ? 'text-red-500' : 'text-green-600'}`}>
                                                        {new Date(issue.dueDate).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        Issued: {new Date(issue.issueDate).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => processReturn(issue.enrollmentNo, issue.isbn)}
                                                        className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-bold rounded-lg hover:bg-blue-200 transition-colors shadow-sm active:scale-95"
                                                    >
                                                        Return
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnBook;
