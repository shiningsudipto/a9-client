/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from "../types";

export const saveToLocalstorage = (name: string, data: any) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocalstorage = (name: string) => {
  const data = localStorage.getItem(name);
  return data ? JSON.parse(data) : null;
};

export const removeFromLocalstorage = (name: string) => {
  localStorage.removeItem(name);
};

export const storeRecentProduct = (product: TProduct) => {
  // Retrieve the current list from localStorage
  const storedProducts: TProduct[] = JSON.parse(
    localStorage.getItem("recentProducts") || "[]"
  );

  // Check for duplicates using product.id
  const isDuplicate = storedProducts.some((p) => p?.id === product?.id);

  if (!isDuplicate) {
    // Add the new product to the beginning of the list
    const updatedProducts = [product, ...storedProducts];

    // Keep only the recent 10 products
    if (updatedProducts.length > 10) {
      updatedProducts.pop(); // Remove the last product
    }

    // Save back to localStorage
    localStorage.setItem("recentProducts", JSON.stringify(updatedProducts));
  }
};
