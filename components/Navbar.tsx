
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 ${
          isScrolled ? 'bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 shadow-2xl' : 'bg-transparent'
        }`}>
          <button 
            onClick={() => scrollToSection('home')}
            className="text-xl font-bold tracking-tighter"
          >
            ATIF<span className="text-zinc-500"> MUSTAFA.</span>
          </button>

          <div className="hidden md:flex items-center space-x-10 text-sm font-bold tracking-wide">
            {['Home', 'Work', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-zinc-400 hover:text-white transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2.5 bg-zinc-100 text-zinc-950 text-sm font-bold rounded-full hover:bg-white transition-all transform hover:scale-105"
          >
            Start Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
