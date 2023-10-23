import { createSlice } from "@reduxjs/toolkit";

//this reducer is used to toggle the get every time a comment is added or deleted

const initialState = {
  commentToggle: 0,
};

const getCommentToggle = createSlice({
  name: "getCommentToggle",
  initialState,
  reducers: {
    setCommentToggle: (state) => {
      state.commentToggle += 1;
    },
  },
});

export const { setCommentToggle } = getCommentToggle.actions;
export default getCommentToggle.reducer;
