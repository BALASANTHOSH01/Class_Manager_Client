// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// initialState
const initialState = {
  currentUser: null, 
  currentUserType: "",
  isAuthenticate: false,
};

// redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.userData;
      state.currentUserType = action.payload.userType;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload.userData;
      state.currentUserType = action.payload.userType;
    },
    closeUser: (state) => {
      state.currentUser = null;
      state.currentUserType = "";
      state.isAuthenticate = false;
    },
    setIsAuthenticate: (state, action) => {
      state.isAuthenticate = action.payload.isAuthenticate;
    },
  },
});

export default userSlice.reducer;
export const {
  setCurrentUser,
  updateCurrentUser,
  closeUser,
  setIsAuthenticate,
} = userSlice.actions;
