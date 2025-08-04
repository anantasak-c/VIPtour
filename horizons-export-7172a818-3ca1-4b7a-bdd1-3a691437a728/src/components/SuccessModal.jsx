import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { CheckCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const SuccessModal = ({ onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-md p-8 bg-white shadow-2xl rounded-lg text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        >
          <CheckCircle className="h-12 w-12 text-green-600" />
        </motion.div>

        <h2 className="font-serif text-3xl text-slate-900 mb-3">{t('success_modal.title')}</h2>
        <p className="text-slate-600 mb-8">{t('success_modal.message')}</p>
        
        <Button 
          onClick={onClose}
          className="w-full bg-slate-900 text-white hover:bg-slate-700 rounded-none py-6 text-sm uppercase tracking-wider"
        >
          {t('success_modal.button')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessModal;