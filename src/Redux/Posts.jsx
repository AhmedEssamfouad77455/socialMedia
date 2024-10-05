import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PostApi = createApi({
  reducerPath: 'PostApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tarmeezacademy.com/api/v1/' }),
  endpoints: (builder) => ({
    getPostByName: builder.query({
      query: (name) =>`${name}`,

    }),

  }),
})

export const { useGetPostByNameQuery } = PostApi