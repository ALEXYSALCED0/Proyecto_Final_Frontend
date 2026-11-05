import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionLink,
}) => {
  return (
    <div className="border-2 border-dashed border-[#b8ae98] bg-[#f7f2e4] rounded-2xl p-8 text-center my-6 max-w-lg mx-auto">
      <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl">
        📝
      </div>
      <h3 className="font-mono font-black text-lg text-[#2d3748] uppercase">
        {title}
      </h3>
      <p className="font-sans text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
        {description}
      </p>
      {actionText && actionLink && (
        <div className="mt-5">
          <Link
            to={actionLink}
            className="inline-block px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded uppercase tracking-wider shadow transition-colors"
          >
            {actionText}
          </Link>
        </div>
      )}
    </div>
  );
};