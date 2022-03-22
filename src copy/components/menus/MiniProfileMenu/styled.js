import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  button: {
    minWidth: 'auto',
    textTransform: 'capitalize',
    padding: 0,
    marginLeft: 8,
    marginRight: -15,
  },
  circle: {
    marginLeft: 8,
    marginRight: 4,
  },
  chevron: {
    marginLeft: 9,
  },
}));
