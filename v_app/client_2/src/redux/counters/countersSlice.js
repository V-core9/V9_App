import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const countersSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    incrementCounter: (state, action) => {
      const key = action.payload;
      if (state[key] === undefined) {
        state[key] = 0;
      }
      state[key]++;
      return state;
    },

    decrementCounter: (state, action) => {
      const key = action.payload;
      if (state[key] === undefined) {
        state[key] = 0;
      }
      state[key]--;
      return state;
    },

    setCounter: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
      return state;
    },

    removeCounter: (state, action) => {
      const key = action.payload;
      delete state[key];
      return state;
    },

    clearAllCounters: () => initialState,
  },
});

export const { incrementCounter, decrementCounter, setCounter, removeCounter, clearAllCounters } =
  countersSlice.actions;

export default countersSlice.reducer;
