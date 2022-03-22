import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { FlowStepIcon } from '../../../../FlowStepIcon';

const Option = ({ name, group }) => (
  <Box display="flex" alignItems="center">
    <Box display="flex" mr="16px">
      <FlowStepIcon group={group} />
    </Box>

    <Box overflow="hidden">{name}</Box>
  </Box>
);

Option.propTypes = {
  name: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
};

export default Option;
