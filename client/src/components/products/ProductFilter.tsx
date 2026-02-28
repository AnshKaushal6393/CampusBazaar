import React, { useState, useEffect } from 'react';
import { FilterOptions, ProductCategory, ProductCondition } from '../../types';
import { Filter, Search, X } from 'lucide-react';

interface ProductFilterProps {
  onFilter: (options: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const CATEGORIES: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'books', label: 'Books' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'hostel', label: 'Hostel Essentials' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' },
];

const CONDITIONS: { value: ProductCondition | 'all'; label: string }[] = [
  { value: 'all', label: 'Any Condition' },
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
];

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [college, setCollege] = useState(initialFilters.college || '');
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || '');
  const [search, setSearch] = useState(initialFilters.search || '');

  useEffect(() => {
    setFilters(initialFilters);
    setCollege(initialFilters.college || '');
    setMinPrice(initialFilters.minPrice?.toString() || '');
    setMaxPrice(initialFilters.maxPrice?.toString() || '');
    setSearch(initialFilters.search || '');
  }, [initialFilters]);

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: FilterOptions[keyof FilterOptions]
  ) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
  };

  const handlePriceChange = () => {
    const updated = { ...filters };
    if (minPrice) {
      updated.minPrice = parseFloat(minPrice);
    } else {
      delete updated.minPrice;
    }
    if (maxPrice) {
      updated.maxPrice = parseFloat(maxPrice);
    } else {
      delete updated.maxPrice;
    }
    setFilters(updated);
  };

  const handleCollegeChange = () => {
    const updated = { ...filters };
    if (college) {
      updated.college = college;
    } else {
      delete updated.college;
    }
    setFilters(updated);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...filters };
    if (search) {
      updated.search = search;
    } else {
      delete updated.search;
    }
    setFilters(updated);
    onFilter(updated);
  };

  const applyFilters = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const reset: FilterOptions = {};
    setFilters(reset);
    setCollege('');
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    onFilter(reset);
    setIsOpen(false);
  };

  const hasActiveFilters = () => {
    return Object.keys(filters).some((key) => {
      if (key === 'category') return filters.category !== 'all' && filters.category !== undefined;
      if (key === 'condition') return filters.condition !== 'all' && filters.condition !== undefined;
      return filters[key as keyof FilterOptions] !== undefined;
    });
  };

  const countActiveFilters = () => {
    let count = 0;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.condition && filters.condition !== 'all') count++;
    if (filters.minPrice !== undefined) count++;
    if (filters.maxPrice !== undefined) count++;
    if (filters.college) count++;
    if (filters.onlyFree) count++;
    return count;
  };

  return (
    <div className="mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="campus-input pl-10"
          />
          <Search className="absolute left-3 top-3.5 text-[var(--color-muted)] h-5 w-5" />
          <button
            type="submit"
            className="absolute right-3 top-2.5 bg-[var(--color-brand)] hover:bg-[var(--color-brand-strong)] text-white px-3 py-1 rounded-md"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter Button and Quick Categories */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
            hasActiveFilters() ? 'bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]' : 'bg-white text-[var(--color-ink)] border border-[var(--color-border)] hover:bg-[var(--color-brand-soft)]/60'
          }`}
        >
          <Filter className="h-5 w-5" />
          <span>Filter{countActiveFilters() > 0 ? ` (${countActiveFilters()})` : ''}</span>
        </button>

        <div className="hidden md:flex space-x-2 overflow-x-auto">
          {CATEGORIES.slice(0, 5).map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                handleFilterChange('category', cat.value);
                onFilter({ ...filters, category: cat.value });
              }}
              className={`px-3 py-1.5 rounded-full text-sm ${
                filters.category === cat.value
                  ? 'bg-[var(--color-brand)] text-white'
                  : 'bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:bg-[var(--color-brand-soft)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 rounded-full text-sm bg-white border border-[var(--color-border)] text-[var(--color-muted)] hover:bg-[var(--color-brand-soft)]"
          >
            More...
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="notebook-panel p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--color-ink)]">Filter Products</h3>
            <button onClick={() => setIsOpen(false)} className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Filters */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Category</label>
              <select
                value={filters.category || 'all'}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="campus-input"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Condition</label>
              <select
                value={filters.condition || 'all'}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="campus-input"
              >
                {CONDITIONS.map((cond) => (
                  <option key={cond.value} value={cond.value}>
                    {cond.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Price Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onBlur={handlePriceChange}
                  className="campus-input"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onBlur={handlePriceChange}
                  className="campus-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">College</label>
              <input
                type="text"
                placeholder="Enter college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                onBlur={handleCollegeChange}
                className="campus-input"
              />
            </div>

            <div className="flex items-center">
              <input
                id="onlyFree"
                type="checkbox"
                checked={filters.onlyFree || false}
                onChange={(e) => handleFilterChange('onlyFree', e.target.checked)}
                className="w-4 h-4 text-[var(--color-brand)] rounded focus:ring-[var(--color-brand)]"
              />
              <label htmlFor="onlyFree" className="ml-2 text-sm text-[var(--color-ink)]">
                Only Free Items
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-[var(--color-border)] rounded-md text-[var(--color-ink)] hover:bg-[var(--color-brand-soft)]"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-[var(--color-brand)] text-white rounded-md hover:bg-[var(--color-brand-strong)]"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
