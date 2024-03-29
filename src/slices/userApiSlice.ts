import { LOGIN_URL, LOGOUT_URL, SIGNUP_URL } from "../constants";
import { ILoginRequest, IMessage, IRegisterRequest, IUser } from "../types";
import { apiSlice } from "./apiSlice";

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
        const userInfo: IUser = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo") || "{}")
          : null;
        const token = userInfo.token;
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
  }),
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation } =
  userApiSlice;
