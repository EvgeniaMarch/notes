import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from './categoriesListSlice';

export const categoriesListApi = createApi({
  tagTypes: ['Category'],
  reducerPath: 'categoriesListApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    loadCategories: builder.query<Category[], void>({
      query: () => `/categories`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              'Category',
            ]
          : ['Category'],
    }),
    addCategory: builder.mutation<Category, Omit<Category, 'id'>>({
      query: (body) => ({
        url: '/categories',
        method: 'post',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const { useLoadCategoriesQuery, useAddCategoryMutation } =
  categoriesListApi;

// Omit используется как функция для типов - параметризованный тип
