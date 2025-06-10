// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from '../features/blogs/blogApi';
import blogReducer from '../features/blogs/blogSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    blog: blogReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
