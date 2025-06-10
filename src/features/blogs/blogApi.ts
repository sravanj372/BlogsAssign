// src/features/blogs/blogApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BlogPost } from '../../types';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query<BlogPost[], void>({
      query: () => 'posts',
    }),
    getBlogById: builder.query<BlogPost, number>({
      query: (id) => `posts/${id}`,
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetBlogByIdQuery } = blogApi;
