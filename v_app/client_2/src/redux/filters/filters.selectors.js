export const selectFilters = (state) => state.filters;

export const selectFilterByKey = (key) => (state) => state.filters[key];
