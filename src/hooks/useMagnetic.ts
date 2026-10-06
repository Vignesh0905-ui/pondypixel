import { useEffect, RefObject } from 'react';

interface MagneticOptions {
  /** Max pull distance in px when cursor is at the element center. */
  strength?: number;
  /** Radius (px) beyond the element bounds where the pull starts. */
  radius?: number;
}

/**
 * Magnetic cursor-follow for a DOM element.
 *
 * Writes to the element's CSS `translate` property (NOT `transform`), so it
 * composes safely with Tailwind transform utilities and GSAP-written
 * transforms on the same element.
 *
 * - Disabled on coarse pointers / touch and under prefers-reduced-motion.
 * - One RAF loop that self-cancels once the element has settled at rest.
 * - Passive listeners only; cleaned up on unmount.
 */
export const useMagnetic = (
  ref: RefObject<HTMLElement | null>,
  { strength = 6, radius = 140 }: MagneticOptions = {}
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animFrame: number | null = null;
    let isActive = false;

    const animate = () => {
      const lerp = 0.16;
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;

      el.style.translate = `${currentX.toFixed(2)}px ${currentY.toFixed(2)}px`;

      const settled =
        Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05;

      if (isActive || !settled) {
        animFrame = requestAnimationFrame(animate);
      } else {
        // Snap to exact rest position and stop the loop.
        currentX = 0;
        currentY = 0;
        el.style.translate = '0px 0px';
        animFrame = null;
      }
    };

    const startLoop = () => {
      if (animFrame === null) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      // Expand bounds by radius to create an approach zone.
      const nearX = Math.max(rect.left - radius, Math.min(e.clientX, rect.right + radius));
      const nearY = Math.max(rect.top - radius, Math.min(e.clientY, rect.bottom + radius));
      const dist = Math.hypot(e.clientX - nearX, e.clientY - nearY);

      if (dist < radius) {
        isActive = true;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Falloff: strongest at center, zero at edge of approach zone.
        const falloff = 1 - Math.min(dist / radius, 1);
        targetX = ((e.clientX - centerX) / (rect.width / 2 + radius)) * strength * falloff;
        targetY = ((e.clientY - centerY) / (rect.height / 2 + radius)) * strength * falloff;
      } else if (isActive) {
        isActive = false;
        targetX = 0;
        targetY = 0;
      }

      startLoop();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrame !== null) cancelAnimationFrame(animFrame);
      el.style.translate = '';
    };
  }, [ref, strength, radius]);
};
