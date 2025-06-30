"use client";

import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, Navigation, Sparkles, ArrowRight } from 'lucide-react';
import { useGsap } from '../lib/gsap';

const ContactUs = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const gsapLoaded = useGsap();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Initialize animations when GSAP is loaded
  useEffect(() => {
    if (!gsapLoaded || !hasMounted || !contactRef.current) return;

    const ctx = window.gsap.context(() => {
      const validItems = contactItemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        window.gsap.from(validItems, {
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 80,
          rotationX: 45,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, contactRef);

    return () => ctx.revert();
  }, [gsapLoaded, hasMounted]);


  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us Direct",
      primary: "+249110022555",
      secondary: "+249110022559",
      action: () => window.open('tel:+249110022555'),
      actionText: "Call Now",
      bgGradient: "from-blue-500/15 via-blue-400/8 to-blue-400",
      iconBg: "bg-blue-500/20",
      accentColor: "text-blue-300",
      hoverShadow: "hover:shadow-blue-500/20"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      primary: "+249110022500",
      secondary: "Quick response guaranteed",
      action: () => window.open('https://wa.me/249110022500?text=Hello, I would like to inquire about your services.', '_blank'),
      actionText: "Start Chat",
      bgGradient: "from-blue-500/15 via-blue-400/8 to-blue-400",
      iconBg: "bg-blue-500/20",
      accentColor: "text-blue-300",
      hoverShadow: "hover:shadow-blue-500/20"
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: "info@alnorasgroup.com",
      secondary: "Professional support team",
      action: () => window.open('mailto:info@alnorasgroup.com?subject=Inquiry&body=Hello, I would like to inquire about your services.', '_blank'),
      actionText: "Send Email",
      bgGradient: "from-blue-500/15 via-blue-400/8 to-blue-400",
      iconBg: "bg-blue-500/20",
      accentColor: "text-blue-300",
      hoverShadow: "hover:shadow-blue-500/20"
    }
  ];

  if (!hasMounted) return null;

  return (
    <section 
      ref={contactRef}
      className="relative bg-[#29419a] text-white py-16 md:py-24 lg:py-32"
    >
      {/* Floating particles - constrained within section */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-24">
          <div className="inline-block mb-4 group">
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-[#f1ec43] text-[#29419a] rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg flex items-center gap-2 whitespace-nowrap">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent break-words">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed px-4 break-words">
            Ready to get started? Reach out to us through any of these channels. We're here to help you with all your business needs.
          </p>
        </div>
        
        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            
            return (
              <div 
                key={index}
                ref={(el) => { contactItemsRef.current[index] = el; }}
                className="group h-auto min-h-[380px] sm:min-h-[420px]"
              >
                <div className={`relative h-full bg-gradient-to-br ${method.bgGradient} backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-white/30 hover:shadow-2xl ${method.hoverShadow}`}>
                  
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl" />
                  
                  {/* Card content */}
                  <div className="relative h-full flex flex-col p-4 sm:p-6">
                    
                    {/* Icon Section */}
                    <div className="mb-4 sm:mb-6 relative flex-shrink-0">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center ${method.iconBg} backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                      {/* Floating icon duplicate */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#f1ec43]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <IconComponent className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#29419a]" />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-grow relative overflow-hidden">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 transition-all duration-300 group-hover:text-blue-300 break-words">
                        {method.title}
                      </h3>
                      
                      {/* Main info */}
                      <div className="relative mb-3 sm:mb-4">
                        <p className="text-white/80 leading-relaxed text-sm break-all">
                          {method.primary}
                        </p>
                        <p className="text-white/60 leading-relaxed text-xs sm:text-sm mt-1 break-words">
                          {method.secondary}
                        </p>
                      </div>
                      
                      {/* Additional features */}
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <div className="w-2 h-2 bg-[#f1ec43] rounded-full animate-pulse flex-shrink-0"></div>
                          <span className="break-words">Premium service guaranteed</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" style={{animationDelay: '0.5s'}}></div>
                          <span className="break-words">24/7 support available</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button 
                        onClick={method.action}
                        className="w-full group/btn relative overflow-hidden bg-white/10 hover:bg-white text-white hover:text-[#29419a] rounded-xl py-2.5 sm:py-3 px-4 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/20 hover:border-white"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap">
                          {method.actionText}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 flex-shrink-0" />
                        </span>
                        <div className="absolute inset-0 bg-white scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Hover glow effect - contained within card */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Business Hours & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {/* Business Hours */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Business Hours</h3>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center py-2 sm:py-3 border-b border-white/10">
                <span className="font-semibold text-white/80 text-sm sm:text-base">Monday - Friday</span>
                <span className="text-blue-300 font-semibold text-sm sm:text-base">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 sm:py-3 border-b border-white/10">
                <span className="font-semibold text-white/80 text-sm sm:text-base">Saturday</span>
                <span className="text-white/60 text-sm sm:text-base">By Appointment</span>
              </div>
              <div className="flex justify-between items-center py-2 sm:py-3">
                <span className="font-semibold text-white/80 text-sm sm:text-base">Sunday</span>
                <span className="text-white/60 text-sm sm:text-base">Closed</span>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://maps.google.com/?q=PortSudan+Industrial+Area+Southeast+Minna+Hotel+Apartments', '_blank')}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f1ec43]/20 rounded-xl flex items-center justify-center">
                <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-[#f1ec43]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Find Us</h3>
            </div>
            
            {/* Map placeholder */}
            <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-500/10 to-[#f1ec43]/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-gray-100/5 to-[#f1ec43]/10 opacity-70"></div>
              
              {/* Location pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#f1ec43] rounded-full flex items-center justify-center animate-bounce border-2 border-white">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#29419a]" />
                  </div>
                  <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 sm:px-3 py-1 rounded-lg shadow-lg text-xs font-semibold text-[#29419a] whitespace-nowrap border border-white/20">
                    PortSudan Office
                  </div>
                </div>
              </div>
              
              {/* Animated ripples */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-[#f1ec43] rounded-full animate-ping opacity-30"></div>
                <div className="absolute inset-0 w-16 h-16 sm:w-24 sm:h-24 border-2 border-white rounded-full animate-ping opacity-20" style={{animationDelay: '0.5s'}}></div>
              </div>
              
              {/* Interactive overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/95 px-3 sm:px-4 py-2 rounded-lg text-[#29419a] font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg text-sm">
                  <Navigation className="w-4 h-4" />
                  Click for directions
                </div>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-white/60 text-xs sm:text-sm">Industrial Area, Southeast of Minna Hotel</p>
              <button className="mt-2 text-[#f1ec43] hover:text-white font-semibold text-xs sm:text-sm transition-colors duration-300">
                Get Directions →
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center relative max-w-4xl mx-auto">
          {/* Animated dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#f1ec43] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#f1ec43] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#f1ec43] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          
          {/* Floating elements - safely positioned within CTA section */}
          <div className="absolute -top-4 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400/30 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
          <div className="absolute -bottom-4 right-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-[#f1ec43]/30 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
