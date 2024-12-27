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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoadNotesQuery } = notesListApi;
