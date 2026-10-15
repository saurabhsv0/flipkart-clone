import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: [] },
  reducers: {
    toggleWishlist(state, { payload }) {
      state.ids = state.ids.includes(payload) ? state.ids.filter((i) => i !== payload) : [...state.ids, payload];
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
