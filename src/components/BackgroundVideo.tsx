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

    // Check if touch device / mobile - disable parallax on mobile for smooth performance
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Smooth cursor-following parallax state
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number | null = null;
    let isTicking = false;

    const MAX_X = 18; // max ~18px shift horizontally
    const MAX_Y = 12; // max ~12px shift vertically

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const normX = (e.clientX - centerX) / centerX; // -1 to 1
      const normY = (e.clientY - centerY) / centerY; // -1 to 1

      targetX = normX * MAX_X;
      targetY = normY * MAX_Y;

      if (!isTicking) {
        isTicking = true;
        animationFrameId = requestAnimationFrame(updateParallax);
      }
    };

    const updateParallax = () => {
      // Lerp interpolation for smooth floating motion
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (video) {
        video.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0px) scale(1.04)`;
      }

      // Continue animation only while moving towards target to conserve GPU cycles
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        animationFrameId = requestAnimationFrame(updateParallax);
      } else {
        isTicking = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
        className="w-full h-full object-cover scale-[1.04] will-change-transform opacity-90"
        style={{
          transform: 'translate3d(0px, 0px, 0px) scale(1.04)',
        }}
      >
        <source
          src="https://ik.imagekit.io/imflilowi/lv_0_20260828202619.mp4?updatedAt=1788427883481"
          type="video/mp4"
        />
      </video>

      {/* Slightly Lifted Dark Navy Transparent Overlay - 75% Dark Mood for High Visibility */}
      <div className="absolute inset-0 bg-[#05070D]/40" />

      {/* Soft Atmospheric Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/50 via-transparent to-[#05070D]/70" />
    </div>
  );
};

