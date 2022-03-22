import React from 'react';
import { string, bool } from 'prop-types';
import Box from '@material-ui/core/Box';
import { EdgeButton } from '../Edge/EdgeButton';

const NodeSideTools = ({ id, visible }) => (
  <Box
    position="absolute"
    top="calc(50% - 12px)"
    right="-12px"
    display="flex"
    flexDirection="column"
    visibility={visible}
    onMouseDown={(e) => e.stopPropagation()}
  >
    {visible && <EdgeButton id={id} stepId={id} isNode />}
  </Box>
);

NodeSideTools.propTypes = {
  id: string.isRequired,
  visible: bool.isRequired,
};

export { NodeSideTools };
