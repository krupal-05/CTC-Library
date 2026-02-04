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
                    className={`block p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 ${cat.color.replace('bg-', 'hover:bg-opacity-80 ')}`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold">{cat.label}</h3>
                        <div className={`h-8 w-8 rounded-full ${cat.color} filter brightness-90 flex items-center justify-center shrink-0 ml-2`}>
                            <span className="text-xs font-bold">{counts[cat.code] || 0}</span>
                        </div>
                    </div>
                    <p className="text-sm opacity-80">{cat.description}</p>
                </Link>
            ))}
        </div>
    );
};

export default UDCGrid;
