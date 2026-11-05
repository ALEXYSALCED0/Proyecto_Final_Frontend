import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './components/Toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
