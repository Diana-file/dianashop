import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';
import { PageHeader } from '../components/shared/PageHeader';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { Navigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51IU78vEXr2WN8c8uwfVXCI8pDGHKTFm6rBRZtYJ1Yayg7QtFkOYsWPlYW1DhFA2MlMEipDm3tt1eLsAemA5Yjf9C00OnF3h5FK');

export const Checkout = () => {
  const { cartTotal, isEmpty } = useCart();

  // Redirect se il carrello è vuoto
  if (isEmpty) {
    return <Navigate to="/carrello" />;
  }

  return (
    <div className="pt-20">
      <PageHeader 
        title="Checkout" 
        subtitle="Completa il tuo ordine"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={cartTotal} />
          </Elements>
        </div>
      </div>
    </div>
  );
}; 