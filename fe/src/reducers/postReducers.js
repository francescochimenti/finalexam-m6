import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//this reducer is used to fetch posts from the server, i use this reducer in the home page

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

//this reducer is used to search posts by title, i use this reducer in the search page
export const searchPostsByTitle = createAsyncThunk(
  "posts/searchPostsByTitle",
  async (title) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/posts/byTitle?title=${title}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Failed to search posts"
      );
    }
  }
);

//this reducer is all i need to manage posts in the app
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
      })
      .addCase(searchPostsByTitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPostsByTitle.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload.posts;
      })
      .addCase(searchPostsByTitle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
