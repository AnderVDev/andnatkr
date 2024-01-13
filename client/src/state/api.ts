import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "andnatkrApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "EstateMgmt", "Mortgages"],
  endpoints: (builder) => ({
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
        url: `/management`,
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
        body: id,
      }),
      invalidatesTags: ["EstateMgmt"],
    }),

    // ---------MORTGAGES---------------------------

    getMortgages: builder.query({
      query: () => "/mortgages",
      providesTags: ["Mortgages"],
    }),

    addMortgages: builder.mutation({
      query: (input) => ({
        url: `/mortgages`,
        method: "POST",
        body: input,
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
        body: id,
      }),
      invalidatesTags: ["Mortgages"],
    }),

  }),
});

export const {
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
