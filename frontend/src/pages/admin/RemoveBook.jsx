import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, Book, AlertCircle, ArrowLeft, List } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const RemoveBook = () => {
    const navigate = useNavigate();
    const { error: toastError, success } = useToast();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    // Pagination State
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showPageMenu, setShowPageMenu] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            // Assuming localhost:5000
            let url = searchTerm
                ? `http://localhost:5000/api/books?keyword=${searchTerm}&page=${page}&limit=15`
                : `http://localhost:5000/api/books?page=${page}&limit=15`;

            const { data } = await axios.get(url);
            if (data.books) {
                setBooks(data.books);
                setTotalPages(data.pages);
            } else {
                setBooks(data);
                // If backend doesn't return pages in fallback format, assume 1 page
                setTotalPages(1);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch books');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search to avoid rapid API calls
        const delayDebounceFn = setTimeout(() => {
            fetchBooks();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line
    }, [searchTerm, page]);

    // Reset page to 1 when search term changes
    useEffect(() => {
        setPage(1);
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
                success('Book deleted successfully');
            } catch (err) {
                toastError('Failed to delete book');
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading books...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/manage-books')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Book className="text-red-600" /> Remove Book
                </h1>
            </div>

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

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    <div className="relative">
                        <button
                            type="button"
                            className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:bg-gray-100"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPageMenu((prev) => !prev);
                            }}
                        >
                            <span className="text-sm font-medium text-gray-600">
                                Page {page} of {totalPages}
                            </span>
                            {/* Assuming the icon is imported or available in scope. 
                                Since it was asked to act like AllBooks, we need to ensure icons are imported. 
                                Will update imports separately if needed, assuming Lucide icons are used.
                             */}
                            {/* Note: In the previous step I didn't verify List icon import. I should check imports. */}
                        </button>

                        {/* Page Jump Menu */}
                        {showPageMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowPageMenu(false)}
                                />
                                <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 max-h-60 bg-white border border-gray-200 shadow-xl rounded-xl overflow-y-auto z-50 p-1"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="grid grid-cols-4 gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => {
                                                    setPage(p);
                                                    setShowPageMenu(false);
                                                }}
                                                className={`py-2 rounded-lg text-xs font-bold transition-colors ${page === p
                                                    ? 'bg-red-600 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default RemoveBook;
