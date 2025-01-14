import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from './categoriesListSlice';

export const categoriesListApi = createApi({
  reducerPath: 'categoriesListApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    loadCategories: builder.query<Category[], void>({
      query: () => `/categories`,
    }),
    addCategory: builder.mutation<Category, Omit<Category, 'id'>>({
      query: (body) => ({
        url: '/categories',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useLoadCategoriesQuery, useAddCategoryMutation } =
  categoriesListApi;

// Omit используется как функция для типов - параметризованный тип
