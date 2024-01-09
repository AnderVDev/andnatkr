import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "andnatkrApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
  tagTypes: ["User", "EstateMgmt"],
  endpoints: (build) => ({
    getEstateMgmt: build.query({
      query: () => "/management",
      providesTags: ["EstateMgmt"],
    }),
  }),
});

export const { useGetEstateMgmtQuery } = api;
