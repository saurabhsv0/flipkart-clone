import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { categories, products } from '../data/products';
import { inr } from '../utils/format';

const SORTS = [
  ['relevance', 'Relevance'],
  ['low', 'Price: Low to High'],
  ['high', 'Price: High to Low'],
  ['rating', 'Rating'],
];

export default function Products() {
  const [sp, setSp] = useSearchParams();
  const q = (sp.get('q') || '').toLowerCase();
  const cat = sp.get('category') || '';
  const [maxPrice, setMaxPrice] = useState(60000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('relevance');

  const list = useMemo(() => {
    let r = products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!q || `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(q)) &&
        p.price <= maxPrice &&
        p.rating >= minRating
    );
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'rating') r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [q, cat, maxPrice, minRating, sort]);

  const setCat = (c) => {
    const next = new URLSearchParams(sp);
    c ? next.set('category', c) : next.delete('category');
    setSp(next);
  };

  return (
    <div className="max-w-[1280px] mx-auto mt-2 flex flex-col md:flex-row gap-2 px-0">
      <aside className="md:w-[260px] shrink-0 card p-4 space-y-6 h-fit">
        <h2 className="font-medium text-lg">Filters</h2>

        <div>
          <h3 className="text-xs font-medium text-fk-grey mb-2">Category</h3>
          <button onClick={() => setCat('')} className={`block text-sm py-1 ${!cat ? 'text-fk-blue font-medium' : ''}`}>All</button>
          {categories.map((c) => (
            <button key={c.name} onClick={() => setCat(c.name)} className={`block text-sm py-1 ${cat === c.name ? 'text-fk-blue font-medium' : ''}`}>
              {c.name}
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-xs font-medium text-fk-grey mb-2">Max price: {inr(maxPrice)}</h3>
          <input type="range" min="500" max="60000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-fk-blue" aria-label="Maximum price" />
        </div>

        <div>
          <h3 className="text-xs font-medium text-fk-grey mb-2">Customer ratings</h3>
          {[0, 3, 4].map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-fk-blue" />
              {r === 0 ? 'Any' : `${r}★ & above`}
            </label>
          ))}
        </div>
      </aside>

      <section className="flex-1 card">
        <div className="p-4 border-b">
          <h1 className="text-base font-medium">
            {q ? `Results for "${sp.get('q')}"` : cat || 'All products'}{' '}
            <span className="text-fk-grey text-sm font-normal">({list.length} items)</span>
          </h1>
          <div className="flex gap-5 mt-3 text-sm overflow-x-auto no-scrollbar">
            <span className="font-medium shrink-0">Sort by</span>
            {SORTS.map(([k, label]) => (
              <button key={k} onClick={() => setSort(k)} className={`shrink-0 pb-1 ${sort === k ? 'text-fk-blue border-b-2 border-fk-blue font-medium' : ''}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="p-16 text-center text-fk-grey">
            <p className="text-lg">No products match these filters</p>
            <p className="text-sm mt-1">Try a higher price limit or a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 divide-gray-100 [&>*]:border-b [&>*]:border-gray-100">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
