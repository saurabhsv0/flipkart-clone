import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { banners } from '../data/products';

export default function Carousel() {
  const [i, setI] = useState(0);
  const go = (n) => setI((n + banners.length) % banners.length);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % banners.length), 4500);
    return () => clearInterval(t);
  }, []);

  const b = banners[i];
  return (
    <section className="relative max-w-[1280px] mx-auto mt-2 overflow-hidden shadow-fk" aria-label="Offers">
      <Link to={`/products?category=${b.category}`} className={`block bg-gradient-to-r ${b.bg} text-white px-8 sm:px-20 py-10 sm:py-16`}>
        <h2 className="text-2xl sm:text-4xl font-bold">{b.title}</h2>
        <p className="mt-2 text-sm sm:text-lg opacity-95">{b.sub}</p>
        <span className="inline-block mt-5 bg-white text-fk-text text-sm font-medium px-5 py-2">Shop now</span>
      </Link>
      <button onClick={() => go(i - 1)} aria-label="Previous offer" className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 h-20 w-8 text-xl shadow">‹</button>
      <button onClick={() => go(i + 1)} aria-label="Next offer" className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 h-20 w-8 text-xl shadow">›</button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {banners.map((_, n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`Offer ${n + 1}`} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`} />
        ))}
      </div>
    </section>
  );
}
