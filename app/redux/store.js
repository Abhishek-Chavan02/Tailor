import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    userLogin: loginReducer,
  },
});

export const getStore = () => store;