const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query");

const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["reviews"],
  endpoints: (builder) => ({
    fetchReviewsByProductId: builder.query({
      query: ({ productId }) => ({
        url: `products/${productId}/reviews`,
      }),
      providesTags: ["reviews"],
    }),
  }),
});
export default reviewApi;