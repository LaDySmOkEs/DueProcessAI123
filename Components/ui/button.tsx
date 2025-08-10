import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  onClick,
  type = 'button',
  disabled = false,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700'
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded disabled:opacity-50 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};