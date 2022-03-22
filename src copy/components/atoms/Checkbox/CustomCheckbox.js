import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import THEME from '../../../constants/theme';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    span: {
      backgroundColor: 'blueviolet',
    },
  },
  icon: {
    borderRadius: 6,
    width: 24,
    height: 24,
    backgroundColor: ({ white }) => (white ? '#fff' : THEME.greyColors.grey8),
    border: ({ white }) => (white ? '1px solid #E6E9EC' : 'none'),
    'input:hover ~ &': {
      backgroundColor: ({ white }) => (white ? '#fff' : THEME.greyColors.grey8),
      borderColor: ({ white }) => (white ? THEME.primaryColors.primary : 'rgba(0,0,0,0'),
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: THEME.greyColors.grey3,
    },
    '&:before': {
      display: 'block',
      position: 'absolute',
      top: 16,
      left: 14,
      width: 13,
      height: 11,
      backgroundRepeat: 'no-repeat',
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 13 11'%3E%3Cpath" +
        " d='M1 5.33329L5 8.99996L12 1.66663' stroke='white' stroke-width='2' stroke-miterlimit='10'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
  checkedIcon: {
    background: 'linear-gradient(90deg, #bb7c8f 0%, #8672d3 26.41%, #686af9 51.56%, #5740fa 77.27%, #4611f8 100%)',
    border: ({ white }) => (white ? '1px solid #E6E9EC' : 'none'),
    '&:before': {
      display: 'block',
      position: 'absolute',
      top: 16,
      left: 14,
      width: 13,
      height: 11,
      backgroundRepeat: 'no-repeat',
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 13 11'%3E%3Cpath" +
        " d='M1 5.33329L5 8.99996L12 1.66663' stroke='white' stroke-width='2' stroke-miterlimit='10'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: THEME.primaryColors.main,
      border: ({ white }) => (white ? '1px solid #E6E9EC' : 'none'),
    },
  },
});

const CustomCheckbox = (props) => {
  const classes = useStyles(props);

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
};

export default CustomCheckbox;
