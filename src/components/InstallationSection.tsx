import { useState } from 'react';
import { Server, Cpu, Target, CheckCircle } from 'lucide-react';
import Truck3DModal from './Truck3DModal';

const InstallationSection = () => {
  const [show3D, setShow3D] = useState(false);

  return (
    <section id="instalacion" className="py-24 bg-slate-950 border-t border-slate-800/50 relative overflow-hidden">
      <Truck3DModal isOpen={show3D} onClose={() => setShow3D(false)} />
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Implementación y Resultados</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Un despliegue eficiente diseñado para maximizar el valor desde el primer día.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Col 1: Cómo se instala */}
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800/50 hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Server size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">¿Cómo se instala?</h3>
            <ul className="space-y-4">
              {[
                "Despliegue de servidores locales",
                "Integración API con FMS",
                "Configuración de geocercas",
                "Capacitación de operadores"
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-400 text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>


          {/* Col 2: En qué camiones */}
          <div
            onClick={() => setShow3D(true)}
            className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800/50 hover:border-purple-500/30 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform relative z-10">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 relative z-10 flex items-center gap-2">
              Compatibilidad de Flota
              {/* <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">3D</span> */}
            </h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10">
              DIPLUS es agnóstico al fabricante y se integra con los principales modelos. <span className="text-purple-400 underline decoration-dotted">Ver modelos</span>.
            </p>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-200 font-medium">CAT</span>
                <span className="text-xs text-slate-500">793F, 797F, 794AC</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-200 font-medium">Komatsu</span>
                <span className="text-xs text-slate-500">930E, 980E</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-200 font-medium">Liebherr</span>
                <span className="text-xs text-slate-500">T 284, T 264</span>
              </div>
            </div>
          </div>

          {/* Col 3: % ROI */}
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800/50 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform relative z-10">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Retorno de Inversión</h3>
            <div className="my-6 relative z-10">
              <span className="text-6xl font-bold text-emerald-400 tracking-tight">8%</span>
              <p className="text-emerald-500/80 text-sm font-medium mt-1">ROI Primer Año</p>
            </div>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Ahorro Combustible</span>
                <span className="text-slate-200 font-medium">+8.5%</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Productividad</span>
                <span className="text-slate-200 font-medium">+12%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Vida Útil Neumáticos</span>
                <span className="text-slate-200 font-medium">+15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationSection;
