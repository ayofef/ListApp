import styled from 'styled-components';
import THEME from '../../../../constants/theme';

const StyledActionItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${THEME.primaryColors.primaryLight};
  border-radius: 8px;
  margin-bottom: 4px;
`;

const Content = styled.div`
  padding: 12px 16px;
`;

const TimeStamp = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${THEME.primaryColors.blue};
  margin: 0;
`;

const ActionsButtons = styled.div`
  border-top: 1px solid ${THEME.greyColors.grey25};
  display: flex;
  margin-top: 16px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  border-right: ${({ isSingleAction }) => (isSingleAction ? 'none' : `1px solid ${THEME.greyColors.grey25}`)};

  &:nth-child(2) {
    border-right: none;
  }
`;

export { StyledActionItem, TimeStamp, Content, ActionsButtons, ButtonContainer };
