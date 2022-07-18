import { configureStore } from '@reduxjs/toolkit';
import counter from './counter.slice';
import auth from './auth.slice';
import authNew from './authNew.slice';
import users from './users.slice';
import books from './books.slice';
import myBooks from './myBooks.slice';
import appFunctions from './appFunctions.slice';

export * from './auth.slice';
export * from './authNew.slice';
export * from './users.slice';
export * from './books.slice';
export * from './myBooks.slice';
export * from './appFunctions.slice';

export const store = configureStore({
  reducer: {
    auth,
    authNew,
    counter,
    users,
    books,
    myBooks,
    appFunctions,
  },
});
