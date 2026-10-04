import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Smooth progress counter animation up to 100% over 3.3 seconds (33ms * 100)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 33);

    // Fade out transition starts at 3.3 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3300);

    // Complete removal & unlock scroll at EXACTLY 4.0 seconds (4000ms)
    const completeTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#05070D] flex flex-col items-center justify-center select-none transition-opacity duration-700 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Central Ambient Glow */}
      <div className="absolute w-[450px] h-[450px] bg-[#7C3CFF]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Brand Icon Logo */}
        <div className="w-14 h-14 rounded-2xl bg-[#0D101C] border border-[#7C3CFF]/40 p-0.5 shadow-[0_0_30px_rgba(124,60,255,0.3)] mb-6 animate-pulse">
          <div className="w-full h-full bg-[#05070D] rounded-[14px] flex items-center justify-center">
            <span className="font-outfit font-black text-[#35A7FF] text-2xl">P</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-outfit font-black text-4xl sm:text-5xl tracking-tight text-[#F7F7FF] mb-2">
          Pondy<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF]">Pixel</span>
        </h1>

        {/* Subtitle / Status */}
        <p className="text-xs font-mono tracking-widest text-[#35A7FF] uppercase mb-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#35A7FF] animate-ping" />
          <span>INITIALIZING DIGITAL EXPERIENCE... {progress}%</span>
        </p>

        {/* Loading Progress Bar */}
        <div className="w-64 h-1 bg-[#080A12] rounded-full overflow-hidden relative border border-[#7C3CFF]/20">
          <div
            className="h-full bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF] transition-all duration-75 ease-out shadow-[0_0_12px_#7C3CFF]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
