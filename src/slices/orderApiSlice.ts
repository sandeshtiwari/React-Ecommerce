import { ORDER_URL, USERS_URL } from "../constants";
import { IOrderRequest, IOrderResponse } from "../types";
import { apiSlice } from "./apiSlice";
import { getUserToken } from "./productApiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<{ paymentUrl: string }, IOrderRequest>({
      query: (orderRequest) => {
        const token = getUserToken();
        return {
          url: `${ORDER_URL}/create`,
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: orderRequest,
        };
      },
    }),
    setOrderPaid: builder.mutation<{ status: string; message: string }, string>(
      {
        query: (orderToken) => {
          const token = getUserToken();
          return {
            url: `${ORDER_URL}/payment/success?token=${orderToken}`,
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          };
        },
      }
    ),
    getUserOrders: builder.query<IOrderResponse[], string>({
      query: (username) => {
        const token = getUserToken();
        return {
          url: `${USERS_URL}/orders?username=${username}`,
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useSetOrderPaidMutation,
  useGetUserOrdersQuery,
} = orderApiSlice;
