import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, setLogout } from ".";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1",
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { persisted } = getState();
    headers.set(
      "Authorization",
      persisted && persisted.access_token
        ? `Bearer ${persisted.access_token}`
        : ""
    );
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const api = createApi({
  reducerPath: "andnatkrApi",
  baseQuery,
  tagTypes: [
    "User",
    "Transaction",
    "TransactionById",
    "EstateMgmt",
    "Mortgages",
    "Credentials",
    "EstateMgmtById",
    "Register",
  ],
  endpoints: (builder) => ({
    // Authentication
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["Register"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/authentication",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled;
        const { user, access_token, refresh_token } = response.data;
        dispatch(setCredentials({ user, access_token, refresh_token }));
      },
      providesTags: ["Credentials"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // Finance Transactions
    getTransaction: builder.query({
      query: () => "/transaction",
      providesTags: ["Transaction"],
    }),

    getTransactionById: builder.query({
      query: (id) => `/transaction/${id}`,
      providesTags: ["TransactionById"],
    }),

    addTransaction: builder.mutation({
      query: (input) => ({
        url: "/transaction",
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["Transaction"],
    }),

    updateTransaction: builder.mutation({
      query: ({ id, data }) => ({
        url: `/transaction/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),








    // Estate Management
    getEstateMgmt: builder.query({
      query: () => "/management",
      providesTags: ["EstateMgmt"],
    }),

    getEstateMgmtById: builder.query({
      query: (id) => `/management/${id}`,
      providesTags: ["EstateMgmtById"],
    }),

    addEstateMgmt: builder.mutation({
      query: (input) => ({
        url: "/management",
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["EstateMgmt"],
    }),

    updateEstateMgmt: builder.mutation({
      query: ({ id, data }) => ({
        url: `/management/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EstateMgmt"],
    }),

    deleteEstateMgmt: builder.mutation({
      query: (id) => ({
        url: `/management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EstateMgmt"],
    }),

    // Mortgages
    getMortgages: builder.query({
      query: () => "/mortgages",
      providesTags: ["Mortgages"],
    }),

    addMortgages: builder.mutation({
      query: (entry) => ({
        url: "/mortgages",
        method: "POST",
        body: entry,
      }),
      invalidatesTags: ["Mortgages"],
    }),

    updateMortgages: builder.mutation({
      query: ({ id, data }) => ({
        url: `/mortgages/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Mortgages"],
    }),

    deleteMortgages: builder.mutation({
      query: (id) => ({
        url: `/mortgages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mortgages"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetTransactionQuery,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useAddTransactionMutation,
  useGetTransactionByIdQuery,
  useGetEstateMgmtQuery,
  useUpdateEstateMgmtMutation,
  useDeleteEstateMgmtMutation,
  useAddEstateMgmtMutation,
  useGetEstateMgmtByIdQuery,
  useGetMortgagesQuery,
  useAddMortgagesMutation,
  useUpdateMortgagesMutation,
  useDeleteMortgagesMutation,
} = api;
