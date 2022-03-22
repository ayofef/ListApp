const GET_STATUS = {
  CONNECTED: {
    text: 'Connected',
  },
  BROKEN: {
    text: 'Broken',
  },

  NOT_CONNECTED: {
    text: 'Not connected',
  },
  RECONNECT: {
    text: 'Reconnect',
  },
  ARCHIVED: {
    text: 'Disconnected',
  },
};

const CUSTOM_BUTTON_PROPS = {
  width: 'unset',
  margin: '0',
  position: 'absolute',
  top: 'calc(100% - 72px)',
  right: '32px',
};

const APM_KEY = 'APM';

const CONNECTION_STATUS = {
  CONNECTED: 'CONNECTED',
  NOT_CONNECTED: 'NOT_CONNECTED',
  ARCHIVED: 'ARCHIVED',
  BROKEN: 'BROKEN',
};

const WT_CONNECTION_FORM_ID = 'wt-connection-form';

export { GET_STATUS, CUSTOM_BUTTON_PROPS, APM_KEY, CONNECTION_STATUS, WT_CONNECTION_FORM_ID };
