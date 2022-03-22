import { withStyles } from '@material-ui/core/styles';

import { ButtonRounded } from '../atoms';

export const StyledButton = withStyles({
  containedSecondary: {
    color: '#232629',
    backgroundColor: ({ invert }) => (invert ? '#ffffff !important' : '#F5F6F7'),
    '&:hover': {
      backgroundColor: '#E6E9EC !important',
    },
  },
})(ButtonRounded);
