# API Calls with Axios Reflection

## Why is it useful to create a reusable Axios instance?

Creating a reusable Axios instance is beneficial because it:
- Centralizes configuration (base URL, timeouts, default headers)
- Ensures consistency across all API requests
- Simplifies maintenance when API settings need to change
- Enables global interceptors for auth, logging, and error handling
- Reduces code duplication across the application
- Makes testing easier with consistent mock setups
- Allows for easy environment-specific configurations

## How does intercepting requests help with authentication?

Intercepting requests helps with authentication by:
- Automatically attaching auth tokens to all outgoing requests
- Centralizing token retrieval from storage (localStorage, sessionStorage)
- Handling token expiration and refresh workflows
- Preventing unauthorized requests from being sent
- Ensuring consistent auth header format across all requests
- Enabling easy logout by clearing tokens and rejecting pending requests
- Providing a single point to handle auth-related errors

## What happens if an API request times out, and how can you handle it?

When an API request times out:
- Axios throws an error with code 'ECONNABORTED'
- The promise is rejected, triggering the catch block
- User experience suffers from unresponsive UI
- Pending requests may continue consuming resources

Timeout handling strategies:
- Set appropriate timeout values based on expected response times
- Provide user feedback when requests are taking too long
- Implement retry mechanisms for critical requests
- Cancel pending requests when components unmount
- Log timeout events for monitoring and debugging
- Provide fallback mechanisms or cached data when possible

## How does AbortController enhance API request management?

AbortController enhances API request management by:
- Allowing cancellation of pending requests to prevent resource waste
- Enabling better user experience when navigating away from components
- Preventing race conditions with outdated requests
- Providing a standardized way to cancel fetch and Axios requests
- Helping manage memory by cleaning up abandoned requests
- Supporting better error handling for cancelled requests