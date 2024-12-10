/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CompareProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  discount: number;
  [key: string]: any;
}

interface ComparisonState {
  products: CompareProduct[];
  category: string | null;
}

const initialState: ComparisonState = {
  products: [],
  category: null,
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    // Add a product to comparison
    addToComparison: (state, action: PayloadAction<CompareProduct>) => {
      const product = action.payload;

      // If no products exist, set category and add product
      if (state.products.length === 0) {
        state.products.push(product);
        state.category = product.category;
      } else {
        // Check if product category matches
        if (state.category !== product.category) {
          // Reject addition if the product's category is different
          console.warn("Only products from the same category can be compared.");
          return;
        }

        // Check if product is already in the comparison list
        const exists = state.products.some((p) => p.id === product.id);
        if (exists) {
          console.warn("Product is already in the comparison list.");
          return;
        }

        // Add product if comparison limit (3) is not exceeded
        if (state.products.length < 3) {
          state.products.push(product);
        } else {
          console.warn("You can compare up to three products only.");
        }
      }
    },

    // Remove a product from comparison
    removeFromComparison: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);

      // If no products remain, reset category
      if (state.products.length === 0) {
        state.category = null;
      }
    },

    // Clear the comparison list
    clearComparison: (state) => {
      state.products = [];
      state.category = null;
    },
  },
});

export const { addToComparison, removeFromComparison, clearComparison } =
  comparisonSlice.actions;

export const selectComparison = (state: RootState) => state.comparison;

export default comparisonSlice.reducer;
