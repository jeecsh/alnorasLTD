"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

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
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services', hasDropdown: true },
    { name: 'About', href: '#about' },
    { name: 'Import/Export', href: '#import' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
     <nav 
  className={`fixed top-0 left-6 right-6 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(41,65,154,0.3)]'
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
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 font-medium transition-colors duration-200 ${
                      isScrolled 
                        ? 'text-gray-800 hover:text-blue-600' 
                        : 'text-gray-800 hover:text-blue-600'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </a>
                  
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-2">
                        <a href="#car-rental" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Car Rental</a>
                        <a href="#workshops" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Mechanical Workshops</a>
                        <a href="#transport" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Transport Logistics</a>
                        <a href="#energy" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Clean Energy</a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
          
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled 
                  ? 'text-gray-800 hover:bg-gray-100' 
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/95 backdrop-blur-md">
            <div className="container mx-auto px-6 py-2">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                    {item.hasDropdown && (
                      <div className="ml-4 space-y-1">
                        <a href="#car-rental" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Car Rental</a>
                        <a href="#workshops" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Mechanical Workshops</a>
                        <a href="#transport" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Transport Logistics</a>
                        <a href="#energy" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Clean Energy</a>
                      </div>
                    )}
                  </div>
                ))}
                <button className="w-full mt-2 mb-4 px-4 py-3 bg-transparent text-white rounded-4xl font-medium">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
   
    </>
  );
};

export default AlnorasNavbar;