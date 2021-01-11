import React from 'react';
import { screen, render, cleanup } from '../../utils/test-utils';
import CountryItem from '../CountryItem';

describe('CountryItem', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  const countryData = {
    name: 'Serbia',
    code: 'RS',
    emoji: '🇷🇸',
    phone: '381',
    __typename: 'Country',
  };
  it('renders without error', () => {
    render(<CountryItem countryData={countryData} />);
    const title = screen.getByText(/serbia/i);
    const titleWithFlag = screen.queryByText(/🇷🇸 serbia/i);
    const code = screen.queryByText(/country code/i);
    const phone = screen.queryByText(/phone/i);

    expect(title).toBeInTheDocument();
    expect(titleWithFlag).not.toBeInTheDocument();
    expect(code).not.toBeInTheDocument();
    expect(phone).not.toBeInTheDocument();
  });
});

describe('CountryItem – search result', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  const countryData = {
    name: 'Serbia',
    code: 'RS',
    emoji: '🇷🇸',
    phone: '381',
  };

  it('renders without error', () => {
    render(<CountryItem countryData={countryData} cardLayout />);
    const titleWithFlag = screen.getByText(/🇷🇸 serbia/i);
    const code = screen.getByText(/country code/i);
    const phone = screen.getByText(/phone/i);

    expect(titleWithFlag).toBeInTheDocument();
    expect(code).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
  });
});
