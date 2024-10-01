import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart/cartSlice";
import authApi from "./feature/auth/authApi";
import authReducer from "./feature/auth/authSlice";
import productsApi from "./feature/products/productsApi.js";
import reviewApi from "./feature/reviews/reviewsApi.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer, //its basically authSlice defined in authSlice.js but we retrieve reducer here
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewApi.middleware
    ),
});
