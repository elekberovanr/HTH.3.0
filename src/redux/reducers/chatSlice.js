import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchChats = createAsyncThunk('chat/fetchChats', async (userId) => {
  const res = await API.get(`/chat/user/${userId}`);
  return res.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    selectedChat: null,
    selectedChatId: null,
    notifications: {},
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      state.selectedChatId = action.payload?._id;
      if (action.payload?._id) {
        delete state.notifications[action.payload._id];
      }
    },
    resetChat: (state) => {
      state.selectedChat = null;
      state.selectedChatId = null;
    },
    incrementUnread: (state, action) => {
      const { chatId } = action.payload;
      const chat = state.chatList.find(c => c._id === chatId);
      if (chat) chat.unreadCount = (chat.unreadCount || 0) + 1;
      state.notifications[chatId] = (state.notifications[chatId] || 0) + 1;
    },
    markChatAsRead: (state, action) => {
      const chatId = action.payload;
      const chat = state.chatList.find(c => c._id === chatId);
      if (chat) chat.unreadCount = 0;
      delete state.notifications[chatId];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedChat,
  resetChat,
  incrementUnread,
  markChatAsRead,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
