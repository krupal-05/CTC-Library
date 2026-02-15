import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, BookOpen, User, Tag, Hash, Clock } from 'lucide-react';
import Modal from '../../components/Modal';
import { useToast } from '../../context/ToastContext';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Borrow Logic
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [borrowDays, setBorrowDays] = useState(15);
    const [borrowing, setBorrowing] = useState(false);
    const [joiningWaitlist, setJoiningWaitlist] = useState(false); // Add state
    const [userRole, setUserRole] = useState('student');
    const [waitlistPosition, setWaitlistPosition] = useState(null); // Add state
    const { success, error: toastError } = useToast();

    // Check User Role & Fetch Book
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUserRole(userInfo.role);
        }

        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
                setBook(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load book details');
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleBorrowClick = () => {
        setBorrowDays(15);
        setIsModalOpen(true);
    };

    const handleJoinWaitlist = async () => {
        setJoiningWaitlist(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                toastError('Please login to join waitlist');
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };

            const { data } = await axios.post(`http://localhost:5000/api/books/${id}/reserve`, {}, config);

            success(data.message);
            if (data.position) setWaitlistPosition(data.position);

            // Refresh book to update local state if needed (though queue is backend)
        } catch (err) {
            toastError(err.response?.data?.message || 'Failed to join waitlist');
        } finally {
            setJoiningWaitlist(false);
        }
    };

    const confirmBorrow = async () => {
        if (!borrowDays || borrowDays <= 0) {
            toastError("Please enter a valid number of days");
            return;
        }

        setBorrowing(true);
        setIsModalOpen(false);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                toastError('Please login to borrow books');
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };

            await axios.post('http://localhost:5000/api/users/borrow', { bookId: id, days: borrowDays }, config);

            success('Book Requested Successfully! Waiting for Admin Approval.');
            // Refresh book data to update quantity
            const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
            setBook(data);
        } catch (err) {
            toastError(err.response?.data?.message || 'Failed to borrow book');
        } finally {
            setBorrowing(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;
    if (error || !book) return <div className="p-8 text-center text-red-500">{error || 'Book not found'}</div>;

    const isAvailable = book.availableQuantity > 0;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft size={20} className="mr-2" /> Back to Books
            </button>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                {/* Details Section */}
                <div className="w-full p-8 flex flex-col">
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{book.title}</h1>
                        <div className="flex items-center text-gray-600 font-medium text-lg mb-6">
                            <User size={20} className="mr-2 text-[#4c7c9b]" />
                            {book.author}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <span className="flex items-center text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                                    <Hash size={14} className="mr-1.5" /> ISBN
                                </span>
                                <span className="text-gray-900 font-semibold">{book.isbn || 'N/A'}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <span className="flex items-center text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                                    <Tag size={14} className="mr-1.5" /> Category
                                </span>
                                <span className="text-gray-900 font-semibold">{book.category || 'General'}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <span className="flex items-center text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                                    <BookOpen size={14} className="mr-1.5" /> Total Copies
                                </span>
                                <span className="text-gray-900 font-semibold">{book.totalQuantity}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <span className="flex items-center text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                                    <Clock size={14} className="mr-1.5" /> Added On
                                </span>
                                <span className="text-gray-900 font-semibold">{new Date(book.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {book.description || 'No description available for this book.'}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        {userRole !== 'admin' && (
                            <>
                                {isAvailable ? (
                                    <button
                                        onClick={handleBorrowClick}
                                        disabled={borrowing}
                                        className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] bg-[#4c7c9b] text-white hover:bg-[#3b6683] hover:shadow-xl"
                                    >
                                        {borrowing ? 'Processing...' : 'Request Book'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleJoinWaitlist}
                                        disabled={joiningWaitlist}
                                        className="w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] bg-orange-500 text-white hover:bg-orange-600 hover:shadow-xl"
                                    >
                                        {joiningWaitlist ? 'Joining...' : 'Join Waitlist'}
                                    </button>
                                )}
                            </>
                        )}

                    </div>
                </div>
            </div>

            {/* Borrow Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request Book">
                <div className="space-y-4">
                    <p className="text-gray-600">How many days would you like to borrow this book for?</p>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={borrowDays}
                            onChange={(e) => setBorrowDays(parseInt(e.target.value) || '')}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4c7c9b] focus:border-[#4c7c9b] outline-none"
                            placeholder="Days e.g., 15"
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                        <button onClick={confirmBorrow} className="flex-1 py-3 bg-[#4c7c9b] text-white font-bold rounded-xl hover:bg-[#3b6683]">Confirm Request</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BookDetails;
