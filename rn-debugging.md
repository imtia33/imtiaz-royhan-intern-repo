## How does Metro help in debugging a React Native app?

Metro is the JavaScript bundler for React Native that helps in debugging by providing fast refresh capabilities, real-time error reporting, and source maps for better stack traces. It also supports breakpoints and step-through debugging when used with Chrome DevTools.

## What debugging features does Flipper provide?

Flipper provides a comprehensive debugging platform with features like:
- Layout inspector for UI components
- Network inspection
- Logs viewer
- Performance monitoring
- Plugin architecture for custom tools

## How can you inspect network requests in React Native?

You can inspect network requests using Flipper's Network plugin or by enabling network inspection in React Native Debugger. Here's a simple example of how to log network requests:

```js
const originalFetch = fetch;
fetch = function(...args) {
  console.log('Network Request:', args[0]);
  return originalFetch.apply(this, args);
};
```

For more advanced inspection, use Flipper's Network plugin which automatically captures all network traffic including headers, body, and response times.
