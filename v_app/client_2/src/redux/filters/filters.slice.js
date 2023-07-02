import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      console.warn("setFilter", state, action);
      const { key, filter } = action.payload;
      state[key] = filter;
    },
    removeFilter: (state, action) => {
      console.warn("removeFilter", state, action);
      const key = action.payload;
      delete state[key];
    },
    clearAllFilters: () => initialState,
  },
});

export const { setFilter, removeFilter, clearAllFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
