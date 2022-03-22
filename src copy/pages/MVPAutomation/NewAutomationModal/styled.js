import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  border-left: 1px solid ${THEME.greyColors.grey5};
  &:first-child {
    border-left: none;
  }
`;
