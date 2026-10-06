import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { PROJECT_CATEGORIES, PROJECTS, ProjectItem } from '../data/projectsData';
import { ProjectModal } from './ProjectModal';
import { LiveWebsitePreview } from './LiveWebsitePreview';
import { Layers, Eye, ArrowUpRight, Globe, ExternalLink } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Projects');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = activeCategory === 'All Projects'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Separator Line */}
      <div className="w-full h-px bg-slate-800 mb-16" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
          <Layers className="w-3.5 h-3.5 text-[#35A7FF]" /> Freelance & Client Portfolio
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F7F7FF] font-outfit tracking-tight">
          Featured Website Demos & Client Projects
        </h2>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed font-normal">
          Explore real-world client websites engineered across diverse industries—from high-energy fitness platforms to luxury dining and SaaS platforms.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-4 mb-12 no-scrollbar relative z-10">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-white shadow-md font-bold scale-105 border border-transparent'
                : 'bg-[#0D101C] border border-[#7C3CFF]/20 text-slate-400 hover:text-white hover:border-[#7C3CFF]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects 3D Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredProjects.map((project) => (
          <Card3D
            key={project.id}
            maxTilt={10}
            className="h-full"
            onClick={() => setSelectedProject(project)}
          >
            <div className="h-full flex flex-col justify-between p-6 relative group overflow-hidden bg-[#0D101C]/90 border border-[#7C3CFF]/20 rounded-2xl hover:border-[#9B5CFF]/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-250 backdrop-blur-xl">
              {/* Card Live Homepage Preview Frame */}
              <div>
                <div className="relative rounded-xl overflow-hidden mb-5 border border-[#7C3CFF]/20 bg-[#05070D] aspect-[16/10] group-hover:border-[#35A7FF]/40 transition-colors">
                  <LiveWebsitePreview project={project} />

                  {/* Category Tag Badge */}
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#0D101C]/90 border border-[#7C3CFF]/30 text-[10px] font-mono text-[#35A7FF] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    {project.category}
                  </span>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#05070D]/85 backdrop-blur-[2px] p-3">
                    {project.demoLinks && project.demoLinks.length > 0 ? (
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        {project.demoLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
                          >
                            <Globe className="w-4 h-4 text-white" /> {link.label}
                          </a>
                        ))}
                      </div>
                    ) : project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer uppercase tracking-wider"
                      >
                        <Globe className="w-4 h-4 text-white" /> Live Website <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#0F172A] font-bold text-xs shadow-md">
                        <Eye className="w-4 h-4 text-[#7C3CFF]" /> VIEW DETAILS
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-[#F7F7FF] font-outfit group-hover:text-[#35A7FF] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-[#9B5CFF] font-semibold mt-1 mb-3">
                  {project.tagline}
                </p>

                {/* Short Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>
              </div>

              {/* Technologies & View Action */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#080A12] border border-[#7C3CFF]/20 text-[10px] text-[#35A7FF] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-[#080A12] border border-[#7C3CFF]/20 text-[10px] text-slate-400 font-mono">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#35A7FF]">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> View Project Details
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

            </div>
          </Card3D>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};


