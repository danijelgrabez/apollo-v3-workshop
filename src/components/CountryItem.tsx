/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { Link } from '@reach/router';
import { ReactNode } from 'react';
import { CountryData } from '../types';
import { listItemMetaStyles, listItemStyles } from './UI.style';

interface ListItemProps {
  children?: ReactNode;
  dataTestId: string;
  cardLayout?: boolean;
}
const ListItem: React.FC<ListItemProps> = ({ children, dataTestId, cardLayout = false }) => {
  const theme = useTheme();

  return (
    <li css={listItemStyles({ theme, cardLayout })} data-testid={dataTestId}>
      {children}
    </li>
  );
};

const CountryItem = ({
  countryData,
  cardLayout = false,
}: {
  countryData: CountryData;
  cardLayout?: boolean;
}) => {
  return (
    <ListItem cardLayout={cardLayout} dataTestId={`country-item-${countryData.code}`}>
      <Link to={`/countries/${countryData.code}`}>
        {cardLayout ? `${countryData.emoji} ${countryData.name}` : countryData.name}
        {cardLayout && (
          <>
            <span css={listItemMetaStyles}>Country Code: {countryData.code}</span>
            <span css={listItemMetaStyles}>Phone: {countryData.phone}</span>
          </>
        )}
      </Link>
    </ListItem>
  );
};

export default CountryItem;
