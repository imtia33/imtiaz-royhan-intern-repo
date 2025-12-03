import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CounterComponent from './CounterComponent';

describe('CounterComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CounterComponent />);
    
    expect(getByText('Counter Component')).toBeTruthy();
    expect(getByText('0')).toBeTruthy();
    expect(getByText('Increment')).toBeTruthy();
    expect(getByText('Decrement')).toBeTruthy();
  });

  it('increments the count when increment button is pressed', () => {
    const { getByText, getByTestId } = render(<CounterComponent />);
    const incrementButton = getByTestId('increment-button');
    
    fireEvent.press(incrementButton);
    
    expect(getByText('1')).toBeTruthy();
  });

  it('decrements the count when decrement button is pressed', () => {
    const { getByText, getByTestId } = render(<CounterComponent />);
    const decrementButton = getByTestId('decrement-button');
    
    fireEvent.press(decrementButton);
    
    expect(getByText('-1')).toBeTruthy();
  });

  it('handles multiple button presses correctly', () => {
    const { getByText, getByTestId } = render(<CounterComponent />);
    const incrementButton = getByTestId('increment-button');
    const decrementButton = getByTestId('decrement-button');
    
    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    fireEvent.press(decrementButton);
    
    expect(getByText('1')).toBeTruthy();
  });
});