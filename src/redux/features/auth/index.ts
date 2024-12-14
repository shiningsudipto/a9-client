import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (userData) => ({
        url: "/user/create",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/user/update/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: "/user/delete",
        method: "DELETE",
        body: userId,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => `/user/all`,
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),
    forgetPass: builder.mutation({
      query: (userData) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: userData,
      }),
    }),
    resetPass: builder.mutation({
      query: (userData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: userData,
      }),
    }),
    changePass: builder.mutation({
      query: (userData) => ({
        url: "/auth/change-password",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useForgetPassMutation,
  useResetPassMutation,
  useChangePassMutation,
} = authApi;
