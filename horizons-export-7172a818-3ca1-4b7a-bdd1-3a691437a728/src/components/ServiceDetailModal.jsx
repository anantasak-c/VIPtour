import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, Zap } from 'lucide-react';

const ServiceDetailModal = ({ service, onClose, onQuickBooking }) => {
  const { t } = useTranslation();
  if (!service || !service.details) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-3xl p-8 bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900">{service.title}</h2>
          <p className="text-slate-500 mt-2 text-lg">{t('modals.service_details')}</p>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="font-serif text-3xl text-slate-900 mb-6 border-b border-slate-200 pb-3">{t('modals.benefits')}</h3>
            <ul className="space-y-4">
              {service.details.breakdown.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 text-lg">{item.name}</p>
                    <p className="text-slate-600">{item.benefit}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-3xl text-slate-900 mb-6 border-b border-slate-200 pb-3">{t('modals.testimonials')}</h3>
            <div className="space-y-6">
              {service.details.testimonials.map((testimonial, index) => (
                <motion.blockquote 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + 0.1 * index }}
                  className="border-l-4 border-slate-200 pl-6"
                >
                  <p className="text-lg italic text-slate-600">"{testimonial.quote}"</p>
                  <footer className="mt-2 text-right text-slate-500 font-serif">- {testimonial.author}</footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            onClick={onQuickBooking}
            className="bg-slate-900 text-white hover:bg-slate-700 rounded-none px-10 py-7 text-base uppercase tracking-wider group"
          >
            {t('modals.book_service')} <Zap className="w-5 h-5 ml-3 group-hover:fill-current" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceDetailModal;