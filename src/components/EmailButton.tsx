import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Send, CheckCircle } from 'lucide-react';

const CONTACT_EMAIL = 'contacto@gunjop.com'; // TODO: Reemplazar con el correo real de Gunjop

const EmailButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSend = () => {
    const subject = encodeURIComponent(`Consulta DIPLUS - ${form.name || 'Visitante'}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nCorreo: ${form.email}\n\nMensaje:\n${form.message || 'Me interesa conocer más sobre ustedes.'}`
    );
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_self');
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setShowForm(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  const isValid = form.name.trim() && form.email.trim();

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !showForm && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg border border-slate-700 whitespace-nowrap mr-1"
            >
              Envíanos un correo
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setShowForm(!showForm); setSent(false); }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-14 h-14 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transition-colors cursor-pointer"
          aria-label="Contactar por correo"
        >
          {showForm ? <X size={24} className="text-white" /> : <Mail size={24} className="text-white" />}
        </motion.button>
      </div>

      {/* Form Panel */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[10.5rem] right-6 z-50 w-80 bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Contacto por Correo</h4>
                <p className="text-blue-100 text-xs">Te responderemos pronto</p>
              </div>
            </div>

            {sent ? (
              /* Success State */
              <div className="p-8 bg-slate-950 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={48} className="text-emerald-400" />
                </motion.div>
                <p className="text-white font-medium text-center">¡Listo!</p>
                <p className="text-slate-400 text-sm text-center">Se abrió tu cliente de correo con el mensaje prellenado.</p>
              </div>
            ) : (
              /* Form */
              <>
                <div className="p-4 bg-slate-950">
                  {/* Bot message */}
                  <div className="flex gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
                      <Mail size={14} className="text-blue-400" />
                    </div>
                    <div className="bg-slate-800 rounded-xl rounded-tl-none px-4 py-3 max-w-[220px] border border-slate-700/50">
                      <p className="text-slate-300 text-sm leading-relaxed">
                        ¡Hola! 👋 Completa tus datos y te contactaremos.
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-3 mt-2">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre *"
                      className="w-full bg-slate-800 text-white text-sm rounded-lg px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Tu correo electrónico *"
                      className="w-full bg-slate-800 text-white text-sm rounded-lg px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tu mensaje (opcional)"
                      rows={3}
                      className="w-full bg-slate-800 text-white text-sm rounded-lg px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 placeholder:text-slate-500 resize-none"
                    />
                  </div>
                </div>

                {/* Send Button */}
                <div className="p-3 bg-slate-900 border-t border-slate-800">
                  <button
                    onClick={handleSend}
                    disabled={!isValid}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                      isValid
                        ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Send size={16} />
                    Enviar Mensaje
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmailButton;
