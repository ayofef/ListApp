import withStyles from '@material-ui/core/styles/withStyles';
import Box from '@material-ui/core/Box';

export const StyledOptionWrapper = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #e6e9ec',
    cursor: 'pointer',
    padding: '5px 0 2px',
    '&:hover': {
      backgroundColor: '#f5f6f7',
    },
  },
})(Box);
