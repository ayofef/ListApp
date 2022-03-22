import styled from 'styled-components';
import { Link } from 'react-router-dom';

import THEME from '../../../../constants/theme';
import { BORDER_COLOR } from '../../constant';

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;

  &:first-child {
    border-top: 1px solid ${BORDER_COLOR};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${BORDER_COLOR};
  }

  & svg {
    margin-left: auto;
    color: ${THEME.greyColors.grey1};
    font-size: 10px;
    stroke: ${THEME.greyColors.grey1};
    stroke-width: 2px;
  }

  &:hover {
    p {
      color: ${THEME.primaryColors.primary};
    }
    & svg {
      color: ${THEME.primaryColors.primary};
      stroke: ${THEME.primaryColors.primary};
    }
  }
`;

export { StyledList, StyledLink };
