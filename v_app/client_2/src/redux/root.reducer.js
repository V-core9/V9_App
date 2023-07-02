import { combineReducers } from "@reduxjs/toolkit";

import { todoSlice } from "./todo/slice";
import { counterSlice } from "./counter/counterSlice";
import { filtersSlice } from "./filters/filters.slice";
import { countersSlice } from "./counters/countersSlice";

const rootReducer = combineReducers({
  todo: todoSlice.reducer,

  // Example store slice [counter]
  counter: counterSlice.reducer,

  // Handle Counters [by key]
  counters: countersSlice.reducer,

  // Handle Counters [by key]
  filters: filtersSlice.reducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
