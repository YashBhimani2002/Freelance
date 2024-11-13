import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  _id: string;
  user_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  message_type: string;
  file: string | null;
  reading_status: string;
  user_type: string | null;
  job_id: string | null;
  created_at: string;
  updated_at: string;
  __v: number;
}

interface messageState {
  loggedUser: string;
  messagesCount: number;
  allMessageOfLoggedUser: Message[] | null;
}

const initialState: messageState = {
  loggedUser: "",
  messagesCount: 0,
  allMessageOfLoggedUser: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addLoggedUser: (state, action: PayloadAction<string>) => {
      state.loggedUser = action.payload;
    },
    addMessageCount: (state, action: PayloadAction<number>) => {
      state.messagesCount = action.payload;
    },
    addMessages: (state, action: PayloadAction<Message[] | Message>) => {
        const newMessages = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      
        if (state.allMessageOfLoggedUser === null) {
          state.allMessageOfLoggedUser = newMessages;
        } else {
          const uniqueMessages = newMessages.filter(
            (message) =>
              !state?.allMessageOfLoggedUser?.some(
                (existingMessage) => existingMessage?._id === message?._id
              )
          );
          state.allMessageOfLoggedUser = [
            ...(state.allMessageOfLoggedUser || []), // Ensure allMessageOfLoggedUser is not null
            ...uniqueMessages,
          ];
        }
      },
    markAsRead: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.allMessageOfLoggedUser) {
        state.allMessageOfLoggedUser.forEach((message) => {
          if (userId === message.sender_id || userId === message.receiver_id) {
            message.reading_status = "1";
          }
        });
      }
    },
  },
});

export const { addLoggedUser, addMessageCount, addMessages, markAsRead } =
  messageSlice.actions;
export default messageSlice.reducer;
