import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/icons/AddRounded';
import THEME from '../../../constants/theme';

const AddIcon = ({ mx, mr, ml, borderRadius, width, height }) => {
  return (
    <Box
      color={THEME.primaryColors.blue}
      fontSize="24px"
      bgcolor="#F5F2FF"
      borderRadius={borderRadius}
      width={width}
      height={height}
      display="flex"
      justifyContent="center"
      alignItems="center"
      mx={mx}
      mr={mr}
      ml={ml}
    >
      <Icon fontSize="inherit" color="inherit" />
    </Box>
  );
};

AddIcon.propTypes = {
  mx: PropTypes.string,
  mr: PropTypes.string,
  ml: PropTypes.string,
  borderRadius: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
AddIcon.defaultProps = {
  mx: '0',
  mr: '0',
  ml: '0',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
};
export default AddIcon;
