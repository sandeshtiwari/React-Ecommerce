import { ORDERS_URL } from "../constants";
import { IOrderRequest, IOrderResponse } from "../types";
import { apiSlice } from "./apiSlice";
import { getUserToken } from "./productApiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<IOrderRequest, IOrderResponse>({
      query: (orderRequest) => {
        const token = getUserToken();
        return {
          url: `${ORDERS_URL}/create`,
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: orderRequest,
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
