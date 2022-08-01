import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../helpers';


export const getMyBooks = createAsyncThunk(
  `myBooks/getMyBooks`,
  async () => await fetchWrapper.get(`http://localhost/api/books/me`)
);


export const newBook = createAsyncThunk(
  `myBooks/newBook`,
  async ({ title, description, content }) => await fetchWrapper.post(`http://localhost/api/books/`, { title, description, content })
);


export const deleteBook = createAsyncThunk(
  `myBooks/deleteBook`,
  async (id) => await fetchWrapper.delete(`http://localhost/api/books/`, { id })
);


export const updateBook = createAsyncThunk(
  `myBooks/updateBook`,
  async ({ id, title, description, content }) => await fetchWrapper.put(`http://localhost/api/books/${id}`, { title, description, content })
);


const slice = createSlice({
  name: 'myBooks',
  initialState: {
    myBooks: [],
    loading: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBooks.fulfilled, (state, action) => {
        state.myBooks = action.payload;
        state.loading = null;
      })
      .addCase(getMyBooks.rejected, (state, action) => {
        state.error = action.error;
      });

    builder
      .addCase(newBook.pending, (state) => {
        state.error = null;
      })
      .addCase(newBook.fulfilled, (state, action) => {
        state.myBooks.push(action.payload);
      })
      .addCase(newBook.rejected, (state, action) => {
        state.error = action.error;
      });

    builder
      .addCase(updateBook.pending, (state) => {
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const newState = [];
        state.myBooks.map((value) => (value.id !== action.payload.id) ? newState.push(value) : newState.push(action.payload));
        state.myBooks = newState;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.error;
      });

    builder
      .addCase(deleteBook.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        const newState = [];
        state.myBooks.map((value) => (value.id !== action.payload.id) ? newState.push(value) : null);
        state.myBooks = newState;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

// exports

export const myBooksActions = { ...slice.actions, getMyBooks, newBook, deleteBook, updateBook };
export const myBooksReducer = slice.reducer;

export default slice.reducer;
