import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { string, bool, func } from 'prop-types';

const useStyles = makeStyles(({ hasLabel }) => ({
  switchWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: '#232629',
    boxSizing: 'border-box',
  },
  switch: {
    position: 'relative',
    width: 40,
    height: 24,
    boxSizing: 'border-box',
    borderRadius: 24,
    background: '#F5F6F7',
    marginRight: hasLabel ? 16 : 0,
  },
  switchChecked: {
    background: '#4E40EF',
  },
  thumb: {
    position: 'absolute',
    top: 2,
    left: 2,
    height: 20,
    width: 20,
    borderRadius: '50%',
    background: '#fff',
    transition: '0.25s',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.04), 0px 10px 14px rgba(0, 0, 0, 0.04)',
    border: '0.5px solid #E6E9EC',
    boxSizing: 'border-box',
  },
  thumbChecked: {
    left: 18,
  },
  label: {
    marginLeft: '10px',
    fontWeight: '500',
  },
}));

const CustomSwitch = ({ label, checked, onClick }) => {
  const classes = useStyles({ hasLabel: !!label });
  const handleClick = useCallback(() => onClick(), [onClick]);

  return (
    <div className={classes.switchWrapper} onClick={handleClick}>
      <div className={`${classes.switch} ${checked ? classes.switchChecked : ''}`}>
        <div className={`${classes.thumb} ${checked ? classes.thumbChecked : ''}`} />
      </div>
      {label && <span className={classes.label}>{label}</span>}
    </div>
  );
};

CustomSwitch.propTypes = {
  checked: bool,
  label: string,
  onClick: func,
};

CustomSwitch.defaultProps = {
  label: '',
  checked: false,
  onClick: () => {},
};

export default CustomSwitch;
