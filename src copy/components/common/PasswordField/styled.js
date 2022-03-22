import styled from 'styled-components';
import THEME from '../../../constants/theme';
import { P12 } from '../../atoms';

export const RequirementsListCover = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
`;
export const RequirementsItemCover = styled.div`
  margin-top: 6px;
  margin-bottom: 8px;
  box-sizing: border-box;
  width: 50%;
  /* padding-left: 4px; */
  display: flex;
  align-items: flex-start;
  ${P12} {
    flex: 1;
  }
`;

export const StyledCircle = styled.div`
  margin-right: 8px;
  margin-top: 6px;
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 8px;
  background-color: ${({ isValid }) => (isValid ? THEME.primaryColors.blue : THEME.greyColors.grey1)};
`;
