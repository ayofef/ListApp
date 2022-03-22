import styled from 'styled-components';
import THEME from '../../../../constants/theme';

export const StyledIcon = styled.div`
  & svg {
    margin-left: 6px;
    color: ${THEME.primaryColors.primary};
    font-size: 12px;
    stroke: ${THEME.primaryColors.primary};
    stroke-width: 2px;
    transform: translateY(2px);
  }
`;
