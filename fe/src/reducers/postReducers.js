import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPostsByPage",
  async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${page}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Failed to fetch posts"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    totalPages: 0,
    status: "idle",
    error: "null",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload.posts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
