"use client";
import React, { useState, useEffect, useRef } from 'react';

const ScrollSlideComponent = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on visibility in viewport
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      let progress = Math.min(1, Math.max(0, visibleHeight / rect.height));
      
      // Apply slight easing for smoothness
      progress = easeInOutQuad(progress);
      
      setScrollProgress(progress);
    };

    // Simple quadratic easing function
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    // Throttle with requestAnimationFrame
    const throttledScroll = () => {
      if (animationRef.current) return;
      animationRef.current = requestAnimationFrame(() => {
        handleScroll();
        animationRef.current = null;
      });
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  return (
    <div className="min-h-auto">
      <section 
        ref={sectionRef}
        className="relative w-full h-60 bg-[#29419a] overflow-hidden"
      >
        {/* Yellow sliding background - removed transform for better performance */}
        <div 
          className="absolute top-0 left-0 h-full bg-[#f1ec43] transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
          }}
        />
        
        {/* Text content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
          <h3 
            className="text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300"
            style={{
              color: scrollProgress > 0.3 ? '#29419a' : 'transparent'
            }}
          >
            Ready to Work Together?
          </h3>
          <p 
            className="text-sm md:text-base transition-colors duration-300"
            style={{
              color: scrollProgress > 0.3 ? '#29419a' : '#transparent'
            }}
          >
            Contact us today and let's discuss how we can help your business grow and succeed.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ScrollSlideComponent;