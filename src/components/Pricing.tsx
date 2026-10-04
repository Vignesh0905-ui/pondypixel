import React from 'react';
import { Card3D } from './Card3D';
import { Sparkles, CheckCircle2, ArrowRight, Server, Globe } from 'lucide-react';

export const Pricing: React.FC = () => {
  const plans = [
    {
      id: 'launch',
      name: 'Launch',
      price: '₹2,999',
      description: 'Ideal for small businesses and personal portfolios needing a fast, sleek online presence.',
      features: [
        'Single Page / Landing Page Website',
        'Responsive & Mobile-First Design',
        'Core Web Vitals Speed Optimization',
        'Contact Form & WhatsApp Integration',
        '1 Month Free Support & Maintenance',
      ],
      popular: false,
    },
    {
      id: 'scale',
      name: 'Scale',
      price: '₹5,999',
      description: 'Perfect for growing brands requiring custom interactive design and multi-page features.',
      features: [
        'Multi-Page Website (Up to 5 Pages)',
        'Custom React / Next.js Architecture',
        'Interactive 3D Motion & Animations',
        'SEO & Core Web Vitals Optimization',
        'CMS / Portfolio Gallery Integration',
        '3 Months Support & Maintenance',
      ],
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹8,999',
      description: 'Full-scale custom digital solution for enterprises, e-commerce, and high-converting portals.',
      features: [
        'Full-Scale Custom Web Platform / E-commerce',
        'Advanced Interactive 3D & Shader Physics',
        'Custom E-commerce / Payment Gateway API',
        'Priority High Conversion Funnel Optimization',
        'Dedicated VIP Support & Unlimited Updates',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Ambient Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7C3CFF]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#9B5CFF]" /> Transparent Pricing
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F7F7FF] font-outfit tracking-tight">
          Flexible Plans Tailored for Your Growth
        </h2>
        <p className="text-[#9CA3B8] text-base sm:text-lg mt-4 leading-relaxed font-normal">
          High-performance website development packages with no hidden costs.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {plans.map((plan) => (
          <Card3D key={plan.id} maxTilt={10} className="h-full">
            <div
              className={`pricing-card p-8 h-full flex flex-col justify-between relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#0D101C] border-[#9B5CFF] shadow-[0_0_30px_rgba(124,60,255,0.3)]'
                  : 'bg-[#0D101C] border-[#7C3CFF]/15 hover:bg-[#0D101C]/90 hover:border-[#9B5CFF]/40'
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                  MOST POPULAR
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-[#F7F7FF] font-outfit mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold text-[#F7F7FF] font-outfit tracking-tight">
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs text-[#9CA3B8] leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="border-t border-[#7C3CFF]/15 pt-6 mb-6">
                  <p className="text-[11px] font-semibold text-[#9CA3B8] uppercase tracking-wider mb-4">
                    Included Features
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#9CA3B8]">
                        <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href="#contact"
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] hover:scale-[1.02] shadow-lg shadow-[#7C3CFF]/30'
                    : 'bg-[#080A12] text-[#35A7FF] border border-[#7C3CFF]/40 hover:bg-gradient-to-r hover:from-[#7C3CFF] hover:to-[#35A7FF] hover:text-[#F7F7FF]'
                }`}
              >
                <span>Choose {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Card3D>
        ))}
      </div>

      {/* Infrastructure Pricing */}
      <div className="mt-14 text-center relative z-10 border-t border-[#7C3CFF]/20 pt-10 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3CFF]/15 border border-[#7C3CFF]/30 text-[#F7F7FF] text-base sm:text-lg md:text-xl font-extrabold font-outfit uppercase tracking-wider mb-6 shadow-lg shadow-[#7C3CFF]/10">
          <Server className="w-5 h-5 text-[#35A7FF]" />
          Infrastructure is billed separately
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-base sm:text-lg md:text-xl font-bold text-[#F7F7FF]">
          <div className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0D101C] border border-[#7C3CFF]/30 shadow-lg w-full sm:w-auto justify-center hover:border-[#9B5CFF]/60 transition-all">
            <Globe className="w-5 h-5 text-[#9B5CFF] shrink-0" />
            <span>Domain • ₹800+/year</span>
          </div>

          <div className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0D101C] border border-[#7C3CFF]/30 shadow-lg w-full sm:w-auto justify-center hover:border-[#35A7FF]/60 transition-all">
            <Server className="w-5 h-5 text-[#35A7FF] shrink-0" />
            <span>Hosting • ₹1,400+/year</span>
          </div>
        </div>
      </div>
    </section>
  );
};
