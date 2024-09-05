import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../slices/products-slice";
import likedSlice from "../slices/liked-slice";
import cartSlice from "../slices/cart-slice";
import currencySlice from "../slices/currency-slice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        liked: likedSlice,
        cart: cartSlice,
        currency: currencySlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
