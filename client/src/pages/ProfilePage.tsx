import React from 'react';
import Layout from '../components/layout/Layout';
import { useProducts } from '../context/useProducts';
import ProductList from '../components/products/ProductList';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { getUserProducts, isLoading } = useProducts();

  const userProducts = user ? getUserProducts(user.id) : [];
  const activeListings = userProducts.filter((p) => !p.isSold);
  const soldListings = userProducts.filter((p) => p.isSold);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="note-card overflow-hidden">
          <div className="brand-gradient h-32"></div>
          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="-mt-16 flex items-end space-x-5">
              <div className="flex">
                <img
                  src={user?.avatar || '/default-avatar.png'}
                  alt={user?.name || 'User Avatar'}
                  className="h-24 w-24 rounded-full ring-4 ring-white bg-white object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 pt-16">
                <p className="paper-tag mb-2">Student Profile</p>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] truncate">
                  {user?.name}
                </h2>
                <div className="mt-1 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
                  {user?.college && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.college}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {user?.email}
                  </div>
                  {user?.phoneNumber && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {user.phoneNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">Active Listings</h3>
          <ProductList
            products={activeListings}
            loading={isLoading}
            emptyMessage="You don't have any active listings"
          />
        </div>

        {soldListings.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4">Sold Items</h3>
            <ProductList products={soldListings} loading={isLoading} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
