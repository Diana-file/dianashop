import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Euro } from 'lucide-react';

export const ShippingInfo = () => {
  const shippingDetails = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Zone di Consegna',
      description: 'Consegniamo in tutta Milano e provincia. Per altre zone, contattaci per verificare la disponibilità.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Tempi di Consegna',
      description: 'Consegna in giornata per ordini effettuati entro le 12:00. Il giorno successivo per ordini successivi.'
    },
    {
      icon: <Euro className="w-8 h-8" />,
      title: 'Costi di Spedizione',
      description: 'Spedizione gratuita per ordini superiori a 50€. Per ordini inferiori, il costo è di 5€.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {shippingDetails.map((detail, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="text-amber-600 mb-4">{detail.icon}</div>
          <h3 className="text-xl font-serif mb-2">{detail.title}</h3>
          <p className="text-gray-600">{detail.description}</p>
        </motion.div>
      ))}
    </div>
  );
};