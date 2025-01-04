import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from 'react-use-cart';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/shared/PageHeader';

export const Cart = () => {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    totalItems,
  } = useCart();
  const navigate = useNavigate();

  if (isEmpty) {
    return (
      <div className="pt-20">
        <PageHeader 
          title="Carrello" 
          subtitle="Il tuo carrello è vuoto"
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-8">
            Non hai ancora aggiunto prodotti al carrello.
          </p>
          <Link
            to="/prodotti"
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors"
          >
            Vai allo Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <PageHeader 
        title="Carrello" 
        subtitle={`${totalItems} prodotti nel carrello`}
      />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center py-6 border-b border-gray-200 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 ml-6">
                    <h3 className="text-lg font-serif">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-amber-600 font-semibold mt-2">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-amber-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-amber-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-serif">Totale</span>
              <span className="text-2xl font-serif text-amber-600">
                €{cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-amber-600 text-white py-3 rounded-full hover:bg-amber-700 transition-colors"
            >
              Procedi al Checkout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 