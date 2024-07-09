// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js";
import { loadState, saveState } from "../utils/localStorage.js";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
