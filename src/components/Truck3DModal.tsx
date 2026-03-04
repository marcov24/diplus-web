import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Truck3DModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('CAT');
  const trucks = {
    'CAT': { model: '797F', payload: '363 ton', power: '4000 HP', img: '/dist/CAT-797F.png' },
    'Komatsu': { model: '980E', payload: '369 ton', power: '3500 HP', img: '/dist/KOMATSU-980E.png' },
    'Liebherr': { model: 'T 284', payload: '363 ton', power: '4000 HP', img: '/dist/LIEBHERR-7284.png' },
  };

  const activeTruck = trucks[activeTab as keyof typeof trucks];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, rotateX: 10 }}
            animate={{ scale: 1, rotateX: 0 }}
            exit={{ scale: 0.8, rotateX: -10 }}
            className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
            style={{ perspective: '1000px' }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white z-10">
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 h-[500px]">
              {/* 3D View Simulation */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent"></div>
                <motion.div
                  key={activeTab}
                  initial={{ rotateY: -30, opacity: 0, scale: 0.8 }}
                  animate={{
                    rotateY: [0, 10, -10, 0],
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <img src={activeTruck.img} alt={activeTruck.model} className="w-80 h-auto drop-shadow-2xl grayscale-0" />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 bg-black/50 blur-xl rounded-full"></div>
                </motion.div>
                <div className="absolute bottom-6 text-slate-500 text-xs uppercase tracking-widest font-mono">
                  Vista del Camión
                </div>
              </div>

              {/* Specs Panel */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex gap-2 mb-8 justify-center md:justify-start">
                  {Object.keys(trucks).map(brand => (
                    <button
                      key={brand}
                      onClick={() => setActiveTab(brand)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === brand
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-slate-500 text-sm uppercase tracking-wider mb-1">Modelo</h3>
                    <div className="text-4xl font-bold text-white flex items-center gap-3">
                      {activeTruck.model}
                      <span className="text-lg text-slate-400 font-normal">Series</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/30">
                      <div className="text-slate-400 text-xs mb-1">Capacidad Carga</div>
                      <div className="text-xl font-bold text-emerald-400">{activeTruck.payload}</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/30">
                      <div className="text-slate-400 text-xs mb-1">Potencia Motor</div>
                      <div className="text-xl font-bold text-blue-400">{activeTruck.power}</div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-blue-500 pl-4">
                    Totalmente compatible con el sistema de telemetría DIPLUS. Incluye sensores de fatiga, monitoreo de presión de neumáticos y análisis de combustible en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Truck3DModal;
