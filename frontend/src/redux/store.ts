import { configureStore } from '@reduxjs/toolkit';
import urlReducer from './urlSlice';

export const store = configureStore({
  reducer: {
    url: urlReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
