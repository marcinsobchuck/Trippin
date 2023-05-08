import React from 'react';

import { Redirect } from 'react-router-dom';

import { Footer } from 'src/components/Footer/Footer';

import { Routes } from '../../enums/routes.enum';
import { useAuth } from '../../hooks/useAuth';

import { SearchDestinationSection } from './components/SearchDestinationSection/SearchDestinationSection';
import { SearchResults } from './components/SearchResults/SearchResults';
import { SearchProvider } from './context/search.context';

export const Home: React.FC = () => {
  const { isFirstEntry, currentUser } = useAuth();

  return (
    <>
      <SearchProvider>
        <SearchDestinationSection />
        <SearchResults />
      </SearchProvider>

      <Footer />

      {isFirstEntry && !currentUser && <Redirect to={Routes.Entry} />}
    </>
  );
};
