import moment, { updateLocale } from 'moment';

const ACTION_TYPE_NAMES = {
  graphQLUiAction: 'GraphQLUiAction',
  routeUiAction: 'RouteUiAction',
};

const ACTION_STYLES = {
  default: 'DEFAULT',
  primary: 'PRIMARY',
  danger: 'DANGER',
  link: 'LINK',
};

const ACTION_ROLES = {
  primary: 'PRIMARY',
  secondary: 'SECONDARY',
};

const generateTabs = (newNotifications) => {
  const notificationsLabel = newNotifications > 0 ? `${newNotifications} Notifications` : 'Notifications';
  // const actionsLabel = newActions > 0 ? `${newActions} Actions` : 'Actions';

  // Hide Actions tab until BE API is completed
  return [
    { label: notificationsLabel, value: '0' },
    // { label: actionsLabel, value: '1' },
  ];
};

const a11yProps = (i) => ({
  id: `notification-tab-${i}`,
  ariaControls: `notification-tabpanel-${i}`,
});

const formatTimeStamp = (timeStamp) => {
  const customRelativeTime = {
    future: 'in %s',
    past: '%s',
    s: '%ds',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dd',
    dd: '%dd',
    M: 'mth',
    MM: '%dmths',
    y: 'y',
    yy: '%dy',
  };

  const formattedTimeStamp = moment(timeStamp).fromNow(
    updateLocale('en', {
      relativeTime: customRelativeTime,
    })
  );

  return formattedTimeStamp;
};

export { ACTION_TYPE_NAMES, ACTION_STYLES, ACTION_ROLES, generateTabs, a11yProps, formatTimeStamp };
