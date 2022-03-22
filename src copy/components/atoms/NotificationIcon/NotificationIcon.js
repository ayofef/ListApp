import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import styled from 'styled-components';
import THEME from '../../../constants/theme';

const NotificationIconWrapper = styled.div`
  position: relative;
  margin: ${({ margin }) => margin || '0 24px'};
  color: ${THEME.primaryColors.black};

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: ${THEME.secondaryColors.red};
    top: 2px;
    right: 2px;
    border-radius: 50%;
    border: 2px solid ${THEME.primaryColors.white};
  }
`;

const NotificationIcon = ({ ...restProps }) => (
  <NotificationIconWrapper {...restProps}>
    <NotificationsIcon />
  </NotificationIconWrapper>
);

export default NotificationIcon;
