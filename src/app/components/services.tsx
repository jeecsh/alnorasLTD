"use client";

import React, { useRef, useEffect } from 'react';
import { Car, Wrench, Truck, Sun, ArrowRight, Sparkles } from 'lucide-react';
import { useGsap } from '../lib/gsap';

const OurServices = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const gsapLoaded = useGsap();

  useEffect(() => {
    if (!gsapLoaded || !servicesRef.current) return;

    const ctx = window.gsap.context(() => {
      // Animation for the main circle
      if (circleRef.current) {
        window.gsap.fromTo(circleRef.current, 
          {
            scaleX: 0,
          },
          {
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play none none none",
            },
            scaleX: 1,
            duration: 1.5,
            ease: "power3.out",
          }
        );
      }

      // Staggered animation for service cards with better fallback
      const validItems = serviceItemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        window.gsap.fromTo(validItems,
          {
            opacity: 0,
            y: 80,
            rotationX: 45,
          },
          {
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          }
        );
      }
    }, servicesRef);

    return () => ctx.revert();
  }, [gsapLoaded]);

  const services = [
    {
      icon: Car,
      title: "Car Rental",
      description: "Diverse range of vehicles including economy cars, SUVs & 4x4s, vans, buses, and heavy machinery.",
      moreInfo: "Optional chauffeur services available to make your journey convenient and hassle-free.",
      bgGradient: "from-blue-500/15 via-blue-400/8 to-blue-400",
      iconBg: "bg-blue-500/20",
      accentColor: "text-blue-300"
    },
    { 
      icon: Wrench,
      title: "Mechanic Workshop",
      description: "Top-notch vehicle care in our fully equipped mechanic workshop with expert technicians.",
      moreInfo: "Full-system diagnostics, AC repairs, body work, painting, tire maintenance, and GPS tracking installation.",
      bgGradient: "from-blue-500/15 via-blue-400/8 to-blue-400",
      iconBg: "bg-blue-500/20",
      accentColor: "text-blue-300"
    },
    {
      icon: Truck,
      title: "Transportation",
      description: "Reliable and flexible transportation services for goods across all states of Sudan.",
      moreInfo: "Complete import/export solutions with customized transport capacities for your business needs.",
      bgGradient: "from-blue-500/15 via-blue-400/8 to-blue-400",
      iconBg: "bg-blue-500/20",
      accentColor: "text-blue-300"
    },
    {
      icon: Sun,
      title: "Clean Energy",
      description: "Sustainable energy solutions for homes and businesses with cutting-edge technology.",
      moreInfo: "Solar installations, energy storage systems, and consultancy for maximum efficiency and savings.",
      bgGradient: "from-blue-500/15 via-blue-400/8 to-blue-400",
      iconBg: "bg-blue-500/20",
      accentColor: "text-blue-300"
    }
  ];

  return (
    <section 
      ref={servicesRef}
      className="relative bg-[#29419a] text-white py-32 overflow-hidden"
      id="services-section"
    >
      {/* Enhanced White Half-Circle with gradient */}
      <div 
        ref={circleRef}
        className="absolute -top-[60vw] left-1/2 transform -translate-x-1/2 w-[200vw] h-[80vw] bg-gradient-to-b from-white to-gray-50 rounded-full z-0"
        style={{ clipPath: 'circle(50% at 50% 0%)' }}
      />
      
      {/* Animated decorative elements */}
      <div className="absolute top-20 right-0 w-32 h-32 bg-[#f1ec43] bg-opacity-20 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-[#f1ec43] bg-opacity-30 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 mt-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block mb-4 group">
            <span className="px-6 py-3 bg-[#f1ec43] text-[#29419a] rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              What We Offer
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
            Comprehensive solutions tailored to meet your business needs with excellence and innovation across Sudan and beyond.
          </p>
        </div>

        {/* Services Grid - Better visibility and animation handling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <div 
                key={index}
                ref={(el) => {
                  serviceItemsRef.current[index] = el;
                }}
                className="group h-[420px] perspective-1000"
                style={{
                  // Better fallback styles with proper visibility
                  opacity: gsapLoaded ? undefined : 1,
                  transform: gsapLoaded ? undefined : 'translateY(0px) rotateX(0deg)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Service Card with fixed height */}
                <div className={`relative h-full bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/30 hover:shadow-2xl hover:shadow-blue-500/20`}>
                  
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card content */}
                  <div className="relative h-full flex flex-col p-6">
                    
                    {/* Icon Section */}
                    <div className="mb-6 relative">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${service.iconBg} backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <IconComponent className="w-8 h-8 text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                      {/* Floating icon duplicate */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#f1ec43]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <IconComponent className="w-3 h-3 text-[#29419a]" />
                      </div>
                    </div>
                    
                    {/* Content Section with animated text */}
                    <div className="flex-grow relative overflow-hidden">
                      <h3 className="text-2xl font-bold text-white mb-4 transition-all duration-300 group-hover:text-blue-300">
                        {service.title}
                      </h3>
                      
                      {/* Main description - always visible */}
                      <div className="relative h-20 mb-4">
                        <p className="text-white/80 leading-relaxed text-sm absolute inset-0 transition-all duration-500 group-hover:transform group-hover:-translate-y-full group-hover:opacity-0">
                          {service.description}
                        </p>
                        
                        {/* More info - slides up on hover */}
                        <p className="text-white/90 leading-relaxed text-sm absolute inset-0 transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          {service.moreInfo}
                        </p>
                      </div>
                      
                      {/* Additional animated content area */}
                      <div className="h-16 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
                          <div className="flex items-center gap-2 text-xs text-white/60">
                            <div className="w-2 h-2 bg-[#f1ec43] rounded-full animate-pulse"></div>
                            <span>Premium service guaranteed</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/60 mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                            <span>24/7 support available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button className="w-full group/btn relative overflow-hidden bg-white/10 hover:bg-white text-white hover:text-[#29419a] rounded-xl py-3 px-4 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/20 hover:border-white">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Learn More
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-white scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Stats Section */}
        <div className="relative mb-16 lg:mb-20">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { number: "500+", label: "Vehicles" },
              { number: "24/7", label: "Support" },
              { number: "15+", label: "Years" },
              { number: "1000+", label: "Clients" }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="relative text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#f1ec43] mb-1 transition-all duration-300 group-hover:scale-110">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-sm md:text-base transition-all duration-300 group-hover:text-white">
                    {stat.label}
                  </div>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#f1ec43] to-blue-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Connecting lines animation */}
          <div className="absolute inset-0 mt-4 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Animated Question Section */}
        <div className="text-center relative">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden">
              {/* Main question */}
              <h3 className="relative text-2xl md:text-4xl lg:text-5xl font-bold bg-white bg-clip-text text-transparent mb-6">
                What Else Do We Offer?
              </h3>
              
              {/* Animated dots */}
              <div className="flex justify-center gap-2 mb-8">
                <div className="w-3 h-3 bg-[#f1ec43] rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-[#f1ec43] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-[#f1ec43] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              
              {/* Animated arrow indicator */}
              <div className="mt-8 flex justify-center">
                <div className="animate-bounce" style={{animationDelay: '2s'}}>
                  <ArrowRight className="w-6 h-6 text-[#f1ec43] rotate-90" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements around the question */}
          <div className="absolute -top-10 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
          <div className="absolute -bottom-10 right-1/4 w-6 h-6 bg-[#f1ec43]/30 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
          <div className="absolute top-1/2 left-10 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 right-10 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDuration: '3.5s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;