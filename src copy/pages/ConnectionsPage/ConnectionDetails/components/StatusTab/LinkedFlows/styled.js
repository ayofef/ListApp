import styled from 'styled-components';
import { Link } from 'react-router-dom';
import THEME from '../../../../../../constants/theme';

export const StyledFlowIdItem = styled(Link)`
  background-color: ${THEME.primaryColors.primaryLight};
  border-radius: 8px;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  & p {
    transition: all 0.3s ease-out;
  }

  &:hover {
    p {
      color: ${THEME.secondaryColors.secondary};
    }
    & svg {
      stroke: ${THEME.secondaryColors.secondary};
    }
  }

  & svg {
    font-size: 14px;
    stroke-width: 2px;
    stroke: ${THEME.primaryColors.primary};
  }
`;
