"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Package, Truck, Factory, Wheat, Globe, ArrowUpRight, ArrowDownLeft, Sparkles, TrendingUp, Ship, Plane, Zap, Target, Shield, Award } from 'lucide-react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const ModernImportExportSections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('import');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Load GSAP dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.gsap) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = () => {
        const stScript = document.createElement('script');
        stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        stScript.onload = () => {
          window.gsap.registerPlugin(window.ScrollTrigger);
          setGsapLoaded(true);
        };
        document.head.appendChild(stScript);
      };
      document.head.appendChild(script);
    } else if (window.gsap) {
      setGsapLoaded(true);
    }
  }, []);

  // Initialize advanced animations
  useEffect(() => {
    if (!gsapLoaded || !window.gsap || !window.ScrollTrigger) return;

    // Hero section morphing animation
    window.gsap.from(".hero-title", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.2
    });

    // Floating cards animation
    window.gsap.from(".floating-card", {
      scrollTrigger: {
        trigger: importRef.current,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.1
    });

    // Stats counter animation
    window.gsap.from(".stat-number", {
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      scale: 0,
      rotation: 180,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.1
    });

    return () => {
      window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gsapLoaded]);

  const importFeatures = [
    { icon: Factory, text: "Industrial Machinery", desc: "Advanced manufacturing equipment", color: "from-blue-500/15 via-blue-400/8 to-blue-400" },
    { icon: Wheat, text: "Agricultural Equipment", desc: "Modern farming solutions", color: "from-blue-500/15 via-blue-400/8 to-blue-400" },
    { icon: Truck, text: "Heavy Vehicles", desc: "Commercial transport fleet", color: "from-blue-500/15 via-blue-400/8 to-blue-400" },
    { icon: Package, text: "Construction Tools", desc: "Infrastructure development", color: "from-blue-500/15 via-blue-400/8 to-blue-400" }
  ];

  const exportFeatures = [
    { icon: Globe, text: "Global Distribution", desc: "Worldwide network reach", color: "from-blue-500/15 via-blue-400/8 to-blue-400" },
    { icon: TrendingUp, text: "Quality Products", desc: "Premium grade exports", color: "from-blue-500/15 via-blue-400/8 to-blue-400" },
    { icon: Ship, text: "Bulk Shipping", desc: "Large-scale logistics", color: "from-blue-500/15 via-blue-400/8 to-blue-400" },
    { icon: Plane, text: "Express Delivery", desc: "Fast international shipping", color: "ffrom-blue-500/15 via-blue-400/8 to-blue-400" }
  ];

  return (
    <div ref={containerRef} className="bg-[#29419a] text-white min-h-screen overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f1ec43 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Hero Section with Split Design */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f1ec43]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto text-center space-y-12 relative z-10">
          {/* Main Hero Title */}
          <div className="hero-title space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none">
              <span className="block bg-gradient-to-r from-white via-[#f1ec43] to-white bg-clip-text text-transparent">
                TRADE
              </span>
              <span className="block bg-gradient-to-r from-[#f1ec43] via-white to-[#f1ec43] bg-clip-text text-transparent">
                BEYOND
              </span>
              <span className="block bg-gradient-to-r from-white via-[#f1ec43] to-white bg-clip-text text-transparent">
                BORDERS
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing Sudan's trade landscape with cutting-edge import and export solutions
            </p>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="hero-title flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('import')}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
                    activeTab === 'import' 
                      ? 'bg-[#f1ec43] text-[#29419a] shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ArrowDownLeft className="w-5 h-5" />
                  Import Division
                </button>
                <button
                  onClick={() => setActiveTab('export')}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
                    activeTab === 'export' 
                      ? 'bg-[#f1ec43] text-[#29419a] shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                  Export Division
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="relative py-20">
        {/* Import Content */}
        {activeTab === 'import' && (
          <div ref={importRef} className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#f1ec43] rounded-full border border-[#f1ec43]/30">
                <ArrowDownLeft className="w-5 h-5 text-[#29419a]" />
                <span className=" text-[#29419a] font-bold">IMPORT EXCELLENCE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Supplying Sudan with the
                </span>
                <br />
                <span className="text-[#f1ec43]">Tools of Progress</span>
              </h2>
            </div>

            {/* Advanced Grid Layout */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Content Column */}
              <div className="lg:col-span-5 space-y-8">
                <p className="text-xl text-white/90 leading-relaxed">
                  We import high-quality industrial and agricultural machines to support Sudan's development and infrastructure. From small farms to major factories, we bring the tools you need to build a stronger tomorrow.
                </p>

                {/* Feature Cards */}
                <div className="space-y-4">
                  {importFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div 
                        key={index}
                        className="floating-card group relative overflow-hidden"
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className={`p-6 bg-gradient-to-r ${feature.color} bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer transform hover:scale-105`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-white">{feature.text}</h3>
                              <p className="text-white/70 text-sm">{feature.desc}</p>
                            </div>
                            <ArrowUpRight className={`w-5 h-5 text-white/50 transition-all duration-300 ${hoveredCard === index ? 'translate-x-1 -translate-y-1 text-white' : ''}`} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Visual Column */}
              <div className="lg:col-span-7">
                <div className="relative">
                  {/* Main Visual Container */}
                  <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                    {/* Interactive Image Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {[
                        { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop", label: "Industrial" },
                        { src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=400&fit=crop", label: "Agricultural" },
                        { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop", label: "Transport" },
                        { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop", label: "Construction" }
                      ].map((item, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                          <img 
                            src={item.src} 
                            alt={item.label}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-white font-bold">{item.label} Equipment</h4>
                            <div className="w-full h-1 bg-white/20 rounded-full mt-2">
                              <div className="h-full bg-[#f1ec43] rounded-full transition-all duration-1000 group-hover:w-full" style={{width: '30%'}}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Flow Visualization */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Globe className="w-6 h-6 text-blue-300" />
                        </div>
                        <span className="text-white/70 text-sm">Global Sources</span>
                      </div>
                      
                      <div className="flex-1 mx-6 h-1 bg-gradient-to-r from-blue-500/20 via-[#f1ec43]/40 to-[#f1ec43]/20 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-[#f1ec43] rounded-full animate-pulse"></div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-white/70 text-sm">Sudan Markets</span>
                        <div className="w-12 h-12 bg-[#f1ec43]/20 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-[#f1ec43]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -top-6 -right-6 bg-[#f1ec43] text-[#29419a] p-4 rounded-2xl shadow-2xl">
                    <div className="text-2xl font-black">50+</div>
                    <div className="text-xs font-bold">Countries</div>
                  </div>
                  
                
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Content */}
        {activeTab === 'export' && (
          <div ref={exportRef} className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#f1ec43]                                                                                                                                                                                              rounded-full border border-[#f1ec43]/30">
                <ArrowUpRight className="w-5 h-5 text-[#29419a]" />
                <span className="text-[#29419a] font-bold">EXPORT EXCELLENCE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Sharing Sudan's
                </span>
                <br />
                <span className="text-[#f1ec43]">Excellence Worldwide</span>
              </h2>                                                                                                                             
            </div>                          
                                                            
            {/* Advanced Grid Layout */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Visual Column */}
              <div className="lg:col-span-7 lg:order-1">
                <div className="relative">
                  {/* Main Visual Container */}
                  <div className="bg-gradient-to-br from-[#f1ec43]/5 to-orange-500/5 backdrop-blur-sm rounded-3xl p-8 border border-[#f1ec43]/20">
                    {/* Interactive Image Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {[
                        { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop", label: "Sea Freight" },
                        { src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&h=400&fit=crop", label: "Air Freight" },
                        { src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=400&fit=crop", label: "Agriculture" },
                        { src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=400&fit=crop", label: "Quality Control" }
                      ].map((item, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                          <img 
                            src={item.src} 
                            alt={item.label}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-white font-bold">{item.label}</h4>
                            <div className="w-full h-1 bg-white/20 rounded-full mt-2">
                              <div className="h-full bg-[#f1ec43] rounded-full transition-all duration-1000 group-hover:w-full" style={{width: '45%'}}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Flow Visualization */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#f1ec43]/20 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-[#f1ec43]" />
                        </div>
                        <span className="text-white/70 text-sm">Sudan Products</span>
                      </div>
                      
                      <div className="flex-1 mx-6 h-1 bg-gradient-to-r from-[#f1ec43]/20 via-orange-500/40 to-red-500/20 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f1ec43] to-orange-500 rounded-full animate-pulse"></div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-white/70 text-sm">Global Markets</span>
                        <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                          <Globe className="w-6 h-6 text-orange-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -top-6 -left-6 bg-[#f1ec43] text-[#29419a] p-4 rounded-2xl shadow-2xl">
                    <div className="text-2xl font-black">30+</div>
                    <div className="text-xs font-bold">Markets</div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl border border-white/20">
                    <div className="text-2xl font-black text-[#f1ec43]">A+</div>
                    <div className="text-xs font-bold">Grade</div>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-5 lg:order-2 space-y-8">
                <p className="text-xl text-white/90 leading-relaxed">
                  We export Sudan's finest agricultural products, minerals, and manufactured goods to international markets. Our commitment to quality and reliability has made us a trusted partner in global trade.
                </p>

                {/* Feature Cards */}
                <div className="space-y-4">
                  {exportFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div 
                        key={index}
                        className="floating-card group relative overflow-hidden"
                        onMouseEnter={() => setHoveredCard(index + 4)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className={`p-6 bg-gradient-to-r ${feature.color} bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer transform hover:scale-105`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-white">{feature.text}</h3>
                              <p className="text-white/70 text-sm">{feature.desc}</p>
                            </div>
                            <ArrowUpRight className={`w-5 h-5 text-white/50 transition-all duration-300 ${hoveredCard === index + 4 ? 'translate-x-1 -translate-y-1 text-white' : ''}`} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

   

      {/* Floating Action Element */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="group bg-[#f1ec43] text-[#29419a] p-4 rounded-2xl shadow-2xl cursor-pointer transform hover:scale-110 transition-all duration-300">
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default ModernImportExportSections;