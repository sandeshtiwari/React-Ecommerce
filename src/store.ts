import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import { apiSlice } from "./slices/apiSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddlewre) =>
    getDefaultMiddlewre().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
