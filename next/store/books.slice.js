import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../helpers';

// create slice

const name = 'books';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const bookActions = { ...slice.actions, ...extraActions };
export const booksReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        books: []
    }
}

function createExtraActions() {

    return {
        getAll: getAll()
    };

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(`http://localhost/api/books`)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.books = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.books = action.payload;
            },
            [rejected]: (state, action) => {
                state.books = { error: action.error };
            }
        };
    }
}

export default slice.reducer;
