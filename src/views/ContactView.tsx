import { useState } from 'react';
import { useToast } from '../components/Toast';

export default function ContactView() {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación en tiempo real (requisito técnico)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isFormValid = name.trim().length >= 2 && isEmailValid && message.trim().length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      showToast('¡Mensaje enviado correctamente!', 'success');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section className="max-w-xl mx-auto space-y-6">
      <header className="border-b-2 border-stone-300 pb-3 text-center">
        <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase text-[#2d3748]">
          Contacto
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-sans mt-1">
          Envía tus consultas o comentarios sobre la Pokédex.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-[#fffdfa] border-2 border-[#2d3748] rounded-2xl p-6 sm:p-8 shadow-lg space-y-4 relative"
      >
        {/* Cinta adhesiva superior decorativa */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-5 bg-amber-100 border border-amber-300 shadow-xs rotate-1 pointer-events-none" />

        {/* Campo Nombre */}
        <div>
          <label htmlFor="trainer-name" className="block text-xs font-mono font-bold uppercase text-stone-700 mb-1">
            Nombre:
          </label>
          <input
            id="trainer-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Ash Ketchum"
            required
            className="w-full px-3 py-2 rounded-lg border-2 border-stone-300 font-sans text-sm focus:outline-hidden focus:border-emerald-600"
          />
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="trainer-email" className="block text-xs font-mono font-bold uppercase text-stone-700 mb-1">
            Correo Electrónico:
          </label>
          <input
            id="trainer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="entrenador@pueblopaleta.com"
            required
            className="w-full px-3 py-2 rounded-lg border-2 border-stone-300 font-sans text-sm focus:outline-hidden focus:border-emerald-600"
          />
          {email.length > 0 && !isEmailValid && (
            <p className="text-[11px] text-rose-600 mt-1 font-sans">
              Introduce una dirección de correo válida.
            </p>
          )}
        </div>

        {/* Campo Mensaje */}
        <div>
          <label htmlFor="trainer-message" className="block text-xs font-mono font-bold uppercase text-stone-700 mb-1">
            Mensaje:
          </label>
          <textarea
            id="trainer-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres)..."
            required
            className="w-full px-3 py-2 rounded-lg border-2 border-stone-300 font-sans text-sm focus:outline-hidden focus:border-emerald-600 resize-none"
          />
        </div>

        {/* Botón de envío condicionado al estado disabled */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-3 rounded-lg font-mono text-xs uppercase font-black tracking-wider transition-all shadow ${
            isFormValid && !isSubmitting
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer active:scale-98'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed border border-stone-400'
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    </section>
  );
}
