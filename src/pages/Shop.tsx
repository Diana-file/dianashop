import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CategoryFilter } from '../components/shop/CategoryFilter';
import { SearchBar } from '../components/shop/SearchBar';
import { ProductCard } from '../components/shop/ProductCard';
import { PageHeader } from '../components/shared/PageHeader';

const products = [
  {
    id: '1',
    name: 'Cannoli Siciliani',
    description: 'Cannoli freschi ripieni di ricotta di pecora e scaglie di cioccolato',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1624001934657-13b2a70a5bd5?q=80&w=1000',
    category: 'dolci',
  },
  {
    id: '2',
    name: 'Tiramisù Classico',
    description: 'Il classico tiramisù con savoiardi, caffè e mascarpone',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000',
    category: 'dolci',
  },
  {
    id: '3',
    name: 'Croissant alla Crema',
    description: 'Croissant artigianale ripieno di crema pasticcera',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=1000',
    category: 'cornetti',
  },
  {
    id: '4',
    name: 'Bignè al Cioccolato',
    description: 'Bignè ripieni di crema al cioccolato fondente',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1626803775151-61d756612f97?q=80&w=1000',
    category: 'mignon',
  },
  {
    id: '5',
    name: 'Millefoglie',
    description: 'Sfoglia croccante con crema chantilly e frutti di bosco',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?q=80&w=1000',
    category: 'dolci',
  },
  {
    id: '6',
    name: 'Torta al Cioccolato',
    description: 'Torta al cioccolato fondente con ganache',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000',
    category: 'torte',
  }
];

export const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      <PageHeader 
        title="I Nostri Prodotti" 
        subtitle="Scopri le nostre specialità artigianali"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};