import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-3 bg-slate-950/95 border-2 border-slate-800 rounded-2xl px-4 py-3 text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Rejilla de altavoz y sensor de la Pokédex */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-5 h-1.5 rounded-full bg-slate-700 shadow-inner" />
          <span className="w-5 h-1.5 rounded-full bg-slate-700 shadow-inner" />
          <span className="w-5 h-1.5 rounded-full bg-slate-700 shadow-inner" />
        </div>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          POKÉDEX
        </span>
      </div>

      {/* Créditos */}
      <div className="text-center sm:text-right">
        <p className="font-mono text-xs text-slate-400">
          PokeAPI • React • TypeScript • Tailwind CSS
        </p>
      </div>
    </footer>
  );
};
