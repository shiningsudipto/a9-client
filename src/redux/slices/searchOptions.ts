import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SortOrder = "asc" | "desc";

export interface TSearchOptions {
  limit: number;
  page: number;
  sortBy: string;
  searchTerm?: string;
  category?: string;
  sortOrder: SortOrder;
}

// Initial state with default values
const initialState: TSearchOptions = {
  limit: 10,
  page: 1,
  sortBy: "price",
  sortOrder: "asc",
  searchTerm: "",
  category: "",
};

// Create the search slice
const searchSlice = createSlice({
  name: "searchOptions",
  initialState,
  reducers: {
    setSearchOptions: (
      state,
      action: PayloadAction<Partial<TSearchOptions>>
    ) => {
      return { ...state, ...action.payload };
    },
    resetSearchOptions: () => initialState,
  },
});

// Export actions
export const { setSearchOptions, resetSearchOptions } = searchSlice.actions;

export default searchSlice.reducer;

export const useSearchOptions = (state: RootState) => state.searchOptions;
