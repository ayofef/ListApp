import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const Title = ({ fontSize, mt, mb, ...props }) => (
  <Box component="p" mt={mt} mb={mb} fontSize={fontSize} fontWeight="600" {...props} />
);

Title.propTypes = {
  fontSize: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
};

Title.defaultProps = {
  fontSize: '16px',
  mt: '16px',
  mb: '12px',
};

export default Title;
