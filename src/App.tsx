import React, { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Pricing } from './components/Pricing';
import { ServiceMarquee } from './components/ServiceMarquee';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { useScrollAnimations } from './hooks/useScrollAnimations';

// Deferred: the WebGL background chunk loads after first paint so the hero
// becomes usable immediately (non-critical 3D effect).
const Futuristic3DCanvas = lazy(() =>
  import('./components/3d/Futuristic3DCanvas').then((m) => ({ default: m.Futuristic3DCanvas }))
);

export const App: React.FC = () => {
  // Initialize lightweight viewport reveal animations
  useScrollAnimations();

  return (
    <div className="relative min-h-screen text-[#F7F7FF] selection:bg-[#7C3CFF]/30 selection:text-white bg-[#05070D] font-jakarta bg-bright-pattern">
      {/* Cinematic 3D Hero Background (Iridescent Torus + Flowing Ribbons + Glass Orbs + Reflective Floor) */}
      <Suspense fallback={null}>
        <Futuristic3DCanvas />
      </Suspense>

      {/* 1. Intro Preloader Screen */}
      <Preloader />

      {/* 2. Minimal Adaptive Desktop Cursor */}
      <CustomCursor />

      {/* Main Portfolio Content Layer */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. About Section */}
          <About />

          {/* 3. Services Section */}
          <Services />

          {/* 4. Projects Section */}
          <Projects />

          {/* 5. Pricing Section */}
          <Pricing />

          {/* Running Services Marquee */}
          <ServiceMarquee />

          {/* 6. Contact Section */}
          <Contact />
        </main>

        {/* 7. Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;

