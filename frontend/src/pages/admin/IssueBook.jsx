import React, { useState, useRef } from 'react';
import axios from 'axios';
import { User, Search } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

// Import Tabs
import TabLoan from './tabs/TabLoan';
import TabRequested from './tabs/TabRequested';
import TabHistory from './tabs/TabHistory';

const IssueBook = () => {
    const { success, error: toastError } = useToast();

    // Inputs
    const [studentBarcode, setStudentBarcode] = useState('');
    const [showDropdown, setShowDropdown] = useState(null);

    // Data
    const [student, setStudent] = useState(null);

    // UI State
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Issued');

    // 1. Fetch Student & their full profile (with books)
    const fetchStudentProfile = async (enrollmentOrId, type = 'enrollment') => {
        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            let targetId = enrollmentOrId;

            if (type === 'enrollment') {
                // 1. Search users API (to get ID)
                const { data: searchData } = await axios.get(`http://localhost:5000/api/users?keyword=${enrollmentOrId}`, config);
                if (searchData && searchData.length > 0) {
                    const foundBasic = searchData.find(u => u.enrollmentNo === enrollmentOrId) || searchData[0];
                    targetId = foundBasic._id;
                } else {
                    toastError('Student not found');
                    setStudent(null);
                    setLoading(false);
                    return;
                }
            }

            // 2. Fetch FULL Profile (with populated books)
            const { data: fullProfile } = await axios.get(`http://localhost:5000/api/users/${targetId}/full-profile`, config);
            setStudent(fullProfile);
            setStudentBarcode(fullProfile.enrollmentNo);
            setShowDropdown(null);

        } catch (err) {
            console.error(err);
            toastError('Error fetching student details');
            // Don't clear student on simple refresh failure to avoid UI flicker, but maybe safer to leave as is
        } finally {
            setLoading(false);
        }
    };

    const handleStudentSearch = (e) => {
        if (e.key === 'Enter') {
            if (!studentBarcode) return;
            fetchStudentProfile(studentBarcode, 'enrollment');
        }
    };

    const refreshProfile = () => {
        if (student?._id) {
            fetchStudentProfile(student._id, 'id');
        }
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Requested':
                return <TabRequested student={student} />;
            case 'Issued':
                return <TabLoan student={student} loading={loading} setLoading={setLoading} refreshProfile={refreshProfile} />;
            case 'Read History':
                return <TabHistory student={student} />;
            default:
                return <TabLoan student={student} loading={loading} setLoading={setLoading} refreshProfile={refreshProfile} />;
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
                            <button
                                onClick={() => handleStudentSearch({ key: 'Enter' })}
                                className="bg-gray-100 border border-gray-300 p-1 hover:bg-gray-200"
                            >
                                <Search size={16} />
                            </button>

                            {/* Dropdown Results */}
                            {showDropdown && (
                                <div className="absolute top-full left-0 w-64 bg-white border border-gray-300 shadow-lg z-50 max-h-60 overflow-auto">
                                    {showDropdown.map(u => (
                                        <div
                                            key={u._id}
                                            className="p-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                                            onClick={() => {
                                                // Trigger full fetch implicitly by setting barcode and firing enter logic
                                                setStudentBarcode(u.enrollmentNo);
                                                setShowDropdown(null);
                                                // Can't easily simulate Enter, so we might need a direct call.
                                                // Best to just set barcode and let user hit Enter or handle manual trigger.
                                                // Or trigger immediately:
                                                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                                                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                                                setLoading(true);
                                                axios.get(`http://localhost:5000/api/users/${u._id}/full-profile`, config)
                                                    .then(({ data }) => {
                                                        setStudent(data);
                                                        setLoading(false);
                                                    })
                                                    .catch(() => {
                                                        setLoading(false);
                                                        toastError("Failed to load profile");
                                                    });
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
                {['Requested', 'Issued', 'Read History'].map(tab => (
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
