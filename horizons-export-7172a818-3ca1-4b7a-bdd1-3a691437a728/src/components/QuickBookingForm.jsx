import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import { Calendar as CalendarIcon, X, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const QuickBookingForm = ({ service, onClose }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      toast({
        title: "🚧 Backend not connected",
        description: "Please complete the Supabase integration to send inquiries.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      passengers: formData.get('passengers'),
      travel_date_from: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : null,
      travel_date_to: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : null,
      requests: formData.get('requests'),
      type: 'quick_booking',
      service_id: service.id,
      service_title: service.title,
    };

    const { error } = await supabase.from('inquiries').insert([data]);
    setLoading(false);

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } else {
      toast({
        title: "✅ Quick Inquiry Received!",
        description: "Now, please provide more details to help us craft your perfect journey.",
      });
      onClose();
      navigate('/detailed-consultation');
    }
  };

  const getServiceSpecificPlaceholder = () => {
    switch (service.id) {
      case 'ultimate-escape':
        return t('modals.flight_details');
      case 'business-engagements':
        return t('modals.business_objectives');
      case 'unforgettable-honeymoons':
        return t('modals.honeymoon_preferences');
      default:
        return t('modals.specific_requests');
    }
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
        className="relative w-full max-w-2xl p-8 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl text-slate-900">{t('modals.booking_form_title')} {service.title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">{t('modals.your_name')}</Label>
              <Input type="text" id="name" name="name" placeholder={t('modals.your_name')} required />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">{t('modals.your_email')}</Label>
              <Input type="email" id="email" name="email" placeholder={t('modals.your_email')} required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid w-full items-center gap-1.5">
                <Label>{t('quick_inquiry.travel_dates')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>{t('consultation_form.pick_a_date')}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="passengers">{t('modals.passengers')}</Label>
              <Input type="number" id="passengers" name="passengers" min="1" placeholder="e.g., 2" required />
            </div>
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="requests">{t('modals.additional_details')}</Label>
            <Textarea id="requests" name="requests" placeholder={getServiceSpecificPlaceholder()} className="min-h-[120px]" />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-slate-900 text-white hover:bg-slate-700 rounded-none py-6 text-sm uppercase tracking-wider group">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('quick_inquiry.cta')}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default QuickBookingForm;