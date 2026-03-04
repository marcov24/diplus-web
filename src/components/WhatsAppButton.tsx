import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WHATSAPP_NUMBER = '51XXXXXXXXX'; // TODO: Reemplazar con el número real de Gunjop

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');

  const defaultMessage = 'Hola, me interesa conocer más sobre DIPLUS.';

  const handleSend = () => {
    const text = message.trim() || defaultMessage;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowChat(false);
    setMessage('');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !showChat && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg border border-slate-700 whitespace-nowrap mr-1"
            >
              Chatea con nosotros
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChat(!showChat)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors cursor-pointer"
          aria-label="Contactar por WhatsApp"
        >
          {showChat ? <X size={24} className="text-white" /> : <WhatsAppIcon size={28} />}
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-600 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <WhatsAppIcon size={22} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Gunjop DIPLUS</h4>
                <p className="text-green-100 text-xs">En línea</p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-950 min-h-[120px]">
              {/* Bot message */}
              <div className="flex gap-2 mb-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                  <WhatsAppIcon size={14} />
                </div>
                <div className="bg-slate-800 rounded-xl rounded-tl-none px-4 py-3 max-w-[220px] border border-slate-700/50">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    ¡Hola! 👋 ¿Te interesa conocer más sobre nosotros? Escríbenos un mensaje.
                  </p>
                  <span className="text-slate-500 text-[10px] mt-1 block text-right">Ahora</span>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-slate-800 text-white text-sm rounded-full px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-green-500 placeholder:text-slate-500"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <svg viewBox="0 0 24 24" width={18} height={18} fill="white">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;
