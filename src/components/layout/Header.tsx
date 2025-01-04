import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ShoppingBag, X, User } from 'lucide-react';
import { useCart } from 'react-use-cart';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-serif">
            Dolce Vita
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-amber-600 transition-colors">
              Home
            </Link>
            <Link to="/prodotti" className="hover:text-amber-600 transition-colors">
              Prodotti
            </Link>
            <Link to="/chi-siamo" className="hover:text-amber-600 transition-colors">
              Chi Siamo
            </Link>
            <Link to="/contatti" className="hover:text-amber-600 transition-colors">
              Contatti
            </Link>
          </nav>

          <div className="flex items-center space-x-3 md:space-x-4">
            {currentUser ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button className="flex items-center space-x-1 md:space-x-2">
                  <User className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="hidden md:inline text-sm">{currentUser.email}</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isUserMenuOpen ? 1 : 0,
                    y: isUserMenuOpen ? 0 : -10,
                    display: isUserMenuOpen ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                >
                  <Link to="/profilo" className="block px-4 py-2 hover:bg-gray-100">
                    Il mio profilo
                  </Link>
                  <Link to="/ordini" className="block px-4 py-2 hover:bg-gray-100">
                    I miei ordini
                  </Link>
                  <button 
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Esci
                  </button>
                </motion.div>
              </div>
            ) : (
              <div 
                className="relative"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button className="flex items-center space-x-1 md:space-x-2">
                  <User className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="hidden md:inline text-sm">Account</span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isUserMenuOpen ? 1 : 0,
                    y: isUserMenuOpen ? 0 : -10,
                    display: isUserMenuOpen ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                >
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Accedi
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Registrati
                  </Link>
                </motion.div>
              </div>
            )}
            <Link to="/carrello" className="relative">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 
                <X className="w-5 h-5" /> : 
                <Menu className="w-5 h-5" />
              }
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-4">
              <Link 
                to="/" 
                className="py-2 hover:text-amber-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/prodotti" 
                className="py-2 hover:text-amber-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Prodotti
              </Link>
              <Link 
                to="/chi-siamo" 
                className="py-2 hover:text-amber-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Chi Siamo
              </Link>
              <Link 
                to="/contatti" 
                className="py-2 hover:text-amber-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contatti
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};