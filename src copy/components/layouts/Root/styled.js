import { makeStyles } from '@material-ui/core';
import THEME from '../../../constants/theme';

const LEFT_DRAWER_WIDTH = 320;

const WIDTH_TRANSITION = 'width 200ms cubic-bezier(0,0.84,0.61,1.01)';

const useStyles = makeStyles((theme) => ({
  root: {
    background: THEME.greyColors.grey6,
  },
  drawer: {
    width: ({ sidebarWidth }) => sidebarWidth,
    zIndex: 40,
    willChange: 'width',
    transition: WIDTH_TRANSITION,
  },
  drawerPaper: {
    width: ({ sidebarWidth }) => sidebarWidth,
    height: '100% !important',
    borderRight: 'none',
    left: 'auto',
    background: 'transparent',
    transition: WIDTH_TRANSITION,

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      marginTop: 0,
      background: 'transparent',
    },
    borderColor: 'transparent!important',
    willChange: 'width',
  },
  content: {
    position: 'relative',
    display: 'flex',
    transition: 'margin 200ms cubic-bezier(0,0.84,0.61,1.01)',
    alignItems: 'stretch',
    height: '100vh',
    marginLeft: ({ sidebarWidth }) => sidebarWidth,
    overflow: 'hidden',
    backgroundColor: '#fff',
    willChange: 'margin-left',

    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      borderRadius: 0,
    },
    '&>div': {
      overflowY: 'auto',

      '&:before': {
        content: "''",
        position: 'absolute',
        top: '72px',
        left: '0',
        backgroundColor: '#E6E9EC',
        width: '100%',
        height: '1px',
        zIndex: 10,
      },
    },

    borderRight: '1px solid #E6E9EC',
    borderLeft: '1px solid #E6E9EC',
  },
  contentFiltered: {
    transition: 'all .3s ease-out',
    width: ({ sidebarWidth }) => (sidebarWidth === 72 ? 'calc(100vw - 392px)' : 'calc(100vw - 640px)'),
  },
}));

export { useStyles, LEFT_DRAWER_WIDTH };
