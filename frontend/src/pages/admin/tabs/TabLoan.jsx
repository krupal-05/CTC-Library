import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { X, Search } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const TabLoan = ({ student, loading, setLoading, refreshProfile }) => {
    const { success, error: toastError } = useToast();
    const [bookBarcode, setBookBarcode] = useState('');
    const [scannedBooks, setScannedBooks] = useState([]);
    const bookInputRef = useRef(null);

    // Focus book input when student changes
    useEffect(() => {
        if (student) {
            setTimeout(() => bookInputRef.current?.focus(), 100);
        }
    }, [student]);

    const handleBookIssue = async (e) => {
        if (e.key === 'Enter') {
            if (!bookBarcode || !student) return;
            // Prevent duplicate scans in session
            if (scannedBooks.find(b => b.barcode === bookBarcode)) {
                toastError('Book active in current session');
                setBookBarcode('');
                return;
            }

            setLoading(true);
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

                // Call Issue API
                const { data } = await axios.post(
                    'http://localhost:5000/api/admin/issue-book',
                    {
                        enrollmentNo: student.enrollmentNo, // passing enrollment from fetched student
                        isbn: bookBarcode,
                        days: 15 // Default 15 days
                    },
                    config
                );

                // Add to session list
                const newTransaction = {
                    id: Date.now(),
                    barcode: bookBarcode,
                    title: data.book,
                    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                    status: 'Issued'
                };

                setScannedBooks(prev => [...prev, newTransaction]);
                success(`Issued: ${data.book}`);
                setBookBarcode('');
            } catch (err) {
                toastError(err.response?.data?.message || 'Issue Failed');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleReturnBook = async (isbn) => {
        if (!window.confirm(`Return book with ISBN: ${isbn}?`)) return;
        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            const { data } = await axios.post(
                'http://localhost:5000/api/admin/return-book',
                { enrollmentNo: student.enrollmentNo, isbn: isbn },
                config
            );

            const penaltyMsg = data.penalty > 0 ? ` (Penalty: Rs ${data.penalty})` : '';
            success(`Returned: ${data.book}${penaltyMsg}`);

            // Refresh profile to update list
            if (refreshProfile) refreshProfile();

        } catch (err) {
            toastError(err.response?.data?.message || 'Return Failed');
        } finally {
            setLoading(false);
        }
    };

    const clearSession = () => {
        setScannedBooks([]);
        setBookBarcode('');
    };

    // Filter active books from student profile (if populated)
    const activeBooks = student?.borrowedBooks?.filter(b => b.status === 'Active') || [];

    return (
        <div className="flex flex-col h-full relative">
            {/* Book Input Bar */}
            <div className="p-2 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                <label className="font-bold text-gray-700">Book Barcode:</label>
                <input
                    ref={bookInputRef}
                    value={bookBarcode}
                    onChange={e => setBookBarcode(e.target.value)}
                    onKeyDown={handleBookIssue}
                    disabled={!student}
                    placeholder={student ? "Scan Book..." : "Select Student First"}
                    className="border border-gray-400 px-2 py-1 w-64 focus:bg-yellow-50 outline-none disabled:bg-gray-200"
                />
                {loading && <span className="text-blue-600 text-xs font-bold animate-pulse">Processing...</span>}
            </div>

            {/* List Header */}
            <div className="grid grid-cols-[120px_100px_100px_40px_80px_1fr_80px] bg-gray-100 border-b border-gray-300 p-1 font-bold text-gray-600 text-xs">
                <div>Barcode/ISBN</div>
                <div>Date Due</div>
                <div>Call No</div>
                <div>#</div>
                <div>Status</div>
                <div>Title</div>
                <div className="text-center">Action</div>
            </div>

            {/* List Items (Session + Active) */}
            <div className="flex-1 overflow-auto bg-white">
                {/* Session Scans */}
                {scannedBooks.map((book, idx) => (
                    <div key={book.id} className="grid grid-cols-[120px_100px_100px_40px_80px_1fr_80px] border-b border-gray-100 p-1 text-xs bg-green-50 hover:bg-green-100">
                        <div>{book.barcode}</div>
                        <div>{book.dueDate}</div>
                        <div>-</div>
                        <div>{idx + 1}</div>
                        <div className="font-bold text-green-700">NEW</div>
                        <div className="font-medium text-gray-800">{book.title} (Just Issued)</div>
                        <div className="text-center">-</div>
                    </div>
                ))}

                {/* Database Active Loans */}
                {activeBooks.map((book, idx) => (
                    <div key={book._id} className="grid grid-cols-[120px_100px_100px_40px_80px_1fr_80px] border-b border-gray-100 p-1 text-xs hover:bg-blue-50 items-center">
                        <div>{book.book?.isbn || '-'}</div>
                        <div>{new Date(book.returnDate).toLocaleDateString()}</div>
                        <div>-</div>
                        <div>{scannedBooks.length + idx + 1}</div>
                        <div className="text-blue-600 font-bold">Issued</div>
                        <div className="font-medium text-gray-800">{book.book?.title || 'Unknown Title'}</div>
                        <div className="text-center">
                            <button
                                onClick={() => handleReturnBook(book.book?.isbn)}
                                className="bg-red-100 text-red-600 hover:bg-red-200 border border-red-200 px-2 py-0.5 rounded text-[10px] font-bold transition-colors"
                            >
                                Return
                            </button>
                        </div>
                    </div>
                ))}

                {scannedBooks.length === 0 && activeBooks.length === 0 && (
                    <div className="p-8 text-center text-gray-400 italic">
                        {student ? "No books currently issued." : "Waiting for student selection..."}
                    </div>
                )}
            </div>

            {/* Footer Status Bar */}
            <div className="bg-gray-100 border-t border-gray-300 p-1 text-xs text-gray-600 flex justify-between items-center mt-auto">
                <div className="flex gap-4">
                    <span>Active Loans: {activeBooks.length + scannedBooks.length}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={clearSession} className="flex items-center gap-1 bg-white border border-gray-300 px-2 hover:bg-red-50 text-red-600">
                        <X size={12} /> Clear Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TabLoan;
