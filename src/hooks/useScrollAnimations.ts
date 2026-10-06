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
      // Shared 3D-tilt reveal vars: cards land with a subtle rotateX depth.
      const revealVars = {
        opacity: 0,
        y: 40,
        rotateX: 6,
        transformPerspective: 600,
        transformOrigin: '50% 100%',
      };
      const revealTo = {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      };

      // 1. Projects Section Reveal
      const projectCards = document.querySelectorAll('#projects .card-3d-wrapper');
      if (projectCards.length > 0) {
        gsap.fromTo(
          projectCards,
          revealVars,
          {
            ...revealTo,
            scrollTrigger: {
              trigger: '#projects',
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 2. About Section Stagger
      const aboutCards = document.querySelectorAll('#about .about-card');
      if (aboutCards.length > 0) {
        gsap.fromTo(
          aboutCards,
          { ...revealVars, y: 30 },
          {
            ...revealTo,
            y: 0,
            scrollTrigger: {
              trigger: '#about',
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 3. Pricing Section Cards Stagger
      const pricingCards = document.querySelectorAll('#pricing .pricing-card');
      if (pricingCards.length > 0) {
        gsap.fromTo(
          pricingCards,
          { ...revealVars, y: 30 },
          {
            ...revealTo,
            y: 0,
            scrollTrigger: {
              trigger: '#pricing',
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 4. Section Heading Reveals (once-only: fade + rise + micro scale)
      const headingRevealVars = { opacity: 0, y: 24, scale: 0.98 };
      const headingRevealTo = {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
      };

      ['#about', '#services', '#projects', '#pricing', '#contact'].forEach((id) => {
        const el = document.querySelector<HTMLElement>(`${id} h2`);
        if (!el) return;
        gsap.fromTo(el, headingRevealVars, {
          ...headingRevealTo,
          scrollTrigger: {
            trigger: id,
            start: 'top 85%',
            once: true,
          },
        });
      });

      // 5. Hero depth separation on scroll: foreground content exits slightly
      //    ahead of the page while the background glow lags behind.
      const heroSection = document.querySelector<HTMLElement>('main > section:first-child');
      const heroContent = document.querySelector<HTMLElement>('[data-hero-content]');
      const heroGlow = document.querySelector<HTMLElement>('[data-hero-glow]');

      if (heroSection && heroContent) {
        gsap.fromTo(
          heroContent,
          { y: 0 },
          {
            y: -70,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      if (heroSection && heroGlow) {
        gsap.fromTo(
          heroGlow,
          { y: 0 },
          {
            y: 45,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }

      // 6. Cinematic scroll parallax on decorative glow layers.
      //    Relative `+=` tweens preserve any existing centering transforms.
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.12') || 0.12;
        gsap.to(el, {
          y: `+=${(speed * 180).toFixed(1)}`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
};
