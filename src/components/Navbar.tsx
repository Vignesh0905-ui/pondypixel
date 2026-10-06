import React, { useState, useEffect } from 'react';
import { Sparkles, Mail, User, Code, Layers, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 sm:py-4 transition-all duration-300">
      <div className={`max-w-6xl mx-auto rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border transition-all duration-300 ${
        scrolled
          ? 'border-[#7C3CFF]/30 shadow-xl backdrop-blur-xl bg-[#0D101C]/90'
          : 'border-slate-800/80 shadow-md backdrop-blur-md bg-[#0D101C]/75'
      }`}>
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3CFF] to-[#35A7FF] p-0.5 shadow-sm group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#0D101C] rounded-[10px] flex items-center justify-center">
              <span className="font-outfit font-black text-white text-base">P</span>
            </div>
          </div>
          <span className="font-outfit font-bold text-lg tracking-tight text-[#F7F7FF]">
            Pondy<span className="text-[#7C3CFF]">Pixel</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
          <a href="#about" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/50">
            <User className="w-3.5 h-3.5 text-slate-400" /> About
          </a>
          <a href="#services" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/50">
            <Code className="w-3.5 h-3.5 text-slate-400" /> Services
          </a>
          <a href="#projects" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/50">
            <Layers className="w-3.5 h-3.5 text-slate-400" /> Projects
          </a>
          <a href="#pricing" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/50">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" /> Pricing
          </a>
          <a href="#contact" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-800/50 text-[#35A7FF]">
            <Mail className="w-3.5 h-3.5 text-[#35A7FF]" /> Contact
          </a>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="#contact"
            className="btn-shimmer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-white text-xs font-bold shadow-md shadow-[#7C3CFF]/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Start a Project</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-[#F7F7FF] hover:text-[#35A7FF] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl border border-slate-800 p-4 bg-[#0D101C]/95 backdrop-blur-xl shadow-2xl animate-scaleUp">
          <nav className="flex flex-col gap-2.5 text-sm font-semibold text-slate-300">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[#F7F7FF]"
            >
              <User className="w-4 h-4 text-slate-400" /> About
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[#F7F7FF]"
            >
              <Code className="w-4 h-4 text-slate-400" /> Services
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[#F7F7FF]"
            >
              <Layers className="w-4 h-4 text-slate-400" /> Projects
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[#F7F7FF]"
            >
              <Sparkles className="w-4 h-4 text-slate-400" /> Pricing
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[#35A7FF]"
            >
              <Mail className="w-4 h-4 text-[#35A7FF]" /> Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};


