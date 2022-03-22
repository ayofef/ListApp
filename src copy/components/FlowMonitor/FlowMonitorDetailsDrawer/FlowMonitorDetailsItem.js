import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { P14M } from '../../atoms';
import { StyledErrorMessage, StyledFlowMonitorDetailsItem } from './styled';
import { FLOW_MONITOR_DETAILS_ITEM_CONTEXT } from '../constant';

const FlowMonitorDetailsItem = ({ errorMessage, label, onClick, children, size, context }) => {
  return (
    <StyledFlowMonitorDetailsItem onClick={onClick} $context={context}>
      {children}
      <Box display="flex" flexDirection="column" width={`calc(100% - ${size}px)`}>
        <P14M>{label}</P14M>
        {typeof errorMessage === 'string' ? (
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        ) : (
          errorMessage || null
        )}
      </Box>
    </StyledFlowMonitorDetailsItem>
  );
};

FlowMonitorDetailsItem.propTypes = {
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  size: PropTypes.number,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  context: PropTypes.oneOf([
    FLOW_MONITOR_DETAILS_ITEM_CONTEXT.instanceDetails,
    FLOW_MONITOR_DETAILS_ITEM_CONTEXT.instanceList,
  ]),
};
FlowMonitorDetailsItem.defaultProps = {
  errorMessage: null,
  size: 32,
  context: FLOW_MONITOR_DETAILS_ITEM_CONTEXT.instanceList,
};
export default FlowMonitorDetailsItem;
