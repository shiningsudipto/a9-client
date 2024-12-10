import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  vendorId: string;
  image: string;
}

interface CartState {
  products: Product[];
  vendorId: string | null;
  totalCost: number;
}

const initialState: CartState = {
  products: [],
  vendorId: null,
  totalCost: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart, replacing previous cart
    replaceCart: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.vendorId = action.payload[0]?.vendorId || null;
      state.totalCost = action.payload.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },

    // Add product to cart if it's from the same vendor
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      // Check vendor consistency
      if (state.vendorId && state.vendorId !== product.vendorId) {
        return; // Prevent adding and handle this warning in the component
      }

      // Check if product already exists
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.products.push(product);
      }

      // Update vendorId and total cost
      state.vendorId = product.vendorId;
      state.totalCost = state.products.reduce(
        (total, p) => total + p.price * p.quantity,
        0
      );
    },

    // Clear the cart
    clearCart: (state) => {
      state.products = [];
      state.vendorId = null;
      state.totalCost = 0;
    },

    // Remove a specific product
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);

      if (state.products.length === 0) {
        state.vendorId = null;
      }

      // Recalculate total cost
      state.totalCost = state.products.reduce(
        (total, p) => total + p.price * p.quantity,
        0
      );
    },
  },
});

export const { replaceCart, addProduct, clearCart, removeProduct } =
  cartSlice.actions;

export const useCartOptions = (state: RootState) => state.cart;

export default cartSlice.reducer;
