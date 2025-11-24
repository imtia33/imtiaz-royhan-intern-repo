# React Hooks Reflection

## When should you use useEffect instead of handling logic inside event handlers?

You should use useEffect when:
- You need to synchronize with external systems (APIs, subscriptions, timers)
- You want to run code after a component renders or re-renders
- You need to perform cleanup when a component unmounts
- You want to respond to changes in props or state variables
- You're dealing with side effects that shouldn't be triggered by direct user actions

Event handlers are better for:
- Direct user interactions (clicks, form submissions)
- Synchronous operations that respond immediately to user actions
- Logic that should only run when explicitly triggered by the user

## What happens if you don't provide a dependency array?

If you don't provide a dependency array to useEffect:
- The effect runs after every single render (both initial render and all re-renders)
- This can lead to performance issues and infinite loops
- It may cause unnecessary API calls or subscriptions
- Cleanup functions will run before every effect execution and when the component unmounts

An empty dependency array [] means the effect runs only once after the initial render.
A dependency array with values [value1, value2] means the effect runs when any of those values change.

## How can improper use of useEffect cause performance issues?

Improper use of useEffect can cause performance issues through:
- Infinite loops when state is updated inside an effect without proper dependencies
- Excessive API calls due to missing or incorrect dependency arrays
- Memory leaks from subscriptions or timers that aren't properly cleaned up
- Blocking the main thread with heavy computations in effects
- Unnecessary re-renders of child components

## How does useMemo improve performance?

useMemo improves performance by:
- Caching expensive calculations so they don't recompute on every render
- Preventing unnecessary recalculations when dependencies haven't changed
- Reducing the workload during component re-renders
- Optimizing components that perform heavy computations

## When should you avoid using useMemo?

You should avoid useMemo when:
- The calculation is simple and fast to compute
- The dependencies change frequently, making caching ineffective
- You're trying to cache objects that will be different on every render anyway
- The memory overhead of caching outweighs the computation cost
- You're using it to prevent re-renders of components without proper memoization

## What happens if you remove useMemo from your implementation?

If you remove useMemo from an implementation:
- Expensive calculations will run on every render
- Performance may degrade significantly for complex computations
- The component and its children may re-render unnecessarily
- User experience may suffer from slower interactions
- Battery drain may increase on mobile devices due to excessive computations

## What problem does useCallback solve?

useCallback solves the problem of:
- Creating new function instances on every render
- Causing unnecessary re-renders of child components that receive functions as props
- Breaking referential equality checks in dependency arrays
- Wasting memory by creating identical functions repeatedly
- Triggering effects in child components that depend on function references

## How does useCallback work differently from useMemo?

The key differences between useCallback and useMemo are:
- useCallback returns a memoized function
- useMemo returns a memoized value (which could be anything)
- useCallback is specifically for functions to maintain referential equality
- useMemo is for any computed value that you want to cache
- Both require a dependency array to determine when to recompute

## When would useCallback not be useful?

useCallback is not useful when:
- The function is only used within the same component (no props or context)
- Child components are not memoized (React.memo, useMemo, etc.)
- The dependency array changes frequently, making caching ineffective
- The function is simple and quick to create
- You're passing the function to a component that re-renders regardless