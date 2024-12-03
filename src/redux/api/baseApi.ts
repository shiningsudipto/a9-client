import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-drab-omega.vercel.app/api",
    // credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;

    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: [""],
  endpoints: () => ({}),
});

export default baseApi;
