import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const AvatarTableItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledColumn = styled.td`
  text-align: left;
  padding: 20px;
  box-shadow: 0 0 4px rgba(132, 132, 132, 0.1), 0 15px 25px rgba(0, 0, 0, 0.06);
`;

export const ButtonsTableItem = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 48px;
  margin-top: 4px;
  @media (min-width: ${THEME.breakPoints.tablet}px) {
    justify-content: flex-end;
    padding-left: 0;
    margin-top: 0;
  }
`;

export const StyledDateCover = styled.span`
  margin-left: 25px;
`;
