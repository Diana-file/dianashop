import React from 'react';
import { motion } from 'framer-motion';

interface LegalContentProps {
  content: {
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
}

export const LegalContent = ({ content }: LegalContentProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-gray-600 mb-8">Ultimo aggiornamento: {content.lastUpdated}</p>
        
        {content.sections.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-2xl font-serif mb-4">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </section>
        ))}
      </motion.div>
    </div>
  );
};