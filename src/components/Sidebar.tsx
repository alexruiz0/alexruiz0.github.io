import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Briefcase, Code,
  Cpu, Mail, Menu, X, Github,
  Globe, ChevronLeft, ChevronRight, GraduationCap
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Experience', href: '#experience' },
    { icon: Code, label: 'Projects', href: '#projects' },
    { icon: GraduationCap, label: 'Education', href: '#education' },
    { icon: Cpu, label: 'Skills', href: '#skills' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/alexruiz0', label: 'GitHub' },
    { icon: Globe, href: 'https://alexruiz0.github.io', label: 'Portfolio' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 right-4 z-50 p-3 bg-slate-800 rounded-lg md:hidden border border-slate-700 shadow-lg"
      >
        {isMobileOpen ? (
          <X className="text-slate-200 w-5 h-5" />
        ) : (
          <Menu className="text-slate-200 w-5 h-5" />
        )}
      </motion.button>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? '16rem' : '5rem',
        }}
        className="fixed left-0 top-0 h-full bg-slate-900 text-white z-40 hidden md:block border-r border-slate-800"
      >
        <div className="flex flex-col h-full relative">
          {/* Toggle Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -right-3 top-20 bg-slate-800 border border-slate-700 rounded-full p-1.5 hover:bg-slate-700 transition-colors duration-200 shadow-lg"
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4 text-slate-300" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-300" />
            )}
          </motion.button>

          {/* Logo */}
          <div className="p-4 text-center border-b border-slate-800">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <span className="text-lg font-bold text-emerald-400">OI</span>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={item.href}>
                    <motion.a
                      href={item.href}
                      whileHover={{ x: 2 }}
                      className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                    >
                      <item.icon className={`w-5 h-5 min-w-[1.25rem] ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`} />
                      <motion.span
                        initial={false}
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          width: isOpen ? 'auto' : 0
                        }}
                        className="ml-3 whitespace-nowrap overflow-hidden font-medium"
                      >
                        {item.label}
                      </motion.span>
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex justify-center space-x-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white z-40 md:hidden border-r border-slate-800"
            >
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-4 text-center border-b border-slate-800">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-lg font-bold text-emerald-400">OI</span>
                  </motion.div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                  <ul className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.href.substring(1);
                      return (
                        <motion.li key={item.href} whileHover={{ x: 2 }}>
                          <a
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                              }`}
                          >
                            <item.icon className={`w-5 h-5 min-w-[1.25rem] ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                              }`} />
                            <span className="ml-3 whitespace-nowrap font-medium">{item.label}</span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Social Links */}
                <div className="p-4 border-t border-slate-800">
                  <div className="flex justify-center space-x-3">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                      >
                        <link.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;