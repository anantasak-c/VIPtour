import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

const FormSection = ({ title, children }) => (
  <motion.div 
    className="space-y-6 border-t border-slate-200 pt-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <h3 className="text-2xl font-serif text-slate-800">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {children}
    </div>
  </motion.div>
);

const FormItem = ({ children, className = "" }) => <div className={`grid w-full items-center gap-1.5 ${className}`}>{children}</div>;

const DetailedConsultationPage = ({ showSuccessModal }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      toast({
        title: "🚧 Backend not connected",
        description: "Please complete the Supabase integration to send your consultation form.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const healthConditions = Object.keys(t('consultation_form.health_conditions', { returnObjects: true }))
      .filter(key => data[`health_${key}`] === 'on')
      .map(key => t(`consultation_form.health_conditions.${key}`));

    const travelStyles = Object.keys(t('consultation_form.travel_styles', { returnObjects: true }))
      .filter(key => data[`style_${key}`] === 'on')
      .map(key => t(`consultation_form.travel_styles.${key}`));

    const accommodationTypes = Object.keys(t('consultation_form.accommodation_types', { returnObjects: true }))
      .filter(key => data[`accom_${key}`] === 'on')
      .map(key => t(`consultation_form.accommodation_types.${key}`));

    const submissionData = {
      ...data,
      health_conditions: healthConditions,
      travel_styles: travelStyles,
      accommodation_types: accommodationTypes,
    };

    const { error } = await supabase.from('consultations').insert([submissionData]);
    setLoading(false);

    if (error) {
      console.error('Supabase error:', error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } else {
      e.target.reset();
      showSuccessModal();
    }
  };

  const healthConditions = Object.keys(t('consultation_form.health_conditions', { returnObjects: true }));
  const travelStyles = Object.keys(t('consultation_form.travel_styles', { returnObjects: true }));
  const accommodationTypes = Object.keys(t('consultation_form.accommodation_types', { returnObjects: true }));
  const bedConfigs = Object.keys(t('consultation_form.bed_configs', { returnObjects: true }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{t('consultation_form.title')} - TBR The Bespoke Route</title>
        <meta name="description" content={t('consultation_form.subtitle')} />
      </Helmet>

      <section className="pt-48 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl text-slate-900 leading-tight"
          >
            {t('consultation_form.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto"
          >
            {t('consultation_form.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-12">
            <FormSection title={t('consultation_form.section_basic')}>
              <FormItem><Label htmlFor="name_passport">{t('consultation_form.name_passport')}</Label><Input name="name_passport" id="name_passport" required /></FormItem>
              <FormItem><Label htmlFor="dob">{t('consultation_form.dob')}</Label><Input name="dob" id="dob" type="date" required /></FormItem>
              <FormItem><Label htmlFor="nationality">{t('consultation_form.nationality')}</Label><Input name="nationality" id="nationality" required /></FormItem>
              <FormItem><Label htmlFor="passport_number">{t('consultation_form.passport_number')}</Label><Input name="passport_number" id="passport_number" /></FormItem>
              <FormItem className="md:col-span-2"><Label htmlFor="phone_kakaotalk">{t('consultation_form.phone_kakaotalk')}</Label><Input name="phone_kakaotalk" id="phone_kakaotalk" required /></FormItem>
              <FormItem className="md:col-span-2"><Label htmlFor="accompanying_travelers">{t('consultation_form.accompanying_travelers')}</Label><Textarea name="accompanying_travelers" id="accompanying_travelers" /></FormItem>
            </FormSection>

            <FormSection title={t('consultation_form.section_health')}>
              <FormItem className="md:col-span-2">
                <Label>{t('consultation_form.health_check_intro')}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {healthConditions.map((key) => (
                    <div key={key} className="flex items-center space-x-2"><Checkbox name={`health_${key}`} id={`health_${key}`} /><Label htmlFor={`health_${key}`}>{t(`consultation_form.health_conditions.${key}`)}</Label></div>
                  ))}
                </div>
              </FormItem>
              <FormItem className="md:col-span-2"><Label htmlFor="health_special_attention">{t('consultation_form.health_special_attention')}</Label><Textarea name="health_special_attention" id="health_special_attention" /></FormItem>
              <FormItem><Label htmlFor="current_medications">{t('consultation_form.current_medications')}</Label><Input name="current_medications" id="current_medications" /></FormItem>
              <FormItem><Label htmlFor="emergency_contact">{t('consultation_form.emergency_contact')}</Label><Input name="emergency_contact" id="emergency_contact" /></FormItem>
            </FormSection>

            <FormSection title={t('consultation_form.section_diet')}>
              <FormItem>
                <Label>{t('consultation_form.food_allergies.label')}</Label>
                <RadioGroup name="food_allergies" defaultValue="no" className="flex gap-4 pt-2">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="food_allergies_yes" /><Label htmlFor="food_allergies_yes">{t('consultation_form.yes')}</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="food_allergies_no" /><Label htmlFor="food_allergies_no">{t('consultation_form.no')}</Label></div>
                </RadioGroup>
              </FormItem>
              <FormItem><Label htmlFor="food_allergies_specify">{t('consultation_form.food_allergies.specify')}</Label><Input name="food_allergies_specify" id="food_allergies_specify" /></FormItem>
              <FormItem>
                <Label>{t('consultation_form.animal_allergies.label')}</Label>
                <RadioGroup name="animal_allergies" defaultValue="no" className="flex gap-4 pt-2">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="animal_allergies_yes" /><Label htmlFor="animal_allergies_yes">{t('consultation_form.yes')}</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="animal_allergies_no" /><Label htmlFor="animal_allergies_no">{t('consultation_form.no')}</Label></div>
                </RadioGroup>
              </FormItem>
              <FormItem><Label htmlFor="animal_allergies_specify">{t('consultation_form.animal_allergies.specify')}</Label><Input name="animal_allergies_specify" id="animal_allergies_specify" /></FormItem>
              <FormItem className="md:col-span-2"><Label htmlFor="preferred_diet">{t('consultation_form.preferred_diet')}</Label><Input name="preferred_diet" id="preferred_diet" /></FormItem>
              <FormItem><Label htmlFor="avoid_foods">{t('consultation_form.avoid_foods')}</Label><Input name="avoid_foods" id="avoid_foods" /></FormItem>
              <FormItem><Label htmlFor="alcohol">{t('consultation_form.alcohol')}</Label><Input name="alcohol" id="alcohol" /></FormItem>
            </FormSection>

            <FormSection title={t('consultation_form.section_transport')}>
              <FormItem className="md:col-span-2"><Label htmlFor="transport_ability">{t('consultation_form.transport_ability')}</Label><Input name="transport_ability" id="transport_ability" /></FormItem>
              <FormItem><Label htmlFor="long_distance_pref">{t('consultation_form.long_distance_pref')}</Label><Input name="long_distance_pref" id="long_distance_pref" /></FormItem>
              <FormItem><Label htmlFor="transport_discomfort">{t('consultation_form.transport_discomfort')}</Label><Input name="transport_discomfort" id="transport_discomfort" /></FormItem>
            </FormSection>

            <FormSection title={t('consultation_form.section_style')}>
              <FormItem className="md:col-span-2">
                <Label>{t('consultation_form.travel_style')}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {travelStyles.map((key) => (
                    <div key={key} className="flex items-center space-x-2"><Checkbox name={`style_${key}`} id={`style_${key}`} /><Label htmlFor={`style_${key}`}>{t(`consultation_form.travel_styles.${key}`)}</Label></div>
                  ))}
                </div>
              </FormItem>
              <FormItem className="md:col-span-2"><Label htmlFor="specific_activities">{t('consultation_form.specific_activities')}</Label><Textarea name="specific_activities" id="specific_activities" /></FormItem>
              <FormItem className="md:col-span-2"><Label htmlFor="avoid_activities">{t('consultation_form.avoid_activities')}</Label><Textarea name="avoid_activities" id="avoid_activities" /></FormItem>
              <FormItem className="md:col-span-2"><Label htmlFor="special_anniversary">{t('consultation_form.special_anniversary')}</Label><Input name="special_anniversary" id="special_anniversary" /></FormItem>
            </FormSection>

            <FormSection title={t('consultation_form.section_accommodation')}>
              <FormItem>
                <Label>{t('consultation_form.accommodation_type')}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {accommodationTypes.map((key) => (
                    <div key={key} className="flex items-center space-x-2"><Checkbox name={`accom_${key}`} id={`accom_${key}`} /><Label htmlFor={`accom_${key}`}>{t(`consultation_form.accommodation_types.${key}`)}</Label></div>
                  ))}
                </div>
              </FormItem>
              <FormItem>
                <Label>{t('consultation_form.bed_config')}</Label>
                <RadioGroup name="bed_config" defaultValue="king" className="flex flex-wrap gap-4 pt-2">
                  {bedConfigs.map((key) => (
                    <div key={key} className="flex items-center space-x-2"><RadioGroupItem value={key} id={`bed_${key}`} /><Label htmlFor={`bed_${key}`}>{t(`consultation_form.bed_configs.${key}`)}</Label></div>
                  ))}
                </RadioGroup>
              </FormItem>
              <FormItem className="md:col-span-2"><Label htmlFor="additional_services">{t('consultation_form.additional_services')}</Label><Textarea name="additional_services" id="additional_services" /></FormItem>
            </FormSection>

            <FormSection title={t('consultation_form.section_additional')}>
              <FormItem className="md:col-span-2">
                <Textarea name="additional_requests" id="additional_requests" className="min-h-[120px]" />
              </FormItem>
            </FormSection>

            <div className="pt-8">
              <Button type="submit" disabled={loading} className="w-full bg-slate-900 text-white hover:bg-slate-700 rounded-none py-6 text-sm uppercase tracking-wider">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('consultation_form.submit_button')}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

export default DetailedConsultationPage;