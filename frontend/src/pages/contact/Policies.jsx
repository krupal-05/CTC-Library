import React from "react";
import policyPDF from "../../assets/PDF/library-rules.pdf";
const Policies = () => {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[60vh]">
      
      <h1 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-widest mb-6 lg:mb-10 text-center">
        Library Policies
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto text-center space-y-6">
        
        <h2 className="text-2xl font-bold text-gray-800">
          View Our Library Rules & Policies
        </h2>

        <p className="text-gray-600">
          Click below to view or download the official library policies document.
        </p>

        {/* View PDF */}
        <a
          href={policyPDF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View PDF 📄
        </a>

        {/* Download PDF */}
        <a
          href={policyPDF}
          download
          className="block text-blue-600 underline"
        >
          Download PDF
        </a>

        {/* Optional: Show PDF inside page */}
        {/* <div className="mt-6">
          <iframe
            src={policyPDF}
            title="Library Policies PDF"
            className="w-full h-[500px] rounded-xl border"
          ></iframe>
        </div> */}

      </div>
    </div>
  );
};

export default Policies;