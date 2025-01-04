import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

  return (
    <section className="py-16 bg-amber-600">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl font-serif mb-4">Resta Aggiornato</h2>
          <p className="mb-8">
            Iscriviti alla nostra newsletter per ricevere le ultime novità e offerte speciali
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Il tuo indirizzo email"
              className="flex-1 px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-8 py-2 bg-white text-amber-600 rounded-full font-medium hover:bg-amber-50 transition-colors"
            >
              Iscriviti
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};