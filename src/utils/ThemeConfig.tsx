/** @jsxImportSource @emotion/react */
import { css, Global, ThemeProvider } from '@emotion/react';
import { setTheme } from '../cache';
import { useQuery, gql } from '@apollo/client';
import { Theme } from '../types';
import { themeButtonStyles } from '../components/UI.style';
import { ReactNode } from 'react';

const LIGHT = {
  primary: 'hotpink',
  link: '#fafa',
  dark: '#434343',
  gray: '#999',
  paper: '#fff',
  background: '#fafafc',
  border: '#f0f0f0',
};

const DARK = {
  primary: 'hotpink',
  link: '#fafa',
  dark: '#fff',
  gray: '#999',
  paper: '#434343',
  background: '#111',
  border: '#999',
};

const CURRENT_THEME = gql`
  query CurrentTheme {
    currentTheme @client
  }
`;

const ThemeConfig: React.FC = ({ children }: { children?: ReactNode }) => {
  const {
    data: { currentTheme },
  } = useQuery(CURRENT_THEME);

  const theme: Theme = currentTheme === 'LIGHT' ? LIGHT : DARK;

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          body {
            transition: 0.1s all ease-in-out;
            margin: 0;
            color: ${theme.dark};
            background: ${theme.background};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
              sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
          }
        `}
      />
      <button
        css={themeButtonStyles}
        onClick={() => {
          if (currentTheme === 'LIGHT') {
            setTheme('DARK');
            localStorage.setItem('theme', 'DARK');
          } else {
            setTheme('LIGHT');
            localStorage.setItem('theme', 'LIGHT');
          }
        }}
      >
        {currentTheme === 'LIGHT' ? `☀` : `☾`}
      </button>
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
