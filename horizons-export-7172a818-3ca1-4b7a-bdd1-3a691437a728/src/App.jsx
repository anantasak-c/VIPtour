
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import DetailedConsultationPage from '@/pages/DetailedConsultationPage';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import DetailedServiceModal from '@/components/DetailedServiceModal';
import QuickBookingForm from '@/components/QuickBookingForm';
import QuickInquiryForm from '@/components/QuickInquiryForm';
import SuccessModal from '@/components/SuccessModal';

const getSignatureServices = (t) => [
  {
    id: 'ultimate-escape',
    title: t('services.seamless_arrival.title'),
    description: t('services.seamless_arrival.description'),
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/7172a818-3ca1-4b7a-bdd1-3a691437a728/76ee2c11439ffe1abbf8ba43fa1b3e62.jpg",
    imgAlt: t('services.seamless_arrival.imgAlt'),
    details: {
      breakdown: [
        { name: t('services.seamless_arrival.details.breakdown.0.name'), benefit: t('services.seamless_arrival.details.breakdown.0.benefit') },
        { name: t('services.seamless_arrival.details.breakdown.1.name'), benefit: t('services.seamless_arrival.details.breakdown.1.benefit') },
        { name: t('services.seamless_arrival.details.breakdown.2.name'), benefit: t('services.seamless_arrival.details.breakdown.2.benefit') },
      ],
      testimonials: [
        { quote: t('services.seamless_arrival.details.testimonials.0.quote'), author: t('services.seamless_arrival.details.testimonials.0.author') },
        { quote: t('services.seamless_arrival.details.testimonials.1.quote'), author: t('services.seamless_arrival.details.testimonials.1.author') },
      ]
    }
  },
  {
    id: 'business-engagements',
    title: t('services.elite_business.title'),
    description: t('services.elite_business.description'),
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/7172a818-3ca1-4b7a-bdd1-3a691437a728/e5daee8c6186b49300a5001b534d74c9.jpg",
    imgAlt: t('services.elite_business.imgAlt'),
    details: {
      breakdown: [
        { name: t('services.elite_business.details.breakdown.0.name'), benefit: t('services.elite_business.details.breakdown.0.benefit') },
        { name: t('services.elite_business.details.breakdown.1.name'), benefit: t('services.elite_business.details.breakdown.1.benefit') },
        { name: t('services.elite_business.details.breakdown.2.name'), benefit: t('services.elite_business.details.breakdown.2.benefit') },
      ],
      testimonials: [
        { quote: t('services.elite_business.details.testimonials.0.quote'), author: t('services.elite_business.details.testimonials.0.author') },
        { quote: t('services.elite_business.details.testimonials.1.quote'), author: t('services.elite_business.details.testimonials.1.author') },
      ]
    }
  },
  {
    id: 'unforgettable-honeymoons',
    title: t('services.honeymoons.title'),
    description: t('services.honeymoons.description'),
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/7172a818-3ca1-4b7a-bdd1-3a691437a728/3826de06990c333803161a0a095e46d3.jpg",
    imgAlt: t('services.honeymoons.imgAlt'),
    details: {
      breakdown: [
        { name: t('services.honeymoons.details.breakdown.0.name'), benefit: t('services.honeymoons.details.breakdown.0.benefit') },
        { name: t('services.honeymoons.details.breakdown.1.name'), benefit: t('services.honeymoons.details.breakdown.1.benefit') },
        { name: t('services.honeymoons.details.breakdown.2.name'), benefit: t('services.honeymoons.details.breakdown.2.benefit') },
      ],
      testimonials: [
        { quote: t('services.honeymoons.details.testimonials.0.quote'), author: t('services.honeymoons.details.testimonials.0.author') },
        { quote: t('services.honeymoons.details.testimonials.1.quote'), author: t('services.honeymoons.details.testimonials.1.author') },
      ]
    }
  },
  {
    id: 'bespoke-journeys',
    title: t('services.bespoke_journeys.title'),
    description: t('services.bespoke_journeys.description'),
    imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/7172a818-3ca1-4b7a-bdd1-3a691437a728/54b861d8505c578d7b089b44670e12ef.jpg",
    imgAlt: t('services.bespoke_journeys.imgAlt'),
    details: {
      breakdown: [
        { name: t('services.bespoke_journeys.details.breakdown.0.name'), benefit: t('services.bespoke_journeys.details.breakdown.0.benefit') },
        { name: t('services.bespoke_journeys.details.breakdown.1.name'), benefit: t('services.bespoke_journeys.details.breakdown.1.benefit') },
        { name: t('services.bespoke_journeys.details.breakdown.2.name'), benefit: t('services.bespoke_journeys.details.breakdown.2.benefit') },
      ],
      testimonials: [
        { quote: t('services.bespoke_journeys.details.testimonials.0.quote'), author: t('services.bespoke_journeys.details.testimonials.0.author') },
        { quote: t('services.bespoke_journeys.details.testimonials.1.quote'), author: t('services.bespoke_journeys.details.testimonials.1.author') },
      ]
    }
  }
];

