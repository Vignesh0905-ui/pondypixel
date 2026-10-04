import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Respect user's reduced motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Projects Section 3D Reveal Stagger
      const projectCards = document.querySelectorAll('#projects .card-3d-wrapper');
      if (projectCards.length > 0) {
        gsap.fromTo(
          projectCards,
          {
            opacity: 0,
            y: 90,
            rotateY: -8,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#projects',
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. About Section Highlights Stagger
      const aboutCards = document.querySelectorAll('#about .about-card');
      if (aboutCards.length > 0) {
        gsap.fromTo(
          aboutCards,
          {
            opacity: 0,
            x: -40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#about',
              start: 'top 80%',
            },
          }
        );
      }

      // 4. Pricing Section Cards Stagger
      const pricingCards = document.querySelectorAll('#pricing .pricing-card');
      if (pricingCards.length > 0) {
        gsap.fromTo(
          pricingCards,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#pricing',
              start: 'top 75%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);
};
