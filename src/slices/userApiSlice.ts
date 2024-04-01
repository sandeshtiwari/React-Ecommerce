import {
  ADMIN_URL,
  LOGIN_URL,
  LOGOUT_URL,
  SIGNUP_URL,
  USERS_URL,
} from "../constants";
import {
  ILoginRequest,
  IMessage,
  IRegisterRequest,
  IUpdateUserRequest,
  IUser,
  IUsersAdmin,
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
    getAllUsers: builder.query<
      { users: IUsersAdmin[]; totalNumberOfUsers: number },
      { pageNo: number; pageSize: number }
    >({
      query: ({ pageNo, pageSize }) => {
        const token = getUserToken();
        return {
          url: `${ADMIN_URL}/users?pageNo=${pageNo}&pageSize=${pageSize}`,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
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
  useGetAllUsersQuery,
} = userApiSlice;
