import React from 'react';
import { cache } from '../../cache';
import { screen, renderApollo, cleanup, user, waitFor } from '../../utils/test-utils';
import SearchCountry, { SEARCH_COUNTRY } from '../SearchCountry';

describe('SearchCountry', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  const mocks = [
    {
      request: { query: SEARCH_COUNTRY, variables: { code: 'DE' } },
      result: {
        data: {
          country: {
            name: 'Germany',
            emoji: '🇩🇪',
            code: 'DE',
            phone: '49',
            __typename: 'Country',
          },
        },
      },
    },
  ];

  it('initial render', () => {
    renderApollo(<SearchCountry />);
    const title = screen.getByText(/search new country/i);
    const input = screen.getByTestId(/search/i);
    const countryResult = screen.queryByTestId(/de/i);

    expect(title).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(countryResult).not.toBeInTheDocument();
  });

  it('loading state after typing', () => {
    renderApollo(<SearchCountry />);

    const input = screen.getByTestId(/search/i);
    user.type(input, 'DE');
    const loading = screen.getByTestId(/loading/i);

    expect(loading).toBeInTheDocument();
  });

  it('succcess search', async () => {
    const { getByTestId } = renderApollo(<SearchCountry />, { cache, mocks });
    const input = screen.getByTestId(/search/i);

    // Type country code
    user.type(input, 'DE');
    // Wait for response
    await waitFor(() => getByTestId(/result-list/i));

    // Now, check existence of response
    const listResult = getByTestId(/result-list/i);
    const countryResult = getByTestId(/country-item-de/i);

    expect(listResult).toBeInTheDocument();
    expect(countryResult).toBeInTheDocument();
  });

  it('no hits', async () => {
    const { getByTestId } = renderApollo(<SearchCountry />, { cache, mocks });
    const input = screen.getByTestId(/search/i);

    // Type country code
    user.type(input, 'DX');
    // Wait for response
    const noResults = await waitFor(() => getByTestId(/no-results/i));

    expect(noResults).toBeInTheDocument();
  });
});
