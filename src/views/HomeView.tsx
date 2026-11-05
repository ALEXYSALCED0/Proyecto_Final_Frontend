import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkPatternModal } from '../components/DarkPatternModal';

export default function HomeView() {
  const [isDarkPatternOpen, setIsDarkPatternOpen] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center text-center py-8 space-y-6">
      {/* Sello de portada */}
      <div className="inline-block px-4 py-1 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-900 font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
        Cuaderno de Expedición de Campo • 2026
      </div>

      <h1 className="text-3xl sm:text-5xl font-black font-mono uppercase text-[#2d3748] tracking-tight max-w-2xl">
        Registro Visual de Especímenes
      </h1>

      <p className="text-sm sm:text-base text-gray-700 max-w-lg font-sans leading-relaxed">
        Consulta estadísticas base, dimensiones físicas y anotaciones de especímenes directamente desde la PokeAPI, organizados en láminas coleccionables.
      </p>

      {/* Botones de acción */}
      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <Link
          to="/explorar"
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Abrir Archivero de Especímenes →
        </Link>

        {/* Acceso para comprobar el modal de Dark Pattern requerido */}
        <button
          type="button"
          onClick={() => setIsDarkPatternOpen(true)}
          className="px-4 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-mono text-xs font-bold uppercase rounded-xl border border-stone-400 transition-colors"
        >
          Suscripción PokéClub Pro ⚡
        </button>
      </div>

      {/* Modal con dark pattern intencional */}
      <DarkPatternModal
        isOpen={isDarkPatternOpen}
        onClose={() => setIsDarkPatternOpen(false)}
      />
    </section>
  );
}