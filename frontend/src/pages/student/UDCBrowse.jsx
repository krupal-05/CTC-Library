import React from 'react';
import UDCGrid from '../../components/UDCGrid';

const UDCBrowse = () => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300">
            <h2 className="text-3xl font-black mb-8 text-primary tracking-tight">Browse by Classification (UDC)</h2>
            <UDCGrid />
        </div>
    );
};

export default UDCBrowse;
