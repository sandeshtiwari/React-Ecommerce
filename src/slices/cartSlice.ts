import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartItems, IShippingAddress } from "../types";
import { updateCart } from "../utils/cartUtils";

const initialState: ICart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || '""')
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: ICart, action: PayloadAction<ICartItems>) => {
      const item: ICartItems = action.payload;

      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state: ICart, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      return updateCart(state);
    },
    clearCartItems: (state: ICart) => {
      state.cartItems = [];
      state.shippingAddress = {
        address: "",
        city: "",
        country: "",
        postalCode: "",
      };
      return updateCart(state);
    },
    saveShippingAddress: (
      state: ICart,
      action: PayloadAction<IShippingAddress>
    ) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCartItems,
  saveShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
