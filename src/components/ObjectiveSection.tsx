import { motion } from 'framer-motion';
import { Target, Cpu, Shield } from 'lucide-react';

const ObjectiveSection = () => {
  const cards = [
    { icon: <Target className="text-blue-400" size={32} />, title: 'Centralización', desc: 'Unificar toda la información operativa en una sola fuente de verdad accesible.' },
    { icon: <Cpu className="text-purple-400" size={32} />, title: 'Inteligencia', desc: 'Aplicar algoritmos predictivos para anticipar fallas y optimizar rutas.' },
    { icon: <Shield className="text-emerald-400" size={32} />, title: 'Seguridad', desc: 'Monitoreo constante para garantizar operaciones seguras y cumplimiento de estándares.' },
  ];

  return (
    <section id="objetivo" className="py-24 bg-slate-900 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nuestro Objetivo</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Gunjop DIPLUS es una plataforma de inteligencia minera diseñada para convertir el flujo masivo de datos provenientes de la telemetría en decisiones estratégicas simplificadas. Su arquitectura se centra en la eficiencia energética, específicamente en la reducción del gasto operativo derivado del consumo de combustible en flotas de acarreo de gran escala.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-colors group"
            >
              <div className="bg-slate-900/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectiveSection;
