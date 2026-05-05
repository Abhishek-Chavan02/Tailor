import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/authReducer";
import { getAllUsersReducer, updateUserReducer, deleteUserReducer } from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    userLogin: loginReducer,
    getAllUsers: getAllUsersReducer,
    updateUser: updateUserReducer,
    deleteUser: deleteUserReducer
  },
});

export const getStore = () => store;