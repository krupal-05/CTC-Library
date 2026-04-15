import React from 'react';
import { Book, Download, Heart } from 'lucide-react';

const EbookCard = ({ title, author, department, coverImg, downloadLink }) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Book Cover with Department Badge */}
      <div className="bg-slate-100 aspect-[2/3] relative overflow-hidden">
        <img 
          src={coverImg || "https://via.placeholder.com/300x450?text=E-Book"} 
          alt={title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase">
          {department}
        </div>
        <button className="absolute bottom-2 right-2 p-2 bg-white/80 rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm">
          <Heart size={16} />
        </button>
      </div>

      {/* Book Details */}
      <div className="p-4">
        <h3 className="font-bold text-slate-800 text-sm line-clamp-2 min-h-[40px] leading-tight mb-1">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mb-4 italic">by {author}</p>
        
        <div className="flex gap-2">
          <a 
            href={downloadLink} 
            className="flex-1 bg-primary text-white text-xs font-semibold py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Book size={14} /> Read PDF
          </a>
          <button className="p-2 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 transition-colors">
            <Download size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookCard;