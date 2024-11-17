import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  apiAddCategory,
  apiLoadCategories,
  apiLoadNotesFromCategory,
} from './api';
import { Note } from '../notesList/notesListSlice';

export interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categoriesList: Category[];
  notesFromCategory: Note[];
}

const initialState: CategoryState = {
  categoriesList: [],
  notesFromCategory: [],
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

export const addCategory = createAsyncThunk(
  'categoriesList/addCategory',
  async (category: Category) => {
    return await apiAddCategory(category);
  },
);

export const categoriesListSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    return builder
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoriesList.push({ ...action.payload });
      });
    // .addCase(loadNotesFromCategory.fulfilled, (state, action) => {
    //   state.notesFromCategory =
    // });
  },
});

export default categoriesListSlice.reducer;
