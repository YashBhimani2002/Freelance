// dashboardReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';



interface DashboardState {
  status: number;
  role: string; 
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    status: 0,
    role: 'professional', 
  } as DashboardState,
  reducers: {
    setDashboardStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
  },
});

export const { setDashboardStatus } = dashboardSlice.actions;
export const selectLoginAs = (state: { auth: { status: any; }; }) => state.auth.status;
export default dashboardSlice.reducer;

