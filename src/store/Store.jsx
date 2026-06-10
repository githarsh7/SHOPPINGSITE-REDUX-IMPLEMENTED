import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/Slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});