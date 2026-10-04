import React from 'react';
import { Sparkles, Mail, User, Code, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <div className="max-w-6xl mx-auto rounded-2xl px-5 py-3 flex items-center justify-between border border-[#7C3CFF]/20 shadow-2xl backdrop-blur-xl bg-[#080A12]/80">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3CFF] to-[#35A7FF] p-0.5 shadow-md shadow-[#7C3CFF]/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#05070D] rounded-[10px] flex items-center justify-center">
              <span className="font-outfit font-black text-[#35A7FF] text-lg">P</span>
            </div>
          </div>
          <span className="font-outfit font-bold text-lg tracking-tight text-[#F7F7FF]">
            Pondy<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF]">Pixel</span>
          </span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9CA3B8]">
          <a href="#about" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#9B5CFF]" /> About
          </a>
          <a href="#services" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-[#9B5CFF]" /> Services
          </a>
          <a href="#projects" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#9B5CFF]" /> Projects
          </a>
          <a href="#pricing" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#9B5CFF]" /> Pricing
          </a>
          <a href="#contact" className="hover:text-[#35A7FF] transition-colors flex items-center gap-1.5 text-[#35A7FF]">
            <Mail className="w-3.5 h-3.5 text-[#35A7FF]" /> Contact
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] text-xs font-bold shadow-lg shadow-[#7C3CFF]/30 hover:shadow-[#35A7FF]/40 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 fill-[#F7F7FF]" />
            <span>Start a Project</span>
          </a>
        </div>

      </div>
    </header>
  );
};
