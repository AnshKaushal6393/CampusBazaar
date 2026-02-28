import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/useAuth';
import CampusDoodle from '../components/common/CampusDoodle';

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    college: user?.college || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      updateProfile({
        college: formData.college,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="brand-gradient rounded-3xl p-8 text-white relative overflow-hidden hidden lg:flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CampusDoodle variant="leaf" className="w-8 h-8 text-white/90" />
              <span className="accent-pill">Profile Trust Boost</span>
            </div>
            <h2 className="text-4xl font-extrabold mt-6 leading-tight">Complete your profile to unlock faster responses.</h2>
            <p className="text-white/85 mt-4">Students are more likely to chat and close deals with verified-looking profiles.</p>
          </div>
          <div className="pin-card p-4 text-[var(--color-ink)]">
            <p className="text-sm font-semibold">Checklist: college, phone, pickup area.</p>
          </div>
        </div>

        <div className="notebook-panel py-8 px-4 sm:px-10">
          <div className="flex items-center gap-2 text-[var(--color-brand)]">
            <ShoppingBag className="h-7 w-7" />
            <p className="paper-tag">Complete Profile</p>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-[var(--color-ink)]">
            Your campus identity
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Add details that help fellow students trust your listings.
          </p>
          <div className="scribble-divider mt-3" />

          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-[var(--color-ink)]">
                College/University *
              </label>
              <div className="mt-1">
                <input
                  id="college"
                  name="college"
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                  className="campus-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-[var(--color-ink)]">
                Phone Number *
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="campus-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-[var(--color-ink)]">
                Address
              </label>
              <div className="mt-1">
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="campus-input"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Complete Profile'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
