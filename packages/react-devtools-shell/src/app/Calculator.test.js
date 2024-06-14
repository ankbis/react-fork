import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  test('displays digits when clicked', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('8'));
    expect(getByText('Display').textContent).toBe('78');
  });

  test('performs addition correctly', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    expect(getByText('Display').textContent).toBe('8');
  });

  test('handles division by zero', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('8'));
    fireEvent.click(getByText('÷'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('='));
    expect(getByText('Display').textContent).toBe('Error');
  });

  test('clears display after operation', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('*'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    fireEvent.click(getByText('4'));
    expect(getByText('Display').textContent).toBe('4');
  });

  test('performs multiplication correctly', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('4'));
    fireEvent.click(getByText('×'));
    fireEvent.click(getByText('6'));
    fireEvent.click(getByText('='));
    expect(getByText('Display').textContent).toBe('24');
  });

  test('handles negative numbers', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('-'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    expect(getByText('Display').textContent).toBe('2');
  });
});
