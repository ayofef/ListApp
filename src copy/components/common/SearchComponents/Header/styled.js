import IconButtonBase from '@material-ui/core/IconButton';
import { withStyles, Box } from '@material-ui/core';

const backgroundColor = {
  backgroundColor: '#eaecee',
  '&:hover': {
    backgroundColor: '#cfd2d4',
  },
};

export const StyledIconButton = withStyles({
  root: { padding: ({ p }) => p || 8, ...backgroundColor },
})(IconButtonBase);

export const StyledSearch = withStyles({
  root: {
    backgroundColor: '#eaecee',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '30px',
    marginLeft: '-19px',
    paddingRight: '16px',
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
  },
})(Box);
