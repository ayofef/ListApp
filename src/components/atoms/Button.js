import ButtonBase from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const Button = withStyles({
  root: {
    borderRadius: '10px',
    padding: ({ padding }) => padding,
    height: ({ height }) => height || '52px',
    letterSpacing: 'unset',
    marginLeft: '0',
    fontSize: '14px',
    width: ({ width }) => width || '100%',
    display: 'inline-block',
    textTransform: 'none',
    fontWeight: ({ fontWeight }) => fontWeight,
  },
})(ButtonBase);

export default Button;
