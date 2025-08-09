import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { fetchWrapper } from '../helpers';
import apiLocation from '../config/apiLocation'


export const getMyBooks = createAsyncThunk(
  `myBooks/getMyBooks`,
  async () => await fetchWrapper.get(`${apiLocation}/books/me`)
);


export const newBook = createAsyncThunk(
  `myBooks/newBook`,
  async ({ title, description, content }) => await fetchWrapper.post(`${apiLocation}/books/`, { title, description, content })
);


export const deleteBook = createAsyncThunk(
  `myBooks/deleteBook`,
  async (id) => await fetchWrapper.delete(`${apiLocation}/books/`, { id })
);


export const updateBook = createAsyncThunk(
  `myBooks/updateBook`,
  async ({ id, title, description, content }) => await fetchWrapper.put(`${apiLocation}/books/${id}`, { title, description, content })
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
        toast(state.error.message, { type: "error" });
      });

    builder
      .addCase(newBook.pending, (state) => {
        state.error = null;
      })
      .addCase(newBook.fulfilled, (state, action) => {
        state.myBooks.push(action.payload);
        toast("New Book Created : " + action.payload.id, { type: "success" });
      })
      .addCase(newBook.rejected, (state, action) => {
        state.error = action.error;
        toast(state.error.message, { type: "error" });
      });

    builder
      .addCase(updateBook.pending, (state) => {
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const newState = [];
        state.myBooks.map((value) => (value.id !== action.payload.id) ? newState.push(value) : newState.push(action.payload));
        state.myBooks = newState;
        toast("Book Updated.", { type: "success" });
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.error;
        toast(state.error.message, { type: "error" });
      });

    builder
      .addCase(deleteBook.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        const newState = [];
        state.myBooks.map((value) => (value.id !== action.payload.id) ? newState.push(value) : null);
        state.myBooks = newState;
        toast("Deleted a book.", { type: "success" });
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.error;
        toast(state.error.message, { type: "error" });
      });
  }
});

// exports

export const myBooksActions = { ...slice.actions, getMyBooks, newBook, deleteBook, updateBook };
export const myBooksReducer = slice.reducer;

export default slice.reducer;
