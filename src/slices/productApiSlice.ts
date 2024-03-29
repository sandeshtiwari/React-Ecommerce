import {
  PRODUCTS_ADMIN_URL,
  PRODUCTS_URL,
  PRODUCT_IMAGE_UPLOAD_ADMIN_URL,
  PRODUCT_MUTATE_URL,
} from "../constants";
import { IProduct, IUser } from "../types";
import { apiSlice } from "./apiSlice";

const getUserToken = () => {
  const userInfo: IUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null;

  return userInfo.token;
};

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsAdmin: builder.query<
      { products: IProduct[]; totalNumberOfProducts: number },
      { pageNo: number; pageSize: number }
    >({
      query: ({ pageNo, pageSize }) => {
        const token = getUserToken();
        return {
          url: `${PRODUCTS_ADMIN_URL}?pageNo=${pageNo}&pageSize=${pageSize}`,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
    getProductById: builder.query<IProduct, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
    }),
    uploadProductImage: builder.mutation<
      { securedUrl: string },
      { formData: FormData; productId: string }
    >({
      query: ({ formData, productId }) => {
        const token = getUserToken();
        return {
          url: `${PRODUCT_IMAGE_UPLOAD_ADMIN_URL}?productId=${productId}`,
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: formData,
        };
      },
    }),
    updateProduct: builder.mutation<
      IProduct,
      {
        productId: string;
        name: string;
        brand: string;
        category: string;
        description: string;
        price: number;
        countInStock: number;
      }
    >({
      query: (product) => {
        const token = getUserToken();
        return {
          url: `${PRODUCT_MUTATE_URL}/update`,
          method: "PUT",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: product,
        };
      },
    }),
    createProduct: builder.mutation<IProduct, void>({
      query: () => {
        const token = getUserToken();
        return {
          url: `${PRODUCT_MUTATE_URL}/create`,
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      },
    }),
    deleteProduct: builder.mutation<
      {
        message: string;
        statusCode?: number;
        timestamp?: string;
      },
      IProduct
    >({
      query: (product) => {
        const token = getUserToken();
        return {
          url: `${PRODUCT_MUTATE_URL}/delete`,
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: product,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsAdminQuery,
  useUploadProductImageMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
