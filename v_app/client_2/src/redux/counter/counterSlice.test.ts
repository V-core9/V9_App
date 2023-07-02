import counterReducer, { increment, decrement, incrementByAmount, reset } from './counterSlice';

describe('counterSlice reducer', () => {
  it('should handle initial state', () => {
    expect(counterReducer(undefined, <any>{})).toEqual(0);
  });

  it('should handle increment', () => {
    expect(counterReducer(0, increment())).toEqual(1);
    expect(counterReducer(5, increment())).toEqual(6);
  });

  it('should handle decrement', () => {
    expect(counterReducer(3, decrement())).toEqual(2);
    expect(counterReducer(0, decrement())).toEqual(-1);
  });

  it('should handle incrementByAmount', () => {
    expect(counterReducer(0, incrementByAmount(5))).toEqual(5);
    expect(counterReducer(10, incrementByAmount(7))).toEqual(17);
  });

  it('should handle reset', () => {
    expect(counterReducer(7, reset())).toEqual(0);
    expect(counterReducer(0, reset())).toEqual(0);
  });
});
