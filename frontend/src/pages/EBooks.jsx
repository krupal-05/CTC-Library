import React, { useState, useEffect } from 'react';
import { Search, BookOpen, ExternalLink, Loader } from 'lucide-react';
import axios from 'axios';

const EBooks = () => {
    const [searchTerm, setSearchTerm] = useState('javascript'); // Default search
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalFound, setTotalFound] = useState(0);

    const searchBooks = async (query, pageNum = 1) => {
        if (!query) return;
        setLoading(true);
        try {
            // Using Open Library Search API
            // limit to 20 results per page for performance
            const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${pageNum}&limit=20`);

            if (pageNum === 1) {
                setBooks(response.data.docs);
            } else {
                setBooks(prev => [...prev, ...response.data.docs]);
            }
            setTotalFound(response.data.numFound);
        } catch (error) {
            console.error("Error fetching data from Open Library:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchBooks(searchTerm);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        searchBooks(searchTerm, 1);
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        searchBooks(searchTerm, nextPage);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Open Library E-Books</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore millions of books from the Open Library catalog. Read, borrow, and discover new titles globally.
                </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title, author, or ISBN..."
                    className="w-full bg-white border border-gray-300 rounded-full py-4 pl-14 pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-[#4c7c9b] shadow-sm"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4c7c9b] text-white px-8 py-2.5 rounded-full hover:bg-[#3a6580] transition-colors font-medium"
                >
                    Search
                </button>
            </form>

            {/* Results Info */}
            <div className="mb-6 text-gray-500 font-medium">
                {totalFound > 0 && <span>Found {totalFound.toLocaleString()} results for "{searchTerm}"</span>}
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {books.map((book, index) => {
                    // Robust unique key: key prop from API or index fallback
                    const uniqueKey = book.key ? `${book.key}-${index}` : index;
                    const hasCover = book.cover_i;
                    const coverUrl = hasCover
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                        : 'https://via.placeholder.com/300x450?text=No+Cover';

                    return (
                        <div key={uniqueKey} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100">
                            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                                <img
                                    src={coverUrl}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <a
                                        href={`https://openlibrary.org${book.key}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                                    >
                                        View Book <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-5 flex-grow flex flex-col">
                                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2" title={book.title}>
                                    {book.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-3">
                                    {book.author_name?.slice(0, 2).join(', ') || 'Unknown Author'}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                                    <span>{book.first_publish_year || 'N/A'}</span>
                                    {book.ebook_count_i > 0 ? (
                                        <span className="text-green-600 font-medium flex items-center gap-1">
                                            <BookOpen size={12} /> {book.ebook_count_i} E-books
                                        </span>
                                    ) : (
                                        <span>Print only</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center my-12">
                    <Loader className="animate-spin text-[#4c7c9b]" size={40} />
                </div>
            )}

            {/* Load More */}
            {!loading && books.length < totalFound && books.length > 0 && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={loadMore}
                        className="border-2 border-[#4c7c9b] text-[#4c7c9b] font-bold py-3 px-8 rounded-full hover:bg-[#4c7c9b] hover:text-white transition-colors"
                    >
                        Load More Results
                    </button>
                </div>
            )}

            {!loading && books.length === 0 && totalFound === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl mt-8">
                    <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-xl text-gray-500">No books found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default EBooks;
