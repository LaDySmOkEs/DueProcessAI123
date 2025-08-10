// Alert component
import React from 'react';

export interface AlertProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function Alert({ children, className = "", variant = "default" }: AlertProps) {
  const variantClasses = {
    default: "bg-gray-50 border-gray-200 text-gray-900",
    success: "bg-green-50 border-green-200 text-green-900", 
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    error: "bg-red-50 border-red-200 text-red-900"
  };

  return (
    <div className={`border rounded-md p-4 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
}