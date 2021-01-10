# Apollo v3 Workshop

This project is scaffolded with CRA Typescript.

## Observe Scenarios

Open Network panel in broser’s inspector mode for the following scenarios:

1. Country List page

- Open this page by navigating to root url
- Click on one of the listed country
- Return to previous page
- Outcome → 1 network request
- Continue with testing:
  - Search via input component by country code (e.g. `TV`)
  - Outcome → no new network request will be made since we normalized the cache and made reference to Country query field

2. Country page

- Open country page (e.g. http://localhost:3000/countries/ee)
- Search via input component by country code (e.g. `TV`)
- Outcome → 2 network request (`COUNTRY` query)
- Continue with testing:
  - Click back button which will redirect you to the country list page
  - Outcome → anoter network request will be triggered (`COUNTRIES` query)

Other scenarios (local cache):

- Theme switcher and persistence on page refresh
- `nameWithEmoji` response on Country page
- `sortedCountries` response on CountryList page

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
