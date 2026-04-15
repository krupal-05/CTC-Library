import React from 'react';
import { Play, Headphones, Clock } from 'lucide-react';

const AudioBookCard = ({ title, narrator, duration, coverImg, category }) => {
  return (
    <div className="group flex flex-col items-center p-4 bg-white rounded-3xl border border-transparent hover:border-blue-100 hover:shadow-xl transition-all duration-300">
      
      {/* 1. Rounded Cover Image */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group-hover:border-blue-100 transition-colors duration-300">
          <img 
            src={coverImg} 
            alt={title} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
          />
        </div>
        
        {/* Play Overlay (Appears on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-blue-600/80 backdrop-blur-sm p-3 rounded-full text-white shadow-lg">
            <Play size={20} fill="currentColor" />
          </div>
        </div>

        {/* Floating Duration Badge */}
        <div className="absolute -bottom-1 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-full border-2 border-white flex items-center gap-1 shadow-sm">
          <Clock size={10} /> {duration}
        </div>
      </div>

      {/* 2. Labels (Name & Author) */}
      <div className="text-center w-full">
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">
          {category}
        </span>
        <h3 className="font-bold text-slate-800 text-sm line-clamp-1 mb-0.5">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mb-4 flex items-center justify-center gap-1">
          <Headphones size={12} className="opacity-70" /> {narrator}
        </p>
      </div>

      {/* 3. Start Button */}
      <button className="w-full py-2.5 bg-blue-50 text-blue-600 rounded-2xl text-xs font-bold hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2">
        <Play size={14} fill="currentColor" />
        Start Listening
      </button>
    </div>
  );
};

export default AudioBookCard;