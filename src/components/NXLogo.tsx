import React from 'react';

interface NXLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'mark' | 'full';
  showSubtitle?: boolean;
}

export const NXLogoMark: React.FC<{ className?: string; size?: number | string }> = ({
  className = 'w-9 h-9',
  size,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <img
      src="/nx-logo.svg"
      alt="NX Media Logo"
      className={`shrink-0 object-contain ${className}`}
      style={style}
    />
  );
};

export const NXLogo: React.FC<NXLogoProps> = ({
  className = '',
  size = 32,
  variant = 'full',
  showSubtitle = true,
}) => {
  if (variant === 'mark') {
    return <NXLogoMark size={size} className={className} />;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <NXLogoMark size={size} />
      <div className="flex flex-col min-w-0">
        <span className="font-headline-sm text-base sm:text-lg uppercase tracking-tight font-extrabold text-on-surface leading-tight">
          NX Media
        </span>
        {showSubtitle && (
          <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider leading-none">
            A NexisparkX Group Division
          </span>
        )}
      </div>
    </div>
  );
};

export default NXLogo;
