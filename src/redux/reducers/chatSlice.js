import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    unreadCount: 0,
  },
  reducers: {
    incrementUnread: (state) => {
      state.unreadCount += 1;
    },
    clearUnread: (state) => {
      state.unreadCount = 0;
    },
  },
});

export const { incrementUnread, clearUnread } = chatSlice.actions;
export default chatSlice.reducer;
