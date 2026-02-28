import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ShoppingBag, DollarSign, MessageCircle, Tag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';
import Button from '../components/common/Button';
import { useAuth } from '../context/useAuth';
import { useProducts } from '../context/useProducts';
import { useChat } from '../context/useChat';
import { Product } from '../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { products, getUserProducts, isLoading } = useProducts();
  const { conversations } = useChat();
  const [activeTab, setActiveTab] = useState<'buying' | 'selling'>('buying');
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      const userProducts = getUserProducts(user.id);
      setMyProducts(userProducts);
    }
  }, [user, getUserProducts, products]);

  const recentProducts = [...products]
    .filter(product => !product.isSold && product.seller.id !== user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const activeListings = myProducts.filter(product => !product.isSold);
  const soldListings = myProducts.filter(product => product.isSold);

  const totalListings = myProducts.length;
  const totalActiveSales = activeListings.length;
  const totalSold = soldListings.length;
  const totalEarned = soldListings.reduce((sum, product) => sum + product.price, 0);
  const unreadMessages = conversations.reduce((count, conv) => count + conv.unreadCount, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <p className="campus-kicker mb-2">Your Marketplace Hub</p>
            <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-[var(--color-muted)]">
              Manage your marketplace activities
            </p>
          </div>
          <Link to="/sell">
            <Button
              variant="primary"
              icon={<PlusCircle className="h-5 w-5" />}
              className="mt-4 md:mt-0"
            >
              Sell an Item
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Stats Cards */}
          {[
            { label: 'My Listings', value: totalListings, icon: <ShoppingBag className="h-6 w-6 text-[var(--color-brand)]" />, bg: 'bg-[var(--color-brand-soft)]', sub: `${totalActiveSales} active, ${totalSold} sold` },
            { label: 'Sales', value: totalSold, icon: <Tag className="h-6 w-6 text-[var(--color-brand)]" />, bg: 'bg-[var(--color-brand-soft)]', sub: `${totalActiveSales} active listings` },
            { label: 'Earned', value: `$${totalEarned.toFixed(0)}`, icon: <DollarSign className="h-6 w-6 text-[#a45f00]" />, bg: 'bg-[#fff3dd]', sub: `From ${totalSold} completed sales` },
            { label: 'Messages', value: conversations.length, icon: <MessageCircle className="h-6 w-6 text-[var(--color-brand)]" />, bg: 'bg-[var(--color-brand-soft)]', sub: `${unreadMessages} unread messages` },
          ].map((card, index) => (
            <div key={index} className="surface-card rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[var(--color-muted)] text-sm">{card.label}</p>
                  <h3 className="text-3xl font-bold text-[var(--color-ink)] mt-1">{card.value}</h3>
                </div>
                <div className={`${card.bg} p-3 rounded-full`}>
                  {card.icon}
                </div>
              </div>
              <p className="text-sm text-[var(--color-muted)] mt-2">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabbed Section */}
          <div className="lg:col-span-2">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex -mb-px">
                {['buying', 'selling'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'buying' | 'selling')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-[var(--color-brand)] text-[var(--color-brand)]'
                        : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {activeTab === 'buying' ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[var(--color-ink)]">Recently Added</h2>
                  <Link to="/products" className="text-[var(--color-brand)] hover:text-[var(--color-brand-strong)] font-medium">
                    View all products
                  </Link>
                </div>
                <ProductList
                  products={recentProducts}
                  loading={isLoading}
                  emptyMessage="No products available. Check back later!"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[var(--color-ink)]">My Active Listings</h2>
                  <Link to="/sell" className="text-[var(--color-brand)] hover:text-[var(--color-brand-strong)] font-medium">
                    Add new listing
                  </Link>
                </div>
                <ProductList
                  products={activeListings}
                  loading={isLoading}
                  emptyMessage="You don't have any active listings."
                />
                {soldListings.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">Sold Items</h2>
                    <ProductList products={soldListings} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Section */}
          <div className="space-y-12">
            {/* Recent Conversations */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">Recent Messages</h2>
              {conversations.length === 0 ? (
                <p className="text-[var(--color-muted)]">No recent conversations yet.</p>
              ) : (
                <div className="space-y-4">
                  {conversations.slice(0, 5).map((conv) => (
                    <Link
                      key={conv.id}
                      to={`/messages?conversation=${conv.id}`}
                      className="surface-card flex items-center justify-between p-4 rounded-lg hover:shadow-md transition"
                    >
                      <div>
                        <p className="font-medium text-[var(--color-ink)]">{conv.participants.map(p => p.name).join(', ') || 'Unknown User'}</p>
                        <p className="text-[var(--color-muted)] text-sm">
                          Last message: {conv.lastMessage?.timestamp ? new Date(conv.lastMessage.timestamp).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold leading-none text-white bg-emerald-500 rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* My Recently Added Products */}
            {activeListings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-4">My Recent Listings</h2>
                <ProductList
                  products={[...activeListings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)}
                  loading={isLoading}
                  emptyMessage="You haven't listed anything recently."
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
