import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

const AllBooks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [borrowing, setBorrowing] = useState(null); // Track which book is being borrowed to show loading state on specific button

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/books');
                setBooks(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch books');
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleBorrow = async (bookId) => {
        setBorrowing(bookId);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                alert('Please login to borrow books');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/users/borrow', { bookId }, config);

            // Refresh books to update quantity
            const { data } = await axios.get('http://localhost:5000/api/books');
            setBooks(data);

            alert('Book Borrowed Successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to borrow book');
        } finally {
            setBorrowing(null);
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            {/* Search Bar */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                    type="text"
                    placeholder="Search Book......."
                    className="w-full bg-gray-200 rounded-full py-4 pl-14 pr-6 text-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredBooks.map(book => (
                    <div key={book._id} className="bg-gray-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
                        <div className="w-full aspect-[3/4] bg-white rounded-lg mb-4 overflow-hidden shadow-inner relative">
                            {/* Badge for Availability */}
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white ${book.availableQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                                {book.availableQuantity > 0 ? `${book.availableQuantity} left` : 'Out of Stock'}
                            </div>
                            <img src={book.imageUrl || 'https://via.placeholder.com/150'} alt={book.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="w-full text-left mb-4">
                            <h3 className="font-bold text-gray-900 truncate" title={book.title}>{book.title}</h3>
                            <p className="text-xs font-bold text-gray-600">By {book.author}</p>
                        </div>

                        <button
                            onClick={() => handleBorrow(book._id)}
                            disabled={borrowing === book._id || book.availableQuantity <= 0}
                            className={`w-full py-2 rounded-md transition-colors text-sm font-medium shadow-md ${book.availableQuantity <= 0
                                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                                    : 'bg-[#4c7c9b] text-white hover:bg-opacity-90'
                                }`}
                        >
                            {borrowing === book._id ? 'Borrowing...' : (book.availableQuantity <= 0 ? 'Unavailable' : 'Borrow')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;
