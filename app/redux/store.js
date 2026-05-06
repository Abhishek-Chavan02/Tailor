import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/authReducer";
import { getAllUsersReducer, updateUserReducer, deleteUserReducer } from "./reducers/userReducer";
import customerMeasurementReducer from "./reducers/measurementReducer";

export const store = configureStore({
  reducer: {
    userLogin: loginReducer,
    getAllUsers: getAllUsersReducer,
    updateUser: updateUserReducer,
    deleteUser: deleteUserReducer,
    customerMeasurement: customerMeasurementReducer,
  },
});

export const getStore = () => store;