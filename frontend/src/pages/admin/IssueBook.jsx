import React, { useState, useRef } from 'react';
import axios from 'axios';
import { User, BookOpen, Search, X, Check, Printer, Save, RefreshCw } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

// Import Tabs
import TabLoan from './tabs/TabLoan';
import TabReturn from './tabs/TabReturn';
import TabBooking from './tabs/TabBooking';
import TabReserve from './tabs/TabReserve';
import TabFine from './tabs/TabFine';

const IssueBook = () => {
    const { success, error: toastError } = useToast();

    // Inputs
    const [studentBarcode, setStudentBarcode] = useState('');
    const [showDropdown, setShowDropdown] = useState(null);

    // Data
    const [student, setStudent] = useState(null);

    // UI State
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Issue');

    const bookInputRef = useRef(null);

    // 1. Fetch Student
    const handleStudentSearch = async (e) => {
        if (e.key === 'Enter') {
            if (!studentBarcode) return;
            setLoading(true);
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

                // Search users API
                const { data } = await axios.get(`http://localhost:5000/api/users?keyword=${studentBarcode}`, config);

                if (data && data.length > 0) {
                    // Exact match or first result
                    const found = data.find(u => u.enrollmentNo === studentBarcode) || data[0];
                    setStudent(found);
                } else {
                    toastError('Student not found');
                    setStudent(null);
                }
            } catch (err) {
                toastError('Error fetching student');
            } finally {
                setLoading(false);
            }
        }
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Issue':
                return <TabLoan student={student} loading={loading} setLoading={setLoading} />;
            case 'Return':
                return <TabReturn student={student} loading={loading} setLoading={setLoading} />;
            case 'Booking':
                return <TabBooking />;
            case 'Reserve':
                return <TabReserve />;
            case 'Fine':
                return <TabFine />;
            default:
                return <TabLoan student={student} loading={loading} setLoading={setLoading} />;
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] bg-gray-100 p-2 flex flex-col font-sans text-sm">

            {/* TOP BAR: STUDENT INFO */}
            <div className="bg-white border border-gray-300 shadow-sm p-2 mb-2 grid grid-cols-[1fr_200px] gap-4">

                {/* Left: Inputs & Info */}
                <div className="flex flex-col gap-2">
                    {/* Barcode Search Row */}
                    <div className="flex items-center gap-2">
                        <label className="w-24 text-gray-600 font-bold text-right">Enrollment No:</label>
                        <div className="flex-1 flex gap-2 relative">
                            <input
                                autoFocus
                                placeholder="Scan or Type Name..."
                                value={studentBarcode}
                                onChange={e => {
                                    setStudentBarcode(e.target.value);
                                    if (e.target.value.length > 2) {
                                        // Simple debounce could be added, but for now direct call or wait for Enter
                                        // Let's rely on Enter for "Scan" and a separate effect/button for "Search"
                                        // actually user wants "manually", so let's trigger search on typing
                                        const timer = setTimeout(() => {
                                            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                                            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                                            axios.get(`http://localhost:5000/api/users?keyword=${e.target.value}`, config)
                                                .then(({ data }) => setShowDropdown(data.length > 0 ? data : null))
                                                .catch(() => setShowDropdown(null));
                                        }, 300);
                                        return () => clearTimeout(timer);
                                    } else {
                                        setShowDropdown(null);
                                    }
                                }}
                                onKeyDown={handleStudentSearch}
                                className="border border-gray-400 px-2 py-1 w-64 bg-white focus:bg-yellow-50 outline-none"
                            />
                            <button className="bg-gray-100 border border-gray-300 p-1 hover:bg-gray-200"><Search size={16} /></button>

                            {/* Dropdown Results */}
                            {showDropdown && (
                                <div className="absolute top-full left-0 w-64 bg-white border border-gray-300 shadow-lg z-50 max-h-60 overflow-auto">
                                    {showDropdown.map(u => (
                                        <div
                                            key={u._id}
                                            className="p-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                                            onClick={() => {
                                                setStudent(u);
                                                setStudentBarcode(u.enrollmentNo);
                                                setShowDropdown(null);
                                            }}
                                        >
                                            <div className="font-bold text-xs">{u.name}</div>
                                            <div className="text-[10px] text-gray-500">{u.enrollmentNo} - {u.department}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 my-1"></div>

                    {/* Student Details Grid */}
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                        <label className="text-gray-500 text-right">Student:</label>
                        <input className="border border-gray-300 bg-gray-100 px-2 py-1 w-full" readOnly value={student ? student.name : ''} />

                        <label className="text-gray-500 text-right">Enrollment:</label>
                        <input className="border border-gray-300 bg-gray-100 px-2 py-1 w-full" readOnly value={student ? student.enrollmentNo : ''} />

                        <label className="text-gray-500 text-right">Dept/Loc:</label>
                        <div className="flex gap-2">
                            <input className="border border-gray-300 bg-gray-100 px-2 py-1 flex-1" readOnly value={student ? student.department : ''} />
                            <input className="border border-gray-300 bg-gray-100 px-2 py-1 flex-1" readOnly value={student ? student.year : ''} />
                        </div>
                    </div>
                </div>

                {/* Right: Photo Placeholder */}
                <div className="bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-400">
                    <User size={80} />
                </div>
            </div>

            {/* MIDDLE: TABS */}
            <div className="flex gap-1 mb-2 border-b border-gray-300">
                {['Issue', 'Booking', 'Reserve', 'Fine', 'Return'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-1 border-t border-l border-r rounded-t-lg font-bold text-sm 
                            ${activeTab === tab
                                ? 'bg-green-500 text-white border-green-600'
                                : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 bg-white border border-gray-300 shadow-sm flex flex-col relative">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default IssueBook;
