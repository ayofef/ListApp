import React from 'react';
import ButtonBase from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { string, bool } from 'prop-types';
import THEME from '../../../constants/theme';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: ({ borderRadius }) => borderRadius || '8px',
    padding: ({ padding }) => `${padding} !important ` || '',
    height: ({ height }) => height || '40px',
    letterSpacing: 'unset',
    marginLeft: ({ ml }) => ml || '0',
    fontSize: ({ fontSize }) => fontSize || '14px',
    width: ({ width }) => width || 'auto',
    display: ({ inlineBlock }) => inlineBlock && 'inline-block',
    alignSelf: ({ alignSelf }) => alignSelf || '',
  },
  endIcon: {
    marginLeft: ({ endiconmarginleft }) => endiconmarginleft || '8px',
  },
  textPrimary: {
    color: '#4E40EF',
    letterSpacing: 'unset !important',
    paddingLeft: '0',
    fontWeight: ({ fontWeight }) => fontWeight || '500',
    '&:hover': {
      color: '#3023C8',
      backgroundColor: 'rgba(255,255,255,0)',
      '& svg': {
        color: '#3023C8',
      },
    },
  },
  textSecondary: {
    color: '#787F88',
    fontWeight: 'normal',
    '&:hover': {
      color: '#4E40EF',
      backgroundColor: 'rgba(255,255,255,0)',
      '& svg': {
        color: '#4E40EF',
      },
    },
  },
  contained: {
    boxShadow: 'none',
    fontWeight: '600',
  },
  containedPrimary: {
    color: '#fff',
    backgroundColor: '#4E40EF',
    '&:hover': {
      backgroundColor: '#3023C8',
    },
    '&:disabled': {
      color: '#fff',
      backgroundColor: '#9CA0FF',
    },
  },
  containedSecondary: {
    color: `${THEME.primaryColors.black}`,
    backgroundColor: '#F5F6F7',
    '&:hover': {
      backgroundColor: '#E6E9EC',
    },
    '& .MuiButton-startIcon': {
      color: '#787F88',
    },
    '&:disabled': {
      color: '#787F88',
      backgroundColor: '#F5F6F7',
    },
  },

  label: {
    textTransform: 'none !important',
    letterSpacing: 'unset',
  },
}));

const ButtonRounded = ({
  borderRadius,
  ml,
  mt,
  backgroundColor,
  hoverColor,
  width,
  inlineBlock,
  alignSelf,
  ...props
}) => {
  const classes = useStyles({
    borderRadius,
    ml,
    mt,
    backgroundColor,
    hoverColor,
    width,
    inlineBlock,
    alignSelf,
    ...props,
  });

  return <ButtonBase {...props} classes={classes} />;
};

ButtonRounded.propTypes = {
  borderRadius: string,
  ml: string,
  mt: string,
  backgroundColor: string,
  hoverColor: string,
  width: string,
  inlineBlock: bool,
  alignSelf: string,
};

ButtonRounded.defaultProps = {
  borderRadius: null,
  ml: null,
  mt: null,
  backgroundColor: null,
  hoverColor: null,
  width: null,
  inlineBlock: null,
  alignSelf: null,
};

export { ButtonRounded };
