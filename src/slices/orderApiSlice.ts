import { ADMIN_URL, ORDER_URL, USERS_URL } from "../constants";
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
    getOrdersAdmin: builder.query<
      { orders: IOrderResponse[]; totalNumberOfOrders: number },
      { pageNo: number; pageSize: number }
    >({
      query: ({ pageNo, pageSize }) => {
        const token = getUserToken();
        return {
          url: `${ADMIN_URL}/orders?pageNo=${pageNo}&pageSize=${pageSize}`,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
    toggleDeliveryStatus: builder.mutation<{ message: string }, string>({
      query: (orderId) => {
        const token = getUserToken();
        return {
          url: `${ADMIN_URL}/delivery?orderId=${orderId}`,
          method: "PUT",
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
  useGetOrdersAdminQuery,
  useToggleDeliveryStatusMutation,
} = orderApiSlice;
