import { configureStore } from '@reduxjs/toolkit';
import { notesListSlice } from '../features/notesList/notesListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesListSlice } from '../features/categoriesList/categoriesListSlice';
import { notesListApi } from '../features/notesList/notesListApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoriesListApi } from '../features/categoriesList/categoriesListApi';

// store - хранилище данных
// state - данные
// rootState - объект где лежат все фичи (например, notes)
export const store = configureStore({
  reducer: {
    notes: notesListSlice.reducer,
    categories: categoriesListSlice.reducer,
    [notesListApi.reducerPath]: notesListApi.reducer,
    [categoriesListApi.reducerPath]: categoriesListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      notesListApi.middleware,
      categoriesListApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
// export type AppSelector

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: <T>(cb: (state: RootState) => T) => T =
  useSelector;

// const sum = (a: number, ...args: number[]) =>
//   args.reduce((acc, number) => acc + number, a);

// sum(5, 1, 2, 3);
