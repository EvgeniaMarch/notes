import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiLoadCategories, apiLoadNotesFromCategory } from './api';
import { Note } from '../notesList/notesListSlice';

export interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categoriesList: Category[];
  notesFromCategory: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categoriesList: [],
  notesFromCategory: [],
  loading: false,
  error: null,
};

export const loadCategories = createAsyncThunk(
  'categoriesList/loadCategories',
  async () => {
    const categories = await apiLoadCategories();
    return categories;
  },
);

export const loadNotesFromCategory = createAsyncThunk(
  'categoriesList/loadNotesFromCategory',
  async (id: string) => {
    const notesFromCategory = await apiLoadNotesFromCategory(id);
    return notesFromCategory;
  },
);

export const categoriesListSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    return builder
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesList = action.payload;
      })
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCategories.rejected, (state) => {
        state.categoriesList = [];
        state.loading = false;
        state.error = 'Что-то пошло не так...:(';
      });
  },
});

export default categoriesListSlice.reducer;
