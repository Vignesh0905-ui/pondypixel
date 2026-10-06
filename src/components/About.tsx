import React from 'react';
import { Sparkles, Code, Layout, Globe, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code className="w-5 h-5 text-[#7C3CFF]" />,
      title: 'Freelance & Frontend Development',
      description: 'Building custom React and Next.js platforms with speed, precision, and modern architectural standards.',
    },
    {
      icon: <Layout className="w-5 h-5 text-[#35A7FF]" />,
      title: 'Modern Business Websites',
      description: 'High-converting client websites tailored for gyms, restaurants, corporate entities, and personal brands.',
    },
    {
      icon: <Globe className="w-5 h-5 text-[#7C3CFF]" />,
      title: 'E-commerce & Custom Web Solutions',
      description: 'End-to-end custom web applications, e-commerce storefronts, and landing pages designed for real client growth.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Separator Line */}
      <div className="w-full h-px bg-slate-800 mb-16" />

      <div className="glass-panel p-6 sm:p-12 lg:p-16 rounded-3xl border border-[#7C3CFF]/20 shadow-2xl relative overflow-hidden bg-[#0D101C]/90 backdrop-blur-xl">
        {/* Soft Ambient Light Spot */}
        <div data-parallax="0.1" className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#7C3CFF]/10 to-[#35A7FF]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: Heading & Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#9B5CFF]" /> About PondyPixel
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F7FF] font-outfit tracking-tight leading-tight">
              Crafting Modern Websites & Digital Solutions for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF]">Growing Clients.</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              PondyPixel is led by <strong>Vigneshwara</strong>, a dedicated freelance web developer and frontend specialist focused on transforming business goals into sleek, high-performing websites.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether you need a custom client website, high-converting landing page, corporate business platform, or e-commerce store, every digital experience is built with clean code, ultra-fast load speeds, and intuitive responsive design across all devices.
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0" />
                <span>Freelance Web Development</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0" />
                <span>Frontend React Engineering</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0" />
                <span>Custom Client Websites</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0" />
                <span>Landing Pages & E-commerce</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Feature Highlight Cards */}
          <div className="lg:col-span-5 space-y-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="about-card glass-card p-6 rounded-2xl border border-[#7C3CFF]/20 hover:border-[#9B5CFF]/50 transition-all duration-200 group bg-[#080A12]/80 hover:bg-[#0D101C] hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0D101C] border border-[#7C3CFF]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#35A7FF] transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F7F7FF] font-outfit group-hover:text-[#35A7FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};


