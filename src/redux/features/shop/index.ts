import baseApi from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (shopData) => ({
        url: "/shop",
        method: "POST",
        body: shopData,
      }),
      invalidatesTags: ["Shop"],
    }),
    getShopByVendor: builder.query({
      query: (id) => `/shop/${id}`,
      providesTags: ["Shop"],
    }),
  }),
});

export const { useGetShopByVendorQuery, useCreateShopMutation } = shopApi;
