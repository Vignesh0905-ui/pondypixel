import React, { useEffect, useRef } from 'react';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure normal natural playback speed (1.0x)
    video.playbackRate = 1.0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback if needed
      });
    }

    // Check if touch device / mobile - disable parallax on mobile
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Smooth cursor-following parallax state
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const MAX_X = 22; // max ~22px shift horizontally
    const MAX_Y = 14; // max ~14px shift vertically

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const normX = (e.clientX - centerX) / centerX; // -1 to 1
      const normY = (e.clientY - centerY) / centerY; // -1 to 1

      targetX = normX * MAX_X;
      targetY = normY * MAX_Y;
    };

    const updateParallax = () => {
      // Lerp interpolation for buttery smooth floating motion
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (video) {
        video.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0px) scale(1.04)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Background Video playing at natural speed with cursor parallax */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-[1.04] will-change-transform"
        style={{
          transform: 'translate3d(0px, 0px, 0px) scale(1.04)',
        }}
      >
        <source
          src="https://ik.imagekit.io/imflilowi/lv_0_20260828202619.mp4?updatedAt=1788427883481"
          type="video/mp4"
        />
      </video>

      {/* Subtle Dark Navy Transparent Overlay - Brighter & More Visible */}
      <div className="absolute inset-0 bg-[#05070D]/25 backdrop-brightness-[0.95]" />

      {/* Soft Atmospheric Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/40 via-transparent to-[#080A12]/60" />
    </div>
  );
};

