import React from 'react';

export const Badge = ({ children, className, variant, ...props }) => {
  const baseClass = "inline-block px-2 py-1 rounded-full text-sm font-semibold";
  const variantClass = variant === "secondary" ? "bg-gray-300 text-gray-800"
                    : "bg-blue-600 text-white";
  
  return (
    <span className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </span>
  );
};
