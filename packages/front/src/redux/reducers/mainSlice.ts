import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  notification: {
    message: undefined,
    type: "success"
  },
  activeTab: 0
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setNotification: (state, { payload }) => {
      state.notification = payload
    },
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload
    }
  },
})

export const { setNotification, setActiveTab } = mainSlice.actions

export default mainSlice.reducer;
