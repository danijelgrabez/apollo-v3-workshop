import { InMemoryCache, makeVar } from '@apollo/client';

// Note: sorting with reactive variables
export const sortOrder = makeVar('ASC');

export const setTheme = makeVar(localStorage.getItem('theme') || 'LIGHT');

export const cache = new InMemoryCache({
  typePolicies: {
    Country: {
      /**
       * ** Good to Know:
       * `keyFields` is useful when the type does not have unique identifier (like ID).
       * This help us normalize the cache. If we remove keyFields from the config,
       * we would only have ROOT_QUERY in our cache.
       */
      keyFields: ['code'],
      fields: {
        // Note: custom cache entry, non retrievable from the server (check @client notation in gql query on Country.tsx)
        nameWithEmoji: {
          read: (_, { readField }) => {
            const name = readField('name');
            const emoji = readField('emoji');

            return `${emoji} ${name}`;
          },
        },
      },
    },
    Query: {
      fields: {
        country: {
          read: (existing, { toReference, args }) => {
            // Note: toReference enables us to **retrieve the cached country** instead of fetching it again
            // Note: On individual country page we would have to call COUNTRY query, even though we already have the data retrieved via ROOT_QUERY.
            const countryRef = toReference({ __typename: 'Country', code: args?.code });

            return existing ?? countryRef;
          },
        },
        // Note: shorthand for `read()` method is to automatically pass arrow function on field
        sortedCountries: (_, { readField }) => {
          const direction = sortOrder();
          const getCountries = readField('countries');
          const countries = Array.isArray(getCountries) ? [...getCountries] : [];
          const sorted = countries.sort((a, b) => {
            // @ts-ignore
            const aName: string = readField('name', a);
            // @ts-ignore
            const bName: string = readField('name', b);
            if (direction === 'ASC') {
              return aName.localeCompare(bName);
            } else {
              return bName.localeCompare(aName);
            }
          });

          return sorted;
        },
        currentTheme: () => setTheme(),
      },
    },
  },
});
