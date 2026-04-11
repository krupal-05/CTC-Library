import React from 'react';
import Map from '../assets/map.png'

const MapPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[60vh]">
            <h1 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-widest mb-6 lg:mb-10 text-center">LDCE Map</h1>
            <img src="../src/assets/map.png" alt="LDCE" />

        </div>
    );
};

export default MapPage;
