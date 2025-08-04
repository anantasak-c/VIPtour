import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`font-sans text-xs uppercase transition-colors ${i18n.language === 'en' ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
      >
        EN
      </button>
      <span className="text-slate-400">/</span>
      <button
        onClick={() => changeLanguage('ko')}
        className={`font-sans text-xs uppercase transition-colors ${i18n.language === 'ko' ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
      >
        KO
      </button>
    </div>
  );
};


const Header = ({ onQuickReservation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: '-100%', transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center p-4 md:px-12 md:py-6"
        >
          <Link to="/" className="font-serif text-2xl tracking-[0.2em] uppercase z-40 text-slate-900">
            TBR
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans tracking-wider text-sm uppercase transition-colors ${location.pathname === link.path ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-6">
            <LanguageSwitcher />
            <Button onClick={onQuickReservation} className="font-sans tracking-wider text-xs uppercase bg-slate-900 text-white hover:bg-slate-700 rounded-none px-6 py-5">
              {t('nav.quick_reservation')}
            </Button>
          </div>
          <div className="md:hidden z-40">
            <button onClick={toggleMenu} className="text-slate-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-white z-20 flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-10">
              <Link to="/" className="font-serif text-3xl tracking-widest uppercase text-slate-900">{t('nav.home')}</Link>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-serif text-3xl tracking-widest uppercase transition-colors ${location.pathname === link.path ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8">
                <LanguageSwitcher />
              </div>
              <Button onClick={onQuickReservation} className="font-sans tracking-wider text-lg mt-8 uppercase bg-slate-900 text-white hover:bg-slate-700 rounded-none px-8 py-6">
                {t('nav.quick_reservation')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;