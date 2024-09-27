import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart/cartSlice";
import authApi from "./feature/auth/authApi";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [authApi.reducerPath] : authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
    
})