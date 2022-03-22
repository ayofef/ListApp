import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const SubTitle = ({ fontSize, lineHeight, mt, mb, ...props }) => (
  <Box
    component="p"
    fontSize={fontSize}
    lineHeight={lineHeight}
    mt={mt}
    mb={mb}
    fontWeight="400"
    color="#787f88"
    {...props}
  />
);

SubTitle.propTypes = {
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string,
  mt: PropTypes.string,
  mb: PropTypes.string,
};

SubTitle.defaultProps = {
  fontSize: '14px',
  lineHeight: '24px',
  mt: '8px',
  mb: '24px',
};

export default SubTitle;
