import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'warning' | 'error' | 'success';
}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`text-sm ${className}`}>
    {children}
  </div>
);