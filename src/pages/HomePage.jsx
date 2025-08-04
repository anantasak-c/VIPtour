import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Gem, Users, Utensils, Palette, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = ({ services, openDetailModal, setIsFormOpen, openDetailedServiceModal }) => {
  const { t, i18n } = useTranslation();

  const brandFeatures = [
    { icon: ShieldCheck, name: t('brand_intro.features.0') },
    { icon: Gem, name: t('brand_intro.features.1') },
    { icon: Users, name: t('brand_intro.features.2') },
    { icon: Utensils, name: t('brand_intro.features.3') },
    { icon: Palette, name: t('brand_intro.features.4') },
  ];

  const whyChooseUsPoints = [
    { icon: ShieldCheck, title: t('why_choose_us.points.0.title'), description: t('why_choose_us.points.0.description') },
    { icon: KeyRound, title: t('why_choose_us.points.1.title'), description: t('why_choose_us.points.1.description') },
    { icon: Gem, title: t('why_choose_us.points.2.title'), description: t('why_choose_us.points.2.description') },
  ];

  const detailedServices = [
    {
      title: t('detailed_services.immigration.title'),
      description: t('detailed_services.immigration.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/76189161551772724f402d653200fe43.jpg",
      imgAlt: "VIP airport lounge with comfortable seating"
    },
    {
      title: t('detailed_services.transportation.title'),
      description: t('detailed_services.transportation.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/eb352776bbfc20f62d5c6e6faf976315.jpg",
      imgAlt: "Chauffeur opening a luxury car door"
    },
    {
      title: t('detailed_services.security.title'),
      description: t('detailed_services.security.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/e78b1127a7fe52733fcfc9ca4b33ee41.jpg",
      imgAlt: "Professional security personnel standing guard"
    },
    {
      title: t('detailed_services.secretary.title'),
      description: t('detailed_services.secretary.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/a086bcd759d2617786c43a8e370d6492.jpg",
      imgAlt: "Professional handshake between two business people"
    },
    {
      title: t('detailed_services.dining.title'),
      description: t('detailed_services.dining.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/ab3719142aa047f87f5e6b1adaa7bf62.jpg",
      imgAlt: "Gourmet dish being served at a fine dining restaurant"
    },
    {
      title: t('detailed_services.culture.title'),
      description: t('detailed_services.culture.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/125d116ea1dfecaf8491fd33937b0027.jpg",
      imgAlt: "Exclusive art gallery viewing"
    },
    {
      title: t('detailed_services.business.title'),
      description: t('detailed_services.business.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/0cd015c76efc8a27458b7b0339c2e365.jpg",
      imgAlt: "Modern city skyline at dusk"
    },
    {
      title: t('detailed_services.medical.title'),
      description: t('detailed_services.medical.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/234f1fb2b10bbd8e878435eb589f0e66.jpg",
      imgAlt: "Private, modern hospital room"
    },
    {
      title: t('detailed_services.gifting.title'),
      description: t('detailed_services.gifting.description'),
      imgSrc: "https://horizons-cdn.hostinger.com/7172a818-3ca1-4b7a-bdd1-3a691437a728/daacf2849a5b5db6a29bd871b0f0855d.jpg",
      imgAlt: "Customized luxury gift boxes"
    }
  ];

  const ServiceCard = ({ service, onClick }) => (
    <motion.div
      onClick={onClick}
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-hidden rounded-lg mb-4">
        <img 
          src={service.imgSrc} 
          alt={service.imgAlt} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-serif text-slate-800 group-hover:text-slate-900 transition-colors">
        {service.title}
      </h3>
    </motion.div>
  );

  const DetailedServiceCard = ({ service, onClick }) => (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-lg mb-4">
        <img 
          src={service.imgSrc} 
          alt={service.imgAlt} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-serif text-slate-800 group-hover:text-slate-900 transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-600 mt-1 text-sm line-clamp-3">{service.description}</p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>TBR The Bespoke Route - Luxury VIP Services in Thailand</title>
        <meta name="description" content={t('hero.description')} />
      </Helmet>

      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            alt="Luxury yacht sailing on calm turquoise waters under a clear blue sky" src="https://images.unsplash.com/photo-1641787540215-53a5914bdef3" />
          <div className="absolute inset-0 bg-white/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="font-sans text-base md:text-lg uppercase tracking-widest text-slate-600 mb-4">
              {t('hero.subtitle')}
            </p>
            <h1 className="text-slate-900">
              {t('hero.title')}
            </h1>
            <p className={`mt-6 text-lg md:text-xl text-slate-700 ${i18n.language === 'ko' ? 'max-w-full' : 'max-w-lg'}`}>
              {t('hero.description')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button onClick={() => setIsFormOpen(true)} className="bg-slate-900 text-white hover:bg-slate-700 rounded-none px-8 py-7 text-sm uppercase tracking-wider">{t('hero.button_contact')}</Button>
              <Link to="/services">
                <Button variant="outline" className="bg-transparent border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-none px-8 py-7 text-sm uppercase tracking-wider w-full">{t('hero.button_explore')}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-slate-900 mb-6 tracking-wide">
              {t('brand_intro.title')}
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-12">
              {t('brand_intro.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-8">
              {brandFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-base md:text-lg text-slate-700">
                  <feature.icon className="w-5 h-5 text-slate-500" />
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
             <h2 className="text-slate-900 mb-4 tracking-wide">
              {t('why_choose_us.title')}
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              {t('why_choose_us.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUsPoints.map((point, index) => (
              <motion.div 
                key={index}
                className="text-center p-4 md:p-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-block bg-slate-200 p-4 rounded-full mb-4">
                  {React.createElement(eval(point.icon), { className: "w-8 h-8 text-slate-800" })}
                </div>
                <h3 className="font-serif text-2xl text-slate-800 mb-2">{point.title}</h3>
                <p className="text-slate-600">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
             <h2 className="text-slate-900 mb-4 tracking-wide">
              {t('home_page.signature_journeys_title')}
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              {t('home_page.signature_journeys_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} onClick={() => openDetailModal(service)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
             <h2 className="text-slate-900 mb-4 tracking-wide">
              {t('services_section.title')}
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              {t('services_section.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {detailedServices.map((service, index) => (
              <DetailedServiceCard key={index} service={service} onClick={() => openDetailedServiceModal(service)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl mb-4">{t('possibilities.brand')}</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6">
              {t('possibilities.title')}
            </h2>
            <p className="text-lg md:text-xl text-slate-300">
              {t('possibilities.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-slate-900 mb-6">
              {t('home_page.consultation_cta_title')}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-10">
              {t('home_page.consultation_cta_desc')}
            </p>
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-slate-900 text-white hover:bg-slate-700 rounded-none px-10 py-8 text-base uppercase tracking-wider"
            >
              {t('home_page.consultation_cta_button')}
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;