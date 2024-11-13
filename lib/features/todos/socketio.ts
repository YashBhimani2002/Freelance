import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import io from "socket.io-client";
import axios from "axios";
import { postNotification } from "@/app/api/api";
import { useSocket } from "@/app/socketContext";

// const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "");

interface socketState {
  status: number;
  notificationMessage: string | null;
}

const initialState: socketState = {
  status: 0,
  notificationMessage: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocketStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
    setNotificationMessage: (state, action: PayloadAction<string | null>) => {
      state.notificationMessage = action.payload;
    },
  },
});

export const { setSocketStatus, setNotificationMessage } = socketSlice.actions;

export const sendNotification = (data: any) => async (dispatch: Dispatch) => {
  const socket:any = useSocket();

  try {
    const response = await postNotification(data); // You need to define postNotification function
    if (response && response.status === 200) {
      dispatch(setSocketStatus(200));
      socket.emit("new_notification", data);
      socket.emit("update_notification", {
        login_as: 3,
        id: "",
      });
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    // Handle error if necessary
  }
};

// Socket event listener
export const setupSocketListeners = () => (dispatch: Dispatch) => {
  const socket:any = useSocket();
  socket.on("res_notification", (data:any) => {
    console.log(data,"socket file ");
    
    dispatch(setNotificationMessage(data));
  });
};

export default socketSlice.reducer;
