import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl px-4"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Artisanal Pastries & Sweet Delights
          </h1>
          <p className="text-xl mb-8">
            Discover our handcrafted pastries made with passion and tradition
          </p>
          <Link
            to="/shop"
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Explore Our Collection
          </Link>
        </motion.div>
      </div>
    </div>
  );
};