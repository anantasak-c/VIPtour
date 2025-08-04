import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const ContactPage = ({ showSuccessModal }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      toast({
        title: "🚧 Backend not connected",
        description: "Please complete the Supabase integration to send messages.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const { error } = await supabase.from('contacts').insert([
      { name: data.name, email: data.email, message: data.message }
    ]);

    setLoading(false);

    if (error) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{t('nav.contact')} - TBR The Bespoke Route</title>
        <meta name="description" content={t('contact_page.subtitle')} />
      </Helmet>

      <section className="pt-48 pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-6xl md:text-8xl text-slate-900 leading-tight"
          >
            {t('contact_page.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto"
          >
            {t('contact_page.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <h2 className="font-serif text-4xl text-slate-900 mb-8">{t('contact_page.form_title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">{t('contact_page.form_name')}</Label>
                <Input type="text" id="name" name="name" placeholder={t('contact_page.form_name')} required />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">{t('contact_page.form_email')}</Label>
                <Input type="email" id="email" name="email" placeholder={t('contact_page.form_email')} required />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="message">{t('contact_page.form_message')}</Label>
                <Textarea id="message" name="message" placeholder={t('contact_page.form_message')} required className="min-h-[150px]" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-slate-900 text-white hover:bg-slate-700 rounded-none py-6 text-sm uppercase tracking-wider">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('contact_page.form_send')}
              </Button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h2 className="font-serif text-4xl text-slate-900 mb-8">{t('contact_page.info_title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-slate-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-800">{t('contact_page.info_email')}</h3>
                  <p className="text-slate-600">contact@thebespokeroute.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-slate-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-800">{t('contact_page.info_phone')}</h3>
                  <p className="text-slate-600">+66 12 345 6789</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-slate-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-800">{t('contact_page.info_based_in')}</h3>
                  <p className="text-slate-600">{t('contact_page.info_based_in_city')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;