import { LOGIN_URL, LOGOUT_URL, SIGNUP_URL, USERS_URL } from "../constants";
import {
  ILoginRequest,
  IMessage,
  IRegisterRequest,
  IUpdateUserRequest,
  IUser,
} from "../types";
import { apiSlice } from "./apiSlice";
import { getUserToken } from "./productApiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUser, ILoginRequest>({
      query: (data) => ({
        url: LOGIN_URL,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<IMessage, void>({
      query: () => {
        const token = getUserToken();
        return {
          url: LOGOUT_URL,
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
    signup: builder.mutation<IUser, IRegisterRequest>({
      query: (data) => ({
        url: SIGNUP_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation<{ username: string }, IUpdateUserRequest>({
      query: (data) => {
        const token = getUserToken();
        return {
          url: `${USERS_URL}/edit`,
          method: "PUT",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdateUserMutation,
} = userApiSlice;
