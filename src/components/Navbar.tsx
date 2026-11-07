import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, Star, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const getTabClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-mono font-bold tracking-wide transition-all duration-200 rounded-xl border ${isActive
      ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 border-cyan-200 shadow-[0_0_16px_rgba(56,189,248,0.55)] scale-[1.02]'
      : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-cyan-300 hover:border-cyan-500/40'
    }`;

  return (
    <header className="w-full mb-3">
      {/* Bisel superior de la Pokédex */}
      <div className="bg-slate-950/95 backdrop-blur-md border-2 border-slate-800 rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Lente principal e indicador */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-hidden"
            aria-label="Volver al inicio de la Pokédex"
          >
            {/* Lente azul característico de la Pokédex */}
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-sky-600 via-cyan-400 to-white p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.85)] group-hover:shadow-[0_0_28px_rgba(56,189,248,1)] transition-all">
              <div className="w-full h-full rounded-full bg-slate-950/30 border-2 border-white/80 flex items-center justify-center relative overflow-hidden">
                <div className="w-4 h-4 rounded-full bg-cyan-200/90 blur-[1px] animate-pulse" />
                <div className="absolute top-1.5 left-2 w-2.5 h-1.5 rounded-full bg-white/90 -rotate-12" />
              </div>
            </div>

            {/* Luces LED y título Pokédex */}
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-300 shadow-[0_0_8px_#f43f5e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-200 shadow-[0_0_8px_#fbbf24]" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-200 shadow-[0_0_8px_#34d399] animate-pulse" />
              </div>

              <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-mono">
                POKÉ<span className="text-cyan-400">DEX</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* Panel de navegación */}
        <nav aria-label="Navegación principal" className="w-full md:w-auto">
          <ul className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 sm:gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/90">
            <li>
              <NavLink to="/" className={getTabClass}>
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/explorar" className={getTabClass}>
                <Compass className="w-4 h-4" />
                <span>Explorar</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/favoritos" className={getTabClass}>
                <Star className="w-4 h-4" />
                <span>Favoritos</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={getTabClass}>
                <Mail className="w-4 h-4" />
                <span>Contacto</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
