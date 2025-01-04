import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PageHeader } from '../components/shared/PageHeader';

export const ChiSiamo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-20">
      <PageHeader 
        title="Chi Siamo" 
        subtitle="La nostra storia di passione e tradizione"
      />

      <div className="container mx-auto px-4 py-16">
        <motion.section
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-serif mb-6">La Nostra Storia</h2>
              <p className="text-gray-600 mb-6">
                Dal 1970, Dolce Vita rappresenta l'eccellenza della pasticceria italiana. 
                La nostra storia inizia in un piccolo laboratorio nel cuore di Milano, 
                dove la passione per l'arte dolciaria si è trasformata in una tradizione 
                familiare tramandata di generazione in generazione.
              </p>
              <p className="text-gray-600">
                Ogni giorno, i nostri maestri pasticceri creano con passione dolci 
                che uniscono tradizione e innovazione, utilizzando solo ingredienti 
                di prima qualità selezionati con cura.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556217477-d325251ece38?q=80&w=1000" 
                alt="Il nostro laboratorio"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <h3 className="text-xl font-serif mb-4">Tradizione</h3>
              <p className="text-gray-600">
                Ricette tramandate di generazione in generazione, custodendo 
                i segreti della vera pasticceria italiana.
              </p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <h3 className="text-xl font-serif mb-4">Qualità</h3>
              <p className="text-gray-600">
                Selezioniamo solo gli ingredienti migliori per garantire 
                l'eccellenza in ogni nostro prodotto.
              </p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <h3 className="text-xl font-serif mb-4">Passione</h3>
              <p className="text-gray-600">
                Mettiamo il cuore in ogni creazione, curando ogni dettaglio 
                con dedizione e amore per il nostro mestiere.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-serif mb-6">Il Nostro Team</h2>
            <p className="text-gray-600 mb-8">
              Il nostro team di esperti pasticceri combina creatività e tecnica 
              per dare vita a creazioni uniche che deliziano i nostri clienti.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Aggiungi qui le card del team se necessario */}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};