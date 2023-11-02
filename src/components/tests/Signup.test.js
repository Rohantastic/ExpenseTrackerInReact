import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/Signup';

test('renders signup form', () => {
  render(<LoginPage />);
  
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const signupButton = screen.getByText('Signup');
  const loginLink = screen.getByText('Already have an account?');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
});

test('handles signup', async () => {
  render(<LoginPage />);
  
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const signupButton = screen.getByText('Signup');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
  });

  fireEvent.click(signupButton);

  await screen.findByText('User has been created !!');

  expect(fetch).toHaveBeenCalledTimes(1);

  
  expect(global.navigateToLogin).toHaveBeenCalled();
});
