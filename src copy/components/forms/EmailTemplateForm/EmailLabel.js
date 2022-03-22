import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const EmailLabel = ({ email, removeHandler }) => {
  return (
    <Box
      key={email}
      display="flex"
      alignItems="center"
      m="4px"
      p="4px"
      borderRadius="4px"
      border="1px solid rgba(0, 0, 0, 0.23)"
      bgcolor="#fff"
    >
      <Box component="span" mr="4px" lineHeight="26px">
        {email}
      </Box>

      <IconButton type="button" size="small" onClick={removeHandler}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

EmailLabel.propTypes = {
  email: PropTypes.string.isRequired,
  removeHandler: PropTypes.func.isRequired,
};

export default EmailLabel;
