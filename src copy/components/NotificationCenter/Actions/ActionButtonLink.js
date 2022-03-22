import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UI_ROUTES } from '../../../constants/routes';
import { StyledButton } from './styled';

const ACTION_LINK_TYPES = {
  connectionConnect: 'CONNECTION_CONNECT',
  paymentIssueDetails: 'PAYMENT_ISSUE_DETAILS',
  connectionDetails: 'CONNECTION_DETAILS',
  automationDetails: 'AUTOMATION_DETAILS',
};

const defaultTo = (location) => location;

export const LINK_TO = {
  [ACTION_LINK_TYPES.connectionConnect]: (parameters) => {
    const connectionId = parameters.find(({ key }) => key === 'connection_id')?.label;

    return `${UI_ROUTES.connections}${connectionId ? `/details/${connectionId}` : ''}`;
  },

  [ACTION_LINK_TYPES.paymentIssueDetails]: (parameters) => {
    const issueId = parameters.find(({ key }) => key === 'paymentIssueId')?.label;
    const paymentId = parameters.find(({ key }) => key === 'paymentId')?.label;

    return `${UI_ROUTES.paymentIssues}${issueId ? `/details/${issueId}` : ''}${
      paymentId ? `/payments/${paymentId}` : ''
    }`;
  },

  [ACTION_LINK_TYPES.connectionDetails]: (parameters) => {
    const connectionId = parameters.find(({ key }) => key === 'connectionId')?.label;
    return `${UI_ROUTES.connections}${connectionId ? `/details/${connectionId}` : ''}`;
  },

  [ACTION_LINK_TYPES.automationDetails]: (parameters) => {
    const flowId = parameters.find(({ key }) => key === 'flowId')?.label;

    return `${UI_ROUTES.automations}/${flowId}/editor`;
  },
};

const ActionButtonLink = ({ color, children, linkTo, parameters, toggleNotification }) => {
  const to = LINK_TO[linkTo]?.(parameters) ?? defaultTo;

  return (
    <StyledButton component={Link} to={to} variant="contained" color={color} onClick={toggleNotification}>
      {children}
    </StyledButton>
  );
};

ActionButtonLink.propTypes = {
  linkTo: PropTypes.oneOf([
    ACTION_LINK_TYPES.connectionConnect,
    ACTION_LINK_TYPES.paymentIssueDetails,
    ACTION_LINK_TYPES.connectionDetails,
    ACTION_LINK_TYPES.automationDetails,
  ]),
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  toggleNotification: PropTypes.func,
  color: PropTypes.string.isRequired,
};

ActionButtonLink.defaultProps = {
  linkTo: null,
  parameters: null,
  toggleNotification: () => {},
};

export default ActionButtonLink;
