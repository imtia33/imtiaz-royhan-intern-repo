import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a new user
export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users pending
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fetch users fulfilled
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      // Fetch users rejected
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      })
      // Add user pending
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Add user fulfilled
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      // Add user rejected
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add user';
      });
  },
});

export const { clearError, removeUser } = userSlice.actions;
export default userSlice.reducer;