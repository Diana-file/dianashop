import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { id: 'all', name: 'Tutti' },
    { id: 'pastries', name: 'Pasticceria' },
    { id: 'cakes', name: 'Torte' },
    { id: 'bread', name: 'Pane' },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCategory === category.id
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};