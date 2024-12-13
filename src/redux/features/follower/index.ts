import baseApi from "../../api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFollowingShops: builder.query({
      query: (id) => `/follower/user/${id}`,
    }),
    getFollowerByShop: builder.query({
      query: (id) => `/follower/shop/${id}`,
    }),
    createFollow: builder.mutation({
      query: (productData) => ({
        url: "/follower",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Shop", "Follow"],
    }),
    toggleFollow: builder.mutation({
      query: (followData) => ({
        url: "/follower/toggle",
        method: "POST",
        body: followData,
      }),
      invalidatesTags: ["User", "Shop", "Follow"],
    }),
  }),
});

export const {
  useGetFollowerByShopQuery,
  useGetFollowingShopsQuery,
  useToggleFollowMutation,
} = followApi;
