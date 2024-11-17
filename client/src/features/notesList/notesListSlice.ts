import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  apiAddNote,
  apiEditNote,
  apiLoadNotes,
  apiLoadNotesFromCategory,
  apiRemoveNote,
} from './api';

export interface Note {
  id: string;
  title: string;
  content: string;
  categoryId: string | null;
  updatedAt: string;
}

interface NotesState {
  notesList: Note[];
  notesFromCategories: Note[];
}

const initialState: NotesState = {
  notesList: [],
  notesFromCategories: [],
};

export const loadNotes = createAsyncThunk(
  // имя экшена - имя фечи / имя санка
  'notesList/loadNotes',
  async () => {
    const notes = await apiLoadNotes();
    // вот это уйдёт в payload
    return notes;
  },
);

export const removeNote = createAsyncThunk(
  'notesList/removeNote',
  async (id: string) => {
    await apiRemoveNote(id);
    return id;
  },
);

export const addNote = createAsyncThunk(
  'notesList/addNote',
  async (note: Note) => {
    console.log('notesList/addNote', note);

    return await apiAddNote(note);
  },
);

export const editNote = createAsyncThunk(
  'notesList/editNote',
  async (note: Note) => {
    const editedNote = await apiEditNote(note);
    return editedNote;
  },
);

export const loadNotesFromCategory = createAsyncThunk(
  'notesList/loadNotesFromCategory',
  async (id: string) => {
    return await apiLoadNotesFromCategory(id);
  },
);

// todo слайсы с маленькой буквы (переимновать файл) и переименовать константу +
export const notesListSlice = createSlice({
  // name ни на что не влияет. Это имя будет отображаться в логах
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    return builder
      .addCase(loadNotes.fulfilled, (state, action) => {
        state.notesList = action.payload;
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.notesList = state.notesList.filter(
          (note) => note.id !== action.payload,
        );
      })
      .addCase(addNote.fulfilled, (state, action) => {
        // todo id генерируется на сервере +
        // const id = crypto.randomUUID();
        console.log('action', action);

        state.notesList.push({ ...action.payload });
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.notesList.findIndex(
          (note) => note.id === action.payload.id,
        );
        state.notesList[index] = action.payload;
      })
      .addCase(loadNotesFromCategory.fulfilled, (state, action) => {
        state.notesFromCategories = action.payload;
      });
  },
});

export default notesListSlice.reducer;
