import React, { useState, useRef } from 'react';
import { StartProjectModal } from './StartProjectModal';
import { useMagnetic } from '../hooks/useMagnetic';
import { Mail, Phone, MessageSquare, ArrowUpRight, Copy, Check, Sparkles, Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const startProjectRef = useRef<HTMLButtonElement | null>(null);
  const whatsappRef = useRef<HTMLAnchorElement | null>(null);

  // Magnetic cursor-follow on the existing primary CTAs.
  useMagnetic(startProjectRef, { strength: 6, radius: 130 });
  useMagnetic(whatsappRef, { strength: 6, radius: 130 });

  const phoneNum = '6381357739';
  const formattedPhone = '+91 63813 57739';
  const emailAddr = 'pondypixel25@gmail.com';
  const whatsappUrl = `https://wa.me/916381357739?text=${encodeURIComponent("Hi Vigneshwara! I saw your PondyPixel portfolio and would like to discuss a project.")}`;

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Separator Ambient Glow Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7C3CFF]/25 to-transparent mb-16" />

      {/* Light Atmosphere Lighting */}
      <div data-parallax="0.12" className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-[#7C3CFF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div data-parallax="0.18" className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-[#35A7FF]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Glass Panel */}
      <div className="glass-panel p-6 sm:p-14 lg:p-16 rounded-3xl relative z-10 border border-[#7C3CFF]/25 shadow-2xl overflow-hidden bg-[#0D101C]/95 backdrop-blur-2xl">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/35 text-[#35A7FF] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#9B5CFF]" />
            <span>Ready for New Projects & Freelance Commissions</span>
          </span>
        </div>

        {/* Cinematic Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#F7F7FF] font-outfit uppercase tracking-tight leading-none drop-shadow-lg">
            LET'S BUILD <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF]">SOMETHING GREAT.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed font-normal">
            Have an idea for a custom website, modern business platform, or interactive frontend experience? Connect directly with Vigneshwara today.
          </p>
        </div>

        {/* Prominent Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-16 w-full max-w-md sm:max-w-none mx-auto">
          {/* Start a Project Modal Trigger */}
          <button
            ref={startProjectRef}
            onClick={() => setIsModalOpen(true)}
            className="btn-shimmer group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-[#7C3CFF]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Direct WhatsApp Contact Button */}
          <a
            ref={whatsappRef}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-[#080A12] text-[#F7F7FF] border border-[#7C3CFF]/40 hover:border-[#9B5CFF] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 backdrop-blur-xl group w-full sm:w-auto font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-[#35A7FF] group-hover:text-cyan-300 transition-colors" />
            <span>DIRECT WHATSAPP CONTACT</span>
          </a>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          
          {/* Email Card */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-[#7C3CFF]/20 bg-[#080A12] hover:bg-[#0D101C] hover:border-[#9B5CFF]/50 transition-all duration-300 group">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 flex items-center justify-center mb-4 text-[#35A7FF] group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Direct Email</h3>
              <a
                href={`mailto:${emailAddr}`}
                className="text-sm sm:text-base font-bold text-[#F7F7FF] hover:text-[#35A7FF] transition-colors font-mono break-all"
              >
                {emailAddr}
              </a>
            </div>

            <button
              onClick={() => copyToClipboard(emailAddr, 'email')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#35A7FF] hover:text-[#9B5CFF] font-semibold cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
            </button>
          </div>

          {/* Phone Card */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-[#7C3CFF]/20 bg-[#080A12] hover:bg-[#0D101C] hover:border-[#9B5CFF]/50 transition-all duration-300 group">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 flex items-center justify-center mb-4 text-[#35A7FF] group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Phone Call</h3>
              <a
                href={`tel:${phoneNum}`}
                className="text-base sm:text-lg font-bold text-[#F7F7FF] hover:text-[#35A7FF] transition-colors font-mono"
              >
                {formattedPhone}
              </a>
            </div>

            <button
              onClick={() => copyToClipboard(phoneNum, 'phone')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#35A7FF] hover:text-[#9B5CFF] font-semibold cursor-pointer"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPhone ? 'Copied to Clipboard!' : 'Copy Number'}</span>
            </button>
          </div>

          {/* WhatsApp Direct Card */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-[#7C3CFF]/20 bg-[#080A12] hover:bg-[#0D101C] hover:border-[#9B5CFF]/50 transition-all duration-300 group">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 flex items-center justify-center mb-4 text-[#35A7FF] group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Instant WhatsApp</h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-bold text-[#F7F7FF] hover:text-[#35A7FF] transition-colors font-mono"
              >
                {formattedPhone}
              </a>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#35A7FF] hover:text-[#9B5CFF] font-semibold"
            >
              <span>Open WhatsApp Chat</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Social Links Row */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Connect Across Social Platforms
          </span>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/25 flex items-center justify-center text-slate-300 hover:text-[#35A7FF] hover:bg-[#0D101C] hover:border-[#9B5CFF]/50 hover:scale-110 transition-all shadow-md"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/25 flex items-center justify-center text-slate-300 hover:text-[#35A7FF] hover:bg-[#0D101C] hover:border-[#9B5CFF]/50 hover:scale-110 transition-all shadow-md"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/25 flex items-center justify-center text-slate-300 hover:text-[#35A7FF] hover:bg-[#0D101C] hover:border-[#9B5CFF]/50 hover:scale-110 transition-all shadow-md"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/25 flex items-center justify-center text-slate-300 hover:text-[#35A7FF] hover:bg-[#0D101C] hover:border-[#9B5CFF]/50 hover:scale-110 transition-all shadow-md"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/25 flex items-center justify-center text-slate-300 hover:text-[#35A7FF] hover:bg-[#0D101C] hover:border-[#9B5CFF]/50 hover:scale-110 transition-all shadow-md"
            >
              <Dribbble className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Start Project Modal */}
      <StartProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

