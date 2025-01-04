import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { LegalContent } from '../components/legal/LegalContent';

export const Terms = () => {
  const termsContent = {
    title: 'Termini e Condizioni',
    lastUpdated: '01/03/2024',
    sections: [
      {
        title: 'Accettazione dei Termini',
        content: 'Utilizzando il nostro sito web, accetti i presenti termini e condizioni nella loro interezza.'
      },
      {
        title: 'Ordini e Pagamenti',
        content: 'Tutti gli ordini sono soggetti a disponibilità e conferma del prezzo. I pagamenti devono essere effettuati al momento dell\'ordine.'
      },
      {
        title: 'Consegna',
        content: 'I tempi di consegna sono indicativi e possono variare in base alla zona di consegna e alla disponibilità dei prodotti.'
      }
    ]
  };

  return (
    <div className="pt-20">
      <PageHeader title="Termini e Condizioni" />
      <LegalContent content={termsContent} />
    </div>
  );
};