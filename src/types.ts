import { RouteComponentProps } from '@reach/router';

export interface RouteProps extends RouteComponentProps {
  path: string;
  countryId?: string;
}

export type CountryData = {
  name: string;
  code: string;
  emoji: string;
  phone: string;
};

export interface Theme {
  primary: string;
  link: string;
  dark: string;
  gray: string;
  paper: string;
  background: string;
  border: string;
}
