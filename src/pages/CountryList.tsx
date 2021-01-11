/** @jsxImportSource @emotion/react */
import { useQuery, gql } from '@apollo/client';
import CountryItem from '../components/CountryItem';
import { CountryData, RouteProps } from '../types';
import { sortOrder } from '../cache';
import { headerStyle, buttonStyle, listStyles } from '../components/UI.style';

export const COUNTRIES = gql`
  query Countries {
    countries {
      name
      code
      emoji
      phone
    }

    sortedCountries @client {
      name
      code
      emoji
      phone
    }
  }
`;

const CountryList: React.FC<RouteProps> = () => {
  const { loading, error, data } = useQuery(COUNTRIES);

  const handleSort = () => {
    const direction = sortOrder();
    if (direction === 'ASC') {
      sortOrder('DESC');
    } else {
      sortOrder('ASC');
    }
  };

  if (loading && !data) return <h1 data-testid="loading">Loading countries...</h1>;
  if (error) return <h1 data-testid="error">Error :(</h1>;

  const { /*countries, */ sortedCountries } = data;

  return (
    <>
      <header css={headerStyle}>
        <h1 data-testid="page-title">Countries</h1>
        <button onClick={handleSort} css={buttonStyle} data-testid="sort">
          Sort {sortOrder() === 'ASC' ? '↓' : '↑'}
        </button>
      </header>
      {/* Note: Instead of retrieved list of countries, we are showing sorted ones defined in local state */}
      {/* {countries.map((item: CountryData) => (
        <CountryItem countryData={item} key={item.code} />
      ))} */}
      <ul css={listStyles}>
        {sortedCountries.map((item: CountryData) => (
          <CountryItem countryData={item} key={item.code} />
        ))}
      </ul>
    </>
  );
};

export default CountryList;
