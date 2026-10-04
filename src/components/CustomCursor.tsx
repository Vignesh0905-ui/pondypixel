import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hoverState, setHoverState] = useState<'default' | 'button' | 'card'>('default');
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });

  // Physics velocity & spring-elastic state
  const velocity = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const stretch = useRef(1);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isButton = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      const isCard = target.closest('.perspective-1000, .glass-card, .stacked-card, video');

      if (isButton) {
        setHoverState('button');
      } else if (isCard) {
        setHoverState('card');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // High-performance continuous RAF Lerp + Velocity Physics Loop
    const render = () => {
      // Fast responsive center dot lerp (0.88 factor)
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.88;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.88;

      // Smooth fast trailing outer ring lerp (0.45 factor for quick responsiveness)
      const prevX = ringPos.current.x;
      const prevY = ringPos.current.y;

      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.45;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.45;

      // Calculate instantaneous velocity vector
      const vx = ringPos.current.x - prevX;
      const vy = ringPos.current.y - prevY;
      velocity.current = { x: vx, y: vy };

      const speed = Math.hypot(vx, vy);

      // Rotate towards cursor velocity direction
      if (speed > 0.5) {
        angle.current = Math.atan2(vy, vx);
      }

      // Elastic spring stretch based on cursor speed (caps smoothly at 1.35)
      const targetStretch = Math.min(1.35, 1 + speed * 0.018);
      stretch.current += (targetStretch - stretch.current) * 0.2; // Spring dampening ease back

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x.toFixed(1)}px, ${dotPos.current.y.toFixed(1)}px, 0px) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        const rad = angle.current;
        const s = stretch.current.toFixed(3);
        const invS = (1 / stretch.current).toFixed(3);
        ringRef.current.style.transform = `translate3d(${ringPos.current.x.toFixed(1)}px, ${ringPos.current.y.toFixed(1)}px, 0px) translate(-50%, -50%) rotate(${rad}rad) scale(${s}, ${invS})`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [visible]);

  if (!enabled) return null;

  const isButton = hoverState === 'button';
  const isCard = hoverState === 'card';

  return (
    <>
      {/* 1. Center Glowing Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-opacity duration-200 will-change-transform ${
          visible ? 'opacity-100' : 'opacity-0'
        } ${
          isButton
            ? 'w-3.5 h-3.5 bg-[#FFFFFF] shadow-[0_0_16px_#35A7FF]'
            : isCard
            ? 'w-4 h-4 bg-[#FFFFFF] shadow-[0_0_20px_#9B5CFF]'
            : 'w-3 h-3 bg-[#FFFFFF] shadow-[0_0_12px_#7C3CFF]'
        }`}
      />

      {/* 2. Large Floating 3D Cursor Ring with Atmospheric Glow */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border-2 transition-all duration-200 ease-out flex items-center justify-center will-change-transform ${
          visible ? 'opacity-100' : 'opacity-0'
        } ${
          isButton
            ? 'w-20 h-20 border-[#35A7FF] bg-[#35A7FF]/20 shadow-[0_0_35px_rgba(53,167,255,0.6)] backdrop-blur-[2px]'
            : isCard
            ? 'w-24 h-24 border-[#9B5CFF] bg-[#7C3CFF]/20 shadow-[0_0_40px_rgba(155,92,255,0.55)] backdrop-blur-[2px]'
            : 'w-16 h-16 border-[#9B5CFF]/60 bg-gradient-to-tr from-[#7C3CFF]/15 to-[#35A7FF]/15 shadow-[0_0_25px_rgba(124,60,255,0.35)] backdrop-blur-[1px]'
        }`}
      >
        {/* Subtle Inner Ring Accent Line */}
        <div
          className={`rounded-full border border-white/20 transition-all duration-300 ${
            isButton ? 'w-12 h-12 border-[#35A7FF]/50' : isCard ? 'w-14 h-14 border-[#9B5CFF]/50' : 'w-9 h-9 border-[#7C3CFF]/30'
          }`}
        />
      </div>
    </>
  );
};
