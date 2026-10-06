import React from 'react';

const SERVICES_ITEMS = [
  'WEB DEVELOPMENT',
  'FRONTEND DEVELOPMENT',
  'UI/UX DESIGN',
  '3D WEBSITES',
  'RESPONSIVE WEBSITES',
  'WEBSITE DESIGN',
];

export const ServiceMarquee: React.FC = () => {
  // Duplicate items for continuous seamless infinite looping
  const marqueeItems = [...SERVICES_ITEMS, ...SERVICES_ITEMS, ...SERVICES_ITEMS, ...SERVICES_ITEMS];

  return (
    <div className="w-full bg-[#0D101C]/80 border-y border-slate-800 py-3.5 overflow-hidden select-none relative z-20 backdrop-blur-md">
      <div className="flex w-max animate-marquee">
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center gap-6 px-4 shrink-0">
            <span className="font-outfit font-extrabold text-xs sm:text-sm tracking-widest text-[#F7F7FF] uppercase whitespace-nowrap">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#35A7FF]" />
          </div>
        ))}
      </div>
    </div>
  );
};

