
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWrapper } from '../helpers';


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: null,
  error: null
};




export const authNewSlice = createSlice({
  name: 'authNew',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.user = null;
    }

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {

  },
});


export default authNewSlice.reducer;