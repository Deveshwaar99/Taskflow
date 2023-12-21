import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: '/users',
  }),
  endpoints(builder) {
    return {
      signup: builder.mutation({
        query: signupData => {
          return {
            url: '/',
            method: 'POST',
            body: signupData,
          }
        },
      }),
      loginUser: builder.mutation({
        query: loginCredentials => {
          return {
            url: '/login',
            method: 'POST',
            body: loginCredentials,
          }
        },
      }),
    }
  },
})
export const { useSignupMutation, useLoginUserMutation } = userApi
export { userApi }
