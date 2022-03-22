import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';

export const StyledBox = withStyles({
  root: {
    opacity: '0.3',
    width: '100%',
    height: '300px',
    backgroundColor: '#F5F6F7',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '24px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',

    '&::before': {
      content: "''",
      position: 'absolute',
      display: 'block',
      width: '95%',
      height: '1px',
      backgroundColor: '#E6E9EC',
      top: '72px',
      left: '28px',
      opacity: '0.7',
    },

    '& .MoreHorizIcon': {
      opacity: '0.4',
    },
  },
})(Box);
