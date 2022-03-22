import styled from 'styled-components';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

export const Header = styled(FlexContainer)`
  justify-content: space-between;
  margin-bottom: ${({ margin }) => margin || '60px'};
  .fixed-close {
    position: fixed;
    top: 32px;
    right: 50px;
    z-index: 2;
  }
`;
