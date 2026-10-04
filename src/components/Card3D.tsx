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
  maxTilt = 14,
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

  // Continuous RAF animation loop for liquid smooth inertia
  useEffect(() => {
    const animate = () => {
      const lerpFactor = isDragging ? 0.25 : 0.12;
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * lerpFactor;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * lerpFactor;
      currentRot.current.scale += (targetRot.current.scale - currentRot.current.scale) * lerpFactor;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${currentRot.current.x.toFixed(2)}deg) rotateY(${currentRot.current.y.toFixed(2)}deg) scale3d(${currentRot.current.scale.toFixed(3)}, ${currentRot.current.scale.toFixed(3)}, 1)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
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
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Specular glare coordinates
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    glarePos.current = {
      x: Math.max(0, Math.min(100, glareX)),
      y: Math.max(0, Math.min(100, glareY)),
      opacity: 0.85,
    };

    if (isDragging) {
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        dragStart.current.moved = true;
      }

      // Drag sensitivity calculation
      const rotY = dragStart.current.initialRotY + (deltaX / width) * maxTilt * 2.5;
      const rotX = dragStart.current.initialRotX - (deltaY / height) * maxTilt * 2.5;

      targetRot.current = {
        x: Math.max(-maxTilt * 1.8, Math.min(maxTilt * 1.8, rotX)),
        y: Math.max(-maxTilt * 1.8, Math.min(maxTilt * 1.8, rotY)),
        scale: 1.04,
      };
    } else {
      // Hover tilt calculation
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      targetRot.current = {
        x: -mouseY * maxTilt * 1.8,
        y: mouseX * maxTilt * 1.8,
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
    setIsHovered(true);
    targetRot.current.scale = 1.02;
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (!isDragging) {
      targetRot.current = { x: 0, y: 0, scale: 1 };
      glarePos.current.opacity = 0;
    }
  };

  return (
    <div
      className={`card-3d-wrapper perspective-1000 select-none touch-none ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="relative transition-transform duration-75 ease-out transform-gpu rounded-2xl overflow-hidden glass-card group cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Specular Glare Layer */}
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-2xl mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glarePos.current.x}% ${glarePos.current.y}%, ${glareColor} 0%, rgba(255,255,255,0.05) 40%, transparent 80%)`,
            opacity: glarePos.current.opacity,
          }}
        />

        {/* Card Content Layer */}
        <div
          style={{
            transform: isHovered || isDragging ? 'translateZ(24px)' : 'translateZ(0px)',
            transition: 'transform 0.2s ease-out',
          }}
          className="relative z-10 h-full flex flex-col justify-between"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
