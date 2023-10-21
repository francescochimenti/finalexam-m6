import { createSlice } from "@reduxjs/toolkit";

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
