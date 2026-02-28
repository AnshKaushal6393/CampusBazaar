import React, { useState, useEffect } from 'react';
import { Product, FilterOptions } from '../types';
import { mockProducts } from '../data/mockData';
import { ProductContext } from './product-context';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load mock products on initial load
  useEffect(() => {
    const loadProducts = async () => {
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 800));
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  // Apply filters whenever products or filterOptions change
  useEffect(() => {
    if (!products.length) return;

    let filtered = [...products];

    if (filterOptions.category && filterOptions.category !== 'all') {
      filtered = filtered.filter(product => product.category === filterOptions.category);
    }

    if (filterOptions.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filterOptions.minPrice!);
    }

    if (filterOptions.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filterOptions.maxPrice!);
    }

    if (filterOptions.condition && filterOptions.condition !== 'all') {
      filtered = filtered.filter(product => product.condition === filterOptions.condition);
    }

    if (filterOptions.college) {
      filtered = filtered.filter(product => 
        product.college.toLowerCase().includes(filterOptions.college!.toLowerCase())
      );
    }

    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }

    if (filterOptions.onlyFree) {
      filtered = filtered.filter(product => product.isFree);
    }

    setFilteredProducts(filtered);
  }, [products, filterOptions]);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'seller'>) => {
    // This would be an API call in production
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      seller: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.edu',
        college: 'State University',
        isAdmin: false
      }
    };
    
    setProducts(prev => [newProduct, ...prev]);
  };

  const markAsSold = async (productId: string) => {
    // This would be an API call in production
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isSold: true } 
          : product
      )
    );
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getUserProducts = (userId: string) => {
    return products.filter(product => product.seller.id === userId);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        setFilterOptions,
        filterOptions,
        addProduct,
        markAsSold,
        getProductById,
        getUserProducts,
        isLoading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
