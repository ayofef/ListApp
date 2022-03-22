import { createTheme } from '@material-ui/core';

const ThemeUtils = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export default ThemeUtils;
