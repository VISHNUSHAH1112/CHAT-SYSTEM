import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [], // saare chat messages
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload); // new message add
    },
    setMessages: (state, action) => {
      state.messages = action.payload; // initial messages load
    },
  },
});

export const { addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
