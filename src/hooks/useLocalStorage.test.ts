import { act, renderHook } from '@testing-library/react-hooks';

import { useLocalStorage } from './useLocalStorage';

beforeEach(() => {
  window.localStorage.clear();
});

describe('useLocalStorage', () => {
  it('should update initial value with new value and save it to localStorage', () => {
    const testKey = 'testKey';
    const initialValue = { id: 1, message: 'testMessage' };
    const newValue = { id: 2, message: 'testNewValue' };

    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));

    expect(result.current[0]).toEqual(initialValue);
    expect(localStorage.getItem(testKey)).toEqual(JSON.stringify(initialValue));

    act(() => result.current[1](newValue));

    expect(result.current[0]).toEqual(newValue);
    expect(localStorage.getItem(testKey)).toEqual(JSON.stringify(newValue));
  });
});
