// lib/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../lib/features/todos/professionalClientSidebar';
import messageReducer from './features/todos/messageSlice';
import socketSliceReducer from '../lib/features/todos/socketio';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    message: messageReducer,
    socket: socketSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;