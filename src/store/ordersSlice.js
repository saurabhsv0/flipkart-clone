import { createSlice, nanoid } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { list: [] },
  reducers: {
    placeOrder: {
      reducer(state, { payload }) { state.list.unshift(payload); },
      prepare(order) {
        return { payload: { ...order, id: 'OD' + nanoid(10).replace(/[^a-zA-Z0-9]/g, 'X').toUpperCase(), placedAt: new Date().toISOString() } };
      },
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
