import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
  root: {
    transition: 'all .1s ease-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0) !important',
    },
  },
  icon: {
    transition: 'all .1s ease-out',
    borderRadius: '50%',
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    border: '1px solid #E6E9EC',
    boxSizing: 'border-box',
    '$root.Mui-focusVisible &': {
      outline: '2px auto #9CA0FF',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      borderColor: '#4E40EF',
      boxShadow: '0 0 0px 3px #F5F2FF',
    },
    'input:disabled ~ &': {
      borderColor: 'rgba(206,217,224,.5)',
    },
  },
  checkedRIcon: {
    transition: 'all .1s ease-out',
    background: '#fff !important',
    borderColor: '#4E40EF',
    boxSizing: 'border-box',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#4E40EF,#4E40EF 28%,transparent 32%)',
      content: '""',
      transform: 'translate(-1px, -1px)',
    },
  },
});

const StyledRadio = (props) => {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={[classes.icon, classes.checkedRIcon].join(' ')} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

export default StyledRadio;
