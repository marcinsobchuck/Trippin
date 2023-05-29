/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { AuthenticationForm } from './AuthenticationForm';

jest.mock('src/firebase', () => ({
  getAuth: () => jest.fn(),
}));

const Wrapper: React.FC = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe('AuthenticationForm', () => {
  it('should store input value on change', async () => {
    const mockSubmit = jest.fn();
    const testPassword = 'password';
    const { getByTestId } = render(
      <AuthenticationForm onSubmit={mockSubmit} buttonText="Login" title="Login" />,
      { wrapper: Wrapper },
    );
    const passwordInput = getByTestId('test-password') as HTMLInputElement;

    await userEvent.type(passwordInput, testPassword);

    expect(passwordInput.value).toBe(testPassword);
  });

  it('should call submit function with values from inputs', async () => {
    const mockSubmit = jest.fn();
    const testPassword = 'password';
    const testEmail = 'email@gmail.com';

    const { getByTestId } = render(
      <AuthenticationForm onSubmit={mockSubmit} buttonText="Login" title="Login" />,
      { wrapper: Wrapper },
    );
    const emailInput = getByTestId('test-email');
    const passwordInput = getByTestId('test-password');
    const submitButton = getByTestId('test-submitButton');

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, testPassword);

    await userEvent.click(submitButton);

    await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith(testEmail, testPassword));
  });

  it('should render password confirmation input for register form', () => {
    const mockSubmit = jest.fn();
    const { getByTestId } = render(
      <AuthenticationForm onSubmit={mockSubmit} buttonText="Register" title="Register" isRegisterForm />,
      { wrapper: Wrapper },
    );
    const passwordConfirmationInput = getByTestId('test-passwordConfirmation');

    expect(passwordConfirmationInput).toBeInTheDocument();
  });

  it('should render error if submit fails', async () => {
    const testPassword = 'password';
    const testEmail = 'email@gmail.com';

    const mockSubmit = jest.fn().mockRejectedValueOnce(new Error('Async error message'));

    const { getByTestId } = render(
      <AuthenticationForm onSubmit={mockSubmit} buttonText="Login" title="Login" />,
      { wrapper: Wrapper },
    );
    const emailInput = getByTestId('test-email');
    const passwordInput = getByTestId('test-password');
    const submitButton = getByTestId('test-submitButton');

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, testPassword);

    await userEvent.click(submitButton);

    const error = getByTestId('test-error');

    await waitFor(() => expect(error).toBeInTheDocument());
  });
});
