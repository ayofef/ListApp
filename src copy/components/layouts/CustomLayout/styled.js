import styled from 'styled-components';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

export const LayoutWrapper = styled(FlexContainer)`
  align-items: stretch;
  min-height: 100vh;
  & > div:first-child {
    & + div {
      width: 100%;
    }
  }
  .modal-image {
    overflow: hidden;
    img,
    svg {
      width: 100%;
      height: auto;
    }
  }
`;
