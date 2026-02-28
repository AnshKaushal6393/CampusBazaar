import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/products/ProductFilter';
import { useProducts } from '../context/useProducts';
import { FilterOptions, ProductCategory } from '../types';
import CampusDoodle from '../components/common/CampusDoodle';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { filteredProducts, setFilterOptions, isLoading } = useProducts();
  const [initialFilters, setInitialFilters] = useState<FilterOptions>({});

  // Parse query parameters on mount and when location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters: FilterOptions = {};

    // Extract category
    const category = searchParams.get('category');
    if (category) {
      newFilters.category = category as ProductCategory;
    }

    // Extract price range
    const minPrice = searchParams.get('minPrice');
    if (minPrice) {
      newFilters.minPrice = parseFloat(minPrice);
    }

    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) {
      newFilters.maxPrice = parseFloat(maxPrice);
    }

    // Extract search query
    const search = searchParams.get('search');
    if (search) {
      newFilters.search = search;
    }

    // Extract college
    const college = searchParams.get('college');
    if (college) {
      newFilters.college = college;
    }

    // Extract onlyFree
    const onlyFree = searchParams.get('onlyFree');
    if (onlyFree === 'true') {
      newFilters.onlyFree = true;
    }

    setInitialFilters(newFilters);
    setFilterOptions(newFilters);
  }, [location.search, setFilterOptions]);

  // Update URL when filters change
  const handleFilterChange = (options: FilterOptions) => {
    // Update context
    setFilterOptions(options);

    // Update URL
    const searchParams = new URLSearchParams();
    
    if (options.category && options.category !== 'all') {
      searchParams.set('category', options.category);
    }
    
    if (options.minPrice !== undefined) {
      searchParams.set('minPrice', options.minPrice.toString());
    }
    
    if (options.maxPrice !== undefined) {
      searchParams.set('maxPrice', options.maxPrice.toString());
    }
    
    if (options.search) {
      searchParams.set('search', options.search);
    }
    
    if (options.college) {
      searchParams.set('college', options.college);
    }
    
    if (options.onlyFree) {
      searchParams.set('onlyFree', 'true');
    }
    
    const queryString = searchParams.toString();
    navigate({
      pathname: '/products',
      search: queryString ? `?${queryString}` : ''
    }, { replace: true });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-[var(--color-brand)]">
            <CampusDoodle variant="deal" className="w-7 h-7" />
            <p className="paper-tag">Campus Noticeboard</p>
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Browse Products</h1>
          <p className="text-[var(--color-muted)]">
            Find what you need from fellow students at your campus
          </p>
          <div className="scribble-divider mt-2" />
        </div>

        <ProductFilter onFilter={handleFilterChange} initialFilters={initialFilters} />
        
        <ProductList 
          products={filteredProducts} 
          loading={isLoading} 
          emptyMessage="No products match your filters. Try adjusting your search criteria or check back later for new listings."
        />
      </div>
    </Layout>
  );
};

export default ProductsPage;
