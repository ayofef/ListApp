import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

export const StyledScrollbars = styled(Scrollbars)`
  width: 100%;
  flex: 1;
  overflow: visible !important;

  & > :first-child {
    padding-bottom: 15px;
  }
`;
