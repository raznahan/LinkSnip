import { configureStore } from '@reduxjs/toolkit';
import urlReducer from './urlSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    url: urlReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
