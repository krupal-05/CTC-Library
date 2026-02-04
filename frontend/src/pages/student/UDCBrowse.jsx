import React from 'react';
import UDCGrid from '../../components/UDCGrid';

const UDCBrowse = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Browse by Universal Decimal Classification (UDC)</h2>
            <UDCGrid />
        </div>
    );
};

export default UDCBrowse;
