import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { placeOrder } from '../store/ordersSlice';
import { summarize } from '../utils/pricing';
import PriceDetails from '../components/PriceDetails.jsx';
import { inr } from '../utils/format';

const empty = { name: '', phone: '', pincode: '', address: '', city: '', state: '' };

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [addr, setAddr] = useState({ ...empty, phone: user?.phone || '' });
  const [errors, setErrors] = useState({});
  const [pay, setPay] = useState('upi');
  const [placed, setPlaced] = useState(null);
  const s = summarize(items);

  if (!user) return <Navigate to="/login?next=/checkout" replace />;
  if (placed) {
    return (
      <div className="max-w-[640px] mx-auto mt-8 card p-10 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-fk-green text-white grid place-items-center text-3xl">✓</div>
        <h1 className="text-xl font-medium mt-4">Order placed</h1>
        <p className="text-sm text-fk-grey mt-2">Order ID {placed}. We will deliver in 2-4 days.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/orders" className="btn-blue">View orders</Link>
          <Link to="/" className="btn-yellow">Keep shopping</Link>
        </div>
      </div>
    );
  }
  if (!s.rows.length) return <Navigate to="/cart" replace />;

  const validate = () => {
    const e = {};
    if (addr.name.trim().length < 2) e.name = 'Enter your full name';
    if (!/^\d{10}$/.test(addr.phone)) e.phone = 'Enter a 10-digit mobile number';
    if (!/^\d{6}$/.test(addr.pincode)) e.pincode = 'Enter a 6-digit pincode';
    if (addr.address.trim().length < 6) e.address = 'Enter your full address';
    if (!addr.city.trim()) e.city = 'Enter your city';
    if (!addr.state.trim()) e.state = 'Enter your state';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirm = () => {
    // Razorpay checkout plugs in here once the backend can create orders.
    const action = dispatch(placeOrder({
      items: s.rows.map((r) => ({ id: r.id, qty: r.qty, title: r.product.title, price: r.product.price, image: r.product.image })),
      total: s.total,
      address: addr,
      payment: pay,
    }));
    dispatch(clearCart());
    setPlaced(action.payload.id);
  };

  const field = (key, label, props = {}) => (
    <label className="block">
      <span className="text-xs text-fk-grey">{label}</span>
      <input value={addr[key]} onChange={(e) => setAddr({ ...addr, [key]: e.target.value })} className={`input mt-1 ${errors[key] ? '!border-red-500' : ''}`} {...props} />
      {errors[key] && <span className="text-red-600 text-xs">{errors[key]}</span>}
    </label>
  );

  const Step = ({ n, title, children, summary }) => (
    <section className="card mb-3">
      <div className={`px-5 py-3 flex items-center gap-4 ${step === n ? 'bg-fk-blue text-white' : ''}`}>
        <span className={`h-6 w-6 text-xs rounded-sm grid place-items-center ${step === n ? 'bg-white text-fk-blue' : 'bg-gray-100 text-fk-blue'}`}>{n}</span>
        <h2 className="font-medium uppercase text-sm">{title}</h2>
        {step > n && <button onClick={() => setStep(n)} className="ml-auto text-fk-blue text-sm font-medium">Change</button>}
      </div>
      {step === n ? <div className="p-5">{children}</div> : step > n && <div className="px-14 pb-3 text-sm">{summary}</div>}
    </section>
  );

  return (
    <div className="max-w-[1280px] mx-auto mt-3 flex flex-col lg:flex-row gap-3">
      <div className="flex-1">
        <Step n={1} title="Delivery address" summary={`${addr.name}, ${addr.address}, ${addr.city}, ${addr.state} - ${addr.pincode}`}>
          <div className="grid sm:grid-cols-2 gap-4">
            {field('name', 'Name')}
            {field('phone', '10-digit mobile number', { inputMode: 'numeric', maxLength: 10 })}
            {field('pincode', 'Pincode', { inputMode: 'numeric', maxLength: 6 })}
            {field('city', 'City')}
            <div className="sm:col-span-2">{field('address', 'Address (house no, building, street, area)')}</div>
            {field('state', 'State')}
          </div>
          <button onClick={() => validate() && setStep(2)} className="btn-orange mt-5">Deliver here</button>
        </Step>

        <Step n={2} title="Order summary" summary={`${s.count} item${s.count === 1 ? '' : 's'}, ${inr(s.total)}`}>
          {s.rows.map(({ product: p, qty }) => (
            <div key={p.id} className="flex gap-4 py-3 border-b last:border-0 items-center">
              <img src={p.image} alt="" className="h-16 w-16 object-contain" />
              <div className="flex-1 text-sm">{p.title}<p className="text-fk-grey">Qty {qty}</p></div>
              <span className="font-medium">{inr(p.price * qty)}</span>
            </div>
          ))}
          <button onClick={() => setStep(3)} className="btn-orange mt-4">Continue</button>
        </Step>

        <Step n={3} title="Payment options">
          {[['upi', 'UPI'], ['card', 'Credit / Debit / ATM card'], ['cod', 'Cash on delivery']].map(([k, label]) => (
            <label key={k} className="flex items-center gap-3 py-3 border-b last:border-0 cursor-pointer text-sm">
              <input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} className="accent-fk-blue" />
              {label}
            </label>
          ))}
          <button onClick={confirm} className="btn-orange mt-5">{pay === 'cod' ? 'Confirm order' : `Pay ${inr(s.total)}`}</button>
          <p className="text-xs text-fk-grey mt-2">Demo checkout: no real payment is taken.</p>
        </Step>
      </div>
      <aside className="lg:w-[380px] shrink-0"><PriceDetails s={s} /></aside>
    </div>
  );
}
