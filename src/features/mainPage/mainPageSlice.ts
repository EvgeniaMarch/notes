import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockNotes } from '../../mocks.ts/mocsNotes';

export interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesState {
  notesList: Note[];
}

const notes = mockNotes;

const initialState: NotesState = {
  notesList: notes,
};

export const mainPageSlice = createSlice({
  // name ни на что не влияет. Это имя будет отображаться в логах
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id'>>) => {
      const id = crypto.randomUUID();
      state.notesList.push({ ...action.payload, id });
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notesList = state.notesList.filter(
        (note) => note.id !== action.payload,
      );
      // removeElBy(state.notes, (note) => note.id !== action.payload)
    },
    editNote: (state, action) => {
      // state.notes = state.notes.map((note) => {
      //   if (note.id === action.payload.id) {
      //     return action.payload;
      //   } else {
      //     return note;
      //   }
      // });
      const index = state.notesList.findIndex(
        (note) => note.id === action.payload.id,
      );
      state.notesList[index] = action.payload;
    },
  },
});

export const { addNote, removeNote, editNote } = mainPageSlice.actions;
