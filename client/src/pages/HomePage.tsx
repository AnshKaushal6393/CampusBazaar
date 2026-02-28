import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, ArrowRight, BookOpen, Laptop, ShoppingCart, DollarSign, MessageCircle, Award } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useProducts } from '../context/useProducts';
import ProductList from '../components/products/ProductList';

const HomePage: React.FC = () => {
  const { products, isLoading } = useProducts();

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const categories = [
    { label: 'Books', to: '/products?category=books', icon: BookOpen },
    { label: 'Electronics', to: '/products?category=electronics', icon: Laptop },
    { label: 'Furniture', to: '/products?category=furniture', icon: DollarSign },
    { label: 'Clothing', to: '/products?category=clothing', icon: ShoppingCart },
    { label: 'Hostel', to: '/products?category=hostel', icon: ShoppingBag },
    { label: 'Sports', to: '/products?category=sports', icon: Award },
  ];

  return (
    <Layout>
      <section className="brand-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)]" />
        <div className="container mx-auto px-4 py-16 md:py-22 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <span className="accent-pill mb-4">Student First Marketplace</span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-3">
                Buy Smart. Sell Fast. Keep Campus Circular.
              </h1>
              <p className="text-base md:text-lg text-white/85 mt-5">
                CampusBazaar helps students save money and reduce waste by trading trusted items within their own college community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold bg-white text-[var(--color-brand-strong)] hover:bg-[#eef4f1] transition-colors"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Explore Listings
                </Link>
                <Link
                  to="/sell"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold bg-black/20 hover:bg-black/30 border border-white/30 transition-colors"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Post an Item
                </Link>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="surface-card rounded-2xl p-3 rotate-[-2deg]">
                <img
                  src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Student selling textbook"
                  className="w-full h-40 object-cover rounded-xl"
                />
              </div>
              <div className="surface-card rounded-2xl p-3 rotate-[2deg] mt-8">
                <img
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Student marketplace"
                  className="w-full h-40 object-cover rounded-xl"
                />
              </div>
              <div className="surface-card rounded-2xl p-3 col-span-2">
                <img
                  src="https://images.pexels.com/photos/6646915/pexels-photo-6646915.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Students exchanging items"
                  className="w-full h-36 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <p className="campus-kicker mb-2">Browse Categories</p>
          <h2 className="text-3xl font-bold text-[var(--color-ink)]">What are you looking for today?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.label}
                  to={category.to}
                  className="surface-card rounded-xl p-5 text-center hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-ink)]">{category.label}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="campus-kicker">Live Listings</p>
              <h2 className="text-3xl font-bold text-[var(--color-ink)] mt-2">Fresh on Campus</h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center text-[var(--color-brand)] hover:text-[var(--color-brand-strong)] font-semibold"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductList products={recentProducts} loading={isLoading} />
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="surface-card rounded-2xl p-8 md:p-10">
            <p className="campus-kicker">How It Works</p>
            <h2 className="text-3xl font-bold text-[var(--color-ink)] mt-2 mb-8">Trade in three simple steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'List in Minutes', icon: ShoppingBag, text: 'Upload a photo, set a fair price, and publish to your campus buyers.' },
                { title: 'Chat Securely', icon: MessageCircle, text: 'Answer questions and arrange a meetup directly in the app.' },
                { title: 'Save + Reuse', icon: DollarSign, text: 'Complete the exchange, save money, and keep usable items in circulation.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-[var(--color-border)] bg-[#fbfcf8] p-5">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)] flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-ink)]">{item.title}</h3>
                    <p className="text-[var(--color-muted)] mt-2">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
