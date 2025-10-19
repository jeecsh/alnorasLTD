"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const AlnorasNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPdfDropdownOpen, setIsPdfDropdownOpen] = useState(false);

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

  const pdfDocuments = [
    { name: 'Construction Works CV', href: '/Alnoras Integrated Solutions CO.LTD- Construction works CV.pdf' },
    { name: 'Natural Bounty Company Profile', href: '/Alnoras - Natural Bounty COMPANY PROFILE .pdf' },
    { name: 'Alnoras Profile - Conference', href: '/Alnoras Profile- confrence.pdf' },
    { name: 'Solar Energy Company Profile', href: '/Alnoras - Solar Energy COMPANY PROFILE .pdf' },
    { name: 'Alnoras Transportation', href: '/alnoras - transportation.pdf' },
    { name: 'Car Rentals Profile', href: '/Car Rentals profile.pdf' },
    { name: 'Non-food Profile', href: '/Non-food Profile.pdf' },
  ];

  const togglePdfDropdown = () => {
    setIsPdfDropdownOpen(!isPdfDropdownOpen);
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
              
              {/* PDF Dropdown for Desktop */}
              <div className="relative">
                <button
                  onClick={togglePdfDropdown}
                  className={`flex items-center px-3 py-2 font-medium transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-800 hover:text-[#29419a]' 
                      : 'text-gray-800 hover:text-[#29419a]'
                  }`}
                >
                  Documents <Download className={`ml-1 w-4 h-4 transition-transform duration-200 ${isPdfDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPdfDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-1 z-20 transition-all duration-300 ease-out ${isPdfDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    {pdfDocuments.map((pdf) => (
                      <a
                        key={pdf.name}
                        href={pdf.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPdfDropdownOpen(false)}
                      >
                        {pdf.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button and PDF Dropdown for Mobile */}
            <div className="lg:hidden flex items-center space-x-2">
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
        {/* PDF Dropdown for Mobile */}
        <div className="relative">
          <button
            onClick={togglePdfDropdown}
            className="block px-6 py-5 text-lg font-medium text-white hover:bg-white/10 hover:shadow-md hover:scale-[1.02] transform transition-all duration-250 ease-out rounded-lg backdrop-blur-sm w-full text-left flex items-center"
          >
            Documents <Download className={`ml-auto w-4 h-4 transition-transform duration-200 ${isPdfDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isPdfDropdownOpen && (
            <div className="mt-2 space-y-1 pl-8">
              {pdfDocuments.map((pdf) => (
                <a
                  key={pdf.name}
                  href={pdf.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-sm text-white/80 hover:bg-white/5 rounded-lg"
                  onClick={() => {
                    setIsPdfDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {pdf.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
      </nav>
    </>
  );
};

export default AlnorasNavbar;
