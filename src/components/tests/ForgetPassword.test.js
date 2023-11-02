import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';

test('renders forget password form', () => {
  render(<ForgetPasswordPage />);
  
  const emailInput = screen.getByLabelText('Email:');
  const submitButton = screen.getByText('Submit');

  expect(emailInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('handles password reset request', async () => {
  render(<ForgetPasswordPage />);
  
  const emailInput = screen.getByLabelText('Email:');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

  
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
  });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

test('displays loading message while processing', async () => {
  render(<ForgetPasswordPage />);
  
  const emailInput = screen.getByLabelText('Email:');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' });

  
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
  });

  fireEvent.click(submitButton);

  const loadingMessage = await screen.findByText('Loading...');
  
  expect(loadingMessage).toBeInTheDocument();
});

test('handles error during password reset', async () => {
  render(<ForgetPasswordPage />);
  
  const emailInput = screen.getByLabelText('Email:');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' });

  
  global.fetch = jest.fn().mockRejectedValue(new Error('Password reset error'));

  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText('Error sending password reset email:');
  
  expect(errorMessage).toBeInTheDocument();
});
