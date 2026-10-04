import React, { useState } from 'react';
import { InteractiveTitle } from './InteractiveTitle';
import { Sliders, RotateCcw } from 'lucide-react';

export const TitlePlayground: React.FC = () => {
  const [customText, setCustomText] = useState('PondyPixel');
  const [preset, setPreset] = useState<'default' | 'creative' | 'minimal'>('default');

  const presets = [
    { id: 'default', label: 'PondyPixel Brand', text: 'PondyPixel' },
    { id: 'creative', label: 'Creative Studio', text: 'Interactive' },
    { id: 'minimal', label: 'Digital Lab', text: 'PixelLab' },
  ];

  return (
    <section id="interactive-demo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden bg-[#0D101C]/90 border border-[#7C3CFF]/20">
        {/* Glow backdrop accent */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#7C3CFF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#35A7FF] mb-2">
              <Sliders className="w-4 h-4 text-[#9B5CFF]" /> Live Physics Lab
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F7FF] font-outfit">
              Interactive Title Controls
            </h2>
            <p className="text-[#9CA3B8] text-sm mt-1">
              Test how the title responds to cursor wave, magnet pull, and soft touch drag.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 bg-[#05070D] p-1.5 rounded-xl border border-[#7C3CFF]/20">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPreset(p.id as any);
                  setCustomText(p.text);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  preset === p.id
                    ? 'bg-gradient-to-r from-[#7C3CFF] to-[#35A7FF] text-[#F7F7FF] font-bold shadow-md'
                    : 'text-[#9CA3B8] hover:text-[#F7F7FF] hover:bg-[#080A12]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Playground Stage */}
        <div className="bg-[#05070D] border border-[#7C3CFF]/20 rounded-2xl p-12 min-h-[300px] flex flex-col items-center justify-center relative shadow-inner group">
          <div className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-widest text-[#64748B] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#35A7FF] animate-ping" />
            <span>Spring Physics Active</span>
          </div>

          <div className="w-full flex items-center justify-center py-6">
            <InteractiveTitle text={customText} />
          </div>

          <p className="text-xs text-[#64748B] mt-4 font-mono text-center">
            [Hover over letters to ripple • Click & Drag word to test elastic spring back]
          </p>
        </div>

        {/* Custom Text Input Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value || 'PondyPixel')}
              maxLength={16}
              placeholder="Type custom text..."
              className="w-full bg-[#05070D] border border-[#7C3CFF]/20 focus:border-[#9B5CFF] text-[#F7F7FF] placeholder-[#64748B] text-sm rounded-xl px-4 py-3 outline-none transition-all shadow-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B] font-mono">
              {customText.length}/16
            </span>
          </div>

          <button
            onClick={() => {
              setCustomText('PondyPixel');
              setPreset('default');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#080A12] hover:bg-[#0D101C] border border-[#7C3CFF]/20 text-[#9CA3B8] hover:text-white text-xs font-medium transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to PondyPixel</span>
          </button>
        </div>
      </div>
    </section>
  );
};
