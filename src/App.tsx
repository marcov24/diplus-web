import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import GalleryView from './components/GalleryView';
import HeroSection from './components/HeroSection';
import ObjectiveSection from './components/ObjectiveSection';
import InstallationSection from './components/InstallationSection';
// import MetricsBar from './components/MetricsBar';
import ContactSection from './components/ContactSection';
import TelemetrySection from './components/TelemetrySection';
import WhatsAppButton from './components/WhatsAppButton';
import EmailButton from './components/EmailButton';

// Componente Principal
const MiningDashboard = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'telemetry' | 'platform'>('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom smooth scroll function with slower, more elegant easing
  const smoothScrollTo = (target: Element) => {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200; // Increased duration for smoother scroll
    let start: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const navLinks = [
    { name: 'Inicio', href: '#inicio', onClick: () => setCurrentView('home') },
    { name: 'Objetivo', href: '#objetivo', onClick: () => setCurrentView('home') },
    { name: 'Instalación', href: '#instalacion', onClick: () => setCurrentView('home') },
    {
      name: 'Telemetría',
      href: '#',
      onClick: () => setCurrentView('telemetry'),
      // subItems: [
      //   { name: 'Flujometro', href: '#flujometro', onClick: () => setCurrentView('telemetry') },
      //   { name: 'Sensor de Nivel', href: '#sensor-nivel', onClick: () => setCurrentView('telemetry') },
      //   { name: 'Sensor de Llantas', href: '#sensor-llantas', onClick: () => setCurrentView('telemetry') }
      // ]
    },
    { name: 'Plataforma', href: '#plataforma', onClick: () => setCurrentView('platform') },
    { name: 'Contacto', href: '#contacto', onClick: () => setCurrentView('home') },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30" style={{ scrollBehavior: 'smooth' }}>
      {/* Sticky Navigation Header */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-4 border-b border-slate-800' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 grid grid-cols-3 items-center">
          <div className="flex items-center gap-2 justify-self-start">
            <img src="/dist/logo-white.svg" alt="Gunjop Logo" className="h-8 w-auto" />
            {/* <span className={`text-xl font-bold tracking-tight transition-opacity ${scrolled ? 'opacity-100' : 'opacity-80'}`}>
              Gunjop
            </span> */}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick) {
                      link.onClick();
                      // For links that stay in home view, smooth scroll to section
                      if (link.href.startsWith('#') && currentView === 'home') {
                        e.preventDefault();
                        const target = document.querySelector(link.href);
                        if (target) {
                          smoothScrollTo(target);
                        }
                      }
                    }
                  }}
                  className="text-sm font-medium text-slate-300 hover:text-white hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  {link.name}
                  {/* {link.subItems && <ChevronDown size={14} />} */}
                </a>

                {/* {link.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="bg-slate-900 border border-slate-700/50 rounded-xl shadow-xl overflow-hidden min-w-[180px] p-1 flex flex-col">
                      {link.subItems.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={() => {
                            if (sub.onClick) sub.onClick();
                          }}
                          className="px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap text-left"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 justify-self-end col-start-3"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          {/* Empty spacer for desktop third column */}
          <div className="hidden md:block"></div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.onClick) {
                          e.preventDefault();
                          link.onClick();
                          setMobileMenuOpen(false);
                        }
                      }}
                      className="text-slate-300 hover:text-blue-400 py-2 border-b border-slate-800/50 flex justify-between items-center"
                    >
                      {link.name}
                      {/* {link.subItems && <ChevronDown size={16} />} */}
                    </a>
                    {/* {link.subItems && (
                      <div className="pl-4 mt-2 flex flex-col gap-2 border-l-2 border-slate-800">
                        {link.subItems.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-slate-400 hover:text-white text-sm py-1 block"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main>
        {currentView === 'home' ? (
          <>
            <HeroSection setCurrentView={setCurrentView} />
            <ObjectiveSection />
            <InstallationSection />

            <ContactSection />
          </>
        ) : currentView === 'telemetry' ? (
          <TelemetrySection />
        ) : (
          <section id="plataforma" className="py-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 relative min-h-screen">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Plataforma DIPLUS</h2>
                <p className="text-slate-400">Panel de control y monitoreo en tiempo real</p>
              </div>
              {/* <MetricsBar /> */}
              <GalleryView />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Gunjop DIPLUS. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Floating Contact Buttons */}
      <EmailButton />
      <WhatsAppButton />
    </div >
  );
};

export default MiningDashboard;
