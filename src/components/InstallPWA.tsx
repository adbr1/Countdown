import { Download } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';
import { motion } from 'framer-motion';

export function InstallPWA() {
  const { canInstall, installApp } = usePWA();

  if (!canInstall) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-black/80 backdrop-blur-lg rounded-xl p-4 border border-white/10 shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h3 className="text-white font-medium">Installer l'application</h3>
          <p className="text-white/70 text-sm mt-1">
            Installez TimeHub sur votre appareil pour un accès rapide
          </p>
        </div>
        <button
          onClick={installApp}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Download className="w-5 h-5 text-white" />
        </button>
      </div>
    </motion.div>
  );
}