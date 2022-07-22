import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWrapper } from '../helpers';


const initialState = {
  appFunctions: [],
  status: 'idle',
  newFormShow: false,
  editing: null
};

export const getAll = createAsyncThunk(
  'appFunctions/all',
  async () => await fetchWrapper.get(`http://localhost/api/functions`)
);

export const createNew = createAsyncThunk(
  'appFunctions/new',
  async (func) => await fetchWrapper.post(`http://localhost/api/functions`, { ...func })
);

export const deleteFunction = createAsyncThunk(
  'appFunctions/delete',
  async (id) => await fetchWrapper.delete(`http://localhost/api/functions`, { id })
);

export const updateFunction = createAsyncThunk(
  'appFunctions/update',
  async (func) => await fetchWrapper.put(`http://localhost/api/functions`, { ...func })
);

export const appFunctionsSlice = createSlice({
  name: 'appFunctions',
  initialState,
  reducers: {
    endEditFunction: (state) => {
      state.editing = null;
    },
    editFunction: (state, action) => {
      state.editing = action.payload;
    },
    toggleNewForm: (state) => {
      state.newFormShow = !state.newFormShow;
    }
  },

  extraReducers: (builder) => {

    builder
      .addCase(getAll.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.status = 'idle';
        state.appFunctions = action.payload;
        console.log('getAll', action.payload);
      });

    builder
      .addCase(createNew.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNew.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('createNew', action.payload);
        state.appFunctions.push(action.payload);
      });

    builder
      .addCase(deleteFunction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFunction.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('deleteFunction', action.payload);
        let newFunctions = [];
        state.appFunctions.map(item => (item.id !== action.payload.id) ? newFunctions.push(item) : null);
        state.appFunctions = newFunctions;
      });


    builder
      .addCase(updateFunction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateFunction.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('updateFunction', action.payload);
        let newFunctions = [];
        state.appFunctions.map(item => newFunctions.push((item.id === action.payload.id) ? action.payload : item));
        state.appFunctions = newFunctions;
      });

  },

});

export const appFunctionsActions = {
  getAll,
  createNew,
  deleteFunction,
  updateFunction,
  ...appFunctionsSlice.actions,
  ...appFunctionsSlice.reducers
};

export const getFunctions = (state) => state.functions.value;


export default appFunctionsSlice.reducer;
