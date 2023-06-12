import { act, renderHook } from '@testing-library/react-hooks';
import firebaseAuth from 'firebase/auth';

import { testFavouriteFlight } from 'src/fixtures/common/common';

import { useFavourites } from './useFavourites';

const firebaseAuthMocked = firebaseAuth.getAuth as jest.Mocked<any>;

firebaseAuthMocked.mockReturnValueOnce({
  currentUser: { email: 'example@gmail.com', uid: 1, emailVerified: true },
});

describe('useFavourites', () => {
  it('should delete item from array', async () => {
    const mockedData = [testFavouriteFlight];

    const { result } = renderHook(() => useFavourites(firebaseAuthMocked.currentUser, mockedData));

    act(() => {
      result.current.deleteFavouriteTrip('2');
    });

    expect(result.current.data).toEqual([]);
  });
});
