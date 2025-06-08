// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blogs/blogSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
