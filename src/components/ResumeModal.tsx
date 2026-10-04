import React, { useEffect } from 'react';
import { X, FileText, CheckCircle2, Briefcase, Code, Sparkles, Mail, Phone, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-[#05070D]/85 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Resume Card Container */}
      <div className="relative z-10 w-full max-w-3xl glass-panel rounded-3xl overflow-hidden border border-[#7C3CFF]/20 shadow-2xl my-auto animate-scaleUp bg-[#0D101C]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#7C3CFF]/20 bg-[#080A12]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#7C3CFF]/40" />
            <span className="w-3 h-3 rounded-full bg-[#9B5CFF]/60" />
            <span className="w-3 h-3 rounded-full bg-[#35A7FF]/80" />
            <span className="text-xs font-mono text-[#35A7FF] font-semibold ml-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#35A7FF]" /> Vigneshwara_Resume.pdf
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#080A12] hover:bg-[#0D101C] text-[#9CA3B8] hover:text-white flex items-center justify-center transition-colors border border-[#7C3CFF]/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resume Scroll Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#7C3CFF]/15 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-medium mb-3">
                <Sparkles className="w-3 h-3 text-[#9B5CFF]" /> Freelance Web & Frontend Developer
              </div>
              <h2 className="text-3xl font-extrabold text-[#F7F7FF] font-outfit">Vigneshwara</h2>
              <p className="text-sm text-[#9B5CFF] font-mono mt-1">Founder & Developer @ PondyPixel</p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] font-bold text-xs shadow-lg shadow-[#7C3CFF]/30 hover:scale-105 transition-all"
              >
                <Mail className="w-3.5 h-3.5 fill-[#F7F7FF]" /> Direct Contact
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#35A7FF] mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#35A7FF]" /> Professional Overview
            </h3>
            <p className="text-sm text-[#9CA3B8] leading-relaxed bg-[#05070D] p-4 rounded-xl border border-[#7C3CFF]/15">
              Experienced Freelance Web Developer and Frontend Engineer specializing in high-performance websites, modern business platforms, e-commerce storefronts, and conversion-oriented landing pages. Dedicated to delivering pixel-perfect design, fast core web vitals, and scalable React architectures for global clients.
            </p>
          </div>

          {/* Key Services & Capabilities */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#35A7FF] mb-3 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#35A7FF]" /> Core Expertise & Development Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Freelance Web Development',
                'Frontend Development (React / Next.js)',
                'Modern & Glassmorphic Website Design',
                'Business Websites & Lead Platforms',
                'E-commerce Storefront Engineering',
                'High-Conversion Landing Pages',
                'Custom Client Websites & CMS',
                'Responsive & Mobile-First UX',
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#9CA3B8] bg-[#080A12] p-3 rounded-lg border border-[#7C3CFF]/15">
                  <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Stack */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#35A7FF] mb-3">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Node.js', 'GraphQL', 'REST APIs', 'Stripe / Shopify', 'Framer Motion', 'SEO Optimization'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#080A12] border border-[#7C3CFF]/20 text-[#35A7FF] text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Details Footer Bar */}
          <div className="pt-6 border-t border-[#7C3CFF]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3B8] font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#35A7FF]" /> pondypixel25@gmail.com
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#35A7FF]" /> +91 63813 57739
              </span>
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className="text-[#35A7FF] hover:underline flex items-center gap-1 font-sans font-semibold"
            >
              Hire Me For Your Project <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
