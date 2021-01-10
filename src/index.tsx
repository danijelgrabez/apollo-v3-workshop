/** @jsxImportSource @emotion/react */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { Router } from '@reach/router';
import reportWebVitals from './reportWebVitals';
import { cache } from './cache';
import Country from './pages/Country';
import NotFound from './pages/NotFound';
import CountryList from './pages/CountryList';
import Section from './components/Section';
import ThemeConfig from './utils/ThemeConfig';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache,
});

// TODO: Bring back <React.StrictMode> wrapper
// Note: When brought back, issue with sorting occurs on first mount (fixes after navigating through pages) and memory leak is indicated (repeated render)
ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeConfig>
      <Section>
        <Router>
          <CountryList path="/" />
          <Country path="/countries/:countryId" />
          <NotFound default />
        </Router>
      </Section>
    </ThemeConfig>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
