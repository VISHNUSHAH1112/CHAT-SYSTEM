import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../Slice/ChatSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer, // chat ka slice
  },
});
