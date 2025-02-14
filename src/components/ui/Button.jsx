import React from 'react';

export const Button = ({ children, onClick, className, variant, ...props }) => {
  const baseClass = "px-4 py-2 rounded text-white";
  const variantClass = variant === "destructive" ? "bg-red-600 hover:bg-red-700"
                    : variant === "outline" ? "border border-gray-600 text-gray-600"
                    : "bg-blue-600 hover:bg-blue-700";
  
  return (
    <button className={`${baseClass} ${variantClass} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
