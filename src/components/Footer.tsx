import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 pt-12 pb-16 bg-[#05070D]/90 relative overflow-hidden backdrop-blur-md">
      {/* Light Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#7C3CFF]/15 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-6 px-4 sm:px-6 lg:px-8">
        
        {/* Brand Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-slate-400 font-medium">
          <span className="font-outfit font-bold text-[#F7F7FF] text-sm">PondyPixel</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>© {new Date().getFullYear()} All Rights Reserved.</span>
        </div>

        {/* Final Prominent Signature — Created by Vigneshwara */}
        <div className="pt-2 w-full max-w-md">
          <p className="font-outfit font-black text-xl sm:text-2xl tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#F7F7FF] via-[#9B5CFF] to-[#35A7FF]">
            Created by Vigneshwara
          </p>
        </div>

      </div>
    </footer>
  );
};
