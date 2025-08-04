import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Crown, Target, Eye } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{t('about_page.title')} - TBR The Bespoke Route</title>
        <meta name="description" content={t('about_page.subtitle')} />
      </Helmet>

      <section className="pt-48 pb-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-6xl md:text-8xl text-slate-900 leading-tight"
          >
            {t('about_page.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto"
          >
            {t('about_page.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl text-slate-900 mb-6">{t('about_page.genesis_title')}</h2>
            <p className="text-slate-700 text-lg mb-4">
              {t('about_page.genesis_p1')}
            </p>
            <p className="text-slate-600">
              {t('about_page.genesis_p2')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[500px]"
          >
            <img  class="w-full h-full object-cover" alt="A person relaxing in an infinity pool overlooking a stunning bay with limestone karsts at sunset." src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7172a818-3ca1-4b7a-bdd1-3a691437a728/8ee7da306746f6540d88a3fbdfb12864.jpg" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0 }} viewport={{ once: true }}>
              <Crown className="w-10 h-10 mx-auto text-slate-500 mb-4" />
              <h3 className="font-serif text-3xl text-slate-900 mb-3">{t('about_page.value_exclusivity_title')}</h3>
              <p className="text-slate-600">{t('about_page.value_exclusivity_desc')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
              <Target className="w-10 h-10 mx-auto text-slate-500 mb-4" />
              <h3 className="font-serif text-3xl text-slate-900 mb-3">{t('about_page.value_precision_title')}</h3>
              <p className="text-slate-600">{t('about_page.value_precision_desc')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
              <Eye className="w-10 h-10 mx-auto text-slate-500 mb-4" />
              <h3 className="font-serif text-3xl text-slate-900 mb-3">{t('about_page.value_discretion_title')}</h3>
              <p className="text-slate-600">{t('about_page.value_discretion_desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;