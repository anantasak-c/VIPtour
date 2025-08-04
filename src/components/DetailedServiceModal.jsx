import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { X, ArrowRight } from 'lucide-react';

const DetailedServiceModal = ({ service, onClose, onProceed }) => {
  const { t } = useTranslation();
  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div>
          <img 
            src={service.imgSrc} 
            alt={service.imgAlt} 
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="p-8">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">{service.title}</h2>
          <p className="text-slate-600 leading-relaxed">{service.description}</p>
          <div className="mt-8 text-center">
            <Button 
              onClick={onProceed}
              className="bg-slate-900 text-white hover:bg-slate-700 rounded-none px-8 py-6 text-sm uppercase tracking-wider group"
            >
              {t('quick_inquiry.cta')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailedServiceModal;