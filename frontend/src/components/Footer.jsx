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
        <footer className="bg-primary text-white py-12 mt-auto border-t border-white/5 shadow-2xl">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Contact Info */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <img src={collegeLogo} alt="College Logo" className="w-12 h-12 rounded-full bg-white/10 p-1 object-cover" />
                        <div>
                            <h3 className="font-bold text-lg">L.D. College of Engineering</h3>
                            <p className="text-sm text-white/50">Ahmedabad, Gujarat</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm text-white/80 font-medium">
                        <div className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                            <div className="p-2 rounded-lg bg-white/5"><Phone className="w-4 h-4" /></div>
                            <span>+91-XXXXXXXXXX</span>
                        </div>
                        <div className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                            <div className="p-2 rounded-lg bg-white/5"><Mail className="w-4 h-4" /></div>
                            <span>library@ldce.ac.in</span>
                        </div>
                        <div className="flex items-start gap-3 hover:text-white transition-colors cursor-default">
                            <div className="p-2 rounded-lg bg-white/5"><MapPin className="w-4 h-4" /></div>
                            <p className="max-w-xs pt-1">Opposite Gujarat University, Navrangpura, Ahmedabad - 380015</p>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="md:text-right">
                    <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                    <ul className="space-y-3 text-sm text-white/70">
                        <li><a href="https://www.ldce.ac.in" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">www.ldce.ac.in</a></li>
                        <li><a href="https://www.gtu.ac.in" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">www.student.gtu.ac.in</a></li>
                        <li><Link to="/feedback" className="cursor-pointer hover:text-accent transition-colors">Feedback</Link></li>
                        <li><Link to="/" className="cursor-pointer hover:text-accent transition-colors">Home Portal</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-white/30 font-medium tracking-widest uppercase">
                &copy; {new Date().getFullYear()} L.D. COLLEGE OF ENGINEERING LIBRARY. ALL RIGHTS RESERVED.
            </div>
        </footer>
    );
};

export default Footer;
