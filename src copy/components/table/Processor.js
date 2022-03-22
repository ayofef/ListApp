import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircleImage from './CircleImage';
import { parseInitials } from '../../utils/parseInitials';

const Processor = ({ name, logo, borderRadius, size }) => (
  <Box display="flex" alignItems="center">
    <Box display="flex" mr="8px">
      <CircleImage text={parseInitials(name).toUpperCase()} logo={logo} size={size} borderRadius={borderRadius} />
    </Box>

    {name && <Box component="span">{name}</Box>}
  </Box>
);

Processor.propTypes = {
  name: PropTypes.string,
  logo: PropTypes.string,
  borderRadius: PropTypes.string,
  size: PropTypes.number,
};

Processor.defaultProps = {
  name: '',
  logo: '',
  borderRadius: '50%',
  size: 24,
};

export default Processor;
