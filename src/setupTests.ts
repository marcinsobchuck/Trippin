import '@testing-library/jest-dom';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
