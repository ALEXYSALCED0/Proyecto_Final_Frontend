import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import HomeView from './views/HomeView';
import ExploreView from './views/ExploreView';
import DetailView from './views/DetailView';
import FavoritesView from './views/FavoritesView';
import ContactView from './views/ContactView';
import NotFoundView from './views/NotFoundView';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-[#2d3748] flex flex-col justify-between py-4 sm:py-8 px-2 sm:px-6">
      {/* Carcasa exterior de la Pokédex */}
      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1 bg-gradient-to-b from-rose-600 via-red-600 to-rose-800 p-2.5 sm:p-4 md:p-5 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(225,29,72,0.5)] border-2 border-rose-400/40 relative">
        
        {/* Módulo superior: Lente y Navegación */}
        <Navbar />

        {/* Bisel de la pantalla principal */}
        <div className="relative bg-slate-950 p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl border-2 border-slate-800 shadow-2xl flex-1 flex flex-col">
          
          {/* Pantalla interna de la Pokédex */}
          <div className="relative bg-[#fbf7ed] border-2 border-slate-700 rounded-xl sm:rounded-2xl shadow-inner flex-1 flex flex-col overflow-hidden">
            <main className="px-4 sm:px-8 md:px-10 py-6 flex-1 flex flex-col w-full h-full ">
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/explorar" element={<ExploreView />} />
                <Route path="/pokemon/:id" element={<DetailView />} />
                <Route path="/favoritos" element={<FavoritesView />} />
                <Route path="/contacto" element={<ContactView />} />
                <Route path="*" element={<NotFoundView />} />
              </Routes>
            </main>
          </div>
        </div>

        {/* Bisel inferior */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
