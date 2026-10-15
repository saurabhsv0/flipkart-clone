import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard.jsx';

export default function Wishlist() {
  const ids = useSelector((s) => s.wishlist.ids);
  const list = products.filter((p) => ids.includes(p.id));

  return (
    <div className="max-w-[1280px] mx-auto mt-3 card">
      <h1 className="text-lg font-medium px-5 py-4 border-b">My Wishlist ({list.length})</h1>
      {list.length === 0 ? (
        <div className="py-16 text-center">
          <p>Your wishlist is empty</p>
          <Link to="/" className="btn-blue inline-block mt-4">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}
    </div>
  );
}
