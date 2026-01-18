import React from 'react';
import { Link } from 'react-router-dom';

// ... (top of file needs check but I can't modify imports easily with replace if not contiguous with this block. 
// Wait, I need to add import Link.
// I'll do multi_replace for Footer as well.

import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/logo.png';
import collegeLogo from '../assets/ldce_logo.png';

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white py-12 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Contact Info */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <img src={collegeLogo} alt="College Logo" className="w-12 h-12 rounded-full bg-white/10 p-1 object-cover" />
                        <div>
                            <h3 className="font-bold text-lg">L.D. College of Engineering</h3>
                            <p className="text-sm text-gray-400">Ahmedabad, Gujarat</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>+91-XXXXXXXXXX</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>library@ldce.ac.in</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-1" />
                            <p className="max-w-xs">Opposite Gujarat University, Navrangpura, Ahmedabad - 380015</p>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="md:text-right">
                    <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="https://www.ldce.ac.in" target="_blank" rel="noreferrer" className="hover:text-white">www.ldce.ac.in</a></li>
                        <li><a href="https://www.gtu.ac.in" target="_blank" rel="noreferrer" className="hover:text-white">www.student.gtu.ac.in</a></li>
                        <li><Link to="/feedback" className="cursor-pointer hover:text-white">Feedback</Link></li>
                        <li><Link to="/" className="cursor-pointer hover:text-white">Home</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} LDCE Library. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
