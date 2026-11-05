import { Link } from 'react-router-dom';
export default function NotFoundView() {
  return (
    <section className="p-12 text-center">
      <h2 className="text-6xl font-black text-rose-500 font-mono">404</h2>
      <p className="text-lg font-bold text-gray-700 mt-2">Página extraviada del cuaderno</p>
      <Link to="/" className="inline-block mt-4 px-4 py-2 bg-rose-500 text-white rounded font-bold hover:bg-rose-600 transition-colors">
        Volver a la portada
      </Link>
    </section>
  );
}