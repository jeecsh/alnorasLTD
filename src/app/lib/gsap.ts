import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    gsapLoadPromise?: Promise<void>;
  }
}

export const useGsap = () => {
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window === 'undefined') return;

      if (window.gsap && window.ScrollTrigger) {
        setGsapLoaded(true);
        return;
      }

      if (window.gsapLoadPromise) {
        try {
          await window.gsapLoadPromise;
          setGsapLoaded(true);
        } catch (error) {
          console.error('GSAP loading failed:', error);
        }
        return;
      }

      window.gsapLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => {
          const stScript = document.createElement('script');
          stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
          stScript.onload = () => {
            try {
              window.gsap.registerPlugin(window.ScrollTrigger);
              resolve();
            } catch (error) {
              reject(error);
            }
          };
          stScript.onerror = reject;
          document.head.appendChild(stScript);
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });

      try {
        await window.gsapLoadPromise;
        setGsapLoaded(true);
      } catch (error) {
        console.error('GSAP loading failed:', error);
      }
    };

    loadGSAP();
  }, []);

  return gsapLoaded;
};
