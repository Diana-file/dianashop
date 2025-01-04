import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { useAuth } from '../contexts/AuthContext';

export const ConfermaOrdine = () => {
  const { currentUser } = useAuth();

  return (
    <div className="pt-20">
      <PageHeader 
        title="Ordine Confermato!" 
        subtitle="Grazie per il tuo acquisto"
      />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          
          <h2 className="text-2xl font-serif mb-4">
            Il tuo ordine è stato confermato
          </h2>
          
          <p className="text-gray-600 mb-4">
            Riceverai una email di conferma con i dettagli del tuo ordine.
          </p>

          <p className="text-gray-600 mb-8">
            Il tuo ordine verrà spedito il prima possibile.
            Ti terremo aggiornato sullo stato della spedizione via email.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/prodotti"
              className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors"
            >
              Continua lo Shopping
            </Link>
            
            {currentUser ? (
              <div>
                <Link
                  to="/ordini"
                  className="inline-block text-amber-600 hover:text-amber-700 mt-4"
                >
                  Visualizza i tuoi ordini
                </Link>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800">
                  Non sei registrato? Registrati per tenere traccia dei tuoi ordini e ricevere offerte esclusive.
                </p>
                <Link
                  to="/login"
                  className="inline-block text-amber-600 hover:text-amber-700 mt-2 underline"
                >
                  Accedi o Registrati
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 