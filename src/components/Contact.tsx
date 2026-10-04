import React, { useState } from 'react';
import { StartProjectModal } from './StartProjectModal';
import { Mail, Phone, MessageSquare, ArrowUpRight, Copy, Check, Sparkles, Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Dark Atmosphere Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#7C3CFF]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-[#35A7FF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glass Panel */}
      <div className="glass-panel p-8 sm:p-14 lg:p-16 rounded-3xl relative z-10 border border-[#7C3CFF]/20 shadow-2xl overflow-hidden bg-[#0D101C]/90">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#9B5CFF] animate-pulse" />
            <span>Ready for New Projects & Freelance Commissions</span>
          </span>
        </div>

        {/* Cinematic Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#F7F7FF] font-outfit uppercase tracking-tight leading-none drop-shadow-lg">
            LET'S BUILD <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF]">SOMETHING GREAT.</span>
          </h2>
          <p className="text-[#9CA3B8] text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed font-normal">
            Have an idea for a custom website, modern business platform, or interactive frontend experience? Connect directly with Vigneshwara today.
          </p>
        </div>

        {/* Prominent Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
          {/* Start a Project Modal Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#7C3CFF]/30 hover:shadow-[#35A7FF]/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 fill-[#F7F7FF]" />
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Direct WhatsApp Contact Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#0D101C]/80 text-[#F7F7FF] border border-[#7C3CFF]/50 hover:border-[#9B5CFF] hover:shadow-[0_0_20px_rgba(124,60,255,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 backdrop-blur-md group"
          >
            <MessageSquare className="w-4 h-4 text-[#9B5CFF] group-hover:text-[#35A7FF] transition-colors" />
            <span>DIRECT WHATSAPP CONTACT</span>
          </a>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          
          {/* Email Card */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-[#7C3CFF]/15 bg-[#0D101C] hover:bg-[#0D101C]/90 hover:border-[#9B5CFF]/40 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#7C3CFF]/10 border border-[#7C3CFF]/20 flex items-center justify-center mb-4 text-[#35A7FF]">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">Direct Email</h3>
              <a
                href={`mailto:${emailAddr}`}
                className="text-base font-bold text-[#F7F7FF] hover:text-[#35A7FF] transition-colors font-mono break-all"
              >
                {emailAddr}
              </a>
            </div>

            <button
              onClick={() => copyToClipboard(emailAddr, 'email')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#35A7FF] hover:text-[#20D9FF] font-medium"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#35A7FF]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
            </button>
          </div>

          {/* Phone Card */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-[#7C3CFF]/15 bg-[#0D101C] hover:bg-[#0D101C]/90 hover:border-[#9B5CFF]/40 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#7C3CFF]/10 border border-[#7C3CFF]/20 flex items-center justify-center mb-4 text-[#35A7FF]">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">Phone Call</h3>
              <a
                href={`tel:${phoneNum}`}
                className="text-lg font-bold text-[#F7F7FF] hover:text-[#35A7FF] transition-colors font-mono"
              >
                {formattedPhone}
              </a>
            </div>

            <button
              onClick={() => copyToClipboard(phoneNum, 'phone')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#35A7FF] hover:text-[#20D9FF] font-medium"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#35A7FF]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPhone ? 'Copied to Clipboard!' : 'Copy Number'}</span>
            </button>
          </div>

          {/* WhatsApp Direct Card */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-[#7C3CFF]/15 bg-[#0D101C] hover:bg-[#0D101C]/90 hover:border-[#9B5CFF]/40 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#7C3CFF]/10 border border-[#7C3CFF]/20 flex items-center justify-center mb-4 text-[#35A7FF]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">Instant WhatsApp</h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-[#F7F7FF] hover:text-[#35A7FF] transition-colors font-mono"
              >
                {formattedPhone}
              </a>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#35A7FF] hover:text-[#20D9FF] font-medium"
            >
              <span>Open WhatsApp Chat</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Social Links Row */}
        <div className="pt-8 border-t border-[#7C3CFF]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Connect Across Social Platforms
          </span>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 flex items-center justify-center text-[#9CA3B8] hover:text-[#35A7FF] hover:border-[#9B5CFF]/40 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 flex items-center justify-center text-[#9CA3B8] hover:text-[#35A7FF] hover:border-[#9B5CFF]/40 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 flex items-center justify-center text-[#9CA3B8] hover:text-[#35A7FF] hover:border-[#9B5CFF]/40 transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 flex items-center justify-center text-[#9CA3B8] hover:text-[#35A7FF] hover:border-[#9B5CFF]/40 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#080A12] border border-[#7C3CFF]/20 flex items-center justify-center text-[#9CA3B8] hover:text-[#35A7FF] hover:border-[#9B5CFF]/40 transition-all"
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
