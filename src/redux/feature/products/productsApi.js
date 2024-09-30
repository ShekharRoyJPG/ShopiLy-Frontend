import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {getBaseUrl} from "../../../../utils/baseUrl";
const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    FetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams({
          category: category || "",
          color: color || "",
          minPrice: minPrice || "",
          maxPrice: maxPrice || "",
          page: page.toString(),
          limit: limit.toString(),
        }).toString();
        return `/?${queryParams}`;
      },
      providesTags: ["products"],
    }),
    FetchProductById: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      invalidatesTags: (result, error, id) => [{ type: "products", id }],
    }),
    AddProduct: builder.mutation({
      query: (product) => ({
        url: "/create-product",
        method: "POST",
        body: product,
        credentials: "include",
      }),
      invalidatesTags: ["products"],
    }),
    fetchRelatedProducts: builder.query({
      query: (productId) => ({
        url: `/related-products/${productId}`,
      }),
    }),
    UpdateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: ["products"],
    }),
    DeleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedProductsQuery,
} = productsApi;

export default productsApi;

/**
 * import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../../utils/baseUrl";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["products", "product"],
  endpoints: (builder) => ({
    FetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams({
          category: category || "",
          color: color || "",
          minPrice: minPrice || "",
          maxPrice: maxPrice || "",
          page: page.toString(),
          limit: limit.toString(),
        }).toString();
        return `/?${queryParams}`;
      },
      providesTags: ["products"],
    }),
    FetchProductById: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "product", id }],
    }),
    AddProduct: builder.mutation({
      query: (product) => ({
        url: "/create-product",
        method: "POST",
        body: product,
        credentials: "include",
      }),
      invalidatesTags: ["products"],
    }),
    fetchRelatedProducts: builder.query({
      query: (productId) => ({
        url: `/related-products/${productId}`,
      }),
    }),
    UpdateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "products" },
        { type: "product", id },
      ],
    }),
    DeleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "products" },
        { type: "product", id },
      ],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedProductsQuery,
} = productsApi;

export default productsApi;

 */
