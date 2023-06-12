import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { AuthenticationForm } from './AuthenticationForm';

const Wrapper: React.FC = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe('AuthenticationForm', () => {
  it('should store input value on change', async () => {
    const mockSubmit = jest.fn();
    const testPassword = 'password';
    const { getByLabelText } = render(
      <AuthenticationForm onSubmit={mockSubmit} buttonText="Login" title="Login" />,
      { wrapper: Wrapper },
    );
    const passwordInput = getByLabelText(/password/i) as HTMLInputElement;

    await userEvent.type(passwordInput, testPassword);

    expect(passwordInput.value).toBe(testPassword);
  });

  it('should call submit function with values from inputs', async () => {
    const mockSubmit = jest.fn();
    const testPassword = 'password';
    const testEmail = 'email@gmail.com';

    const { getByLabelText, getByRole } = render(
      <AuthenticationForm onSubmit={mockSubmit} buttonText="Login" title="Login" />,
      { wrapper: Wrapper },
    );
    const emailInput = getByLabelText(/e-mail/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByRole('button', {
      name: /login/i,
    });

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, testPassword);

    await userEvent.click(submitButton);

    await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith(testEmail, testPassword));
  });

  it('should render password confirmation input for register form', () => {
    const mockSubmit = jest.fn();
    const { getByLabelText } = render(
      <AuthenticationForm onSubmit={mockSubmit} buttonText="Register" title="Register" isRegisterForm />,
      { wrapper: Wrapper },
    );
    const passwordConfirmationInput = getByLabelText(/password confirmation/i);

    expect(passwordConfirmationInput).toBeInTheDocument();
  });

  it('should render error if submit fails', async () => {
    const testPassword = 'password';
    const testEmail = 'email@gmail.com';

    const mockSubmit = jest.fn().mockRejectedValueOnce(new Error('Async error message'));

    const { getByText, getByLabelText, getByRole } = render(
      <AuthenticationForm onSubmit={mockSubmit} buttonText="Login" title="Login" />,
      { wrapper: Wrapper },
    );
    const emailInput = getByLabelText(/e-mail/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByRole('button', {
      name: /login/i,
    });

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, testPassword);

    await userEvent.click(submitButton);

    const error = getByText(/user not found/i);

    await waitFor(() => expect(error).toBeInTheDocument());
  });
});
