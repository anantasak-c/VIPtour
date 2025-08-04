
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';

const Footer = ({ onQuickReservation }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleFeatureClick = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 4000,
      className: 'bg-slate-800 border-slate-700 text-white',
    });
  };
  
  const handleQuickReservationClick = (e) => {
    e.preventDefault();
    onQuickReservation();
  };

  return (
    <footer className="bg-[#F4F4F4] border-t border-slate-200 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-2xl tracking-[0.2em] uppercase text-slate-900">
              TBR
            </Link>
            <p className="text-slate-500 mt-4 max-w-xs mx-auto md:mx-0">
              {t('footer.about')}
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 uppercase tracking-wider">{t('footer.sitemap')}</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">{t('nav.home')}</Link>
                <Link to="/services" className="text-slate-500 hover:text-slate-900 transition-colors">{t('nav.services')}</Link>
                <Link to="/about" className="text-slate-500 hover:text-slate-900 transition-colors">{t('nav.about')}</Link>
                <Link to="/contact" className="text-slate-500 hover:text-slate-900 transition-colors">{t('nav.contact')}</Link>
                <a href="#" onClick={handleQuickReservationClick} className="text-slate-500 hover:text-slate-900 transition-colors">{t('footer.quick_reservation')}</a>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 uppercase tracking-wider">{t('footer.legal')}</h4>
              <nav className="flex flex-col space-y-2">
                <a href="#" onClick={handleFeatureClick} className="text-slate-500 hover:text-slate-900 transition-colors">{t('footer.privacy')}</a>
                <a href="#" onClick={handleFeatureClick} className="text-slate-500 hover:text-slate-900 transition-colors">{t('footer.terms')}</a>
              </nav>
            </div>
             <div>
              <h4 className="font-semibold text-slate-900 mb-4 uppercase tracking-wider">{t('footer.social')}</h4>
              <nav className="flex flex-col space-y-2">
                <a href="#" onClick={handleFeatureClick} className="text-slate-500 hover:text-slate-900 transition-colors">Instagram</a>
                <a href="#" onClick={handleFeatureClick} className="text-slate-500 hover:text-slate-900 transition-colors">LinkedIn</a>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
