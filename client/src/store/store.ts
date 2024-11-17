import { configureStore } from '@reduxjs/toolkit';
import { notesListSlice } from '../features/notesList/notesListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesListSlice } from '../features/categoriesList/categoriesListSlice';

// store - хранилище данных
// state - данные
// rootState - объект где лежат все фичи (например, notes)
export const store = configureStore({
  reducer: {
    notes: notesListSlice.reducer,
    categories: categoriesListSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
// export type AppSelector

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: <T>(cb: (state: RootState) => T) => T =
  useSelector;
