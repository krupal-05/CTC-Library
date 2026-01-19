import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useToast } from '../../context/ToastContext';

const AllBooks = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [borrowing, setBorrowing] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');

    const [myBooks, setMyBooks] = useState([]);

    // Modal & Toast
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [borrowDays, setBorrowDays] = useState(15);
    const [userRole, setUserRole] = useState('student');
    const { success, error: toastError } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksRes = await axios.get('http://localhost:5000/api/books');
                setBooks(booksRes.data);

                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (userInfo) {
                    setUserRole(userInfo.role);
                    const config = {
                        headers: { Authorization: `Bearer ${userInfo.token}` }
                    };
                    const myBooksRes = await axios.get('http://localhost:5000/api/users/mybooks', config);
                    setMyBooks(myBooksRes.data);
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleBorrowClick = (bookId) => {
        setSelectedBookId(bookId);
        setBorrowDays(15); // Reset to default
        setIsModalOpen(true);
    };

    const confirmBorrow = async () => {
        if (!borrowDays || borrowDays <= 0) {
            toastError("Please enter a valid number of days");
            return;
        }

        const bookId = selectedBookId;
        setBorrowing(bookId);
        setIsModalOpen(false); // Close immediately or wait, let's close to show progress on button if needed, but here we show toast.

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                toastError('Please login to borrow books');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/users/borrow', { bookId, days: borrowDays }, config);

            // Refresh data
            const booksRes = await axios.get('http://localhost:5000/api/books');
            setBooks(booksRes.data);

            const myBooksRes = await axios.get('http://localhost:5000/api/users/mybooks', config);
            setMyBooks(myBooksRes.data);

            success('Book Requested Successfully! Waiting for Admin Approval.');
        } catch (err) {
            toastError(err.response?.data?.message || 'Failed to borrow book');
        } finally {
            setBorrowing(null);
            setSelectedBookId(null);
        }
    };

    const getBookStatus = (bookId) => {
        const entry = myBooks.find(b => b.book && b.book._id === bookId && (b.status === 'Active' || b.status === 'Pending'));
        if (entry) return entry.status;
        return null;
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;
        if (filterStatus === 'Available') {
            matchesFilter = book.availableQuantity > 0;
        } else if (filterStatus === 'Borrowed') { // "Borrowed" here implies Out of Stock / All copies borrowed
            matchesFilter = book.availableQuantity <= 0;
        }

        return matchesSearch && matchesFilter;
    });

    if (loading) return <div className="text-center py-10">Loading books...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div>
            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100">
                <div className="relative flex-grow w-full md:w-auto md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4c7c9b]/20 focus:border-[#4c7c9b] transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Filter size={16} className="text-gray-400 shrink-0" />
                    <div className="flex gap-2">
                        {['All', 'Available', 'Borrowed'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
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

            {/* Compact Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => {
                        const status = getBookStatus(book._id);
                        const isBorrowedOrPending = status === 'Active' || status === 'Pending';

                        return (
                            <div key={book._id} className="bg-white rounded-lg border border-gray-100 p-3 flex flex-col hover:shadow-md transition-all group">
                                {/* Clickable Content Container */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() => navigate(userRole === 'admin' ? `/admin/books/${book._id}` : `/student/books/${book._id}`)}
                                >
                                    <div className="w-full aspect-[2/3] bg-gray-100 rounded-md mb-3 overflow-hidden relative">
                                        {/* Badge */}
                                        <div className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-white shadow-sm z-10 ${book.availableQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {book.availableQuantity > 0 ? `${book.availableQuantity}` : '0'}
                                        </div>

                                        {book.imageUrl ? (
                                            <img
                                                src={book.imageUrl}
                                                alt={book.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <div className="text-center">No Cover</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow min-h-0 mb-2">
                                        <h3 className="font-bold text-gray-800 text-sm truncate leading-tight mb-0.5 group-hover:text-[#4c7c9b] transition-colors" title={book.title}>
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 truncate">{book.author}</p>
                                    </div>
                                </div>

                                {userRole !== 'admin' && (
                                    <button
                                        onClick={() => handleBorrowClick(book._id)}
                                        disabled={borrowing === book._id || book.availableQuantity <= 0 || isBorrowedOrPending}
                                        className={`w-full py-1.5 rounded text-xs font-bold transition-all ${isBorrowedOrPending
                                            ? 'bg-amber-100 text-amber-600 cursor-default'
                                            : book.availableQuantity <= 0
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-[#4c7c9b] text-white hover:bg-[#3b6683] shadow-sm hover:shadow'
                                            }`}
                                    >
                                        {borrowing === book._id ? '...' :
                                            status === 'Pending' ? 'Requested' :
                                                status === 'Active' ? 'Issued' :
                                                    book.availableQuantity <= 0 ? 'Out' : 'Request'}
                                    </button>
                                )}
                            </div>

                        )
                    })
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-400">
                        No books found matching your criteria.
                    </div>
                )}
            </div>


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
