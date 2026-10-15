import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { inr } from '../utils/format';

export default function Orders() {
  const user = useSelector((s) => s.auth.user);
  const list = useSelector((s) => s.orders.list);
  if (!user) return <Navigate to="/login?next=/orders" replace />;

  return (
    <div className="max-w-[900px] mx-auto mt-3 space-y-3">
      <h1 className="text-lg font-medium px-1">My Orders</h1>
      {list.length === 0 && (
        <div className="card py-16 text-center">
          <p>You have no orders yet</p>
          <Link to="/" className="btn-blue inline-block mt-4">Start shopping</Link>
        </div>
      )}
      {list.map((o) => (
        <article key={o.id} className="card">
          <header className="flex justify-between flex-wrap gap-2 px-5 py-3 border-b text-sm">
            <span>Order <b>{o.id}</b></span>
            <span className="text-fk-grey">{new Date(o.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </header>
          {o.items.map((i) => (
            <div key={i.id} className="flex gap-4 px-5 py-3 items-center">
              <img src={i.image} alt="" className="h-16 w-16 object-contain" />
              <Link to={`/product/${i.id}`} className="flex-1 text-sm hover:text-fk-blue">{i.title}<p className="text-fk-grey">Qty {i.qty}</p></Link>
              <span className="font-medium text-sm">{inr(i.price * i.qty)}</span>
            </div>
          ))}
          <footer className="px-5 py-3 border-t flex justify-between text-sm">
            <span className="text-fk-green font-medium">● Order confirmed</span>
            <span>Total <b>{inr(o.total)}</b> · {o.payment.toUpperCase()}</span>
          </footer>
        </article>
      ))}
    </div>
  );
}
