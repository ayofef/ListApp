import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const Input = ({ loading, ...props }) => {
  const { InputProps } = props;

  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {InputProps.endAdornment}
          </>
        ),
      }}
    />
  );
};

Input.propTypes = {
  InputProps: PropTypes.shape({
    endAdornment: PropTypes.shape({}),
  }).isRequired,
  loading: PropTypes.bool,
};

Input.defaultProps = {
  loading: false,
};

export default Input;
