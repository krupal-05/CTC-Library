import React from "react";
import policyPDF from "../../assets/PDF/library-rules.pdf";

const Policies = () => {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[60vh]">
      
      <h1 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-widest mb-10 text-center">
        Library Policies
      </h1>

      {/* 2 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        
        {/* Box 1 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100  space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            View Library Policies
          </h2>

          <p className="text-gray-600">
            Click below to view or download the official library policies document.
          </p>

          <a
            href={policyPDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View PDF 📄
          </a>

          <a
            href={policyPDF}
            download
            className="block text-blue-600 underline"
          >
            Download PDF
          </a>
        </div>

        {/* Box 2 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100  space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Reading Hall Usage Guidelines
          </h2>

          <p className="text-gray-600">
            Click below to view or download Reading Hall Usage Guidelines.
          </p>

          <a
            href={policyPDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View PDF 📄
          </a>

          <a
            href={policyPDF}
            download
            className="block text-blue-600 underline"
          >
            Download PDF
          </a>
        </div>

      </div>
    </div>
  );
};

export default Policies;