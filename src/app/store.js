import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/Authentication/userSlice";
import CartReducer from "../features/Cart/cartSlice";

const rootReducer = {
  user: UserReducer,
  cart: CartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
