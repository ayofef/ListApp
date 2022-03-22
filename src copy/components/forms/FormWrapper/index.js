import styled from 'styled-components';
import THEME from '../../../constants/theme';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

export const FormWrapper = styled(FlexContainer)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: ${({ spaceBetween }) => (spaceBetween ? 'space-between' : 'flex-start')};
  padding: ${({ padding }) => padding || '40px 110px 110px 112px'};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  text-align: ${({ textAlign }) => textAlign || 'inherit'};
  @media (max-width: ${THEME.breakPoints.mobile}px) {
    padding: 0;
  }
`;
