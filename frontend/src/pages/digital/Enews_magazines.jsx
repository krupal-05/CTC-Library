import React from 'react';
import { Circle, BookOpen, Newspaper } from 'lucide-react';

const Enews_magazines = () => {
    // Logic: Categorized data for better scalability
    const contentData = [
        {
            category: "News (E-Papers)",
            icon: <Newspaper className="text-primary" size={24} />,
            links: [
                { label: "The Indian Express", alink: 'https://indianexpress.com/' },
                { label: "Sandesh", alink: 'https://sandesh.com/' },
                { label: "Reuters Global", alink: 'https://www.reuters.com/' },
                { label: "Divya Bhaskar", alink: 'https://www.divyabhaskar.co.in/' },
                { label: "Live Mint", alink: 'https://www.livemint.com/' },
                { label: "The Indian Express (Gujarati)", alink: 'https://gujarati.indianexpress.com/' }
            ]
        },
        {
            category: "Magazines (E-Magazines)",
            icon: <BookOpen className="text-primary" size={24} />,
            links: [
                { label: "The Better India", alink: 'https://thebetterindia.com/' },
                { label: "Down To Earth", alink: 'https://www.downtoearth.org.in/' },
                { label: "Frontline", alink: 'https://frontline.thehindu.com/' },
                { label: "India Today", alink: 'https://www.indiatoday.in/magazines' },
                { label: "Economic & Political Weekly", alink: 'https://www.epw.in/' }
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[60vh]">
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-widest mb-12 text-center">
                E-NEWS / E-Magazines
            </h1>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8">
                {contentData.map((section, sIdx) => (
                    <div key={sIdx} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                            {section.icon}
                            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
                                {section.category}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.links.map((item, lIdx) => (
                                <div key={lIdx} className="flex items-center gap-3 group">
                                    <Circle 
                                        size={8} 
                                        className="fill-gray-300 text-gray-300 group-hover:fill-primary group-hover:text-primary transition-all" 
                                    />
                                    <a 
                                        href={item.alink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary font-medium transition-colors text-base"
                                    >
                                        {item.label}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Enews_magazines;