import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (userId, thunkAPI) => {
    const res = await API.get(`/chat/user/${userId}`);
    return res.data;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    selectedChat: null,
    selectedChatId: null,
    loading: false,
    error: null,
    notifications: {}, // ✅ for support users only
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      state.selectedChatId = action.payload._id;
    },
    resetChat: (state) => {
      state.selectedChat = null;
      state.selectedChatId = null;
    },
    markChatAsRead: (state, action) => {
      const chatId = action.payload;
      const chat = state.chatList.find((c) => c._id === chatId);
      if (chat) {
        chat.unreadCount = 0;
      }
    },
    incrementUnread: (state, action) => {
      const { chatId, count = 1 } = action.payload;
      if (state.notifications[chatId]) {
        state.notifications[chatId] += count;
      } else {
        state.notifications[chatId] = count;
      }
      const chat = state.chatList.find((c) => c._id === chatId);
      if (chat) {
        chat.unreadCount = (chat.unreadCount || 0) + count;
      }
    },
    resetUnread: (state, action) => {
      const chatId = action.payload;
      if (state.notifications[chatId]) {
        state.notifications[chatId] = 0;
      }
    },
    clearAllSupportNotifications: (state) => {
      state.notifications = {};
    }
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
  markChatAsRead,
  incrementUnread,
  resetUnread,
  clearAllSupportNotifications,
} = chatSlice.actions;

export default chatSlice.reducer;
