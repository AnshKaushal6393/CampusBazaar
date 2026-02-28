import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MessageCircle, Tag, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { useProducts } from '../context/useProducts';
import { useAuth } from '../context/useAuth';
import { useChat } from '../context/useChat';
import { formatCurrency } from '../utils/formatCurrency';
import CampusDoodle from '../components/common/CampusDoodle';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, markAsSold, isLoading } = useProducts();
  const { user, isAuthenticated } = useAuth();
  const { startNewConversation } = useChat();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = id ? getProductById(id) : undefined;

  const handleMessageSeller = async () => {
    if (!product || !isAuthenticated || !user) {
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }

    if (user.id === product.seller.id) {
      toast.error('You cannot message yourself for your own listing.');
      return;
    }

    try {
      setIsSubmitting(true);
      const conversationId = await startNewConversation(product.id, product.seller.id);
      navigate(`/messages?conversation=${conversationId}`);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast.error('Could not open chat. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkAsSold = async () => {
    if (!product) return;
    try {
      setIsSubmitting(true);
      await markAsSold(product.id);
      toast.success('Listing marked as sold.');
    } catch (error) {
      console.error('Failed to mark item as sold:', error);
      toast.error('Could not update listing status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center text-gray-600">Loading product...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-[var(--color-ink)]">Product Not Found</h1>
          <p className="text-[var(--color-muted)] mt-2">This listing may have been removed.</p>
          <Link to="/products" className="inline-block mt-4 text-[var(--color-brand)] hover:text-[var(--color-brand-strong)] font-medium">
            Back to products
          </Link>
        </div>
      </Layout>
    );
  }

  const isOwner = user?.id === product.seller.id;
  const primaryImage =
    product.images?.[0] ||
    'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-[var(--color-brand)] mb-4">
          <CampusDoodle variant="deal" className="w-7 h-7" />
          <span className="paper-tag">Listing Detail</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="pin-card rounded-lg overflow-hidden">
            <img src={primaryImage} alt={product.title} className="w-full h-[420px] object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-ink)]">{product.title}</h1>
              <p className="text-2xl font-semibold text-[var(--color-brand)] mt-2">
                {product.isFree ? 'FREE' : formatCurrency(product.price)}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
              <span className="inline-flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span className="capitalize">{product.category}</span>
              </span>
              <span className="inline-flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="notebook-panel p-5">
              <h2 className="text-lg font-semibold text-[var(--color-ink)] mb-2">Description</h2>
              <p className="text-[var(--color-muted)] leading-relaxed">{product.description}</p>
            </div>

            <div className="pin-card p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    product.seller.avatar ||
                    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
                  }
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-[var(--color-ink)]">{product.seller.name}</p>
                  <p className="text-sm text-[var(--color-muted)]">{product.college}</p>
                </div>
              </div>

              {isOwner ? (
                <Button
                  variant="outline"
                  onClick={handleMarkAsSold}
                  disabled={isSubmitting || product.isSold}
                >
                  {product.isSold ? 'Already Sold' : 'Mark as Sold'}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  icon={<MessageCircle className="h-4 w-4" />}
                  onClick={handleMessageSeller}
                  disabled={isSubmitting || product.isSold}
                >
                  {product.isSold ? 'Item Sold' : 'Message Seller'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
