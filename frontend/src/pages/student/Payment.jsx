import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

const Payment = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="bg-green-100 p-6 rounded-full mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Pending Dues!</h2>
            <p className="text-gray-600 max-w-md">
                You have no outstanding fines or payments. Keep reading!
            </p>

            <button className="mt-8 flex items-center gap-2 bg-[#4c7c9b] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                <CreditCard className="w-5 h-5" />
                <span>Payment History</span>
            </button>
        </div>
    );
};

export default Payment;
