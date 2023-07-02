import { RootState } from '../root.reducer';
import { selectFilters, selectFilterByKey } from './filters.selectors';

describe('filtersSelectors', () => {
  const state: any = {
    filters: {
      exampleKey1: {
        /* filter object 1 */
      },
      exampleKey2: {
        /* filter object 2 */
      },
    },
    // other slices of the state...
  };

  it('should select filters', () => {
    const selectedFilters = selectFilters(state);

    expect(selectedFilters).toEqual(state.filters);
  });

  it('should select filter by key', () => {
    const selectedFilter = selectFilterByKey('exampleKey1')(state);

    expect(selectedFilter).toEqual(state.filters.exampleKey1);
  });
});
