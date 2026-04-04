import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { udcCategories } from '../data/udcData';

const UDCGrid = () => {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/books/udc-counts');
                const countMap = {};
                data.forEach(item => {
                    if (item._id) countMap[item._id] = item.count;
                });
                setCounts(countMap);
            } catch (error) {
                console.error("Failed to fetch UDC counts", error);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {udcCategories.map((cat) => (
                <Link
                    key={cat.code}
                    to={`/student/books?udc=${cat.code}`}
                    className={`block p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border hover:-translate-y-1 ${cat.color}`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold tracking-tight">{cat.label}</h3>
                        <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 ml-2 shadow-inner">
                            <span className="text-[10px] font-black uppercase tracking-widest">{counts[cat.code] || 0}</span>
                        </div>
                    </div>
                    <p className="text-xs font-medium opacity-60 line-clamp-2 leading-relaxed">{cat.description}</p>
                </Link>
            ))}
        </div>
    );
};

export default UDCGrid;
