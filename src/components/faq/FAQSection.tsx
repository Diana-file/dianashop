import React from 'react';
import { motion } from 'framer-motion';
import { FAQItem } from './FAQItem';

interface FAQSectionProps {
  title: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQSection = ({ title, questions }: FAQSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-serif mb-6">{title}</h2>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <FAQItem key={index} {...item} />
        ))}
      </div>
    </motion.section>
  );
};