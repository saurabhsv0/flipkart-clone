import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Header() {
  const [q, setQ] = useState('');
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const count = useSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0));

  const submit = (e) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="bg-fk-blue sticky top-0 z-40 shadow-md">
      <div className="max-w-[1280px] mx-auto flex items-center gap-3 sm:gap-8 px-3 sm:px-4 h-14 text-white">
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span className="text-xl font-bold italic">Flipkart</span>
          <span className="text-[11px] italic hidden sm:block">
            Explore <span className="text-fk-yellow font-medium">Plus</span> ✦
          </span>
        </Link>

        <form onSubmit={submit} className="flex-1 max-w-[560px] relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for products, brands and more"
            aria-label="Search"
            className="w-full h-9 px-4 pr-10 text-sm text-fk-text rounded-sm outline-none shadow-inner"
          />
          <button aria-label="Search" className="absolute right-0 top-0 h-9 w-10 text-fk-blue text-lg">⌕</button>
        </form>

        <div className="relative">
          {user ? (
            <button onClick={() => setMenu((m) => !m)} className="font-medium text-sm px-2">
              {user.name} ▾
            </button>
          ) : (
            <Link to="/login" className="bg-white text-fk-blue font-medium text-sm px-6 sm:px-8 py-1 rounded-sm">Login</Link>
          )}
          {menu && user && (
            <div className="absolute right-0 top-10 w-48 bg-white text-fk-text text-sm card" onMouseLeave={() => setMenu(false)}>
              <Link onClick={() => setMenu(false)} to="/orders" className="block px-4 py-3 hover:bg-gray-50">My Orders</Link>
              <Link onClick={() => setMenu(false)} to="/wishlist" className="block px-4 py-3 hover:bg-gray-50">Wishlist</Link>
              <button onClick={() => { dispatch(logout()); setMenu(false); navigate('/'); }} className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-t">
                Logout
              </button>
            </div>
          )}
        </div>

        <Link to="/wishlist" className="hidden md:block text-sm font-medium">Wishlist</Link>

        <Link to="/cart" className="relative flex items-center gap-1 font-medium text-sm shrink-0">
          <span className="text-lg">🛒</span>
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -top-2 left-3 bg-fk-orange text-[11px] min-w-[18px] h-[18px] rounded-full grid place-items-center">{count}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
