import React, { useState } from 'react';
import { Headphones, Filter } from 'lucide-react';
import AudioBookCard from '../components/Cards/AudioBookCard';

const AudioBooks = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const audioData = [
    { id: 1, title: "Environmental Ethics", narrator: "Dr. R. Sharma", duration: "4h 20m", category: "Academic", coverImg: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 2, title: "The Wings of Fire", narrator: "Gullu Singh", duration: "6h 45m", category: "Biography", coverImg: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 3, title: "MERN Architecture Guide", narrator: "Tech Voice AI", duration: "2h 15m", category: "Computer", coverImg: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 4, title: "Rashmirathi (Poetry)", narrator: "Team Dhanak Artist", duration: "1h 10m", category: "Cultural", coverImg: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 5, title: "Structural Logic 101", narrator: "Prof. Amit V.", duration: "5h 30m", category: "Civil", coverImg: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 6, title: "Climate Change Summary", narrator: "Sarah Jenkins", duration: "3h 05m", category: "Environmental", coverImg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 7, title: "The Alchemist", narrator: "Jeremy Irons", duration: "4h 00m", category: "Fiction", coverImg: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 8, title: "History of LDCE", narrator: "Alumni Association", duration: "1h 45m", category: "History", coverImg: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 9, title: "Communication Mastery", narrator: "Voice Coach", duration: "2h 50m", category: "Soft Skills", coverImg: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 10, title: "Digital Marketing Basics", narrator: "Rohan Mehra", duration: "3h 15m", category: "Marketing", coverImg: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 11, title: "Data Science Pod", narrator: "Analytics Daily", duration: "5h 10m", category: "Data Science", coverImg: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400&h=400" },
  ];

  const categories = ['All', 'Academic', 'Computer', 'Civil', 'Environmental', 'Cultural'];

  const filteredData = activeFilter === 'All' 
    ? audioData 
    : audioData.filter(item => item.category === activeFilter);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-sans">
      <div className="container mx-auto px-4 pt-12 lg:pt-20">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
              Audio <span className="text-blue-600">Bookshelf</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Enhance your learning through high-quality narrations.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
            <Headphones size={24} className="text-blue-500" />
            <div className="text-xs font-bold text-slate-400 uppercase leading-none">
              {audioData.length} Tracks <br />
              <span className="text-slate-900">In Library</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-2 text-slate-400 mr-2">
            <Filter size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Audio Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredData.map((audio) => (
              <AudioBookCard key={audio.id} {...audio} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium">No audiobooks found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioBooks;