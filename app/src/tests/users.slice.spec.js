import usersReducer, {
  getAll
} from '../store/usersNew.slice';

describe('users reducer', () => {

  const initialState = {
    users: [],
    loading: null,
    error: null
  };

  it('should handle initial state', () => {
    expect(usersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // it('should handle increment', () => {
  //   const actual = usersReducer(initialState, getAll());
  //   expect(actual.value).toEqual(4);
  // });

});
