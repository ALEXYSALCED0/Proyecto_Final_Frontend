import { useParams } from 'react-router-dom';
export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  return <section className="p-6"><h2 className="text-2xl font-bold font-mono">Ficha Pokémon #{id}</h2></section>;
}