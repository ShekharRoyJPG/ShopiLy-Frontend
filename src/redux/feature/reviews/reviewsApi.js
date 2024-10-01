import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../../utils/baseUrl";
0;

const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["reviews"],
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/create_Review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Reviews", id: postId },
      ],
    }),
    getReviewsCount: builder.query({
      query: ({ productId }) => ({
        url: `/reviews_Count/${productId}`,
      }),
    }),
    fetchReviewsByProductId: builder.query({
      query: ({ productId }) => ({
        url: `get_All_Review_Of_An_Product/${productId}`,
      }),
      providesTags: ["reviews"],
    }),
    fetchReviewsByUserId: builder.query({
      query: ({ userId }) => ({
        url: `/get_All_Review_Of_A_User/${userId}`,
      }),
      providesTags: ["reviews"],
    }),

    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/delete_review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { reviewId }) => [
        { type: "Reviews", id: reviewId },
      ],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsCountQuery,
  useFetchReviewsByProductIdQuery,
  useFetchReviewsByUserIdQuery,
  useDeleteReviewMutation,
} = reviewApi;
export default reviewApi;
