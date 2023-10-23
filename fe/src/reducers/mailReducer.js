import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//this reducer is used to send an email to the user when he registers

export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async (recipientEmail) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}/send-mail`,
      { to: recipientEmail }
    );
    if (response.status !== 200) {
      throw new Error("Failed to send email");
    }
    return response.data;
  }
);

const mailReducer = createSlice({
  name: "email",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default mailReducer.reducer;
