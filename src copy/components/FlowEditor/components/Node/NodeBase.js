import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import { useFlowEditorContext } from '../../context';

const NodeBase = ({ id, children }) => {
  const { isAutomationTest, setHoverElementId, isFlowMonitor } = useFlowEditorContext();
  const mouseEventHandler = (value) => {
    if (isAutomationTest || isFlowMonitor) {
      return;
    }
    setHoverElementId(value);
  };

  return (
    <Box onMouseEnter={() => mouseEventHandler(id)} onMouseLeave={() => mouseEventHandler(null)} display="flex">
      {children}
    </Box>
  );
};

NodeBase.propTypes = {
  id: PropTypes.string.isRequired,
};

export default NodeBase;
