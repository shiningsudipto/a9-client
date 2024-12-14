import baseApi from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
    }),
    getAllOrder: builder.query({
      query: () => `/order`,
    }),
    getOrderByVendorId: builder.query({
      query: ({ id, page }) => `/order/shop-owner/${id}?page=${page}&limit=10`,
    }),
    getOrderByUserId: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useGetOrderByUserIdQuery,
  useGetOrderByVendorIdQuery,
} = orderApi;
