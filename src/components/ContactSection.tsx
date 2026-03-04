import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactSection = () => {
  const contacts = [
    { email: 'andre.jove@gunjop.com', label: 'Desarrollador de Negocios' },
    { email: 'cesar.benavides@gunjop.com', label: 'Desarrollador de Negocios' },
    { email: 'info@gunjop.com', label: 'Información General' },
  ];

  return (
    <section id="contacto" className="py-24 bg-slate-900 border-t border-slate-800/50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">Contáctanos</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contacts.map((contact, idx) => (
            <motion.a
              key={idx}
              href={`mailto:${contact.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800 transition-all group flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="text-slate-200 font-semibold text-lg mb-1">{contact.email}</h3>
              <p className="text-slate-400 text-sm">{contact.label}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
