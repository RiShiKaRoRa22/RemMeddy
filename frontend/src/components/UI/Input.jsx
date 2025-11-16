import React from 'react';

export default function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  placeholder = '',
  className = ''
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}