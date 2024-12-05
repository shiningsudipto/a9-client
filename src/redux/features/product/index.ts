import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteProduct: builder.mutation({
      query: (productData) => ({
        url: "/product",
        method: "DELETE",
        body: productData,
      }),
      invalidatesTags: ["Product", "Shop"],
    }),
    updateProduct: builder.mutation({
      query: (productData) => ({
        url: "/product",
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: ["Product", "Shop"],
    }),
    getShopByVendor: builder.query({
      query: (id) => `/shop/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetShopByVendorQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
