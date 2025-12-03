import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import ApiDemo from './ApiDemo';
import * as apiService from '@/services/apiService';

// Mock the API service
jest.mock('@/services/apiService');

describe('ApiDemo', () => {
  const mockUsers = [
    { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
    { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock the fetchUsers function to return a promise that resolves after a delay
    (apiService.fetchUsers as jest.Mock).mockReturnValue(new Promise(() => {}));
    
    render(<ApiDemo />);
    
    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders users after successful API call', async () => {
    // Mock the fetchUsers function to return mock data
    (apiService.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    
    render(<ApiDemo />);
    
    // Wait for the component to update after the API call
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeTruthy();
      expect(screen.getByText('Ervin Howell')).toBeTruthy();
    });
  });

  it('renders error message when API call fails', async () => {
    // Mock the fetchUsers function to reject with an error
    (apiService.fetchUsers as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    render(<ApiDemo />);
    
    // Wait for the component to update after the API call
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch users')).toBeTruthy();
    });
  });
});