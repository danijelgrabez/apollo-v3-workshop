/** @jsxImportSource @emotion/react */
import { Link } from '@reach/router';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { RouteProps } from '../types';
import SearchCountry from '../components/SearchCountry';
import { backButtonStyles, separatorStyles } from '../components/UI.style';

/*
 * Note: name and emoji is queried for scenarios when country page is opened
 * directly without previously cached data from country list page.
 */
const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      nameWithEmoji @client
      name
      emoji
      code
      phone
    }
  }
`;

const Country: React.FC<RouteProps> = ({ countryId }) => {
  const { data, loading, error } = useQuery(COUNTRY, { variables: { code: countryId } });

  if (loading) return <h1>Loading data</h1>;
  if (error) return <h1>Error :-(</h1>;

  const {
    country: { nameWithEmoji, code, phone },
  } = data;

  return (
    <>
      <Link to="/" css={backButtonStyles}>
        ← Back
      </Link>
      <h1>{nameWithEmoji}</h1>
      <p>
        <strong>Country Code:</strong> {code}
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <hr css={separatorStyles} />
      <SearchCountry />
    </>
  );
};

export default Country;
