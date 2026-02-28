import React from 'react';

interface CampusDoodleProps {
  variant: 'book' | 'chat' | 'deal' | 'leaf';
  className?: string;
}

const CampusDoodle: React.FC<CampusDoodleProps> = ({ variant, className = 'w-8 h-8' }) => {
  const common = 'fill-none stroke-current stroke-[2.2]';

  if (variant === 'book') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path className={common} d="M6 7h8c2 0 3 1 3 3v15H9c-2 0-3-1-3-3V7z" />
        <path className={common} d="M26 7h-8c-2 0-3 1-3 3v15h8c2 0 3-1 3-3V7z" />
        <path className={common} d="M11 12h4M11 16h4M17 12h4M17 16h4" />
      </svg>
    );
  }

  if (variant === 'chat') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path className={common} d="M7 8h18a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-9l-6 4v-4H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z" />
        <circle cx="12" cy="15.5" r="1.3" className="fill-current stroke-none" />
        <circle cx="16" cy="15.5" r="1.3" className="fill-current stroke-none" />
        <circle cx="20" cy="15.5" r="1.3" className="fill-current stroke-none" />
      </svg>
    );
  }

  if (variant === 'deal') {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path className={common} d="M5 16l6-8h15a2 2 0 0 1 2 2v5l-9 11-5-3-9-7z" />
        <circle cx="21.5" cy="12.5" r="1.6" className={common} />
        <path className={common} d="M12 18l8 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path className={common} d="M16 27c7-3 11-9 9-16-4 0-8 2-11 6-3-4-7-6-11-6-2 7 2 13 9 16h4z" />
      <path className={common} d="M16 14v11" />
    </svg>
  );
};

export default CampusDoodle;
