import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Note } from './notesListSlice';

// Define a service using a base URL and expected endpoints
export const notesListApi = createApi({
  tagTypes: ['Notes'],
  reducerPath: 'notesListApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    addNote: builder.mutation<Note, Omit<Note, 'id' | 'updatedAt'>>({
      query: (body) => ({
        url: '/notes',
        method: 'post',
        body: body,
      }),
      // todo important (проверить)+
      invalidatesTags: (arg) => {
        return [
          { type: 'Notes', id: `${arg?.categoryId}_category` },
          { type: 'Notes', id: 'LIST' },
        ];
      },
      // id: body.categoryId, обновить LIST
      // если создается заметка без категории, то id: no_category
    }),
    findNotes: builder.query<Note[], string | null>({
      query: (search) => {
        return {
          url: `/notes`,
          method: 'get',
          params: { search },
        };
      },
      providesTags: (result, error, arg) => {
        console.log('result', arg);

        return [{ type: 'Notes', id: 'LIST' }];
      },
    }),
    loadNote: builder.query<Note, string>({
      query: (id) => {
        console.log('id', id);

        return {
          url: `/notes/${id}`,
        };
      },
      providesTags: (result, error, id) => [{ type: 'Notes', id }],
    }),
    loadNotes: builder.query<Note[], string | void>({
      query: (categoryId) =>
        categoryId ? `/categories/${categoryId}/notes` : `/notes`,
      providesTags: (result, error, arg) => {
        console.log('arg-load', arg);
        console.log('result', result);

        return [
          ...(result ?? []).map(({ id }) => ({ type: 'Notes' as const, id })),

          { type: 'Notes', id: arg ? `${arg}_category` : 'LIST' },
        ];
      },
    }),
    removeNote: builder.mutation<Note[], string>({
      // в параметры передавать Note
      // todo все доделать. AddNote -> что должно и не должно перезагружаться
      // Проверить как работают все заметки
      query: (id) => {
        console.log('id', id);
        return {
          url: `/notes/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Notes', id },
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
    }),
  }),
});

export const {
  useLoadNotesQuery,
  useRemoveNoteMutation,
  useAddNoteMutation,
  useEditNoteMutation,
  useLoadNoteQuery,
  useFindNotesQuery,
} = notesListApi;
