"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const AlnorasNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'About', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Import/Export', href: '#import' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleCatalogDownload = () => {
    // Create a download link for the catalog from public folder
    const link = document.createElement('a');
    link.href = '/catalog.pdf'; // Assuming your catalog is named catalog.pdf
    link.download = 'Alnoras-Catalog.pdf';
    link.click();
  };

  return (
    <>
     <nav 
  className={`fixed top-0 left-6 right-6 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
      : 'bg-transparent'
  }`}
>

        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Alnoras Logo" 
                className="h-30 w-auto object-contain"
              />
              <div className={`${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                <div className="font-bold text-lg">ALNORAS</div>
                <div className="text-xs text-gray-500">INTEGRATED CO.</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 font-medium transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-800 hover:text-[#29419a]' 
                      : 'text-gray-800 hover:text-[#29419a]'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Catalog Download Icon */}
              <button
                onClick={handleCatalogDownload}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isScrolled 
                    ? 'text-gray-800 hover:text-blue-600 hover:bg-gray-100' 
                    : 'text-gray-800 hover:text-blue-600 hover:bg-gray-100'
                }`}
                title="Download Catalog"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button and Download Icon */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Catalog Download Icon for Mobile */}
              <button
                onClick={handleCatalogDownload}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled 
                    ? 'text-gray-800 hover:text-[#29419a] hover:bg-gray-100' 
                    : 'text-gray-800 hover:text-[#29419a] hover:bg-gray-100'
                }`}
                title="Download Catalog"
              >
                <Download className="w-5 h-5" />
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md transition-colors ${
                  isScrolled 
                    ? 'text-gray-800 hover:bg-gray-100' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
{/* Modern Mobile Menu */}
<div className={`lg:hidden transition-all duration-500 ease-in-out ${
  isMobileMenuOpen 
    ? 'max-h-screen opacity-100' 
    : 'max-h-0 opacity-0 overflow-hidden'
}`}>
  <div className="bg-gradient-to-b from-[#29419a] to-[#1a2c6e] w-full h-full mt-2 shadow-xl rounded-lg">
    <div className="px-4 py-3">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block px-6 py-5 text-lg font-medium text-white hover:bg-white/10 hover:shadow-md hover:scale-[1.02] transform transition-all duration-250 ease-out rounded-lg backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center">
         
              <span>{item.name}</span>
              <span className="ml-auto text-white/50">
                →
              </span>
            </div>
          </a>
        ))}
        
      
      </div>
    </div>
  </div>
</div>
      </nav>
    </>
  );
};

export default AlnorasNavbar;