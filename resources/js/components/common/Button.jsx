import React from 'react';
import { Link } from '@inertiajs/react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  onClick,
  href,
  inertiaLink = false,
  className = '',
  type = 'button',
  fullWidth = false,
  style = {}
}) {
  const baseClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    white: 'btn-white'
  }[variant] || 'btn-primary';

  const sizeStyles = {
    sm: { padding: '8px 18px', fontSize: '13px' },
    md: {},
    lg: { padding: '16px 36px', fontSize: '16px' }
  }[size] || {};

  const widthStyle = fullWidth ? { width: '100%' } : {};

  const combinedStyles = {
    ...sizeStyles,
    ...widthStyle,
    ...style
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </>
  );

  if (href) {
    if (inertiaLink) {
      return (
        <Link
          href={href}
          className={`${baseClasses} ${className}`}
          style={combinedStyles}
          onClick={onClick}
        >
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={`${baseClasses} ${className}`}
        style={combinedStyles}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      style={combinedStyles}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
