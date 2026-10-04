import React, { useRef, useState, useEffect, useCallback } from 'react';

interface InteractiveTitleProps {
  text?: string;
  className?: string;
}

export const InteractiveTitle: React.FC<InteractiveTitleProps> = ({
  text = "PondyPixel",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for pointer tracking and interaction
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Ref values for animation frame physics (prevents unnecessary re-renders)
  const pointerRef = useRef({ x: 0, y: 0, isDown: false, startX: 0, startY: 0 });
  const positionRef = useRef({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 });
  const mouseRelRef = useRef({ x: 0, y: 0, active: false });
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  // Smooth glow overlay state
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  // Handle pointer down (mouse or touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Capture pointer for smooth dragging even if cursor leaves bounding box
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
    
    setIsDragging(true);
    pointerRef.current.isDown = true;
    pointerRef.current.startX = e.clientX - positionRef.current.currentX;
    pointerRef.current.startY = e.clientY - positionRef.current.currentY;
  };

  // Handle pointer move
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Relative position from center (in pixels)
    const relX = e.clientX - centerX;
    const relY = e.clientY - centerY;

    // Relative percentage for light reflection glow (0% to 100%)
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setGlowPos({
      x: Math.max(0, Math.min(100, glowX)),
      y: Math.max(0, Math.min(100, glowY)),
      opacity: isHovered || isDragging ? 0.85 : 0,
    });

    mouseRelRef.current = { x: relX, y: relY, active: true };

    if (pointerRef.current.isDown) {
      // Calculate target offset during drag with elastic dampening & range limits (max 45px offset)
      const rawTargetX = e.clientX - pointerRef.current.startX;
      const rawTargetY = e.clientY - pointerRef.current.startY;

      // Dampen movement resistance (0.55 factor) so drag stays controlled & elegant
      const maxDragOffset = 45;
      const clampedX = Math.max(-maxDragOffset, Math.min(maxDragOffset, rawTargetX * 0.55));
      const clampedY = Math.max(-maxDragOffset, Math.min(maxDragOffset, rawTargetY * 0.55));

      positionRef.current.targetX = clampedX;
      positionRef.current.targetY = clampedY;
    } else {
      // Magnetic pull toward cursor on hover (max 18px soft pull)
      const maxMag = 18;
      const magX = Math.max(-maxMag, Math.min(maxMag, relX * 0.12));
      const magY = Math.max(-maxMag, Math.min(maxMag, relY * 0.12));

      positionRef.current.targetX = magX;
      positionRef.current.targetY = magY;
    }
  }, [isHovered, isDragging]);

  // Handle pointer release / leave
  const handlePointerUp = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (e && containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
    
    setIsDragging(false);
    pointerRef.current.isDown = false;
    // Target smoothly resets to (0,0) or soft magnetic pull
    positionRef.current.targetX = 0;
    positionRef.current.targetY = 0;
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseRelRef.current.active = false;
    if (!pointerRef.current.isDown) {
      positionRef.current.targetX = 0;
      positionRef.current.targetY = 0;
      setGlowPos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  // Main animation frame physics loop
  useEffect(() => {
    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.035;

      // Damped spring interpolation for main word container
      const pos = positionRef.current;
      const springFactor = isDragging ? 0.18 : 0.1;
      pos.currentX += (pos.targetX - pos.currentX) * springFactor;
      pos.currentY += (pos.targetY - pos.currentY) * springFactor;

      // Apply transform to title wrapper
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${pos.currentX.toFixed(2)}px, ${pos.currentY.toFixed(2)}px, 0px)`;
      }

      // Animate individual letters for wave/distortion effect
      const letters = lettersRef.current;
      const totalLetters = letters.length;
      const mouse = mouseRelRef.current;

      letters.forEach((letterEl, i) => {
        if (!letterEl) return;

        // Calculate letter's approximate relative X center position (-1 to +1 normalized)
        const normalizedIdx = (i / (totalLetters - 1)) * 2 - 1; // range -1 to +1
        const letterRelX = normalizedIdx * 120; // approximate width span in px

        // Distance from cursor to letter
        const distFromMouse = Math.abs(mouse.x - letterRelX);
        const influence = Math.max(0, 1 - distFromMouse / 160); // 0 to 1

        // Wave distortion offset (sine wave traversing across letters)
        const waveOffset = Math.sin(time * 3 + i * 0.5) * (isHovered || isDragging ? 4 : 1.5);
        
        // Dynamic elevation reaction when mouse is close to letter
        const mouseLift = mouse.active ? influence * -6 : 0;
        
        // Subtle letter scale pop
        const scale = 1 + (mouse.active ? influence * 0.06 : 0);
        
        // Subtle rotation (tilt) up to 2.5 degrees max
        const tilt = Math.sin(time * 2 + i * 0.4) * (mouse.active ? influence * 2.5 : 0.5);

        const totalY = waveOffset + mouseLift;

        letterEl.style.transform = `translate3d(0px, ${totalY.toFixed(2)}px, 0px) scale(${scale.toFixed(3)}) rotate(${tilt.toFixed(2)}deg)`;
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, isDragging]);

  const letterArray = text.split("");

  return (
    <div className="relative inline-flex items-center justify-center p-4 touch-none select-none">
      {/* Outer Glow Backdrop */}
      <div 
        className="absolute inset-0 rounded-3xl blur-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(124, 60, 255, 0.35), rgba(53, 167, 255, 0.25), transparent 70%)`,
          opacity: isHovered || isDragging ? 0.9 : 0.25,
        }}
      />

      {/* Main Interactive Title Handle */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`pondypixel-title relative z-10 inline-flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight transition-shadow duration-300 ${className}`}
        style={{
          touchAction: 'none',
          willChange: 'transform',
        }}
      >
        {/* Dynamic Light Reflection Layer */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 z-20 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 65%)`,
            opacity: glowPos.opacity,
          }}
        />

        {/* Render Letters with Individual Wave & Reaction */}
        {letterArray.map((char, index) => {
          // Add accent styling to 'Pixel' letters or specific gradient highlight
          const isSecondWord = index >= 5; // "Pixel" portion
          
          return (
            <span
              key={index}
              ref={(el) => {
                if (el) lettersRef.current[index] = el;
              }}
              className={`inline-block transition-colors duration-300 ${
                isSecondWord
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-[#7C3CFF] via-[#9B5CFF] to-[#35A7FF] drop-shadow-[0_0_12px_rgba(124,60,255,0.4)]"
                  : "bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F7F7FF] to-[#9CA3B8] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              }`}
              style={{
                willChange: 'transform',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};
