import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockNotes } from '../../mocks.ts/mocsNotes';

export interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
}

const notes = mockNotes;

const initialState: NotesState = {
  notes: notes,
};

export const mainPageSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id'>>) => {
      const id = crypto.randomUUID();
      state.notes.push({ ...action.payload, id });
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    editNote: (state, action) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        } else {
          return note;
        }
      });
    },
  },
});

export const { addNote, removeNote, editNote } = mainPageSlice.actions;
