import React from 'react';

export const LoadingSpinner: React.FC<{ text?: string }> = ({
  text = 'Consultando notas de campo...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-[#2d3748]" role="status">
      {/* Pokébola giratoria */}
      <div className="w-12 h-12 rounded-full border-4 border-[#2d3748] relative overflow-hidden animate-spin shadow-md">
        <div className="w-full h-1/2 bg-rose-500 border-b-2 border-[#2d3748]"></div>
        <div className="w-full h-1/2 bg-white"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#2d3748] rounded-full"></div>
      </div>
      <p className="mt-4 font-mono font-bold text-xs uppercase tracking-wider text-gray-600 animate-pulse">
        {text}
      </p>
    </div>
  );
};