
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SignatureServiceCard = ({ service, onClick, onBook }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="overflow-hidden">
        <img 
          className="w-full h-80 md:h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
          alt={service.imgAlt} src={service.imgSrc} />
      </div>
      <div className="pt-6">
        <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-2">
          {service.title}
        </h3>
        <p className="text-slate-600 mb-4">
          {service.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
          <Button 
            onClick={() => onBook(service)}
            className="bg-slate-900 text-white hover:bg-slate-700 rounded-none px-6 py-5 text-xs uppercase tracking-wider w-full sm:w-auto"
          >
            {t('modals.quick_booking')}
          </Button>
          <Button 
            onClick={() => onClick(service)}
            variant="link"
            className="text-slate-900 p-0 h-auto hover:underline"
          >
            {t('modals.more_details')} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

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

const ServicesPage = ({ signatureServices, openDetailModal, openBookingForm, openDetailedServiceModal }) => {
  const { t } = useTranslation();

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{t('nav.services')} - TBR The Bespoke Route</title>
        <meta name="description" content="Explore our full range of exclusive VIP services in Thailand, from seamless airport arrivals to elite business engagements and unforgettable bespoke journeys." />
      </Helmet>

      <section className="pt-32 md:pt-48 pb-16 md:pb-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-slate-900 leading-tight"
          >
            {t('nav.services')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl mx-auto"
          >
             {t('home_page.signature_journeys_subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {signatureServices.map((service, index) => (
              <SignatureServiceCard key={service.id} service={service} onClick={openDetailModal} onBook={openBookingForm} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-12 md:mb-16 text-center">
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
    </motion.div>
  );
};

export default ServicesPage;
