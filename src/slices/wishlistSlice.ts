import { WISHLIST_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { getUserToken } from "./productApiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWishList: builder.mutation<
      string,
      { username: string; productId: string }
    >({
      query: ({ username, productId }) => {
        const token = getUserToken();
        return {
          url: `${WISHLIST_URL}/add?username=${username}&productId=${productId}`,
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
    removeWishList: builder.mutation<
      string,
      { username: string; productId: string }
    >({
      query: ({ username, productId }) => {
        const token = getUserToken();
        return {
          url: `${WISHLIST_URL}/remove?username=${username}&productId=${productId}`,
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
    checkWishList: builder.query<
      boolean,
      { username: string; productId: string }
    >({
      query: ({ username, productId }) => {
        const token = getUserToken();
        return {
          url: `${WISHLIST_URL}/exists?username=${username}&productId=${productId}`,
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
  }),
});

export const {
  useAddWishListMutation,
  useCheckWishListQuery,
  useRemoveWishListMutation,
} = userApiSlice;
