import styled from 'styled-components';
import THEME from '../../../../constants/theme';

const StyledNotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background-color: ${({ isNewNotification }) =>
    isNewNotification ? THEME.primaryColors.primaryLight : THEME.primaryColors.white};
  border-radius: 8px;
  margin-bottom: 4px;
  height: 88px;

  &:hover {
    background-color: ${({ isNewNotification }) =>
      isNewNotification ? THEME.primaryColors.primaryLightHover : THEME.greyColors.grey14};
  }
`;

const TimeStamp = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${({ isNewNotification }) => (isNewNotification ? THEME.primaryColors.blue : THEME.greyColors.grey1)};
  margin: 0;
`;

export { StyledNotificationItem, TimeStamp };
