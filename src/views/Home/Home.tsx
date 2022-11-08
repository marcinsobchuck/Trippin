import React from "react";
import { Redirect } from "react-router-dom";
import { Footer } from "src/components/Footer/Footer";
import { SearchResults } from "src/components/Search/components/SearchResults/SearchResults";
import { SearchDestinationSection } from "../../components/Search/components/SearchDestinationSection/SearchDestinationSection";
import { Search } from "../../components/Search/Search";

import { Routes } from "../../enums/routes.enum";
import { useAuth } from "../../hooks/useAuth";
export const Home: React.FC = () => {
  const { isFirstEntry, currentUser } = useAuth();

  return (
    <>
      <Search>
        <SearchDestinationSection />
        <SearchResults />
      </Search>
      <Footer />
      {isFirstEntry && !currentUser && <Redirect to={Routes.Entry} />}
    </>
  );
};
