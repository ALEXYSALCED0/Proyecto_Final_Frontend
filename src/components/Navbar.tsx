import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const getTabClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm md:text-base font-bold transition-all rounded-t-lg border-t-2 border-x-2 shadow-sm ${
      isActive
        ? 'bg-[#fbf7ed] text-emerald-800 border-[#2d3748] -mb-[2px] z-10 scale-105'
        : 'bg-[#e2d9c2] text-[#554d3d] border-[#b8ae98] hover:bg-[#eae3d2]'
    }`;

  return (
    <header className="w-full max-w-5xl mx-auto pt-6 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#2d3748] pb-3">
        {/* Título estilo sello o membrete */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Volver al inicio">
          <span className="w-8 h-8 rounded-full bg-rose-500 border-2 border-black flex items-center justify-center text-white text-xs font-black shadow-md group-hover:rotate-12 transition-transform">
            PK
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-wider text-[#2d3748] uppercase font-mono">
              PokéDex<span className="text-rose-500">.Log</span>
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">
              Cuaderno de Campo v1.0
            </p>
          </div>
        </Link>

        {/* Pestañas de la libreta */}
        <nav aria-label="Navegación principal">
          <ul className="flex flex-wrap items-end gap-1 md:gap-2">
            <li>
              <NavLink to="/" className={getTabClass}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/explorar" className={getTabClass}>
                Explorar
              </NavLink>
            </li>
            <li>
              <NavLink to="/favoritos" className={getTabClass}>
                Favoritos
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={getTabClass}>
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};