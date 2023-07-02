// import { RootState } from '../root.reducer';

// export const selectCounters = (state: RootState) => state.counters;

// export const selectCounterByKey = (key: string) => (state: RootState) => state.counters[key];

export const selectCounters = (state) => state.counters;

export const selectCounterByKey = (key) => (state) => state.counters[key];
