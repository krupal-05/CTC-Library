import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Trash2, Book, AlertCircle } from 'lucide-react';

const RemoveBook = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            // Assuming localhost:5000
            const url = searchTerm
                ? `http://localhost:5000/api/books?keyword=${searchTerm}`
                : 'http://localhost:5000/api/books';

            const { data } = await axios.get(url);
            setBooks(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch books');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
        // eslint-disable-next-line
    }, [searchTerm]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book? This cannot be undone.')) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/books/${id}`, config);
                fetchBooks(); // Refresh list
            } catch (err) {
                alert('Failed to delete book');
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading books...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Book className="text-red-600" /> Remove Book
            </h1>

            {/* Search Bar */}
            <div className="mb-6 relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> {error}
                </div>
            )}

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books.length > 0 ? (
                                books.map((book) => (
                                    <tr key={book._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-12 w-10 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                                                    {book.imageUrl && <img src={book.imageUrl} alt="" className="h-full w-full object-cover" />}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                    <div className="text-sm text-gray-500">{book.author}</div>
                                                    <div className="text-xs text-gray-400">ISBN: {book.isbn || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Total: {book.totalQuantity}</div>
                                            <div className={`text-xs ${book.availableQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                Available: {book.availableQuantity}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="text-red-600 hover:text-red-900 flex items-center gap-1 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" /> Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-gray-400">
                                        No books found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RemoveBook;
