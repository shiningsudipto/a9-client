import baseApi from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewByProduct: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: ["Review"],
    }),
    getReviewByVendor: builder.query({
      query: (id) => `/review/shop-owner/${id}`,
    }),
    getReviewByUser: builder.query({
      query: (id) => `/review/user/${id}`,
    }),
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review",
        method: "PUT",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewByProductQuery,
  useGetReviewByVendorQuery,
  useUpdateReviewMutation,
} = reviewApi;
