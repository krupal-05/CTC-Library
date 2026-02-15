import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../context/ToastContext';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';

const MyBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [returning, setReturning] = useState(null);
    const { success, error: toastError } = useToast();

    const [activeTab, setActiveTab] = useState('Requested'); // Requested, Issued, Read

    const fetchMyBooks = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) return;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get('http://localhost:5000/api/users/mybooks', config);
            setBorrowedBooks(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch my books');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBooks();
    }, []);

    const handleReturn = async (bookId) => {
        if (!window.confirm('Are you sure you want to return this book?')) return;

        setReturning(bookId);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/users/return', { bookId }, config);

            // Refresh list
            fetchMyBooks();
            success('Book Returned Successfully!');
        } catch (err) {
            toastError(err.response?.data?.message || 'Failed to return book');
        } finally {
            setReturning(null);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading your library...</div>;

    // Filter Logic
    const getFilteredBooks = () => {
        switch (activeTab) {
            case 'Requested':
                return borrowedBooks.filter(b => b.status === 'Pending');
            case 'Issued':
                return borrowedBooks.filter(b => b.status === 'Active');
            case 'Read':
                return borrowedBooks.filter(b => b.status === 'Returned');
            default:
                return [];
        }
    };

    const filteredBooks = getFilteredBooks();

    return (
        <div className="max-w-5xl mx-auto min-h-[80vh]">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">My Library</h2>

            {/* Tabs */}
            <div className="flex space-x-2 mb-6 border-b border-gray-200">
                {[
                    { id: 'Requested', icon: Clock, label: 'Requested' },
                    { id: 'Issued', icon: BookOpen, label: 'Issued' },
                    { id: 'Read', icon: CheckCircle, label: 'Read History' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-4 flex items-center gap-2 font-bold text-sm transition-all border-b-2 
                            ${activeTab === tab.id
                                ? 'border-[#4c7c9b] text-[#4c7c9b]'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Book Details</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            {activeTab === 'Issued' && (
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((entry) => (
                                <tr key={entry._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 text-base">{entry.book?.title || 'Unknown Title'}</span>
                                            <span className="text-sm text-gray-500">{entry.book?.author || 'Unknown Author'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col text-sm">
                                            {activeTab === 'Requested' ? (
                                                <span className="text-gray-600">Requested: {new Date(entry.borrowDate).toLocaleDateString()}</span>
                                            ) : activeTab === 'Issued' ? (
                                                <>
                                                    <span className="text-gray-600">From: {new Date(entry.borrowDate).toLocaleDateString()}</span>
                                                    <span className="text-red-500 font-medium">Due: {new Date(entry.returnDate).toLocaleDateString()}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-gray-600">Borrowed: {new Date(entry.borrowDate).toLocaleDateString()}</span>
                                                    <span className="text-green-600">Returned: {new Date(entry.returnDate).toLocaleDateString()}</span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                                            ${entry.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                entry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {entry.status === 'Active' ? 'Issued' : entry.status}
                                        </span>
                                    </td>
                                    {activeTab === 'Issued' && (
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            {/* Assuming students shouldn't return books themselves usually, but leaving it based on old code */}
                                            {/* Actually, user plan didn't say remove it, but let's keep it if it was there functionality wise, 
                                                though typically admins return books. The prompt implies just 'list', but old code had 'return'. 
                                                I'll remove the return button from student view if it seems weird, but the old code had it.
                                                Wait, this project typically has Admin return books. The student button might have been for dev or specific requests.
                                                I'll keep it for now but style it minimally or maybe it's 'Request Return'?
                                                The function calls /api/users/return.
                                             */}
                                            {/* Actually... usually students don't return via button. But I won't break existing features. */}
                                            {/* <button
                                                onClick={() => handleReturn(entry.book?._id)}
                                                disabled={returning === entry.book?._id}
                                                className="text-red-600 hover:text-red-900 font-bold text-sm bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 transition-colors"
                                            >
                                                {returning === entry.book?._id ? '...' : 'Return'}
                                            </button> */}
                                            {/* Hiding Return button for Student in this unified view unless explicitly asked, as it's usually an admin task in managed libraries. 
                                              Reviewing old code: it HAD a return button. I will keep it but maybe it request return?
                                              Actually, let's include it to be safe.
                                            */}
                                            <button
                                                onClick={() => handleReturn(entry.book?._id)}
                                                disabled={returning === entry.book?._id}
                                                className="text-gray-400 hover:text-red-600 font-medium text-xs transition-colors"
                                                title="Return Book"
                                            >
                                                {returning === entry.book?._id ? 'Processing...' : 'Return'}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-400 flex flex-col items-center justify-center">
                                    <BookOpen size={48} className="mb-4 text-gray-200" />
                                    <p>No books found in {activeTab}.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyBooks;
