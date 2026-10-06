import React, { useState } from 'react';
import { Sparkles, Code, Layout, Layers, Box, ArrowRight, CheckCircle2, Globe, Flame } from 'lucide-react';
import { StartProjectModal } from './StartProjectModal';

export const Services: React.FC = () => {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const layers = [
    {
      id: 'layer-1',
      step: '01 / 05',
      badge: 'Client Web Services',
      badgeIcon: <Sparkles className="w-4 h-4 text-[#35A7FF]" />,
      title: 'Crafting High-Impact Digital Products & Websites',
      subtitle: 'From custom freelance business websites to interactive frontend animation systems, we deliver tailored web solutions built to perform.',
      deliverables: [
        'Custom Next.js & React Apps',
        'High Performance APIs',
        'SEO & Core Web Vitals Optimization',
      ],
      bgColor: 'bg-[#0D101C]/95',
      borderColor: 'border-[#7C3CFF]/25',
      icon: <Code className="w-6 h-6 text-[#35A7FF]" />,
    },
    {
      id: 'layer-2',
      step: '02 / 05',
      badge: 'Business Websites',
      badgeIcon: <Layout className="w-4 h-4 text-[#9B5CFF]" />,
      title: 'Business Websites',
      subtitle: "Modern, responsive and conversion-focused websites designed specifically around each client's business.",
      deliverables: [
        'High-Converting Lead Funnels',
        'Enterprise Brand Authority',
        'Custom CMS & Dedicated Maintenance',
      ],
      bgColor: 'bg-[#080A12]/95',
      borderColor: 'border-[#7C3CFF]/25',
      icon: <Globe className="w-6 h-6 text-[#9B5CFF]" />,
    },
    {
      id: 'layer-3',
      step: '03 / 05',
      badge: 'Interactive Frontend',
      badgeIcon: <Layers className="w-4 h-4 text-[#35A7FF]" />,
      title: 'Interactive Frontend',
      subtitle: 'Smooth animations, micro-interactions and immersive frontend experiences that make websites feel alive.',
      deliverables: [
        'Fluid Motion Physics Engine',
        'Bespoke Design System Components',
        'Cross-Browser 60fps Optimization',
      ],
      bgColor: 'bg-[#0D101C]/95',
      borderColor: 'border-[#7C3CFF]/25',
      icon: <Flame className="w-6 h-6 text-[#35A7FF]" />,
    },
    {
      id: 'layer-4',
      step: '04 / 05',
      badge: '3D Experiences & Motion',
      badgeIcon: <Box className="w-4 h-4 text-[#9B5CFF]" />,
      title: '3D Experiences & Motion',
      subtitle: 'Cinematic 3D visuals, scroll-based animation and interactive motion systems for premium digital experiences.',
      deliverables: [
        'Custom Three.js & WebGL Shaders',
        'GSAP ScrollTrigger Camera Rigging',
        'Interactive Canvas Particle Systems',
      ],
      bgColor: 'bg-[#080A12]/95',
      borderColor: 'border-[#7C3CFF]/25',
      icon: <Box className="w-6 h-6 text-[#9B5CFF]" />,
    },
    {
      id: 'layer-5',
      step: '05 / 05',
      badge: 'Get Started',
      badgeIcon: <Sparkles className="w-4 h-4 text-[#35A7FF]" />,
      title: "Let's Build Something Exceptional",
      subtitle: 'Have a business or idea that needs a powerful digital presence?',
      isCta: true,
      bgColor: 'bg-gradient-to-br from-[#0D101C] via-[#080A12] to-[#120B24]',
      borderColor: 'border-[#7C3CFF]/40',
      icon: <Sparkles className="w-7 h-7 text-[#35A7FF]" />,
    },
  ];

  return (
    <section id="services" className="relative z-10 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Code className="w-3.5 h-3.5 text-[#35A7FF]" /> Specialized Client Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F7FF] font-outfit tracking-tight">
            Tailored Engineering & Design Solutions
          </h2>
        </div>

        {/* Stacked Wipe / Reveal Service Layers */}
        <div className="space-y-6 sm:space-y-8">
          {layers.map((layer, index) => {
            const isDarkCta = layer.isCta;
            return (
              <div
                key={layer.id}
                className={`sticky top-24 rounded-3xl border ${layer.borderColor} p-6 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300 ${layer.bgColor} text-[#F7F7FF]`}
                style={{
                  top: `calc(100px + ${index * 12}px)`,
                }}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-[#0D101C] border-[#7C3CFF]/30 text-[#35A7FF]">
                    {layer.badgeIcon}
                    <span>{layer.badge}</span>
                  </div>

                  <span className="font-mono text-xs font-bold tracking-widest px-3 py-1 rounded-full border bg-[#0D101C] border-[#7C3CFF]/30 text-slate-400">
                    {layer.step}
                  </span>
                </div>

                {/* Content Row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border bg-[#0D101C] border-[#7C3CFF]/30">
                    {layer.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-3xl font-extrabold font-outfit tracking-tight leading-snug text-[#F7F7FF]">
                      {layer.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mb-6 text-slate-300">
                  {layer.subtitle}
                </p>

                {/* Deliverables Grid if not CTA */}
                {!isDarkCta && layer.deliverables && (
                  <div className="pt-5 border-t border-slate-800">
                    <p className="text-xs font-bold text-[#35A7FF] uppercase tracking-wider mb-3">
                      Key Deliverables & Expertise
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {layer.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 text-xs font-medium text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#35A7FF] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons for Layer 5 */}
                {isDarkCta && (
                  <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setIsStartModalOpen(true)}
                      className="btn-shimmer inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#7C3CFF]/30 active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
                    >
                      <span>Start a Project</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>

                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#0D101C] text-white border border-slate-700 hover:bg-slate-800 active:scale-[0.98] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all w-full sm:w-auto"
                    >
                      <span>Explore Portfolio Projects</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Start Project Modal */}
      <StartProjectModal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
      />
    </section>
  );
};

export default Services;


