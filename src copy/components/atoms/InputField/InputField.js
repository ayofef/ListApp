import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { bool, string } from 'prop-types';
import THEME from '../../../constants/theme';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '6px',
    width: '100%',
    margin: ({ margin }) => margin || '4px 0 0 0',

    '& label': {
      color: THEME.greyColors.grey1,
      fontWeight: 'normal',
      fontSize: ({ size }) => (size === 'small' ? '14' : '16'),
    },
    '& label.Mui-focused': {
      color: `${THEME.primaryColors.blue}!important`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: THEME.primaryColors.black,
    },
    '& .MuiOutlinedInput-input': {
      '&.Mui-disabled': {
        color: `${THEME.greyColors.grey13}`,
      },
      '&:hover': {
        color: ({ hover }) => (hover ? THEME.primaryColors.blue : 'none'),
      },
      padding: ({ size, padding }) => {
        if (padding) {
          return padding;
        }
        if (size === 'small') {
          return '8px 16px 11px';
        }
        return '9px 16px 11px';
      },
      paddingLeft: ({ innerPaddingLeft }) => innerPaddingLeft || '16px',
      fontWeight: ({ fontWeight }) => fontWeight,
      fontSize: ({ size, fontSize }) => {
        if (fontSize) {
          return fontSize;
        }
        if (size === 'small') {
          return '14px';
        }
        return '18px';
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: ({ size }) => {
        if (size === 'smaller') {
          return '14px';
        }
        return '18px';
      },
    },
    '& .MuiOutlinedInput-inputMultiline': {
      padding: '0',
      alignSelf: 'flex-start',
    },
    '& .MuiInputBase-input': {
      width: ({ width }) => width,
      height: ({ multiline }) => multiline ?? 28,
      color: ({ inputColor }) => inputColor || 'black',
      position: 'realtive',
      zIndex: 1,
      fontWeight: ({ fontWeight }) => fontWeight,
      lineHeight: ({ lineHeight }) => lineHeight,
      '&::placeholder': {
        color: THEME.greyColors.grey1,
        opacity: 1,
      },
    },
    '& .MuiInputLabel-outlined': {
      transform: ({ size }) => {
        if (size === 'smaller') {
          return 'translate(16px, 17px) scale(1)';
        }
        return 'translate(16px, 20px) scale(1)';
      },
      '&.MuiInputLabel-shrink.MuiFormLabel-filled': {
        transform: 'translate(14px, -7px) scale(0.8)',
        fontWeight: 500,
        padding: '0 4px!important',
        marginLeft: '-2px',
        color: THEME.primaryColors.black,
      },
      '&.MuiInputLabel-shrink.Mui-focused': {
        transform: 'translate(14px, -7px) scale(0.8)',
        fontWeight: 500,
        background: 'white',
        padding: '0 4px!important',
        marginLeft: '-2px',
        borderColor: THEME.primaryColors.blue,
      },
    },
    '& .MuiInputAdornment-root': {
      zIndex: 999,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '6px',
      height: ({ height, multiline }) => (multiline ? undefined : height || '40px'),

      '&.Mui-disabled': {
        '& fieldset': {
          borderColor: '#F5F6F7',
        },
      },
      '&:hover fieldset': {
        borderColor: 'rgba(193, 195, 198, 0)',
        background: 'rgba(193, 195, 198, 0.2)',
      },
      '& fieldset': {
        backgroundColor: '#F5F6F7',
        borderColor: '#F5F6F7',
        borderWidth: ({ noBorder }) => (noBorder ? 0 : 1),
        borderRadius: ({ borderRadius }) => `${borderRadius || '6px'} !important`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: THEME.primaryColors.primary,
        borderWidth: ({ noBorder }) => (noBorder ? 0 : 1),
      },
      '&.Mui-focused fieldset': {
        // borderColor: THEME.primaryColors.primary,
        borderColor: 'orange',
        backgroundColor: 'white',
        boxShadow: '0 0 2px 1.5px rgba(156,160,255,0.2)',
        borderWidth: ({ noBorder }) => (noBorder ? 0 : 1),
      },
    },
    '& .MuiOutlinedInput-root fieldset': {
      borderRadius: 8,
    },
    borderWidth: ({ noBorder }) => (noBorder ? 0 : 1),
  },
}));

const InputField = ({
  noBorder,
  innerPaddingLeft,
  margin,
  height,
  width,
  lineHeight,
  fontSize,
  fontWeight,
  padding,
  hover,
  multiline,
  ...props
}) => {
  const classes = useStyles({
    noBorder,
    innerPaddingLeft,
    margin,
    height,
    width,
    lineHeight,
    fontSize,
    fontWeight,
    padding,
    hover,
    multiline,
  });

  return <TextField {...props} multiline={multiline} classes={classes} />;
};

InputField.propTypes = {
  noBorder: bool,
  innerPaddingLeft: string,
  margin: string,
  height: string,
  width: string,
  lineHeight: string,
  fontSize: string,
  fontWeight: string,
  padding: string,
  hover: bool,
  multiline: bool,
};

InputField.defaultProps = {
  noBorder: false,
  innerPaddingLeft: null,
  margin: null,
  height: undefined,
  width: undefined,
  lineHeight: undefined,
  fontSize: undefined,
  fontWeight: undefined,
  padding: undefined,
  hover: false,
  multiline: false,
};

export default InputField;
