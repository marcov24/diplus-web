import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Activity, Disc, Waves } from 'lucide-react';

const TelemetrySection = () => {
  // State for carousels (keyed by sensor ID)
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState<{ src: string, title: string, desc: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndices(prev => {
        const nextIndices = { ...prev };
        sensors.forEach(sensor => {
          if (sensor.images && sensor.images.length > 1) {
            const currentIndex = prev[sensor.id] || 0;
            nextIndices[sensor.id] = (currentIndex + 1) % sensor.images.length;
          }
        });
        return nextIndices;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const sensors = [
    {
      id: 'flujometro',
      title: 'Flujómetro de Alta Precisión',
      desc: 'Instrumento de medición de precisión diseñado para cuantificar directamente el consumo real de combustible de la unidad en tiempo real.',
      details: [
        'Genera el Mapa de Calor dinámico al correlacionar el consumo exacto con puntos geográficos específicos de la ruta.',
        'Permite comparar el consumo exacto entre distintos periodos operativos.',
        'Establece un histórico de patrones de comportamiento del motor para identificar desviaciones de rendimiento.'
      ],
      icon: <Activity size={32} className="text-blue-400" />,
      color: 'blue',
      images: [
        { src: '/dist/flujometro.gif', title: 'Flujómetro de Alta Precisión', desc: 'Instrumento de medición de precisión diseñado para cuantificar directamente el consumo real de combustible de la unidad en tiempo real.' },
        { src: '/dist/tracking-mapa-de-calor.png', title: 'Mapa de Calor', desc: 'Visualización de densidad de tráfico y zonas operativas críticas correlacionadas con el consumo exacto de combustible.' },
        { src: '/dist/ciclos-diario.png', title: 'Monitoreo de Ciclos Diario', desc: 'Análisis detallado de los ciclos de transporte realizados en las últimas 24 horas con métricas de consumo por ciclo.' },
        { src: '/dist/ciclos-mensual.png', title: 'Monitoreo de Ciclos Mensual', desc: 'Tendencias históricas y evolutivas de la productividad mensual con comparativas de eficiencia energética.' },
        { src: '/dist/consumo-combustible.png', title: 'Consumo de Combustible', desc: 'Métricas precisas del consumo instantáneo y eficiencia de la flota medidas en tiempo real por el flujómetro.' },
        { src: '/dist/consumo-por-periodo.png', title: 'Consumo por Periodos', desc: 'Comparativa acumulada del gasto de combustible entre periodos operativos para identificar patrones y optimizar rutas.' }
      ]
    },
    {
      id: 'sensor-nivel',
      title: 'Sensor de Nivel de Combustible',
      desc: 'Sensor especializado en medir la altura y volumen del combustible remanente dentro del tanque de la unidad.',
      details: [
        'Permite conocer con exactitud el stock de combustible disponible en cada camión de la flota.',
        'Facilita la toma de decisiones estratégicas para realizar viajes adicionales basados en la autonomía restante.',
        'Reduce drásticamente el riesgo operativo de que una unidad se quede sin combustible en ruta.'
      ],
      icon: <Waves size={32} className="text-emerald-400" />,
      color: 'emerald',
      images: [
        { src: '/dist/sensor-combustible.jpg', title: 'Sensor de Nivel de Combustible', desc: 'Sensor especializado en medir la altura y volumen del combustible remanente dentro del tanque de la unidad.' },
        { src: '/dist/nivel-combustible.png', title: 'Estado de Nivel de Combustible', desc: 'Monitoreo en tiempo real del nivel de combustible en los tanques de cada unidad de la flota minera.' },
      ]
    },
    {
      id: 'sensor-llantas',
      title: 'Sensor de Presión de Llantas (TPMS)',
      desc: 'Sistema de monitoreo avanzado que registra la presión y la temperatura interna de cada neumático de la flota.',
      details: [
        'Actúa como un indicador indirecto del estado de la carretera y las condiciones de la pista.',
        'Permite identificar la presencia de objetos extraños o derrumbes en la vía mediante anomalías en la presión.',
        'Optimiza la resistencia al rodamiento; una presión correcta es vital para cumplir el objetivo de ahorro de combustible.'
      ],
      icon: <Disc size={32} className="text-amber-400" />,
      color: 'amber',
      images: [
        { src: '/dist/sensor-llanta.gif', title: 'Sensor de Presión de Llantas (TPMS)', desc: 'Sistema de monitoreo avanzado que registra la presión y la temperatura interna de cada neumático de la flota.' },
        { src: '/dist/sensor-llantas.jpg', title: 'Sensor de Presión de Llantas (TPMS)', desc: 'Sistema de monitoreo avanzado que registra la presión y la temperatura interna de cada neumático de la flota.' },
      ]
    }
  ];

  return (
    <section id="telemetria" className="py-24 bg-slate-900 border-t border-slate-800 relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Telemetría Avanzada</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Sensores IoT de grado industrial para una visibilidad total de sus activos críticos.
            </p>
          </div>

          <div className="space-y-24">
            {sensors.map((sensor, idx) => (
              <div key={sensor.id} id={sensor.id} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''} scroll-mt-32`}>

                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 relative group"
                >
                  <div className={`absolute inset-0 bg-${sensor.color}-500/10 rounded-2xl blur-xl group-hover:bg-${sensor.color}-500/20 transition-colors`}></div>
                  <div className="relative bg-slate-800/50 border border-slate-700/50 p-10 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors">
                    <div className={`w-16 h-16 bg-${sensor.color}-500/10 rounded-2xl flex items-center justify-center mb-6`}>
                      {sensor.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{sensor.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6">
                      {sensor.desc}
                    </p>
                    <ul className="space-y-3">
                      {sensor.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <CheckCircle size={18} className={`text-${sensor.color}-400 shrink-0 mt-1`} />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1"
                >
                  {/* Visual Representation */}
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 flex items-center justify-center relative overflow-hidden group">
                    {sensor.images ? (
                      <div
                        className="absolute inset-0 w-full h-full cursor-pointer hover:bg-blue-500/5 transition-colors"
                        onClick={() => {
                          const currentIndex = carouselIndices[sensor.id] || 0;
                          setSelectedImage(sensor.images[currentIndex]);
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={carouselIndices[sensor.id] || 0}
                            src={sensor.images[carouselIndices[sensor.id] || 0].src}
                            alt="Visualización en vivo"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-contain p-2"
                          />
                        </AnimatePresence>

                        {/* Overlay info */}
                        <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
                          <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm border border-white/10 group-hover:bg-blue-600/80 transition-colors">
                            {sensor.images[carouselIndices[sensor.id] || 0].title}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,107,158,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s] duration-[1500ms] group-hover:bg-[position:200%_0,0_0]"></div>
                        <div className="text-center p-8">
                          <div className={`w-24 h-24 mx-auto bg-${sensor.color}-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse`}>
                            {React.cloneElement(sensor.icon as React.ReactElement, { size: 48 } as any)}
                          </div>
                          <span className="text-slate-500 font-mono text-sm uppercase tracking-widest">Visualización en Vivo</span>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Telemetry Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-red-400 hover:text-red-200 focus:outline-none border border-red-400 rounded-md p-2 hover:bg-red-800 transition-colors cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black/50 relative flex items-center justify-center p-8">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg"
                />
              </div>
              <div className="p-8 bg-slate-900 border-t border-slate-800">
                <h3 className="text-2xl font-bold text-white mb-3">{selectedImage.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{selectedImage.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section >
  );
};

export default TelemetrySection;
