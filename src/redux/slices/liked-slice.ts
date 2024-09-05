// liked-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/dataTypes";

interface LikedState {
    likedProducts: Product[];
}

const initialState: LikedState = {
    likedProducts: JSON.parse(localStorage.getItem("likedCars") || "[]"),
};

const likedSlice = createSlice({
    name: "liked",
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<Product>) => {
            const carIndex = state.likedProducts.findIndex(
                (product: Product) => product.id === action.payload.id
            );
            if (carIndex >= 0) {
                state.likedProducts.splice(carIndex, 1);
            } else {
                state.likedProducts.push(action.payload);
            }
            // localStorage'ga saqlash
            localStorage.setItem(
                "likedCars",
                JSON.stringify(state.likedProducts)
            );
        },
    },
});

export const { toggleLike } = likedSlice.actions;

export default likedSlice.reducer;
