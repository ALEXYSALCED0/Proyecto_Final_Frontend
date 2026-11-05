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

    <div className="min-h-screen bg-[#3a6ea5] bg-opacity-95 text-[#2d3748] flex flex-col justify-between py-6 px-2 sm:px-6">
      

      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1">
        

        <Navbar />



        <div className="relative bg-[#fbf7ed] border-4 border-[#2d3748] rounded-2xl shadow-2xl flex-1 flex flex-col overflow-hidden">
          

          <div className="absolute left-2 top-0 bottom-0 w-8 flex flex-col justify-around py-4 z-20 pointer-events-none select-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#1e293b] shadow-inner"></div>
                <div className="w-6 h-2 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 rounded-full -ml-1.5 shadow-md"></div>
              </div>
            ))}
          </div>

          <main className="pl-12 pr-4 sm:px-12 py-6 flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/explorar" element={<ExploreView />} />
              <Route path="/pokemon/:id" element={<DetailView />} />
              <Route path="/favoritos" element={<FavoritesView />} />
              <Route path="/contacto" element={<ContactView />} />
              <Route path="*" element={<NotFoundView />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;