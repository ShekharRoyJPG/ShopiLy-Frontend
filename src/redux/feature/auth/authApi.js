import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../../utils/baseUrl";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    // register endpoint
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    // login endpoint
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // logout endpoint
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
    // get all user
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      refetchOnMount: true,
      invalidatesTags: ["user"],
    }),
    // delete a user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    // update a user role
    updateUserRole: builder.mutation({
      query: (userId, role) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      refetchOnMount: true,
      invalidatesTags: ["user"],
    }),
    // edit a user profile
    editProfile: builder.mutation({
      query: (updatedProfile) => ({
        url: "/edit-profile",
        method: "PATCH",
        body: updatedProfile,
      }),
      refetchOnMount: true,
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
} = authApi;
export default authApi;
