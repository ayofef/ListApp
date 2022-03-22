import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMutation, gql } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { CircularLoader } from '../../atoms';
import { StyledButton } from './styled';
import { TOAST_TIMEOUT } from '../../../constants/toasts';

// TODO : need to improve the toast message
const TOAST_TITLE = 'Action';
const TOAST_SUCCESS_MESSAGE = 'Action was successful';
const TOAST_ERROR_MESSAGE = 'Error occurred';

const ActionButtonMutation = ({ color, children, action, variables }) => {
  const { t } = useTranslation();

  const [promise, { loading }] = useMutation(gql(action), { variables });

  const onClick = () => {
    promise()
      .then(({ errors }) => {
        if (errors) {
          NotificationManager.error(t(TOAST_ERROR_MESSAGE), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }

        NotificationManager.success(t(TOAST_SUCCESS_MESSAGE), t(TOAST_TITLE), TOAST_TIMEOUT);
      })
      .catch((err) => {
        NotificationManager.error(t(err), t(TOAST_TITLE), TOAST_TIMEOUT);
      });
  };

  return (
    <StyledButton
      variant="contained"
      color={color}
      disabled={loading}
      onClick={onClick}
      endIcon={loading && <CircularLoader bgcolor="#fff" size="16px" thickness={5} />}
    >
      {children}
    </StyledButton>
  );
};

ActionButtonMutation.propTypes = {
  action: PropTypes.string.isRequired,
  variables: PropTypes.shape({}).isRequired,
  color: PropTypes.string.isRequired,
};

export default ActionButtonMutation;
