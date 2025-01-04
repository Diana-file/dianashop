export const products = [
  {
    id: '1',
    name: 'Classic Croissant',
    description: 'Buttery, flaky layers of perfection',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000',
    category: 'pastries',
    featured: true,
  },
  {
    id: '2',
    name: 'Dark Chocolate Éclair',
    description: 'Filled with rich chocolate cream',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=1000',
    category: 'pastries',
    featured: true,
  },
  // Add more products as needed
] as const;