import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addComponent: false,
  viewUsers: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleAdd: (state) => {
      state.addComponent = !state.addComponent;
    },
    toggleUsers: (state) => {
      state.viewUsers = !state.viewUsers;
    },
  },
});

export const { toggleAdd, toggleUsers } = dashboardSlice.actions;

export default dashboardSlice.reducer;
