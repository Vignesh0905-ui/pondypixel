import React, { useState, useEffect, useRef } from 'react';
import { ResumeModal } from './ResumeModal';
import { Sparkles, ArrowRight, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  // Magnetic heading animation physics refs
  const posRef = useRef({ currentX: 0, currentY: 0, currentRot: 0, targetX: 0, targetY: 0, targetRot: 0 });
  const animIdRef = useRef<number | null>(null);

  const brandName = 'PondyPixel';
  const letters = brandName.split('');

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return; // Disable magnetic movement on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !headingRef.current) return;

      const headingRect = headingRef.current.getBoundingClientRect();

      // Heading center coordinates
      const headingCenterX = headingRect.left + headingRect.width / 2;
      const headingCenterY = headingRect.top + headingRect.height / 2;

      // Distance from mouse to heading center
      const deltaX = e.clientX - headingCenterX;
      const deltaY = e.clientY - headingCenterY;

      // Max interaction radius
      const maxDistance = 450;
      const dist = Math.hypot(deltaX, deltaY);

      if (dist < maxDistance) {
        // Soft magnetic pull in direction of cursor (12 - 18px max offset)
        const maxOffset = 15;
        const normX = deltaX / maxDistance;
        const normY = deltaY / maxDistance;

        posRef.current.targetX = normX * maxOffset;
        posRef.current.targetY = normY * maxOffset;

        // Rotation: Cursor left -> negative rot, Cursor right -> positive rot (max 1.5 deg)
        const maxRot = 1.5;
        posRef.current.targetRot = normX * maxRot;
      } else {
        posRef.current.targetX = 0;
        posRef.current.targetY = 0;
        posRef.current.targetRot = 0;
      }
    };

    const handleMouseLeave = () => {
      posRef.current.targetX = 0;
      posRef.current.targetY = 0;
      posRef.current.targetRot = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Continuous smooth RAF Lerp loop
    const animate = () => {
      const lerp = 0.10; // smooth fluid inertia
      const p = posRef.current;

      p.currentX += (p.targetX - p.currentX) * lerp;
      p.currentY += (p.targetY - p.currentY) * lerp;
      p.currentRot += (p.targetRot - p.currentRot) * lerp;

      if (headingRef.current) {
        headingRef.current.style.transform = `translate3d(${p.currentX.toFixed(2)}px, ${p.currentY.toFixed(2)}px, 0px) rotate(${p.currentRot.toFixed(2)}deg)`;
      }

      animIdRef.current = requestAnimationFrame(animate);
    };

    animIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      
      {/* Subtle Background Radial Glow Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#7C3CFF]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto">
        
        {/* 1. Magnetic Hero Heading: "PondyPixel" (Whole Word Moves Together) */}
        <div
          ref={headingRef}
          className="my-2 py-2 flex items-center justify-center w-full select-none transition-transform duration-75 ease-out will-change-transform"
        >
          <h1 className="font-outfit font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex">
            {letters.map((char, index) => {
              const isPixelPart = index >= 5;
              return (
                <span
                  key={index}
                  className={`animate-letter ${
                    isPixelPart
                      ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF] drop-shadow-[0_0_15px_rgba(124,60,255,0.45)]'
                      : 'text-[#F7F7FF]'
                  }`}
                  style={{ animationDelay: `${(index * 0.055).toFixed(3)}s` }}
                >
                  {char}
                </span>
              );
            })}
          </h1>
        </div>

        {/* 2. Intro Reveal Step 2: "FREELANCE WEB DEVELOPER • PONDICHERRY, INDIA" */}
        <div className="animate-cinematic-delay-1 mt-4">
          <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#0D101C]/90 border border-[#7C3CFF]/40 text-xs font-extrabold uppercase tracking-widest text-[#35A7FF] backdrop-blur-md shadow-lg shadow-[#7C3CFF]/15">
            <Sparkles className="w-4 h-4 text-[#E5A738]" />
            <span>FREELANCE WEB DEVELOPER • PONDICHERRY, INDIA</span>
          </div>
        </div>

        {/* 3. Intro Reveal Step 3: "Creating modern websites for businesses and clients." */}
        <p className="animate-cinematic-delay-2 mt-6 text-lg sm:text-xl md:text-2xl text-[#9CA3B8] max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-md">
          Creating modern websites for businesses and clients.
        </p>

        {/* 4. Intro Reveal Step 4: Buttons ("VIEW PROJECTS" & "VIEW RESUME") */}
        <div className="animate-cinematic-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* VIEW PROJECTS - Primary Gradient Button */}
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(124,60,255,0.35)] hover:shadow-[0_0_30px_rgba(53,167,255,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* VIEW RESUME - Secondary Glass Button */}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0D101C]/80 text-[#F7F7FF] border border-[#7C3CFF]/50 hover:border-[#9B5CFF] hover:shadow-[0_0_20px_rgba(124,60,255,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 backdrop-blur-md group"
          >
            <FileText className="w-4 h-4 text-[#9B5CFF] group-hover:text-[#35A7FF] transition-colors" />
            <span>VIEW RESUME</span>
          </button>
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
