/** @jsxImportSource @emotion/react */
import { sectionStyles } from './UI.style';

const Section: React.FC = ({ children }: { children?: any }) => (
  <section css={sectionStyles}>{children}</section>
);

export default Section;
