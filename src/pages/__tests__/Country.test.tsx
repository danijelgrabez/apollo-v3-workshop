import { screen, renderApollo, cleanup, waitFor, user } from '../../utils/test-utils';
import Country, { COUNTRY } from '../Country';
import { cache } from '../../cache';

describe('CountryList', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  const mocks = [
    {
      request: { query: COUNTRY, variables: { code: 'DE' } },
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

  it('renders page after loading state', async () => {
    const { getByTestId } = renderApollo(<Country path="/countries/DE" countryId="DE" />, {
      cache,
      mocks,
    });

    const loading = screen.getByTestId(/loading/i);
    expect(loading).toBeInTheDocument();

    await waitFor(() => getByTestId('country-DE'));
    const title = getByTestId('country-DE');
    expect(title).toBeInTheDocument();

    const backButton = getByTestId('back');
    user.click(backButton);
  });
});
