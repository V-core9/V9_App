import { createSlice } from '@reduxjs/toolkit';

// create slice
const name = 'application';

const initialState = {
  nav: {
    isOpen: false,
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.nav.isOpen = (typeof action.payload === 'boolean') ? action.payload : state.nav.isOpen;
    },
  },
});


export default slice.reducer;

export const applicationActions = { ...slice.actions, };
