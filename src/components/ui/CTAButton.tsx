import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  size?: 'default' | 'large' | 'compact';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  disabled = false,
  className = ''
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50 select-none rounded-none";
  
  // Height must be >= 52px on mobile as specified in requirements
  const sizeStyles = {
    default: "min-h-[52px] px-7 py-3.5 text-base sm:text-[15px]",
    large: "min-h-[56px] px-9 py-4 text-base sm:text-lg font-semibold",
    compact: "min-h-[44px] px-5 py-2.5 text-sm"
  };

  const variantStyles = {
    primary: "relative overflow-hidden bg-accent text-white shadow-sm border border-transparent active:scale-[0.99] before:absolute before:inset-0 before:bg-accent-hover before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-200 before:ease-mech-s",
    secondary: "bg-transparent border border-graphite/30 text-graphite hover:border-graphite hover:bg-graphite/5 active:scale-[0.99]",
    dark: "bg-white text-graphite-900 hover:bg-bone border border-transparent font-semibold active:scale-[0.99]",
    ghost: "bg-transparent text-bone/80 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick}>
        <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={combinedClasses}>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};
