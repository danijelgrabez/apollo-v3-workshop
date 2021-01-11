import { screen, renderApollo, cleanup, user, waitFor } from '../../utils/test-utils';
import { gql } from '@apollo/client';
import CountryList, { COUNTRIES } from '../CountryList';
import { cache } from '../../cache';

describe('CountryList', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  const WRONG_QUERY = gql`
    query Countries {
      countries {
        town
      }
    }
  `;

  const errorMock = [
    {
      request: WRONG_QUERY,
      error: new Error('An error occurred'),
    },
  ];

  const mocks = [
    {
      request: { query: COUNTRIES, variables: {} },
      result: {
        data: {
          countries: [
            {
              name: 'Germany',
              emoji: '🇩🇪',
              code: 'DE',
              phone: '49',
              __typename: 'Country',
            },
            {
              name: 'Serbia',
              code: 'RS',
              emoji: '🇷🇸',
              phone: '381',
              __typename: 'Country',
            },
            {
              name: 'Afghanistan',
              code: 'AF',
              emoji: '🇦🇫',
              phone: '93',
              __typename: 'Country',
            },
          ],
        },
      },
    },
  ];

  it('renders page with sorted countries (a-z)', async () => {
    const { getByTestId, getAllByTestId } = renderApollo(<CountryList path="/" />, {
      cache,
      mocks,
    });

    await waitFor(() => getByTestId('page-title'));
    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const countries = getAllByTestId(/country-item/);
    const countryIds = ['Afghanistan', 'Germany', 'Serbia'];
    countries.forEach((nameNode, index) => {
      expect(nameNode.textContent).toBe(countryIds[index]);
    });
  });

  it('sort countries (from a-z to z-a)', async () => {
    const { getByTestId, getAllByTestId } = renderApollo(<CountryList path="/" />, {
      cache,
      mocks,
    });

    await waitFor(() => getByTestId('page-title'));
    const button = getByTestId('sort');
    expect(button).toHaveTextContent('↓');
    user.click(button);
    await waitFor(() => {
      const countries = getAllByTestId(/country-item/);
      const countryIds = ['Serbia', 'Germany', 'Afghanistan'];
      countries.forEach((nameNode, index) => {
        expect(nameNode.textContent).toBe(countryIds[index]);
      });
      expect(button).toHaveTextContent('↑');
    });
  });
});
