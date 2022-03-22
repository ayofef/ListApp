import styled from 'styled-components';
import { Link } from 'react-router-dom';
import THEME from '../../constants/theme';

export const StyledLink = styled(Link)`
  margin-left: 6px;
  color: ${THEME.primaryColors.primary};
`;

export const DividerLine = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin-bottom: 20px;
  background: ${THEME.greyColors.grey5};
`;

export const Logo = styled.img`
  position: relative;
`;
