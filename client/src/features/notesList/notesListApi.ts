import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Note } from './notesListSlice';

// Define a service using a base URL and expected endpoints
export const notesListApi = createApi({
  reducerPath: 'notesListApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    loadNotes: builder.query<Note[], void>({
      query: () => `/notes`,
    }),
    // loadCategories: builder.query<Category[], void>({
    //   query: () => `/categories`,
    // }),
    removeNote: builder.mutation<Note[], string>({
      query: (id) => {
        console.log('id', id);
        return {
          url: `/notes/${id}`,
          method: 'delete',
        };
      },
    }),
    addNote: builder.mutation<Note, Omit<Note, 'id' | 'updatedAt'>>({
      query: (body) => ({
        url: '/notes',
        method: 'post',
        body: body,
      }),
    }),
    // addCategory: builder.mutation<Category, Category>({
    //   query: (body) => ({
    //     url: '/categories',
    //     method: 'post',
    //     body,
    //   }),
    // }),
    loadNote: builder.query<Note, Note>({
      query: (id) => ({
        url: `/notes/${id}`,
      }),
      // providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    loadNotesFromCategory: builder.query<Note[], string>({
      query: (id) => `/categories/${id}/notes`,
    }),
    editNote: builder.mutation<Note, Omit<Note, 'updatedAt'>>({
      query: ({ id, ...patch }) => {
        console.log('note', JSON.stringify(patch));

        return {
          url: `/notes/${id}`,
          method: 'put',
          body: patch,
        };
      },
      transformResponse: (response: { data: Note }) => response.data,
      // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     notesListApi.util.updateQueryData(
      //       'loadNote',
      //       { id, ...patch },
      //       (draft) => {
      //         Object.assign(draft, patch);
      //       },
      //     ),
      //   );
      //   console.log('patchResult', patchResult);

      // try {
      //   await queryFulfilled;
      // } catch {
      //   patchResult.undo();
      // }
      // },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoadNotesQuery,
  useRemoveNoteMutation,
  useAddNoteMutation,
  useEditNoteMutation,
  useLoadNoteQuery,
  useLazyLoadNotesFromCategoryQuery,
} = notesListApi;
