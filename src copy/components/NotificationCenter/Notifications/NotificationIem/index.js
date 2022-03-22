import React from 'react';
import { string, arrayOf, oneOf, shape, func } from 'prop-types';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { P14 } from '../../../atoms';
import THEME from '../../../../constants/theme';
import { LINK_TO } from '../../Actions/ActionButtonLink';
import { StyledNotificationItem, TimeStamp } from './styled';
import { GET_LIST_NOTIFICATIONS, DISMISS_NOTIFICATION } from '../../queries';
import { NOTIFICATION_STATUS } from '../constant';
import { getDescription } from '../../../../pages/FlowDetailsPage/Automation/RecommendedAutomations/RecommendedItem/constant';
import { formatTimeStamp, ACTION_TYPE_NAMES, ACTION_STYLES, ACTION_ROLES } from '../../constant';

const NotificationItem = ({ id, title, description, timeStamp, status, action, toggleNotification }) => {
  const [dismissNotification] = useMutation(DISMISS_NOTIFICATION);

  const to = LINK_TO[action.linkTo]?.(action.parameters);
  const isNewNotification = status === NOTIFICATION_STATUS.fired;

  const handleDismiss = () => {
    dismissNotification({ variables: { id }, refetchQueries: [{ query: GET_LIST_NOTIFICATIONS }] });
    toggleNotification();
  };

  return (
    <Link to={to}>
      <StyledNotificationItem onClick={handleDismiss} isNewNotification={isNewNotification}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <P14 fontWeight="500">{title}</P14>
          <TimeStamp isNewNotification={isNewNotification}>{formatTimeStamp(timeStamp)}</TimeStamp>
        </Box>

        <Box display="flex" mt="4px">
          {description && (
            <P14 color={THEME.greyColors.grey18} maxWidth="340px">
              {getDescription(description)}
            </P14>
          )}
        </Box>
      </StyledNotificationItem>
    </Link>
  );
};

NotificationItem.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  description: string,
  timeStamp: string.isRequired,
  status: oneOf([NOTIFICATION_STATUS.completed, NOTIFICATION_STATUS.fired]).isRequired,
  action: shape({
    label: string.isRequired,
    linkTo: string.isRequired,
    __typename: oneOf([ACTION_TYPE_NAMES.graphQLUiAction, ACTION_TYPE_NAMES.routeUiAction]).isRequired,
    style: oneOf([ACTION_STYLES.default, ACTION_STYLES.primary, ACTION_STYLES.danger, ACTION_STYLES.link]).isRequired,
    role: oneOf([ACTION_ROLES.primary, ACTION_ROLES.secondary]).isRequired,
    parameters: arrayOf(
      shape({
        key: string.isRequired,
        label: string.isRequired,
        __typename: string,
      })
    ),
  }).isRequired,
  toggleNotification: func.isRequired,
};

NotificationItem.defaultProps = {
  description: '',
};

export default NotificationItem;
