import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  apiAddNote,
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
  // notesFromCategories: Note[];
  loading: boolean;
  error: string | undefined;
  searchedNotes: Note[];
}

const initialState: NotesState = {
  notesList: [],
  // notesFromCategories: [],
  loading: false,
  error: undefined,
  searchedNotes: [],
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

// type A = {a: number, b: number};
// // type AKeys = keyof A;
// type AKey = 'a' | 'b';

// const x: AKey = 'a';
// const y: AKey = 'b';

export const addNote = createAsyncThunk(
  'notesList/addNote',
  async (note: Omit<Note, 'id' | 'updatedAt'>) => {
    console.log('notesList/addNote', note);

    return await apiAddNote(note);
  },
);

// export const editNote = createAsyncThunk(
//   'notesList/editNote',
//   async (note: Note) => {
//     const editedNote = await apiEditNote(note);
//     return editedNote;
//   },
// );

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
    return (
      builder
        .addCase(loadNotes.fulfilled, (state, action) => {
          state.notesList = action.payload;
          state.loading = false;
        })
        .addCase(loadNotes.pending, (state) => {
          state.loading = true;
        })
        .addCase(loadNotes.rejected, (state, action) => {
          console.log(action.error.message);

          state.error = action.error.message;
          state.loading = false;
          state.notesList = [];
        })
        .addCase(removeNote.fulfilled, (state, action) => {
          state.notesList = state.notesList.filter(
            (note) => note.id !== action.payload,
          );
        })
        .addCase(addNote.fulfilled, (state, action) => {
          // todo id генерируется на сервере +
          // const id = crypto.randomUUID();
          state.notesList.push({ ...action.payload });
        })
        // .addCase(editNote.fulfilled, (state, action) => {
        //   const index = state.notesList.findIndex(
        //     (note) => note.id === action.payload.id,
        //   );
        //   state.notesList[index] = action.payload;
        //   state.loading = false;
        // })
        // .addCase(editNote.pending, (state, action) => {
        //   state.loading = true;
        // })
        // .addCase(editNote.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = 'Невозможно отредактировать заметку';
        // })
        .addCase(loadNotesFromCategory.fulfilled, (state, action) => {
          state.notesList = action.payload;
          state.loading = false;
        })
        .addCase(loadNotesFromCategory.pending, (state) => {
          state.loading = true;
        })
    );
  },
});

export default notesListSlice.reducer;
