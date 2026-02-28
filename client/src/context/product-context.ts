import { createContext } from 'react';
import { Product, FilterOptions } from '../types';

export interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  setFilterOptions: (options: FilterOptions) => void;
  filterOptions: FilterOptions;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'seller'>) => Promise<void>;
  markAsSold: (productId: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getUserProducts: (userId: string) => Product[];
  isLoading: boolean;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
