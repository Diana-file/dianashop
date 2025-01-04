import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getOrdersByEmail } from '../services/orderService';
import { PageHeader } from '../components/shared/PageHeader';
import type { Order } from '../types/order';

export const OrdiniUtente = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser?.email) return;
      
      try {
        const userOrders = await getOrdersByEmail(currentUser.email);
        setOrders(userOrders);
      } catch (err) {
        setError('Errore nel caricamento degli ordini');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="pt-20">
        <PageHeader 
          title="I Miei Ordini" 
          subtitle="Storico dei tuoi acquisti"
        />
        <div className="container mx-auto px-4 py-16 text-center">
          Caricamento...
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <PageHeader 
        title="I Miei Ordini" 
        subtitle="Storico dei tuoi acquisti"
      />
      
      <div className="container mx-auto px-4 py-16">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">
            Non hai ancora effettuato ordini
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.paymentIntentId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      Ordine del {new Date(order.createdAt.toDate()).toLocaleDateString()}
                    </p>
                    <p className="font-medium">€{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status === 'new' ? 'Nuovo' :
                     order.status === 'processing' ? 'In lavorazione' :
                     order.status === 'shipped' ? 'Spedito' :
                     'Consegnato'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Spedizione a: {order.shippingDetails.firstName} {order.shippingDetails.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shippingDetails.address}, {order.shippingDetails.city} ({order.shippingDetails.postalCode})
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 