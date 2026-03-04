import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

// Componente de Contador Animado
const Counter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [motionValue, isInView, numericValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

// Componente de Métricas en Vivo
const MetricsBar = () => {
  const metrics = [
    { label: 'Ciclos Totales', value: '6,801', unit: '', change: '+124', color: 'text-purple-400' },
    { label: 'Consumo Combustible', value: '39,874', unit: 'gal', change: '-2.5%', color: 'text-amber-400' },
    { label: 'Distancia Recorrida', value: '32,520', unit: 'km', change: '+1.8%', color: 'text-blue-400' },
    { label: 'Emisiones CO2', value: '406', unit: 'TM', change: '-5%', color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="bg-slate-800/40 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 shadow-lg relative overflow-hidden group"
        >
          <div className={`absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity ${metric.color}`}>
            <div className="w-16 h-16 rounded-full bg-current blur-xl"></div>
          </div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{metric.label}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-3xl font-bold ${metric.color}`}>
              <Counter value={metric.value} />
            </span>
            <span className="text-slate-500 text-sm">{metric.unit}</span>
          </div>
          <div className="mt-2 flex items-center text-xs text-slate-400">
            <span className="text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded mr-2">
              {metric.change}
            </span>
            <span>vs. plan</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export { Counter };
export default MetricsBar;
