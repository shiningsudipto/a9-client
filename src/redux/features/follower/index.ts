import baseApi from "../../api/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFollowingShops: builder.query({
      query: (id) => `/follower/user/${id}`,
    }),
    getFollowerByShop: builder.query({
      query: (id) => `/follower/shop/${id}`,
    }),
  }),
});

export const { useGetFollowerByShopQuery, useGetFollowingShopsQuery } =
  followApi;
