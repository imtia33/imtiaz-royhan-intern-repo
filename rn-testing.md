# React Native Testing: Unit and Integration Tests

## Why is testing important in React Native development?

Testing is crucial for catching bugs early and ensuring feature reliability. In React Native, it's especially important because:

- Apps run on multiple platforms (iOS/Android) that can behave differently
- Helps maintain stability as the codebase grows
- Gives confidence when refactoring code
- Serves as documentation for how components should work

## How do you mock API calls in tests?

We use Jest's mocking capabilities to fake API responses:

```javascript
jest.mock('@/services/userService');

(userService.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
```

This keeps tests fast and reliable by avoiding real network requests.

## What's the difference between unit and integration tests?

**Unit Tests**:
- Test one component or function in isolation
- Mock all external dependencies
- Fast and focused
- Example: Testing a button press triggers the right callback

**Integration Tests**:
- Test how multiple components work together
- May use real APIs or mock only external services
- Slower but more realistic
- Example: Testing a user list loads and displays data correctly

In practice, we write more unit tests than integration tests, but both are valuable.

## Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch
```

The expo-template already has Jest and React Native Testing Library configured.