import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { string } from 'prop-types';
import THEME from '../../constants/theme';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'inherit',
    minWidth: ({ width }) => width || '100%',
    margin: ({ margin }) => margin || '12px 0',
    height: ({ height }) => height || 'auto',
    maxWidth: '100%',

    '& .MuiSelect-root > div': {
      overflow: 'hidden',
    },
    '& .MuiInputBase-input': {
      fontSize: ({ fontSize }) => fontSize || '14px',
      boxSizing: ({ boxSizing }) => boxSizing || 'content-box',
    },
    '& .MuiInputBase-root': {
      backgroundColor: ({ backgroundColor }) => backgroundColor || '#F5F6F7',
      color: THEME.primaryColors.black,
      fontWeight: ({ withoutBorder }) => (withoutBorder ? 'bold' : 'normal'),
      '&:hover fieldset': {
        borderColor: THEME.primaryColors.blue,
      },
      '&:hover': {
        '& fieldset': {
          borderColor: ({ filter }) => filter && '#9CA0FF !important',
          borderWidth: ({ filter }) => filter && 1,
          boxShadow: ({ filter }) => filter && '0 0 2px 1px rgba(150,160, 255,0.2)',
        },
      },
      '& fieldset': {
        border: '1px solid rgba(255,255,255,0)',
        borderColor: 'rgba(255,255,255,0) !important',
        borderRadius: '6px !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9CA0FF !important',
        borderWidth: 1,
        boxShadow: '0 0 2px 1px rgba(150,160, 255,0.2)',
      },
      '& .MuiSelect-root': {
        padding: ({ padding }) => padding || '4px 30px 4px 12px',
        borderRadius: '32px',
        width: ({ width }) => width || '100%',
      },
      '&.Mui-focused .MuiSelect-select': {
        backgroundColor: '#fff',
      },
      '& .MuiSelect-select:focus': {
        backgroundColor: '#fff',
      },
      '& .MuiSelect-iconOpen + fieldset': {
        borderColor: '#4E40EF !important',
      },
    },
    '& label': {
      color: THEME.primaryColors.black,
      fontWeight: 'normal',
      fontSize: ({ size }) => {
        if (size === 'smaller') {
          return '14px';
        }
        return '18px';
      },
    },
    '& label.Mui-focused': {
      color: THEME.primaryColors.black,
    },
    '& .MuiInputBase-root fieldset': {
      borderRadius: '8px',
    },
    '& .MuiInputLabel-outlined': {
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, 20px) scale(1)',
      },
      '&.MuiFormLabel-filled': {
        transform: 'translate(14px, -7px) scale(0.8)',
        fontWeight: 500,
        color: THEME.primaryColors.black,
        padding: '0 4px!important',
        marginLeft: '-2px',
        background: THEME.primaryColors.white,
        transition: '0.3s background',
      },
    },
  },
}));

const StyledFormControl = ({ backgroundColor, margin, boxSizing, ...props }) => {
  const classes = useStyles({ backgroundColor, margin, boxSizing, ...props });

  return <FormControl {...props} classes={classes} />;
};

StyledFormControl.propTypes = {
  backgroundColor: string,
  margin: string,
  boxSizing: string,
};

StyledFormControl.defaultProps = {
  boxSizing: null,
  backgroundColor: null,
  margin: null,
};

export default StyledFormControl;
