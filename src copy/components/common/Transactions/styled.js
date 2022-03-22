import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const ReceiptStatusTableItem = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 48px;
  margin-top: 4px;
  min-width: 220px;
  align-items: center;
  @media (min-width: ${THEME.breakPoints.tablet}px) {
    justify-content: flex-end;
    padding-left: 0;
    margin-top: 0;
  }
`;
