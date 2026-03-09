import { useState } from 'react';

import { motion } from 'framer-motion';
import { ChevronDown, Cpu } from 'lucide-react';

const HeroSection = ({ setCurrentView }: { setCurrentView: (view: 'home' | 'telemetry' | 'platform') => void }) => {
  const [activeCard, setActiveCard] = useState(1); // 0=left, 1=center, 2=right
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full h-full px-6 md:px-12 lg:px-20 z-10 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Tecnología Minera Avanzada
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Gunjop <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">DIPLUS</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
            Revolucionando la gestión minera con inteligencia artificial y analítica de datos en tiempo real. La plataforma definitiva para la optimización de flotas.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button onClick={() => setCurrentView('platform')} className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer text-center">
              Explorar Plataforma
            </button>

            <a href="#objetivo" className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all border border-slate-700 text-center">
              Conocer Más
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Fan-Out Card Effect */}
          <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center">
            {/* Card 1 - Left Position */}
            <motion.div
              initial={{ rotate: -12, x: -100, y: 20 }}
              animate={{
                rotate: activeCard === 0 ? 0 : (activeCard === 1 ? -12 : 12),
                x: activeCard === 0 ? 0 : (activeCard === 1 ? -100 : 100),
                y: activeCard === 0 ? 0 : 20,
                opacity: activeCard === 0 ? 1 : 0.7
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setActiveCard(0)}
              className="absolute w-full max-w-[480px] sm:max-w-lg md:max-w-xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 md:p-6 shadow-2xl cursor-pointer hover:border-blue-500/30"
              style={{ zIndex: activeCard === 0 ? 30 : 10 }}
            >
              <img
                src="/dist/ciclos-diario.png"
                alt="Ciclos Diarios"
                className="rounded-lg w-full h-auto shadow-lg opacity-90"
              />
            </motion.div>

            {/* Card 2 - Center Position */}
            <motion.div
              initial={{ rotate: 0, x: 0, y: 0 }}
              animate={{
                rotate: activeCard === 1 ? 0 : (activeCard === 0 ? 12 : -12),
                x: activeCard === 1 ? 0 : (activeCard === 0 ? 100 : -100),
                y: activeCard === 1 ? 0 : 20,
                opacity: activeCard === 1 ? 1 : 0.7
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setActiveCard(1)}
              className="absolute w-full max-w-[480px] sm:max-w-lg md:max-w-xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 md:p-6 shadow-2xl cursor-pointer hover:border-blue-500/30"
              style={{ zIndex: activeCard === 1 ? 30 : 20 }}
            >
              <img
                src="/dist/tracking.png"
                alt="Mapa"
                className="rounded-lg w-full h-auto shadow-lg opacity-90"
              />
            </motion.div>

            {/* Card 3 - Right Position */}
            <motion.div
              initial={{ rotate: 12, x: 100, y: 20 }}
              animate={{
                rotate: activeCard === 2 ? 0 : (activeCard === 1 ? 12 : -12),
                x: activeCard === 2 ? 0 : (activeCard === 1 ? 100 : -100),
                y: activeCard === 2 ? 0 : 20,
                opacity: activeCard === 2 ? 1 : 0.7
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setActiveCard(2)}
              className="absolute w-full max-w-[480px] sm:max-w-lg md:max-w-xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 md:p-6 shadow-2xl cursor-pointer hover:border-blue-500/30"
              style={{ zIndex: activeCard === 2 ? 30 : 10 }}
            >
              <img
                src="/dist/consumo-combustible-fecha.png"
                alt="Consumo de Combustible"
                className="rounded-lg w-full h-auto shadow-lg opacity-90"
              />
            </motion.div>

            {/* Efficiency Badge */}
            <div className="absolute -bottom-6 -right-6 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl z-40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Cpu className="text-emerald-400" size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Eficiencia</div>
                  <div className="text-xl font-bold text-white">+24%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
