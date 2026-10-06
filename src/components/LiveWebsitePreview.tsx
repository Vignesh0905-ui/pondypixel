import React, { useState } from 'react';
import { ProjectItem } from '../data/projectsData';
import { Loader2 } from 'lucide-react';

interface LiveWebsitePreviewProps {
  project: ProjectItem;
  className?: string;
  interactive?: boolean;
}

export const LiveWebsitePreview: React.FC<LiveWebsitePreviewProps> = ({
  project,
  className = '',
  interactive = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const targetUrl = project.liveUrl || (project.demoLinks && project.demoLinks[0]?.url);
  const canUseIframe = project.allowIframe !== false && !!targetUrl && !hasError;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#05070D] group ${className}`}>
      {/* Loading Skeleton */}
      {canUseIframe && isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#080A12]/90 backdrop-blur-sm transition-opacity duration-300">
          <Loader2 className="w-7 h-7 text-[#35A7FF] animate-spin mb-2" />
          <span className="text-xs font-mono text-[#9CA3B8] uppercase tracking-wider">
            Loading Live Preview...
          </span>
        </div>
      )}

      {/* Actual Live Website Iframe */}
      {canUseIframe ? (
        <div className="card-depth-img relative w-full h-full overflow-hidden">
          <iframe
            src={targetUrl}
            title={`${project.title} Live Preview`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className={`w-[1280px] h-[800px] origin-top-left border-0 transition-opacity duration-500 ${
              interactive ? 'pointer-events-auto' : 'pointer-events-none'
            } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{
              transform: 'scale(0.35)',
              width: '285.71%', // 100% / 0.35
              height: '285.71%', // 100% / 0.35
            }}
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
          />
        </div>
      ) : (
        /* Fallback: Real Homepage Screenshot */
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} Live Homepage`}
            className="card-depth-img w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      )}

      {/* Ambient Gradient Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/30 to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />

      {/* Live Indicator Badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#080A12]/85 border border-[#7C3CFF]/30 backdrop-blur-md shadow-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-mono text-[#F7F7FF] font-semibold uppercase tracking-wider">
          {canUseIframe ? 'Live Site' : 'Homepage Preview'}
        </span>
      </div>
    </div>
  );
};
