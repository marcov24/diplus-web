import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryView = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string, title: string, desc: string, info: string, category: string } | null>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tracking': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Histórico': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Monitoreo': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Combustible': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Estadísticas': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const images = [
    {
      src: 'tracking.png',
      title: 'Vista Principal',
      desc: 'Panorama general de la ubicación de toda la flota.',
      info: 'Panel de monitoreo en tiempo real que permite visualizar la ubicación, estado y trayectorias de los camiones en la operación minera sobre un mapa interactivo.',
      category: 'Tracking'
    },
    {
      src: 'tracking-histórico.png',
      title: 'Historial de Rutas',
      desc: 'Reproducción histórica de movimientos y rutas.',
      info: 'Visualiza el recorrido y los eventos de los camiones a lo largo del tiempo, muestra la trazabilidad completa de las unidades en el mapa y en tablas de datos.',
      category: 'Histórico'
    },
    {
      src: 'tracking-ciclos.png',
      title: 'Tracking de Ciclos',
      desc: 'Seguimiento geoespacial de los ciclos de transporte.',
      info: 'Análisis segmentado por ciclos de operación (por ejemplo, carga, descarga, traslado), permite comparar el desempeño y los tiempos de cada etapa. Facilita la optimización de los procesos logísticos.',
      category: 'Histórico'
    },
    {
      src: 'tracking-geocercas.png',
      title: 'Geocercas',
      desc: 'Visualización de zonas operativas y límites geográficos.',
      info: 'Información agrupada según geocercas o áreas de interés definidas en la operación. Analiza la frecuencia, duración y comportamiento de los camiones dentro de zonas específicas, ayuda a evaluar la eficiencia y el cumplimiento de rutas o restricciones operativas.',
      category: 'Histórico'
    },
    {
      src: 'tracking-mapa-de-calor.png',
      title: 'Mapa de Calor',
      desc: 'Densidad de tráfico y zonas de mayor actividad.',
      info: 'Permite analizar la densidad y los patrones de movimiento de los camiones mendiante un mapa de calor interactivo. Transforma los datos de localización histórica en una representación gráfica donde las zonas de mayor actividad o concentración de vehículos se destacan con colores más intensos.',
      category: 'Histórico'
    },
    {
      src: 'resumen-temporal.png',
      title: 'Resumen Temporal',
      desc: 'Línea de tiempo con eventos clave y métricas.',
      info: 'Panel analítico que permite visualizar y comparar el comportamiento de los camiones en la operación minera a lo largo de diferentes periodos de tiempo. Ofrece una visión agregada y dinámica de los datos de tracking, facilitando el análisis de tendencias, variaciones y patrones operativos.',
      category: 'Histórico'
    },
    {
      src: 'analisis-correlacion.png',
      title: 'Análisis de Correlación',
      desc: 'Correlación entre variables operativas.',
      info: 'Herramienta analítica que permite visualizar y analizar la relación entre dos o más variables operativas relevantes en la gestión minera, como velocidad, consumo de combustible, tonelaje, distancia recorrida, entre otras.',
      category: 'Monitoreo'
    },
    {
      src: 'ciclos-diario.png',
      title: 'Monitoreo de Ciclos Diario',
      desc: 'Resumen de ciclos de carga y descarga por día.',
      info: 'Panel analítico que permite visualizar y comparar el desempeño de los camiones en la operación minera, segmentando la información por ciclos operativos a lo largo de un día específico. Cada ciclo representa una secuencia completa de actividades realizadas por los camiones.',
      category: 'Monitoreo'
    },
    {
      src: 'ciclos-mensual.png',
      title: 'Monitoreo de Ciclos Mensual',
      desc: 'Evolución mensual de los ciclos operativos.',
      info: 'Panel de análisis que permite visualizar y comparar el desempeño de los camiones en la operación minera a lo largo de un periodo mensual, agrupando la información por ciclos operativos. Cada ciclo representa una secuencia completa de actividades realizadas por los camiones durante el mes seleccionado.',
      category: 'Monitoreo'
    },
    {
      src: 'consumo-combustible.png',
      title: 'Consumo de Combustible',
      desc: 'Visión general del consumo de combustible de la flota.',
      info: 'Panel dinámico que permite monitorear y analizar el consumo de combustible de los camiones en la operación minera de manera instantánea. Integra datos en vivo para ofrecer una visualización actualizada y detallada del gasto de combustible, facilitando la supervisión y la toma de decisiones operativas.',
      category: 'Combustible'
    },
    {
      src: 'consumo-por-periodo.png',
      title: 'Consumo Acumulativo por Periodos',
      desc: 'Comparativa de consumo entre diferentes periodos de tiempo.',
      info: 'Panel especializado que permite analizar el consumo de combustible de los camiones en la operación minera, agrupando la información por diferentes periodos de tiempo. Facilita la comparación y el seguimiento del gasto energético en la flota a lo largo de intervalos definidos.',
      category: 'Combustible'
    },
    {
      src: 'resumne-grifo.png',
      title: 'Resumen de Grifo',
      desc: 'Control de abastecimiento y niveles en grifos.',
      info: 'Panel especializado que permite monitorear, analizar y gestionar el estado y la operación de las tapas (cubiertas) de los camiones en la operación minera. Optimiza la seguridad, eficiencia y control de los procesos relacionados con la apertura y cierre de tapas durante las actividades de carga, descarga y traslado.',
      category: 'Combustible'
    },
    {
      src: 'consumo-combustible-fecha.png',
      title: 'Resumen de Consumo de Combustible por Fecha',
      desc: 'Análisis detallado de combustible usado en fechas específicas.',
      info: 'Panel analítico que permite visualizar, comparar y analizar el consumo de combustible de los camiones en la operación minera, segmentando la información por días o rangos de fechas seleccionados. Ayuda a monitorear el desempeño de la flota, detectar oportunidades de ahorro y tomar decisiones informadas para optimizar el uso de recursos energéticos en la operación minera.',
      category: 'Combustible'
    },
    {
      src: 'nivel-combustible.png',
      title: 'Estado de Nivel de Combustible',
      desc: 'Monitoreo en tiempo real del nivel de combustible en los tanques de cada unidad de la flota minera.',
      info: 'Monitoreo en tiempo real el nivel de combustible de los equipos, mostrando visualmente el porcentaje de llenado del tanque, y el consumo promedio en galones por hora.',
      category: 'Combustible'
    },
    {
      src: 'dashboard-operador.png',
      title: 'Análisis de datos por Ruta - Operador',
      desc: 'Métricas de rendimiento individual por operador.',
      info: 'Panel de gestión y análisis dedicado al personal encargado de la operación de los camiones en la mina. Permite visualizar, administrar y evaluar la información de los operadores, facilitando el control de asignaciones, desempeño y cumplimiento de turnos.',
      category: 'Estadísticas'
    },
    {
      src: 'dashboard-truck.png',
      title: 'Análisis de datos por Ruta - Camión',
      desc: 'Estado y telemetría en tiempo real de los camiones.',
      info: 'Análisis detallado de datos operativos de la flota de camiones en la operación minera. Se visualiza, filtra y exporta información clave sobre los viajes, rendimiento y el consumo de combustibles de los camiones, segmentando los ratos por rango de fechas, turno, ruta, tramo y unidad específica.',
      category: 'Estadísticas'
    },
  ];

  const categories = ['Todos', 'Tracking', 'Histórico', 'Monitoreo', 'Combustible', 'Estadísticas'];

  const filteredImages = activeFilter === 'Todos'
    ? images
    : images.filter(img => img.category === activeFilter);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, activeFilter]);

  const navigate = (direction: number) => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src);
    const nextIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <>
      {/* Filters Tab Bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === category
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
          >
            {activeFilter === category && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-blue-600 rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <AnimatePresence mode='popLayout'>
          {filteredImages.map((img) => (
            <motion.div
              layout
              key={img.src}
              layoutId={img.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedImage(img)}
              className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-900/50">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white bg-black/50 px-3 py-1 rounded-full text-sm font-medium transition-opacity">
                    Ver pantalla completa
                  </span>
                </div>
                <img
                  src={`/dist/${img.src}`}
                  alt={img.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 border-t border-slate-700/50">
                <h3 className="text-slate-100 text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {img.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {img.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(img.category)}`}>
                    {img.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence >
      </motion.div >

      {/* Lightbox Modal */}
      <AnimatePresence>
        {
          selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-red-400 hover:text-red-200 focus:outline-none border border-red-400 rounded-md p-2 hover:bg-red-800 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Navigation Buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all cursor-pointer z-50 hidden md:block"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all cursor-pointer z-50 hidden md:block"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                layoutId={selectedImage.src}
                className="w-full h-full flex flex-col items-center justify-center p-4"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={`/dist/${selectedImage.src}`}
                  alt={selectedImage.title}
                  className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-slate-700"
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-center"
                >
                  <h2 className="text-3xl font-bold text-white tracking-tight">{selectedImage.title}</h2>
                  <p className="text-slate-300 mt-2 text-lg max-w-2xl mx-auto leading-relaxed">{selectedImage.info}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
};

export default GalleryView;
