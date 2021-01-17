/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { headerStyle, inputStyles, listStyles } from './UI.style';
import CountryItem from './CountryItem';

export const SEARCH_COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      emoji
      code
      phone
    }
  }
`;

const SearchCountry: React.FC = () => {
  // const location = useLocation(); // note: useLocation() is buggy for testing at the moment
  const [countryId, setCountryId] = useState('');
  // useEffect(() => {
  //   setCountryId('');
  // }, [location]);
  const { data, loading, error } = useQuery(SEARCH_COUNTRY, {
    variables: { code: countryId },
    skip: countryId.length !== 2,
  });
  const noHits = !loading && typeof data === 'undefined' && countryId.length === 2;

  return (
    <>
      <header css={headerStyle}>
        <h3 style={{ marginTop: -5 }}>Search New Country</h3>
      </header>
      <input
        data-testid="search"
        type="text"
        placeholder="Search by country code"
        onChange={(e) => setCountryId(e.target.value)}
        value={countryId}
        css={inputStyles}
      />
      {loading && <p data-testid="loading">Patience...</p>}
      {error && <p data-testid="error">Error...</p>}
      {noHits && <p data-testid="no-results">No hits.</p>}
      {data && (
        <ul css={listStyles} data-testid="result-list" onClick={() => setCountryId('')}>
          <CountryItem countryData={data.country} cardLayout />
        </ul>
      )}
    </>
  );
};

export default SearchCountry;
