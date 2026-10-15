import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { inr, off } from '../utils/format';
import RatingBadge from './RatingBadge.jsx';

export default function ProductCard({ p, compact = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const liked = useSelector((s) => s.wishlist.ids.includes(p.id));
  const inCart = useSelector((s) => s.cart.items.some((i) => i.id === p.id));

  const buyNow = () => {
    if (!inCart) dispatch(addToCart(p.id));
    navigate('/checkout');
  };

  return (
    <div className={`relative bg-white group flex flex-col ${compact ? 'w-[200px] shrink-0' : ''} hover:shadow-lg transition-shadow`}>
      <button
        onClick={() => dispatch(toggleWishlist(p.id))}
        aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white shadow grid place-items-center text-lg ${liked ? 'text-red-500' : 'text-gray-400'}`}
      >
        {liked ? '♥' : '♡'}
      </button>

      <Link to={`/product/${p.id}`} className="block p-4 pb-2 flex-1">
        <div className="h-[160px] grid place-items-center overflow-hidden">
          <img src={p.image} alt={p.title} loading="lazy" className="max-h-full object-contain group-hover:scale-105 transition-transform" />
        </div>
        <p className="mt-3 text-xs text-fk-grey font-medium">{p.brand}</p>
        <h3 className="text-sm line-clamp-2 min-h-[40px] group-hover:text-fk-blue">{p.title}</h3>
        <div className="mt-1"><RatingBadge rating={p.rating} reviews={p.reviews} /></div>
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="font-medium text-base">{inr(p.price)}</span>
          <span className="text-fk-grey line-through text-sm">{inr(p.mrp)}</span>
          <span className="text-fk-green text-sm font-medium">{off(p.price, p.mrp)}% off</span>
        </div>
        {p.assured && <p className="mt-1 text-xs text-fk-blue font-medium italic">✓ Assured</p>}
      </Link>

      <div className="grid grid-cols-2 gap-2 px-4 pb-4 pt-2">
        {inCart ? (
          <Link to="/cart" className="bg-[#ff9f00] text-white text-xs font-medium uppercase py-2.5 text-center shadow-fk hover:brightness-95">
            Go to cart
          </Link>
        ) : (
          <button onClick={() => dispatch(addToCart(p.id))} className="bg-[#ff9f00] text-white text-xs font-medium uppercase py-2.5 shadow-fk hover:brightness-95">
            Add to cart
          </button>
        )}
        <button onClick={buyNow} className="bg-fk-orange text-white text-xs font-medium uppercase py-2.5 shadow-fk hover:brightness-95">
          Buy now
        </button>
      </div>
    </div>
  );
}
