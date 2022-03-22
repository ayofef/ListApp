import React from 'react';
import { Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { string } from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: ({ width }) => width || 'auto',
    height: ({ height }) => height || '32px',
    fontSize: ({ fontSize }) => fontSize || '14px',
    fontWeight: ({ fontWeight }) => fontWeight || '400',
    padding: ({ size }) => {
      if (size === 'smaller') {
        return '12px 16px';
      }
      return '8px 16px';
    },
    marginRight: 0,
    display: 'flex',
    alignItems: 'center',
    border: ({ border }) => border || 'none !important',
    backgroundColor: ({ backgroundColor }) => backgroundColor || '#F5F6F7',
    transition: 'all .3s ease-out',
    '&:hover': {
      backgroundColor: ({ hoverbg }) => hoverbg || 'rgba(230, 233, 236, 0.5)',
    },
    '& .check-icon': {
      display: 'none',
      opacity: '0',
      visibility: 'hidden',
    },
  },
  selectMenu: {
    border: 'none',
  },
}));

const CustomSelect = ({ margin, backgroundColor, hoverbg, boxSizing, ...props }) => {
  const classes = useStyles({ margin, backgroundColor, hoverbg, boxSizing, ...props });
  return <Select {...props} classes={classes} />;
};

CustomSelect.propTypes = {
  margin: string,
  backgroundColor: string,
  hoverbg: string,
  boxSizing: string,
};

CustomSelect.defaultProps = {
  margin: null,
  backgroundColor: null,
  hoverbg: null,
  boxSizing: null,
};

export default CustomSelect;
