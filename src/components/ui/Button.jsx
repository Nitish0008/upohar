// src/components/ui/Button.jsx
import React from 'react';

const variants = {
  primary: 'btn-shimmer text-white font-semibold',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200',
  ghost: 'hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-200',
  danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-all duration-200',
  outline: 'border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 transition-all duration-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-2xl',
  xl: 'px-8 py-4 text-lg rounded-2xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconRight,
  disabled,
  loading,
  fullWidth,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
}
