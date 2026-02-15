import React from 'react';

const TabHistory = ({ student }) => {
    if (!student || !student.borrowedBooks) return <div className="p-4 text-gray-500">No student selected.</div>;

    // Filter for Returned books
    const historyBooks = student.borrowedBooks
        .filter(b => b.status === 'Returned')
        .sort((a, b) => new Date(b.actualReturnDate) - new Date(a.actualReturnDate));

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-3 border-b border-gray-200 bg-gray-50 font-bold text-gray-700">
                Reading History (Returned Books)
            </div>

            <div className="flex-1 overflow-auto">
                {historyBooks.length > 0 ? (
                    <table className="min-w-full text-xs text-left">
                        <thead className="bg-gray-100 font-medium text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-2">Book Title</th>
                                <th className="px-4 py-2">Issue Date</th>
                                <th className="px-4 py-2">Returned Date</th>
                                <th className="px-4 py-2">Penalty</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {historyBooks.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 font-medium text-gray-800">
                                        {item.book ? item.book.title : 'Deleted Book'}
                                    </td>
                                    <td className="px-4 py-2 text-gray-600">
                                        {new Date(item.borrowDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 text-gray-600">
                                        {item.actualReturnDate ? new Date(item.actualReturnDate).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.penalty > 0 ? (
                                            <span className="text-red-600 font-bold">Rs {item.penalty}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-gray-400 italic">
                        No reading history found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabHistory;
