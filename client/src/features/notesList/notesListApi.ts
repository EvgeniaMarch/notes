import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Note } from './notesListSlice';

// Define a service using a base URL and expected endpoints
export const notesListApi = createApi({
  tagTypes: ['Notes'],
  reducerPath: 'notesListApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // loadNotes: builder.query<Note[], void>({
    //   query: () => `/notes`,
    // }),
    // loadCategories: builder.query<Category[], void>({
    //   query: () => `/categories`,
    // }),

    addNote: builder.mutation<Note, Omit<Note, 'id' | 'updatedAt'>>({
      query: (body) => ({
        url: '/notes',
        method: 'post',
        body: body,
      }),
      // todo important
      invalidatesTags: (result, error, arg) => [{ type: 'Notes', id: arg.id }], // id: body.categoryId, обновить LIST
      // если создается заметка без категории, то id: no_category
    }),
    // addCategory: builder.mutation<Category, Category>({
    //   query: (body) => ({
    //     url: '/categories',
    //     method: 'post',
    //     body,
    //   }),
    // }),
    loadNote: builder.query<Note, string>({
      query: (id) => ({
        url: `/notes/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Notes', id }],
    }),
    loadNotes: builder.query<Note[], string | void>({
      query: (categoryId) =>
        categoryId ? `/categories/${categoryId}/notes` : `/notes`,
      providesTags: (result, error, arg) => {
        console.log(arg);
        // if(arg === no-categoty)
        return [
          ...(result ?? []).map(({ id }) => ({ type: 'Notes' as const, id })),

          { type: 'Notes', id: arg ? `${arg}_category` : 'LIST' },
        ];
      },
    }),
    removeNote: builder.mutation<Note[], Note>({
      // в параметры передавать Note
      // todo все доделать. AddNote -> что должно и не должно перезагружаться
      // Проверить как работают все заметки
      query: (note) => {
        console.log('id', note.id);
        return {
          url: `/notes/${note.id}`,
          method: 'delete',
        };
      },
      invalidatesTags: (result, error, note) => [
        { type: 'Notes', id: note.id },
        // { type: 'Notes', id: `no_category` },
        // { type: 'Notes', id: 'LIST' },
      ],
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
      invalidatesTags: (result, error, note) => [
        { type: 'Notes', id: note.id },
      ],
      // transformResponse: (response: { data: Note }) => response.data,
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
} = notesListApi;