function App() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isQuickInquiryOpen, setQuickInquiryOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDetailedServiceModalOpen, setIsDetailedServiceModalOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [signatureServices, setSignatureServices] = useState(getSignatureServices(t));

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    setSignatureServices(getSignatureServices(t));
  }, [i18n.language, t]);

  const openDetailModal = (service) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };
  
  const openDetailedServiceModal = (service) => {
    setSelectedService(service);
    setIsDetailedServiceModalOpen(true);
  };

  const openBookingForm = (service) => {
    if (service.id === 'bespoke-journeys') {
      setQuickInquiryOpen(true);
    } else {
      setSelectedService(service);
      setIsBookingFormOpen(true);
    }
  };
  
  const openConsultationForm = () => setQuickInquiryOpen(true);
  
  const showSuccessModal = () => setSuccessModalOpen(true);

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-slate-800 overflow-x-hidden">
      <Header onQuickReservation={openConsultationForm} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage services={signatureServices} openDetailModal={openDetailModal} openBookingForm={openBookingForm} setIsFormOpen={setQuickInquiryOpen} openDetailedServiceModal={openDetailedServiceModal} />} />
          <Route path="/services" element={<ServicesPage signatureServices={signatureServices} openDetailModal={openDetailModal} openBookingForm={openBookingForm} openDetailedServiceModal={openDetailedServiceModal} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage onQuickReservation={openConsultationForm} showSuccessModal={showSuccessModal} />} />
          <Route path="/detailed-consultation" element={<DetailedConsultationPage showSuccessModal={showSuccessModal} />} />
        </Routes>
      </AnimatePresence>
      <Footer onQuickReservation={openConsultationForm} />
      <Toaster />

      <AnimatePresence>
        {isQuickInquiryOpen && <QuickInquiryForm onClose={() => setQuickInquiryOpen(false)} />}
        {isDetailModalOpen && selectedService && (
          <ServiceDetailModal 
            service={selectedService} 
            onClose={() => setIsDetailModalOpen(false)}
            onQuickBooking={() => {
              setIsDetailModalOpen(false);
              openBookingForm(selectedService);
            }}
          />
        )}
        {isDetailedServiceModalOpen && selectedService && (
          <DetailedServiceModal
            service={selectedService}
            onClose={() => setIsDetailedServiceModalOpen(false)}
            onProceed={() => {
              setIsDetailedServiceModalOpen(false);
              setQuickInquiryOpen(true);
            }}
          />
        )}
        {isBookingFormOpen && selectedService && (
          <QuickBookingForm 
            service={selectedService} 
            onClose={() => setIsBookingFormOpen(false)} 
          />
        )}
        {isSuccessModalOpen && (
          <SuccessModal onClose={() => setSuccessModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
