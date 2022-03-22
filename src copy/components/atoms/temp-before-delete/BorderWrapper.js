import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const BorderWrapper = styled.div`
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border: 1px solid;
  border-color: ${({ borderColor }) => borderColor || THEME.greyColors.grey4};
  border-radius: 4px 0 4px 4px;
  background: ${({ background }) => background || 'transparent'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};
`;
