import { withStyles } from '@material-ui/core/styles';
import IconButtonBase from '@material-ui/core/IconButton';

export const StyledIconButton = withStyles({
  root: {
    borderRadius: '8px !important',
    padding: 8,
    color: '#787F88',
    transition: 'all .3s ease-out',
    backgroundColor: ({ opened }) => (opened ? 'transparent' : '#F5F6F7'),
    '&:hover': {
      backgroundColor: '#E6E9EC',
    },
  },
})(IconButtonBase);
