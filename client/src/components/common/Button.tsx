import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react'; // Use Lucide spinner icon (or replace)

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean; // <-- NEW
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false, // <-- NEW default
  className = '',
  icon
}) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-strong)] focus:ring-[var(--color-brand)]',
    secondary: 'bg-[var(--color-accent)] text-[#3f2a00] hover:bg-[#e48f08] focus:ring-[var(--color-accent)]',
    outline: 'bg-white text-[var(--color-ink)] border border-[var(--color-border)] hover:bg-[var(--color-brand-soft)] focus:ring-[var(--color-brand)]',
    danger: 'bg-[#c93c3c] text-white hover:bg-[#af2f2f] focus:ring-[#c93c3c]'
  };

  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading} // also disable when loading
      className={clsx(
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="animate-spin h-5 w-5" /> // spinner only when loading
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
