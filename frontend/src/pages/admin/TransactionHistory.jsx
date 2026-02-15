import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, ArrowUpRight, ArrowDownLeft, Filter, History, Plus, Trash2 } from 'lucide-react';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('ALL'); // ALL, BORROW, RETURN

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/admin/transactions', config);
                setTransactions(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    // Filter Logic
    const filteredTransactions = transactions.filter(txn => {
        const matchesSearch =
            txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.details.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filter === 'ALL'
            ? true
            : filter === 'BORROW'
                ? (txn.action === 'BORROW' || txn.action === 'ISSUE_BOOK')
                : filter === 'RETURN'
                    ? (txn.action === 'RETURN' || txn.action === 'RETURN_BOOK')
                    : (txn.action === 'ADD_BOOK' || txn.action === 'REMOVE_BOOK');

        return matchesSearch && matchesType;
    });

    const getBadgeStyle = (action) => {
        if (action === 'BORROW' || action === 'ISSUE_BOOK') {
            return 'bg-orange-100 text-orange-700 border-orange-200';
        }
        if (action === 'ADD_BOOK') {
            return 'bg-blue-100 text-blue-700 border-blue-200';
        }
        if (action === 'REMOVE_BOOK') {
            return 'bg-red-100 text-red-700 border-red-200';
        }
        return 'bg-green-100 text-green-700 border-green-200';
    };

    const getIcon = (action) => {
        if (action === 'BORROW' || action === 'ISSUE_BOOK') {
            return <ArrowUpRight size={14} className="mr-1" />;
        }
        if (action === 'ADD_BOOK') {
            return <Plus size={14} className="mr-1" />;
        }
        if (action === 'REMOVE_BOOK') {
            return <Trash2 size={14} className="mr-1" />;
        }
        return <ArrowDownLeft size={14} className="mr-1" />;
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <History className="text-gray-400" /> Transaction History
                    </h1>
                    <p className="text-gray-500">Log of all book issues and returns</p>
                </div>

                {/* Search & Filter */}
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search student or book..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer"
                    >
                        <option value="ALL">All Actions</option>
                        <option value="BORROW">Issued/Borrowed</option>
                        <option value="RETURN">Returned</option>
                        <option value="CATALOG">Catalog Updates</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">Performed By</th>
                                <th className="px-6 py-4">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Loading history...</td></tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">No transactions found matching your criteria.</td></tr>
                            ) : (
                                filteredTransactions.map((txn) => (
                                    <tr key={txn._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(txn.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(txn.action)}`}>
                                                {getIcon(txn.action)}
                                                {txn.action.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                            {txn.user}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {txn.details}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
