import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setQty } from '../store/cartSlice';
import { summarize } from '../utils/pricing';
import { inr, off } from '../utils/format';
import PriceDetails from '../components/PriceDetails.jsx';

export default function Cart() {
  const items = useSelector((s) => s.cart.items);
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const s = summarize(items);

  if (!s.rows.length) {
    return (
      <div className="max-w-[1280px] mx-auto mt-3 card py-20 text-center">
        <p className="text-lg">Your cart is empty</p>
        <p className="text-sm text-fk-grey mt-1">Add items to it now.</p>
        <Link to="/" className="btn-blue inline-block mt-5">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto mt-3 flex flex-col lg:flex-row gap-3">
      <section className="flex-1 card">
        <h1 className="px-5 py-4 text-lg font-medium border-b">My Cart ({s.count})</h1>
        {s.rows.map(({ product: p, qty }) => (
          <div key={p.id} className="p-5 border-b flex gap-4">
            <Link to={`/product/${p.id}`} className="w-24 h-24 shrink-0 grid place-items-center">
              <img src={p.image} alt={p.title} className="max-h-full object-contain" />
            </Link>
            <div className="flex-1">
              <Link to={`/product/${p.id}`} className="hover:text-fk-blue">{p.title}</Link>
              <p className="text-xs text-fk-grey mt-1">{p.brand}</p>
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-fk-grey line-through text-sm">{inr(p.mrp * qty)}</span>
                <span className="text-lg font-medium">{inr(p.price * qty)}</span>
                <span className="text-fk-green text-sm font-medium">{off(p.price, p.mrp)}% off</span>
              </div>
              <div className="mt-3 flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <button onClick={() => dispatch(setQty({ id: p.id, qty: qty - 1 }))} disabled={qty <= 1} aria-label="Decrease quantity" className="h-7 w-7 rounded-full border disabled:opacity-40">−</button>
                  <span className="w-10 text-center border py-0.5 text-sm">{qty}</span>
                  <button onClick={() => dispatch(setQty({ id: p.id, qty: qty + 1 }))} aria-label="Increase quantity" className="h-7 w-7 rounded-full border">+</button>
                </div>
                <button onClick={() => dispatch(removeFromCart(p.id))} className="font-medium uppercase text-sm hover:text-fk-blue">Remove</button>
              </div>
            </div>
          </div>
        ))}
        <div className="p-4 flex justify-end sticky bottom-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,.1)]">
          <button onClick={() => navigate(user ? '/checkout' : '/login?next=/checkout')} className="btn-orange w-full sm:w-auto">Place order</button>
        </div>
      </section>
      <aside className="lg:w-[380px] shrink-0"><PriceDetails s={s} /></aside>
    </div>
  );
}
