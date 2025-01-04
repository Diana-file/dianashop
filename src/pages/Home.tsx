import React from 'react';
import { Hero } from '../components/home/Hero';
import { Awards } from '../components/home/Awards';
import { Newsletter } from '../components/home/Newsletter';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { products } from '../data/products';

export const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div>
      <Hero />
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif mb-4">Le Nostre Creazioni</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Scopri la selezione dei nostri maestri pasticceri, 
              ogni dolce è realizzato con passione e ingredienti di prima qualità.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-amber-600 font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Awards />
      <Newsletter />
    </div>
  );
};