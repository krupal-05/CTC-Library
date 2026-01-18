import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, BookOpen, User, Check, ArrowRight } from 'lucide-react';

const IssueBook = () => {
    // Selection States
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);

    // Search States
    const [studentSearch, setStudentSearch] = useState('');
    const [bookSearch, setBookSearch] = useState('');

    // Data Lists
    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);

    // Status
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loadingIssue, setLoadingIssue] = useState(false);

    // Fetch Students on Search
    useEffect(() => {
        const fetchStudents = async () => {
            if (!studentSearch) { setStudents([]); return; }
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`http://localhost:5000/api/users?keyword=${studentSearch}`, config);
                setStudents(data);
            } catch (err) { console.error(err); }
        };
        const timeout = setTimeout(fetchStudents, 500); // Debounce
        return () => clearTimeout(timeout);
    }, [studentSearch]);

    // Fetch Books on Search
    useEffect(() => {
        const fetchBooks = async () => {
            if (!bookSearch) { setBooks([]); return; }
            try {
                const { data } = await axios.get(`http://localhost:5000/api/books?keyword=${bookSearch}`);
                setBooks(data);
            } catch (err) { console.error(err); }
        };
        const timeout = setTimeout(fetchBooks, 500); // Debounce
        return () => clearTimeout(timeout);
    }, [bookSearch]);

    const handleIssue = async () => {
        if (!selectedStudent || !selectedBook) return;
        setLoadingIssue(true);
        setError('');
        setMessage('');

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };

            const { data } = await axios.post(
                'http://localhost:5000/api/admin/issue-book',
                { enrollmentNo: selectedStudent.enrollmentNo, isbn: selectedBook.isbn },
                config
            );

            setMessage(`Success: Issued '${data.book}' to ${data.user}`);
            setSelectedStudent(null);
            setSelectedBook(null);
            setStudentSearch('');
            setBookSearch('');
        } catch (err) {
            setError(err.response?.data?.message || 'Issue Failed');
        } finally {
            setLoadingIssue(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 h-[calc(100vh-100px)] flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2 flex-shrink-0">
                <BookOpen className="text-blue-600" /> Issue Book
            </h1>

            {/* Notifications */}
            {message && <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 mb-4 flex-shrink-0">{message}</div>}
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-4 flex-shrink-0">{error}</div>}

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">

                {/* 1. SELECT STUDENT */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="font-bold text-gray-700 flex items-center gap-2">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                            Select Student
                        </h2>
                    </div>
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text" placeholder="Search Name or Enroll No..."
                                className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={studentSearch} onChange={e => setStudentSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {students.map(student => (
                            <div key={student._id}
                                onClick={() => setSelectedStudent(student)}
                                className={`p-3 rounded-xl cursor-pointer transition-all border ${selectedStudent?._id === student._id ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'hover:bg-gray-50 border-transparent'} text-left`}
                            >
                                <div className="font-bold text-gray-800">{student.name}</div>
                                <div className="text-xs text-gray-500 flex items-center gap-2">
                                    <span className="bg-gray-200 px-1.5 rounded text-gray-600">{student.enrollmentNo}</span>
                                    <span>{student.department}</span>
                                </div>
                            </div>
                        ))}
                        {studentSearch && students.length === 0 && <div className="text-center text-gray-400 p-4">No students found</div>}
                    </div>
                </div>

                {/* 2. SELECT BOOK */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="font-bold text-gray-700 flex items-center gap-2">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                            Select Book
                        </h2>
                    </div>
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text" placeholder="Search Title, Author, or ISBN..."
                                className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                value={bookSearch} onChange={e => setBookSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {books.map(book => (
                            <div key={book._id}
                                onClick={() => setSelectedBook(book)}
                                className={`p-3 rounded-xl cursor-pointer transition-all border ${selectedBook?._id === book._id ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'hover:bg-gray-50 border-transparent'} ${book.availableQuantity === 0 ? 'opacity-50 grayscale cursor-not-allowed pointer-events-none' : ''} text-left`}
                            >
                                <div className="font-bold text-gray-800 line-clamp-1">{book.title}</div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">{book.author}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${book.availableQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        Qty: {book.availableQuantity}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {bookSearch && books.length === 0 && <div className="text-center text-gray-400 p-4">No books found</div>}
                    </div>
                </div>

                {/* 3. CONFIRM */}
                <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 flex flex-col p-6 items-center justify-center text-center">
                    {selectedStudent && selectedBook ? (
                        <div className="w-full space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 w-full">
                                <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4">Issuing To</h3>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                                        <User size={32} />
                                    </div>
                                    <p className="font-bold text-xl text-gray-800">{selectedStudent.name}</p>
                                    <p className="text-gray-500">{selectedStudent.enrollmentNo}</p>
                                </div>
                            </div>

                            <ArrowRight className="mx-auto text-gray-300 rotate-90 lg:rotate-0" />

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 w-full">
                                <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4">Book Details</h3>
                                <div className="flex flex-col items-center">
                                    {selectedBook.imageUrl ? (
                                        <img src={selectedBook.imageUrl} className="h-24 w-auto mb-3 object-contain" alt="Book" />
                                    ) : (
                                        <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-3">
                                            <BookOpen size={32} />
                                        </div>
                                    )}
                                    <p className="font-bold text-xl text-gray-800 line-clamp-1">{selectedBook.title}</p>
                                    <p className="text-gray-500">{selectedBook.isbn}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleIssue}
                                disabled={loadingIssue}
                                className="w-full bg-[#4c7c9b] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#3a6580] transition-transform active:scale-95 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                            >
                                {loadingIssue ? 'Processing...' : <><Check /> Confirm Issue</>}
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-400">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ArrowRight size={32} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Ready to Issue?</h3>
                            <p className="max-w-xs mx-auto">Select a student from the left and a book from the middle to verify and issue.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default IssueBook;
