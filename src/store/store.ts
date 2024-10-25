import { configureStore } from '@reduxjs/toolkit';
import { mainPageSlice } from '../features/mainPage/mainPageSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    notes: mainPageSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
