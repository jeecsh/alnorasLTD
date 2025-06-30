"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Package, Truck, Factory, Wheat, Globe, ArrowUpRight, ArrowDownLeft, Sparkles, TrendingUp, Ship, Plane, Zap, Target, Shield, Award, Phone, Mail, MapPin, CheckCircle, Clock, Users, MessageCircle, ChevronRight, Play, Pause, Send, Navigation, ArrowRight } from 'lucide-react';
import { useGsap } from '../lib/gsap';

const ModernImportExportSections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const gsapLoaded = useGsap();
  const [activeTab, setActiveTab] = useState('import');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Hero slider data
  const heroSlides = {
    import: [
      {
        image: "/mna.jpg",
        title: "From Global Ports to Your Doorstep",
        subtitle: "State-of-the-art machinery delivered with full customs clearance and installation support",
        stat: "500+",
        statLabel: "Machines Imported"
      },
      {
        image: "/ind.jpeg",
        title: "Industrial Excellence Delivered",
        subtitle: "Premium manufacturing equipment from trusted global suppliers",
        stat: "25+",
        statLabel: "Countries Sourced"
      },
      {
        image: "con.jpg",
        title: "Construction Power Solutions",
        subtitle: "Heavy machinery and construction equipment for Sudan's infrastructure",
        stat: "95%",
        statLabel: "Client Satisfaction"
      }
    ],
    export: [
      {
        image: "/qual.jpg",
        title: "Premium Quality, Global Standards",
        subtitle: "Exporting Sudan's agricultural wealth and natural resources to markets worldwide",
        stat: "30+",
        statLabel: "Export Markets"
      },
      {
        image: "sms.webp",
        title: "Agricultural Excellence Worldwide",
        subtitle: "Premium sesame, gum arabic, and cotton reaching international markets",
        stat: "50K+",
        statLabel: "Tons Exported"
      },
      {
        image: "/nat.jpg",
        title: "Natural Resources Global Trade",
        subtitle: "Connecting Sudan's mineral wealth with international buyers",
        stat: "15+",
        statLabel: "Years Experience"
      }
    ]
  };

  // Mount handler
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (isPaused || !hasMounted) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides[activeTab].length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTab, isPaused, heroSlides, hasMounted]);

  // Initialize animations with proper cleanup
  useEffect(() => {
    if (!gsapLoaded || !window.gsap || !window.ScrollTrigger || !hasMounted) return;

    // Create unique context for this component
    const ctx = window.gsap.context(() => {
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
    }, containerRef);

    return () => {
      ctx.revert(); // Clean up all animations in this context
    };
  }, [gsapLoaded, hasMounted]);

  const sendWhatsAppMessage = (category, type = 'import') => {
    const phoneNumber = '+249123456789';
    let message = '';
    
    if (type === 'import') {
      message = `Hello! I'm interested in learning more about ${category.title}. Specifically, I'd like information about:\n`;
      category.items.forEach(item => {
        message += `• ${item}\n`;
      });
      message += `\nCould you please provide more details about pricing, delivery times, and specifications?`;
    } else {
      message = `Hello! I'm interested in your export services for ${category.title}. I'd like to know more about:\n`;
      category.items.forEach(item => {
        message += `• ${item}\n`;
      });
      message += `\nPlease share details about export procedures, pricing, and minimum order quantities.`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const importCategories = [
    { 
      icon: Wheat, 
      title: "Agricultural Machinery", 
      items: ["Tractors & Harvesters", "Irrigation Pumps", "Planting Equipment"],
      image: "agr.jpg",
      color: "",
      description: "Advanced farming equipment to boost agricultural productivity"
    },
    { 
      icon: Factory, 
      title: "Industrial Machinery", 
      items: ["Oil Press Machines", "Food Processing Units", "Packaging Lines"],
      image: "/indd.avif",
      color: "",
      description: "High-quality industrial equipment for manufacturing excellence"
    },
    { 
      icon: Truck, 
      title: "Construction Equipment", 
      items: ["Concrete Mixers", "Loaders & Compactors", "Heavy Machinery"],
      image: "/coneq.jpg",
      color: "",
      description: "Heavy-duty construction machines for infrastructure development"
    },
    { 
      icon: Package, 
      title: "Factory Equipment", 
      items: ["Conveyor Belts", "Filling Machines", "Custom Tools"],
      image: "fac.png",
      color: "",
      description: "Specialized factory equipment for streamlined production"
    }
  ];

  const exportProducts = [
    { 
      icon: Wheat, 
      title: "Agricultural Products", 
      items: ["Premium Sesame Seeds", "High-Quality Gum Arabic", "Organic Cotton"],
      image: "/ss.png",
      volume: "50,000+ tons/year",
      color: "",
      description: "Sudan's finest agricultural exports meeting global standards"
    },
    { 
      icon: Zap, 
      title: "Minerals & Resources", 
      items: ["Gold & Precious Metals", "Chrome Ore", "Iron Ore"],
      image: "/min.webp",
      volume: "25,000+ tons/year",
      color: "",
      description: "Rich mineral resources from Sudan's abundant deposits"
    },
    { 
      icon: Package, 
      title: "Manufactured Goods", 
      items: ["Textiles & Garments", "Processed Foods", "Handicrafts"],
      image: "/mann.jpeg",
      volume: "10,000+ units/month",
      color: "",
      description: "Quality manufactured products showcasing Sudanese craftsmanship"
    }
  ];

  const features = [
    { icon: Shield, title: "CE & ISO Certified", desc: "Quality guaranteed suppliers" },
    { icon: Ship, title: "Full Logistics Support", desc: "Shipping & customs clearance" },
    { icon: CheckCircle, title: "Warranty Included", desc: "Installation & support guidance" },
    { icon: Globe, title: "Global Network", desc: "50+ countries worldwide" }
  ];

  if (!hasMounted) return null;

  const currentHeroSlide = heroSlides[activeTab][currentSlide];

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

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto text-center space-y-12 relative z-10">
          {/* Main Hero Title */}
          <div className="hero-title space-y-6">
            <h1 className="text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none">
              <span className="block bg-gradient-to-r from-white via-[#f1ec43] to-white bg-clip-text text-transparent">
                POWERING
              </span>
              <span className="block bg-gradient-to-r from-[#f1ec43] via-white to-[#f1ec43] bg-clip-text text-transparent">
                SUDAN'S
              </span>
              <span className="block bg-gradient-to-r from-white via-[#f1ec43] to-white bg-clip-text text-transparent">
                GROWTH
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              From Port Sudan to every corner of the nation - we import the machinery that builds tomorrow and export Sudan's finest to the world
            </p>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="hero-title flex flex-col sm:flex-row justify-center gap-4 sm:gap-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 mx-auto">
              <div className="flex flex-col sm:flex-row">
                <button
                  onClick={() => {
                    setActiveTab('import');
                    setCurrentSlide(0);
                  }}
                  className={`px-6 sm:px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                    activeTab === 'import' 
                      ? 'bg-[#f1ec43] text-[#29419a] shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ArrowDownLeft className="w-5 h-5" />
                  Import Machinery
                </button>
                <button
                  onClick={() => {
                    setActiveTab('export');
                    setCurrentSlide(0);
                  }}
                  className={`px-6 sm:px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                    activeTab === 'export' 
                      ? 'bg-[#f1ec43] text-[#29419a] shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                  Export Products
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#f1ec43] rounded-full">
                <ArrowDownLeft className="w-5 h-5 text-[#29419a]" />
                <span className="text-[#29419a] font-bold">IMPORT SOLUTIONS</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Bringing the World's Best
                </span>
                <br />
                <span className="text-[#f1ec43]">Machinery to Sudan</span>
              </h2>
            </div>

            {/* Hero Image Slider */}
            <div className="mb-16">
              <div className="relative rounded-3xl overflow-hidden">
                <div className="relative h-64 md:h-96">
                  <img 
                    key={currentSlide}
                    src={currentHeroSlide.image}
                    alt={currentHeroSlide.title}
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#29419a]/80 via-transparent to-[#29419a]/60"></div>
                  
                  {/* Slide Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 px-6 transform transition-all duration-700">
                      <h3 className="text-2xl md:text-4xl font-bold text-white animate-fade-up">
                        {currentHeroSlide.title}
                      </h3>
                      <p className="text-white/90 text-lg max-w-2xl animate-fade-up delay-200">
                        {currentHeroSlide.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating Stats */}
               <div className="absolute top-0 left-0 bg-[#f1ec43] text-[#29419a] p-2 sm:p-4 rounded-4xl shadow-2xl animate-fade-up delay-400">
                    <div className="text-sm sm:text-2xl font-black">{currentHeroSlide.stat}</div>
                    <div className="text-xs font-bold sm:text-xs">{currentHeroSlide.statLabel}</div>
                  </div>
                </div>
                {/* Slider Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                  
                  <div className="flex gap-2">
                    {heroSlides[activeTab].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-[#f1ec43] w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Categories Grid - Mobile First */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {importCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div 
                    key={index}
                    className="floating-card group cursor-pointer"
                    onClick={() => sendWhatsAppMessage(category, 'import')}
                  >
                    <div className="relative rounded-2xl border border-white/10 hover:border-[#f1ec43]/50 transition-all duration-500 transform hover:scale-105 overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
                      {/* Background Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`}></div>
                        
                        {/* Icon */}
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>

                        {/* WhatsApp Button */}
                        <div className="absolute top-4 right-4">
                          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                        <p className="text-white/70 text-sm mb-4">{category.description}</p>
                        
                        {/* Items List */}
                        <div className="space-y-2 mb-4">
                          {category.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                              <div className="w-1.5 h-1.5 bg-[#f1ec43] rounded-full flex-shrink-0"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-[#f1ec43] text-sm font-medium">Get Quote</span>
                          <ChevronRight className="w-4 h-4 text-[#f1ec43] transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-[#f1ec43] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-[#29419a]" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Export Content */}
        {activeTab === 'export' && (
          <div ref={exportRef} className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#f1ec43] rounded-full">
                <ArrowUpRight className="w-5 h-5 text-[#29419a]" />
                <span className="text-[#29419a] font-bold">EXPORT EXCELLENCE</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Sudan's Finest Products
                </span>
                <br />
                <span className="text-[#f1ec43]">Reaching Global Markets</span>
              </h2>
            </div>

            {/* Hero Image Slider */}
            <div className="mb-16">
              <div className="relative rounded-3xl overflow-hidden">
                <div className="relative h-64 md:h-96">
                  <img 
                    key={currentSlide}
                    src={currentHeroSlide.image}
                    alt={currentHeroSlide.title}
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#29419a]/80 via-transparent to-[#29419a]/60"></div>
                  
                  {/* Slide Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 px-6 transform transition-all duration-700">
                      <h3 className="text-2xl md:text-4xl font-bold text-white animate-fade-up">
                        {currentHeroSlide.title}
                      </h3>
                      <p className="text-white/90 text-lg max-w-2xl animate-fade-up delay-200">
                        {currentHeroSlide.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute top-0 left-0 bg-[#f1ec43] text-[#29419a] p-2 sm:p-4 rounded-4xl shadow-2xl animate-fade-up delay-400">
                    <div className="text-sm sm:text-2xl font-black">{currentHeroSlide.stat}</div>
                    <div className="text-xs font-bold sm:text-xs">{currentHeroSlide.statLabel}</div>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                  
                  <div className="flex gap-2">
                    {heroSlides[activeTab].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-[#f1ec43] w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Export Products Grid - Mobile First */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {exportProducts.map((product, index) => {
                const IconComponent = product.icon;
                return (
                  <div 
                    key={index}
                    className="floating-card group cursor-pointer"
                    onClick={() => sendWhatsAppMessage(product, 'export')}
                  >
                    <div className="relative rounded-2xl border border-white/10 hover:border-[#f1ec43]/50 transition-all duration-500 transform hover:scale-105 overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
                      {/* Background Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-80`}></div>
                        
                        {/* Icon */}
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>

                        {/* Volume Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-[#f1ec43] text-[#29419a] px-3 py-1 rounded-full text-xs font-bold">
                            {product.volume}
                          </div>
                        </div>

                        {/* WhatsApp Button */}
                        <div className="absolute bottom-4 right-4">
                          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                                              <p className="text-white/70 text-sm mb-4">{product.description}</p>
                        
                        {/* Items List */}
                        <div className="space-y-2 mb-4">
                          {product.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                              <div className="w-1.5 h-1.5 bg-[#f1ec43] rounded-full flex-shrink-0"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-[#f1ec43] text-sm font-medium">Inquire Now</span>
                          <ChevronRight className="w-4 h-4 text-[#f1ec43] transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Export Process Flow */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 mb-12 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">Our Export Process</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
                {[
                  { icon: Target, title: "Quality Control", desc: "Rigorous testing and certification" },
                  { icon: Package, title: "Professional Packaging", desc: "International shipping standards" },
                  { icon: Ship, title: "Global Logistics", desc: "Efficient worldwide delivery" },
                  { icon: CheckCircle, title: "Market Delivery", desc: "On-time, quality guaranteed" }
                ].map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="text-center relative z-10">
                      <div className="w-16 h-16 bg-[#f1ec43] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-[#29419a]" />
                      </div>
                      <h4 className="font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-white/70 text-sm">{step.desc}</p>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-[#f1ec43]/20"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>


          </div>
        )}
      </section>

     
        

  

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.5s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default ModernImportExportSections;
