'use client';

import React from 'react';

const AlnorasFooter = () => {
  return (
    <footer className="relative bg-white overflow-hidden pt-40">
      {/* Decorative Wave */}
      <div className="absolute inset-x-0 top-0 flex justify-center h-[200px] md:h-[280px] overflow-hidden pointer-events-none">
        <div className="w-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,64L80,85.3C160,107,320,149,480,144C640,139,800,85,960,90.7C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              fill="#29419a"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="text-left md:text-left flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-4xl font-bold text-[#29419a]">ALNORAS</h3>
            <div className="w-20 h-1 bg-[#f1ec43] mt-2 mb-4 rounded-full"></div>
            <p className="text-gray-600 text-sm max-w-sm leading-relaxed">
              Pioneering the future of smart logistics and efficient transport. We combine technology and reliability for global trade excellence.
            </p>
          </div>

          {/* CTA or Tagline */}
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-[#29419a]">Built for the Future</h4>
            <p className="text-sm text-gray-600 max-w-xs">
             “From ports to progress—building tomorrow’s Sudan with every shipment.”
            </p>
       
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-transparent mb-3 text-center text-sm text-gray-600 relative z-10">
        © 2025 Alnoras Integrated Co. Ltd. — All rights reserved.
      </div>

      {/* Floating Circles */}
      <div className="absolute top-20 left-1/4 w-4 h-4 bg-[#f1ec43] rounded-full opacity-60 animate-float z-0"></div>
      <div className="absolute top-32 right-1/3 w-3 h-3 bg-[#29419a] rounded-full opacity-40 animate-float-delay z-0"></div>
      <div className="absolute bottom-8 left-1/3 w-5 h-5 bg-[#f1ec43] bg-opacity-30 rounded-full animate-float z-0"></div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 4s ease-in-out 1s infinite;
        }
      `}</style>
    </footer>
  );
};

export default AlnorasFooter;
