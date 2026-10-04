import React from 'react';
import { Futuristic3DCanvas } from './components/3d/Futuristic3DCanvas';
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

export const App: React.FC = () => {
  // Initialize GSAP ScrollTrigger 3D reveals
  useScrollAnimations();

  return (
    <div className="relative min-h-screen text-[#F7F7FF] selection:bg-[#7C3CFF]/30 selection:text-[#35A7FF] bg-[#05070D] font-jakarta">
      {/* 1. Intro Preloader Screen */}
      <Preloader />

      {/* 2. Custom Glowing Desktop Cursor */}
      <CustomCursor />

      {/* 3. Premium Dark Futuristic 3D Canvas Scene */}
      <Futuristic3DCanvas />

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
