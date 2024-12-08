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
    UpdateShop: builder.mutation({
      query: (shopData) => ({
        url: "/shop",
        method: "PUT",
        body: shopData,
      }),
      invalidatesTags: ["Shop"],
    }),
    getShopByVendor: builder.query({
      query: (id) => `/shop/${id}`,
      providesTags: ["Shop"],
    }),
    getShopDetailById: builder.query({
      query: (id) => `/shop/details/${id}`,
      providesTags: ["Shop"],
    }),
    getAllShop: builder.query({
      query: () => `/shop`,
      providesTags: ["Shop"],
    }),
  }),
});

export const {
  useGetShopByVendorQuery,
  useCreateShopMutation,
  useGetAllShopQuery,
  useUpdateShopMutation,
  useGetShopDetailByIdQuery,
} = shopApi;
