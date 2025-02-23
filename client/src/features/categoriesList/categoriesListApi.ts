import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from './categoriesListSlice';

export const categoriesListApi = createApi({
  tagTypes: ['Category'],
  reducerPath: 'categoriesListApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    loadCategories: builder.query<Category[], void>({
      query: () => `/categories`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              'Category',
            ]
          : ['Category'],
    }),
    addCategory: builder.mutation<Category, Omit<Category, 'id'>>({
      query: (body) => {
        console.log('body', body);

        return { url: '/categories', method: 'post', body };
      },
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<Category[], string>({
      query: (id) => {
        console.log('body', id);

        return { url: `/categories/${id}`, method: 'delete', id };
      },
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useLoadCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesListApi;

// Omit используется как функция для типов - параметризованный тип
