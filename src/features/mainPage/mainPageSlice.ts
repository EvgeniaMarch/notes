import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const mainPageSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id'>>) => {
      //генерировать id
      const id = crypto.randomUUID();
      // state.notes = state.notes.push(action.payload);
      // state = {...state, notes: [...state.notes, action.payload]};
      // state.notes = [...state.notes, action.payload]
      state.notes.push({ ...action.payload, id });
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, removeNote } = mainPageSlice.actions;

// export default mainPageSlice;
