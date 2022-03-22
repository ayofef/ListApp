import React from 'react';
import { arrayOf, shape, string, oneOf, func } from 'prop-types';
import Box from '@material-ui/core/Box';
import { UiActionProvider } from '../UiActionProvider';
import { P14 } from '../../../atoms';
import { StyledActionItem, TimeStamp, ActionsButtons, Content, ButtonContainer } from './styled';
import { getDescription } from '../../../../pages/FlowDetailsPage/Automation/RecommendedAutomations/RecommendedItem/constant';
import { formatTimeStamp, ACTION_ROLES, ACTION_TYPE_NAMES, ACTION_STYLES } from '../../constant';
import THEME from '../../../../constants/theme';
import { ACTIONS } from '../constant';

const ActionItem = ({ title, description, timeStamp, actions, toggleNotification }) => {
  return (
    <StyledActionItem>
      <Content>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <P14 fontWeight="500" lineHeight="20px">
            {title}
          </P14>

          <TimeStamp>{formatTimeStamp(timeStamp)}</TimeStamp>
        </Box>

        <Box display="flex" mt="4px">
          {description && (
            <P14 color={THEME.greyColors.grey18} maxWidth="340px">
              {getDescription(description)}
            </P14>
          )}
        </Box>
      </Content>

      {actions?.length > 0 && (
        <UiActionProvider>
          <ActionsButtons>
            {actions.map((action) => {
              const getAction = ACTIONS[action.__typename];

              if (!getAction) {
                return null;
              }

              const { Button, ...uiProps } = getAction({ ...action, toggleNotification });
              const isSingleAction = actions.length === 1;

              return (
                <ButtonContainer
                  key={action.label}
                  order={action.role === ACTION_ROLES.primary ? 0 : 1}
                  isSingleAction={isSingleAction}
                >
                  <Button {...uiProps}>{action.label}</Button>
                </ButtonContainer>
              );
            })}
          </ActionsButtons>
        </UiActionProvider>
      )}
    </StyledActionItem>
  );
};

ActionItem.propTypes = {
  title: string.isRequired,
  description: string,
  timeStamp: string.isRequired,
  actions: arrayOf(
    shape({
      label: string.isRequired,
      __typename: oneOf([ACTION_TYPE_NAMES.graphQLUiAction, ACTION_TYPE_NAMES.routeUiAction]).isRequired,
      style: oneOf([ACTION_STYLES.default, ACTION_STYLES.primary, ACTION_STYLES.danger, ACTION_STYLES.link]).isRequired,

      role: oneOf([ACTION_ROLES.primary, ACTION_ROLES.secondary]).isRequired,
    })
  ).isRequired,
  toggleNotification: func.isRequired,
};

ActionItem.defaultProps = {
  description: '',
};

export default ActionItem;
