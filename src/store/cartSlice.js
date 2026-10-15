import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] }, // [{ id, qty }]
  reducers: {
    addToCart(state, { payload }) {
      const found = state.items.find((i) => i.id === payload);
      if (found) found.qty = Math.min(found.qty + 1, 10);
      else state.items.push({ id: payload, qty: 1 });
    },
    setQty(state, { payload: { id, qty } }) {
      const found = state.items.find((i) => i.id === id);
      if (found) found.qty = Math.max(1, Math.min(qty, 10));
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter((i) => i.id !== payload);
    },
    clearCart(state) { state.items = []; },
  },
});

export const { addToCart, setQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
