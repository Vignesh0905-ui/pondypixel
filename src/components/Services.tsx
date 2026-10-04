import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Code, Layout, Layers, Box, ArrowRight, CheckCircle2, Globe, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StartProjectModal } from './StartProjectModal';

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const layers = [
    {
      id: 'layer-1',
      step: '01 / 05',
      badge: 'Client Web Services',
      badgeIcon: <Sparkles className="w-4 h-4 text-[#9B5CFF]" />,
      title: 'Crafting High-Impact Digital Products & Websites',
      subtitle: 'From custom freelance business websites to interactive frontend animation systems, we deliver tailored web solutions built to perform.',
      deliverables: [
        'Custom Next.js & React Apps',
        'High Performance APIs',
        'SEO & Core Web Vitals Optimization',
      ],
      accent: 'from-[#7C3CFF]/20 via-[#9B5CFF]/10 to-transparent',
      glow: 'shadow-[#7C3CFF]/20',
      icon: <Code className="w-7 h-7 text-[#35A7FF]" />,
    },
    {
      id: 'layer-2',
      step: '02 / 05',
      badge: 'Business Websites',
      badgeIcon: <Layout className="w-4 h-4 text-[#35A7FF]" />,
      title: 'Business Websites',
      subtitle: "Modern, responsive and conversion-focused websites designed specifically around each client's business.",
      deliverables: [
        'High-Converting Lead Funnels',
        'Enterprise Brand Authority',
        'Custom CMS & Dedicated Maintenance',
      ],
      accent: 'from-[#35A7FF]/20 via-[#7C3CFF]/10 to-transparent',
      glow: 'shadow-[#35A7FF]/20',
      icon: <Globe className="w-7 h-7 text-[#9B5CFF]" />,
    },
    {
      id: 'layer-3',
      step: '03 / 05',
      badge: 'Interactive Frontend',
      badgeIcon: <Layers className="w-4 h-4 text-[#9B5CFF]" />,
      title: 'Interactive Frontend',
      subtitle: 'Smooth animations, micro-interactions and immersive frontend experiences that make websites feel alive.',
      deliverables: [
        'Fluid Motion Physics Engine',
        'Bespoke Design System Components',
        'Cross-Browser 60fps Optimization',
      ],
      accent: 'from-[#9B5CFF]/20 via-[#35A7FF]/10 to-transparent',
      glow: 'shadow-[#9B5CFF]/20',
      icon: <Flame className="w-7 h-7 text-[#35A7FF]" />,
    },
    {
      id: 'layer-4',
      step: '04 / 05',
      badge: '3D Experiences & Motion',
      badgeIcon: <Box className="w-4 h-4 text-[#35A7FF]" />,
      title: '3D Experiences & Motion',
      subtitle: 'Cinematic 3D visuals, scroll-based animation and interactive motion systems for premium digital experiences.',
      deliverables: [
        'Custom Three.js & WebGL Shaders',
        'GSAP ScrollTrigger Camera Rigging',
        'Interactive Canvas Particle Systems',
      ],
      accent: 'from-[#7C3CFF]/25 via-[#35A7FF]/15 to-transparent',
      glow: 'shadow-[#7C3CFF]/30',
      icon: <Box className="w-7 h-7 text-[#9B5CFF]" />,
    },
    {
      id: 'layer-5',
      step: '05 / 05',
      badge: 'Get Started',
      badgeIcon: <Sparkles className="w-4 h-4 text-[#35A7FF]" />,
      title: "Let's Build Something Exceptional",
      subtitle: 'Have a business or idea that needs a powerful digital presence?',
      isCta: true,
      accent: 'from-[#35A7FF]/25 via-[#7C3CFF]/20 to-transparent',
      glow: 'shadow-[#35A7FF]/35',
      icon: <Sparkles className="w-8 h-8 text-[#35A7FF]" />,
    },
  ];

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const cards = sectionRef.current?.querySelectorAll('.stacked-card');
    if (!cards || cards.length < 2) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate layers stacking on top of each other
      cards.forEach((card, index) => {
        if (index === 0) return; // Layer 1 is initially pinned in place

        const prevCards = Array.from(cards).slice(0, index);

        // Previous layers scale down slightly and dim with soft depth blur
        scrollTl.to(
          prevCards,
          {
            scale: (i) => 1 - (index - i) * 0.04,
            filter: 'brightness(0.7) blur(2px)',
            opacity: (i) => Math.max(0.4, 1 - (index - i) * 0.2),
            y: (i) => -(index - i) * 15,
            duration: 1,
            ease: 'power2.inOut',
          },
          `step-${index}`
        );

        // Current layer enters smoothly from bottom to top
        scrollTl.fromTo(
          card,
          {
            y: '120%',
            opacity: 0,
            scale: 0.96,
          },
          {
            y: '0%',
            opacity: 1,
            scale: 1,
            filter: 'brightness(1) blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
          },
          `step-${index}`
        );
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative z-10 bg-[#05070D]">
      {/* Pinned Viewport Deck Container */}
      <div ref={triggerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Background Ambient Glow Lights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#7C3CFF]/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#35A7FF]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Stacked Cards Deck */}
        <div className="relative w-full max-w-4xl h-[540px] sm:h-[580px] md:h-[600px] flex items-center justify-center">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className="stacked-card absolute inset-0 w-full h-full rounded-3xl bg-[#0D101C]/95 border border-[#7C3CFF]/30 p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden transition-shadow duration-300"
              style={{
                zIndex: index * 10 + 10,
                transformOrigin: 'top center',
              }}
            >
              {/* Card Ambient Glow Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${layer.accent}`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${layer.accent} opacity-30 pointer-events-none`} />

              {/* Card Header Row */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080A12] border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-bold uppercase tracking-wider shadow-md">
                  {layer.badgeIcon}
                  <span>{layer.badge}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#9CA3B8] tracking-widest bg-[#080A12] px-3.5 py-1 rounded-full border border-[#7C3CFF]/20">
                    {layer.step}
                  </span>
                </div>
              </div>

              {/* Card Main Body */}
              <div className="relative z-10 my-auto py-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#080A12] border border-[#7C3CFF]/30 flex items-center justify-center shadow-lg shrink-0">
                    {layer.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F7F7FF] font-outfit tracking-tight leading-snug">
                      {layer.title}
                    </h2>
                  </div>
                </div>

                <p className="text-[#9CA3B8] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mt-3">
                  {layer.subtitle}
                </p>

                {/* Layer Features / Deliverables if not CTA */}
                {!layer.isCta && layer.deliverables && (
                  <div className="mt-8 pt-6 border-t border-[#7C3CFF]/20">
                    <p className="text-xs font-bold text-[#35A7FF] uppercase tracking-wider mb-4">
                      Key Deliverables & Expertise
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {layer.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#080A12]/80 border border-[#7C3CFF]/20 text-xs font-medium text-[#F7F7FF]">
                          <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layer 05 CTA Action */}
                {layer.isCta && (
                  <div className="mt-8 pt-6 border-t border-[#7C3CFF]/20 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setIsStartModalOpen(true)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(124,60,255,0.4)] hover:shadow-[0_0_40px_rgba(53,167,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <span>Start a Project</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#080A12] text-[#F7F7FF] border border-[#7C3CFF]/40 hover:border-[#9B5CFF] hover:bg-[#0D101C] font-bold text-sm uppercase tracking-wider transition-all duration-200"
                    >
                      <span>Explore Portfolio Projects</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#7C3CFF]/15 text-[11px] font-mono text-[#64748B]">
                <span>PondyPixel Digital Engineering</span>
                <span>Scroll to reveal next layer</span>
              </div>
            </div>
          ))}
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
