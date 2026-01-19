import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../context/ToastContext';

const MyBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [returning, setReturning] = useState(null);
    const { success, error: toastError } = useToast();

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

    if (loading) return <div>Loading...</div>;
    // if (error) return <div className="text-red-500">{error}</div>; // Optional: show error

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">My Borrowed Books</h2>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#4c7c9b] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Book Title</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Author</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Borrow Date</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Return Date</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {borrowedBooks.length > 0 ? (
                            borrowedBooks.map((entry) => (
                                <tr key={entry._id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{entry.book?.title || 'Unknown Title'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{entry.book?.author || 'Unknown'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(entry.borrowDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(entry.returnDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {entry.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {entry.status === 'Active' && (
                                            <button
                                                onClick={() => handleReturn(entry.book?._id)}
                                                disabled={returning === entry.book?._id}
                                                className="text-red-600 hover:text-red-900 font-medium text-sm hover:underline"
                                            >
                                                {returning === entry.book?._id ? 'Returning...' : 'Return'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No books borrowed yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyBooks;
