# React Native Performance Optimization

## Common Performance Bottlenecks

1. **Excessive Re-renders**: Components re-rendering unnecessarily is one of the most common performance issues. This happens when:
   - Props or state change frequently
   - Anonymous functions are passed as props
   - Objects are created in the render method

2. **Heavy Computations on JavaScript Thread**: Blocking the JavaScript thread with expensive operations leads to dropped frames and unresponsive UI.

3. **Inefficient List Rendering**: Using ScrollView for large lists instead of FlatList or SectionList causes memory issues and poor performance.

4. **Memory Leaks**: Not properly cleaning up resources like timers, event listeners, or subscriptions can cause memory leaks.

5. **Large Images**: Loading oversized images or not implementing proper caching strategies impacts performance.

## How useMemo and useCallback Improve Performance

- **useMemo**: Memoizes expensive calculations, preventing recomputation on every render
- **useCallback**: Prevents creating new function instances on every render, useful when passing callbacks to child components
- **React.memo**: Prevents re-renders of child components when props haven't changed

## Memory and Garbage Collection

React Native uses JavaScript's garbage collector for memory management. However, developers still need to be mindful of:
- Properly cleaning up subscriptions and event listeners
- Avoiding circular references
- Managing large data structures efficiently

## Performance Monitoring Tools

1. **React Native Performance Monitor**: Built-in tools for measuring render performance
2. **Flipper**: Facebook's platform for debugging React Native apps
3. **Sentry**: Error and performance monitoring with real-time insights
4. **React DevTools Profiler**: For identifying performance bottlenecks in component trees