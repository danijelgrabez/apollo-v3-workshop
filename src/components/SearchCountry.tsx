/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { headerStyle, inputStyles, listStyles } from './UI.style';
import CountryItem from './CountryItem';

const SEARCH_COUNTRY = gql`
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
  const [countryId, setCountryId] = useState('');
  const { data, loading, error } = useQuery(SEARCH_COUNTRY, {
    variables: { code: countryId },
    skip: countryId.length !== 2,
  });

  return (
    <>
      <header css={headerStyle}>
        <h3 style={{ marginTop: -5 }}>Search New Country</h3>
      </header>
      <input
        type="text"
        placeholder="Search by country code"
        onChange={(e) => setCountryId(e.target.value)}
        value={countryId}
        css={inputStyles}
      />
      {loading && <p>Patience...</p>}
      {error && <p>Error...</p>}
      {data && data.country === null && <p>No hits.</p>}
      {data && (
        <ul css={listStyles} onClick={() => setCountryId('')}>
          <CountryItem countryData={data.country} cardLayout />
        </ul>
      )}
    </>
  );
};

export default SearchCountry;
