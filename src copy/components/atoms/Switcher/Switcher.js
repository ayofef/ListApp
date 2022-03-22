import { withStyles, Switch } from '@material-ui/core';
import THEME from '../../../constants/theme';

const Switcher = withStyles({
  root: {
    width: 40,
    height: 24,
    padding: 0,
    display: 'flex',

    margin: ({ margin }) => margin || 0,
  },
  switchBase: {
    padding: 4,
    color: ({ maincolor }) => maincolor || THEME.primaryColors.black,
    '&$checked': {
      transform: 'translateX(16px)',

      color: THEME.primaryColors.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: ({ maincolor }) => maincolor || THEME.primaryColors.main,
        borderColor: ({ maincolor }) => maincolor || THEME.primaryColors.main,
      },
    },
    '&.Mui-checked': {
      color: THEME.primaryColors.white,
      transform: 'translateX(17px)',
      '& + .MuiSwitch-track': {
        backgroundColor: ({ maincolor }) => maincolor || THEME.primaryColors.black,
        opacity: 1,
      },
    },
  },
  thumb: {
    width: 16,
    height: 16,
    boxShadow: 'none',
  },
  track: {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: THEME.greyColors.grey3,
  },
})(Switch);

export default Switcher;
