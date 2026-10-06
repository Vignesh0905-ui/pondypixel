import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // DESKTOP ONLY: Disable on touch/mobile devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || window.innerWidth < 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0px)`;
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Outer Adaptive Ring */}
      <div
        className={`rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-8 h-8 border-[#35A7FF] bg-[#35A7FF]/15 scale-110'
            : 'w-4 h-4 border-white/50 bg-transparent'
        }`}
      >
        {/* Center Minimal Dot */}
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovered ? 'w-1.5 h-1.5 bg-[#35A7FF]' : 'w-1 h-1 bg-white'
          }`}
        />
      </div>
    </div>
  );
};

