import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';

const QuickReservationForm = ({ onClose, services }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Reservation Request Sent!",
      description: "Thank you! We will contact you shortly to confirm the details.",
      duration: 5000,
      className: 'bg-green-600 border-green-500 text-white',
    });
    onClose();
  };

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
        className="relative w-full max-w-lg p-8 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl text-slate-900">{t('modals.quick_reservation_title')}</h2>
          <p className="text-slate-500 mt-2">{t('modals.quick_reservation_desc')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">{t('modals.your_name')}</Label>
            <Input type="text" id="name" placeholder={t('modals.your_name')} required />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">{t('modals.your_email')}</Label>
            <Input type="email" id="email" placeholder={t('modals.your_email')} required />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="service">{t('modals.select_service')}</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('modals.select_service')} />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service.id} value={service.id}>{service.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="details">{t('modals.your_message')}</Label>
            <Textarea id="details" placeholder={t('modals.your_message')} required className="min-h-[120px]" />
          </div>
          <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-700 rounded-none py-6 text-sm uppercase tracking-wider">
            {t('modals.send_inquiry')}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default QuickReservationForm;