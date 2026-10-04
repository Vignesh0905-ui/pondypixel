import React, { useEffect } from 'react';
import { ProjectItem } from '../data/projectsData';
import { LiveWebsitePreview } from './LiveWebsitePreview';
import { X, Sparkles, Code2, Globe, TrendingUp, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Dark Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-[#05070D]/85 backdrop-blur-xl transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-[#7C3CFF]/20 shadow-2xl my-auto animate-scaleUp bg-[#0D101C]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#7C3CFF]/20 bg-[#080A12]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#7C3CFF]/40" />
            <span className="w-3 h-3 rounded-full bg-[#9B5CFF]/60" />
            <span className="w-3 h-3 rounded-full bg-[#35A7FF]/80" />
            <span className="text-xs font-mono text-[#9CA3B8] ml-2">{project.category} / {project.id}</span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#080A12] hover:bg-[#0D101C] text-[#9CA3B8] hover:text-white flex items-center justify-center transition-colors border border-[#7C3CFF]/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          
          {/* Main Visual Preview Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-[#7C3CFF]/20 group bg-[#05070D] aspect-[16/9]">
            <LiveWebsitePreview project={project} interactive={true} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/40 to-transparent pointer-events-none z-10" />
            
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
                  {project.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F7F7FF] font-outfit">
                  {project.title}
                </h2>
                <p className="text-sm text-[#9B5CFF] font-medium">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.demoLinks && project.demoLinks.length > 0 ? (
                  project.demoLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] font-bold text-xs shadow-lg shadow-[#7C3CFF]/30 hover:scale-105 transition-all"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))
                ) : project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] font-bold text-xs shadow-lg shadow-[#7C3CFF]/30 hover:scale-105 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span>View Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}
                <a
                  href="#contact"
                  onClick={onClose}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    (project.liveUrl || (project.demoLinks && project.demoLinks.length > 0))
                      ? 'bg-[#080A12] border border-[#7C3CFF]/30 hover:bg-[#0D101C] text-[#F7F7FF]'
                      : 'bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] shadow-lg shadow-[#7C3CFF]/30'
                  }`}
                >
                  <span>Inquire About Website</span>
                </a>
              </div>
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="glass-card p-4 rounded-xl flex items-center gap-4 border border-[#7C3CFF]/15 bg-[#080A12]">
                <div className="w-10 h-10 rounded-xl bg-[#7C3CFF]/10 border border-[#7C3CFF]/20 flex items-center justify-center text-[#35A7FF]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#F7F7FF] font-outfit">{m.value}</div>
                  <div className="text-xs text-[#9CA3B8]">{m.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Description & Case Study Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#7C3CFF]/15 pt-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-[#F7F7FF] font-outfit flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#35A7FF]" /> Case Study & Engineering Overview
              </h3>
              <p className="text-sm text-[#9CA3B8] leading-relaxed">
                {project.description}
              </p>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {project.fullDetails}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
                  Client & Partner
                </h4>
                <p className="text-sm font-semibold text-[#F7F7FF]">{project.client}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#35A7FF]" /> Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#080A12] border border-[#7C3CFF]/20 text-[#35A7FF] text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
