import baseApi from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupon: builder.query({
      query: () => `/coupon`,
      providesTags: ["Coupon"],
    }),
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/coupon",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Coupon"],
    }),
    matchCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/coupon/match",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useMatchCouponMutation,
  useGetAllCouponQuery,
} = couponApi;
