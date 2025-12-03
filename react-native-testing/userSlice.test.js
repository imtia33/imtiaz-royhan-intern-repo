import userReducer, { fetchUsers, addUser, removeUser, clearError } from './userSlice';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('userSlice', () => {
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const mockUser = { id: 3, name: 'Bob Johnson', email: 'bob@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle removeUser', () => {
      const state = {
        ...initialState,
        users: mockUsers,
      };

      const newState = userReducer(state, removeUser(1));
      expect(newState.users).toHaveLength(1);
      expect(newState.users[0]).toEqual(mockUsers[1]);
    });

    it('should handle clearError', () => {
      const state = {
        ...initialState,
        error: 'Some error',
      };

      const newState = userReducer(state, clearError());
      expect(newState.error).toBeNull();
    });
  });

  describe('async thunks', () => {
    describe('fetchUsers', () => {
      it('should fetch users successfully', async () => {
        // Mock the axios get method
        axios.get.mockResolvedValue({ data: mockUsers });

        // Call the thunk
        const dispatch = jest.fn();
        const getState = jest.fn();
        await fetchUsers()(dispatch, getState, undefined);

        // Check that axios was called correctly
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');

        // Check that the dispatch was called with the correct action
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: 'users/fetchUsers/pending'
        }));
      });

      it('should handle fetchUsers rejection', async () => {
        // Mock the axios get method to reject
        axios.get.mockRejectedValue(new Error('Network error'));

        // Call the thunk
        const dispatch = jest.fn();
        const getState = jest.fn();
        await fetchUsers()(dispatch, getState, undefined);

        // Check that axios was called
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');

        // Check that the dispatch was called with the rejected action
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: 'users/fetchUsers/rejected'
        }));
      });
    });

    describe('addUser', () => {
      it('should add a user successfully', async () => {
        // Mock the axios post method
        axios.post.mockResolvedValue({ data: mockUser });

        // Call the thunk
        const dispatch = jest.fn();
        const getState = jest.fn();
        await addUser(mockUser)(dispatch, getState, undefined);

        // Check that axios was called correctly
        expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', mockUser);

        // Check that the dispatch was called with the correct action
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: 'users/addUser/pending'
        }));
      });

      it('should handle addUser rejection', async () => {
        // Mock the axios post method to reject
        axios.post.mockRejectedValue(new Error('Network error'));

        // Call the thunk
        const dispatch = jest.fn();
        const getState = jest.fn();
        await addUser(mockUser)(dispatch, getState, undefined);

        // Check that axios was called
        expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', mockUser);

        // Check that the dispatch was called with the rejected action
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: 'users/addUser/rejected'
        }));
      });
    });
  });
});