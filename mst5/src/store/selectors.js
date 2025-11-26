// Selector functions for extracting data from the Redux store
import { createSelector } from '@reduxjs/toolkit';

// Basic selector to get the counter value
export const selectCounterValue = (state) => state.counter.value;

// Memoized selector to get counter value (useful for expensive computations)
export const selectCounterValueMemoized = createSelector(
  [selectCounterValue],
  (counterValue) => counterValue
);

// Selector to get counter status message based on value
export const selectCounterMessage = createSelector(
  [selectCounterValue],
  (counterValue) => {
    if (counterValue < 0) {
      return "Negative numbers! Careful there!";
    } else if (counterValue === 0) {
      return "Starting fresh! Hit increment to begin.";
    } else if (counterValue > 0 && counterValue < 5) {
      return "Getting started! Keep going!";
    } else if (counterValue >= 5 && counterValue < 10) {
      return "Nice progress! You're on a roll!";
    } else {
      return "Wow! You're a counter master!";
    }
  }
);

// Selector to check if counter is positive
export const selectIsCounterPositive = createSelector(
  [selectCounterValue],
  (counterValue) => counterValue > 0
);

// Selector to check if counter is negative
export const selectIsCounterNegative = createSelector(
  [selectCounterValue],
  (counterValue) => counterValue < 0
);