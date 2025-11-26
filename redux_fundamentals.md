# Redux Toolkit Fundamentals

## When to use Redux instead of useState?

Use Redux when:
- State is shared across multiple components
- Complex state logic is needed
- Performance optimization is required
- Predictable state changes are important
- Advanced debugging is needed
- Building large applications

Use useState for simple, localized state.

## Benefits of Using Selectors

1. **Memoization**: Prevents unnecessary recalculations
2. **Reusability**: Encapsulates state access logic
3. **Abstraction**: Hides state structure details
4. **Composability**: Can be combined for complex data
5. **Testability**: Easy to unit test
6. **Consistency**: Ensures uniform state access
7. **Computed Data**: Derives values without redundancy

Example:
```javascript
// Direct access
const count = useSelector(state => state.counter.value);

// Using selector
const selectCounterValue = state => state.counter.value;
const count = useSelector(selectCounterValue);
```