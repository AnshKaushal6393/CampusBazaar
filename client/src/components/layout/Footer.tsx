import React, { useState } from 'react';
import { ShoppingBag, Mail, Phone, MapPin, Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="bg-[#102620] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-7 w-7 text-[#8fd1b5]" />
              <span className="text-xl font-bold">CampusBazaar</span>
            </Link>
            <p className="text-gray-300 mb-6 text-sm">
              Student marketplace to buy, sell, and exchange pre-loved items across campus.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Github" className="text-gray-300 hover:text-white transition">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/sell', label: 'Sell an Item' },
                { to: '/messages', label: 'Messages' },
                { to: '/profile', label: 'My Profile' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-300 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/products?category=books', label: 'Books' },
                { to: '/products?category=electronics', label: 'Electronics' },
                { to: '/products?category=furniture', label: 'Furniture' },
                { to: '/products?category=clothing', label: 'Clothing' },
                { to: '/products?category=hostel', label: 'Hostel Essentials' },
                { to: '/products?category=sports', label: 'Sports Equipment' },
              ].map((cat) => (
                <li key={cat.to}>
                  <Link to={cat.to} className="text-gray-300 hover:text-white transition">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic space-y-4 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5" />
                <span>123 Campus Drive, University District, 98765</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <a href="mailto:support@campusbazaar.com" className="hover:text-white transition">
                  support@campusbazaar.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <a href="tel:+12345678901" className="hover:text-white transition">
                  (123) 456-7890
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} CampusBazaar. All rights reserved.</p>
        </div>

        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-[var(--color-brand)] hover:bg-[var(--color-brand-strong)] text-white p-4 rounded-full shadow-lg transition"
            aria-label="Scroll to Top"
          >
            ^
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
