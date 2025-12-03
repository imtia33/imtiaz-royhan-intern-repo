import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import UserProfile from './UserProfile';

// Mock axios
jest.mock('axios');

describe('UserProfile', () => {
  const mockUser = {
    id: 1,
    name: 'Leanne Graham',
    email: 'leanne@gmail.com',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading indicator initially', () => {
    const { getByTestId } = render(<UserProfile userId={1} />);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('displays user data after successful API call', async () => {
    // Mock the axios get method to resolve with mock data
    axios.get.mockResolvedValue({ data: mockUser });

    const { getByText } = render(<UserProfile userId={1} />);

    // Wait for the component to update after the API call
    await waitFor(() => {
      expect(getByText(mockUser.name)).toBeTruthy();
      expect(getByText(mockUser.email)).toBeTruthy();
      expect(getByText(mockUser.phone)).toBeTruthy();
      expect(getByText(mockUser.website)).toBeTruthy();
    });

    // Verify axios was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
  });

  it('displays error message when API call fails', async () => {
    // Mock the axios get method to reject with an error
    axios.get.mockRejectedValue(new Error('Network error'));

    const { getByText } = render(<UserProfile userId={1} />);

    // Wait for the component to update after the API call
    await waitFor(() => {
      expect(getByText('Failed to fetch user data')).toBeTruthy();
    });
  });

  it('displays no user message when userId is not provided', async () => {
    const { getByText } = render(<UserProfile userId={null} />);
    
    await waitFor(() => {
      expect(getByText('No user data available')).toBeTruthy();
    });
  });
});