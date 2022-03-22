import styled from 'styled-components';
import { Link } from 'react-router-dom';
import THEME from '../../constants/theme';

export const StyledLink = styled(Link)`
  margin-left: 6px;
  color: ${THEME.secondaryColors.blue};
`;

export const ContentBlock = styled.div`
  /* max-width: 328px; */
`;

export const Logo = styled.img`
  position: relative;
`;
