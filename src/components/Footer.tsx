import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto py-6 px-4 mt-12 border-t-2 border-dashed border-[#b8ae98] text-center text-xs md:text-sm text-[#736853]">
      <p className="font-mono">
        © 2026 PokéDex Scrapbook — Registro de Avistamientos y Estadísticas
      </p>
      <p className="text-[11px] text-gray-500 mt-1">
        Construido con React, TypeScript, Tailwind CSS & PokeAPI
      </p>
    </footer>
  );
};