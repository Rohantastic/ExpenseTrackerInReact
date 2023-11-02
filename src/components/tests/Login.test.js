import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from "../pages/Login";

test('renders login form', () => {
  render(<LoginPage />);
  
  
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const loginButton = screen.getByText('Login');
  const forgotPasswordLink = screen.getByText('Forgot Password?');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(forgotPasswordLink).toBeInTheDocument();
});

test('handles login', () => {
  render(<LoginPage />);
  
  
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const loginButton = screen.getByText('Login');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(loginButton);

  
});
