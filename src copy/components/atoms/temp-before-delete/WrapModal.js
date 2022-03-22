import styled from 'styled-components';
import { FlexContainer } from '../flex/FlexContainer';

export const WrapModal = styled(FlexContainer)`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  display: block;
  background-color: ${({ backgroundColor }) => backgroundColor || 'rgba(231, 230, 230, 0.5)'};
`;
