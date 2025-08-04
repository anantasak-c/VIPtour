import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from '@/components/ui/use-toast';

const FormSection = ({ title, children }) => (
  <div className="space-y-6 border-t border-slate-200 pt-6">
    <h3 className="text-2xl font-serif text-slate-800">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {children}
    </div>
  </div>
);

const FormItem = ({ children, className = "" }) => <div className={cn("grid w-full items-center gap-1.5", className)}>{children}</div>;

const ConsultationForm = ({ onClose }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [date, setDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Consultation Request Sent!",
      description: "Thank you for providing your information. Our team will contact you shortly to finalize your consultation.",
      duration: 5000,
      className: 'bg-green-600 border-green-500 text-white',
    });
    onClose();
  };

  const healthConditions = Object.keys(t('consultation_form.health_conditions', { returnObjects: true }));

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
        className="relative w-full max-w-4xl p-8 bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl text-slate-900">{t('consultation_form.title')}</h2>
          <p className="text-slate-500 mt-2 text-lg">{t('consultation_form.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <FormSection title={t('consultation_form.section_basic')}>
            <FormItem>
              <Label htmlFor="name_passport">{t('consultation_form.name_passport')}</Label>
              <Input id="name_passport" required />
            </FormItem>
            <FormItem>
              <Label htmlFor="dob">{t('consultation_form.dob')}</Label>
              <Input id="dob" type="date" required />
            </FormItem>
            <FormItem>
              <Label htmlFor="nationality">{t('consultation_form.nationality')}</Label>
              <Input id="nationality" required />
            </FormItem>
            <FormItem>
              <Label htmlFor="passport_number">{t('consultation_form.passport_number')}</Label>
              <Input id="passport_number" />
            </FormItem>
            <FormItem className="md:col-span-2">
              <Label htmlFor="phone_kakaotalk">{t('consultation_form.phone_kakaotalk')}</Label>
              <Input id="phone_kakaotalk" required />
            </FormItem>
            <FormItem className="md:col-span-2">
              <Label htmlFor="accompanying_travelers">{t('consultation_form.accompanying_travelers')}</Label>
              <Textarea id="accompanying_travelers" />
            </FormItem>
             <FormItem className="md:col-span-2">
                <Label>{t('consultation_form.consultation_date')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>{t('consultation_form.pick_a_date')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
          </FormSection>

          <FormSection title={t('consultation_form.section_health')}>
            <FormItem className="md:col-span-2">
              <Label>{t('consultation_form.health_check_intro')}</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {healthConditions.map((conditionKey) => (
                  <div key={conditionKey} className="flex items-center space-x-2">
                    <Checkbox id={conditionKey} />
                    <label htmlFor={conditionKey} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t(`consultation_form.health_conditions.${conditionKey}`)}
                    </label>
                  </div>
                ))}
              </div>
            </FormItem>
            <FormItem className="md:col-span-2">
              <Label htmlFor="health_special_attention">{t('consultation_form.health_special_attention')}</Label>
              <Textarea id="health_special_attention" />
            </FormItem>
            <FormItem>
              <Label htmlFor="current_medications">{t('consultation_form.current_medications')}</Label>
              <Input id="current_medications" />
            </FormItem>
            <FormItem>
              <Label htmlFor="emergency_contact">{t('consultation_form.emergency_contact')}</Label>
              <Input id="emergency_contact" />
            </FormItem>
          </FormSection>

          <FormSection title={t('consultation_form.section_diet')}>
            <FormItem>
              <Label>{t('consultation_form.food_allergies')}</Label>
              <RadioGroup defaultValue="no" className="flex gap-4 pt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="food_allergies_yes" /><Label htmlFor="food_allergies_yes">{t('consultation_form.yes')}</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="food_allergies_no" /><Label htmlFor="food_allergies_no">{t('consultation_form.no')}</Label></div>
              </RadioGroup>
            </FormItem>
            <FormItem>
              <Label>{t('consultation_form.animal_allergies')}</Label>
              <RadioGroup defaultValue="no" className="flex gap-4 pt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="animal_allergies_yes" /><Label htmlFor="animal_allergies_yes">{t('consultation_form.yes')}</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="animal_allergies_no" /><Label htmlFor="animal_allergies_no">{t('consultation_form.no')}</Label></div>
              </RadioGroup>
            </FormItem>
            <FormItem className="md:col-span-2">
              <Label>{t('consultation_form.preferred_diet')}</Label>
              <Input id="preferred_diet" placeholder={`${t('consultation_form.diets.standard')} / ${t('consultation_form.diets.vegetarian')} / ${t('consultation_form.diets.vegan')} / ${t('consultation_form.diets.other')}`} />
            </FormItem>
            <FormItem>
              <Label htmlFor="avoid_foods">{t('consultation_form.avoid_foods')}</Label>
              <Input id="avoid_foods" />
            </FormItem>
            <FormItem>
              <Label htmlFor="alcohol">{t('consultation_form.alcohol')}</Label>
              <Input id="alcohol" />
            </FormItem>
          </FormSection>

          <FormSection title={t('consultation_form.section_transport')}>
            <FormItem className="md:col-span-2">
              <Label htmlFor="transport_ability">{t('consultation_form.transport_ability')}</Label>
              <Input id="transport_ability" />
            </FormItem>
            <FormItem>
              <Label htmlFor="long_distance_pref">{t('consultation_form.long_distance_pref')}</Label>
              <Input id="long_distance_pref" />
            </FormItem>
            <FormItem>
              <Label htmlFor="transport_discomfort">{t('consultation_form.transport_discomfort')}</Label>
              <Input id="transport_discomfort" />
            </FormItem>
          </FormSection>

          <FormSection title={t('consultation_form.section_style')}>
            <FormItem>
              <Label htmlFor="travel_style">{t('consultation_form.travel_style')}</Label>
              <Input id="travel_style" />
            </FormItem>
            <FormItem>
              <Label htmlFor="specific_activities">{t('consultation_form.specific_activities')}</Label>
              <Input id="specific_activities" />
            </FormItem>
            <FormItem>
              <Label htmlFor="avoid_activities">{t('consultation_form.avoid_activities')}</Label>
              <Input id="avoid_activities" />
            </FormItem>
            <FormItem>
              <Label htmlFor="special_anniversary">{t('consultation_form.special_anniversary')}</Label>
              <Input id="special_anniversary" />
            </FormItem>
          </FormSection>

          <FormSection title={t('consultation_form.section_accommodation')}>
            <FormItem>
              <Label htmlFor="accommodation_type">{t('consultation_form.accommodation_type')}</Label>
              <Input id="accommodation_type" />
            </FormItem>
            <FormItem>
              <Label htmlFor="bed_config">{t('consultation_form.bed_config')}</Label>
              <Input id="bed_config" />
            </FormItem>
            <FormItem className="md:col-span-2">
              <Label htmlFor="additional_services">{t('consultation_form.additional_services')}</Label>
              <Textarea id="additional_services" />
            </FormItem>
          </FormSection>

          <div className="space-y-6 border-t border-slate-200 pt-6">
            <h3 className="text-2xl font-serif text-slate-800">{t('consultation_form.section_additional')}</h3>
            <Textarea id="additional_requests" className="min-h-[120px]" />
          </div>

          <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-700 rounded-none py-6 text-sm uppercase tracking-wider">
            {t('consultation_form.submit_button')}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ConsultationForm;