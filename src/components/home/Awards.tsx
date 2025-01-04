import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Star, Trophy } from 'lucide-react';

export const Awards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const awards = [
    {
      icon: <Trophy className="w-12 h-12" />,
      title: "Miglior Pasticceria 2023",
      description: "Gambero Rosso"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Eccellenza Artigiana",
      description: "Camera di Commercio"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Premio Innovazione",
      description: "Accademia Maestri Pasticceri"
    }
  ];

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif mb-4">I Nostri Riconoscimenti</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            L'eccellenza della nostra pasticceria riconosciuta dai più prestigiosi enti del settore
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-6"
            >
              <div className="text-amber-600 mb-4 flex justify-center">
                {award.icon}
              </div>
              <h3 className="text-xl font-serif mb-2">{award.title}</h3>
              <p className="text-gray-600">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};