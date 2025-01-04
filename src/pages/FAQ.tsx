import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { FAQSection } from '../components/faq/FAQSection';

export const FAQ = () => {
  const faqSections = [
    {
      title: 'Ordini e Pagamenti',
      questions: [
        {
          question: 'Come posso effettuare un ordine?',
          answer: 'Puoi effettuare un ordine direttamente dal nostro sito web, selezionando i prodotti desiderati e procedendo al checkout.'
        },
        {
          question: 'Quali metodi di pagamento accettate?',
          answer: 'Accettiamo pagamenti con carte di credito, PayPal e bonifico bancario.'
        }
      ]
    },
    {
      title: 'Spedizioni',
      questions: [
        {
          question: 'Quanto tempo impiega la consegna?',
          answer: 'Le consegne vengono effettuate entro 24-48 ore dall\'ordine nella città di Milano e provincia.'
        },
        {
          question: 'Come vengono conservati i prodotti durante il trasporto?',
          answer: 'Utilizziamo speciali contenitori refrigerati per mantenere la freschezza dei nostri prodotti.'
        }
      ]
    }
  ];

  return (
    <div className="pt-20">
      <PageHeader title="Domande Frequenti" />
      <div className="container mx-auto px-4 py-16">
        {faqSections.map((section, index) => (
          <FAQSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
};