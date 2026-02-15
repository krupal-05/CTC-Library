import React from 'react';

const TabRequested = ({ student }) => {
    if (!student || !student.borrowedBooks) return <div className="p-4 text-gray-500">No student selected.</div>;

    const requestedBooks = student.borrowedBooks.filter(b => b.status === 'Pending');

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-3 border-b border-gray-200 bg-gray-50 font-bold text-gray-700">
                Requested Books (Pending Approval)
            </div>

            <div className="flex-1 overflow-auto">
                {requestedBooks.length > 0 ? (
                    <table className="min-w-full text-xs text-left">
                        <thead className="bg-gray-100 font-medium text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-2">Book Title</th>
                                <th className="px-4 py-2">Requested Date</th>
                                <th className="px-4 py-2">Duration</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requestedBooks.map((item) => (
                                <tr key={item._id} className="hover:bg-blue-50">
                                    <td className="px-4 py-2 font-medium text-gray-800">
                                        {item.book ? item.book.title : 'Unknown Book'}
                                    </td>
                                    <td className="px-4 py-2 text-gray-600">
                                        {new Date(item.borrowDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 text-gray-600">
                                        {item.requestedDays} Days
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-bold text-[10px]">
                                            Pending
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-gray-400 italic">
                        No pending requests found for this student.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabRequested;
