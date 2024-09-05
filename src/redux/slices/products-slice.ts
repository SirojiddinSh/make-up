import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const apiUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (): Promise<Record<string, any[]>> => {
        const response = await fetch(apiUrl);
        const products = await response.json();

        const categorizedProducts: Record<string, any[]> = {};

        products.forEach((product: any) => {
            const category = product.category;
            if (!categorizedProducts[category]) {
                categorizedProducts[category] = [];
            }
            categorizedProducts[category].push(product);
        });

        return categorizedProducts;
    }
);

interface ProductsState {
    categorizedProducts: Record<string, any[]>;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProductsState = {
    categorizedProducts: {},
    status: "idle",
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<Record<string, any[]>>) => {
                    state.status = "succeeded";
                    state.categorizedProducts = action.payload;
                }
            )
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    action.error.message || "Failed to fetch products";
            });
    },
});

export default productsSlice.reducer;
