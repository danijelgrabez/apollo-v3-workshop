import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// this adds user events
import user from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { createHistory, createMemorySource, LocationProvider, Router } from '@reach/router';

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  addTypename?: any;
  defaultOptions?: any;
  cache?: any;
  resolvers?: any;
  [st: string]: any;
};

const renderApollo = (
  node: any,
  { mocks, addTypename, defaultOptions, cache, resolvers, ...options }: RenderApolloOptions = {}
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
      resolvers={resolvers}
    >
      {node}
    </MockedProvider>,
    options
  );
};

const renderWithRouterWrapper = (
  ui: ReactNode,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) => {
  return {
    ...render(
      <LocationProvider history={history}>
        <Router>{ui}</Router>
      </LocationProvider>
    ),
    history,
  };
};

const renderWithRouter = (
  ui: ReactNode,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) => {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};

export * from '@testing-library/react';
export { renderApollo, user, renderWithRouterWrapper, renderWithRouter };
