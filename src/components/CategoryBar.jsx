import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function CategoryBar() {
  return (
    <nav className="bg-white shadow-fk" aria-label="Categories">
      <div className="max-w-[1280px] mx-auto flex gap-6 sm:justify-between overflow-x-auto no-scrollbar px-4 py-3">
        {categories.map((c) => (
          <Link key={c.name} to={`/products?category=${c.name}`} className="flex flex-col items-center gap-1 shrink-0 text-sm font-medium hover:text-fk-blue">
            <span className="text-3xl">{c.icon}</span>
            {c.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
