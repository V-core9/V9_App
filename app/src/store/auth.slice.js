import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

import { history, fetchWrapper } from '../helpers';

// create slice
const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers
});

// exports

export const authActions = { ...slice.actions, ...extraActions };
export default slice.reducer;

// implementation

function createInitialState() {
  return {
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    error: null
  }
}

function createReducers() {
  return {
    logout
  };

  function logout(state) {
    state.user = null;
    localStorage.removeItem('user');
    window.location.reload();
  }
}

function createExtraActions() {

  return {
    login: login(),
    register: register(),
    refreshToken: refreshToken(),
  };

  function login() {
    return createAsyncThunk(
      `${name}/login`,
      async ({ email, password }) => await fetchWrapper.post(`http://localhost/api/auth/login`, { email, password })
    );
  }

  function register() {
    return createAsyncThunk(
      `${name}/register`,
      async ({ username, email, password }) => await fetchWrapper.post(`http://localhost/api/auth/register`, { username, email, password })
    );
  }

  function refreshToken() {
    return createAsyncThunk(
      `${name}/refreshToken`,
      async ({ refreshToken }) => await fetchWrapper.post(`http://localhost/api/auth/refreshToken`, { refreshToken })
    );
  }
}

function createExtraReducers() {

  return {
    ...login(),
    ...register(),
    ...refreshToken(),
  };

  function login() {
    var { pending, fulfilled, rejected } = extraActions.login;
    return {
      [pending]: (state) => {
        state.error = null;
      },
      [fulfilled]: (state, action) => {
        let user = action.payload;

        const { accessToken, refreshToken } = user;

        user = jwt_decode(refreshToken);
        user.accessToken = jwt_decode(accessToken);
        user.accessToken.token = accessToken;
        user.refreshToken = jwt_decode(refreshToken);
        user.refreshToken.token = refreshToken;

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;

        // get return url from location state or default to home page
        history.navigate('/');
      },
      [rejected]: (state, action) => {
        state.error = action.error;
      }
    };
  }

  function register() {
    var { pending, fulfilled, rejected } = extraActions.register;
    return {
      [pending]: (state) => {
        state.error = null;
      },
      [fulfilled]: (state, action) => {
        // get return url from location state or default to home page
        const { from } = history.location.state || { from: { pathname: '/login' } };
        history.navigate(from);
      },
      [rejected]: (state, action) => {
        state.error = action.error;
      }
    };
  }

  function refreshToken() {
    var { fulfilled, rejected } = extraActions.refreshToken;
    return {
      [fulfilled]: (state, action) => {
        let user = action.payload;

        const { accessToken, refreshToken } = user;

        user = jwt_decode(refreshToken);
        user.accessToken = jwt_decode(accessToken);
        user.accessToken.token = accessToken;
        user.refreshToken = jwt_decode(refreshToken);
        user.refreshToken.token = refreshToken;

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
      }
    };
  }

}