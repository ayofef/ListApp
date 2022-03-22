import styled from 'styled-components';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { withStyles } from '@material-ui/core/styles';
import IconButtonBase from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/Button';
import { LEFT_DRAWER_WIDTH } from '../../layouts/Root/styled';

const RIGHT_DRAWER_WIDTH = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    backgroundColor: 'transparent',
  },
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
    backgroundColor: 'transparent',
  },
  drawerHeader: {
    boxSizing: 'content-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    padding: '16px',
    marginBottom: '8px',
  },
  content: {
    width: `calc(100% - ${RIGHT_DRAWER_WIDTH}px)`,
    flexGrow: 1,
    padding: theme.spacing(0, 4, 2, 4),
    marginRight: -RIGHT_DRAWER_WIDTH,
    backgroundColor: '#fff',
    borderRadius: '24px 0 0 24px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginRight: 0,
    borderRadius: '24px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Button = withStyles({
  root: {
    borderRadius: 50,
    padding: ({ startIcon, padding }) => padding || `8px ${startIcon ? 18 : 10}px 8px 10px`,
    backgroundColor: ({ active }) => (active ? '#cfd2d4' : '#eaecee'),
    '&:hover': {
      backgroundColor: '#cfd2d4',
    },
    minWidth: '40px',
    height: '40px',
    textAlign: 'center',
  },
  textPrimary: {
    color: '#7879f1',
  },
  label: {
    textTransform: 'capitalize',
  },
})(ButtonBase);

const IconButton = withStyles({
  root: {
    padding: ({ p }) => p || 8,
    backgroundColor: '#F0F3F5',
    '&:hover': {
      backgroundColor: '#DEE2E8',
    },
    color: '#787F88',
  },
})(IconButtonBase);

const STATUS_COLORS = {
  failed: '#CE1C1C',
  succeeded: '#1CCE6A',
  refund: '#875CFF',
  default: '#C4CBD2',
};

const IndicatorBase = styled('span')`
  position: relative;
  text-wrap: none;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    background-color: ${({ variant }) => STATUS_COLORS[variant] || STATUS_COLORS.default};
    transform: translate(0, -50%);
  }
`;

IndicatorBase.propTypes = {
  variant: PropTypes.string,
};

IndicatorBase.defaultProps = {
  variant: 'default',
};

export { useStyles, Button, IconButton };
