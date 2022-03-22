import { ACTION_ROLES } from '../constant';
import ActionButtonMutation from './ActionButtonMutation';
import ActionButtonLink from './ActionButtonLink';

const COLOR_DICTIONARY = {
  [ACTION_ROLES.primary]: 'primary',
  [ACTION_ROLES.secondary]: 'secondary',
};

const ACTIONS = {
  GraphQLUiAction: ({ action, variables }) => ({ Button: ActionButtonMutation, action, variables }),
  RouteUiAction: ({ parameters, linkTo, toggleNotification }) => ({
    Button: ActionButtonLink,
    parameters,
    linkTo,
    toggleNotification,
  }),
};

export { COLOR_DICTIONARY, ACTIONS };
