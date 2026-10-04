import React, { useState } from 'react';
import { VideoPlayerModal } from './VideoPlayerModal';
import { Play, Link2, Sparkles, CheckCircle2, Film } from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  // Default Google Drive sample / demo link state
  const [inputUrl, setInputUrl] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Sample portfolio video URLs for testing
  const sampleVideos = [
    {
      label: 'Google Drive Portfolio Sample',
      url: 'https://drive.google.com/file/d/1Bpvm7J4F5n8z9Xy20W-L4r_029Z_v123/view',
    },
    {
      label: 'Sample MP4 Reel',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  ];

  const handlePlayInput = () => {
    if (inputUrl.trim()) {
      setActiveVideo(inputUrl.trim());
    }
  };

  return (
    <section id="video-showcase" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Glow Backdrop Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7C3CFF]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="glass-panel p-8 sm:p-12 rounded-3xl relative z-10 border border-[#7C3CFF]/20 shadow-2xl overflow-hidden bg-[#0D101C]/90">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C3CFF]/10 border border-[#7C3CFF]/30 text-[#35A7FF] text-xs font-semibold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5 text-[#9B5CFF]" /> Portfolio Theme Video Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F7F7FF] font-outfit tracking-tight">
            Cinematic Portfolio Video Showcase
          </h2>
          <p className="text-[#9CA3B8] text-sm sm:text-base mt-3 leading-relaxed">
            Watch portfolio theme motion reels or paste your shared Google Drive video link to stream instantly.
          </p>
        </div>

        {/* Featured Video Player Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-[#7C3CFF]/20 bg-[#05070D] aspect-video max-w-4xl mx-auto shadow-2xl group">
          
          {/* Decorative Video Background Cover Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/60 to-[#05070D]/30" />

          {/* Central Play Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <button
              onClick={() => setActiveVideo(inputUrl || sampleVideos[1].url)}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] p-0.5 shadow-2xl shadow-[#7C3CFF]/40 hover:scale-110 active:scale-95 transition-all duration-300 group/btn"
            >
              <div className="w-full h-full rounded-full bg-[#05070D] flex items-center justify-center pl-1 group-hover/btn:bg-[#0D101C] transition-colors">
                <Play className="w-8 h-8 text-[#35A7FF] fill-[#35A7FF] group-hover/btn:scale-110 transition-transform" />
              </div>
            </button>

            <h3 className="text-xl sm:text-2xl font-bold text-[#F7F7FF] font-outfit mt-6">
              PondyPixel Portfolio Theme Reel
            </h3>
            <p className="text-xs sm:text-sm text-[#35A7FF] font-medium mt-1">
              Click to launch full-screen cinematic player
            </p>
          </div>

          {/* Bottom Bar Info */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#9CA3B8] font-mono z-10">
            <span className="flex items-center gap-1.5 bg-[#0D101C] px-3 py-1 rounded-full border border-[#7C3CFF]/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#35A7FF]" /> Google Drive & MP4 Player Ready
            </span>
            <span className="hidden sm:inline bg-[#0D101C] px-3 py-1 rounded-full border border-[#7C3CFF]/20 backdrop-blur-md">
              60 FPS HD Motion
            </span>
          </div>
        </div>

        {/* Google Drive Link Input Form */}
        <div className="mt-12 max-w-3xl mx-auto bg-[#0D101C] p-6 rounded-2xl border border-[#7C3CFF]/15 shadow-lg">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#35A7FF] mb-2 flex items-center gap-1.5">
            <Link2 className="w-4 h-4" /> Embed Your Google Drive Portfolio Video Link
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste Google Drive URL (e.g. https://drive.google.com/file/d/.../view)"
              className="w-full bg-[#05070D] border border-[#7C3CFF]/20 focus:border-[#9B5CFF] text-[#F7F7FF] placeholder-[#64748B] text-xs sm:text-sm rounded-xl px-4 py-3 outline-none transition-all"
            />
            <button
              onClick={handlePlayInput}
              disabled={!inputUrl.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] text-xs font-bold shadow-md hover:shadow-[#7C3CFF]/30 disabled:opacity-50 transition-all shrink-0"
            >
              <Play className="w-4 h-4 fill-[#F7F7FF]" />
              <span>Stream Video</span>
            </button>
          </div>

          {/* Instructions Box */}
          <div className="mt-4 pt-4 border-t border-[#7C3CFF]/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9CA3B8]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0 mt-0.5" />
              <span>Set Drive permission to <strong>"Anyone with the link can view"</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#35A7FF] shrink-0 mt-0.5" />
              <span>Supports both Google Drive links and direct MP4 video URLs</span>
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      <VideoPlayerModal
        videoUrl={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
};
