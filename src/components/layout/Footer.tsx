import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif mb-4">Dolce Vita</h3>
            <p className="text-sm text-gray-400">
              Prodotti artigianali di alta qualità
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Link Utili</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/chi-siamo" className="hover:text-white transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="hover:text-white transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Informazioni</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/spedizioni" className="hover:text-white transition-colors">
                  Spedizioni
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/termini" className="hover:text-white transition-colors">
                  Termini e Condizioni
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contattaci</h4>
            <div className="space-y-2 text-sm">
              <p>Email: info@dolcevita.it</p>
              <p>Tel: +39 123 456 7890</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Dolce Vita. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};