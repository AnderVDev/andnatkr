import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, setLogout } from ".";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    try {
      const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
      console.log(refreshResult);

      if (refreshResult?.data) {
        const user = api.getState().auth.user;
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(setLogout());
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      api.dispatch(setLogout());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "andnatkrApi",
  baseQuery: baseQueryWithReAuth,

  tagTypes: ["User", "EstateMgmt", "Mortgages", "ChileanIndicators"],

  endpoints: (builder) => ({
    // --------- Authentication ---------------------------

    getLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/authentication",
        method: "POST",
        body: { credentials },
      }),
      providesTags: ["Credentials"],
    }),
    // --------- Managements ---------------------------
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
      query: (entry) => ({
        url: `/mortgages`,
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
        body: id,
      }),
      invalidatesTags: ["Mortgages"],
    }),
  }),
});

export const {
  useGetLoginMutation,
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
