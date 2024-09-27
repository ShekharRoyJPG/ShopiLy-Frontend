import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../../utils/baseUrl";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
        query: (newUser) => ({
            url: "/register",
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            body: newUser,
        })
    }),
    login: builder.mutation({
        query: (credentials) => ({
            url: "/login",
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            body: credentials,
        })
    })
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
export default authApi;