import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

import { toast } from 'react-toastify';

import { history, fetchWrapper } from '../helpers';

import type { NewUser, UserLoginType } from '../index';

// create slice
const name = 'auth';

interface Auth {
  user: Object | null,
  loading: Boolean | null,
  error: Object | null,
}

const initialState: Auth = {
  user: (typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('user') as any) || null) : null),
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
      toast("User Logged Out!", { type: "info" });
      //window.location.reload();
    },
  },
  extraReducers(builder) {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        // toast("Login Attempted", { type: "info" });
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
        if (typeof window !== 'undefined')<Object>history.navigate?.push('/');
        toast("Login Successful!", { type: "success" });
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error;
        toast(state.error?.message, { type: "error" });
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        // get return url from location state or default to home page
        const { from } = router.pathname || { from: { pathname: '/login' } };
        if (typeof window !== 'undefined') history.navigate?.push(from);
        toast("Register Successful!", { type: "success" });
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error;
        toast(state.error?.message, { type: "error" });
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
  async ({ email, password }: UserLoginType) => await fetchWrapper.post(`http://localhost/api/auth/login`, { email, password })
);

const register = createAsyncThunk(
  `${name}/register`,
  async ({ username, email, password }: NewUser) => await fetchWrapper.post(`http://localhost/api/auth/register`, { username, email, password })
);

const refreshToken = createAsyncThunk(
  `${name}/refreshToken`,
  async ({ refreshToken }: { refreshToken: string }) => await fetchWrapper.post(`http://localhost/api/auth/refreshToken`, { refreshToken })
);



// ACTUAL EXPORTS
export const authActions = { ...slice.actions, login, register, refreshToken };
export default slice.reducer;
