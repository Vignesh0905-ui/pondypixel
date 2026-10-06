import React, { useRef, useState, useEffect } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareColor?: string;
  onClick?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  maxTilt = 10,
  glareColor = 'rgba(124, 60, 255, 0.25)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // RAF Lerp Physics Refs
  const currentRot = useRef({ x: 0, y: 0, scale: 1 });
  const targetRot = useRef({ x: 0, y: 0, scale: 1 });
  const glarePos = useRef({ x: 50, y: 50, opacity: 0 });
  const dragStart = useRef({ x: 0, y: 0, initialRotX: 0, initialRotY: 0, moved: false });
  const animFrameId = useRef<number | null>(null);

  // RAF animation loop — ONLY runs while hovered/dragged or returning to rest
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || window.innerWidth < 768;
    if (isTouch) return; // Disable tilt RAF on touch devices for mobile 60fps performance

    if (!isHovered && !isDragging && Math.abs(currentRot.current.x) < 0.05 && Math.abs(currentRot.current.y) < 0.05 && Math.abs(currentRot.current.scale - 1) < 0.005) {
      if (cardRef.current) {
        cardRef.current.style.transform = 'none';
      }
      return;
    }

    const animate = () => {
      const lerpFactor = isDragging ? 0.25 : 0.14;
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * lerpFactor;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * lerpFactor;
      currentRot.current.scale += (targetRot.current.scale - currentRot.current.scale) * lerpFactor;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${currentRot.current.x.toFixed(1)}deg) rotateY(${currentRot.current.y.toFixed(1)}deg) scale3d(${currentRot.current.scale.toFixed(3)}, ${currentRot.current.scale.toFixed(3)}, 1)`;
      }

      // Check if we should keep animating
      const isStillMoving = Math.abs(targetRot.current.x - currentRot.current.x) > 0.02 ||
                            Math.abs(targetRot.current.y - currentRot.current.y) > 0.02 ||
                            Math.abs(targetRot.current.scale - currentRot.current.scale) > 0.002;

      if (isHovered || isDragging || isStillMoving) {
        animFrameId.current = requestAnimationFrame(animate);
      } else {
        if (cardRef.current) cardRef.current.style.transform = 'none';
      }
    };

    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isHovered, isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    if (cardRef.current) {
      cardRef.current.setPointerCapture(e.pointerId);
    }
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      initialRotX: targetRot.current.x,
      initialRotY: targetRot.current.y,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    glarePos.current = {
      x: Math.max(0, Math.min(100, glareX)),
      y: Math.max(0, Math.min(100, glareY)),
      opacity: 0.75,
    };

    // Normalized pointer position → drives inner image depth via CSS vars
    // (consumed by .card-depth-img using the CSS `translate` property, so it
    // never conflicts with Tailwind transform utilities).
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;
    cardRef.current.style.setProperty('--mx', normX.toFixed(3));
    cardRef.current.style.setProperty('--my', normY.toFixed(3));

    if (isDragging) {
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        dragStart.current.moved = true;
      }

      const rotY = dragStart.current.initialRotY + (deltaX / width) * maxTilt * 2;
      const rotX = dragStart.current.initialRotX - (deltaY / height) * maxTilt * 2;

      targetRot.current = {
        x: Math.max(-maxTilt * 1.5, Math.min(maxTilt * 1.5, rotX)),
        y: Math.max(-maxTilt * 1.5, Math.min(maxTilt * 1.5, rotY)),
        scale: 1.03,
      };
    } else {
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      targetRot.current = {
        x: -mouseY * maxTilt * 1.5,
        y: mouseX * maxTilt * 1.5,
        scale: 1.02,
      };
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (cardRef.current && cardRef.current.hasPointerCapture(e.pointerId)) {
      cardRef.current.releasePointerCapture(e.pointerId);
    }

    if (!dragStart.current.moved && onClick) {
      onClick();
    }

    setIsDragging(false);
    if (!isHovered) {
      targetRot.current = { x: 0, y: 0, scale: 1 };
      glarePos.current.opacity = 0;
    }
  };

  const handlePointerEnter = () => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;
    setIsHovered(true);
    targetRot.current.scale = 1.02;
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mx', '0');
      cardRef.current.style.setProperty('--my', '0');
    }
    if (!isDragging) {
      targetRot.current = { x: 0, y: 0, scale: 1 };
      glarePos.current.opacity = 0;
    }
  };

  return (
    <div
      className={`card-3d-wrapper select-none ${className}`}
      onClick={() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
        if (isTouch && onClick) onClick();
      }}
    >
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="relative transition-transform duration-200 ease-out transform-gpu rounded-2xl overflow-hidden glass-card group cursor-pointer"
        style={{
          willChange: isHovered || isDragging ? 'transform' : 'auto',
        }}
      >
        {/* Specular Glare Layer */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-2xl mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${glarePos.current.x}% ${glarePos.current.y}%, ${glareColor} 0%, rgba(255,255,255,0.05) 40%, transparent 80%)`,
              opacity: glarePos.current.opacity,
            }}
          />
        )}

        {/* Card Content Layer */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
};

