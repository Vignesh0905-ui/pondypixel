import React from 'react';
import { MousePointer, Touchpad, Activity, ShieldCheck, Sparkles, Wand2 } from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: <MousePointer className="w-6 h-6 text-[#35A7FF]" />,
      title: "Soft Magnetic Pull",
      description: "When the cursor approaches the word, a subtle gravitational pull shifts the title container towards the mouse coordinates with precision dampening.",
    },
    {
      icon: <Touchpad className="w-6 h-6 text-[#9B5CFF]" />,
      title: "Fluid Touch Dragging",
      description: "Mobile and touch users can touch & drag the title freely. Bounded elastic resistance keeps the motion natural, controlled, and readable.",
    },
    {
      icon: <Activity className="w-6 h-6 text-[#35A7FF]" />,
      title: "Letter Wave Distortion",
      description: "As pointer coordinates move across letters, dynamic vertical offsets and subtle scale pop create a sinusoidal wave ripple effect.",
    },
    {
      icon: <Wand2 className="w-6 h-6 text-[#9B5CFF]" />,
      title: "Soft Light Reflection Glow",
      description: "A dynamic radial spotlight mask overlay tracks hover position relative to character bounding geometry for metallic sheen reflections.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#35A7FF]" />,
      title: "Guaranteed Legibility",
      description: "Strict physical bounds prevent the word from flying away, rotating excessively, or distorting out of readable bounds at any time.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#9B5CFF]" />,
      title: "Elastic Spring Return",
      description: "On drag release or touch end, requestAnimationFrame damped spring physics smoothly return the word back to its resting origin (0, 0).",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#35A7FF] mb-3">
          Interactive Architecture
        </h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-[#F7F7FF] font-outfit tracking-tight">
          Engineered for Visual Excellence & Fluid Responsiveness
        </p>
        <p className="text-[#9CA3B8] text-base mt-4">
          Every micro-interaction is optimized to feel effortless on both desktop cursor movement and mobile touch gestures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 bg-[#0D101C] border border-[#7C3CFF]/15 hover:bg-[#0D101C]/90 hover:border-[#9B5CFF]/40"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 flex items-center justify-center mb-5 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#F7F7FF] font-outfit mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#9CA3B8] leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
