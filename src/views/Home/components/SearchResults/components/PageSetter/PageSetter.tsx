import React from 'react';

import arrow from 'src/assets/images/arrow.svg';

import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';
import { setPage } from 'src/views/Home/reducer/actions/search.actions';

import { IconWrapper, LeftArrow, PageNumber, RightArrow, Wrapper } from './PageSetter.styled';
import { PageSetterProps } from './PageSetter.types';

interface GetVisisblePagesArrayParams {
  page: number;
  maxPages: number;
}

export const PageSetter: React.FC<PageSetterProps> = ({ maxPages }) => {
  const [{ page }, dispatch] = useSearchContext();

  const getVisiblePagesArray = ({ page, maxPages }: GetVisisblePagesArrayParams) => {
    if (maxPages <= 5) {
      return Array.from({ length: maxPages }, (_: null, i: number) => i + 1);
    }
    if (page < 4) {
      return Array.from({ length: 3 }, (_, i) => i + 2);
    }
    if (maxPages - 2 <= page) {
      return Array.from({ length: 3 }, (_: null, i: number) => maxPages - 3 + i);
    }
    return Array.from({ length: 3 }, (_: null, i: number) => i + page - 1);
  };

  const pageNumbers = getVisiblePagesArray({ page, maxPages });

  const decrementPage = () => {
    if (page === 1) return;
    setPage(dispatch, page - 1);
  };

  const incrementPage = () => {
    if (page === maxPages) return;
    setPage(dispatch, page + 1);
  };

  return (
    <Wrapper>
      {page !== 1 && (
        <IconWrapper to="search-results" smooth>
          <LeftArrow src={arrow} onClick={decrementPage} />
        </IconWrapper>
      )}

      {maxPages > 5 && (
        <PageNumber
          id="1"
          to="search-results"
          smooth
          $isActive={page === 1}
          onClick={() => setPage(dispatch, 1)}
        >
          1
        </PageNumber>
      )}
      {pageNumbers[0] > 2 && maxPages > 5 && <div>...</div>}
      {pageNumbers.map((number) => (
        <PageNumber
          key={number}
          to="search-results"
          smooth
          $isActive={page === number}
          onClick={() => setPage(dispatch, number)}
        >
          {number}
        </PageNumber>
      ))}
      {pageNumbers[2] < maxPages - 1 && maxPages > 5 && <div>...</div>}

      {maxPages > 5 && (
        <PageNumber
          to="search-results"
          smooth
          $isActive={maxPages === page}
          onClick={() => setPage(dispatch, maxPages)}
        >
          {maxPages}
        </PageNumber>
      )}

      {page !== maxPages && (
        <IconWrapper to="search-results" smooth>
          <RightArrow src={arrow} onClick={incrementPage} />
        </IconWrapper>
      )}
    </Wrapper>
  );
};
