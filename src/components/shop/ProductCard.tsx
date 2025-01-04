import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from 'react-use-cart';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <Link to={`/prodotto/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-6">
        <Link to={`/prodotto/${product.id}`}>
          <h3 className="text-xl font-serif mb-2">{product.name}</h3>
        </Link>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-amber-600 font-semibold">€{product.price.toFixed(2)}</p>
          <button
            onClick={() => addItem(product)}
            className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};