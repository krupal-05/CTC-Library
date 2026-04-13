import React from 'react';
import EbookCard from './Cards/EbookCard';

const Ebooks = () => {
  // Eventually, this will be fetched from your MongoDB "Books" collection
  const ebookData = [
 {
    id: 1,
    title: "Environmental Engineering & Science",
    author: "Gilbert M. Masters",
    department: "Environmental",
    coverImg: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 2,
    title: "Modern Structural Analysis",
    author: "S.S. Bhavikatti",
    department: "Civil",
    coverImg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 3,
    title: "MERN Stack Development",
    author: "Chris Northwood",
    department: "Computer",
    coverImg: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 4,
    title: "Principles of Water Quality",
    author: "Thomas D. Waite",
    department: "Environmental",
    coverImg: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 5,
    title: "Thermodynamics: An Engineering Approach",
    author: "Yunus Cengel",
    department: "Mechanical",
    coverImg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 6,
    title: "Communication Systems",
    author: "Simon Haykin",
    department: "EC",
    coverImg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 7,
    title: "Advanced Concrete Technology",
    author: "Zongjin Li",
    department: "Civil",
    coverImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 8,
    title: "The Art of Hindi Poetry",
    author: "Team Dhanak Selection",
    department: "Cultural",
    coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 9,
    title: "Network Security & Cryptography",
    author: "Bernard Menezes",
    department: "Computer",
    coverImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 10,
    title: "Waste Management Techniques",
    author: "Harvey Alter",
    department: "Environmental",
    coverImg: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  },
  {
    id: 11,
    title: "Machine Learning with Python",
    author: "Andreas Müller",
    department: "Computer",
    coverImg: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=300&h=450",
    downloadLink: "#"
  }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-12 lg:pt-20">
        {/* Academic Header */}
        <div className="mb-12 border-l-8 border-primary pl-6">
          <h1 className="text-3xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
            E- <span className="text-primary">Books</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Standard E-books & Reference Manuals for  Students</p>
        </div>

        {/* E-Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {ebookData.map((book) => (
            <EbookCard 
              key={book.id}
              {...book} // Pass all properties at once
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ebooks;


const ebookData = [
 
];