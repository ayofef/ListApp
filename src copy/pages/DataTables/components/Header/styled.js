import { withStyles, Badge } from '@material-ui/core';
import { ButtonRounded } from '../../../../components/atoms';

export const StyledBadge = withStyles({
  root: {
    margin: '1px 8px 0 10px',
  },
  badge: {
    padding: '3px',
    backgroundColor: '#4E40EF',
    color: '#fff',
  },
})(Badge);

const CustomStyledButton = withStyles({
  containedPrimary: {
    color: '#4E40EF !important',
    boxShadow: 'none !important',
    '& svg': {
      '& rect': {
        fill: '#3023C8',
      },
      '& path': {
        stroke: '#3023C8',
      },
    },
    backgroundColor: '#F5F2FF !important',
    '&:hover': {
      backgroundColor: 'rgba(156, 160, 255, .3) !important',
    },
  },
})(ButtonRounded);

export { CustomStyledButton };
