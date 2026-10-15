import { configureStore } from '@reduxjs/toolkit';
import cart from './cartSlice';
import wishlist from './wishlistSlice';
import auth from './authSlice';
import orders from './ordersSlice';

const KEY = 'fk-state';
const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || undefined; } catch { return undefined; }
};

const store = configureStore({ reducer: { cart, wishlist, auth, orders }, preloadedState: load() });

store.subscribe(() => {
  const { cart, wishlist, auth, orders } = store.getState();
  localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, auth, orders }));
});

export default store;
