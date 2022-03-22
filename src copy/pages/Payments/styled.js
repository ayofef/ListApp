import styled, { css } from 'styled-components';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { withStyles } from '@material-ui/core/styles';
import IconButtonBase from '@material-ui/core/IconButton';
import SwitchBase from '@material-ui/core/Switch';
import { LEFT_DRAWER_WIDTH } from '../../components/layouts/Root/styled';

const RIGHT_DRAWER_WIDTH = 320;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${LEFT_DRAWER_WIDTH}px)`,
    padding: theme.spacing(2, 4),
    backgroundColor: '#fff',
    borderRadius: '24px 0 0 24px',
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - (${LEFT_DRAWER_WIDTH}px + ${RIGHT_DRAWER_WIDTH}px))`,
    marginRight: RIGHT_DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: RIGHT_DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: RIGHT_DRAWER_WIDTH,
    borderLeft: 'none',
    backgroundColor: ' #fff',
    zIndex: 999,
  },
  drawerHeader: {
    boxSizing: 'content-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    padding: '16px',
    marginBottom: '12px',
    borderBottom: '1px solid #E6E9EC',
  },
}));

const AntSwitch = withStyles({
  root: {
    width: 40,
    height: 24,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 4,
    color: '#000',
    '&$checked': {
      transform: 'translateX(16px)',
      color: '#3023C8',
      '& + $track': {
        opacity: 1,
        backgroundColor: 'rgba(105, 68, 255, 0.14)',
      },
    },
  },
  thumb: {
    width: 16,
    height: 16,
    boxShadow: 'none',
  },
  track: {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: '#E7E6E6',
  },
  checked: {},
})(SwitchBase);

const IconButton = withStyles({
  root: {
    height: ({ height }) => height || 'auto',
    width: ({ width }) => width || 'auto',
    padding: ({ p }) => p || 8,
    backgroundColor: ({ bgcolor }) => bgcolor || '#F5F6F7',
    borderRadius: '8px !important',
    '&:hover': {
      backgroundColor: '#E6E9EC',
    },
    color: ({ color }) => color || '#787F88',
  },
})(IconButtonBase);

const StyledDrawer = styled.div`
  position: fixed;
  left: 320px;
  right: 0;
  bottom: 0;

  height: 0;
  margin-left: auto;
  border: 1px solid #eaecee;
  padding: 14px 0 18px 32px;

  background-color: white;
  overflow: hidden;
  opacity: 0;
  box-shadow: inset 0 1px 0 #e6e9ec;
  z-index: 2;
  transition: 0.5s;
  transform: translateY(100%);

  ${({ open }) =>
    open &&
    css`
      height: auto;
      opacity: 1;
      transform: translateY(0);
    `}

  ${({ drawerOpen }) =>
    drawerOpen &&
    css`
      right: 320px;
    `}
`;

export { useStyles, IconButton, AntSwitch, StyledDrawer };
