import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ImagePlus, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { useProducts } from '../context/useProducts';
import { useAuth } from '../context/useAuth';
import { ProductCategory, ProductCondition } from '../types';

const SellProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '' as ProductCategory,
    condition: '' as ProductCondition,
    isFree: false,
    images: [] as string[]
  });

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/sell' } });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        // If checking "Free", set price to 0, if unchecking, reset to empty string
        ...(name === 'isFree' && { price: checked ? '0' : '' })
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Mock image upload - in a real app this would upload to a server/cloud storage
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, we'd upload the file to a server here
    // For this demo, we'll use placeholder images
    const placeholderImages = [
      'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2466756/pexels-photo-2466756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];
    
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, randomImage]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    
    if (!formData.isFree && (!formData.price.trim() || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0)) {
      setError('Please enter a valid price');
      return false;
    }
    
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }
    
    if (!formData.condition) {
      setError('Please select the item condition');
      return false;
    }
    
    if (formData.images.length === 0) {
      setError('Please upload at least one image');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await addProduct({
        title: formData.title,
        description: formData.description,
        price: formData.isFree ? 0 : parseFloat(formData.price),
        category: formData.category,
        condition: formData.condition,
        images: formData.images,
        isFree: formData.isFree,
        isSold: false,
        college: user?.college || 'Unknown College'
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <p className="paper-tag mb-2">Campus Listing Desk</p>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">Sell an Item</h1>
          <p className="text-[var(--color-muted)] mb-6">Post clear details so students can trust and respond quickly.</p>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 flex items-start border border-red-200">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Details */}
            <div className="notebook-panel p-6">
              <h2 className="text-xl font-semibold text-[var(--color-ink)] mb-4">Item Details</h2>
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="campus-input"
                  placeholder="e.g., Calculus Textbook 10th Edition"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="campus-input"
                  placeholder="Describe your item - condition, features, reason for selling, etc."
                  required
                />
              </div>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    id="isFree"
                    name="isFree"
                    type="checkbox"
                    checked={formData.isFree}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                  />
                  <label htmlFor="isFree" className="ml-2 text-sm font-medium text-[var(--color-ink)]">
                    This item is free (donation)
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                  Price *
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-brand)] focus:border-[var(--color-brand)]"
                    placeholder="0.00"
                    disabled={formData.isFree}
                    required={!formData.isFree}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-brand)] focus:border-[var(--color-brand)]"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                    <option value="hostel">Hostel Essentials</option>
                    <option value="sports">Sports Equipment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                    Condition *
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-md focus:ring-[var(--color-brand)] focus:border-[var(--color-brand)]"
                    required
                  >
                    <option value="" disabled>Select condition</option>
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Images */}
            <div className="note-card p-6">
              <h2 className="text-xl font-semibold text-[var(--color-ink)] mb-4">Images</h2>
              
              <div className="mb-4">
                <p className="text-sm text-[var(--color-muted)] mb-2">
                  Upload clear photos of your item. Add multiple angles to help buyers see details.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-md cursor-pointer hover:bg-[var(--color-brand-soft)]/40">
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-[var(--color-muted)] mt-1">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SellProductPage;
