import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { LegalContent } from '../components/legal/LegalContent';

export const Privacy = () => {
  const privacyContent = {
    title: 'Privacy Policy',
    lastUpdated: '01/03/2024',
    sections: [
      {
        title: 'Informazioni sulla Privacy',
        content: 'La tua privacy è importante per noi. Questa Privacy Policy spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.'
      },
      {
        title: 'Raccolta dei Dati',
        content: 'Raccogliamo solo i dati necessari per fornirti i nostri servizi, come nome, email e indirizzo di spedizione.'
      },
      {
        title: 'Utilizzo dei Dati',
        content: 'I tuoi dati vengono utilizzati esclusivamente per processare gli ordini, inviare newsletter (se richiesto) e migliorare i nostri servizi.'
      }
    ]
  };

  return (
    <div className="pt-20">
      <PageHeader title="Privacy Policy" />
      <LegalContent content={privacyContent} />
    </div>
  );
};