import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import StatusString from './StatusString';

const StatusObject = ({ data }) => {
  const { processorStatus } = data;

  return (
    <Tooltip title={`Processor status: "${processorStatus ?? 'N/A'}"`} arrow>
      {/* margin and padding increase content size */}
      <Box m="-6px" p="6px">
        <StatusString data={data.status} />
      </Box>
    </Tooltip>
  );
};

StatusObject.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string,
    processorStatus: PropTypes.string,
  }).isRequired,
};

export default StatusObject;
