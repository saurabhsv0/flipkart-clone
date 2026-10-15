import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { products } from '../data/products';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { inr, off } from '../utils/format';
import RatingBadge from '../components/RatingBadge.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const p = products.find((x) => x.id === Number(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const liked = useSelector((s) => s.wishlist.ids.includes(p?.id));
  const inCart = useSelector((s) => s.cart.items.some((i) => i.id === p?.id));
  const [pin, setPin] = useState('');
  const [pinMsg, setPinMsg] = useState('');

  if (!p) return <div className="p-16 text-center text-fk-grey">Product not found. <Link className="text-fk-blue" to="/">Go home</Link></div>;

  const similar = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const checkPin = (e) => {
    e.preventDefault();
    setPinMsg(/^\d{6}$/.test(pin) ? 'Delivery in 2-4 days | Free delivery above ₹500' : 'Enter a valid 6-digit pincode');
  };

  return (
    <div className="max-w-[1280px] mx-auto mt-2">
      <p className="text-xs text-fk-grey px-3 py-2">
        <Link to="/" className="hover:text-fk-blue">Home</Link> › <Link to={`/products?category=${p.category}`} className="hover:text-fk-blue">{p.category}</Link> › {p.brand}
      </p>
      <div className="card flex flex-col md:flex-row">
        <div className="md:w-[40%] p-4 md:sticky md:top-16 h-fit">
          <div className="relative border grid place-items-center h-[320px] md:h-[400px] bg-white">
            <img src={p.image} alt={p.title} className="max-h-full object-contain" />
            <button onClick={() => dispatch(toggleWishlist(p.id))} aria-label="Toggle wishlist" className={`absolute top-3 right-3 h-9 w-9 rounded-full bg-white shadow grid place-items-center text-xl ${liked ? 'text-red-500' : 'text-gray-400'}`}>
              {liked ? '♥' : '♡'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {inCart ? (
              <Link to="/cart" className="btn-yellow text-center">Go to cart</Link>
            ) : (
              <button onClick={() => dispatch(addToCart(p.id))} className="btn-yellow">Add to cart</button>
            )}
            <button onClick={() => { if (!inCart) dispatch(addToCart(p.id)); navigate('/checkout'); }} className="btn-orange">Buy now</button>
          </div>
        </div>

        <div className="flex-1 p-5 md:border-l">
          <p className="text-sm text-fk-grey font-medium">{p.brand}</p>
          <h1 className="text-lg md:text-xl">{p.title}</h1>
          <div className="mt-2"><RatingBadge rating={p.rating} reviews={p.reviews} /></div>
          <p className="text-fk-green text-sm font-medium mt-3">Special price</p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl font-medium">{inr(p.price)}</span>
            <span className="text-fk-grey line-through">{inr(p.mrp)}</span>
            <span className="text-fk-green font-medium">{off(p.price, p.mrp)}% off</span>
          </div>

          <div className="mt-5">
            <h2 className="font-medium mb-2">Available offers</h2>
            <ul className="text-sm space-y-2">
              <li><b className="text-fk-green">Bank Offer</b> 5% cashback on Flipkart Axis Bank Card</li>
              <li><b className="text-fk-green">Special Price</b> Get extra 10% off (price inclusive of discount)</li>
              <li><b className="text-fk-green">Partner Offer</b> Sign up for Pay Later and get a ₹100 gift card</li>
            </ul>
          </div>

          <form onSubmit={checkPin} className="mt-5 flex items-center gap-3 flex-wrap">
            <span className="text-sm text-fk-grey w-24">Delivery</span>
            <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Enter pincode" aria-label="Pincode" className="input !w-40" />
            <button className="text-fk-blue font-medium text-sm">Check</button>
            {pinMsg && <p className="text-sm w-full pl-[108px]">{pinMsg}</p>}
          </form>

          <div className="mt-5 flex gap-3">
            <span className="text-sm text-fk-grey w-24 shrink-0">Highlights</span>
            <ul className="list-disc pl-5 text-sm space-y-1">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>

          <div className="mt-5 flex gap-3">
            <span className="text-sm text-fk-grey w-24 shrink-0">Description</span>
            <p className="text-sm leading-6">{p.description}</p>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="card mt-3">
          <h2 className="text-lg font-medium px-5 py-4 border-b">Similar products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4">{similar.map((s) => <ProductCard key={s.id} p={s} />)}</div>
        </section>
      )}
    </div>
  );
}
