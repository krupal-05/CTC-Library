import React, { useState, useEffect } from 'react';
import { Search, Book, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`/api/books?keyword=${query}&limit=5`);
                const data = await response.json();
                setResults(data.books || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchBooks();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleResultClick = (bookId) => {
        // Redirecting to login if they want to view details, 
        // as book details are protected routes. 
        // Alternatively we can navigate to /student/books/${bookId} which will redirect to login if unauth.
        navigate(`/student/books/${bookId}`);
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white overflow-hidden shadow-md">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <Search size={22} className="text-gray-400" />
                </div>

                <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-transparent"
                    type="text"
                    id="search"
                    placeholder="Search books by title or author..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    autoComplete="off"
                /> 
            </div>

            {/* Results Dropdown */}
            {showResults && (query.trim() !== '') && (
                <div className="absolute top-16 left-0 right-0 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden z-50">
                    {loading && (
                        <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                    )}
                    
                    {!loading && results.length === 0 && (
                        <div className="p-4 text-center text-gray-500 text-sm">No books found.</div>
                    )}

                    {!loading && results.length > 0 && (
                        <ul>
                            {results.map((book) => (
                                <li 
                                    key={book._id} 
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                                    onClick={() => handleResultClick(book._id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1">{book.title}</h4>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                <User size={12} />
                                                <span className="line-clamp-1">{book.author}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${book.availableQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {book.availableQuantity > 0 ? 'Available' : 'Issued Out'}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {!loading && results.length > 0 && (
                        <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-100">
                            <span className="text-xs text-gray-500">Type more for specific results</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookSearch;
