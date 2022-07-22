import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../helpers';

// create slice

const name = 'users';
const initialState = {
  users: [],
  loading: null,
  error: null
};

const slice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = null;
        state.users = action.payload;

        localStorage.setItem('testCounter', state.value);
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = null;
        state.error = action.payload;

        localStorage.setItem('testCounter', state.value);
      });
  },
});


export const getAll = createAsyncThunk(
  `${name}/getAll`,
  async () => await fetchWrapper.get(`http://localhost/api/users`)
);


export default slice.reducer;
