import React, { useEffect } from 'react';
import { formatVideoEmbedUrl } from '../utils/videoUtils';
import { X, Play, Sparkles, ExternalLink } from 'lucide-react';

interface VideoPlayerModalProps {
  videoUrl: string | null;
  title?: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  videoUrl,
  title = 'Portfolio Showcase Video',
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (videoUrl) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoUrl, onClose]);

  if (!videoUrl) return null;

  const { type, embedUrl } = formatVideoEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-[#05070D]/85 backdrop-blur-2xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Video Container Frame */}
      <div className="relative z-10 w-full max-w-5xl glass-panel rounded-3xl overflow-hidden border border-[#7C3CFF]/20 shadow-2xl my-auto animate-scaleUp bg-[#0D101C]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#7C3CFF]/20 bg-[#080A12]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#7C3CFF]/40" />
            <span className="w-3 h-3 rounded-full bg-[#9B5CFF]/60" />
            <span className="w-3 h-3 rounded-full bg-[#35A7FF]/80" />
            <span className="text-xs font-mono text-[#35A7FF] font-semibold ml-2 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-[#35A7FF]" /> {title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#9CA3B8] hover:text-[#35A7FF] flex items-center gap-1 transition-colors"
            >
              <span>Open in Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#080A12] hover:bg-[#0D101C] text-[#9CA3B8] hover:text-white flex items-center justify-center transition-colors border border-[#7C3CFF]/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Stage */}
        <div className="relative bg-[#05070D] aspect-video w-full overflow-hidden flex items-center justify-center">
          {type === 'gdrive' ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : type === 'direct' ? (
            <video
              src={embedUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            /* Fallback Iframe for external preview links */
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3 bg-[#080A12] border-t border-[#7C3CFF]/20 flex items-center justify-between text-xs text-[#9CA3B8] font-mono">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#35A7FF]" />
            <span>PondyPixel Cinematic Video Player</span>
          </div>
          <span>Format: {type.toUpperCase()}</span>
        </div>

      </div>
    </div>
  );
};
