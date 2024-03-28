import { ICart } from "../types";

export const addDecimals = (num: number): number => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state: ICart) => {
  // items price
  state.itemsTotalPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // shipping price (if order is over $100 then free, else $10 shipping)

  state.shippingTotalPrice = addDecimals(state.itemsTotalPrice > 100 ? 0 : 10);
  // tax price (15% tax)
  // state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  state.taxTotalPrice = addDecimals(
    Number((0.15 * state.itemsTotalPrice).toFixed(2))
  );
  // total price

  state.totalFinalPrice = Number(
    (
      Number(state.itemsTotalPrice) +
      Number(state.shippingTotalPrice) +
      Number(state.taxTotalPrice)
    ).toFixed(2)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
