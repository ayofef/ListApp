import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { bool, func, string, shape } from 'prop-types';
import THEME from '../../../constants/theme';
import { P14 } from '../../atoms';

const useStyles = makeStyles(() => ({
  button: {
    boxShadow: 'none',
    color: 'black',
    padding: '11px 12px',
    textTransform: 'capitalize',
    fontWeight: 400,
    border: `1px solid ${THEME.greyColors.grey4}`,
    borderRadius: '8px',
    backgroundColor: 'white',
    '&:hover ': {
      backgroundColor: THEME.greyColors.grey4,
    },
  },
  buttonActive: {
    boxShadow: 'none',
    color: `${THEME.secondaryColors.blue}`,
    padding: '11px 12px',
    textTransform: 'capitalize',
    fontWeight: 400,
    borderRadius: '8px',
    background: `${THEME.secondaryColors.blueLight}`,
    border: `1px solid ${THEME.secondaryColors.blueLight}`,
    '&:hover ': {
      background: `${THEME.secondaryColors.blueLight}`,
    },
    '& path': {
      fill: `${THEME.secondaryColors.blue}`,
    },
  },
}));

function SimplePopover({ renderItem, isEnd, icon, buttonActive, name }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        endIcon={isEnd && icon}
        startIcon={!isEnd && icon}
        className={buttonActive ? classes.buttonActive : classes.button}
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <P14 color="inherit">{name}</P14>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {renderItem()}
      </Popover>
    </div>
  );
}

SimplePopover.propTypes = {
  isEnd: bool,
  icon: shape({}),
  name: string,
  renderItem: func,
  buttonActive: bool,
};

SimplePopover.defaultProps = {
  isEnd: false,
  name: '',
  icon: {},
  renderItem: () => null,
  buttonActive: false,
};
export default SimplePopover;
