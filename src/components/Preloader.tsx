import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Quick, instant entrance: fade out in 200ms, unmount in 400ms
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 200);

    const completeTimer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#05070D] flex flex-col items-center justify-center select-none pointer-events-none transition-opacity duration-300 ease-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Central Ambient Glow */}
      <div className="absolute w-[350px] h-[350px] bg-[#7C3CFF]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Brand Icon Logo */}
        <div className="w-12 h-12 rounded-2xl bg-[#0D101C] border border-[#7C3CFF]/40 p-0.5 shadow-lg mb-4">
          <div className="w-full h-full bg-[#05070D] rounded-[14px] flex items-center justify-center">
            <span className="font-outfit font-black text-[#35A7FF] text-xl">P</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-outfit font-black text-3xl tracking-tight text-[#F7F7FF]">
          Pondy<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF]">Pixel</span>
        </h1>
      </div>
    </div>
  );
};

