"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Add GSAP type declaration for TypeScript
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const ModernAlnorasHero = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Company overview content for slider
  const sliderContent = [
    {
      image: '/car.jpg',
      title: 'Car Rental Services',
      description: 'Premium fleet vehicles for corporate and personal transportation needs across Sudan, ensuring reliable mobility solutions.'
    },
    {
      image: '/mech.jpg',
      title: 'Mechanical Workshop',
      description: 'State-of-the-art automotive repair and maintenance facilities with certified technicians and modern equipment.'
    },
    {
      image: 'trans.png',
      title: 'Transport Logistics',
      description: 'Comprehensive freight and cargo solutions connecting Sudan to regional and international markets efficiently.'
    },
    {
      image: '/imo.webp',
      title: 'Import & Export Services',
      description: 'From Sudan to the world and vice versa. We handle industrial machinery imports and agricultural product exports.'
    },
    {
      image: '/clean.webp',
      title: 'Clean Energy Solutions',
      description: 'Sustainable power solutions including solar installations and renewable energy systems for Sudan\'s future.'
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderContent.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;

    const tl = window.gsap.timeline();
    
    // Set initial states
    window.gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 30
    });

    window.gsap.set(shapeRefs.current, {
      opacity: 0,
      scale: 0.8
    });

    window.gsap.set(aboutRef.current, {
      opacity: 0,
      y: 50
    });

    // Set initial position for the circle
    window.gsap.set(circleRef.current, {
      x: 100,
      y: -100,
      scale: 1,
      opacity: 1
    });

    // Hero entrance animations
    tl.to(shapeRefs.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");

    // Floating animation for selected shapes
    [0, 2, 4].forEach((index) => {
      if (shapeRefs.current[index]) {
        window.gsap.to(shapeRefs.current[index], {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5
        });
      }
    });
window.gsap.to(circleRef.current, {
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: () =>
      aboutRef.current
        ? `${aboutRef.current.offsetTop + aboutRef.current.offsetHeight}px`
        : "+=3000",
    scrub: 1.5,
    // markers: true, // for debugging
    onUpdate: (self: any) => {
      const progress = self.progress;
      if (circleRef.current) {
        const startX = 100;
        const startY = -100;
        const endX = -150;
        const endY = window.innerHeight + 300;

        const newX = startX + progress * (endX - startX);
        const newY =
          startY + progress * (endY - startY) + Math.sin(progress * Math.PI) * 80;

        const newScale = 1 + progress * 1.2;

        window.gsap.set(circleRef.current, {
          x: newX,
          y: newY,
          scale: newScale,
          opacity: 1 - progress * 0.4,
          zIndex: progress > 0.9 ? -1 : 5,
        });
      }
    },
  },
});


    // About section scroll trigger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.gsap.to(aboutRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });
    }, { threshold: 0.3 });

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      observer.disconnect();
      // Clean up ScrollTrigger instances
      window.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };

  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % sliderContent.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
  };

  return (
    <div className="relative bg-white overflow-hidden">
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#29419a] bg-opacity-10 rounded-full opacity-40"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#f1ec43] bg-opacity-10 rounded-full opacity-30"></div>
        </div>
        
        {/* Animated Circle */}
        <div 
          ref={circleRef}
          className="absolute top-0 right-0 w-96 h-96 bg-[#f1ec43] bg-opacity-30 rounded-full"
          style={{ zIndex: 5 }}
        />
        
        <div className="container mx-auto px-6 pt-32 pb-16 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
            
            {/* Left Content */}
            <div className="space-y-8">
              <h1 
                ref={titleRef}
                className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              >
                ALNORAS
                <br />
                <span className="text-[#29419a]">INTEGRATED</span>
                <br />
                <span className="text-sm font-normal text-gray-500 block mt-2 tracking-wider">
                  CO. LTD
                </span>
              </h1>

              <p 
                ref={subtitleRef}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                From Sudan to the world and vice versa. Your complete partner for car rental, mechanical workshops, transport logistics, import & export services, and clean energy solutions.
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="group inline-flex items-center justify-center px-8 py-4 bg-[#29419a] text-white rounded-full font-medium hover:bg-[#1d2e7a] transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  Request Quote
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>

                <a href="#services" className="group inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                  <Play className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
                  Our Services
                </a>
              </div>
            </div>

            {/* Right Geometric Shapes */}
            <div className="relative h-96 lg:h-full">
              <div 
                ref={(el) => { shapeRefs.current[0] = el; }}
                className="absolute top-8 right-12 w-32 h-20 bg-[#f1ec43] rounded-2xl transform rotate-6 shadow-sm"
              />
              
              <div 
                ref={(el) => { shapeRefs.current[1] = el; }}
                className="absolute top-16 right-8 w-48 h-32 bg-[#29419a] rounded-2xl transform rotate-12 shadow-lg"
              />
              
              <div 
                ref={(el) => { shapeRefs.current[2] = el; }}
                className="absolute top-4 left-12 w-16 h-16 bg-[#29419a] bg-opacity-80 rounded-xl transform -rotate-12 shadow-md"
              />
              
              <div 
                ref={(el) => { shapeRefs.current[3] = el; }}
                className="absolute top-1/3 right-4 w-12 h-12 bg-[#f1ec43] rounded-full shadow-sm"
              />
              
              <div 
                ref={(el) => { shapeRefs.current[4] = el; }}
                className="absolute bottom-32 right-16 w-12 h-12 bg-[#29419a] rounded-lg transform rotate-45 shadow-md"
              />
              
              <div 
                ref={(el) => { shapeRefs.current[5] = el; }}
                className="absolute bottom-16 left-4 w-40 h-24 bg-[#29419a] bg-opacity-10 rounded-2xl transform -rotate-6 shadow-sm"
              />
              
              <div 
                ref={(el) => { shapeRefs.current[6] = el; }}
                className="absolute bottom-8 right-32 w-8 h-8 bg-[#f1ec43] rounded-lg transform rotate-12"
              />
              
              <div 
                ref={(el) => { shapeRefs.current[7] = el; }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"
              >
                <div className="grid grid-cols-6 gap-2">
                  {[...Array(18)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${
                        i % 3 === 0 ? 'bg-[#f1ec43]' : 'bg-[#29419a] bg-opacity-60'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Overview Section */}
      <div ref={aboutRef} className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#29419a]">Alnoras</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Alnoras Integrated Solutions is your comprehensive partner connecting Sudan to global markets. 
              We specialize in car rental, mechanical workshops, transport logistics, import & export services, 
              and clean energy solutions - driving Sudan's economic growth through reliable, professional services.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Company Overview Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#29419a] rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To be Sudan's leading integrated solutions provider, bridging local expertise with global standards 
                      across transportation, logistics, and energy sectors.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#f1ec43] rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                      From Sudan to the world and vice versa - we deliver comprehensive solutions that support 
                      infrastructure development, facilitate trade, and promote sustainable growth.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#29419a] rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Commitment</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We handle industrial machinery imports, agricultural product exports, and provide 
                      end-to-end logistics solutions with the highest standards of professionalism and reliability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">

              </div>
            </div>

            {/* Image Slider */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden z-20">
                <div className="relative h-96">
                  <img 
                    src={sliderContent[currentImage].image}
                    alt={sliderContent[currentImage].title}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {sliderContent[currentImage].title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {sliderContent[currentImage].description}
                    </p>
                  </div>
                  
                  {/* Slider controls */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {sliderContent.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImage 
                            ? 'bg-white w-6' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Partner with Alnoras?
              </h3>
              <p className="text-gray-600">
                Whether you need import/export services, transportation solutions, or energy systems, 
                we're here to support your business growth across Sudan and beyond.
              </p>
            </div>
            <a href="#contact" className="group inline-flex items-center justify-center px-8 py-4 bg-[#29419a] text-white rounded-full font-medium hover:bg-[#1d2e7a] transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  Request Quote
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// GSAP CDN injection with proper loading sequence
if (typeof window !== 'undefined' && !window.gsap) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
  script.onload = () => {
    const stScript = document.createElement('script');
    stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    stScript.onload = () => {
      // Register ScrollTrigger after it's loaded
      window.gsap.registerPlugin(window.ScrollTrigger);
    };  
    document.head.appendChild(stScript);
  };
  document.head.appendChild(script);
}

export default ModernAlnorasHero;
