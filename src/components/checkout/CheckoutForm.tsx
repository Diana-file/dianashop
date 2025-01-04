import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { useAuth } from '../../contexts/AuthContext';
import type { ShippingDetails } from '../../types/order';
import { createOrder } from '../../services/orderService';

interface CheckoutFormProps {
  amount: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount }) => {
  const { currentUser } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { items, emptyCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  // Se l'utente è loggato, pre-compiliamo i campi con i suoi dati
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: currentUser?.displayName?.split(' ')[0] || '',
    lastName: currentUser?.displayName?.split(' ')[1] || '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: currentUser?.email || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      console.log('Creazione PaymentIntent...');
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'eur'
        }),
      });

      if (!response.ok) {
        throw new Error('Errore nella risposta del server');
      }

      const { clientSecret } = await response.json();
      console.log('PaymentIntent creato, conferma pagamento...');

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
            email: shippingDetails.email,
            phone: shippingDetails.phone,
            address: {
              line1: shippingDetails.address,
              city: shippingDetails.city,
              postal_code: shippingDetails.postalCode,
            }
          }
        }
      });

      if (result.error) {
        console.error('Errore Stripe:', result.error);
        setError(result.error.message || 'Errore durante il pagamento');
      } else if (result.paymentIntent?.status === 'succeeded') {
        console.log('Pagamento completato con successo!');
        // 3. Se il pagamento è andato a buon fine, salviamo l'ordine
        const orderData = {
          userId: currentUser?.uid || 'guest',
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          totalAmount: amount,
          shippingDetails,
          status: 'new' as const,
          paymentStatus: 'completed' as const,
          paymentIntentId: result.paymentIntent.id
        };

        await createOrder(orderData);
        emptyCart();
        navigate('/conferma-ordine');
      }
    } catch (err) {
      console.error('Errore generico:', err);
      setError('Si è verificato un errore durante il pagamento');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4">Dettagli di Spedizione</h3>
        
        {!currentUser && (
          <div className="mb-6 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-800">
              Stai acquistando come ospite. 
              <button 
                onClick={() => navigate('/login')}
                className="ml-2 text-amber-600 hover:underline"
              >
                Accedi per un checkout più veloce
              </button>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                name="firstName"
                value={shippingDetails.firstName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cognome *
              </label>
              <input
                type="text"
                name="lastName"
                value={shippingDetails.lastName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefono *
              </label>
              <input
                type="tel"
                name="phone"
                value={shippingDetails.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Indirizzo di spedizione *
            </label>
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              placeholder="Via/Piazza, Numero civico"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Città *
              </label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CAP *
              </label>
              <input
                type="text"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
                pattern="[0-9]{5}"
                title="Inserisci un CAP valido (5 numeri)"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div>
            <h4 className="text-lg font-medium mb-4">Dettagli Pagamento</h4>
            <div className="p-4 border border-gray-300 rounded-md bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mb-4"
            >
              {error}
            </motion.div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Riepilogo Ordine</h4>
            <div className="flex justify-between mb-2">
              <span>Subtotale</span>
              <span>€{amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Totale</span>
              <span>€{amount.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full bg-amber-600 text-white py-3 rounded-full transition-colors ${
              (!stripe || processing) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-700'
            }`}
          >
            {processing ? 'Elaborazione...' : `Paga €${amount.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}; 