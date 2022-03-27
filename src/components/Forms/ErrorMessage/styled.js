import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const StyledErrorMessage = styled.p`
  font-size: 12px !important;
  font-weight: 500;
  line-height: 16px !important;
  color: ${THEME.secondaryColors.error};
  margin: ${({ $margin }) => $margin};
`;
