// src/features/blogs/blogSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlogState {
  selectedBlogId: number | null;
}

const initialState: BlogState = {
  selectedBlogId: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    selectBlog: (state, action: PayloadAction<number>) => {
      state.selectedBlogId = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlogId = null;
    },
  },
});

export const { selectBlog, clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
