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
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product", "Shop"],
    }),
    duplicateProduct: builder.mutation({
      query: (productData) => ({
        url: "/product/duplicate",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product", "Shop"],
    }),
    getShopByVendor: builder.query({
      query: (id) => `/shop/${id}`,
      providesTags: ["Product"],
    }),
    getFlashSaleProducts: builder.query({
      query: () => `/product/flash-sale`,
      providesTags: ["Product"],
    }),
    getProductsFromFollowingShops: builder.query({
      query: (id) => `/product/from-following-shops/${id}`,
      providesTags: ["Product", "Follow"],
    }),
    getAllProducts: builder.query({
      query: (searchOptions) => {
        // console.log("Search Options:", searchOptions);
        const params = new URLSearchParams();

        // Append each search option to the query string if it has a value
        if (searchOptions.limit)
          params.append("limit", searchOptions.limit.toString());
        if (searchOptions.page)
          params.append("page", searchOptions.page.toString());
        if (searchOptions.sortBy) params.append("sortBy", searchOptions.sortBy);
        if (searchOptions.sortOrder)
          params.append("sortOrder", searchOptions.sortOrder);
        if (searchOptions.searchTerm)
          params.append("searchTerm", searchOptions.searchTerm);
        if (searchOptions.category)
          params.append("category", searchOptions.category);

        // Construct the final URL with query parameters
        const queryString = params.toString();
        return `/product?${queryString}`;
      },
      providesTags: ["Product"],
    }),
    getProductDetails: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ["Product"],
    }),
    getProductByCategory: builder.query({
      query: (category) => `/product/category/${category}`,
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetShopByVendorQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDuplicateProductMutation,
  useGetFlashSaleProductsQuery,
  useGetProductDetailsQuery,
  useGetAllProductsQuery,
  useGetProductByCategoryQuery,
  useGetProductsFromFollowingShopsQuery,
} = productApi;
