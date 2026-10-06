import React, { useState, useEffect, useRef } from 'react';
import { ResumeModal } from './ResumeModal';
import { Sparkles, ArrowRight, FileText } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export const Hero: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const paraRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement | null>(null);
  const resumeCtaRef = useRef<HTMLButtonElement | null>(null);

  // Magnetic cursor-follow on existing CTAs (writes CSS `translate`, composes
  // safely with the Tailwind transform utilities on the buttons).
  useMagnetic(primaryCtaRef, { strength: 6, radius: 130 });
  useMagnetic(resumeCtaRef, { strength: 6, radius: 130 });

  const brandName = 'PondyPixel';
  const letters = brandName.split('');

  // Single RAF loop driving all hero depth layers with lerped/damped motion.
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    let isMouseActive = false;
    let isHeroVisible = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let animFrame: number | null = null;
    const pos = { currentX: 0, currentY: 0, currentRot: 0, targetX: 0, targetY: 0, targetRot: 0 };

    // Pause all pointer work while the hero is scrolled out of view.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible === isHeroVisible) return;
        isHeroVisible = visible;
        if (!visible) {
          isMouseActive = false;
          pos.targetX = 0;
          pos.targetY = 0;
          pos.targetRot = 0;
          if (idleTimer) clearTimeout(idleTimer);
          if (animFrame !== null) {
            cancelAnimationFrame(animFrame);
            animFrame = null;
          }
          clearTransforms();
        }
      },
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    // Depth layers: background glow moves opposite & slowest, foreground
    // elements scale up toward the heading (main visual) for parallax depth.
    const layers: Array<{ el: React.RefObject<HTMLDivElement>; factor: number }> = [];
    const getLayers = () => {
      if (layers.length === 0 && glowRef.current && badgeRef.current && paraRef.current && ctaRef.current) {
        layers.push(
          { el: glowRef, factor: -0.7 },
          { el: badgeRef, factor: 0.35 },
          { el: paraRef, factor: 0.5 },
          { el: ctaRef, factor: 0.65 }
        );
      }
      return layers;
    };

    const applyTransforms = () => {
      const nx = pos.currentX / 10;
      const ny = pos.currentY / 10;

      if (headingRef.current) {
        headingRef.current.style.transform =
          `translate3d(${pos.currentX.toFixed(2)}px, ${pos.currentY.toFixed(2)}px, 0px) ` +
          `rotate(${pos.currentRot.toFixed(2)}deg) rotateX(${(-ny * 1.5).toFixed(2)}deg) rotateY(${(nx * 1.8).toFixed(2)}deg)`;
      }

      for (const layer of getLayers()) {
        if (layer.el.current) {
          layer.el.current.style.transform =
            `translate3d(${(nx * 10 * layer.factor).toFixed(2)}px, ${(ny * 10 * layer.factor).toFixed(2)}px, 0px)`;
        }
      }
    };

    const clearTransforms = () => {
      if (headingRef.current) headingRef.current.style.transform = '';
      for (const layer of getLayers()) {
        if (layer.el.current) layer.el.current.style.transform = '';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHeroVisible || !headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const maxDist = 450;
      const dist = Math.hypot(deltaX, deltaY);

      if (dist < maxDist) {
        const maxOffset = 10;
        pos.targetX = (deltaX / maxDist) * maxOffset;
        pos.targetY = (deltaY / maxDist) * maxOffset;
        pos.targetRot = (deltaX / maxDist) * 1.0;
      } else {
        pos.targetX = 0;
        pos.targetY = 0;
        pos.targetRot = 0;
      }

      isMouseActive = true;
      ensureRunning();
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        // Return smoothly to neutral when the pointer goes idle.
        isMouseActive = false;
        pos.targetX = 0;
        pos.targetY = 0;
        pos.targetRot = 0;
        ensureRunning();
      }, 1000);
    };

    const animate = () => {
      const lerp = 0.12;
      pos.currentX += (pos.targetX - pos.currentX) * lerp;
      pos.currentY += (pos.targetY - pos.currentY) * lerp;
      pos.currentRot += (pos.targetRot - pos.currentRot) * lerp;

      const isStillMoving =
        Math.abs(pos.targetX - pos.currentX) > 0.03 ||
        Math.abs(pos.targetY - pos.currentY) > 0.03 ||
        Math.abs(pos.targetRot - pos.currentRot) > 0.01;

      if (isMouseActive || isStillMoving) {
        applyTransforms();
        animFrame = requestAnimationFrame(animate);
      } else {
        // Settled at neutral — clear styles and stop the loop entirely.
        clearTransforms();
        animFrame = null;
      }
    };

    function ensureRunning() {
      if (animFrame === null) animFrame = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (idleTimer) clearTimeout(idleTimer);
      if (animFrame !== null) cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[88vh] sm:min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 bg-bright-pattern"
    >
      
      {/* Soft Light Ambient Glow — slowest parallax depth layer */}
      <div data-hero-glow className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={glowRef}
          className="w-[600px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-[#7C3CFF]/08 via-[#35A7FF]/06 to-transparent rounded-full blur-[100px] pointer-events-none will-change-transform"
        />
      </div>

      <div
        data-hero-content
        style={{ perspective: '1200px' }}
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto"
      >
        
        {/* 1. Hero Heading: "PondyPixel" — main mouse-follow depth layer */}
        <div
          ref={headingRef}
          className="my-2 py-2 flex items-center justify-center w-full select-none will-change-transform"
        >
          <h1 className="font-outfit font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#F7F7FF] flex flex-wrap justify-center drop-shadow-md">
            {letters.map((char, index) => {
              const isPixelPart = index >= 5;
              return (
                <span
                  key={index}
                  className={`animate-letter ${
                    isPixelPart
                      ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF]'
                      : 'text-[#F7F7FF]'
                  }`}
                  style={{ animationDelay: `${(index * 0.025).toFixed(3)}s` }}
                >
                  {char}
                </span>
              );
            })}
          </h1>
        </div>

        {/* 2. Intro Reveal Step 2: "FREELANCE WEB DEVELOPER • PONDICHERRY, INDIA" (80ms) */}
        <div ref={badgeRef} className="w-full will-change-transform">
          <div className="animate-cinematic-delay-1 mt-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D101C]/80 border border-[#7C3CFF]/35 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#35A7FF] shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A738]" />
              <span className="text-center">FREELANCE WEB DEVELOPER • PONDICHERRY, INDIA</span>
            </div>
          </div>
        </div>

        {/* 3. Intro Reveal Step 3: "Creating modern websites for businesses and clients." (140ms) */}
        <div ref={paraRef} className="w-full will-change-transform">
          <p className="animate-cinematic-delay-2 mt-5 text-base sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal px-2">
            Creating modern websites for businesses and clients.
          </p>
        </div>

        {/* 4. Intro Reveal Step 4: Buttons ("VIEW PROJECTS" & "VIEW RESUME") (200ms) */}
        <div ref={ctaRef} className="w-full will-change-transform">
          <div className="animate-cinematic-delay-3 mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none">
            {/* VIEW PROJECTS */}
            <a
              ref={primaryCtaRef}
              href="#projects"
              className="btn-shimmer group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF] text-white font-bold text-xs sm:text-sm tracking-widest uppercase shadow-lg shadow-[#7C3CFF]/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </a>

            {/* VIEW RESUME */}
            <button
              ref={resumeCtaRef}
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#0D101C]/80 text-[#F7F7FF] border border-slate-700 hover:bg-[#1E293B] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-md backdrop-blur-md group w-full sm:w-auto font-bold text-xs sm:text-sm tracking-widest uppercase cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#35A7FF]" />
              <span>VIEW RESUME</span>
            </button>
          </div>
        </div>

      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </section>
  );
};



