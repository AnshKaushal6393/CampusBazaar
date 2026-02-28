import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await login(email, password);
    if (success) {
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="brand-gradient rounded-3xl p-8 text-white relative overflow-hidden hidden lg:flex flex-col justify-between">
          <div className="absolute -right-12 -top-10 w-40 h-40 rounded-full bg-white/10" />
          <div>
            <span className="accent-pill">Campus Community</span>
            <h2 className="text-4xl font-extrabold mt-6 leading-tight">Log in and continue trading smarter on campus.</h2>
            <p className="text-white/85 mt-4">Connect with nearby students, save money, and keep good items in circulation.</p>
          </div>
          <div className="note-card p-4 text-[var(--color-ink)]">
            <p className="text-sm font-semibold">Tip: Use your college email for better trust.</p>
          </div>
        </div>

        <div className="notebook-panel p-7 sm:p-9">
          <Link to="/" className="inline-flex items-center gap-2 text-[var(--color-brand)] font-semibold mb-4">
            <ShoppingBag className="h-6 w-6" />
            CampusBazaar
          </Link>
          <p className="paper-tag">Welcome Back</p>
          <h1 className="text-3xl font-extrabold text-[var(--color-ink)] mt-3">Sign in to your account</h1>
          <p className="text-[var(--color-muted)] text-sm mt-2">Your campus marketplace is one step away.</p>

          <form className="space-y-5 mt-7" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-ink)] mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="campus-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-ink)] mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="campus-input"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl py-2.5 font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-strong)] transition"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center text-sm text-[var(--color-muted)] pt-2">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-[var(--color-brand)] hover:text-[var(--color-brand-strong)] font-semibold">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
