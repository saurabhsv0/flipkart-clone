import { Link } from 'react-router-dom';
import CategoryBar from '../components/CategoryBar.jsx';
import Carousel from '../components/Carousel.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products';

function Shelf({ title, category, items }) {
  return (
    <section className="bg-white shadow-fk mt-3">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h2 className="text-xl font-medium">{title}</h2>
        <Link to={category ? `/products?category=${category}` : '/products'} className="bg-fk-blue text-white text-sm font-medium px-5 py-2 shadow-fk">View all</Link>
      </div>
      <div className="flex overflow-x-auto no-scrollbar divide-x divide-gray-100">
        {items.map((p) => <ProductCard key={p.id} p={p} compact />)}
      </div>
    </section>
  );
}

export default function Home() {
  const by = (c) => products.filter((p) => p.category === c);
  const deals = [...products].sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp).slice(0, 8);

  return (
    <>
      <CategoryBar />
      <Carousel />
      <div className="max-w-[1280px] mx-auto px-0 sm:px-0 pb-4">
        <Shelf title="Deals of the Day" items={deals} />
        <Shelf title="Best of Mobiles" category="Mobiles" items={by('Mobiles')} />
        <Shelf title="Top Picks in Electronics" category="Electronics" items={by('Electronics')} />
        <Shelf title="Fashion Bestsellers" category="Fashion" items={by('Fashion')} />
        <Shelf title="Home and Appliances" category="Home" items={[...by('Home'), ...by('Appliances')]} />
      </div>
    </>
  );
}
