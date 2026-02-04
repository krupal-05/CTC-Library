import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { X, RefreshCw, Eraser } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const TabReturn = ({ student, loading, setLoading }) => {
    const { success, error: toastError } = useToast();
    const [bookBarcode, setBookBarcode] = useState('');
    const [processedBooks, setProcessedBooks] = useState([]);
    const [activeLoans, setActiveLoans] = useState([]);
    const bookInputRef = useRef(null);

    // Fetch active loans when student is selected
    useEffect(() => {
        if (student) {
            fetchActiveLoans();
            setTimeout(() => bookInputRef.current?.focus(), 100);
        } else {
            setActiveLoans([]);
        }
    }, [student]);

    const fetchActiveLoans = async () => {
        // Ideally fetch this user's specific loans. For now we might just clear or implement a specific endpoint later.
        // We'll skip pre-fetching for now to keep it simple, or user can assume scanning a book returns it.
    };

    const handleBookReturn = async (e) => {
        if (e.key === 'Enter') {
            if (!bookBarcode || !student) return;
            setLoading(true);

            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

                const { data } = await axios.post(
                    'http://localhost:5000/api/admin/return-book',
                    { enrollmentNo: student.enrollmentNo, isbn: bookBarcode },
                    config
                );

                const penaltyMsg = data.penalty > 0 ? ` (Penalty: Rs ${data.penalty})` : '';
                success(`Returned: ${data.book}${penaltyMsg}`);

                // Add to processed list
                const newTransaction = {
                    id: Date.now(),
                    barcode: bookBarcode,
                    title: data.book,
                    status: 'Returned',
                    message: data.message + penaltyMsg
                };

                setProcessedBooks(prev => [...prev, newTransaction]);
                setBookBarcode('');
            } catch (err) {
                toastError(err.response?.data?.message || 'Return Failed');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* Input Bar */}
            <div className="p-2 border-b border-gray-200 bg-red-50 flex items-center gap-2">
                <label className="font-bold text-gray-700">Return Barcode:</label>
                <input
                    ref={bookInputRef}
                    value={bookBarcode}
                    onChange={e => setBookBarcode(e.target.value)}
                    onKeyDown={handleBookReturn}
                    disabled={!student}
                    placeholder={student ? "Scan Book to Return..." : "Select Student First"}
                    className="border border-red-300 px-2 py-1 w-64 focus:bg-red-100 outline-none disabled:bg-gray-200"
                />
                {loading && <span className="text-red-600 text-xs font-bold animate-pulse">Processing...</span>}
            </div>

            {/* List Header */}
            <div className="grid grid-cols-[120px_100px_1fr] bg-gray-100 border-b border-gray-300 p-1 font-bold text-gray-600 text-xs">
                <div>Barcode</div>
                <div>Status</div>
                <div>Details</div>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-auto bg-white">
                {processedBooks.map((book) => (
                    <div key={book.id} className="grid grid-cols-[120px_100px_1fr] border-b border-gray-100 p-1 text-xs hover:bg-red-50">
                        <div>{book.barcode}</div>
                        <div className="text-green-600 font-bold">{book.status}</div>
                        <div className="text-gray-800">{book.title} {book.message}</div>
                    </div>
                ))}
                {processedBooks.length === 0 && (
                    <div className="p-8 text-center text-gray-400 italic">
                        {student ? "Scan a book to return" : "Waiting for student..."}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-100 border-t border-gray-300 p-1 text-xs text-gray-600 flex justify-end">
                <button onClick={() => setProcessedBooks([])} className="flex items-center gap-1 bg-white border border-gray-300 px-2 hover:bg-gray-200">
                    <Eraser size={12} /> Clear List
                </button>
            </div>
        </div>
    );
};

export default TabReturn;
