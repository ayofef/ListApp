import styled from 'styled-components';
import { ButtonRounded } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';

const StyledContainer = styled.div`
  padding: 26px 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${THEME.greyColors.grey5};

  &:last-child {
    border-bottom: none;
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${THEME.primaryColors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const StyledButton = styled(ButtonRounded)`
  &.MuiButton-text {
    color: ${THEME.statusColors.darkRed};
    height: 20px;
  }
`;

const LogOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 48px;
`;

export { StyledContainer, IconContainer, StyledButton, LogOutContainer };
