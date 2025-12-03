import { counterSlice, increment, decrement, incrementByAmount } from './counterSlice';

describe('counterSlice', () => {
  const initialState = {
    value: 0,
  };

  it('should handle initial state', () => {
    const nextState = counterSlice.reducer(undefined, { type: 'unknown' });
    expect(nextState).toEqual(initialState);
  });

  it('should handle increment', () => {
    const actual = counterSlice.reducer(initialState, increment());
    expect(actual.value).toEqual(1);
  });

  it('should handle decrement', () => {
    const actual = counterSlice.reducer(initialState, decrement());
    expect(actual.value).toEqual(-1);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterSlice.reducer(initialState, incrementByAmount(5));
    expect(actual.value).toEqual(5);
  });
});