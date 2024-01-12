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
  tagTypes: ["User", "EstateMgmt"],
  endpoints: (builder) => ({
    getEstateMgmt: builder.query({
      query: () => "/management",
      providesTags: ["EstateMgmt"],
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
      query: (input) => ({
        url: `/management/${input.id}`,
        method: "PATCH",
        body: input,
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
  }),
});

export const {
  useGetEstateMgmtQuery,
  useUpdateEstateMgmtMutation,
  useDeleteEstateMgmtMutation,
  useAddEstateMgmtMutation,
} = api;
