import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart/cartSlice";
import authApi from "./feature/auth/authApi";
import authReducer from "./feature/auth/authSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer, //its basically authSlice defined in authSlice.js but we retrieve reducer here
        [authApi.reducerPath] : authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
    
})