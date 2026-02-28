import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  loading = false,
  emptyMessage = "No products found. Try adjusting your filters."
}) => {
  if (loading) {
    return (
      <div className="pinboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Skeleton loaders */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="note-card overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="notebook-panel p-8 text-center">
        <h3 className="text-xl font-semibold text-[var(--color-ink)] mb-2">No Results Found</h3>
        <p className="text-[var(--color-muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="pinboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
