import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OptimizedList from './OptimizedList';

describe('OptimizedList', () => {
  it('renders correctly with initial data', () => {
    const { getByText, getAllByText } = render(<OptimizedList />);
    
    // Check that the component renders
    expect(getByText('Total Users: 3')).toBeTruthy();
    expect(getByText('Filtered Users: 3')).toBeTruthy();
    
    // Check that all initial users are rendered
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
    expect(getByText('Bob Johnson')).toBeTruthy();
  });

  it('filters users based on search term', () => {
    const { getByPlaceholderText, getByText } = render(<OptimizedList />);
    
    // Get the search input
    const searchInput = getByPlaceholderText('Search users...');
    
    // Type in the search box
    fireEvent.changeText(searchInput, 'Jane');
    
    // Check that the filtered count updates
    expect(getByText('Filtered Users: 1')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
    
    // Ensure other users are not shown
    expect(() => getByText('John Doe')).toThrow();
    expect(() => getByText('Bob Johnson')).toThrow();
  });

  it('adds a new user', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<OptimizedList />);
    
    // Get the input fields
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const addButton = getByRole('button', { name: 'Add User' });
    
    // Fill in the form
    fireEvent.changeText(nameInput, 'Alice Cooper');
    fireEvent.changeText(emailInput, 'alice@example.com');
    
    // Click the add button
    fireEvent.press(addButton);
    
    // Check that the user count increased
    expect(getByText('Total Users: 4')).toBeTruthy();
    expect(getByText('Filtered Users: 4')).toBeTruthy();
    
    // Check that the new user is displayed
    expect(getByText('Alice Cooper')).toBeTruthy();
    expect(getByText('alice@example.com')).toBeTruthy();
  });

  it('removes a user', () => {
    const { getByRole, getByText } = render(<OptimizedList />);
    
    // Get the remove button for the first user
    const removeButtons = getByRole('button', { name: 'Remove' });
    
    // Click the remove button
    fireEvent.press(removeButtons);
    
    // Check that the user count decreased
    expect(getByText('Total Users: 2')).toBeTruthy();
    expect(getByText('Filtered Users: 2')).toBeTruthy();
    
    // Check that the user is no longer displayed
    expect(() => getByText('John Doe')).toThrow();
  });
});