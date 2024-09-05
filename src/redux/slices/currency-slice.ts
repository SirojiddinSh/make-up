import { createSlice } from "@reduxjs/toolkit";

const initialCurrency = localStorage.getItem("currency") || "USD";

const currencySlice = createSlice({
    name: "currency",
    initialState: { currency: initialCurrency },
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
            localStorage.setItem("currency", action.payload);
        },
        convertPrice: (state, action) => {
            const { price } = action.payload;
            if (state.currency === "UZS") {
                return (price * 12646).toFixed(2);
            }
            return price.toFixed(2);
        },
    },
});

export const { setCurrency, convertPrice } = currencySlice.actions;

export default currencySlice.reducer;
