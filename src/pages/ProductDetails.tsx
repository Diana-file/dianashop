import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from 'react-use-cart';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl mb-4">Prodotto non trovato</h1>
          <Link to="/prodotti" className="text-amber-600 hover:text-amber-700">
            Torna al negozio
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-16">
        <Link to="/prodotti" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Torna al negozio
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-2xl text-amber-600 font-semibold mb-6">
              €{product.price.toFixed(2)}
            </p>
            {product.ingredients && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Ingredienti:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.allergens && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Allergeni:</h3>
                <p className="text-gray-600">{product.allergens.join(', ')}</p>
              </div>
            )}
            <button
              onClick={() => addItem(product)}
              className="w-full md:w-auto bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Aggiungi al carrello
            </button>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif mb-8">Prodotti correlati</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/prodotto/${relatedProduct.id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-serif mb-2">{relatedProduct.name}</h3>
                      <p className="text-amber-600 font-semibold">
                        €{relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};