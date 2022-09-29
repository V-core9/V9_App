import { configureStore } from '@reduxjs/toolkit';
import counter from './counter.slice';
import application from './application.slice.js';
import auth from './auth.slice';
import users from './users.slice';
import books from './books.slice';
import myBooks from './myBooks.slice';
import appFunctions from './appFunctions.slice';

import nasaAssetsReducer from './nasaAssetsSlice';

export * from './auth.slice';
export * from './application.slice';
export * from './users.slice';
export * from './books.slice';
export * from './myBooks.slice';
export * from './appFunctions.slice';

export const store: any = configureStore({
  reducer: {
    application,
    auth,
    counter,
    users,
    books,
    myBooks,
    appFunctions,
    nasaAssets: nasaAssetsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
