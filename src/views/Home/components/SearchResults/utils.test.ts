import { formatDate, formatTime, getDateDifference } from './utils';

describe('SearchResults utils', () => {
  it('should properly format time', () => {
    expect(formatTime(1683986092)).toBe('13:54');
  });

  it('should properly format date', () => {
    expect(formatDate(1683986092)).toBe('13.05.23');
  });

  it('should properly get date difference', () => {
    expect(getDateDifference(1683986092, 1683986190)).toBe('0h  1min');
  });
});
