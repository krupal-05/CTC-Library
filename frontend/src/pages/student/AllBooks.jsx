import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Calendar, List } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';
import UDCGrid from '../../components/UDCGrid';

const AllBooks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [borrowing, setBorrowing] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');

    // Pagination & Sort State
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState('newest');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [showPageMenu, setShowPageMenu] = useState(false);

    const [myBooks, setMyBooks] = useState([]);

    // Modal & Toast
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [borrowDays, setBorrowDays] = useState(15);
    const [userRole, setUserRole] = useState('student');
    const { success, error: toastError } = useToast();

    // Check if we are in "Search/Filter Mode" or "UDC Browsing Mode"
    // "Browse Mode" is default when NO search term and NO udc param
    const query = new URLSearchParams(location.search);
    const udcParam = query.get('udc');
    const isBrowsingAll = !searchTerm && !udcParam;

    // Debounce Search Term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); // Reset to page 1 on new search
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:5000/api/books?page=${page}&limit=15&sort=${sortOption}`;

                if (udcParam) url += `&udc=${udcParam}`;
                if (debouncedSearch) url += `&keyword=${debouncedSearch}`;

                if (filterStatus === 'Available') url += `&available=true`;
                else if (filterStatus === 'Borrowed') url += `&available=borrowed`;

                const booksRes = await axios.get(url);

                setBooks(booksRes.data.books);
                setTotalPages(booksRes.data.pages);

                // Fetch User Info & MyBooks (only once or if needed)
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (userInfo) {
                    setUserRole(userInfo.role);
                    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                    const myBooksRes = await axios.get('http://localhost:5000/api/users/mybooks', config);
                    setMyBooks(myBooksRes.data);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, [udcParam, page, debouncedSearch, filterStatus, sortOption]);

    // ... (rest of the component)

    // Helper functions
    const getBookStatus = (bookId) => {
        const found = myBooks.find(item => item.book && item.book._id === bookId && (item.status === 'Active' || item.status === 'Pending'));
        return found ? found.status : null;
    };

    const handleBorrowClick = (bookId) => {
        setSelectedBookId(bookId);
        setIsModalOpen(true);
    };

    const confirmBorrow = async () => {
        if (!selectedBookId) return;
        setBorrowing(selectedBookId);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.post('http://localhost:5000/api/books/borrow', { bookId: selectedBookId, days: borrowDays }, config);
            success('Book requested successfully!');
            setIsModalOpen(false);
            // Refetch myBooks to update status
            const myBooksRes = await axios.get('http://localhost:5000/api/users/mybooks', config);
            setMyBooks(myBooksRes.data);
            // Update books availability locally
            setBooks(prev => prev.map(b => b._id === selectedBookId ? { ...b, availableQuantity: b.availableQuantity - 1 } : b));
        } catch (err) {
            console.error(err);
            toastError(err.response?.data?.message || 'Failed to borrow book');
        } finally {
            setBorrowing(null);
        }
    };

    // Simplified Filter (Client-side logic removed as we filter on backend now)
    const filteredBooks = books; // Direct assignment as backend handles filtering

    if (loading) return <div className="text-center py-10">Loading books...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{udcParam ? 'Books in Category' : 'All Book'}</h2>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between border border-gray-100">
                {/* Search Input */}
                <div className="relative flex-grow w-full lg:w-auto lg:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4c7c9b]/20 focus:border-[#4c7c9b] transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm font-medium">Sort:</span>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#4c7c9b] focus:border-[#4c7c9b] p-2"
                        >
                            <option value="newest">Newest Arrivals</option>
                            <option value="oldest">Oldest First</option>
                            <option value="alpha_asc">Title (A-Z)</option>
                            <option value="alpha_desc">Title (Z-A)</option>
                        </select>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-400 shrink-0" />
                        <div className="flex gap-2">
                            {['All', 'Available', 'Borrowed'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => { setFilterStatus(status); setPage(1); }}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${filterStatus === status
                                        ? 'bg-[#4c7c9b] text-white border-[#4c7c9b]'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {status === 'Borrowed' ? 'Out of Stock' : status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditionally Render UDC Grid or Book Grid */}
            {isBrowsingAll ? (
                <UDCGrid />
            ) : (
                <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => {
                            const status = getBookStatus(book._id);
                            const isBorrowedOrPending = status === 'Active' || status === 'Pending';

                            return (
                                <div key={book._id} className="relative group">
                                    {/* Clickable Card Container */}
                                    <div
                                        className={`cursor-pointer rounded-2xl p-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-200 gap-4
                                            ${[
                                                'bg-blue-50 text-blue-900',
                                                'bg-green-50 text-green-900',
                                                'bg-purple-50 text-purple-900',
                                                'bg-orange-50 text-orange-900',
                                                'bg-pink-50 text-pink-900',
                                                'bg-teal-50 text-teal-900',
                                                'bg-indigo-50 text-indigo-900',
                                                'bg-cyan-50 text-cyan-900'
                                            ][index % 8]}`}
                                    >
                                        {/* Left Side: Info & Badge */}
                                        <div
                                            className="flex-grow flex flex-col md:flex-row md:items-center gap-4"
                                            onClick={() => navigate(userRole === 'admin' ? `/admin/books/${book._id}` : `/student/books/${book._id}`)}
                                        >
                                            {/* Badge - Now inline or next to title? Let's keep it clean on top or left. 
                                                For a list, maybe left side dot or small badge. 
                                            */}
                                            <div className="shrink-0">
                                                <div className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${book.availableQuantity > 0
                                                    ? 'bg-white/60 text-emerald-700'
                                                    : 'bg-white/60 text-red-600'
                                                    }`}>
                                                    {book.availableQuantity > 0 ? 'Available' : 'Out'}
                                                </div>
                                            </div>

                                            {/* Title & Author */}
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-bold leading-tight mb-1">
                                                    {book.title}
                                                </h3>
                                                <p className="text-sm opacity-80 font-medium">
                                                    {book.author}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Side: Request Button */}
                                        {userRole !== 'admin' && (
                                            <div className="shrink-0 ml-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click
                                                        handleBorrowClick(book._id);
                                                    }}
                                                    disabled={borrowing === book._id || book.availableQuantity <= 0 || isBorrowedOrPending}
                                                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm whitespace-nowrap
                                                        ${isBorrowedOrPending
                                                            ? 'bg-gray-100/50 text-gray-500 cursor-default'
                                                            : book.availableQuantity <= 0
                                                                ? 'bg-gray-100/50 text-gray-400 cursor-not-allowed'
                                                                : 'bg-white text-gray-800 hover:bg-black hover:text-white shadow-sm'
                                                        }`}
                                                >
                                                    {borrowing === book._id ? '...' :
                                                        status === 'Pending' ? 'Pending' :
                                                            status === 'Active' ? 'Issued' :
                                                                book.availableQuantity <= 0 ? 'Notify' : 'Request'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            )
                        })
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-400">
                            No books found matching your criteria.
                        </div>
                    )}
                </div>
            )}
            {/* Pagination Controls */}
            {
                !isBrowsingAll && !loading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8 pb-4">
                        <button
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
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
                                <List size={16} className="text-gray-500" />
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
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => {
                                                        setPage(p);
                                                        setShowPageMenu(false);
                                                    }}
                                                    className={`py-2 rounded-lg text-xs font-bold transition-colors ${page === p
                                                        ? 'bg-[#4c7c9b] text-white'
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
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )
            }

            {/* Borrow Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Request Book"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        How many days would you like to borrow this book for?
                    </p>

                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={borrowDays}
                            onChange={(e) => setBorrowDays(parseInt(e.target.value) || '')}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4c7c9b] focus:border-[#4c7c9b] outline-none transition-all font-medium"
                            placeholder="Days e.g., 15"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmBorrow}
                            className="flex-1 py-3 bg-[#4c7c9b] text-white font-bold rounded-xl hover:bg-[#3b6683] shadow-md hover:shadow-lg transition-all"
                        >
                            Confirm Request
                        </button>
                    </div>
                </div>
            </Modal>
        </div >
    );
};

export default AllBooks;
