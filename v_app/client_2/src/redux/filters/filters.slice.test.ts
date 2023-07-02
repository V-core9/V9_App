import filtersReducer, { setFilter, removeFilter } from './filters.slice';

describe('filtersSlice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {};
  });

  it('should handle setFilter', () => {
    const key = 'exampleKey';
    const filter = {
      /* filter object */
    };
    const action = setFilter({ key, filter });
    const nextState = filtersReducer(initialState, action);

    expect(nextState).toEqual({ [key]: filter });
  });

  it('should handle removeFilter', () => {
    const key = 'exampleKey';
    initialState[key] = {
      /* filter object */
    };

    const action = removeFilter(key);
    const nextState = filtersReducer(initialState, action);

    expect(nextState).toEqual({});
  });
});
