import { UI_ROUTES } from './routes';

//TODO: ADD REQUIRES_ACTION_LINK

const ROUTES = {
  DASHBOARD: {
    external: false,
    link: UI_ROUTES.home,
  },
  DEV_ZONE: {
    external: false,
    link: UI_ROUTES.developers,
  },
  CONNECTIONS_CONNECT: {
    external: true,
    link: process.env.REACT_APP_CONNECTIONS_URL,
  },
};

export { ROUTES };
