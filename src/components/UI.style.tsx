/** @jsxRuntime classic */
/** @jsx jsx */
import { css } from '@emotion/react';
// import { Theme } from '../types';

export const themeButtonStyles = (theme?: any) => css`
  outline: none;
  background: ${theme.link};
  align-self: center;
  border: 0;
  border-radius: 3px;
  width: 32px;
  height: 32px;
  font-size: 1rem;
  cursor: pointer;
  position: fixed;
  top: 15px;
  left: 15px;
  &:focus {
    transform: translateY(0);
  }
  &:active {
    transform: translateY(2px);
  }
`;

export const sectionStyles = (theme?: any) => css`
  max-width: 600px;
  margin: 100px auto 0;
  background: ${theme.paper};
  border-radius: 15px 15px 0 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  padding: 15px 30px;
  min-height: calc(100vh - 100px);
`;

export const backButtonStyles = (theme?: any) => css`
  display: inline-block;
  margin-top: 15;
  text-decoration: none;
  color: ${theme.primary};
  font-weight: bold;
  &:focus {
    transform: translateX(-2px);
  }
`;

export const headerStyle = css`
  color: hotpink;
  display: flex;
  justify-content: space-between;
`;

export const buttonStyle = (theme?: any) => css`
  outline: none;
  background: ${theme.link};
  align-self: center;
  border: 0;
  border-radius: 3px;
  padding: 4px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  &:focus {
    transform: translateY(0);
  }
  &:active {
    transform: translateY(2px);
  }
`;

export const listStyles = css`
  padding: 0;
  margin: 0;
`;

export const listItemStyles = ({ theme, cardLayout }: { theme?: any; cardLayout: boolean }) =>
  css`
    margin-top: ${cardLayout ? '15px' : 0};
    list-style-type: none;
    font-size: 1.2rem;
    line-height: 2;
    border-radius: 3px;
    transition: 0.1s all ease-in-out;
    &:hover {
      background: ${theme.link};
    }

    a {
      display: block;
      text-decoration: none;
      color: ${theme.dark};
      padding: 0 5px;
      &:focus {
        font-weight: bold;
      }
    }
  `;

export const listItemMetaStyles = (theme?: any) => css`
  background: ${theme.gray};
  color: ${theme.paper};
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-radius: 3px;
  padding: 2px 4px;
  font-size: 0.6rem;
  line-height: 1;
  margin-left: 5px;
`;

export const separatorStyles = (theme?: any) => css`
  margin: 30px 0;
  border: none;
  border-top: 2px solid ${theme.border};
`;

export const inputStyles = (theme?: any) => {
  return css`
    font-size: 1rem;
    width: 100%;
    max-width: 100%;
    display: block;
    border: 2px solid ${theme.gray};
    background: ${theme.paper};
    border-radius: 4px;
    padding: 10px;
    color: ${theme.dark};
    &:focus {
      outline: none;
      border-color: hotpink;
    }
  `;
};
