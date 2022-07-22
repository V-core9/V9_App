import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

import { history, fetchWrapper } from '../helpers';

// create slice
const name = 'auth';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: null,
  error: null
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
      //window.location.reload();
    },
  },
  extraReducers(builder) {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
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
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        // get return url from location state or default to home page
        const { from } = history.location.state || { from: { pathname: '/login' } };
        history.navigate(from);
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error;
      });

    // Refresh Auth Tokens
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
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
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

const login = createAsyncThunk(
  `${name}/login`,
  async ({ email, password }) => await fetchWrapper.post(`http://localhost/api/auth/login`, { email, password })
);

const register = createAsyncThunk(
  `${name}/register`,
  async ({ username, email, password }) => await fetchWrapper.post(`http://localhost/api/auth/register`, { username, email, password })
);

const refreshToken = createAsyncThunk(
  `${name}/refreshToken`,
  async ({ refreshToken }) => await fetchWrapper.post(`http://localhost/api/auth/refreshToken`, { refreshToken })
);


export default slice.reducer;

export const authActions = { ...slice.actions, login, register, refreshToken };
